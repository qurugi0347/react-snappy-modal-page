import React from "react";
import { styled } from "@linaria/react";
import { useTranslation } from "../i18n/i18n";

const FooterContainer = styled.footer`
  padding: 3rem 0;
  margin-top: 4rem;
  border-top: 1px solid #e5e7eb;
`;

const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
    text-align: center;
  }
`;

const FooterLogo = styled.div`
  font-weight: 700;
  font-size: 1.25rem;
  color: #111827;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem 2rem;
  }
`;

const FooterLink = styled.a`
  color: #4b5563;
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    color: #111827;
  }
`;

const Copyright = styled.p`
  color: #6b7280;
  font-size: 0.875rem;
  margin-top: 2rem;
  text-align: center;
`;

export const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <FooterContainer>
      <FooterContent>
        <FooterLogo>
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
        </FooterLogo>
        <FooterLinks>
          <FooterLink href="#features">{t("header.features")}</FooterLink>
          <FooterLink href="#examples">{t("header.examples")}</FooterLink>
          <FooterLink href="#installation">
            {t("header.installation")}
          </FooterLink>
          <FooterLink href="#usage">{t("header.usage")}</FooterLink>
          <FooterLink
            href="https://github.com/qurugi0347/react-snappy-modal"
            target="_blank"
          >
            {t("header.github")}
          </FooterLink>
          <FooterLink
            href="https://www.npmjs.com/package/react-snappy-modal"
            target="_blank"
          >
            npm
          </FooterLink>
        </FooterLinks>
      </FooterContent>
      <Copyright>
        &copy; {new Date().getFullYear()} {t("header.logo")}. All rights
        reserved.
      </Copyright>
    </FooterContainer>
  );
};
