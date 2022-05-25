import React, { useState } from 'react';
import { Button, Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import VisibilityOffSharpIcon from '@mui/icons-material/VisibilityOffSharp';
import VisibilitySharpIcon from '@mui/icons-material/VisibilitySharp';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import PushPinSharpIcon from '@mui/icons-material/PushPinSharp';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import { useDeletePost, useUpdatePost } from 'RQhooks';
import { Post } from 'interface';

type MenuPostProps = {
  post: Post;
};

export const MenuPost = ({ post }: MenuPostProps) => {
  const { id, pinned, hidden } = post;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const { mutate: updateAsync } = useUpdatePost();
  const { mutate: deleteAsync } = useDeletePost();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = async (menuType: 'delete' | 'hidden' | 'pinned') => {
    if (menuType === 'delete') {
      deleteAsync(id);
    }
    if (menuType === 'pinned' || menuType === 'hidden') {
      const options = { pinned, hidden };
      updateAsync({ filter: { id }, body: { [menuType]: !options[menuType] } });
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

        <MenuItem onClick={() => handleClose('hidden')}>
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
