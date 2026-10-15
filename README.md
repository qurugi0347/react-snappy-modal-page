# React + TypeScript + Vite

## Localized documentation and search indexing

English retains the existing URLs. Korean uses `/ko/` and simplified Chinese
uses `/zh/`, including each documentation and guide path:

| Page | English | Korean | Chinese |
| --- | --- | --- | --- |
| Home | `/` | `/ko/` | `/zh/` |
| Getting started | `/docs/getting-started/` | `/ko/docs/getting-started/` | `/zh/docs/getting-started/` |
| API | `/docs/api/` | `/ko/docs/api/` | `/zh/docs/api/` |
| Async confirmation | `/guides/async-confirmation/` | `/ko/guides/async-confirmation/` | `/zh/guides/async-confirmation/` |
| Modal layers | `/guides/modal-layers/` | `/ko/guides/modal-layers/` | `/zh/guides/modal-layers/` |

The URL is the only language source. Stored preferences and browser language
do not redirect visitors or change the content served at a URL. The language
switcher navigates to the same page in the selected language, preserving query
parameters and anchors. Internal links stay in the current language.
Prerendering pins `navigator.language` to `en-US` for deterministic builds.

`src/routes.ts` defines the shared paths and languages used by the app and build.
Each page has a translated title and description, `html lang`, a self-canonical
URL, reciprocal `en`/`ko`/`zh` hreflang links, and matching Open Graph metadata.
The English URL is also `x-default`; there is no separate `/en/` URL.
Missing trailing slashes are recognized with slash-terminated canonicals.
Unknown paths retain the home fallback but receive `noindex, follow` and no
hreflang links. This is a client-side safeguard, not an HTTP 404 or CDN redirect.

### Build and verify

```sh
npm run build
npm run test:seo
```

The build prerenders all **15** URLs to `dist/<path>/index.html` and generates
`dist/sitemap.xml` with the same URLs and reciprocal alternates. There is no
manually maintained sitemap in `public/`. Deploy the entire `dist/` directory;
S3/CloudFront must serve each nested directory's `index.html` and its root assets.
No infrastructure configuration or deployment is performed by these commands.

The SEO regression suite uses Node.js 20.12+ (matching `.nvmrc`), the existing
Vite/Puppeteer dependencies and a temporary local preview server. It parses every build
HTML and the sitemap, then checks live URL language precedence, internal links,
language switching and unknown routes. Third-party browser requests are blocked.
If Puppeteer's bundled browser is unavailable, use an installed Chrome:

```sh
PUPPETEER_EXECUTABLE_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" npm run build
PUPPETEER_EXECUTABLE_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" npm run test:seo
```

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
