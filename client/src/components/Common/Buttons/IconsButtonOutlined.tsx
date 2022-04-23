import { Button } from '@mui/material';
import { pink } from '@mui/material/colors';
import LocalPostOfficeRoundedIcon from '@mui/icons-material/LocalPostOfficeRounded';

export const IconsButtonOutlined = ({
  children = <LocalPostOfficeRoundedIcon fontSize="small" />,
}) => {
  return (
    <Button
      sx={{
        color: pink[400],
        borderColor: 'rgb(173 173 173 / 80%)',
        textTransform: 'capitalize',
        borderRadius: 5,
        minWidth: 'inherit',
        mr: 1,
        svg: {
          color: 'hsl(235deg 100% 80%)',
          transition: 'all 0.4s',
        },
        '&:hover': {
          borderColor: pink[600],
          bgcolor: 'rgba(102, 94, 98, 0.8)',
          svg: {
            color: 'rgba(249, 24, 128, 1)',
          },
        },
      }}
      variant="outlined"
    >
      {children}
    </Button>
  );
};
