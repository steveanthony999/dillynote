import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import { database } from '../../firebase';
import { useState, useEffect } from 'react';

const Category = ({ category, deletionReady, editReady, passCategoryTitle, passCategoryId, passEditFormOpen }) => {
  const [categoryTitle, setCategoryTitle] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [editFormOpen, setEditFormOpen] = useState(false);

  useEffect(() => {
    if (editReady === false) {
      setEditFormOpen(false);
    }
  }, [editReady]);

  useEffect(() => {
    passCategoryTitle(categoryTitle);
    passCategoryId(categoryId);
    passEditFormOpen(editFormOpen);
  }, [editFormOpen]);

  const deleteCategory = () => {
    database.categories
      .doc(category.id)
      .delete()
      .then(() => console.log('deleted'))
      .catch((err) => console.log(err));
  };

  const openEditForm = () => {
    if (editFormOpen) {
      setCategoryTitle('');
      setEditFormOpen(false);
    } else {
      setCategoryTitle(category.title);
      setCategoryId(category.id);
      setEditFormOpen(true);
    }
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
      onClick={deletionReady ? deleteCategory : editReady ? openEditForm : null}
    >
      {category.title}
    </Button>
  );
};

export default Category;
