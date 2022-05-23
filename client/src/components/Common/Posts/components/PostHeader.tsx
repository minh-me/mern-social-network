import React, { FC, useState } from 'react';
import { Link as LinkRoute } from 'react-router-dom';
import {
  Avatar,
  Box,
  Link,
  Typography,
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import HideSourceIcon from '@mui/icons-material/HideSource';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import PushPinIcon from '@mui/icons-material/PushPin';

import { User } from 'interface';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useAuthContext } from 'hooks/useAppContext';
dayjs.extend(relativeTime);

type AuthorPostProps = {
  user: User;
  postCreatedAt: string;
};

export const PostHeader: FC<AuthorPostProps> = ({ user, postCreatedAt }) => {
  const { auth } = useAuthContext();
  const isOwner = auth?.id === user.id;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  console.log({ user, postCreatedAt });
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
        {/* Avatar */}
        <Avatar
          src={user.profilePic.url}
          sx={{ border: '1px solid white', mr: 1 }}
          alt={user.name}
        />

        <Box>
          <Box sx={{ display: 'flex' }}>
            <Link
              sx={styles.userLinkContainer}
              underline="hover"
              component={LinkRoute}
              to={`/users/${user.username}`}
            >
              {user.name}
            </Link>
            <Typography fontSize={12} color="#999ea3" component="p" sx={{ mx: 1 }}>
              @{user.username}
            </Typography>
          </Box>
          <Typography fontSize={12} color="#686868" component="p">
            {dayjs(postCreatedAt).fromNow()}
          </Typography>
        </Box>
      </Box>
      {isOwner && (
        <>
          <Button
            sx={{ color: '#919191' }}
            size="small"
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <MoreHorizIcon />
          </Button>

          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <PushPinIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Ghim</ListItemText>
            </MenuItem>

            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <HideSourceIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Ẩn</ListItemText>
            </MenuItem>

            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <DeleteForeverIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Xóa</ListItemText>
            </MenuItem>
          </Menu>
        </>
      )}
    </Box>
  );
};

const styles = {
  userLinkContainer: {
    cursor: 'pointer',
    fontSize: 14,
    color: '#f91880',
    textTransform: 'capitalize',
    fontWeight: 700,
    '&:hover': {
      color: 'rgba(249, 26, 130, 0.8)',
    },
  },
};
