import React from "react";
import { styled } from "@linaria/react";
import { useTranslation } from "../i18n/i18n";
import { CodeBlock } from "./CodeBlock.tsx";

const behaviorKeys = [
  "outsideClick",
  "defaultLayer",
  "noTarget",
  "layers",
  "currentModal",
  "pending",
];

const methodKeys = [
  "show",
  "close",
  "throw",
  "isShow",
  "useCurrentModal",
  "useSnappyModalState",
];

const optionKeys = [
  "allowOutsideClick",
  "allowScroll",
  "backdrop",
  "position",
  "zIndex",
  "layer",
  "className",
  "style",
];

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
import SnappyModal from 'react-snappy-modal';

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
          />
        </UsageCard>

        <UsageCard>
          <UsageTitle>{t("usage.configuringOptions.title")}</UsageTitle>
          <UsageDescription>
            {t("usage.configuringOptions.description")}
          </UsageDescription>
          <CodeBlock
            code={`// Show a modal with custom options
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
          />
        </UsageCard>

        <UsageCard>
          <UsageTitle>{t("usage.realWorld.title")}</UsageTitle>
          <UsageDescription>
            {t("usage.realWorld.description")}
          </UsageDescription>
          <CodeBlock
            code={`import SnappyModal, { useCurrentModal } from 'react-snappy-modal';

function DeleteConfirm({ name }: { name: string }) {
  const { resolveModal } = useCurrentModal();

  return (
    <div className="my-modal">
      <p>Delete "{name}"? This cannot be undone.</p>
      <button onClick={() => resolveModal(false)}>Cancel</button>
      <button onClick={() => resolveModal(true)}>Delete</button>
    </div>
  );
}

async function deleteProject(project: { id: string; name: string }) {
  const confirmed = await SnappyModal.show(
    <DeleteConfirm name={project.name} />,
  );

  // Cancel resolves false, an outside click resolves undefined
  if (!confirmed) return;

  await fetch(\`/api/projects/\${project.id}\`, { method: 'DELETE' });
}`}
          />
        </UsageCard>

        <UsageCard>
          <UsageTitle>{t("usage.behavior.title")}</UsageTitle>
          <BehaviorList>
            {behaviorKeys.map(key => (
              <li key={key}>{t(`usage.behavior.items.${key}`)}</li>
            ))}
          </BehaviorList>
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
              {methodKeys.map(key => (
                <tr key={key}>
                  <Td>
                    <MethodName>
                      {t(`usage.apiReference.methods.${key}.name`)}
                    </MethodName>
                  </Td>
                  <Td>{t(`usage.apiReference.methods.${key}.description`)}</Td>
                </tr>
              ))}
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
              {optionKeys.map(key => (
                <tr key={key}>
                  <Td>
                    <MethodName>{t(`usage.options.${key}.name`)}</MethodName>
                  </Td>
                  <Td>{t(`usage.options.${key}.type`)}</Td>
                  <Td>{t(`usage.options.${key}.default`)}</Td>
                  <Td>{t(`usage.options.${key}.description`)}</Td>
                </tr>
              ))}
            </tbody>
          </ApiTable>
        </UsageCard>
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

const BehaviorList = styled.ul`
  color: #4b5563;
  line-height: 1.6;
  padding-left: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
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
