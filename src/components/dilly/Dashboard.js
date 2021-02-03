import styled from 'styled-components';
import { useParams, useLocation } from 'react-router-dom';

import Navbar from '../Navbar';
import AddCategoryButton from './AddCategoryButton';
import Category from './Category';
import BreadCrumbs from './BreadCrumbs';
import { useCategory } from '../../hooks/useCategory';
import { useState } from 'react';

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

const Dashboard = () => {
  const [deletionReady, setDeletionReady] = useState(false);
  const { categoryId } = useParams();
  const { state = {} } = useLocation();
  const { category, childCategories } = useCategory(categoryId, state.category);

  const passDeletionReady = (e) => {
    setDeletionReady(e);
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
            <AddCategoryButton currentCategory={category} passDeletionReady={passDeletionReady} />
          </ButtonContainer>
        </TopBar>
        {childCategories.length > 0 && (
          <div className='d-flex flex-wrap'>
            {childCategories.map((cat) => (
              <h3 key={cat.id} className='mr-3'>
                <Category category={cat} deletionReady={deletionReady} />
              </h3>
            ))}
          </div>
        )}
      </Container>
    </Main>
  );
};

export default Dashboard;
