import React from 'react'
import { Link } from 'react-router-dom';
import { useGetUsersQuery } from "../../slices/usersApiSlice"
import Spinner from '../../components/Spinner/Spinner';
import { Box } from '@mui/material';

const Home = () => {
  const { isError, isLoading } = useGetUsersQuery();

  return (
    <Box>
      <Link to="/users">Users</Link>
      <Spinner isLoading={isLoading}/>
    </Box>
  )
}

export default Home