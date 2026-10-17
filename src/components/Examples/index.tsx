import React, { useState } from "react";
import { styled } from "@linaria/react";
import { AlertExample } from "./AlertExample.tsx";
import { ConfirmExample } from "./ConfirmExample.tsx";
import { FormExample } from "./FormExample.tsx";
import { useTranslation } from "../../i18n/i18n";

export const Examples: React.FC = () => {
  const { t } = useTranslation();
  return (
    <ExamplesContainer id="examples">
      <SectionTitle>{t("examples.title")}</SectionTitle>
      <SectionSubtitle>{t("examples.subtitle")}</SectionSubtitle>
      <ExamplesWrapper>
        <AlertExample />
        <ConfirmExample />
        <FormExample />
      </ExamplesWrapper>
    </ExamplesContainer>
  );
};

const ExamplesContainer = styled.section`
  padding: 2rem 0;
  scroll-margin-top: 5rem;
`;

const SectionTitle = styled.h2`
  font-size: 2.25rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const SectionSubtitle = styled.p`
  font-size: 1.125rem;
  color: #4b5563;
  max-width: 600px;
  margin: 0 auto 3rem auto;
  text-align: center;
`;

const ExamplesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;
