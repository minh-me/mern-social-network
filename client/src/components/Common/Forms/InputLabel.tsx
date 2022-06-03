import React, { FC, useRef } from 'react';
import { styled } from '@mui/material/styles';
import { FormControl, InputAdornment, InputBase, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

type Props = {
  setSearchText: React.Dispatch<React.SetStateAction<String | undefined>>;
};

const Input = styled(InputBase)(() => ({
  fontSize: 16,
  '& .MuiInputBase-input': {
    borderRadius: 50,
    position: 'relative',
    padding: '8px 20px 8px 12px',
    color: '#f21980',
    '&::-webkit-input-placeholder': {
      color: 'white',
    },
  },
}));

export const InputLabel: FC<Props> = ({ setSearchText }) => {
  const inputRef = useRef<HTMLInputElement>();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchText(inputRef.current?.value);
  };

  return (
    <>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <FormControl sx={{ width: '100%', py: 1 }} variant="standard">
          <Input
            fullWidth
            placeholder="Type the name of person"
            inputRef={inputRef}
            endAdornment={
              <InputAdornment position="end">
                <Button sx={{ color: '#999ea3' }} type="submit" component="button">
                  <SearchIcon />
                </Button>
              </InputAdornment>
            }
          />
        </FormControl>
      </form>
    </>
  );
};
