import styled from 'styled-components';
import { useContext } from 'react'
import { PageContext } from 'context/PageContext'
import { Box, Flex, Button, Image, Link, Text } from 'theme-ui'
import Logo from 'assets/icon.png'
import ReviewModal from './ReviewModal'
import MenuIcon from 'assets/menu.svg'
import ButtonSelected from './components/ButtonSelected';
import ButtonSwitch from './components/ButtonSwitch';
import { MdOutlineWorkspacePremium } from "react-icons/md";
import { FaDatabase } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa";

import flags from 'utils/flags'

const Main = ({ messages, currentLocation }) => {
  const { setCurrentPage } = useContext(PageContext)
  return(
  <MainContainer>
    <ReviewModal messages={messages} />
    <Flex
      sx={{
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Title
        href="https://vpn.astian.xyz"
        target="_blank"
        sx={{
          all: 'unset',
          cursor: 'pointer',
          height: '32px',
          alignItems: 'center',
        }}
      >
        <Image
          src={Logo}
          sx={{
            height: '32px',
          }}
        />
        <span>AstianVPN</span>
      </Title>
      <Button
        id="optionsPageButton"
        onClick={() => setCurrentPage('options')}
        title={messages.goToOptionsPage}
        sx={{
          all: 'unset',
          cursor: 'pointer',
        }}
      >
        <Image
          src={MenuIcon}
          sx={{
            height: '24px',
          }}
        />
      </Button>
    </Flex>
    <Flex
      sx={{
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
        <Flex
          sx={{
            width: '100%',
            flexDirection: 'column',
          }}
        >
          <Button
            id="locationsPageButton"
            onClick={() => setCurrentPage('locations')}
            title={messages.goToLocationsPage}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              px: '20px',
              height: '48px',
              width: '100%',
              borderRadius: '.4rem',
              fontSize: '16px',
              color: 'black',
              backgroundColor: 'transparent',
              border: '.1rem solid #D9D9D9',
              transition: 'all 0.2s ease-in-out',
              padding: '1.5rem 1rem',
            }}
          >
            <Image
              src={flags[currentLocation.countryCode]}
              sx={{
                height: '20px',
                width: '20px',
                borderRadius: '6px',
                backgroundColor: 'darkGrey',
              }}
            />
            {messages[currentLocation.countryCode]}
            <FaArrowRight />
          </Button>
        </Flex>

        <ButtonSwitch />
        <Description>
          <DescriptionStore>
              <div>
                <FaDatabase />
                <span>Data usage</span>
              </div>
              <div>
                  <span>unlimited</span>
              </div>
          </DescriptionStore>
          <DescriptionUpdate>
              <UpdateInfo>
                  <Icon />
                  <div>
                      <h3>VPN Premium</h3>
                      <span>Get unlimited data, more servers, and higher speed.</span>
                  </div>
              </UpdateInfo>
              <ButtonPremium>Upgrade to Premium</ButtonPremium>
          </DescriptionUpdate>
      </Description>
    </Flex>
  </MainContainer>
  );
};

const ButtonPremium = styled.button`
  padding: .4rem;
  border-radius: .6rem;
  border: none;
  background-color: transparent;
  border: .08rem solid #DEDEDE;
  font-weight: 100;
  
`;

const Title = styled(Link)`
  font-size: 1.8rem;
  display: flex;
  align-items: center;
`;

const Description = styled.div`
  box-sizing: border-box;
  width: 100%;
  border-radius: .4rem;
  border: .07rem solid #DEDEDE;
  padding: .5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const DescriptionStore = styled.div`
  display: flex;
  justify-content: space-between;
  
  div:first-child {
    display: flex;
    align-items: center;
    gap: .3rem;
  }

  span {
    font-size: .9rem;
  }
`;

const DescriptionUpdate = styled.div`
  border-radius: .4rem;
  background: #EFEFEF;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const UpdateInfo = styled.div`
  display: flex;
  align-items: start;
  gap: .4rem;

  div:last-child h3 {
    font-size: .9rem;
    margin: 0;
  }

  div:last-child span {
    font-size: .8rem;
  }

`;

const Icon = styled(MdOutlineWorkspacePremium)`
  width: 40px;
  height: 30px;
  padding: .2rem;
  background-color: #D2D2D2;
  border-radius: 50%;
`;

const MainContainer = styled.div`
  width: 350px;
  padding: 1rem;
  display: flex;
  flex-direction:column;
  gap: 1rem;
`;

export default Main;

