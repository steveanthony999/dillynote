import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import { database } from '../../firebase';

const Category = ({ category, deletionReady, editReady }) => {
  const deleteCategory = () => {
    database.categories
      .doc(category.id)
      .delete()
      .then(() => console.log('deleted'))
      .catch((err) => console.log(err));
  };

  const editCategory = () => {
    console.log(category.id);
  };

  return (
    <Button
      to={{
        pathname: `/category/${category.id}`,
        state: { category: category },
      }}
      variant={deletionReady === true ? 'danger' : editReady ? 'primary' : 'dark'}
      className='text-truncate w-100'
      as={deletionReady ? null : editReady ? null : Link}
      size='lg'
      onClick={deletionReady ? deleteCategory : editReady ? editCategory : null}
    >
      {category.title}
    </Button>
  );
};

export default Category;
