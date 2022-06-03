import { FC, useEffect, useRef, useState } from 'react';
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
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgRef.current;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) img?.setAttribute('src', img?.getAttribute('resource') || '');
    });

    if (img) observer.observe(img);

    return () => {
      if (img) observer.unobserve(img);
    };
  }, []);

  return (
    <>
      <Box
        sx={{
          textAlign: 'center',
          maxHeight: '400px',
          overflow: 'hidden',
          img: { maxWidth: '100%', maxHeight: '100%', borderRadius: 1, background: 'white' },
          ...sx,
        }}
      >
        <img ref={imgRef} onClick={() => setOpen(true)} resource={imageUrl} alt={alt} />
      </Box>

      <Dialog
        maxWidth="lg"
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogContent sx={{ background: '#36393f', p: 0, maxHeight: 490, overflow: 'hidden' }}>
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
