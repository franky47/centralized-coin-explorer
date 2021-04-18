import { Center, Stack, Text } from '@chakra-ui/react'
import { NextPage } from 'next'
import { queryTypes, useQueryState } from 'next-usequerystate'
import React from 'react'
import { PageNavigation } from 'src/client/components/PageNavigation'
import { TransactionView } from 'src/client/components/TransactionView'
import { AppPageLayout } from 'src/layouts/AppPageLayout'
import {
  usePreloadNeighbouringPages,
  useTransactionPage
} from 'src/services/centralized-coin'

// --

function usePaginatedQuery() {
  const [page] = useQueryState('page', {
    defaultValue: 0,
    ...queryTypes.integer
  })
  usePreloadNeighbouringPages(page)
  return useTransactionPage(page)
}

const IndexPage: NextPage = () => {
  const { data, isLoading } = usePaginatedQuery()

  return (
    <AppPageLayout maxW="5xl">
      {isLoading && (
        <Center h="2xl">
          <Text>Loading transactions...</Text>
        </Center>
      )}
      {!!data && (
        <>
          <Stack spacing={4} mt={12}>
            {data.map(transaction => (
              <TransactionView key={transaction.id} transaction={transaction} />
            ))}
          </Stack>
          <PageNavigation justifyContent="center" my={8} />
        </>
      )}
    </AppPageLayout>
  )
}

export default IndexPage
