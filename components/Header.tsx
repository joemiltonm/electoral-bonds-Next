import React from 'react'
import { Box, Flex, Text } from '@mantine/core'

function Header() {
  return (
      <Box>
          <Flex
                mih={50}
                gap="sm"
                justify="center"
                align="center"
                direction="row">

              <Text
                  size='xl'
                  fw={700}
                //   variant="gradient"
                  //   gradient={{from: 'green', to: 'orange', deg:360}}
                  c='#495057'
                    >Electoral Bond Analysis</Text>

          </Flex>      
      </Box>
  )
}

export default Header