import { Breadcrumb } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ROOT_CATEGORY } from '../../hooks/useCategory';

const BreadCrumbs = ({ currentCategory }) => {
  let path = currentCategory === ROOT_CATEGORY ? [] : [ROOT_CATEGORY];
  if (currentCategory) path = [...path, ...currentCategory.path];

  return (
    <Breadcrumb className='flex-grow-1' listProps={{ className: 'bg-white pl-0 m-0' }}>
      {path.map((cat, index) => (
        <Breadcrumb.Item
          key={cat.id}
          linkAs={Link}
          linkProps={{
            to: {
              pathname: cat.id ? `/category/${cat.id}` : '/',
              state: { category: { ...cat, path: path.slice(1, index) } },
            },
          }}
        >
          {cat.title}
        </Breadcrumb.Item>
      ))}
      {currentCategory && <Breadcrumb.Item active>{currentCategory.title}</Breadcrumb.Item>}
    </Breadcrumb>
  );
};

export default BreadCrumbs;
