import React from "react";
import { styled } from "@linaria/react";
import { useTranslation } from "react-i18next";
import { docRoutes, localizedPath, type DocPage } from "../routes";
import { currentRoute } from "../i18n/i18n";
import { Seo } from "./Seo";

const pages = Object.keys(docRoutes) as DocPage[];

// Renders `identifier` spans in translation strings as inline code.
const withCode = (text: string) =>
  text
    .split("`")
    .map((part, index) =>
      index % 2 ? <InlineCode key={index}>{part}</InlineCode> : part,
    );

export function DocLayout({
  page,
  children,
}: {
  page: DocPage;
  children: React.ReactNode;
}) {
  const { t } = useTranslation();
  const next = pages[pages.indexOf(page) + 1];

  return (
    <Layout>
      <Seo
        path={docRoutes[page]}
        title={t(`docs.${page}.meta.title`)}
        description={t(`docs.${page}.meta.description`)}
      />
      <Sidebar aria-label={t("docs.nav.label")}>
        {pages.map(key => (
          <SideLink
            key={key}
            href={localizedPath(docRoutes[key], currentRoute.language)}
            aria-current={key === page ? "page" : undefined}
          >
            {t(`docs.${key}.navTitle`)}
          </SideLink>
        ))}
      </Sidebar>
      <Article>
        <Title>{t(`docs.${page}.title`)}</Title>
        <Lead>{withCode(t(`docs.${page}.lead`))}</Lead>
        {children}
        {next && (
          <NextLink
            href={localizedPath(docRoutes[next], currentRoute.language)}
          >
            <small>{t("docs.nav.next")}</small>
            {t(`docs.${next}.navTitle`)} →
          </NextLink>
        )}
      </Article>
    </Layout>
  );
}

export function Section({
  k,
  title,
  level = 2,
  children,
}: {
  k: string;
  title?: string;
  level?: 2 | 3;
  children?: React.ReactNode;
}) {
  const { t } = useTranslation();
  const body = t(`${k}.body`, { returnObjects: true }) as string[];
  const Heading = level === 2 ? H2 : H3;

  return (
    <section id={k.split(".").pop()}>
      <Heading>{withCode(title ?? t(`${k}.title`))}</Heading>
      {body.map(paragraph => (
        <P key={paragraph}>{withCode(paragraph)}</P>
      ))}
      {children}
    </section>
  );
}

export function Bullets({ k }: { k: string }) {
  const { t } = useTranslation();
  const items = t(k, { returnObjects: true }) as string[];

  return (
    <List>
      {items.map(item => (
        <li key={item}>{withCode(item)}</li>
      ))}
    </List>
  );
}

export function DocTable({ k, rows }: { k: string; rows?: string[][] }) {
  const { t } = useTranslation();
  const headings = t(`${k}.headings`, { returnObjects: true }) as string[];
  rows ??= t(`${k}.rows`, { returnObjects: true }) as string[][];

  return (
    <TableScroll>
      <Table>
        <thead>
          <tr>
            {headings.map(heading => (
              <th key={heading}>{heading}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(row => (
            <tr key={row[0]}>
              {row.map((cell, index) => (
                <td key={index}>{withCode(cell)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </TableScroll>
  );
}

const Layout = styled.div`
  display: grid;
  grid-template-columns: 220px minmax(0, 1fr);
  gap: 3rem;
  max-width: 1100px;
  width: 100%;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: minmax(0, 1fr);
    gap: 1.5rem;
  }
`;

const Sidebar = styled.nav`
  position: sticky;
  top: 6rem;
  align-self: start;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  @media (max-width: 768px) {
    position: static;
    flex-direction: row;
    flex-wrap: wrap;
  }
`;

const SideLink = styled.a`
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  color: #4b5563;
  text-decoration: none;
  font-weight: 500;

  &:hover {
    background-color: #f3f4f6;
    color: #111827;
  }

  &[aria-current="page"] {
    background-color: #111827;
    color: white;
  }
`;

const Article = styled.article`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  color: #374151;
  line-height: 1.7;

  section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    scroll-margin-top: 6rem;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #111827;
  line-height: 1.2;
`;

const Lead = styled.p`
  font-size: 1.125rem;
  color: #4b5563;
`;

const H2 = styled.h2`
  margin-top: 2rem;
  font-size: 1.75rem;
  font-weight: 700;
  color: #111827;
`;

const H3 = styled.h3`
  margin-top: 1rem;
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
`;

const P = styled.p``;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-left: 1.25rem;
`;

const InlineCode = styled.code`
  padding: 0.1rem 0.35rem;
  border-radius: 0.25rem;
  background-color: #f3f4f6;
  color: #111827;
  font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace;
  font-size: 0.875em;
`;

const TableScroll = styled.div`
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    padding: 0.75rem;
    border-bottom: 1px solid #e5e7eb;
    text-align: left;
    vertical-align: top;
  }

  th {
    color: #111827;
    font-weight: 600;
  }
`;

const NextLink = styled.a`
  display: flex;
  flex-direction: column;
  align-self: flex-end;
  margin-top: 3rem;
  padding: 1rem 1.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  color: #111827;
  font-weight: 600;
  text-decoration: none;

  small {
    color: #6b7280;
    font-weight: 400;
  }

  &:hover {
    border-color: #111827;
  }
`;
