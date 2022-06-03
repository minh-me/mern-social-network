import { useState } from 'react';
import { IconButton } from '@mui/material';
import DoneAllOutlinedIcon from '@mui/icons-material/DoneAllOutlined';

import { useUpdateManyNotification } from '~/RQhooks/notification.rq';
import { MDialog } from '~/components/Common/Modal';

export const DoneAllIcon = ({ disabled = false }) => {
  const { mutateAsync, isLoading } = useUpdateManyNotification();

  const [openModal, setOpenModal] = useState(false);

  const handleConfirm = async () => {
    await mutateAsync({ filter: { opened: false }, body: { opened: true } });

    setOpenModal(false);
  };

  return (
    <>
      <IconButton
        size="small"
        disabled={disabled}
        onClick={() => setOpenModal(true)}
        sx={{ color: '#ff2b72', mr: 3 }}
      >
        <DoneAllOutlinedIcon />
      </IconButton>

      {/* Modal */}
      <MDialog
        title="Đánh dấu thông báo!"
        confirmButton={handleConfirm}
        onClose={() => setOpenModal(false)}
        open={openModal}
        isLoading={isLoading}
      >
        Đánh dấu tất cả thông báo là đã đọc?
      </MDialog>
    </>
  );
};
