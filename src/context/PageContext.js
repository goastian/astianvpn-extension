import React, { createContext, useState, useEffect } from 'react'

export const PageContext = createContext()

export const PageProvider = ({ children }) => {
  const [pages, setPages] = useState([])

  useEffect(() => {
    chrome.storage.local.get(['noAccount', 'sessionAuthToken'], (storage) => {
      setPages(['main'])
    })
  }, [])

  const currentPage = pages[0]

  const setCurrentPage = (page) => {
    setPages((prevPages) => [page, ...prevPages].slice(0, 3))
  }

  const goBackPage = () => {
    const previousPage = pages[1]

    if (previousPage) {
      setPages(pages.slice(1))
    }
  }

  return (
    <PageContext.Provider value={{ currentPage, setCurrentPage, goBackPage }}>
      {children}
    </PageContext.Provider>
  )
}
