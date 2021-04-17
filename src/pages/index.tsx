import { Center, Text } from '@chakra-ui/react'
import { NextPage } from 'next'
import React from 'react'
import { AppPageLayout } from 'src/layouts/AppPageLayout'

// --

const IndexPage: NextPage = () => {
  return (
    <AppPageLayout>
      <Center h="2xl">
        <Text>This page is empty</Text>
      </Center>
    </AppPageLayout>
  )
}

export default IndexPage
