import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';

import { useAuth } from '../contexts/AuthContext';

import Alert from '../utils/Alert';

const Nav = styled.nav`
  width: 100vw;
  height: 60px;
  background-color: var(--color-primary-dark);
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
`;

const InnerNav = styled.div`
  width: var(--container-width);
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;

const StyledSvg = styled.svg`
  width: 30px;
  fill: var(--color-secondary-light);
  transition: 0.2s;

  &:hover {
    transform: scale(1.1);
  }
`;

const StyledIcon = styled(FontAwesomeIcon)`
  color: var(--color-secondary-light);
  opacity: ${(props) => props.opacity};
  transition: 0.2s;

  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`;

const HoverMenu = styled.div`
  display: ${(props) => props.showMenu};
  position: absolute;
  right: 2.4rem;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: var(--color-secondary-light);
  margin-right: 1rem;

  &:hover {
    text-decoration: underline;
  }
`;

const StyledP = styled.p`
  color: var(--color-secondary-light);
  margin-right: 1rem;
  display: inline;

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

const StyledName = styled(Link)`
  text-decoration: none;
  color: var(--color-secondary-light);
  margin-right: 1rem;
  font-size: 2rem;
  transition: 0.2s;

  &:hover {
    text-decoration: underline;
    transform: scale(1.1);
  }
`;

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const [error, setError] = useState('');
  const [userName, setUsername] = useState('');

  const { currentUser, logout } = useAuth();
  const history = useHistory();

  useEffect(() => {
    if (currentUser) {
      const regex = /[^@]*/;
      const match = regex.exec(currentUser.email);
      setUsername(match);
    }
  }, [setUsername, currentUser]);

  const handleUserClick = () => {
    if (menu === false) {
      setMenu(true);
    } else {
      setMenu(false);
    }
  };

  const handleLogOut = async (e) => {
    setError('');

    try {
      await logout();
      history.push('/login');
    } catch (error) {
      setError('Failed to log out');
    }
  };

  return (
    <Nav>
      <InnerNav>
        <Link to='/'>
          <StyledSvg id='Layer_1' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 15.59 14.64'>
            <path
              d='M13.17,9.16a8.87,8.87,0,0,0-6.81,2.27c-1.5,1.6-1.91,2.24-1.91,4.34a.94.94,0,0,0,1,1h0c.6,0,3.62-.51,3.62-1,0-1.6-2-3.09-.82-4.29a5.76,5.76,0,0,1,4.8-1.7c1.8.2,2.41,1.89,3.41,3.39,1.3,2,2.29,3.91,1,5.91-1.1,1.7-3,4.13-5,4.13-1.1,0-2-2.33-2-3.43v-4h0a2,2,0,0,1,4,0c0,1.1-1,.58-2.12.58-.6,0-.88,1.82-.88,2.42a.94.94,0,0,0,1,1c2.2,0,2.59-1.81,2.59-4s-.39-4-2.59-4a4,4,0,0,0-4,4h0v4a4,4,0,0,0,4,4c2.7,0,4.46-1.68,6-4,1.8-2.6,2.31-4.95.51-7.65C17.62,10.24,15.57,9.46,13.17,9.16Z'
              transform='translate(-4.45 -9.13)'
            />
            >
          </StyledSvg>
        </Link>
        {currentUser && <StyledName to='/profile'>{userName}</StyledName>}
        <HoverMenu showMenu={menu ? 'block' : 'none'}>
          {currentUser ? (
            <>
              <StyledLink to='/profile'>Profile</StyledLink>
              <StyledP to='/logout' onClick={handleLogOut}>
                Logout
              </StyledP>
            </>
          ) : (
            <>
              <StyledLink to='/signup'>Sign Up</StyledLink>
              <StyledLink to='/login'>Log In</StyledLink>
            </>
          )}
        </HoverMenu>
        <StyledIcon icon={faUserCircle} size='2x' onClick={handleUserClick} opacity={menu ? 0.2 : 1} />
      </InnerNav>
      {error && <Alert message={error} />}
    </Nav>
  );
};

export default Navbar;
