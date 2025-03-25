import { useContext } from 'react'
import { PageContext } from 'context/PageContext'
import { Box, Flex, Button, Image, Link, Text } from 'theme-ui'
import { websiteUrl } from 'utils/constants'
import ReviewModal from './ReviewModal'
import flags from 'utils/flags'
import Logo from 'assets/logo.svg'
import MenuIcon from 'assets/menu.svg'
import ChevronRight from 'assets/chevronRight.svg'

const MainPage = ({
  isPremium,
  isConnected,
  currentLocation,
  handleConnectionToggle,
  messages,
}) => {
  const { setCurrentPage } = useContext(PageContext)

  return (
    <>
      <ReviewModal messages={messages} />
      <Flex
        sx={{
          flexDirection: 'column',
          color: 'black',
          gap: '40px',
          p: '24px',
          overflow: 'hidden',
        }}
      >
        <Flex
          sx={{
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Link
            href={websiteUrl}
            target="_blank"
            sx={{
              all: 'unset',
              cursor: 'pointer',
              height: '32px',
            }}
          >
            <Image
              src={Logo}
              sx={{
                height: '32px',
              }}
            />
          </Link>
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
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <Flex
            sx={{ height: '68px', width: '120px', justifyContent: 'center' }}
          >
            <Button
              id="proxyToggle"
              onClick={() => handleConnectionToggle()}
              title={isConnected ? messages.connected : messages.disconnected}
              sx={{
                appearance: 'none',
                cursor: 'pointer',
                p: '8px',
                height: '100%',
                width: '100%',
                borderRadius: '68px',
                backgroundColor: isConnected ? 'blue' : 'darkGrey',
                transition: 'all 0.2s ease-in-out',
              }}
            >
              <Box
                sx={{
                  height: '52px',
                  width: '52px',
                  backgroundColor: '#fff',
                  borderRadius: '50px',
                  transform: `translateX(${isConnected ? '100%' : '0%'})`,
                  transition: 'all 0.2s ease-in-out',
                }}
              />
            </Button>
          </Flex>
          <Box
            sx={{
              mt: '8px',
              fontSize: '16px',
              height: '20px',
            }}
          >
            {isConnected ? messages.connected : messages.disconnected}
          </Box>
        </Flex>
        <Flex
          sx={{
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
              borderRadius: '6px',
              fontSize: '16px',
              color: 'black',
              backgroundColor: 'grey',
              transition: 'all 0.2s ease-in-out',
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
            aas
            {messages[currentLocation.countryCode]}
            <Image
              src={ChevronRight}
              sx={{
                height: '18px',
              }}
            />
          </Button>

          {!isPremium && (
            <Link
              id="upgradeLink"
              href={`${websiteUrl}/select_plan`}
              target="_blank"
              sx={{
                all: 'unset',
                cursor: 'pointer',
                fontSize: '12px',
                textAlign: 'center',
                mt: '24px',
              }}
            >
              <Text
                sx={{
                  color: 'darkBlue',
                  textDecoration: 'underline',
                }}
              >
                {messages.upgradeText1}
              </Text>{' '}
              {messages.upgradeText2}
            </Link>
          )}
        </Flex>
      </Flex>
    </>
  )
}

export default MainPage
