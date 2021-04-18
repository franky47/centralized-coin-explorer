import { base64ToHex } from '@47ng/codec'
import { Heading, Text } from '@chakra-ui/react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import { Account } from 'src/client/components/Account'
import { generateHashAvatarDataURL } from 'src/client/components/HashAvatar/dataURL'
import { AppPageLayout } from 'src/layouts/AppPageLayout'

// --

const IndexPage: NextPage = () => {
  const router = useRouter()
  const { hash } = router.query as { hash: string }
  const avatar = React.useMemo(() => {
    if (!hash) {
      return ''
    }
    return generateHashAvatarDataURL({ hash: base64ToHex(hash) })
  }, [hash])
  return (
    <AppPageLayout maxW="5xl">
      <Heading as="h1" fontSize="2xl" mt={8} mb={2}>
        Transactions
      </Heading>
      <Account hash={hash} avatar={avatar} />
      <Text my={16}>Coming soon</Text>
    </AppPageLayout>
  )
}

export default IndexPage
