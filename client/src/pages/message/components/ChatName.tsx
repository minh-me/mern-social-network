import { useState } from 'react';
import { Typography } from '@mui/material';
import { MDialogInput } from 'components/Common/Modal';
import { useUpdateChat } from 'RQhooks/chat.rq';

type Props = {
  chatId: string;
  chatName: string;
};

export const ChatName = ({ chatId, chatName }: Props) => {
  const [openModal, setOpenModal] = useState(false);
  const { mutateAsync } = useUpdateChat();

  const handleSubmit = async (value: string) => {
    await mutateAsync({ filter: { chatId }, body: { chatName: value } });
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
        {chatName}
      </Typography>

      <MDialogInput
        inputValue={chatName}
        title="Thay đổi tên trò chuyện?"
        onClose={() => setOpenModal(false)}
        onSubmit={handleSubmit}
        open={openModal}
      />
    </>
  );
};
