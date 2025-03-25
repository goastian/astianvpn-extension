import { Flex } from 'theme-ui'
import { isFirefox, websiteUrl } from 'utils/constants'
import flags from 'utils/flags'
import PageHeader from './PageHeader'
import Toggle from './Toggle'

const LocationsPage = ({
  locations,
  currentLocation,
  handleLocationToggle,
  messages,
}) => {
  return (
    <PageHeader
      title={messages.locations}
      styles={{
        p: '0 0 0 24px',
      }}
    >
      <Flex
        sx={{
          position: 'relative',
          flexDirection: 'column',
          maxHeight: '525px',
          overflowY: 'auto',
          p: isFirefox ? '0 24px 24px 0' : '0 18px 24px 0',
        }}
      >
        <Flex sx={{ pt: '24px', gap: '24px', flexDirection: 'column' }}>
          {locations.map((location) => (
            <Toggle
              title={messages[location.countryCode]}
              id={location.countryCode}
              checked={currentLocation.country === location.country}
              onToggle={() => {
                if (location.isPremium) {
                  chrome.tabs.create({
                    url: `${websiteUrl}/select_plan`,
                  })
                } else {
                  handleLocationToggle(location)
                }
              }}
              icon={flags[location.countryCode]}
              hideToggle={location.isPremium}
              messages={messages}
              key={location.countryCode}
            />
          ))}
        </Flex>
      </Flex>
    </PageHeader>
  )
}

export default LocationsPage
