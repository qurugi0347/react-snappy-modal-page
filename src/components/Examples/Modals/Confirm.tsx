import {
  ModalButton,
  ModalButtons,
  ModalText,
  ModalTitle,
  ModalWrapper,
} from "./styles.tsx";
import SnappyModal from "react-snappy-modal";
import React from "react";

export function ConfirmModal() {
  return (
    <ModalWrapper>
      <ModalTitle>Confirm Action</ModalTitle>
      <ModalText>Are you sure you want to proceed?</ModalText>
      <ModalButtons>
        <ModalButton onClick={() => SnappyModal.close(false)}>
          Cancel
        </ModalButton>
        <ModalButton primary onClick={() => SnappyModal.close(true)}>
          Confirm
        </ModalButton>
      </ModalButtons>
    </ModalWrapper>
  );
}
