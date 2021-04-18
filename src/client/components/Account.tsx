import { Flex, FlexProps, Image, Text, TextProps } from '@chakra-ui/react'
import React from 'react'

export interface AccountProps extends FlexProps {
  hash: string
  avatar: string
  textProps?: TextProps
}

export const Account: React.FC<AccountProps> = ({
  hash = '',
  avatar,
  textProps,
  ...props
}) => {
  const hashWithBreak = React.useMemo(() => {
    return [hash.slice(0, hash.length / 2), hash.slice(hash.length / 2)].join(
      '<wbr>'
    )
  }, [hash])

  return (
    <Flex alignItems="center" {...props}>
      <Image
        key={hash}
        src={avatar}
        fallbackSrc={avatar}
        w={12}
        h={12}
        rounded="full"
      />
      <Text
        fontSize="xs"
        fontFamily="mono"
        color="gray.500"
        mx={2}
        w="15rem"
        dangerouslySetInnerHTML={{
          __html: hashWithBreak
        }}
        {...textProps}
      />
    </Flex>
  )
}
