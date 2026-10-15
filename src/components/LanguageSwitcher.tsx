import React, { useState, useRef, useEffect } from "react";
import { styled } from "@linaria/react";
import { currentRoute } from "../i18n/i18n";
import { localizedPath, supportedLanguages } from "../routes";

const languageNames = { en: "English", ko: "한국어", zh: "中文" };

const SwitcherContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const DropdownButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  background-color: white;
  color: #111827;
  border: 1px solid #e5e7eb;
  transition: all 0.2s;

  &:hover {
    background-color: #f3f4f6;
  }
`;

const DropdownIcon = styled.div<{ isOpen: boolean }>`
  margin-left: 0.25rem;
  transform: ${props => (props.isOpen ? "rotate(180deg)" : "rotate(0deg)")};
  transition: transform 0.2s ease;
`;

const DropdownMenu = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 0.25rem;
  width: 160px;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  z-index: 20;
  display: ${props => (props.isOpen ? "block" : "none")};
  overflow: hidden;
`;

const LanguageOption = styled.a<{ active: boolean }>`
  display: block;
  box-sizing: border-box;
  text-decoration: none;
  width: 100%;
  text-align: left;
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  cursor: pointer;
  background-color: ${props => (props.active ? "#f3f4f6" : "white")};
  color: ${props => (props.active ? "#111827" : "#6b7280")};
  border: none;
  border-bottom: 1px solid #e5e7eb;
  transition: all 0.2s;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #f9fafb;
  }
`;

export const LanguageSwitcher: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const currentLanguage = currentRoute.language;
  const suffix = window.location.search + window.location.hash;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <SwitcherContainer ref={dropdownRef}>
      <DropdownButton onClick={() => setIsOpen(!isOpen)}>
        {languageNames[currentLanguage]}
        <DropdownIcon isOpen={isOpen}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 10L12 15L17 10"
              stroke="#111827"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </DropdownIcon>
      </DropdownButton>

      <DropdownMenu isOpen={isOpen}>
        {supportedLanguages.map(language => (
          <LanguageOption
            key={language}
            active={currentLanguage === language}
            href={localizedPath(currentRoute.path, language) + suffix}
            hrefLang={language}
            lang={language}
            aria-current={currentLanguage === language ? "page" : undefined}
          >
            {languageNames[language]}
          </LanguageOption>
        ))}
      </DropdownMenu>
    </SwitcherContainer>
  );
};
