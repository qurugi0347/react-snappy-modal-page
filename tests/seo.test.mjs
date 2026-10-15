import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { after, before, describe, it } from "node:test";
import puppeteer from "puppeteer";
import { preview, transformWithEsbuild } from "vite";

const { code } = await transformWithEsbuild(
  await readFile("src/routes.ts", "utf8"),
  "src/routes.ts",
);
const {
  docRoutes,
  localizedPath,
  pagePaths,
  resolveRoute,
  siteUrl,
  supportedLanguages,
} = await import("data:text/javascript," + encodeURIComponent(code));

const translations = Object.fromEntries(
  await Promise.all(
    supportedLanguages.map(async language => [
      language,
      JSON.parse(await readFile(`src/i18n/locales/${language}.json`, "utf8")),
    ]),
  ),
);
const ogLocales = { en: "en_US", ko: "ko_KR", zh: "zh_CN" };
const expectedAlternates = path => [
  ...supportedLanguages.map(language => [
    language,
    siteUrl + localizedPath(path, language),
  ]),
  ["x-default", siteUrl + path],
];
const expectedContent = (path, language) => {
  const resource = translations[language];
  const page = Object.keys(docRoutes).find(key => docRoutes[key] === path);
  return page
    ? { ...resource.docs[page], paragraph: resource.docs[page].lead }
    : {
        meta: resource.home.meta,
        title: resource.hero.title,
        paragraph: resource.hero.subtitle,
      };
};

function assertPage(document, path, language) {
  const content = expectedContent(path, language);
  assert.equal(document.language, language);
  assert.deepEqual(document.titles, [content.meta.title]);
  assert.deepEqual(document.descriptions, [content.meta.description]);
  assert.deepEqual(document.canonicals, [
    siteUrl + localizedPath(path, language),
  ]);
  assert.deepEqual(document.alternates.sort(), expectedAlternates(path).sort());
  assert.deepEqual(document.ogUrls, document.canonicals);
  assert.deepEqual(document.ogTitles, document.titles);
  assert.deepEqual(document.ogDescriptions, document.descriptions);
  assert.deepEqual(document.twitterTitles, document.titles);
  assert.deepEqual(document.twitterDescriptions, document.descriptions);
  assert.deepEqual(document.ogLocales, [ogLocales[language]]);
  assert.deepEqual(
    document.ogAlternates.sort(),
    supportedLanguages
      .filter(alternate => alternate !== language)
      .map(alternate => ogLocales[alternate])
      .sort(),
  );
  assert.deepEqual(document.robots, []);
  assert.deepEqual(document.headings, [content.title]);
  assert.ok(
    document.body.includes(content.paragraph.replaceAll("`", "")),
    `Missing translated body for ${language}:${path}`,
  );
  for (const href of document.internalLinks) {
    assert.ok(
      pagePaths.some(
        base =>
          new URL(href, siteUrl).pathname === localizedPath(base, language),
      ),
      `Link lost its language: ${href}`,
    );
  }
  assert.deepEqual(
    document.switcherLinks.map(([language, href]) => [
      language,
      new URL(href, siteUrl).pathname,
    ]),
    expectedAlternates(path)
      .slice(0, 3)
      .map(([language, url]) => [language, new URL(url).pathname]),
  );
}

// The same DOM extraction checks inert build HTML and the live React page.
function extractDocument(html) {
  const doc = html
    ? new DOMParser().parseFromString(html, "text/html")
    : document;
  const values = (selector, attribute) =>
    [...doc.querySelectorAll(selector)].map(node =>
      attribute ? node.getAttribute(attribute) : node.textContent,
    );
  return {
    language: doc.documentElement.lang,
    titles: values("title"),
    descriptions: values('meta[name="description"]', "content"),
    canonicals: values('link[rel="canonical"]', "href"),
    alternates: [...doc.querySelectorAll('link[rel="alternate"]')].map(node => [
      node.getAttribute("hreflang"),
      node.getAttribute("href"),
    ]),
    ogUrls: values('meta[property="og:url"]', "content"),
    ogTitles: values('meta[property="og:title"]', "content"),
    ogDescriptions: values('meta[property="og:description"]', "content"),
    twitterTitles: values('meta[name="twitter:title"]', "content"),
    twitterDescriptions: values('meta[name="twitter:description"]', "content"),
    ogLocales: values('meta[property="og:locale"]', "content"),
    ogAlternates: values('meta[property="og:locale:alternate"]', "content"),
    robots: values('meta[name="robots"]', "content"),
    headings: values("h1"),
    body: doc.body.textContent.replace(/\s+/g, " ").trim(),
    internalLinks: values('a[href^="/"]:not([hreflang])', "href"),
    switcherLinks: [...doc.querySelectorAll("a[hreflang]")].map(node => [
      node.getAttribute("hreflang"),
      node.getAttribute("href"),
    ]),
  };
}

