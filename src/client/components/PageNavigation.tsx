import { Button, Flex, FlexProps, Text } from '@chakra-ui/react'
import { queryTypes, useQueryState } from 'next-usequerystate'
import React from 'react'
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'
import { MdFirstPage, MdLastPage} from 'react-icons/md'
import { getLastPageNumber, useTransactionPage } from 'src/services/centralized-coin'

// --

function useNavigation() {
  const [page, setPage] = useQueryState('page', {
    defaultValue: 0,
    ...queryTypes.integer
  })
  
  const last = React.useCallback(() => getLastPageNumber().then(
    (value: number) => { setPage(value)
  }), [])

  const next = React.useCallback(() => setPage(page => page + 1), [])
  const prev = React.useCallback(
    () => setPage(page => Math.max(0, page - 1)),
    []
  )

  const first = React.useCallback(() => setPage(0), [])

  const { isLoading, isFetching } = useTransactionPage(page)
  return {
    page,
    last,
    next,
    prev,
    first,
    setPage,
    isLoading: isLoading || isFetching
  }
}

// --

export interface PageNavigationProps extends FlexProps {}

export const PageNavigation: React.FC<PageNavigationProps> = ({ ...props }) => {

  const { page, last, next, prev, first, isLoading } = useNavigation()
  return (
    <Flex alignItems="center" {...props}>
      <Button
        onClick={first}
        isDisabled={page === 0}
        leftIcon={<MdFirstPage />}
        isLoading={isLoading}
        w="7.5rem"
      >
        {' '}
        First
      </Button>
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
      <Button
        onClick={last}
        rightIcon={<MdLastPage />}
        w="7.5rem"
        isLoading={isLoading}
      >
        Last
      </Button>
    </Flex>
  )
}

// --
