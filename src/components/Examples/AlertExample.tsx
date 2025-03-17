import { CodeBlock } from "../CodeBlock.tsx";
import React, { useEffect, useState } from "react";
import {
  ExampleButton,
  ExampleCard,
  ExampleDescription,
  ExampleText,
  ExampleTitle,
} from "./styles.tsx";
import SnappyModal from "react-snappy-modal";
import { useTranslation } from "react-i18next";
import { AlertModal } from "./Modals/Alert";
import alertCode from "./Modals/Alert.tsx?raw";
import { removeImportLines } from "./util.tsx";

export function AlertExample() {
  const { t } = useTranslation();

  // The actual implementation based on the example code
  const showAlert = async () => {
    await SnappyModal.show(<AlertModal />);
    alert("alert closed");
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
      <CodeBlock code={removeImportLines(alertCode + showAlertCode)} />
    </ExampleCard>
  );
}

const showAlertCode = `
const showAlert = async () => {
  await SnappyModal.show(<AlertModal />)
  alert("alert closed")
};
`;
