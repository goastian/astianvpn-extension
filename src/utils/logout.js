import freeLocations from 'utils/freeLocations'

const logout = () => {

  const keysToKeep = ['messages']

  chrome.storage.local.get(null, (items) => {
    const keysToRemove = Object.keys(items).filter(
      (key) => !keysToKeep.includes(key)
    )
    if (keysToRemove.length) {
      chrome.storage.local.remove(keysToRemove)
    }
    chrome.storage.local.set({ currentLocation: freeLocations.at(-1) })
  })
}

export default logout
