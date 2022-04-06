import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthLayout, MainLayout } from 'components/Layout';
import { Container } from '@mui/material';
import {
  ChatPage,
  HomePage,
  MessagePage,
  NewChatPage,
  NotificationPage,
  ProfilePage,
  SearchPage,
} from 'pages';
import { ResetPassword, SignIn, SignUp } from 'pages/auth';

function App() {
  return (
    <>
      <BrowserRouter>
        <Container maxWidth="xl">
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/notification" element={<NotificationPage />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/chat/new" element={<NewChatPage />} />
              <Route path="/message" element={<MessagePage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Route>
            <Route path="/" element={<AuthLayout />}>
              <Route path="login" element={<SignIn />} />
              <Route path="register" element={<SignUp />} />
              <Route path="reset-password" element={<ResetPassword />} />
            </Route>
          </Routes>
        </Container>
      </BrowserRouter>
    </>
  );
}

export default App;
