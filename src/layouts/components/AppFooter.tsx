import { OutgoingLink } from '@47ng/chakra-next'
import { Box, BoxProps, Text } from '@chakra-ui/react'
import React from 'react'

export interface AppFooterProps extends BoxProps {}

export const AppFooter: React.FC<AppFooterProps> = ({ ...props }) => {
  return (
    <Box my={8} {...props}>
      <Text textAlign="center" color="gray.500" fontSize="xs" mb={2}>
        Made by{' '}
        <OutgoingLink href="https://francoisbest.com">
          François Best
        </OutgoingLink>{' '}
        •{' '}
        <OutgoingLink href="https://github.com/franky47/centralized-coin-explorer">
          Source on GitHub
        </OutgoingLink>
      </Text>
      <Text textAlign="center" color="gray.500" fontSize="xs">
        <OutgoingLink href="https://centralized-coin.com">
          centralized-coin.com
        </OutgoingLink>
      </Text>
    </Box>
  )
}
