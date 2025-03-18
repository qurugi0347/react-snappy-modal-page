import React from "react";
import { styled } from "@linaria/react";
import { useTranslation } from "../i18n/i18n";
import { LanguageSwitcher } from "./LanguageSwitcher";

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 0;
  width: 100%;
`;

const Logo = styled.div`
  font-weight: 700;
  font-size: 1.5rem;
  color: #111827;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Nav = styled.nav`
  display: flex;
  gap: 2rem;
`;

const NavLink = styled.a`
  color: #4b5563;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;

  &:hover {
    color: #111827;
  }
`;

const RightContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const GitHubButton = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: #111827;
  color: white;
  border-radius: 0.375rem;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.2s;

  &:hover {
    background-color: #374151;
  }
`;

export const Header: React.FC = () => {
  const { t } = useTranslation();

  return (
    <HeaderContainer>
      <Logo>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"
            fill="#111827"
          />
          <path
            d="M16 11H13V8C13 7.45 12.55 7 12 7C11.45 7 11 7.45 11 8V11H8C7.45 11 7 11.45 7 12C7 12.55 7.45 13 8 13H11V16C11 16.55 11.45 17 12 17C12.55 17 13 16.55 13 16V13H16C16.55 13 17 12.55 17 12C17 11.45 16.55 11 16 11Z"
            fill="#111827"
          />
        </svg>
        {t("header.logo")}
      </Logo>
      <Nav>
        <NavLink href="#features">{t("header.features")}</NavLink>
        <NavLink href="#examples">{t("header.examples")}</NavLink>
        <NavLink href="#installation">{t("header.installation")}</NavLink>
        <NavLink href="#usage">{t("header.usage")}</NavLink>
      </Nav>
      <RightContainer>
        <LanguageSwitcher />
        <GitHubButton
          href="https://github.com/qurugi0347/react-snappy-modal"
          target="_blank"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2C6.477 2 2 6.477 2 12C2 16.418 4.865 20.166 8.839 21.489C9.339 21.581 9.5 21.278 9.5 21.017C9.5 20.78 9.492 20.141 9.489 19.309C6.728 19.91 6.139 17.937 6.139 17.937C5.685 16.803 5.029 16.502 5.029 16.502C4.121 15.88 5.098 15.892 5.098 15.892C6.101 15.962 6.629 16.917 6.629 16.917C7.521 18.412 8.97 17.985 9.519 17.732C9.608 17.087 9.861 16.661 10.141 16.419C7.921 16.175 5.592 15.309 5.592 11.493C5.592 10.4 5.976 9.501 6.649 8.794C6.551 8.546 6.205 7.594 6.747 6.2C6.747 6.2 7.586 5.936 9.476 7.248C10.295 7.03 11.15 6.922 12 6.918C12.85 6.922 13.707 7.03 14.527 7.248C16.414 5.936 17.252 6.2 17.252 6.2C17.796 7.594 17.449 8.546 17.351 8.794C18.025 9.501 18.407 10.4 18.407 11.493C18.407 15.32 16.075 16.171 13.846 16.411C14.192 16.708 14.5 17.29 14.5 18.184C14.5 19.482 14.488 20.692 14.488 21.016C14.488 21.279 14.647 21.585 15.154 21.487C19.134 20.166 22 16.416 22 12C22 6.477 17.523 2 12 2Z"
              fill="white"
            />
          </svg>
          {t("header.github")}
        </GitHubButton>
      </RightContainer>
    </HeaderContainer>
  );
};
