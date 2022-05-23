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
import { FollowPage } from 'pages/follow/FollowPage';
import { socketClient } from 'hooks/socket';
import { EVENTS } from 'contants/events';
import { useAuthContext } from 'hooks/useAppContext';
import { useEffect } from 'react';
import { useQueryClient } from 'react-query';
import { Message } from 'interface';
import { PostDetailPage } from 'pages/postDetail';

function App() {
  const { auth } = useAuthContext();
  const queryClient = useQueryClient();

  // Setup socket
  useEffect(() => {
    auth && socketClient.emit(EVENTS.setup, auth);
  }, [auth]);

  // Received message
  useEffect(() => {
    socketClient.on(EVENTS.messageReceived, (message: Message) => {
      const messageKey = queryClient.getQueryData('messageKey') as string;
      // Add new message if messageKey match
      if (messageKey.startsWith(`messages?chat=${message.chat.id}`))
        queryClient.setQueryData(messageKey, (oldMessages: any) => {
          return { ...oldMessages, messages: [message, ...oldMessages.messages] };
        });
    });
  }, [queryClient]);

  return (
    <>
      <BrowserRouter>
        <Container maxWidth="lg">
          <Routes>
            <Route path="/auth" element={<AuthLayout />}>
              <Route index element={<SignIn />} />
              <Route path="register" element={<SignUp />} />
              <Route path="reset-password/:reset_token" element={<ResetPassword />} />
              <Route path="activate/:token" element={<Activate />} />
            </Route>
            <Route path="/" element={<MainLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/posts/:postId" element={<PostDetailPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/search/users" element={<SearchPage />} />
              <Route path="/search/posts" element={<SearchPage />} />
              <Route path="/notification" element={<NotificationPage />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/chat/new" element={<NewChatPage />} />
              <Route path="/messages" element={<MessagePage />} />
              <Route path="/messages/:chatId" element={<MessagePage />} />
              <Route path="/users/:username/followers" element={<FollowPage />} />
              <Route path="/users/:username/following" element={<FollowPage />} />
              <Route path="/users/:username" element={<ProfilePage />} />
            </Route>
          </Routes>
        </Container>
      </BrowserRouter>
    </>
  );
}

export default App;
