import React from "react";
import { styled } from "@linaria/react";
import { currentRoute, useTranslation } from "../i18n/i18n";
import { CodeBlock } from "./CodeBlock.tsx";
import { docRoutes, localizedPath, type DocPage } from "../routes";

export const Usage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <UsageContainer id="usage">
      <SectionTitle>{t("usage.title")}</SectionTitle>
      <SectionSubtitle>{t("usage.subtitle")}</SectionSubtitle>
      <UsageWrapper>
        <UsageCard>
          <UsageTitle>{t("usage.basicUsage.title")}</UsageTitle>
          <UsageDescription>
            {t("usage.basicUsage.description")}
          </UsageDescription>
          <CodeBlock
            code={`import React from 'react';
import SnappyModal, { useCurrentModal } from 'react-snappy-modal';

function MyModal() {
  const { resolveModal } = useCurrentModal();

  return (
    <div className="my-modal">
      <h2>My Modal</h2>
      <p>This is a basic modal example.</p>
      <button onClick={() => resolveModal('modal result')}>
        Close Modal
      </button>
    </div>
  );
}

function MyComponent() {
  const showModal = async () => {
    const result = await SnappyModal.show(<MyModal />);
    
    console.log('Modal result:', result);
  };

  return (
    <button onClick={showModal}>Open Modal</button>
  );
}`}
          />
        </UsageCard>

        <UsageCard>
          <UsageTitle>{t("usage.configuringOptions.title")}</UsageTitle>
          <UsageDescription>
            {t("usage.configuringOptions.description")}
          </UsageDescription>
          <CodeBlock
            code={`import SnappyModal, { useCurrentModal } from 'react-snappy-modal';

function CustomModal() {
  const { resolveModal } = useCurrentModal();

  return (
    <div className="my-modal">
      <h2>Custom Modal</h2>
      <p>This modal has custom options.</p>
      <button onClick={() => resolveModal('result')}>
        Close
      </button>
    </div>
  );
}

// Show a modal with custom options
const showCustomModal = async () => {
  const result = await SnappyModal.show(
    <CustomModal />,
    {
      // Modal configuration options
      allowOutsideClick: false,  // Prevent closing when clicking backdrop
      allowScroll: true,         // Allow page scrolling behind modal
      backdrop: true,            // Dim the page behind the modal
      position: 'top-center',    // Position modal at top
      zIndex: 1050              // Custom z-index
    }
  );
  
  console.log('Modal closed with:', result);
};`}
          />
        </UsageCard>

        <DocLinks>
          {(Object.keys(docRoutes) as DocPage[]).map(page => (
            <DocLink
              key={page}
              href={localizedPath(docRoutes[page], currentRoute.language)}
            >
              <strong>{t(`docs.${page}.navTitle`)} →</strong>
              <span>{t(`docs.${page}.summary`)}</span>
            </DocLink>
          ))}
        </DocLinks>
      </UsageWrapper>
    </UsageContainer>
  );
};

const UsageContainer = styled.section`
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

const UsageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

const UsageCard = styled.div`
  background-color: #f9fafb;
  border-radius: 0.5rem;
  padding: 2rem;
`;

const UsageTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 1rem;
`;

const UsageDescription = styled.p`
  color: #4b5563;
  line-height: 1.5;
  margin-bottom: 1.5rem;
`;

const DocLinks = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
`;

const DocLink = styled.a`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1.25rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  color: #4b5563;
  text-decoration: none;
  line-height: 1.5;

  strong {
    color: #111827;
  }

  &:hover {
    border-color: #111827;
  }
`;
