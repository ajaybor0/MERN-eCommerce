import React, { useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import { FaCheck, FaTrash, FaXmark } from 'react-icons/fa6';
import { LinkContainer } from 'react-router-bootstrap';
import { FaEdit } from 'react-icons/fa';
import {
  useGetUsersQuery,
  useDeleteUserMutation
} from '../../slices/usersApiSlice';
import Loader from '../../components/Loader';
import { toast } from 'react-toastify';
import ServerError from '../../components/ServerError';
import Meta from '../../components/Meta';

const UserListPage = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();
  const [deleteUser, { isLoading: isDeleteUserLoading }] =
    useDeleteUserMutation();

  useEffect(() => {
    refetch();
  }, [refetch, users]);

  const deleteHandler = async userId => {
    try {
      const { data } = await deleteUser(userId);
      refetch();
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };
  return (
    <>
      <Meta title={'User List'}/>
      <h2>Users</h2>
      {isDeleteUserLoading && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <ServerError />
      ) : (
        <Table striped hover bordered responsive size='sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users?.map(user => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.isAdmin ? (
                    <FaCheck style={{ color: 'green' }} />
                  ) : (
                    <FaXmark style={{ color: 'red' }} />
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/user/update/${user._id}`}>
                    <Button className='btn-sm' variant='light'>
                      <FaEdit />
                    </Button>
                  </LinkContainer>

                  <Button
                    className='btn-sm'
                    variant='light'
                    onClick={() => deleteHandler(user._id)}
                  >
                    <FaTrash style={{ color: 'red' }} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default UserListPage;
