import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import { database } from '../../firebase';

const Category = ({ category, deletionReady }) => {
  const deleteCategory = (e) => {
    database.categories
      .doc(category.id)
      .delete()
      .then(() => console.log('deleted'))
      .catch((err) => console.log(err));
  };

  return (
    <Button
      to={{
        pathname: `/category/${category.id}`,
        state: { category: category },
      }}
      variant={deletionReady === true ? 'danger' : 'dark'}
      className='text-truncate w-100'
      as={deletionReady ? null : Link}
      size='lg'
      onClick={deletionReady ? deleteCategory : null}
    >
      {category.title}
    </Button>
  );
};

export default Category;
