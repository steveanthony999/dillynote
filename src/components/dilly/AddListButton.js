import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

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

const AddListButton = ({ currentCategory }) => {
  const openTextField = (e) => {
    console.log('open text field');
  };

  return (
    <div>
      <StyledButton onClick={openTextField}>
        <FontAwesomeIcon icon={faPlus} />
      </StyledButton>
    </div>
  );
};

export default AddListButton;
