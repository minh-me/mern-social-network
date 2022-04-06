import { Box, IconButton, Typography } from '@mui/material';
import { Title } from 'components/App';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import VideoCallOutlinedIcon from '@mui/icons-material/VideoCallOutlined';
import ReportOutlinedIcon from '@mui/icons-material/ReportOutlined';
import { MDialogInput } from 'components/Common/Modal';
import { useState } from 'react';
import { pink } from '@mui/material/colors';
type Props = {};

export const MessagePage = (props: Props) => {
  const [openModal, setOpenModal] = useState(false);

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleSubmit = (data: string) => {
    console.log(data);
    setOpenModal(false);
  };

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        {/* Title */}
        <Box sx={{ borderBottom: '1px solid #38444d' }}>
          <Title title="Message" />
        </Box>

        {/* Message Header */}
        <Box
          py={1}
          px={2}
          sx={{ borderBottom: '1px solid #38444d', display: 'flex', alignItems: 'center' }}
        >
          <AvatarGroup
            max={4}
            spacing="medium"
            sx={{
              justifyContent: 'flex-end',
              'div:first-of-type': {
                border: 0,
                width: 38,
                height: 38,
                bgcolor: 'rgb(55 73 80)',
                color: 'white',
                fontSize: 14,
              },
            }}
          >
            <Avatar
              alt="Remy Sharp"
              src="https://res.cloudinary.com/djvd6zhbg/image/upload/v1639037693/avatar/avatar-default_emyynu.png"
              sx={{ width: 34, height: 34 }}
            />
            <Avatar
              alt="Travis Howard"
              src="https://res.cloudinary.com/djvd6zhbg/image/upload/v1639037693/avatar/avatar-default_emyynu.png"
              sx={{ width: 34, height: 34 }}
            />
            <Avatar
              alt="Cindy Baker"
              src="https://res.cloudinary.com/djvd6zhbg/image/upload/v1639037693/avatar/avatar-default_emyynu.png"
              sx={{ width: 34, height: 34 }}
            />
            <Avatar
              alt="Agnes Walker"
              src="https://res.cloudinary.com/djvd6zhbg/image/upload/v1639037693/avatar/avatar-default_emyynu.png"
              sx={{ width: 34, height: 34 }}
            />
            <Avatar
              alt="Trevor Henderson"
              src="https://res.cloudinary.com/djvd6zhbg/image/upload/v1639037693/avatar/avatar-default_emyynu.png"
              sx={{ width: 34, height: 34 }}
            />
          </AvatarGroup>
          <Box sx={{ flex: 1 }}>
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
          </Box>

          <Box>
            <IconButton color="primary">
              <PhoneOutlinedIcon />
            </IconButton>
            <IconButton color="primary">
              <VideoCallOutlinedIcon />
            </IconButton>
            <IconButton color="primary">
              <ReportOutlinedIcon />
            </IconButton>
          </Box>
        </Box>

        <Box px={2} pt={4} sx={{ flex: 1, height: '100%', overflowY: 'auto' }}>
          <Box pb={1} sx={{ display: 'flex', alignItems: 'flex-start' }}>
            <Avatar
              alt="Remy Sharp"
              src="https://res.cloudinary.com/djvd6zhbg/image/upload/v1639037693/avatar/avatar-default_emyynu.png"
              sx={{ width: 34, height: 34, border: '2px solid white' }}
            />
            <Box
              sx={{
                '&>p': {
                  bgcolor: '#5352ed',
                  transition: 'all 0.4s ease-in-out',
                  '&:hover+span': {
                    opactiy: 1,
                    visibility: 'visible',
                    // display: 'inline-block',
                  },
                },
                maxWidth: '88%',
              }}
            >
              {/* Content */}
              <Typography
                variant="body1"
                component="p"
                sx={{
                  maxWidth: '100%',
                  borderRadius: 1,
                  px: 1,
                  py: 1,
                  mx: 1,
                }}
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, quam? Lorem ipsum
                dolor sit amet consectetur adipisicing elit. Odit, asperiores!
              </Typography>

              {/* Times */}
              <Typography
                fontSize={13}
                component="span"
                sx={{
                  color: 'white',
                  float: 'right',
                  pt: '2px',
                  opactiy: 0,
                  visibility: 'hidden',
                  transition: 'all 0.1s ease-in-out',
                }}
              >
                30p truwosc
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              textarea: {
                outline: 'none',
                border: '1px solid #38444d',
                padding: '8px 16px',
                borderRadius: '20px',
                color: 'rgb(233, 30, 99)',
                background: '#1f2e3b',
                transition: 'all 0.3s',
                fontWeight: 500,
                width: '100%',
                resize: 'none',
                alignContent: 'center',
              },
              'textarea:hover': {
                borderColor: 'rgb(206, 193, 193)',
              },
            }}
          >
            <textarea placeholder="Enter message..." />

            <IconButton color="primary">
              <PhoneOutlinedIcon />
            </IconButton>
            <IconButton color="primary">
              <VideoCallOutlinedIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
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
