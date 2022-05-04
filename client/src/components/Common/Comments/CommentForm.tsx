import { useState } from 'react';
import { Box, IconButton, Avatar } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import PhotoCameraRoundedIcon from '@mui/icons-material/PhotoCameraRounded';
import { pink } from '@mui/material/colors';
import { toast } from 'react-toastify';

import { useAppContext } from 'hooks/useAppContext';
import { useCreateComment } from 'RQhooks';
import { ImagePreview } from '../Images/ImagePreview';
import { TextareaSubmit } from '../Forms/TextareaSubmit';
import { InputFile } from '../Forms/InputFile';
import { CancelButton, AddLoadingButton } from 'components/Common/Buttons';

type CommentFormProps = {
  postId: string;
  replyTo?: { name: string; id: string };
  parentId?: string;
};

export const CommentForm = ({ postId, parentId, replyTo }: CommentFormProps) => {
  const { state } = useAppContext();
  const { auth } = state;

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
    handleReset();
  };

  const handleReset = () => {
    setText('');
    setLabel('');
    setImage(undefined);
  };

  return (
    <>
      <Box my={2} sx={{ display: 'flex', alignItems: 'flex-start' }}>
        {/* Avatar */}
        <Avatar sx={styles.avatar} alt={auth?.name} src={auth?.profilePic.url} />

        {/* Form */}
        <form style={{ width: '100%' }}>
          <Box sx={styles.inputContainer}>
            <TextareaSubmit
              handleSubmit={handleSubmit}
              text={text}
              setText={setText}
              autoFocus={true}
              label={label}
              setLabel={setLabel}
              disabled={isLoading}
            />

            {!(image && image.length > 0) && (
              <InputFile
                setFile={setImage}
                uploadButton={
                  <IconButton sx={styles.icons} component="span">
                    <PhotoCameraRoundedIcon />
                  </IconButton>
                }
              />
            )}
          </Box>

          {image && image.length > 0 && (
            <Box sx={styles.imagePreviewContainer} mt={2}>
              <Box sx={{ maxWidth: 120 }}>
                <ImagePreview url={URL.createObjectURL(image[0])} />
              </Box>
              <IconButton
                onClick={() => setImage(undefined)}
                size="small"
                sx={{ svg: { color: '#898b8e' } }}
              >
                <HighlightOffIcon fontSize="inherit" />
              </IconButton>
            </Box>
          )}

          {(text || image) && (
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', my: 1 }}>
              <CancelButton onClick={handleReset} />
              <AddLoadingButton onClick={handleSubmit} loading={isLoading} />
            </Box>
          )}
        </form>
      </Box>
    </>
  );
};

const styles = {
  icons: {
    color: '#898b8e',
    cursor: 'pointer',
    transition: 'all 0.3s',
    p: '4px',
    '&:hover': { bgcolor: '#3a3b3c' },
    svg: { height: 18, width: 18 },
  },

  loadingButton: {
    textTransform: 'capitalize',
    '&:disabled': {
      background: pink[400],
      div: { color: 'white' },
    },
  },

  imagePreviewContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },

  avatar: { border: '1px solid white', height: 26, width: 26, mr: '6px' },
  inputContainer: { display: 'flex', alignItems: 'flex-end', borderBottom: '1px solid #38444d' },
};
