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
import { FormModal } from "./Modals/Form";
import formCode from "./Modals/Form.tsx?raw";
import { removeImportLines } from "./util.tsx";

export function FormExample() {
  const { t } = useTranslation();
  const [name, setName] = useState("");

  // The actual implementation
  const showForm = async () => {
    const result = await SnappyModal.show(<FormModal />);

    if (result) {
      alert("Submitted name:" + result);
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
      <CodeBlock code={removeImportLines(formCode + showFormCode)} />
    </ExampleCard>
  );
}

const showFormCode = `
const showForm = async () => {
  const result = await SnappyModal.show(<FormModal />);
  
  if (result) {
    alert("Submitted name:" + result);
  }
};
`;
