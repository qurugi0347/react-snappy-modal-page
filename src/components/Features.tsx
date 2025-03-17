import React from 'react'
import { styled } from '@linaria/react'
import { useTranslation } from 'react-i18next'

const FeaturesContainer = styled.section`
  padding: 2rem 0;
  scroll-margin-top: 5rem;
`

const SectionTitle = styled.h2`
  font-size: 2.25rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 1.5rem;
  text-align: center;
`

const SectionSubtitle = styled.p`
  font-size: 1.125rem;
  color: #4b5563;
  max-width: 600px;
  margin: 0 auto 3rem auto;
  text-align: center;
`

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`

const FeatureCard = styled.div`
  display: flex;
  flex-direction: column;
`

const FeatureIconContainer = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 0.5rem;
  background-color: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
`

const FeatureTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.5rem;
`

const FeatureDescription = styled.p`
  color: #4b5563;
  line-height: 1.5;
`

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Feature: React.FC<FeatureProps> = ({ icon, title, description }) => {
  return (
    <FeatureCard>
      <FeatureIconContainer>{icon}</FeatureIconContainer>
      <FeatureTitle>{title}</FeatureTitle>
      <FeatureDescription>{description}</FeatureDescription>
    </FeatureCard>
  )
}

export const Features: React.FC = () => {
  const { t } = useTranslation();

  return (
    <FeaturesContainer id="features">
      <SectionTitle>{t('features.title')}</SectionTitle>
      <SectionSubtitle>
        {t('features.subtitle')}
      </SectionSubtitle>
      <FeaturesGrid>
        <Feature
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 16.1716L19.071 6.1005L20.4852 7.51472L9 18.9999L3.51472 13.5146L4.92893 12.1004L9 16.1716Z" fill="#111827"/>
            </svg>
          }
          title={t('features.promiseBased.title')}
          description={t('features.promiseBased.description')}
        />
        <Feature
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 10.12H14.22L16.96 7.3C14.23 4.6 9.81 4.5 7.08 7.2C4.35 9.91 4.35 14.28 7.08 17C9.81 19.7 14.23 19.7 16.96 17C18.32 15.65 19 14.08 19 12.1H21C21 14.08 20.12 16.65 18.36 18.39C14.85 21.87 9.15 21.87 5.64 18.39C2.14 14.92 2.11 9.28 5.62 5.81C9.13 2.34 14.76 2.34 18.27 5.81L21 3V10.12ZM12.5 8V12.25L16 14.33L15.28 15.54L11 13V8H12.5Z" fill="#111827"/>
            </svg>
          }
          title={t('features.lightweight.title')}
          description={t('features.lightweight.description')}
        />
        <Feature
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 21C5.9 21 5 20.1 5 19V5C5 3.9 5.9 3 7 3H17C18.1 3 19 3.9 19 5V19C19 20.1 18.1 21 17 21H7ZM7 5V19H17V5H7Z" fill="#111827"/>
              <path d="M11 8H13V16H11V8ZM15 12H17V16H15V12ZM7 12H9V16H7V12Z" fill="#111827"/>
            </svg>
          }
          title={t('features.customizable.title')}
          description={t('features.customizable.description')}
        />
        <Feature
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2ZM18 20H6V4H13V9H18V20Z" fill="#111827"/>
              <path d="M9 13V15H15V13H9ZM9 17V19H15V17H9Z" fill="#111827"/>
            </svg>
          }
          title={t('features.typeSafe.title')}
          description={t('features.typeSafe.description')}
        />
        <Feature
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 8L15 12H18C18 15.31 15.31 18 12 18C10.99 18 10.03 17.75 9.2 17.3L7.74 18.76C8.97 19.54 10.43 20 12 20C16.42 20 20 16.42 20 12H23L19 8ZM6 12C6 8.69 8.69 6 12 6C13.01 6 13.97 6.25 14.8 6.7L16.26 5.24C15.03 4.46 13.57 4 12 4C7.58 4 4 7.58 4 12H1L5 16L9 12H6Z" fill="#111827"/>
            </svg>
          }
          title={t('features.controlledFlow.title')}
          description={t('features.controlledFlow.description')}
        />
        <Feature
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17 3H7C5.9 3 5 3.9 5 5V21L12 18L19 21V5C19 3.9 18.1 3 17 3ZM17 18L12 15.82L7 18V5H17V18Z" fill="#111827"/>
            </svg>
          }
          title={t('features.react18.title')}
          description={t('features.react18.description')}
        />
      </FeaturesGrid>
    </FeaturesContainer>
  )
}