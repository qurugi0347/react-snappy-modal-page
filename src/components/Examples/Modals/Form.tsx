import {
  ModalButton,
  ModalButtons,
  ModalTitle,
  ModalWrapper,
  FormGroup,
  Label,
  Input,
} from "./styles.tsx";
import SnappyModal from "react-snappy-modal";
import React, { useState } from "react";

export function FormModal() {
  const [name, setName] = useState("");

  return (
    <ModalWrapper>
      <ModalTitle>Enter Your Name</ModalTitle>
      <FormGroup>
        <Label>Full Name</Label>
        <Input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Enter your full name"
        />
      </FormGroup>
      <ModalButtons>
        <ModalButton onClick={() => SnappyModal.close(null)}>
          Cancel
        </ModalButton>
        <ModalButton primary onClick={() => SnappyModal.close(name)}>
          Submit
        </ModalButton>
      </ModalButtons>
    </ModalWrapper>
  );
}
