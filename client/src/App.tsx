import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthLayout, MainLayout, AdminLayout } from '~/components/Layout';
import { Container } from '@mui/material';
import {
  ChatPage,
  HomePage,
  MessagePage,
  NewChatPage,
  NotificationPage,
  ProfilePage,
  SearchPage,
} from '~/pages';
import { Activate, ResetPassword, SignIn, SignUp } from '~/pages/auth';
import { FollowPage } from '~/pages/follow/FollowPage';
import { useAuthContext } from '~/hooks/useAppContext';
import { useEffect } from 'react';
import { useQueryClient } from 'react-query';
import { Chat, Message } from '~/interface';
import { PostDetailPage } from '~/pages/postDetail';
import { socketClient, EVENTS } from '~/socketIO';
import { Notfound } from '~/components/App/Notfound';
import { AdminPage } from './pages/admin/AdminPage';

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
      const messageKey = queryClient.getQueryData<string>('messageKey');
      const chatsKey = queryClient.getQueryData<string>('chatsKey');
      // Add new message if messageKey match
      if (messageKey && messageKey.startsWith(`messages?chat=${message.chat.id}`))
        queryClient.setQueryData(messageKey, (oldMessages: any) => {
          return { ...oldMessages, messages: [message, ...oldMessages.messages] };
        });

      if (chatsKey) {
        queryClient.setQueryData(chatsKey, (oldChats: any) => {
          // Get updated chat index
          const chatIndex = oldChats.chats.findIndex((chat: Chat) => chat.id === message.chat.id);

          // Get ReadBy id
          const readBy = message.readBy.map((user) => user.id);

          // Update to new
          if (oldChats.chats[chatIndex]) {
            oldChats.chats[chatIndex].latestMessage = message;
            oldChats.chats[chatIndex].latestMessage.readBy = readBy;

            oldChats.chats[chatIndex].updatedAt = message.createdAt;
          }

          // Success
          return oldChats;
        });
      }
    });
  }, [queryClient]);

  return (
    <>
      <BrowserRouter>
        <Container sx={{ px: 0 }} maxWidth="lg">
          <Routes>
            <Route path="/auth" element={<AuthLayout />}>
              <Route index element={<SignIn />} />
              <Route path="register" element={<SignUp />} />
              <Route path="reset-password/:reset_token" element={<ResetPassword />} />
              <Route path="activate/:token" element={<Activate />} />
            </Route>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminPage />} />
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
              <Route path="/messages/:chatId" element={<MessagePage />} />
              <Route path="/users/:username/followers" element={<FollowPage />} />
              <Route path="/users/:username/following" element={<FollowPage />} />
              <Route path="/users/:username" element={<ProfilePage />} />
            </Route>
            <Route path="*" element={<Notfound />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </>
  );
}

export default App;
