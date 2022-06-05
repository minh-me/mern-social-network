import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Avatar, IconButton } from '@mui/material';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import { useUsers } from '~/RQhooks';
import { UserListSkeleton } from '~/components/Common/Variants';
import { User } from '~/interface';
import React, { useState } from 'react';

dayjs.extend(relativeTime);

function createData(
  id: string,
  profilePic: string,
  name: string,
  email: string,
  dateOfBirth: string
) {
  return { id, profilePic, name, email, dateOfBirth };
}

export const UsersTable = () => {
  const [page, setPage] = useState(1);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const { data, isLoading } = useUsers({ page, limit: 5, sort: 'createdAt' });

  if (isLoading || !data) return <UserListSkeleton />;

  const { users, info } = data;

  const rows = users.map((user: User) =>
    createData(
      user.id,
      user.profilePic.url,
      user.name,
      user.email,
      dayjs(new Date(user.createdAt)).format('DD/MM/YYYY')
    )
  );

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="medium" aria-label="a dense table">
        <TableHead>
          <TableRow
            sx={{ th: { fontSize: 16, fontWeight: 600, bgcolor: '#111111', color: 'white' } }}
          >
            <TableCell>Avatar</TableCell>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Email</TableCell>
            <TableCell align="left">Date of Birth</TableCell>
            <TableCell align="left">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell>
                <Avatar alt={row.name} src={row.profilePic} />
              </TableCell>
              <TableCell align="left">{row.name}</TableCell>
              <TableCell align="left">{row.email}</TableCell>
              <TableCell align="left">{row.dateOfBirth}</TableCell>
              <TableCell align="left">
                <IconButton color="error">
                  <DeleteOutlineIcon />
                </IconButton>
                <IconButton color="info">
                  <AppRegistrationIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Stack my={2} sx={{ alignItems: 'flex-end' }} spacing={2}>
        <Pagination page={page} onChange={handleChange} count={info.totalPages} />
      </Stack>
    </TableContainer>
  );
};
