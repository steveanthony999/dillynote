import { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faPen } from '@fortawesome/free-solid-svg-icons';

import { database } from '../../firebase';
import { useAuth } from '../../contexts/AuthContext';
import { ROOT_CATEGORY } from '../../hooks/useCategory';

const StyledButton = styled.button`
  width: 30px;
  height: 40px;
  background: none;
  border: none;
  transition: 0.2s;

  &:focus {
    outline: none;
  }

  &:hover {
    cursor: pointer;
    color: red !important;
    transform: scale(1.2);
  }
`;

const Container = styled.div`
  display: flex;
`;

const FormContainer = styled.div`
  height: 38px;
  margin-right: 36px;
  border: 1px solid var(--color-primary-dark);
`;

const StyledForm = styled.form`
  display: flex;
`;

const StyledInput = styled.input`
  height: 36px;
  padding-left: 0.5rem;
  border: none;

  &:focus {
    outline: none;
  }
`;

const FormButton = styled.button`
  width: 36px;
  height: 36px;
  border: none;
  background: var(--color-primary-dark);
  color: var(--color-white);
  transition: 0.2s;

  &:hover {
    cursor: pointer;
    color: red;
  }
`;

const AddCategoryButton = ({ currentCategory }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');

  const { currentUser } = useAuth();

  const openTextField = () => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
      setTitle('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentCategory === null) return;

    const path = [...currentCategory.path];

    if (currentCategory !== ROOT_CATEGORY) {
      path.push({ title: currentCategory.title, id: currentCategory.id });
    }

    database.categories.add({
      title: title,
      parentId: currentCategory.id,
      userId: currentUser.uid,
      path: path,
      createdAt: database.getCurrentTimestamp(),
    });

    setTitle('');
    setOpen(false);
  };

  const style = {
    transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
    color: open ? 'red' : 'var(--color-primary-dark)',
  };

  return (
    <>
      <Container>
        {open && (
          <FormContainer>
            <StyledForm onSubmit={handleSubmit}>
              <StyledInput
                type='text'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder='Add Category'
                required
                autoFocus
              />
              <FormButton type='submit'>
                <FontAwesomeIcon icon={faPlus} />
              </FormButton>
            </StyledForm>
          </FormContainer>
        )}
        <div>
          <StyledButton onClick={openTextField} style={style}>
            <FontAwesomeIcon icon={faPlus} />
          </StyledButton>
          <br />
          <StyledButton>
            <FontAwesomeIcon icon={faMinus} />
          </StyledButton>
          <br />
          <StyledButton>
            <FontAwesomeIcon icon={faPen} />
          </StyledButton>
        </div>
      </Container>
    </>
  );
};

export default AddCategoryButton;
