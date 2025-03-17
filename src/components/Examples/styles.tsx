import { styled } from "@linaria/react";

export const ExampleCard = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: center;
  padding: 2rem;
  border-radius: 0.5rem;
  background-color: #f9fafb;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const ExampleDescription = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ExampleTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: #111827;
`;

export const ExampleText = styled.p`
  color: #4b5563;
  line-height: 1.5;
`;

export const ExampleButton = styled.button`
  background-color: #111827;
  color: white;
  font-weight: 500;
  padding: 0.75rem 1.5rem;
  border-radius: 0.375rem;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
  width: fit-content;

  &:hover {
    background-color: #374151;
  }
`;
