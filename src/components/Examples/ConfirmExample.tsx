import { CodeBlock } from "../CodeBlock.tsx";
import React from "react";
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
import { ConfirmModal } from "./Modals/Confirm";
import confirmCode from "./Modals/Confirm.tsx?raw";
import { removeImportLines } from "./util.tsx";
import { StackBlitzButton } from "../StackBlitzButton";
import { confirmProject, showConfirmCode } from "../../demo/examples";

export function ConfirmExample() {
  const { t } = useTranslation();

  // The actual implementation
  const showConfirm = async () => {
    const result = await SnappyModal.show(<ConfirmModal />);
    alert("User confirmed:" + result);
  };

  return (
    <ExampleCard>
      <ExampleDescription>
        <ExampleTitle>{t("examples.confirmModal.title")}</ExampleTitle>
        <ExampleText>{t("examples.confirmModal.description")}</ExampleText>
        <ExampleActions>
          <ExampleButton onClick={showConfirm}>
            {t("examples.confirmModal.button")}
          </ExampleButton>
          <StackBlitzButton project={confirmProject} />
        </ExampleActions>
      </ExampleDescription>
      <CodeBlock code={removeImportLines(confirmCode + showConfirmCode)} />
    </ExampleCard>
  );
}
