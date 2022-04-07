import { useState } from 'react';
import { Typography } from '@mui/material';
import { MDialogInput } from 'components/Common/Modal';

type Props = {};

export const ChatName = (props: Props) => {
  const [openModal, setOpenModal] = useState(false);

  const handleSubmit = (data: string) => {
    console.log(data);
    setOpenModal(false);
  };
  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <>
      <Typography
        color="#f91880"
        fontSize={16}
        component="p"
        onClick={() => setOpenModal(true)}
        sx={{
          ml: 1,
          px: 1,
          fontWeight: 400,
          '&:hover': {
            border: '1px solid #38444d',
          },
        }}
      >
        Minh Chiu, Bảo Trần, vung lien
      </Typography>

      <MDialogInput
        inputValue=" Minh Chiu, Bảo Trần, vung lien"
        title="Thay đổi tên trò chuyện?"
        onClose={handleClose}
        onSubmit={handleSubmit}
        open={openModal}
      />
    </>
  );
};
