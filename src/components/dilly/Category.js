import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledLink = styled(Link)`
  color: var(--color-primary-dark);

  &:hover {
    text-decoration: none;
    color: red;
  }
`;

const Category = ({ category }) => {
  return (
    <StyledLink
      to={{
        pathname: `/category/${category.id}`,
        state: { category: category },
      }}
    >
      {category.title}
    </StyledLink>
  );
};

export default Category;
