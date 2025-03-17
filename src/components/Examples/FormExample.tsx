import { CodeBlock } from "../CodeBlock.tsx";
import React, { useState } from "react";
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
const formCode = `// Show a form modal
const showForm = async () => {
  const [name, setName] = useState('');
  
  const result = await SnappyModal.show(
    <FormModal>
      <ModalTitle>Enter Your Name</ModalTitle>
      <FormGroup>
        <Label>Full Name</Label>
        <Input 
          value={name} 
          onChange={(e) => setName(e.target.value)}
        />
      </FormGroup>
      <ModalButtons>
        <ModalButton 
          onClick={() => SnappyModal.close(null)}>
          Cancel
        </ModalButton>
        <ModalButton 
          onClick={() => SnappyModal.close(name)}>
          Submit
        </ModalButton>
      </ModalButtons>
    </FormModal>
  );
  
  if (result) {
    console.log('Submitted:', result);
  }
};`;

export function FormExample() {
  const { t } = useTranslation();
  const [name, setName] = useState("");

  // The actual implementation based on the example code
  const showForm = async () => {
    const result = await SnappyModal.show(
      <FormModal>
        <ModalTitle>{t("examples.modalComponents.formTitle")}</ModalTitle>
        <FormGroup>
          <Label htmlFor="name">
            {t("examples.modalComponents.formLabel")}
          </Label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder={t("examples.modalComponents.formPlaceholder")}
          />
        </FormGroup>
        <ModalButtons>
          <ModalButton onClick={() => SnappyModal.close(null)}>
            {t("modal.cancel")}
          </ModalButton>
          <ModalButton primary onClick={() => SnappyModal.close(name)}>
            {t("modal.confirm")}
          </ModalButton>
        </ModalButtons>
      </FormModal>,
    );

    if (result) {
      console.log("Submitted name:", result);
    }
  };

  return (
    <ExampleCard>
      <ExampleDescription>
        <ExampleTitle>{t("examples.formModal.title")}</ExampleTitle>
        <ExampleText>{t("examples.formModal.description")}</ExampleText>
        <ExampleButton onClick={showForm}>
          {t("examples.formModal.button")}
        </ExampleButton>
      </ExampleDescription>
      <CodeBlock code={formCode} />
    </ExampleCard>
  );
}

const FormModal = styled.div`
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

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  font-weight: 500;
  color: #111827;
`;

const Input = styled.input`
  padding: 0.5rem;
  border-radius: 0.375rem;
  border: 1px solid #e5e7eb;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #6366f1;
    box-shadow: 0 0 0 1px #6366f1;
  }
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
