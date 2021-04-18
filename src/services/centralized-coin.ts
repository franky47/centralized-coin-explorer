import { base64ToHex } from '@47ng/codec'
import React from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { generateHashAvatarDataURL } from 'src/client/components/HashAvatar/dataURL'

export interface APITransaction {
  id: string
  time: string
  nonce: number
  amount_sent: number
  amount_received: number
  recipients: string[]
  from: string
}

export interface Transaction {
  id: string
  time: Date
  nonce: number
  amounts: {
    sent: number
    received: number
    fee: number
  }
  from: {
    hash: string
    avatar: string
    isCommunityCompound: boolean
  }
  recipients: {
    hash: string
    avatar: string
  }[]
}

// --

export async function fetchTransactionPage(
  pageNumber: number = 0
): Promise<Transaction[]> {
  const res = await fetch(
    `https://www.centralized-coin.com/api/transactions/${pageNumber}`
  )
  const data = await res.json()
  const transactions: APITransaction[] = data.transactions
  return transactions.map(transaction => {
    const isCommunityCompound = transaction.from === 'Community Compound'
    return {
      id: transaction.id,
      time: new Date(transaction.time),
      nonce: transaction.nonce,
      amounts: {
        sent: transaction.amount_sent,
        received: transaction.amount_received,
        fee: transaction.amount_sent - transaction.amount_received
      },
      from: {
        hash: transaction.from,
        isCommunityCompound,
        avatar: isCommunityCompound
          ? 'https://pbs.twimg.com/profile_images/1382026339272716289/BZ8q0WfI_400x400.jpg'
          : generateHashAvatarDataURL({
              hash: base64ToHex(transaction.from)
            })
      },
      recipients: transaction.recipients.map(hash => ({
        hash,
        avatar: generateHashAvatarDataURL({
          hash: base64ToHex(hash)
        })
      }))
    }
  })
}

// --

export function useTransactionPage(pageNumber: number) {
  return useQuery(
    ['page', pageNumber] as const,
    () => fetchTransactionPage(pageNumber),
    {
      keepPreviousData: true,
      staleTime: Infinity
    }
  )
}

// --

export function usePreloadNeighbouringPages(pageNumber: number) {
  const queryClient = useQueryClient()
  React.useEffect(() => {
    const prev = Math.max(0, pageNumber - 1)
    const next = pageNumber + 1
    queryClient.prefetchQuery(['page', prev] as const, () =>
      fetchTransactionPage(prev)
    )
    queryClient.prefetchQuery(['page', next] as const, () =>
      fetchTransactionPage(next)
    )
  }, [pageNumber])
}
