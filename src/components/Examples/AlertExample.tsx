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
import { styled } from "@linaria/react";

// Define code as a template literal to be reused in both the function and code block
const alertCode = `// Show a simple alert modal
const showAlert = async () => {
  await SnappyModal.show(
    <AlertModal>
      <ModalTitle>Alert</ModalTitle>
      <ModalText>
        This is a simple alert modal...
      </ModalText>
      <ModalButton 
        onClick={() => SnappyModal.close()}>
        OK
      </ModalButton>
    </AlertModal>
  );
  console.log('Alert closed');
};`;

export function AlertExample() {
  const { t } = useTranslation();

  // The actual implementation based on the example code
  const showAlert = async () => {
    await SnappyModal.show(
      <AlertModal>
        <ModalTitle>{t("examples.modalComponents.alert")}</ModalTitle>
        <ModalText>{t("examples.modalComponents.alertContent")}</ModalText>
        <ModalButtons>
          <ModalButton primary onClick={() => SnappyModal.close()}>
            {t("modal.confirm")}
          </ModalButton>
        </ModalButtons>
      </AlertModal>,
    );
    console.log("Alert closed");
  };

  return (
    <ExampleCard>
      <ExampleDescription>
        <ExampleTitle>{t("examples.alertModal.title")}</ExampleTitle>
        <ExampleText>{t("examples.alertModal.description")}</ExampleText>
        <ExampleButton onClick={showAlert}>
          {t("examples.alertModal.button")}
        </ExampleButton>
      </ExampleDescription>
      <CodeBlock code={alertCode} />
    </ExampleCard>
  );
}

const AlertModal = styled.div`
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
