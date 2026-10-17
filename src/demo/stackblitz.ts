// react-snappy-modal declares React 16-18 peers, so pin 18 to keep npm install clean.
const packageJson = (name: string) =>
  JSON.stringify(
    {
      name,
      private: true,
      type: "module",
      scripts: { dev: "vite", build: "vite build" },
      dependencies: {
        react: "^18.3.1",
        "react-dom": "^18.3.1",
        "react-snappy-modal": "^1.1.2",
      },
      devDependencies: {
        "@types/react": "^18.3.12",
        "@types/react-dom": "^18.3.1",
        "@vitejs/plugin-react": "^4.3.4",
        typescript: "~5.7.2",
        vite: "^6.2.0",
      },
    },
    null,
    2,
  ) + "\n";

const tsconfig =
  JSON.stringify(
    {
      compilerOptions: {
        target: "ES2020",
        module: "ESNext",
        moduleResolution: "bundler",
        jsx: "react-jsx",
        strict: true,
        skipLibCheck: true,
        noEmit: true,
        allowImportingTsExtensions: true,
      },
      include: ["src"],
    },
    null,
    2,
  ) + "\n";

// Base look for every demo so the bare markup matches the documentation site.
const baseCss = `*,
*::before,
*::after {
  box-sizing: border-box;
}

:root {
  font-family:
    system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
    sans-serif;
  line-height: 1.5;
  color: #111827;
  background-color: #f9fafb;
  -webkit-font-smoothing: antialiased;
}

body {
  margin: 0;
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 2rem;
}

h1,
h2,
h3 {
  margin: 0 0 1rem;
  line-height: 1.25;
}

p {
  margin: 0 0 1rem;
}

button {
  font: inherit;
  font-weight: 500;
  padding: 0.625rem 1.25rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  background-color: white;
  color: #111827;
  cursor: pointer;
  transition:
    background-color 0.2s,
    border-color 0.2s;
}

button:hover {
  background-color: #f3f4f6;
}

button:focus-visible {
  outline: 2px solid #6366f1;
  outline-offset: 2px;
}

/* The page's main action */
#root > button {
  background-color: #111827;
  border-color: #111827;
  color: white;
}

#root > button:hover {
  background-color: #374151;
}

/* Space out sibling buttons inside a modal without its own layout */
button + button {
  margin-left: 0.5rem;
}

.modal-buttons button + button {
  margin-left: 0;
}

input {
  font: inherit;
}
`;

export type DemoProject = {
  name: string;
  title: string;
  description: string;
  openFile: string;
  // Files under src/, keyed by path relative to src/
  src: Record<string, string>;
};

// Builds a standalone Vite + React project around the given src/ files.
export function demoFiles({ name, title, src }: DemoProject) {
  return {
    "package.json": packageJson(name),
    "index.html": `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`,
    "vite.config.ts": `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({ plugins: [react()] });
`,
    "tsconfig.json": tsconfig,
    "src/index.css": baseCss,
    ...Object.fromEntries(
      Object.entries(src).map(([path, code]) => [
        `src/${path}`,
        (path === "main.tsx" ? "import './index.css';\n" : "") +
          code.trimEnd() +
          "\n",
      ]),
    ),
  };
}

export async function openInStackBlitz(project: DemoProject) {
  const { default: sdk } = await import("@stackblitz/sdk");
  sdk.openProject(
    {
      title: project.title,
      description: project.description,
      template: "node",
      files: demoFiles(project),
    },
    { openFile: `src/${project.openFile}`, newWindow: true },
  );
}
