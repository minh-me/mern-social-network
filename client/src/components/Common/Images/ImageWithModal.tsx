import { FC, useState } from 'react';
import { Box, SxProps, Theme } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

type Props = {
  imageUrl: string;
  alt: string;
  sx?: SxProps<Theme>;
};

export const ImageWithModal: FC<Props> = ({ imageUrl, sx, alt }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Box
        sx={{
          textAlign: 'center',
          img: { maxWidth: '100%', maxHeight: '100%', borderRadius: 1 },
          ...sx,
        }}
      >
        <img onClick={() => setOpen(true)} src={imageUrl} alt={alt} />
      </Box>

      <Dialog
        maxWidth="lg"
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogContent sx={{ background: '#36393f', p: 0 }}>
          <img
            src={imageUrl}
            alt={imageUrl}
            style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: 1 }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};
