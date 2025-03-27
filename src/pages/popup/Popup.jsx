import { useEffect, useState, useContext } from 'react'
import { PageContext } from 'context/PageContext'
import useLocalization from 'hooks/useLocalization'
import useChromeStorage from 'hooks/useChromeStorage'
import { Flex, Box } from 'theme-ui'
import freeLocations from 'utils/freeLocations'
//import { connect, disconnect } from 'utils/manageProxy'
import { localeMessageKeys } from 'utils/constants'
import MainPage from './MainPage'
import Main from './Main';
import OptionsPage from './OptionsPage'
import LocationsPage from './LocationsPage'
import HomePage from './HomePage';

const Popup = () => {

  const [isSessionActive, setIsSessionActive] = useState(false);

  useEffect(() => {
    // Verificar si la sesión está almacenada en chrome.storage.local
    chrome.storage.local.get(['encryptedToken'], function(result) {
      // Si el session_token existe, se considera que la sesión está activa
      if (result.encryptedToken) {
        setIsSessionActive(true);
      } else {
        setIsSessionActive(false);
      }
    });
  }, []); // Solo se ejecuta una vez al cargar el componente

  

  const { currentPage, setCurrentPage } = useContext(PageContext)
  const messages = useLocalization(localeMessageKeys)

  const [isLoaded, setIsLoaded] = useState(false)

  const [sessionAuthToken] = useChromeStorage('sessionAuthToken', '')
  const [locations] = useChromeStorage('locations', freeLocations)
  const [isPremium] = useChromeStorage('isPremium', false)
  const [isConnected, setIsConnected] = useChromeStorage('isConnected', false)
  const [currentLocation, setCurrentLocation] = useChromeStorage(
    'currentLocation',
    {}
  )
  const [spoofGeolocation, setSpoofGeolocation] = useChromeStorage(
    'spoofGeolocation',
    false
  )
  const [disableWebRtc, setDisableWebRtc] = useChromeStorage(
    'disableWebRtc',
    false
  )

  useEffect(() => {
    chrome.runtime.sendMessage({ type: 'handleAuthorization' })

    chrome.storage.local.get(['currentLocation'], (storage) => {
      if (!storage.currentLocation) {
        setCurrentLocation(locations.at(-1))
      }
      setIsLoaded(true)
    })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps


  const handleLocationToggle = (location) => {
    setCurrentPage('main')
    setCurrentLocation(location)
    setIsConnected(true)
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'locations':
        return (
          <LocationsPage
            locations={isPremium ? locations : freeLocations}
            currentLocation={currentLocation || freeLocations.at(-1)}
            handleLocationToggle={handleLocationToggle}
            isPremium={isPremium}
            messages={messages}
          />
        )
      case 'options':
        return (
          <OptionsPage
            sessionAuthToken={sessionAuthToken}
            spoofGeolocation={spoofGeolocation}
            setSpoofGeolocation={setSpoofGeolocation}
            disableWebRtc={disableWebRtc}
            setDisableWebRtc={setDisableWebRtc}
            messages={messages}
          />
        )
      case 'main':
      default:
        return (
          <Main 
            messages={messages}
            currentLocation={currentLocation || freeLocations.at(-1)}
          />
        )
    }
  }

  if (!isLoaded) {
    return <Box sx={{ width: 0, height: 0 }} />
  }
  if (!isSessionActive) {
    return (
      <>
        <HomePage />
      </>
    );
  } else {
    return (
      <Flex
        sx={{
          width: '100%',
          minWidth: '325px',
          flexDirection: 'column',
          backgroundColor: 'white',
        }}
      >
        {renderCurrentPage()}
      </Flex>
    )
  }
}

export default Popup
