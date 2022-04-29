import { styled } from '@mui/material/styles';
import { FormControl, IconButton, InputAdornment, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Control, Controller } from 'react-hook-form';

type Props = {
  control: Control<{ text: string }, any>;
  name: string;
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
export const FormSearch = ({ control, name }: Props) => {
  return (
    <Controller
      control={control}
      name="text"
      render={() => (
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
      )}
    />
  );
};
