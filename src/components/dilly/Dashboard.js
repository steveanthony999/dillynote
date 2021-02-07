import styled from 'styled-components';
import { useParams, useLocation } from 'react-router-dom';

import Navbar from '../Navbar';
import AddCategoryButton from './AddCategoryButton';
import Category from './Category';
import BreadCrumbs from './BreadCrumbs';
import { useCategory } from '../../hooks/useCategory';
import { useState, useEffect } from 'react';
import AddListButton from './AddListButton';
import List from './List';
import { database } from '../../firebase';

const Main = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: absolute;
`;

const Container = styled.div`
  width: 1100px;
  height: 100%;
  padding-top: 60px;
  position: relative;
  padding-left: 1rem;
  padding-right: 1rem;
`;

const TopBar = styled.div`
  margin-top: 30px;
  display: flex;
`;

const TopBarInner = styled.div`
  width: 85%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

const ButtonContainer = styled.div`
  margin-left: auto;
`;

const StyledHorizontalRule = styled.hr`
  border: 1px solid var(--color-primary-light);
  margin: 2rem 0;
`;

const Dashboard = () => {
  const [deletionReady, setDeletionReady] = useState(false);
  const [editReady, setEditReady] = useState(false);
  const [categoryTitle, setCategoryTitle] = useState(false);
  const [editCategoryId, setEditCategoryId] = useState('');
  const [editFormOpen, setEditFormOpen] = useState(false);
  const { categoryId } = useParams();
  const { state = {} } = useLocation();
  const { category, childCategories } = useCategory(categoryId, state.category);
  const [lists, setLists] = useState([
    {
      id: '001',
      title: 'hello',
    },
    {
      id: '002',
      title: 'world',
    },
  ]);

  useEffect(() => {
    // const x = database.lists.doc('2FTFoeLCop53abIuvBxC');

    // x.get().then((doc) => setLists((lists) => [...lists, { ...lists, id: doc.data().id, title: doc.data().title }]));
    const x = database.lists;

    console.log(x._);

    // x.get().then((e) => console.log(e));
  }, []);

  const passDeletionReady = (e) => {
    setDeletionReady(e);
  };

  const passEditReady = (e) => {
    setEditReady(e);
  };

  const passEditFormOpen = (e) => {
    setEditFormOpen(e);
  };

  const passCategoryTitle = (e) => {
    setCategoryTitle(e);
  };

  const passCategoryId = (e) => {
    setEditCategoryId(e);
  };

  return (
    <Main>
      <Navbar />
      <Container>
        <TopBar>
          <TopBarInner>
            <BreadCrumbs currentCategory={category} />
          </TopBarInner>
          <ButtonContainer>
            <AddCategoryButton
              currentCategory={category}
              passDeletionReady={passDeletionReady}
              passEditReady={passEditReady}
              editFormOpen={editFormOpen}
              editCategoryId={editCategoryId}
              categoryTitle={categoryTitle}
            />
          </ButtonContainer>
        </TopBar>
        {childCategories.length > 0 && (
          <div className='d-flex flex-wrap'>
            {childCategories.map((cat) => (
              <h3 key={cat.id} className='mr-3'>
                <Category
                  category={cat}
                  deletionReady={deletionReady}
                  editReady={editReady}
                  passEditFormOpen={passEditFormOpen}
                  passCategoryTitle={passCategoryTitle}
                  passCategoryId={passCategoryId}
                />
              </h3>
            ))}
          </div>
        )}
        <StyledHorizontalRule />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '38px' }}>
          <div></div>
          <AddListButton currentCategory={category} />
        </div>
        <br />
        {lists.map((item) => (
          <div key={item.id}>
            <List list={item} />
          </div>
        ))}
      </Container>
    </Main>
  );
};

export default Dashboard;
