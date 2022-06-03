import { Box, Typography } from '@mui/material';
import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { User } from '~/interface';
import { LabelUsers } from './LabelUsers';

type Props = {
  usersSelected: User[];
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  handleDeleteUser: (start: number, deleteCount?: number | undefined) => void;
};

interface InputProps {
  text: string;
}

export const FormSearchUserLabel = ({ usersSelected, setSearch, handleDeleteUser }: Props) => {
  const { control, handleSubmit, reset, getValues } = useForm<InputProps>({
    defaultValues: { text: '' },
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<InputProps> = (data) => {
    setSearch(data.text);
    reset();
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (getValues('text').length === 0 && e.key === 'Backspace' && usersSelected.length > 0)
      return handleDeleteUser(0, -1);
  };

  return (
    <form
      id="createChatForm"
      style={styles.createChatFormContainer}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        control={control}
        name="text"
        render={({ field }) => (
          <Box py={1}>
            <Typography sx={{ pr: 1 }} component="span">
              To:{' '}
            </Typography>
            {usersSelected.length > 0 && (
              <LabelUsers handleDeleteUser={handleDeleteUser} users={usersSelected} />
            )}
            <input
              {...field}
              placeholder="Type the name of person"
              onKeyDown={handleKeyDown}
              style={styles.input}
            />
          </Box>
        )}
      />
    </form>
  );
};

const styles = {
  createChatFormContainer: {
    maxWidth: '100%',
    borderBottom: '1px solid #38444d',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '24px',
    paddingRight: '24px',
  },
  input: {
    color: 'white',
    fontSize: 16,
    outline: 'none',
    border: 0,
    backgroundColor: 'transparent',
    flex: 1,
    minWidth: '350px',
    padding: '8px 0px',
  },
};
