import { useTranslation } from "react-i18next";
import { CodeBlock } from "../components/CodeBlock";
import { Bullets, DocLayout, DocTable, Section } from "../components/Doc";

const k = "docs.api";

const methods = [
  [
    "show",
    "SnappyModal.show(component, options?)",
    `const result = await SnappyModal.show(<MyModal />, { layer: 1 });`,
  ],
  [
    "close",
    "SnappyModal.close(value?, layerOrId = 0)",
    `SnappyModal.close('done');          // first modal on layer 0
SnappyModal.close('done', 1);       // first modal on layer 1
SnappyModal.close('done', modalId); // one specific modal`,
  ],
  [
    "throw",
    "SnappyModal.throw(error?, layerOrId = 0)",
    `try {
  await SnappyModal.show(<UploadModal />);
} catch (error) {
  // SnappyModal.throw(new Error('Upload failed')) lands here
}`,
  ],
  [
    "isShow",
    "SnappyModal.isShow()",
    `if (!SnappyModal.isShow()) {
  SnappyModal.show(<Welcome />);
}`,
  ],
  [
    "useCurrentModal",
    "useCurrentModal()",
    `function Confirm() {
  const { resolveModal, rejectModal, layer, modalId } = useCurrentModal();
  return <button onClick={() => resolveModal(true)}>OK</button>;
}`,
  ],
  [
    "useSnappyModalState",
    "useSnappyModalState()",
    `function ModalCount() {
  const { isShow, modalProgress } = useSnappyModalState();
  return isShow ? <span>{modalProgress.length} open</span> : null;
}`,
  ],
  [
    "provider",
    "<SnappyModalProvider>",
    `<SnappyModalProvider>
  <App />
</SnappyModalProvider>`,
  ],
];

const options = [
  ["allowOutsideClick", "boolean", "true"],
  ["allowScroll", "boolean", "false"],
  ["backdrop", "boolean | string", "true"],
  ["position", "string", "'center'"],
  ["zIndex", "number", "1000"],
  ["layer", "number", "0"],
  ["className", "string", "-"],
  ["style", "React.CSSProperties", "-"],
];

export function ApiReference() {
  const { t } = useTranslation();

  return (
    <DocLayout page="api">
      <Section k={`${k}.exports`}>
        <CodeBlock
          code={`import SnappyModal, {
  SnappyModalProvider,
  useCurrentModal,
  useSnappyModalState,
} from 'react-snappy-modal';`}
        />
      </Section>

      {methods.map(([key, signature, example]) => (
        <Section
          key={key}
          k={`${k}.methods.${key}`}
          title={`\`${signature}\``}
          level={3}
        >
          <CodeBlock code={example} />
        </Section>
      ))}

      <Section k={`${k}.options`}>
        <DocTable
          k={`${k}.options.table`}
          rows={options.map(([name, type, defaultValue]) => [
            `\`${name}\``,
            `\`${type}\``,
            `\`${defaultValue}\``,
            t(`${k}.options.descriptions.${name}`),
          ])}
        />
      </Section>

      <Section k={`${k}.backdropNote`}>
        <CodeBlock
          language="css"
          code={`.snappy-modal-area.backdrop {
  --snappy-modal-backdrop-color: rgba(15, 23, 42, 0.8);
}`}
        />
      </Section>

      <Section k={`${k}.targeting`}>
        <Bullets k={`${k}.targeting.items`} />
      </Section>

      <Section k={`${k}.typescript`}>
        <CodeBlock
          code={`import type { ReactElement } from 'react';
import SnappyModal from 'react-snappy-modal';

type SnappyModalOptions = Parameters<typeof SnappyModal.show>[1];

export function showModal<T>(
  element: ReactElement,
  options?: SnappyModalOptions,
): Promise<T | undefined> {
  return SnappyModal.show(element, options);
}

const confirmed = await showModal<boolean>(<Confirm />); // boolean | undefined`}
        />
      </Section>
    </DocLayout>
  );
}
