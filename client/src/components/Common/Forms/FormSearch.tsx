import { styled } from '@mui/material/styles';
import { FormControl, IconButton, InputAdornment, InputBase, OutlinedInput } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

type Props = {
  [key: string]: any;
};
const Input = styled(InputBase)(() => ({
  fontSize: 16,
  '& .MuiInputBase-input': {
    borderRadius: 50,
    position: 'relative',
    padding: '8px 20px 8px 20px',
    color: '#f21980',
    '&::-webkit-input-placeholder': {
      color: 'white',
    },
  },
}));
export const FormSearch = ({ ...rest }: Props) => {
  return (
    <>
      <FormControl
        sx={{ border: '1px solid #38444d', borderRadius: 25, paddingRight: 1, width: '100%' }}
        variant="standard"
      >
        <Input
          fullWidth
          placeholder="Enter name or post..."
          sx={{ ...rest }}
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
