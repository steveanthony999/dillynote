import styled from 'styled-components';

import Navbar from '../Navbar';
import AddCategoryButton from './AddCategoryButton';

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
  return (
    <Main>
      <Navbar />
      <Container>
        <TopBar>
          <TopBarInner>
            <h4>Root / Health</h4>
          </TopBarInner>
          <ButtonContainer>
            <AddCategoryButton />
          </ButtonContainer>
        </TopBar>
      </Container>
    </Main>
  );
};

export default Dashboard;