describe("GIVEN: supported language URLs", () => {
  it("WHEN: resolving paths THEN: preserve English URLs, normalize slashes and reject unknown routes", () => {
    for (const language of supportedLanguages) {
      for (const path of pagePaths) {
        const url = localizedPath(path, language);
        for (const pathname of [url, url.slice(0, -1) || "/"]) {
          assert.deepEqual(resolveRoute(pathname), {
            language,
            path,
            found: true,
          });
        }
      }
    }
    for (const pathname of [
      "/missing/",
      "/en/docs/api/",
      "/fr/docs/api/",
      "/korean/",
    ]) {
      assert.deepEqual(resolveRoute(pathname), {
        language: "en",
        path: "/",
        found: false,
      });
    }
    assert.deepEqual(resolveRoute("/ko/missing/"), {
      language: "ko",
      path: "/",
      found: false,
    });
    assert.deepEqual(resolveRoute("/zh/docs/api/extra/"), {
      language: "zh",
      path: "/",
      found: false,
    });
  });
});

describe("GIVEN: a production build", () => {
  let server;
  let browser;
  let page;
  let origin;
  const errors = [];

  before(async () => {
    server = await preview({ preview: { host: "127.0.0.1", port: 0 } });
    origin = server.resolvedUrls.local[0];
    browser = await puppeteer.launch({ headless: true });
    page = await openPage("en-US");
  });

  after(async () => {
    await browser?.close();
    if (server) await new Promise(resolve => server.httpServer.close(resolve));
  });

  it("WHEN: parsing every build HTML THEN: exactly fifteen pages have translated content and reciprocal SEO", async () => {
    const files = await readdir("dist", { recursive: true });
    const expectedPaths = supportedLanguages.flatMap(language =>
      pagePaths.map(
        path => localizedPath(path, language).slice(1) + "index.html",
      ),
    );
    assert.deepEqual(
      files.filter(file => file.endsWith("index.html")).sort(),
      expectedPaths.sort(),
    );
    for (const language of supportedLanguages) {
      for (const path of pagePaths) {
        const html = await readFile(
          "dist" + localizedPath(path, language) + "index.html",
          "utf8",
        );
        const document = await page.evaluate(extractDocument, html);
        assertPage(document, path, language);
      }
    }
  });

  it("WHEN: parsing sitemap XML THEN: its exact URL and alternate sets match all fifteen pages", async () => {
    const xml = await readFile("dist/sitemap.xml", "utf8");
    const entries = await page.evaluate(xml => {
      const doc = new DOMParser().parseFromString(xml, "application/xml");
      if (doc.querySelector("parsererror"))
        throw new Error("Invalid sitemap XML");
      return [...doc.getElementsByTagName("url")].map(node => ({
        url: node.getElementsByTagName("loc")[0].textContent,
        alternates: [
          ...node.getElementsByTagNameNS(
            "http://www.w3.org/1999/xhtml",
            "link",
          ),
        ].map(link => [
          link.getAttribute("hreflang"),
          link.getAttribute("href"),
        ]),
      }));
    }, xml);
    const expectedUrls = supportedLanguages.flatMap(language =>
      pagePaths.map(path => siteUrl + localizedPath(path, language)),
    );
    assert.deepEqual(
      entries.map(entry => entry.url).sort(),
      expectedUrls.sort(),
    );
    for (const entry of entries) {
      const { path } = resolveRoute(new URL(entry.url).pathname);
      assert.deepEqual(entry.alternates, expectedAlternates(path));
    }
  });

  // Each scenario gets isolated storage and a fixed browser language.
  async function openPage(language, stored) {
    const context = await browser.createBrowserContext();
    const tab = await context.newPage();
    tab.on("pageerror", error => errors.push(error.message));
    await tab.setRequestInterception(true);
    tab.on("request", request => {
      if (request.url().startsWith(origin)) request.continue();
      else request.abort();
    });
    await tab.evaluateOnNewDocument(language => {
      Object.defineProperty(navigator, "language", { get: () => language });
    }, language);
    if (stored) {
      await tab.goto(origin + "ko/", { waitUntil: "networkidle0" });
      await tab.evaluate(
        stored => localStorage.setItem("i18nextLng", stored),
        stored,
      );
    }
    return tab;
  }

  async function visit(tab, url, expectedUrl = url) {
    await tab.goto(url, { waitUntil: "networkidle0" });
    await tab.waitForFunction(
      expectedUrl => location.href === expectedUrl,
      {},
      expectedUrl,
    );
    await tab.waitForNetworkIdle();
    return tab.evaluate(extractDocument);
  }

  it("WHEN: storage and navigator prefer another language THEN: only English URLs move to the matching ko/zh page", async () => {
    const tab = await openPage("zh-CN", "ko-KR");
    const hash = "#usage";
    for (const language of supportedLanguages) {
      for (const path of pagePaths) {
        const url = origin + localizedPath(path, language).slice(1) + hash;
        const target = language === "en" ? "ko" : language;
        const document = await visit(
          tab,
          url,
          origin + localizedPath(path, target).slice(1) + hash,
        );
        assertPage(document, path, target);
      }
    }
    for (const [navigatorLanguage, stored, expected] of [
      ["zh-CN", undefined, "zh"],
      ["ko-KR", "en", "en"],
      ["en-US", undefined, "en"],
    ]) {
      const tab = await openPage(navigatorLanguage, stored);
      const path = docRoutes.api;
      const document = await visit(
        tab,
        origin + path.slice(1) + "?source=seo#options",
        origin + localizedPath(path, expected).slice(1) + "?source=seo#options",
      );
      assertPage(document, path, expected);
    }
    assert.deepEqual(errors, []);
  });

  it("WHEN: switching languages THEN: keep the document, query and anchor and remember the choice", async () => {
    const tab = await openPage("ko-KR");
    const path = docRoutes.api;
    const suffix = "?source=seo#options";
    await visit(tab, origin + localizedPath(path, "ko").slice(1) + suffix);
    for (const language of ["zh", "en", "ko", "en"]) {
      await tab.click("header button");
      await Promise.all([
        tab.waitForNavigation({ waitUntil: "networkidle0" }),
        tab.click(`header a[hreflang="${language}"]`),
      ]);
      assert.equal(
        tab.url(),
        origin + localizedPath(path, language).slice(1) + suffix,
      );
      assert.equal(
        await tab.evaluate(() => document.documentElement.lang),
        language,
      );
      assert.equal(
        await tab.evaluate(() => localStorage.getItem("i18nextLng")),
        language,
      );
    }
    await Promise.all([
      tab.waitForNavigation({ waitUntil: "networkidle0" }),
      tab.click('header nav a[href="/docs/getting-started/"]'),
    ]);
    assert.equal(tab.url(), origin + "docs/getting-started/");
    assert.deepEqual(errors, []);
  });

  it("WHEN: loading unknown paths or omitting a slash THEN: avoid indexing fallback pages and use normalized canonicals", async () => {
    for (const pathname of [
      "/missing/",
      "/ko/missing/",
      "/zh/missing/",
      "/en/docs/api/",
    ]) {
      await page.goto(origin + pathname.slice(1), {
        waitUntil: "networkidle0",
      });
      const document = await page.evaluate(extractDocument);
      const { language } = resolveRoute(pathname);
      assert.equal(document.language, language);
      assert.deepEqual(document.robots, ["noindex, follow"]);
      assert.deepEqual(document.alternates, []);
      assert.deepEqual(document.canonicals, [
        siteUrl + localizedPath("/", language),
      ]);
    }
    await page.goto(origin + "ko/docs/api", { waitUntil: "networkidle0" });
    assertPage(await page.evaluate(extractDocument), docRoutes.api, "ko");
    assert.deepEqual(errors, []);
  });
});
