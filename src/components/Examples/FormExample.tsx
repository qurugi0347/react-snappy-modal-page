import { CodeBlock } from "../CodeBlock.tsx";
import React, { useState } from "react";
import {
  ExampleActions,
  ExampleButton,
  ExampleCard,
  ExampleDescription,
  ExampleText,
  ExampleTitle,
} from "./styles.tsx";
import SnappyModal from "react-snappy-modal";
import { useTranslation } from "../../i18n/i18n";
import { FormModal } from "./Modals/Form";
import formCode from "./Modals/Form.tsx?raw";
import { removeImportLines } from "./util.tsx";
import { StackBlitzButton } from "../StackBlitzButton";
import { formProject, showFormCode } from "../../demo/examples";

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
        <ExampleActions>
          <ExampleButton onClick={showForm}>
            {t("examples.formModal.button")}
          </ExampleButton>
          <StackBlitzButton project={formProject} />
        </ExampleActions>
      </ExampleDescription>
      <CodeBlock code={removeImportLines(formCode + showFormCode)} />
    </ExampleCard>
  );
}
