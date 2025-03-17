import {
  ModalButton,
  ModalButtons,
  ModalText,
  ModalTitle,
  ModalWrapper,
} from "./styles.tsx";
import SnappyModal from "react-snappy-modal";
import React from "react";

export function AlertModal() {
  return (
    <ModalWrapper>
      <ModalTitle>Alert</ModalTitle>
      <ModalText>
        This is a simple alert modal that displays information to the user.
      </ModalText>
      <ModalButtons>
        <ModalButton primary onClick={() => SnappyModal.close()}>
          Confirm
        </ModalButton>
      </ModalButtons>
    </ModalWrapper>
  );
}
