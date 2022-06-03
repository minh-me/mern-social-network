import { Box, Button, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const Notfound = () => {
  const navigate = useNavigate();
  const imageSrc = 'https://friendkit.cssninja.io/assets/img/illustrations/placeholders/3.svg';

  return (
    <Grid container>
      <Grid item sx={{ margin: '0 auto', textAlign: 'center' }}>
        <Box sx={{ img: { maxWidth: 600 } }}>
          <img src={imageSrc} alt={imageSrc} />
        </Box>

        <Typography fontSize={34} fontWeight={600} component="h2">
          We couldn't find that page
        </Typography>
        <Typography fontSize={15} component="p">
          Looks like we couldn't find that page. Please try again or contact an administrator if the
          problem persists.
        </Typography>
        <Button onClick={() => navigate(-1)} sx={{ my: 2 }} variant="contained">
          Take me Back
        </Button>
      </Grid>
    </Grid>
  );
};
