import { useState } from 'react';
import { Box } from '@mui/material';

import { FormTextAndImageSubmit } from 'components/Common/Forms';
import { useCreateMessage } from 'RQhooks/message.rq';

type Props = {
  chatId: string;
};

export const MessageFooter = ({ chatId }: Props) => {
  const [text, setText] = useState('');
  const [image, setImage] = useState<FileList>();

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
        placeholderText="Enter message..."
      />
    </Box>
  );
};
