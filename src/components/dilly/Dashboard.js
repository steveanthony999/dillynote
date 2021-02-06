import styled from 'styled-components';
import { useParams, useLocation } from 'react-router-dom';

import Navbar from '../Navbar';
import AddCategoryButton from './AddCategoryButton';
import Category from './Category';
import BreadCrumbs from './BreadCrumbs';
import { useCategory } from '../../hooks/useCategory';
import { useState } from 'react';
import AddListButton from './AddListButton';

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
        <p style={{ textAlign: 'left' }}>Run</p>
        <p style={{ textAlign: 'left' }}>Chest</p>
      </Container>
    </Main>
  );
};

export default Dashboard;
