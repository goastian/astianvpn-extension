const setBadge = () => {
  chrome.storage.local.get(['isConnected', 'currentLocation'], (storage) => {
    if (storage.isConnected) {
      chrome.action.setBadgeBackgroundColor({ color: '#22c774' })
      chrome.action.setBadgeTextColor({ color: '#fff' })
      chrome.action.setBadgeText({
        text: storage.currentLocation.countryCode.substring(0, 2).toUpperCase(),
      })
    }
  })
}

export default setBadge
