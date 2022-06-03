import React from 'react';
import styled from '@emotion/styled';
import { IconButton, InputBase } from '@mui/material';
import PhotoCameraRoundedIcon from '@mui/icons-material/PhotoCameraRounded';

type Props = {
  setFile: React.Dispatch<React.SetStateAction<FileList | undefined>>;
  uploadButton: React.ReactNode;
};

export const InputFile = ({ setFile, uploadButton }: Props) => {
  const handleFileChange = (e: any) => {
    const file = e.target.files;

    setFile(file as FileList);
  };

  return (
    <label>
      <Input onChange={handleFileChange} style={{ display: 'none' }} type="file" />
      {uploadButton ? (
        uploadButton
      ) : (
        <IconButton color="primary" component="span">
          <PhotoCameraRoundedIcon />
        </IconButton>
      )}
    </label>
  );
};

const Input = styled(InputBase)(() => ({
  fontSize: 16,
  '& .MuiInputBase-input': {
    borderRadius: 50,
    position: 'relative',
    padding: '6px 16px 6px 16px',
    fontSize: 13,
    color: '#f21980',
    '&::-webkit-input-placeholder': {
      color: 'white',
    },
  },
}));
