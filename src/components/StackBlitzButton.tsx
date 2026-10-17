import { styled } from "@linaria/react";
import { useTranslation } from "react-i18next";
import { openInStackBlitz, type DemoProject } from "../demo/stackblitz";

export function StackBlitzButton({ project }: { project: DemoProject }) {
  const { t } = useTranslation();

  return (
    <Button type="button" onClick={() => openInStackBlitz(project)}>
      <svg viewBox="0 0 28 28" width="16" height="16" aria-hidden="true">
        <path
          fill="currentColor"
          d="M12.75 16.4H4L19.25 0l-4 11.6H24L8.75 28z"
        />
      </svg>
      {t("demo.openStackBlitz")}
    </Button>
  );
}

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  width: fit-content;
  padding: 0.625rem 1.25rem;
  border: 1px solid #1389fd;
  border-radius: 0.375rem;
  background-color: #1389fd;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0c6fd1;
  }
`;
