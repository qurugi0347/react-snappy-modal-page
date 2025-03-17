import React from "react";
import { styled } from "@linaria/react";
import { useTranslation } from "react-i18next";
import { CodeBlock } from "./CodeBlock";

const InstallationContainer = styled.section`
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

const InstallationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

const InstallCard = styled.div`
  background-color: #f9fafb;
  border-radius: 0.5rem;
  padding: 2rem;
`;

const TabsContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
`;

const Tab = styled.button<{ active: boolean }>`
  font-weight: 500;
  padding: 0.5rem 1rem;
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ active }) => (active ? "#111827" : "#6b7280")};
  border-bottom: 2px solid
    ${({ active }) => (active ? "#111827" : "transparent")};
  margin-bottom: -1px;

  &:hover {
    color: #111827;
  }
`;

const UsageSteps = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 2rem;
`;

const StepItem = styled.div`
  display: flex;
  gap: 1rem;
`;

const StepNumber = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background-color: #111827;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  flex-shrink: 0;
`;

const StepContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
`;

const StepTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
`;

const StepDescription = styled.p`
  color: #4b5563;
  line-height: 1.5;
`;

export const Installation: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = React.useState<"npm" | "yarn" | "pnpm">(
    "npm",
  );

  return (
    <InstallationContainer id="installation">
      <SectionTitle>{t("installation.title")}</SectionTitle>
      <SectionSubtitle>{t("installation.subtitle")}</SectionSubtitle>
      <InstallationWrapper>
        <InstallCard>
          <TabsContainer>
            <Tab
              active={activeTab === "npm"}
              onClick={() => setActiveTab("npm")}
            >
              {t("installation.npm")}
            </Tab>
            <Tab
              active={activeTab === "yarn"}
              onClick={() => setActiveTab("yarn")}
            >
              {t("installation.yarn")}
            </Tab>
            <Tab
              active={activeTab === "pnpm"}
              onClick={() => setActiveTab("pnpm")}
            >
              {t("installation.pnpm")}
            </Tab>
          </TabsContainer>
          <CodeBlock
            code={
              activeTab === "npm"
                ? "npm install react-snappy-modal"
                : activeTab === "yarn"
                  ? "yarn add react-snappy-modal"
                  : "pnpm add react-snappy-modal"
            }
            language="bash"
          />
        </InstallCard>

        <UsageSteps>
          <StepItem>
            <StepNumber>1</StepNumber>
            <StepContent>
              <StepTitle>{t("installation.steps.step1.title")}</StepTitle>
              <StepDescription>
                {t("installation.steps.step1.description")}
              </StepDescription>
            </StepContent>
          </StepItem>

          <StepItem>
            <StepNumber>2</StepNumber>
            <StepContent>
              <StepTitle>{t("installation.steps.step2.title")}</StepTitle>
              <StepDescription>
                {t("installation.steps.step2.description")}
              </StepDescription>
              <CodeBlock
                code={`import SnappyModal from 'react-snappy-modal';`}
                language="tsx"
              />
            </StepContent>
          </StepItem>

          <StepItem>
            <StepNumber>3</StepNumber>
            <StepContent>
              <StepTitle>{t("installation.steps.step3.title")}</StepTitle>
              <StepDescription>
                {t("installation.steps.step3.description")}
              </StepDescription>
              <CodeBlock
                code={`import { SnappyModalProvider } from 'react-snappy-modal';

function App() {
  return (
    <SnappyModalProvider>
      {/* Your app components */}
    </SnappyModalProvider>
  );
}`}
                language="tsx"
              />
            </StepContent>
          </StepItem>

          <StepItem>
            <StepNumber>4</StepNumber>
            <StepContent>
              <StepTitle>{t("installation.steps.step4.title")}</StepTitle>
              <StepDescription>
                {t("installation.steps.step4.description")}
              </StepDescription>
            </StepContent>
          </StepItem>
        </UsageSteps>
      </InstallationWrapper>
    </InstallationContainer>
  );
};
