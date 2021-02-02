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

const Login = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();

  const { login } = useAuth();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push('/');
    } catch (error) {
      setError('Failed to log in');
    }

    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <Main>
        <Header>
          <h1>Welcome to Dilly Note</h1>
          <br />
          <p>You're life's achievements are just a LOGIN away!</p>
          <br />
          <br />
          <br />
          <br />
          <h2>Log In</h2>
        </Header>
        <StyledForm onSubmit={handleSubmit}>
          <StyledInput type='email' ref={emailRef} required placeholder='Email' autoFocus />
          <StyledInput type='password' ref={passwordRef} required placeholder='Password' />
          <StyledButton disabled={loading}>Log In</StyledButton>
        </StyledForm>
        <Header>
          <p>
            <Link to='/forgot-password'>Forgot Password?</Link>
          </p>
          <br />
          <br />
          <p>
            Need to make an account? <Link to='/signup'>Sign Up</Link>
          </p>
        </Header>
        {error && <Alert message={error} />}
      </Main>
    </>
  );
};

export default Login;
