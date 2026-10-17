import { CodeBlock } from "../components/CodeBlock";
import { Bullets, DocLayout, DocTable, Section } from "../components/Doc";
import { StackBlitzButton } from "../components/StackBlitzButton";
import {
  appCode,
  chooseColorCode,
  mainCode,
  quickStartProject,
} from "../demo/quickStart";

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
        <CodeBlock filename="main.tsx" code={mainCode} />
      </Section>

      <Section k={`${k}.component`}>
        <CodeBlock filename="ChooseColor.tsx" code={chooseColorCode} />
      </Section>

      <Section k={`${k}.open`}>
        <CodeBlock filename="App.tsx" code={appCode} />
        <StackBlitzButton project={quickStartProject} />
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
