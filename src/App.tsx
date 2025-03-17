import { styled } from "@linaria/react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Features } from "./components/Features";
import { Examples } from "./components/Examples";
import { Installation } from "./components/Installation";
import { Usage } from "./components/Usage";
import { Footer } from "./components/Footer";
import { SEO } from "./components/SEO";

const AppWrapper = styled.div`
  color: #1f2937;
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    Roboto,
    "Helvetica Neue",
    Arial,
    sans-serif;
  overflow-x: hidden;
`;

const Container = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const HeaderWrapper = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  background-color: white;
  z-index: 100;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.3s ease;
  border-bottom: 1px solid #e5e7eb;
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  gap: 4rem;
  padding: 4rem 0 2rem;
`;

function App() {
  return (
    <>
      <SEO />
      <HeaderWrapper>
        <Container>
          <Header />
        </Container>
      </HeaderWrapper>
      <AppWrapper>
        <Container>
          <Main>
            <Hero />
            <Features />
            <Examples />
            <Installation />
            <Usage />
          </Main>
          <Footer />
        </Container>
      </AppWrapper>
    </>
  );
}

export default App;
