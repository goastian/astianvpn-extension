import { useState, useEffect } from 'react'

const useChromeStorage = (key, defaultValue) => {
  const [value, setValue] = useState(defaultValue)

  useEffect(() => {
    chrome.storage.local.get([key], (result) => {
      if (result[key] !== undefined) {
        setValue(result[key])
      }
    })
  }, [key])

  useEffect(() => {
    const handleChange = (changes) => {
      if (changes[key]) {
        setValue(changes[key].newValue)
      }
    }

    chrome.storage.onChanged.addListener(handleChange)

    return () => chrome.storage.onChanged.removeListener(handleChange)
  }, [key])

  const setStoredValue = (newValue) => {
    setValue(newValue)
    chrome.storage.local.set({ [key]: newValue })
  }

  return [value, setStoredValue]
}

export default useChromeStorage
