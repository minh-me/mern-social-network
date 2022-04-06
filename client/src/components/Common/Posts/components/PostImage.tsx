import { FC, useState } from 'react';
import { Box } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

type PostImageProps = {
  imageUrl: string;
};

export const PostImage: FC<PostImageProps> = ({ imageUrl }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Box sx={{ textAlign: 'center' }}>
        <img
          onClick={() => setOpen(true)}
          src={imageUrl}
          alt="Not found image"
          style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: 1 }}
        />
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
            alt="Not found image"
            style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: 1 }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};
