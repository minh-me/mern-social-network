import React, { useState } from 'react';
import { Button, Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import HideSourceIcon from '@mui/icons-material/HideSource';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import PushPinIcon from '@mui/icons-material/PushPin';
import { useDeletePost, useUpdatePost } from 'RQhooks';

type MenuPostProps = {
  postId: string;
  pinned: boolean;
  hidden: boolean;
};

export const MenuPost = ({ postId, pinned, hidden }: MenuPostProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const { mutateAsync: updateAsync } = useUpdatePost();
  const { mutateAsync: deleteAsync } = useDeletePost();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = async (menuType: 'delete' | 'hidden' | 'pinned') => {
    if (menuType === 'delete') {
      await deleteAsync(postId);
      // Delete
    } else {
      const options = { pinned, hidden };
      console.log({ body: { [menuType]: !options[menuType] } });
      await updateAsync({ filter: { id: postId }, body: { [menuType]: !options[menuType] } });
    }

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
        <MenuItem onClick={() => handleClose('pinned')}>
          <ListItemIcon>
            <PushPinIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Ghim</ListItemText>
        </MenuItem>

        <MenuItem onClick={() => handleClose('hidden')}>
          <ListItemIcon>
            <HideSourceIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Ẩn</ListItemText>
        </MenuItem>

        <MenuItem onClick={() => handleClose('delete')}>
          <ListItemIcon>
            <DeleteForeverIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Xóa</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};
