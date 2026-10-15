import { CodeBlock } from "../components/CodeBlock";
import { Bullets, DocLayout, DocTable, Section } from "../components/Doc";

const k = "docs.modalLayers";

export function ModalLayers() {
  return (
    <DocLayout page="modalLayers">
      <Section k={`${k}.concepts`}>
        <DocTable k={`${k}.concepts.table`} />
      </Section>

      <Section k={`${k}.pitfall`}>
        <CodeBlock
          code={`function Child() {
  // Looks for the first modal on layer 0 — that is the Parent
  return <button onClick={() => SnappyModal.close('child done')}>Done</button>;
}

function Parent() {
  return <button onClick={() => SnappyModal.show(<Child />)}>Open child</button>;
}

SnappyModal.show(<Parent />); // layer 0
// Clicking "Done" closes Parent; Child stays on screen`}
        />
      </Section>

      <Section k={`${k}.currentModal`}>
        <CodeBlock
          code={`function Child() {
  const { resolveModal } = useCurrentModal();
  return <button onClick={() => resolveModal('child done')}>Done</button>;
}

function Parent() {
  const { resolveModal } = useCurrentModal();

  const openChild = async () => {
    const answer = await SnappyModal.show(<Child />);
    if (answer) resolveModal(answer); // close Parent only after Child answered
  };

  return <button onClick={openChild}>Open child</button>;
}`}
        />
      </Section>

      <Section k={`${k}.explicitLayer`}>
        <CodeBlock
          code={`const LAYER = { page: 0, picker: 1, alert: 2 } as const;

SnappyModal.show(<ColorPicker />, { layer: LAYER.picker });

// Later, from anywhere (a timer, a keyboard shortcut, ...)
SnappyModal.close(undefined, LAYER.picker);`}
        />
      </Section>

      <Section k={`${k}.byId`}>
        <CodeBlock
          code={`function UploadProgress({ onReady }: { onReady: (id: string) => void }) {
  const { modalId } = useCurrentModal();
  useEffect(() => onReady(modalId), [modalId, onReady]);
  return <p>Uploading…</p>;
}

const opened = Promise.withResolvers<string>();
SnappyModal.show(<UploadProgress onReady={opened.resolve} />, { allowOutsideClick: false });

// Wait for the ID too: closing with an empty ID would target layer 0 instead
const [modalId] = await Promise.all([opened.promise, upload(file)]);
SnappyModal.close('uploaded', modalId);`}
        />
      </Section>

      <Section k={`${k}.outsideClick`} />

      <Section k={`${k}.state`}>
        <CodeBlock
          code={`function useEscapeToGoBack() {
  const { isShow } = useSnappyModalState();

  useEffect(() => {
    if (isShow) return; // let the open modal handle the keyboard
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') history.back();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isShow]);
}`}
        />
      </Section>

      <Section k={`${k}.checklist`}>
        <Bullets k={`${k}.checklist.items`} />
      </Section>
    </DocLayout>
  );
}
