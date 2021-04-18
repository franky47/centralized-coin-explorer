import { Button, Flex, FlexProps, Text } from '@chakra-ui/react'
import { queryTypes, useQueryState } from 'next-usequerystate'
import React from 'react'
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'
import { useTransactionPage } from 'src/services/centralized-coin'

// --

function useNavigation() {
  const [page, setPage] = useQueryState('page', {
    defaultValue: 0,
    ...queryTypes.integer
  })

  const next = React.useCallback(() => setPage(page => page + 1), [])
  const prev = React.useCallback(
    () => setPage(page => Math.max(0, page - 1)),
    []
  )
  const { isLoading, isFetching } = useTransactionPage(page)
  return {
    page,
    next,
    prev,
    setPage,
    isLoading: isLoading || isFetching
  }
}

// --

export interface PageNavigationProps extends FlexProps {}

export const PageNavigation: React.FC<PageNavigationProps> = ({ ...props }) => {
  const { page, next, prev, isLoading } = useNavigation()
  return (
    <Flex alignItems="center" {...props}>
      <Button
        onClick={prev}
        isDisabled={page === 0}
        leftIcon={<FiArrowLeft />}
        isLoading={isLoading}
        w="7.5rem"
      >
        {' '}
        Previous
      </Button>
      <Text w="7.5rem" textAlign="center">
        Page {page}
      </Text>
      <Button
        onClick={next}
        rightIcon={<FiArrowRight />}
        w="7.5rem"
        isLoading={isLoading}
      >
        Next
      </Button>
    </Flex>
  )
}

// --
