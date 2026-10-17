// Shared by the Getting Started page and the StackBlitz demo so they never drift.
export const mainCode = `import { createRoot } from 'react-dom/client';
import { SnappyModalProvider } from 'react-snappy-modal';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <SnappyModalProvider>
    <App />
  </SnappyModalProvider>,
);`;

export const chooseColorCode = `import { useCurrentModal } from 'react-snappy-modal';

export function ChooseColor() {
  const { resolveModal } = useCurrentModal();

  return (
    <div style={{ background: 'white', padding: 24, borderRadius: 12 }}>
      <h2>Pick a color</h2>
      <button onClick={() => resolveModal('red')}>Red</button>
      <button onClick={() => resolveModal('blue')}>Blue</button>
      <button onClick={() => resolveModal(null)}>Cancel</button>
    </div>
  );
}`;

export const appCode = `import { useState } from 'react';
import SnappyModal from 'react-snappy-modal';
import { ChooseColor } from './ChooseColor';

export default function App() {
  const [color, setColor] = useState('none');

  const pickColor = async () => {
    const result = await SnappyModal.show(<ChooseColor />);
    // Runs only after the modal is closed
    if (result) setColor(result);
  };

  return <button onClick={pickColor}>Selected: {color}</button>;
}`;

const packageJson = {
  name: "react-snappy-modal-quick-start",
  private: true,
  type: "module",
  scripts: { dev: "vite", build: "vite build" },
  // react-snappy-modal declares React 16-18 peers, so pin 18 to keep npm install clean.
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
};

export const quickStartFiles = {
  "package.json": JSON.stringify(packageJson, null, 2) + "\n",
  "index.html": `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>React Snappy Modal quick start</title>
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
  "tsconfig.json":
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
        },
        include: ["src"],
      },
      null,
      2,
    ) + "\n",
  "src/main.tsx": mainCode + "\n",
  "src/App.tsx": appCode + "\n",
  "src/ChooseColor.tsx": chooseColorCode + "\n",
};

export async function openQuickStartInStackBlitz() {
  const { default: sdk } = await import("@stackblitz/sdk");
  sdk.openProject(
    {
      title: "React Snappy Modal quick start",
      description:
        "Open a modal with SnappyModal.show() and await its result in React.",
      template: "node",
      files: quickStartFiles,
    },
    { openFile: "src/App.tsx", newWindow: true },
  );
}
