import React, { useState } from 'react';
import { Button, Menu, MenuItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { toast } from 'react-toastify';

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import VisibilityOffSharpIcon from '@mui/icons-material/VisibilityOffSharp';
import VisibilitySharpIcon from '@mui/icons-material/VisibilitySharp';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import PushPinSharpIcon from '@mui/icons-material/PushPinSharp';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';

import { useDeletePost, useUpdatePost } from '~/RQhooks';
import { Post } from '~/interface';
import { MDialog } from '~/components/Common/Modal';

type MenuPostProps = {
  post: Post;
};

type MenuTypes = 'Hidden' | 'Delete' | 'Pinned';

export const MenuPost = ({ post }: MenuPostProps) => {
  const { id, pinned, hidden } = post;
  const [openModal, setOpenModal] = useState<MenuTypes | undefined>();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const { mutateAsync: updateAsync } = useUpdatePost();
  const { mutateAsync: deleteAsync } = useDeletePost();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = async (menuType: MenuTypes) => {
    if (menuType === 'Delete') {
      await toast.promise(deleteAsync(id), {
        pending: `Deleting in progress...`,
        success: `Deleted post successfully 👌`,
      });
    }

    if (menuType === 'Pinned' || menuType === 'Hidden') {
      const options = { pinned, hidden };

      const key = menuType.toLocaleLowerCase() as 'pinned' | 'hidden';

      const postData = {
        filter: { id },
        body: { [key]: !options[key] },
      };

      await toast.promise(updateAsync(postData), {
        pending: `${menuType} in progress...`,
        success: `${menuType}  successfully 👌`,
      });
    }

    setOpenModal(undefined);
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        sx={{ color: '#919191' }}
        size="small"
        id="menu-button"
        aria-controls={open ? 'menu-list' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MoreHorizIcon />
      </Button>

      <Menu
        id="menu-list"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'menu-button',
        }}
      >
        <MenuItem onClick={() => setOpenModal('Pinned')}>
          {pinned ? (
            <>
              <ListItemIcon>
                <PushPinSharpIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Bỏ Ghim</ListItemText>
            </>
          ) : (
            <>
              <ListItemIcon>
                <PushPinOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Ghim</ListItemText>
            </>
          )}
        </MenuItem>

        <MenuItem onClick={() => setOpenModal('Hidden')}>
          {hidden ? (
            <>
              <ListItemIcon>
                <VisibilitySharpIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Bỏ ẩn</ListItemText>
            </>
          ) : (
            <>
              <ListItemIcon>
                <VisibilityOffSharpIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Ẩn</ListItemText>
            </>
          )}
        </MenuItem>

        <MenuItem onClick={() => setOpenModal('Delete')}>
          <ListItemIcon>
            <DeleteForeverIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Xóa</ListItemText>
        </MenuItem>
      </Menu>

      <MDialog
        position="center"
        title={`${openModal} post?`}
        onClose={() => {
          setAnchorEl(null);
          setOpenModal(undefined);
        }}
        entityId={openModal}
        confirmButton={handleClose}
        open={!!openModal}
        textAlign="center"
      >
        <Typography component="span" sx={{ minWidth: 300, display: 'inline-block' }}>
          {(openModal === 'Delete' && 'Xóa bài viết này khỏi danh sách bài viết của bạn?') ||
            (openModal === 'Pinned' &&
              `${pinned ? 'Bỏ ghim' : 'Ghim'} bài viết này trong trang cá nhân của bạn?`) ||
            `${
              hidden
                ? 'Bạn muốn bỏ ẩn bài viết này?'
                : 'Bạn muốn ẩn bài viết này? Chỉ hiện thị trong trang cá nhân của bạn.'
            }`}
        </Typography>
      </MDialog>
    </>
  );
};
