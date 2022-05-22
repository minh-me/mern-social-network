import { useState } from 'react';
import { Box } from '@mui/material';

import { FormTextAndImageSubmit } from 'components/Common/Forms';
import { useCreateMessage } from 'RQhooks/message.rq';
import { socketClient } from 'hooks/socket';
import { EVENTS } from 'contants/events';

type Props = {
  chatId: string;
};

export const MessageFooter = ({ chatId }: Props) => {
  const [text, setText] = useState('');
  const [image, setImage] = useState<FileList>();
  const [isTyping, setIsTyping] = useState(false);

  const { mutateAsync, isLoading } = useCreateMessage();

  const handleSubmit = async () => {
    const formData = new FormData();

    text && formData.append('text', text);
    image && formData.append('image', image[0]);
    formData.append('chat', chatId);

    await mutateAsync(formData);

    handleResetForm();
  };

  const handleResetForm = () => {
    setText('');
    setImage(undefined);
    setIsTyping(false);
  };

  const handleTyping = () => {
    if (!isTyping) {
      socketClient.emit(EVENTS.typing, chatId);
      setIsTyping(true);
    }

    let lastTypingTime = new Date().getTime();
    let timerLength = 3000; // 3s

    setTimeout(() => {
      let timeNow = new Date().getTime();
      let timeDiff = timeNow - lastTypingTime;

      if (timeDiff >= timerLength && isTyping) {
        setIsTyping(false);
        socketClient.emit(EVENTS.stopTyping, chatId);
      }
    }, timerLength);
  };

  return (
    <Box p={2} sx={{ display: 'flex', alignItems: 'center' }}>
      <FormTextAndImageSubmit
        text={text}
        setText={setText}
        image={image}
        setImage={setImage}
        onSubmit={handleSubmit}
        resetForm={handleResetForm}
        isLoading={isLoading}
        onTyping={handleTyping}
        placeholderText="Enter message..."
      />
    </Box>
  );
};
