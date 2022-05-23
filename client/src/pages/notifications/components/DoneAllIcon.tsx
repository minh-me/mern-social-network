import { useState } from 'react';
import { IconButton } from '@mui/material';
import DoneAllOutlinedIcon from '@mui/icons-material/DoneAllOutlined';

import { useUpdateManyNotication, useCountNotifications } from 'RQhooks/notification.rq';
import { MDialog } from 'components/Common/Modal';

type Props = {};

export const DoneAllIcon = (props: Props) => {
  const { mutateAsync, isLoading } = useUpdateManyNotication();
  const { data } = useCountNotifications({ opened: false });

  const [openModal, setOpenModal] = useState(false);

  const handleConfirm = async () => {
    await mutateAsync({ filter: { opened: false }, body: { opened: true } });
    setOpenModal(false);
  };

  return (
    <>
      <IconButton
        size="small"
        disabled={data?.result === 0}
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
