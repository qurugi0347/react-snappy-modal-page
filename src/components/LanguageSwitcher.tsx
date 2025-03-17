import React, { useState, useRef, useEffect } from "react";
import { styled } from "@linaria/react";
import { useTranslation } from "react-i18next";

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

const LanguageOption = styled.button<{ active: boolean }>`
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
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const currentLanguage = i18n.language;

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setIsOpen(false);
  };

  // Get display name for current language
  const getCurrentLanguageDisplay = () => {
    switch (currentLanguage) {
      case "en":
        return t("languageSwitcher.english");
      case "ko":
        return t("languageSwitcher.korean");
      default:
        return t("languageSwitcher.english");
    }
  };

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
        {getCurrentLanguageDisplay()}
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
        <LanguageOption
          active={currentLanguage === "en"}
          onClick={() => changeLanguage("en")}
        >
          {t("languageSwitcher.english")}
        </LanguageOption>
        <LanguageOption
          active={currentLanguage === "ko"}
          onClick={() => changeLanguage("ko")}
        >
          {t("languageSwitcher.korean")}
        </LanguageOption>
      </DropdownMenu>
    </SwitcherContainer>
  );
};
