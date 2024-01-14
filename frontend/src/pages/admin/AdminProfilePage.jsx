import React from 'react';
import FormContainer from '../../components/FormContainer';
import ProfileForm from '../../components/ProfileForm';
import Meta from '../../components/Meta';

const AdminProfilePage = () => {
  return (
    <FormContainer>
      <Meta title={'Admin Profile'} />
      <h2>Admin Profile</h2>
      <ProfileForm />
    </FormContainer>
  );
};

export default AdminProfilePage;
