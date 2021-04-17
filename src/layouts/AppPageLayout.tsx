import { Container, ContainerProps } from '@chakra-ui/react'
import React from 'react'
import { AppHeader } from './components/AppHeader'

export interface AppPageLayoutProps extends ContainerProps {}

export const AppPageLayout: React.FC<AppPageLayoutProps> = ({
  children,
  maxW = '6xl',
  ...props
}) => {
  return (
    <>
      <Container as={AppHeader} maxW={maxW} py={2} />
      <Container as="main" maxW={maxW} {...props}>
        {children}
      </Container>
    </>
  )
}
