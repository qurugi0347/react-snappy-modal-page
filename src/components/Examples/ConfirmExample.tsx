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
import { useTranslation } from "../../i18n/i18n";
import { ConfirmModal } from "./Modals/Confirm";
import confirmCode from "./Modals/Confirm.tsx?raw";
import { removeImportLines } from "./util.tsx";

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
        <ExampleButton onClick={showConfirm}>
          {t("examples.confirmModal.button")}
        </ExampleButton>
      </ExampleDescription>
      <CodeBlock code={removeImportLines(confirmCode + showConfirmCode)} />
    </ExampleCard>
  );
}

const showConfirmCode = `
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
