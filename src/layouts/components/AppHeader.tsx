import { Flex, FlexProps, Heading, HStack } from '@chakra-ui/react'
import React from 'react'
import seo from 'src/seo.json'
import { ColorModeSwitch } from './ColorModeSwitch'

export interface AppHeaderProps extends FlexProps {}

export const AppHeader: React.FC<AppHeaderProps> = ({ ...props }) => {
  return (
    <Flex
      as="header"
      justifyContent="space-between"
      alignItems="center"
      {...props}
    >
      <Heading as="h1" fontSize="xl">
        {seo.title}
      </Heading>
      <HStack as="nav">
        <ColorModeSwitch />
      </HStack>
    </Flex>
  )
}
