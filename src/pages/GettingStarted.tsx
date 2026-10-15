import { CodeBlock } from "../components/CodeBlock";
import { Bullets, DocLayout, DocTable, Section } from "../components/Doc";

const k = "docs.gettingStarted";

export function GettingStarted() {
  return (
    <DocLayout page="gettingStarted">
      <Section k={`${k}.requirements`} />

      <Section k={`${k}.install`}>
        <CodeBlock
          language="bash"
          code={`npm install react-snappy-modal
# or
yarn add react-snappy-modal
# or
pnpm add react-snappy-modal`}
        />
      </Section>

      <Section k={`${k}.provider`}>
        <CodeBlock
          filename="main.tsx"
          code={`import { createRoot } from 'react-dom/client';
import { SnappyModalProvider } from 'react-snappy-modal';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <SnappyModalProvider>
    <App />
  </SnappyModalProvider>,
);`}
        />
      </Section>

      <Section k={`${k}.component`}>
        <CodeBlock
          filename="ChooseColor.tsx"
          code={`import { useCurrentModal } from 'react-snappy-modal';

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
}`}
        />
      </Section>

      <Section k={`${k}.open`}>
        <CodeBlock
          filename="App.tsx"
          code={`import { useState } from 'react';
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
}`}
        />
      </Section>

      <Section k={`${k}.results`}>
        <DocTable k={`${k}.results.table`} />
      </Section>

      <Section k={`${k}.flow`}>
        <Bullets k={`${k}.flow.items`} />
      </Section>

      <Section k={`${k}.troubleshooting`}>
        <DocTable k={`${k}.troubleshooting.table`} />
      </Section>
    </DocLayout>
  );
}
