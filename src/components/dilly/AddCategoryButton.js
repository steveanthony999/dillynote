import { useState, useEffect } from 'react';
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
    transform: scale(1.2) !important;
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

const EditFormContainer = styled.div`
  height: 38px;
  margin-right: 36px;
  border: 1px solid var(--color-primary-dark);
  position: absolute;
  bottom: 0;
  right: 0;
`;

const AddCategoryButton = ({ currentCategory, passDeletionReady, passEditReady, editFormOpen, editCategoryId }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [deletionReady, setDeletionReady] = useState(false);
  const [editReady, setEditReady] = useState(false);

  const { currentUser } = useAuth();

  useEffect(() => {
    passDeletionReady(deletionReady);
  }, [deletionReady, passDeletionReady]);

  useEffect(() => {
    passEditReady(editReady);
  }, [editReady, passEditReady]);

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
      list: [],
    });

    setTitle('');
    setOpen(false);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    console.log('edited');
    database.categories
      .doc(editCategoryId)
      .update({
        title: editTitle,
      })
      .then(() => console.log('updated'))
      .catch((err) => console.log(err));

    setEditTitle('');

    // Reset Edit State
    setEditReady(false);
  };

  const setForDeletion = () => {
    if (deletionReady) {
      setDeletionReady(false);
    } else if (!deletionReady && editReady !== true) {
      setDeletionReady(true);
    }
  };

  const setForEdit = () => {
    if (editReady) {
      setEditReady(false);
    } else if (!editReady && deletionReady !== true) {
      setEditReady(true);
    }
  };

  const style = {
    transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
    color: open ? 'red' : 'var(--color-primary-dark)',
  };

  const deleteStyle = {
    width: deletionReady && !editReady && '1.2rem',
    height: deletionReady && !editReady && '1.2rem',
    background: deletionReady && !editReady && 'red',
    borderRadius: deletionReady && !editReady && '50%',
    color: deletionReady && !editReady && 'var(--color-white)',
  };

  const editStyle = {
    width: editReady && !deletionReady && '1.4rem',
    height: editReady && !deletionReady && '1.4rem',
    background: editReady && !deletionReady && 'dodgerblue',
    borderRadius: editReady && !deletionReady && '50%',
    color: editReady && !deletionReady && 'var(--color-white)',
    padding: editReady && !deletionReady && '0.2rem',
  };

  return (
    <Container>
      <div style={{ position: 'relative' }}>
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
        {editFormOpen && (
          <EditFormContainer>
            <StyledForm onSubmit={handleEditSubmit}>
              <StyledInput
                type='text'
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder='Edit Category Title'
                required
                autoFocus
              />
              <FormButton type='submit'>
                <FontAwesomeIcon icon={faPen} />
              </FormButton>
            </StyledForm>
          </EditFormContainer>
        )}
      </div>
      <div>
        <StyledButton onClick={openTextField} style={style}>
          <FontAwesomeIcon icon={faPlus} />
        </StyledButton>
        <br />
        <StyledButton>
          <FontAwesomeIcon icon={faMinus} onClick={setForDeletion} style={deleteStyle} />
        </StyledButton>
        <br />
        <StyledButton>
          <FontAwesomeIcon icon={faPen} onClick={setForEdit} style={editStyle} />
        </StyledButton>
      </div>
    </Container>
  );
};

export default AddCategoryButton;
