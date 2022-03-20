import { BrowserRouter } from 'react-router-dom';
import { MainLayout } from 'components/Layout';
import { Container } from '@mui/material';

function App() {
  return (
    <>
      <BrowserRouter>
        <Container maxWidth="xl">
          <MainLayout />
        </Container>
      </BrowserRouter>
    </>
  );
}

export default App;
