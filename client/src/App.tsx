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
import { Activate, ResetPassword, SignIn, SignUp } from 'pages/auth';
import { ProtectedRoute } from 'context/ProtectedRoute';
import { storage } from 'utils';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { useAppContext } from 'context/useAppContext';
import { addAuth } from 'context/actions';

function App() {
  return (
    <>
      <BrowserRouter>
        <Container maxWidth="xl">
          <Routes>
            <Route path="/auth" element={<AuthLayout />}>
              <Route index element={<SignIn />} />
              <Route path="register" element={<SignUp />} />
              <Route path="reset-password" element={<ResetPassword />} />
              <Route path="activate/:token" element={<Activate />} />
            </Route>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <MainLayout />
                </ProtectedRoute>
              }
            >
              <Route path="/" element={<HomePage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/search/users" element={<SearchPage />} />
              <Route path="/search/posts" element={<SearchPage />} />
              <Route path="/notification" element={<NotificationPage />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/chat/new" element={<NewChatPage />} />
              <Route path="/message" element={<MessagePage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Route>
          </Routes>
        </Container>
      </BrowserRouter>
    </>
  );
}

export default App;
