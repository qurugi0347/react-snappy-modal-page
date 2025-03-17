import { styled } from "@linaria/react";

export const ModalWrapper = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 0.5rem;
  max-width: 28rem;
  width: 100%;
`;

export const ModalTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #111827;
`;

export const ModalText = styled.p`
  color: #4b5563;
  margin-bottom: 1.5rem;
`;

export const ModalButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
`;

export const ModalButton = styled.button<{ primary?: boolean }>`
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

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

export const Label = styled.label`
  font-weight: 500;
  color: #111827;
`;

export const Input = styled.input`
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
