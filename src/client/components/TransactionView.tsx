import { RouteLink } from '@47ng/chakra-next'
import {
  Box,
  ChakraProps,
  Collapse,
  Flex,
  FlexProps,
  Icon,
  Link,
  Table,
  Tbody,
  Td,
  Text,
  Tr,
  useColorModeValue,
  useDisclosure
} from '@chakra-ui/react'
import React from 'react'
import {
  FiClock,
  FiDatabase,
  FiDownload,
  FiLock,
  FiServer,
  FiUpload
} from 'react-icons/fi'
import { Transaction } from 'src/services/centralized-coin'
import { Account } from './Account'

export interface TransactionViewProps extends FlexProps {
  transaction: Transaction
}

export const TransactionView: React.FC<TransactionViewProps> = ({
  transaction: { from, recipients, amounts, ...transaction },
  ...props
}) => {
  const { isOpen, onToggle } = useDisclosure()
  const linkActiveProps: ChakraProps = {
    color: useColorModeValue('gray.600', 'gray.400'),
    textDecoration: 'underline'
  }

  return (
    <Box>
      <Flex justifyContent="space-between" alignItems="center" {...props}>
        <RouteLink
          to={`/accounts/${from.hash}`}
          _hover={linkActiveProps}
          sx={{
            '&:hover p, &:focus p': {
              color: linkActiveProps.color
            }
          }}
        >
          <Account
            hash={from.hash}
            avatar={from.avatar}
            flexDirection="row-reverse"
            textAlign="right"
            textProps={
              from.isCommunityCompound
                ? {
                    fontFamily: 'body',
                    fontSize: 'sm',
                    fontWeight: 'medium'
                  }
                : {}
            }
          />
        </RouteLink>
        <Link as={Text} fontSize="sm" color="gray.500" onClick={onToggle}>
          Sent{' '}
          <Text
            as="span"
            fontSize="lg"
            fontWeight="bold"
            color={useColorModeValue('gray.900', 'gray.100')}
          >
            {amounts.sent}
          </Text>
          cc to
        </Link>
        <RouteLink
          to={`/accounts/${recipients[0].hash}`}
          _hover={linkActiveProps}
          sx={{
            '&:hover p, &:focus p': {
              color: linkActiveProps.color
            }
          }}
        >
          <Account hash={recipients[0].hash} avatar={recipients[0].avatar} />
        </RouteLink>
      </Flex>
      <Collapse in={isOpen}>
        <Table variant="simple" size="sm" maxW="md" mx="auto" mt={2} mb={8}>
          <Tbody>
            <Tr>
              <Td>
                <Icon as={FiClock} mr={2} mt="-2px" />
                Date
              </Td>
              <Td>{transaction.time.toLocaleString()}</Td>
            </Tr>
            <Tr>
              <Td>
                <Icon as={FiUpload} mr={2} mt="-2px" />
                Sent
              </Td>
              <Td>
                <Text as="span" fontSize="1.2em" fontWeight="semibold">
                  {amounts.sent}
                </Text>
                cc
              </Td>
            </Tr>
            <Tr>
              <Td>
                <Icon as={FiServer} mr={2} mt="-2px" />
                Network Fee
              </Td>
              <Td>
                <Text as="span" fontSize="1.2em" fontWeight="semibold">
                  {amounts.fee}
                </Text>
                cc
              </Td>
            </Tr>
            <Tr>
              <Td>
                <Icon as={FiDownload} mr={2} mt="-2px" />
                Received
              </Td>
              <Td>
                <Text as="span" fontSize="1.2em" fontWeight="semibold">
                  {amounts.received}
                </Text>
                cc
              </Td>
            </Tr>

            <Tr>
              <Td>
                <Icon as={FiDatabase} mr={2} mt="-2px" />
                Transaction ID
              </Td>
              <Td fontFamily="mono" fontSize="xs">
                {transaction.id}
              </Td>
            </Tr>
            <Tr>
              <Td>
                <Icon as={FiLock} mr={2} mt="-2px" />
                Nonce
              </Td>
              <Td fontFamily="mono" fontSize="xs">
                {transaction.nonce}
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </Collapse>
    </Box>
  )
}
