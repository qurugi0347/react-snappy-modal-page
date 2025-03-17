import React from "react";
import { styled } from "@linaria/react";
import { useTranslation } from "react-i18next";

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

const CodeBlock = styled.pre`
  background-color: #111827;
  color: #e5e7eb;
  padding: 1.5rem;
  border-radius: 0.375rem;
  font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace;
  font-size: 0.875rem;
  line-height: 1.5;
  overflow-x: auto;
`;

const ApiTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 2rem 0;
`;

const Th = styled.th`
  text-align: left;
  padding: 0.75rem;
  border-bottom: 1px solid #e5e7eb;
  font-weight: 600;
  color: #111827;
`;

const Td = styled.td`
  padding: 0.75rem;
  border-bottom: 1px solid #e5e7eb;
  color: #4b5563;
  vertical-align: top;
`;

const MethodName = styled.span`
  font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace;
  font-weight: 500;
  color: #111827;
`;

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
          <CodeBlock>
            {`import React from 'react';
import SnappyModal from 'react-snappy-modal';
import 'react-snappy-modal/dist/index.css';

function MyComponent() {
  const showModal = async () => {
    const result = await SnappyModal.show(
      <div className="my-modal">
        <h2>My Modal</h2>
        <p>This is a basic modal example.</p>
        <button onClick={() => SnappyModal.close('modal result')}>
          Close Modal
        </button>
      </div>
    );
    
    console.log('Modal result:', result);
  };

  return (
    <button onClick={showModal}>Open Modal</button>
  );
}`}
          </CodeBlock>
        </UsageCard>

        <UsageCard>
          <UsageTitle>{t("usage.configuringOptions.title")}</UsageTitle>
          <UsageDescription>
            {t("usage.configuringOptions.description")}
          </UsageDescription>
          <CodeBlock>
            {`// Show a modal with custom options
const showCustomModal = async () => {
  const result = await SnappyModal.show(
    <div className="my-modal">
      <h2>Custom Modal</h2>
      <p>This modal has custom options.</p>
      <button onClick={() => SnappyModal.close('result')}>
        Close
      </button>
    </div>,
    {
      // Modal configuration options
      allowOutsideClick: false,  // Prevent closing when clicking backdrop
      allowScroll: true,         // Allow page scrolling behind modal
      backdrop: 'rgba(0,0,0,0.8)', // Custom backdrop color
      position: 'top-center',    // Position modal at top
      zIndex: 1050              // Custom z-index
    }
  );
  
  console.log('Modal closed with:', result);
};`}
          </CodeBlock>
        </UsageCard>

        <UsageCard>
          <UsageTitle>{t("usage.apiReference.title")}</UsageTitle>
          <ApiTable>
            <thead>
              <tr>
                <Th>{t("usage.options.headings.option")}</Th>
                <Th>{t("usage.options.headings.description")}</Th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <Td>
                  <MethodName>
                    {t("usage.apiReference.methods.show.name")}
                  </MethodName>
                </Td>
                <Td>{t("usage.apiReference.methods.show.description")}</Td>
              </tr>
              <tr>
                <Td>
                  <MethodName>
                    {t("usage.apiReference.methods.close.name")}
                  </MethodName>
                </Td>
                <Td>{t("usage.apiReference.methods.close.description")}</Td>
              </tr>
              <tr>
                <Td>
                  <MethodName>
                    {t("usage.apiReference.methods.throw.name")}
                  </MethodName>
                </Td>
                <Td>{t("usage.apiReference.methods.throw.description")}</Td>
              </tr>
              <tr>
                <Td>
                  <MethodName>
                    {t("usage.apiReference.methods.isShow.name")}
                  </MethodName>
                </Td>
                <Td>{t("usage.apiReference.methods.isShow.description")}</Td>
              </tr>
            </tbody>
          </ApiTable>

          <UsageTitle>{t("usage.options.title")}</UsageTitle>
          <ApiTable>
            <thead>
              <tr>
                <Th>{t("usage.options.headings.option")}</Th>
                <Th>{t("usage.options.headings.type")}</Th>
                <Th>{t("usage.options.headings.default")}</Th>
                <Th>{t("usage.options.headings.description")}</Th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <Td>
                  <MethodName>
                    {t("usage.options.allowOutsideClick.name")}
                  </MethodName>
                </Td>
                <Td>{t("usage.options.allowOutsideClick.type")}</Td>
                <Td>{t("usage.options.allowOutsideClick.default")}</Td>
                <Td>{t("usage.options.allowOutsideClick.description")}</Td>
              </tr>
              <tr>
                <Td>
                  <MethodName>{t("usage.options.allowScroll.name")}</MethodName>
                </Td>
                <Td>{t("usage.options.allowScroll.type")}</Td>
                <Td>{t("usage.options.allowScroll.default")}</Td>
                <Td>{t("usage.options.allowScroll.description")}</Td>
              </tr>
              <tr>
                <Td>
                  <MethodName>{t("usage.options.backdrop.name")}</MethodName>
                </Td>
                <Td>{t("usage.options.backdrop.type")}</Td>
                <Td>{t("usage.options.backdrop.default")}</Td>
                <Td>{t("usage.options.backdrop.description")}</Td>
              </tr>
              <tr>
                <Td>
                  <MethodName>{t("usage.options.position.name")}</MethodName>
                </Td>
                <Td>{t("usage.options.position.type")}</Td>
                <Td>{t("usage.options.position.default")}</Td>
                <Td>{t("usage.options.position.description")}</Td>
              </tr>
              <tr>
                <Td>
                  <MethodName>{t("usage.options.zIndex.name")}</MethodName>
                </Td>
                <Td>{t("usage.options.zIndex.type")}</Td>
                <Td>{t("usage.options.zIndex.default")}</Td>
                <Td>{t("usage.options.zIndex.description")}</Td>
              </tr>
            </tbody>
          </ApiTable>
        </UsageCard>
      </UsageWrapper>
    </UsageContainer>
  );
};
