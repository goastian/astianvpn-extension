import { useState, useEffect } from 'react'
import { Box, Flex, Image } from 'theme-ui'
import { isFirefox, reviewUrl } from 'utils/constants'
import StarIcon from 'assets/star.svg'
import XIcon from 'assets/x.svg'

const ReviewModal = ({ messages }) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false)

  useEffect(() => {
    chrome.storage.local.get(
      ['installTime', 'reviewed', 'lastClosedTime'],
      (result) => {
        const currentTime = Date.now()
        const installTime = result.installTime || currentTime
        const reviewed = result.reviewed || false
        const lastClosedTime = result.lastClosedTime || 0

        if (!result.installTime) {
          chrome.storage.local.set({ installTime: currentTime })
        }

        if (
          !reviewed &&
          currentTime - installTime >= 72 * 60 * 60 * 1000 &&
          currentTime - lastClosedTime >= 7 * 24 * 60 * 60 * 1000
        ) {
          setIsPopupVisible(true)
          isFirefox && chrome.storage.local.set({ reviewed: true })
        }
      }
    )
  }, [])

  const handleClosePopup = () => {
    setIsPopupVisible(false)
    chrome.storage.local.set({ lastClosedTime: Date.now() })
  }

  const handleReviewClick = (e) => {
    e.stopPropagation()
    e.preventDefault()
    chrome.storage.local.set({ reviewed: true })
    setIsPopupVisible(false)

    const trustpilotUrl = 'https://trustpilot.com/review/1vpn.org'
    const shouldOpenTrustpilot = Math.random() < 0.2

    window.open(shouldOpenTrustpilot ? trustpilotUrl : reviewUrl, '_blank')
  }

  return (
    <>
      {isPopupVisible && (
        <Flex
          onClick={handleClosePopup}
          sx={{
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            height: '100vh',
            width: '100vw',
            position: 'fixed',
            top: '0',
            left: '0',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: '1000',
            cursor: 'pointer',
          }}
        >
          <Box
            onClick={handleReviewClick}
            sx={{
              all: 'unset',
              cursor: 'pointer',
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              width: '220px',
              background: 'white',
              borderRadius: '6px',
              p: '36px 24px',
              textAlign: 'center',
              gap: '12px',
              position: 'relative',
            }}
          >
            <Image
              src={XIcon}
              onClick={(e) => {
                e.stopPropagation()
                e.preventDefault()
                handleClosePopup()
              }}
              sx={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                cursor: 'pointer',
              }}
            />
            <Box
              sx={{
                fontSize: '16px',
              }}
            >
              {messages.reviewTitle}
            </Box>
            <Box
              sx={{
                color: 'lightBlack',
                fontSize: '12px',
                mb: '6px',
              }}
            >
              {messages.reviewSubtitle}
            </Box>
            <Flex
              sx={{
                gap: '6px',
                transition: 'all 0.2s ease-in-out',
                ':hover': {
                  filter: 'brightness(50%)',
                },
              }}
            >
              <Image
                src={StarIcon}
                sx={{
                  height: '20px',
                }}
              />
              <Image
                src={StarIcon}
                sx={{
                  height: '20px',
                }}
              />
              <Image
                src={StarIcon}
                sx={{
                  height: '20px',
                }}
              />
              <Image
                src={StarIcon}
                sx={{
                  height: '20px',
                }}
              />
              <Image
                src={StarIcon}
                sx={{
                  height: '20px',
                }}
              />
            </Flex>
          </Box>
        </Flex>
      )}
    </>
  )
}

export default ReviewModal
