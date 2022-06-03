import { Box, IconButton } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import PhotoCameraRoundedIcon from '@mui/icons-material/PhotoCameraRounded';
import { pink } from '@mui/material/colors';

import { ImagePreview } from '../Images/ImagePreview';
import { TextareaSubmit } from './TextareaSubmit';
import { InputFile } from './InputFile';
import { CancelButton, AddLoadingButton } from '~/components/Common/Buttons';

type Props = {
  text: string;
  image?: FileList;
  label?: string;

  setText: React.Dispatch<React.SetStateAction<string>>;
  setImage: React.Dispatch<React.SetStateAction<FileList | undefined>>;
  setLabel?: React.Dispatch<React.SetStateAction<string>>;

  onSubmit: () => void;
  resetForm: () => void;
  onTyping?: () => void;

  isLoading?: boolean;
  placeholderText?: string;
};

export const FormTextAndImageSubmit = ({
  text,
  setText,
  image,
  setImage,
  label,
  setLabel,
  onSubmit,
  resetForm,
  onTyping,
  isLoading = false,
  placeholderText = 'Enter text...',
}: Props) => {
  return (
    <>
      <form style={{ width: '100%' }}>
        <Box sx={styles.inputContainer}>
          <TextareaSubmit
            onSubmit={onSubmit}
            text={text}
            setText={setText}
            autoFocus={true}
            label={label}
            setLabel={setLabel}
            disabled={isLoading}
            placeholder={placeholderText}
            onTyping={onTyping}
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
              disabled={isLoading}
            >
              <HighlightOffIcon fontSize="inherit" />
            </IconButton>
          </Box>
        )}

        {(text || image) && (
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', my: 1 }}>
            <CancelButton disabled={isLoading} onClick={resetForm} />
            <AddLoadingButton onClick={onSubmit} loading={isLoading} />
          </Box>
        )}
      </form>
    </>
  );
};

const styles = {
  inputContainer: {
    display: 'flex',
    alignItems: 'flex-end',
    borderBottom: '1px solid #38444d',
    position: 'relative',
  },
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
};
