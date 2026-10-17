import type { DemoProject } from "./stackblitz";
import { mainCode } from "./quickStart";
import alertModalCode from "../components/Examples/Modals/Alert.tsx?raw";
import confirmModalCode from "../components/Examples/Modals/Confirm.tsx?raw";
import formModalCode from "../components/Examples/Modals/Form.tsx?raw";

// Handlers shown in the home example cards and run in their StackBlitz demos.
export const showAlertCode = `
const showAlert = async () => {
  await SnappyModal.show(<AlertModal />)
  alert("alert closed")
};
`;

export const showConfirmCode = `
const showConfirm = async () => {
  const result = await SnappyModal.show(<ConfirmModal />);
  alert("User confirmed:" + result);

  if (result) {
    // User confirmed
  } else {
    // User cancelled
  }
};
`;

export const showFormCode = `
const showForm = async () => {
  const result = await SnappyModal.show(<FormModal />);
  
  if (result) {
    alert("Submitted name:" + result);
  }
};
`;

// Plain-CSS stand-in for the site's Linaria styles, with the same exports.
const modalStylesCode = `import type { ComponentProps } from 'react';
import './styles.css';

const withClass =
  <T extends keyof JSX.IntrinsicElements>(Tag: T, className: string) =>
  (props: ComponentProps<T>) => {
    const Component = Tag as any;
    return <Component {...props} className={className} />;
  };

export const ModalWrapper = withClass('div', 'modal-wrapper');
export const ModalTitle = withClass('h2', 'modal-title');
export const ModalText = withClass('p', 'modal-text');
export const ModalButtons = withClass('div', 'modal-buttons');
export const FormGroup = withClass('div', 'form-group');
export const Label = withClass('label', 'label');
export const Input = withClass('input', 'input');

export function ModalButton({
  primary,
  ...props
}: ComponentProps<'button'> & { primary?: boolean }) {
  return (
    <button {...props} className={primary ? 'modal-button primary' : 'modal-button'} />
  );
}`;

const modalStylesCss = `.modal-wrapper {
  background-color: white;
  padding: 2rem;
  border-radius: 0.5rem;
  max-width: 32rem;
  min-width: 24rem;
  width: 100%;
  font-family: system-ui, sans-serif;
}
.modal-title { font-size: 1.5rem; font-weight: 600; margin: 0 0 1rem; color: #111827; }
.modal-text { color: #4b5563; margin: 0 0 1.5rem; }
.modal-buttons { display: flex; justify-content: flex-end; gap: 0.75rem; }
.modal-button {
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  background-color: white;
  color: #111827;
  border: 1px solid #e5e7eb;
}
.modal-button:hover { background-color: #f9fafb; }
.modal-button.primary { background-color: #111827; color: white; border: none; }
.modal-button.primary:hover { background-color: #374151; }
.form-group { display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1.5rem; }
.label { font-weight: 500; color: #111827; }
.input { padding: 0.5rem; border-radius: 0.375rem; border: 1px solid #e5e7eb; font-size: 1rem; }
.input:focus { outline: none; border-color: #6366f1; box-shadow: 0 0 0 1px #6366f1; }
`;

function exampleProject(
  key: string,
  label: string,
  modal: string,
  modalCode: string,
  handlerName: string,
  handlerCode: string,
): DemoProject {
  return {
    name: `react-snappy-modal-${key.toLowerCase()}-example`,
    title: `React Snappy Modal ${label} example`,
    description: `${label} modal built with react-snappy-modal.`,
    openFile: "App.tsx",
    src: {
      "main.tsx": mainCode,
      "App.tsx": `import SnappyModal from 'react-snappy-modal';
import { ${modal} } from './Modals/${key}';

export default function App() {${handlerCode.replace(/^/gm, "  ").replace(/[ \t]+$/gm, "").trimEnd()}

  return (
    <button onClick={${handlerName}}>
      Show ${label}
    </button>
  );
}`,
      [`Modals/${key}.tsx`]: modalCode,
      "Modals/styles.tsx": modalStylesCode,
      "Modals/styles.css": modalStylesCss,
    },
  };
}

export const alertProject = exampleProject(
  "Alert",
  "Alert",
  "AlertModal",
  alertModalCode,
  "showAlert",
  showAlertCode,
);
export const confirmProject = exampleProject(
  "Confirm",
  "Confirm",
  "ConfirmModal",
  confirmModalCode,
  "showConfirm",
  showConfirmCode,
);
export const formProject = exampleProject(
  "Form",
  "Form",
  "FormModal",
  formModalCode,
  "showForm",
  showFormCode,
);
