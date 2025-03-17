import React, { useState } from 'react'
import { styled } from '@linaria/react'
import SnappyModal from 'react-snappy-modal'
import { useTranslation } from 'react-i18next'

const ExamplesContainer = styled.section`
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

const ExamplesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`

const ExampleCard = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: center;
  padding: 2rem;
  border-radius: 0.5rem;
  background-color: #f9fafb;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const ExampleDescription = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const ExampleTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: #111827;
`

const ExampleText = styled.p`
  color: #4b5563;
  line-height: 1.5;
`

const ExampleCode = styled.div`
  background-color: #111827;
  color: #e5e7eb;
  padding: 1.5rem;
  border-radius: 0.375rem;
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
  font-size: 0.875rem;
  line-height: 1.5;
  overflow-x: auto;
`

const ExampleButton = styled.button`
  background-color: #111827;
  color: white;
  font-weight: 500;
  padding: 0.75rem 1.5rem;
  border-radius: 0.375rem;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
  width: fit-content;

  &:hover {
    background-color: #374151;
  }
`

const AlertModal = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 0.5rem;
  max-width: 28rem;
  width: 100%;
`

const ModalTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #111827;
`

const ModalText = styled.p`
  color: #4b5563;
  margin-bottom: 1.5rem;
`

const ModalButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
`

const ModalButton = styled.button<{ primary?: boolean }>`
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  
  ${({ primary }) => primary 
    ? `
      background-color: #111827;
      color: white;
      border: none;
      
      &:hover {
        background-color: #374151;
      }
    ` 
    : `
      background-color: white;
      color: #111827;
      border: 1px solid #e5e7eb;
      
      &:hover {
        background-color: #f9fafb;
      }
    `}
`

const ConfirmModal = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 0.5rem;
  max-width: 28rem;
  width: 100%;
`

const FormModal = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 0.5rem;
  max-width: 28rem;
  width: 100%;
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`

const Label = styled.label`
  font-weight: 500;
  color: #111827;
`

const Input = styled.input`
  padding: 0.5rem;
  border-radius: 0.375rem;
  border: 1px solid #e5e7eb;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #6366f1;
    box-shadow: 0 0 0 1px #6366f1;
  }
`

export const Examples: React.FC = () => {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  
  const showAlert = async () => {
    await SnappyModal.show(
      <AlertModal>
        <ModalTitle>{t('examples.modalComponents.alert')}</ModalTitle>
        <ModalText>
          {t('examples.modalComponents.alertContent')}
        </ModalText>
        <ModalButtons>
          <ModalButton primary onClick={() => SnappyModal.close()}>{t('modal.confirm')}</ModalButton>
        </ModalButtons>
      </AlertModal>
    );
    console.log('Alert closed');
  };

  const showConfirm = async () => {
    const result = await SnappyModal.show(
      <ConfirmModal>
        <ModalTitle>{t('examples.modalComponents.confirmTitle')}</ModalTitle>
        <ModalText>
          {t('examples.modalComponents.confirmContent')}
        </ModalText>
        <ModalButtons>
          <ModalButton onClick={() => SnappyModal.close(false)}>{t('modal.cancel')}</ModalButton>
          <ModalButton primary onClick={() => SnappyModal.close(true)}>{t('modal.confirm')}</ModalButton>
        </ModalButtons>
      </ConfirmModal>
    );
    
    console.log('User confirmed:', result);
  };

  const showForm = async () => {
    const result = await SnappyModal.show(
      <FormModal>
        <ModalTitle>{t('examples.modalComponents.formTitle')}</ModalTitle>
        <FormGroup>
          <Label htmlFor="name">{t('examples.modalComponents.formLabel')}</Label>
          <Input 
            id="name" 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)}
            placeholder={t('examples.modalComponents.formPlaceholder')} 
          />
        </FormGroup>
        <ModalButtons>
          <ModalButton onClick={() => SnappyModal.close(null)}>{t('modal.cancel')}</ModalButton>
          <ModalButton primary onClick={() => SnappyModal.close(name)}>{t('modal.confirm')}</ModalButton>
        </ModalButtons>
      </FormModal>
    );
    
    if (result) {
      console.log('Submitted name:', result);
    }
  };

  return (
    <ExamplesContainer id="examples">
      <SectionTitle>{t('examples.title')}</SectionTitle>
      <SectionSubtitle>
        {t('examples.subtitle')}
      </SectionSubtitle>
      <ExamplesWrapper>
        <ExampleCard>
          <ExampleDescription>
            <ExampleTitle>{t('examples.alertModal.title')}</ExampleTitle>
            <ExampleText>
              {t('examples.alertModal.description')}
            </ExampleText>
            <ExampleButton onClick={showAlert}>{t('examples.alertModal.button')}</ExampleButton>
          </ExampleDescription>
          <ExampleCode>
            {`// Show a simple alert modal
const showAlert = async () => {
  await SnappyModal.show(
    <AlertModal>
      <ModalTitle>Alert</ModalTitle>
      <ModalText>
        This is a simple alert modal...
      </ModalText>
      <ModalButton 
        onClick={() => SnappyModal.close()}>
        OK
      </ModalButton>
    </AlertModal>
  );
  console.log('Alert closed');
};`}
          </ExampleCode>
        </ExampleCard>
        
        <ExampleCard>
          <ExampleDescription>
            <ExampleTitle>{t('examples.confirmModal.title')}</ExampleTitle>
            <ExampleText>
              {t('examples.confirmModal.description')}
            </ExampleText>
            <ExampleButton onClick={showConfirm}>{t('examples.confirmModal.button')}</ExampleButton>
          </ExampleDescription>
          <ExampleCode>
            {`// Show a confirmation modal
const showConfirm = async () => {
  const result = await SnappyModal.show(
    <ConfirmModal>
      <ModalTitle>Confirm Action</ModalTitle>
      <ModalText>
        Are you sure you want to proceed?
      </ModalText>
      <ModalButtons>
        <ModalButton 
          onClick={() => SnappyModal.close(false)}>
          Cancel
        </ModalButton>
        <ModalButton 
          onClick={() => SnappyModal.close(true)}>
          Confirm
        </ModalButton>
      </ModalButtons>
    </ConfirmModal>
  );
  
  if (result) {
    // User confirmed
  } else {
    // User cancelled
  }
};`}
          </ExampleCode>
        </ExampleCard>
        
        <ExampleCard>
          <ExampleDescription>
            <ExampleTitle>{t('examples.formModal.title')}</ExampleTitle>
            <ExampleText>
              {t('examples.formModal.description')}
            </ExampleText>
            <ExampleButton onClick={showForm}>{t('examples.formModal.button')}</ExampleButton>
          </ExampleDescription>
          <ExampleCode>
            {`// Show a form modal
const showForm = async () => {
  const [name, setName] = useState('');
  
  const result = await SnappyModal.show(
    <FormModal>
      <ModalTitle>Enter Your Name</ModalTitle>
      <FormGroup>
        <Label>Full Name</Label>
        <Input 
          value={name} 
          onChange={(e) => setName(e.target.value)}
        />
      </FormGroup>
      <ModalButtons>
        <ModalButton 
          onClick={() => SnappyModal.close(null)}>
          Cancel
        </ModalButton>
        <ModalButton 
          onClick={() => SnappyModal.close(name)}>
          Submit
        </ModalButton>
      </ModalButtons>
    </FormModal>
  );
  
  if (result) {
    console.log('Submitted:', result);
  }
};`}
          </ExampleCode>
        </ExampleCard>
      </ExamplesWrapper>
    </ExamplesContainer>
  )
}