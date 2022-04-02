import { styled } from '@mui/material/styles';
import { FormControl, IconButton, InputAdornment, InputBase, OutlinedInput } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

type Props = {};
const Input = styled(InputBase)(({ theme }) => ({
  '& .MuiInputBase-input': {
    borderRadius: 50,
    position: 'relative',
    fontSize: 16,
    padding: '10px 26px 10px 20px',
    color: '#f21980',
    '&::-webkit-input-placeholder': {
      color: 'white',
    },
  },
}));
export const FormSearch = (props: Props) => {
  return (
    <>
      <FormControl
        sx={{ border: '1px solid #38444d', borderRadius: 25, paddingRight: 1, width: '100%' }}
        variant="standard"
      >
        <Input
          fullWidth
          placeholder="Enter name or post..."
          endAdornment={
            <InputAdornment position="end">
              <IconButton sx={{ color: '#999ea3' }}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    </>
  );
};
