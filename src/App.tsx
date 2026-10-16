import { styled } from "@linaria/react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { docRoutes } from "./routes";
import { currentRoute } from "./i18n/i18n";
import { Home } from "./pages/Home";
import { GettingStarted } from "./pages/GettingStarted";
import { ApiReference } from "./pages/ApiReference";
import { AsyncConfirmation } from "./pages/AsyncConfirmation";
import { ModalLayers } from "./pages/ModalLayers";

const pages = {
  [docRoutes.gettingStarted]: GettingStarted,
  [docRoutes.api]: ApiReference,
  [docRoutes.asyncConfirmation]: AsyncConfirmation,
  [docRoutes.modalLayers]: ModalLayers,
};

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
  const Page = pages[currentRoute.path as keyof typeof pages] ?? Home;

  return (
    <>
      <HeaderWrapper>
        <Container>
          <Header />
        </Container>
      </HeaderWrapper>
      <AppWrapper>
        <Container>
          <Main>
            <Page />
          </Main>
          <Footer />
        </Container>
      </AppWrapper>
    </>
  );
}

export default App;
