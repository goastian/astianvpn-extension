import styled from 'styled-components'

import Authentification from '../../utils/authentification.ts';

const HomePage = () => {
  const openLink = () => {
    const authentification = new Authentification();
    authentification.signIn();
  }
  return (
    <Main>
      <Header>
        <h2>AstianVPN</h2>
      </Header>
      <Logo>
        <img src="icon.png" />
      </Logo>
      <Container>
        <h3>Stay Secure with VPN</h3>
        <p>Protect your online privacy with just one click. Browse the internet safely and securely, no matter where you are.</p>
        <Button onClick={openLink}>Login</Button>
      </Container>
    </Main>
  )
}

const Button = styled.button`
  width: 100%;
  border: none;
  padding: .4rem;
  background-color: #0db7f2;
  color: white;
  border-radius: .4rem;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  h3 {
    margin: 0;
    line-height: 20px;
    color: #0db7f2;
  }

  p {
    text-align: center;
    margin: 0;
    font-size: .8rem;
    font-weight: 100;
    backgroundColor: blue;
  }
`;

const Logo = styled.div`
  display: flex;
  justify-content: center;

  img {
    width: 80px;
  }
`;

const Header = styled.div`
  text-align: center;
`;

const Main = styled.div`
  width: 350px;
  padding: 1rem;
  display: flex;
  flex-direction:column;
  align-items: center;
  gap: 3rem;
`;

export default HomePage;
