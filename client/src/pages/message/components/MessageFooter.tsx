import { useEffect, useState } from 'react';
import { Box } from '@mui/material';

import { FormTextAndImageSubmit } from '~/components/Common/Forms';
import { useCreateMessage } from '~/RQhooks/message.rq';
import { socketClient, EVENTS } from '~/socketIO';

type Props = {
  chatId: string;
};

export const MessageFooter = ({ chatId }: Props) => {
  const [text, setText] = useState('');
  const [image, setImage] = useState<FileList>();
  const [isTyping, setIsTyping] = useState(false);

  const { mutateAsync, isLoading } = useCreateMessage();

  const handleSubmit = async () => {
    setIsTyping(false);

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
  };

  const handleTyping = () => {
    if (!isTyping) {
      socketClient.emit(EVENTS.typing, chatId);
      setIsTyping(true);
    }
  };

  useEffect(() => {
    let lastTypingTime = new Date().getTime();
    let timerLength = 800; // 3s

    let typingTimeout = setTimeout(() => {
      let timeNow = new Date().getTime();
      let timeDiff = timeNow - lastTypingTime;

      if ((timeDiff >= timerLength && isTyping) || !text) {
        setIsTyping(false);
        socketClient.emit(EVENTS.stopTyping, chatId);
      }
    }, timerLength);

    return () => clearTimeout(typingTimeout);
  }, [isTyping, text, chatId]);

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
