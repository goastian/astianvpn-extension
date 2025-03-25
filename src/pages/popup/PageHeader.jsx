import { useContext } from 'react'
import { PageContext } from 'context/PageContext'
import { Box, Flex, Button, Image } from 'theme-ui'
import ChevronRight from 'assets/chevronRight.svg'

const PageHeader = ({ title, children, styles }) => {
  const { goBackPage } = useContext(PageContext)

  return (
    <Box
      sx={{
        overflow: 'hidden',
      }}
    >
      <Flex
        title={`Go to previous page`}
        sx={{
          fontSize: '20px',
          alignItems: 'center',
          justifyContent: 'space-between',
          mt: '24px',
          mx: '24px',
          pb: '22px',
          borderBottom: '1px solid',
          borderColor: 'darkGrey',
        }}
      >
        <Box>{title}</Box>
        <Button
          onClick={goBackPage}
          sx={{
            all: 'unset',
            cursor: 'pointer',
            height: '24px',
            width: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'right',
          }}
        >
          <Image
            src={ChevronRight}
            sx={{
              height: '20px',
            }}
          />
        </Button>
      </Flex>
      <Box
        sx={{
          padding: '0 24px 24px 24px',
          ...styles,
        }}
      >
        {children}
      </Box>
    </Box>
  )
}

export default PageHeader
