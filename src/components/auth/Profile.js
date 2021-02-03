import { useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { useAuth } from '../../contexts/AuthContext';

import Navbar from '../Navbar';
import Alert from '../../utils/Alert';

const Main = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledForm = styled.form`
  width: 400px;
  display: flex;
  flex-direction: column;
`;

const StyledInput = styled.input`
  padding: 1rem 1rem;
  margin: 1rem 0;
  background: var(--color-white);
  color: var(--color-primary-dark);
  border: none;
  border-bottom: 2px solid var(--color-primary-light);
  font-size: 1.4rem;
  transition: 0.4s;

  &:focus {
    outline: none;
    border-color: var(--color-primary-dark);
  }
`;

const StyledButton = styled.button`
  padding: 1rem 0;
  margin-top: 2rem;
  background: var(--color-primary-dark);
  color: var(--color-secondary-light);
  font-size: 1.4rem;
  border: none;
  transition: 0.2s;

  &:hover {
    cursor: pointer;
    transform: translateY(-3px);
    box-shadow: 0 10px 10px -5px rgba(0, 0, 0, 0.2);
  }

  &:focus {
    outline: none;
    transform: translateY(-3px);
    box-shadow: 0 10px 10px -5px rgba(0, 0, 0, 0.2);
  }
`;

const Header = styled.div`
  margin: 3rem 0;
  color: var(--color-primary-dark);
  text-align: center;
`;

const Profile = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const { currentUser, updateEmail, updatePassword } = useAuth();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match');
    }

    const promises = [];

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value));
    }

    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        setLoading(false);
        setError('');
        history.push('/');
      })
      .catch(() => {
        setError('Failed to update account');
      })
      .finally(() => {
        setError('');
        setLoading(false);
      });
  };

  return (
    <>
      <Navbar />
      <Main>
        <Header>
          <h1>Update Your Profile</h1>
          <br />
          <p>Change your email, your password, or both</p>
        </Header>
        <StyledForm onSubmit={handleSubmit}>
          <StyledInput type='email' ref={emailRef} defaultValue={currentUser.email} autoFocus />
          <StyledInput type='password' ref={passwordRef} placeholder='Password - Leave blank to keep' />
          <StyledInput type='password' ref={passwordConfirmRef} placeholder='Confirm Changed Password' />
          <StyledButton disabled={loading}>Update</StyledButton>
        </StyledForm>
        <Header>
          <Link to='/'>Cancel</Link>
        </Header>
        {error && <Alert message={error} />}
      </Main>
    </>
  );
};

export default Profile;
