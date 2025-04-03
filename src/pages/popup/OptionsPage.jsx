import { Flex, Link } from 'theme-ui'
import styled from 'styled-components'
import { useEffect, useState } from 'react';
import axios from 'axios';

import { isFirefox, websiteUrl } from 'utils/constants'
import PageHeader from './PageHeader'
import Toggle from './Toggle'
import Authentification from '../../utils/authentification.ts';
import Token from '../../utils/token.ts';

const OptionsPage = ({
  sessionAuthToken,
  spoofGeolocation,
  setSpoofGeolocation,
  disableWebRtc,
  setDisableWebRtc,
  messages,
}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const profile = process.env.PASSPORT_SERVER + '/about';

  useEffect(() => {
    const validated = new Token();

    const fetchData = async () => {
      const token = await validated.getDecryptedToken();
      const isValidated = await validated.verificate();
      try {
        // Hacemos una llamada a una API o cualquier operación asíncrona
        if(isValidated == true) {
          const data = await axios.get(`${process.env.PASSPORT_SERVER}/api/gateway/user`, {
              headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                  Accept: 'application/json',
                  Authorization: `Bearer ${token}`
              },
            });
          setData(data.data);
        } else {
        const authentification = new Authentification();
        await authentification.signIn();
        validated.clearToken();
            
        }
      } catch (error) {
        // En caso de error, guardamos el error en el estado
        setError(error)
      } finally {
        // Cambiamos el estado de carga a false una vez que se complete la operación
        setLoading(false)
      }
    }
    fetchData();
  }, [])

  const logout = async () => {
    const authentification = new Authentification();
    await authentification.logout();
    console.log('llll')
  }

  if (loading) {
    return <Loading><span>Loading...</span></Loading>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <PageHeader title={messages.options}>
      <Flex
        sx={{
          flexDirection: 'column',
          flex: 1,
          justifyContent: 'space-between',
        }}
      >
        {!sessionAuthToken && (
          <>
            <Flex
              sx={{
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <img src="" />
              <span>{ data.name } { data.last_name } </span>
              <span>{ data.email }</span>
            </Flex>
            <Flex
              sx={{
                gap: '20px',
                py: '20px',
                borderBottom: '1px solid',
                borderColor: 'darkGrey',
              }}
            >
              <Link
                id="signupButton"
                variant="styles.baseButton"
                href={profile}
                target="_blank"
              >
                Edit Profile
              </Link>
              <Link
                id="loginButton"
                variant="styles.baseButton"
                onClick={logout}
                sx={{
                  bg: 'transparent',
                  color: 'blue',
                }}
              >
                Logout
              </Link>
            </Flex>
          </>
        )}
      </Flex>
    </PageHeader>
  )
}

const Button = styled.button`
  width: 100%;
  border: none;
  padding: .6rem;
  border-radius: .4rem;
`;

const Loading = styled.div`
  height: 220px;
  display: flex;
  justify-content: center;
align-items: center;

  span {
    display: block;
  }
`;

export default OptionsPage
