import { useState } from 'react';
import { Box, Avatar } from '@mui/material';

import { useAuthContext } from '~/hooks/useAppContext';
import { useCreateComment } from '~/RQhooks';

import { FormTextAndImageSubmit } from '../Forms';

type CommentFormProps = {
  postId: string;
  replyTo?: { name: string; id: string };
  parentId?: string;
};

export const CommentForm = ({ postId, parentId, replyTo }: CommentFormProps) => {
  const { auth } = useAuthContext();

  const initLabel = replyTo?.name && replyTo.id !== auth?.id ? `@${replyTo.name}` : '';

  const [text, setText] = useState('');
  const [image, setImage] = useState<FileList>();
  const [label, setLabel] = useState(initLabel);

  const { mutateAsync, isLoading } = useCreateComment();

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('post', postId);

    if (parentId) formData.append('parentId', parentId);

    if (text) formData.append('text', text);

    if (label && replyTo?.id) formData.append('replyTo', replyTo.id);

    if (image && image.length > 0) formData.append('image', image[0]);

    await mutateAsync(formData);
    handleResetForm();
  };

  const handleResetForm = () => {
    setText('');
    setLabel('');
    setImage(undefined);
  };

  return (
    <>
      <Box my={2} sx={{ display: 'flex', alignItems: 'flex-start' }}>
        {/* Avatar */}
        <Avatar
          src={auth?.profilePic.url}
          alt={auth?.name}
          sx={{ border: '1px solid white', height: 26, width: 26, mr: '6px' }}
        />

        {/* Form */}
        <FormTextAndImageSubmit
          text={text}
          label={label}
          image={image}
          setText={setText}
          setImage={setImage}
          setLabel={setLabel}
          onSubmit={handleSubmit}
          isLoading={isLoading}
          placeholderText="Enter comment..."
          resetForm={handleResetForm}
        />
      </Box>
    </>
  );
};
