import React from "react";
import { styled } from "@linaria/react";
import SnappyModal from "react-snappy-modal";
import { useTranslation } from "react-i18next";

const HeroContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 4rem 0;
`;

const Title = styled.h1`
  font-size: 3.75rem;
  font-weight: 800;
  color: #111827;
  line-height: 1.1;
  margin-bottom: 1.5rem;
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: #4b5563;
  max-width: 600px;
  margin-bottom: 2.5rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const PrimaryButton = styled.button`
  background-color: #111827;
  color: white;
  font-weight: 500;
  padding: 0.75rem 1.5rem;
  border-radius: 0.375rem;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #374151;
  }
`;

const SecondaryButton = styled.a`
  color: #111827;
  background-color: white;
  border: 1px solid #e5e7eb;
  font-weight: 500;
  padding: 0.75rem 1.5rem;
  border-radius: 0.375rem;
  cursor: pointer;
  text-decoration: none;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f9fafb;
  }
`;

const ExampleModal = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 0.5rem;
  max-width: 28rem;
  width: 100%;
`;

const ModalTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #111827;
`;

const ModalText = styled.p`
  color: #4b5563;
  margin-bottom: 1.5rem;
`;

const ModalButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
`;

const ModalButton = styled.button<{ primary?: boolean }>`
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

export const Hero: React.FC = () => {
  const { t } = useTranslation();

  const showExampleModal = async () => {
    const result = await SnappyModal.show(
      <ExampleModal>
        <ModalTitle>{t("modal.title")}</ModalTitle>
        <ModalText>{t("modal.content")}</ModalText>
        <ModalButtons>
          <ModalButton onClick={() => SnappyModal.close(false)}>
            {t("modal.cancel")}
          </ModalButton>
          <ModalButton primary onClick={() => SnappyModal.close(true)}>
            {t("modal.confirm")}
          </ModalButton>
        </ModalButtons>
      </ExampleModal>,
    );

    if (result) {
      console.log("User confirmed the modal");
    } else {
      console.log("User cancelled the modal");
    }
  };

  return (
    <HeroContainer>
      <Title>{t("hero.title")}</Title>
      <Subtitle>{t("hero.subtitle")}</Subtitle>
      <ButtonContainer>
        <PrimaryButton onClick={showExampleModal}>
          {t("hero.tryNow")}
        </PrimaryButton>
        <SecondaryButton href="#installation">
          {t("hero.installation")}
        </SecondaryButton>
      </ButtonContainer>
    </HeroContainer>
  );
};
