import { CodeBlock } from "../CodeBlock.tsx";
import React, { useEffect, useState } from "react";
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
import { AlertModal } from "./Modals/Alert";
import alertCode from "./Modals/Alert.tsx?raw";
import { removeImportLines } from "./util.tsx";
import { StackBlitzButton } from "../StackBlitzButton";
import { alertProject, showAlertCode } from "../../demo/examples";

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
        <ExampleActions>
          <ExampleButton onClick={showAlert}>
            {t("examples.alertModal.button")}
          </ExampleButton>
          <StackBlitzButton project={alertProject} />
        </ExampleActions>
      </ExampleDescription>
      <CodeBlock code={removeImportLines(alertCode + showAlertCode)} />
    </ExampleCard>
  );
}
