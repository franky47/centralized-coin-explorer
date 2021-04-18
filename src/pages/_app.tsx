import { ChakraProvider, ChakraTheme } from '@chakra-ui/react'
import { DefaultSeo } from 'next-seo'
import { AppProps } from 'next/app'
import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { Hydrate } from 'react-query/hydration'
import seo from 'src/seo.json'
import { setupSentry } from 'src/services/sentry'
import { theme as defaultTheme } from 'src/ui/theme'

setupSentry()

export const AppCore: React.FC<{ theme?: ChakraTheme }> = ({
  children,
  theme = defaultTheme
}) => {
  const queryClientRef = React.useRef<QueryClient>()
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient()
  }

  return (
    <>
      <DefaultSeo {...seo} />
      <ChakraProvider theme={theme} resetCSS>
        <QueryClientProvider client={queryClientRef.current}>
          {children}
          <ReactQueryDevtools />
        </QueryClientProvider>
      </ChakraProvider>
    </>
  )
}

function App({ Component, pageProps, err }: AppProps & { err?: any }) {
  // Workaround for https://github.com/vercel/next.js/issues/8592
  return (
    <AppCore>
      <Hydrate state={pageProps.dehydratedState}>
        <Component {...pageProps} err={err} />
      </Hydrate>
    </AppCore>
  )
}

export default App
