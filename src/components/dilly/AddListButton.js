import { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { database } from '../../firebase';

const Container = styled.div`
  display: flex;
  align-items: center;
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

const StyledButton = styled.button`
  width: 25px;
  height: 25px;
  background: none;
  border: none;
  transition: 0.2s;

  &:focus {
    outline: none;
  }

  &:hover {
    cursor: pointer;
    color: red !important;
    transform: scale(1.1);
  }
`;

const StyledSvg = styled.svg`
  width: 25px;
  height: 25px;
  fill: var(--color-primary-dark);
  transition: 0.2s;

  &:hover {
    fill: red;
  }
`;

const AddListButton = ({ currentCategory }) => {
  const [open, setOpen] = useState(false);
  const [listItem, setListItem] = useState('');

  const openTextField = (e) => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
      setListItem('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const x = database.categories.doc(currentCategory.id);

    x.update({
      list: database.addToArray({ title: listItem }),
    });

    setListItem('');
    setOpen(false);
  };

  return (
    <Container>
      {open && (
        <FormContainer>
          <StyledForm onSubmit={handleSubmit}>
            <StyledInput
              type='text'
              value={listItem}
              onChange={(e) => setListItem(e.target.value)}
              placeholder='Add List Item'
              required
              autoFocus
            />
            <FormButton type='submit'>
              <FontAwesomeIcon icon={faPlus} />
            </FormButton>
          </StyledForm>
        </FormContainer>
      )}
      <StyledButton onClick={openTextField}>
        <StyledSvg id='Layer_1' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 18.7 14'>
          <path
            d='M9.7,15.2h10a.94.94,0,0,1,1,1h0a.94.94,0,0,1-1,1H9.7a.94.94,0,0,1-1-1h0A1,1,0,0,1,9.7,15.2Z'
            transform='translate(-8.7 -10.8)'
          />
          <path
            d='M9.7,10.8h10a.94.94,0,0,1,1,1h0a.94.94,0,0,1-1,1H9.7a.94.94,0,0,1-1-1h0A.94.94,0,0,1,9.7,10.8Z'
            transform='translate(-8.7 -10.8)'
          />
          <path
            d='M9.7,19.8h6a.94.94,0,0,1,1,1h0a.94.94,0,0,1-1,1h-6a.94.94,0,0,1-1-1h0A.94.94,0,0,1,9.7,19.8Z'
            transform='translate(-8.7 -10.8)'
          />
          <path
            d='M26.4,19.8h-2v-2a1,1,0,0,0-1-1,.94.94,0,0,0-1,1v2h-2a1,1,0,0,0-1,1,.94.94,0,0,0,1,1h2v2a1,1,0,1,0,2,0v-2h2a1,1,0,0,0,0-2Z'
            transform='translate(-8.7 -10.8)'
          />
        </StyledSvg>
      </StyledButton>
    </Container>
  );
};

export default AddListButton;
