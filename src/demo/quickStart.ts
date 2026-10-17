import type { DemoProject } from "./stackblitz";

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

export const quickStartProject: DemoProject = {
  name: "react-snappy-modal-quick-start",
  title: "React Snappy Modal quick start",
  description:
    "Open a modal with SnappyModal.show() and await its result in React.",
  openFile: "App.tsx",
  src: {
    "main.tsx": mainCode,
    "App.tsx": appCode,
    "ChooseColor.tsx": chooseColorCode,
  },
};
