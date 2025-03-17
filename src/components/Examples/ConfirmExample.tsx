import { CodeBlock } from "../CodeBlock.tsx";
import React from "react";
import {
  ExampleButton,
  ExampleCard,
  ExampleDescription,
  ExampleText,
  ExampleTitle,
} from "./styles.tsx";
import SnappyModal from "react-snappy-modal";
import { useTranslation } from "react-i18next";

const confirmCode = `// Show a confirmation modal
const showConfirm = async () => {
  const result = await SnappyModal.show(
    <ConfirmModal>
      <ModalTitle>Confirm Action</ModalTitle>
      <ModalText>
        Are you sure you want to proceed?
      </ModalText>
      <ModalButtons>
        <ModalButton 
          onClick={() => SnappyModal.close(false)}>
          Cancel
        </ModalButton>
        <ModalButton 
          onClick={() => SnappyModal.close(true)}>
          Confirm
        </ModalButton>
      </ModalButtons>
    </ConfirmModal>
  );
  
  if (result) {
    // User confirmed
  } else {
    // User cancelled
  }
};`;

export function ConfirmExample() {
  const { t } = useTranslation();

  // Define code as a template literal to be reused in both the function and code block

  // The actual implementation based on the example code
  const showConfirm = async () => {
    const result = await SnappyModal.show(
      <ConfirmModal>
        <ModalTitle>{t("examples.modalComponents.confirmTitle")}</ModalTitle>
        <ModalText>{t("examples.modalComponents.confirmContent")}</ModalText>
        <ModalButtons>
          <ModalButton onClick={() => SnappyModal.close(false)}>
            {t("modal.cancel")}
          </ModalButton>
          <ModalButton primary onClick={() => SnappyModal.close(true)}>
            {t("modal.confirm")}
          </ModalButton>
        </ModalButtons>
      </ConfirmModal>,
    );

    console.log("User confirmed:", result);
  };

  return (
    <ExampleCard>
      <ExampleDescription>
        <ExampleTitle>{t("examples.confirmModal.title")}</ExampleTitle>
        <ExampleText>{t("examples.confirmModal.description")}</ExampleText>
        <ExampleButton onClick={showConfirm}>
          {t("examples.confirmModal.button")}
        </ExampleButton>
      </ExampleDescription>
      <CodeBlock code={confirmCode} />
    </ExampleCard>
  );
}

const ConfirmModal = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 0.5rem;
  max-width: 28rem;
  width: 100%;
`;

const ModalTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #111827;
`;

const ModalText = styled.p`
  color: #4b5563;
  margin-bottom: 1.5rem;
`;

const ModalButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
`;

const ModalButton = styled.button<{ primary?: boolean }>`
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;

  ${({ primary }) =>
    primary
      ? `
      background-color: #111827;
      color: white;
      border: none;
      
      &:hover {
        background-color: #374151;
      }
    `
      : `
      background-color: white;
      color: #111827;
      border: 1px solid #e5e7eb;
      
      &:hover {
        background-color: #f9fafb;
      }
    `}
`;
