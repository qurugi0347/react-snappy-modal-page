import { CodeBlock } from "../components/CodeBlock";
import { Bullets, DocLayout, DocTable, Section } from "../components/Doc";

const k = "docs.asyncConfirmation";

export function AsyncConfirmation() {
  return (
    <DocLayout page="asyncConfirmation">
      <Section k={`${k}.why`}>
        <CodeBlock
          code={`// State-driven: one action, three places
const [isOpen, setIsOpen] = useState(false);
<button onClick={() => setIsOpen(true)}>Delete</button>
<ConfirmDialog open={isOpen} onConfirm={deleteProject} onCancel={() => setIsOpen(false)} />

// Promise-driven: one function
async function onDelete() {
  if (!(await SnappyModal.show(<ConfirmDialog />))) return;
  await deleteProject();
}`}
        />
      </Section>

      <Section k={`${k}.confirm`}>
        <CodeBlock
          filename="ConfirmDialog.tsx"
          code={`import { useCurrentModal } from 'react-snappy-modal';

type Props = { title: string; message: string; confirmLabel?: string };

export function ConfirmDialog({ title, message, confirmLabel = 'Confirm' }: Props) {
  const { resolveModal } = useCurrentModal();

  return (
    <div role="dialog" aria-modal="true" className="dialog">
      <h2>{title}</h2>
      <p>{message}</p>
      <button onClick={() => resolveModal(false)}>Cancel</button>
      <button onClick={() => resolveModal(true)}>{confirmLabel}</button>
    </div>
  );
}`}
        />
      </Section>

      <Section k={`${k}.outcomes`}>
        <DocTable k={`${k}.outcomes.table`} />
        <CodeBlock
          code={`const confirmed = await SnappyModal.show(
  <ConfirmDialog title="Delete project?" message="This cannot be undone." confirmLabel="Delete" />,
);

if (!confirmed) return; // false (Cancel) or undefined (backdrop click)`}
        />
      </Section>

      <Section k={`${k}.errors`}>
        <CodeBlock
          code={`async function deleteProject(project: { id: string; name: string }) {
  const confirmed = await SnappyModal.show(
    <ConfirmDialog
      title={\`Delete "\${project.name}"?\`}
      message="This cannot be undone."
      confirmLabel="Delete"
    />,
  );
  if (!confirmed) return;

  try {
    const response = await fetch(\`/api/projects/\${project.id}\`, { method: 'DELETE' });
    if (!response.ok) throw new Error(\`Server responded with \${response.status}\`);
  } catch (error) {
    await SnappyModal.show(<AlertDialog message={String(error)} />);
  }
}`}
        />
      </Section>

      <Section k={`${k}.pending`}>
        <CodeBlock
          filename="DeleteDialog.tsx"
          code={`function DeleteDialog({ projectId }: { projectId: string }) {
  const { resolveModal } = useCurrentModal();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const confirm = async () => {
    setSaving(true);
    setError('');
    try {
      const response = await fetch(\`/api/projects/\${projectId}\`, { method: 'DELETE' });
      if (response.ok) return resolveModal(true);
      setError(\`Delete failed (\${response.status}). Please try again.\`);
    } catch {
      setError('Network error. Check your connection and try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="dialog">
      <p>Delete this project?</p>
      {error && <p role="alert">{error}</p>}
      <button disabled={saving} onClick={() => resolveModal(false)}>Cancel</button>
      <button disabled={saving} onClick={confirm}>{saving ? 'Deleting…' : 'Delete'}</button>
    </div>
  );
}

const deleted = await SnappyModal.show(<DeleteDialog projectId={id} />, {
  allowOutsideClick: false,
});`}
        />
      </Section>

      <Section k={`${k}.rejection`}>
        <CodeBlock
          code={`try {
  const file = await SnappyModal.show(<UploadDialog />);
  attach(file);
} catch (error) {
  // rejectModal(error) or SnappyModal.throw(error) lands here
  report(error);
}`}
        />
      </Section>

      <Section k={`${k}.doubleOpen`}>
        <CodeBlock
          code={`async function onDelete() {
  if (SnappyModal.isShow()) return; // a dialog is already open
  const confirmed = await SnappyModal.show(<ConfirmDialog title="Delete?" message="…" />);
  // ...
}`}
        />
      </Section>

      <Section k={`${k}.checklist`}>
        <Bullets k={`${k}.checklist.items`} />
      </Section>
    </DocLayout>
  );
}
