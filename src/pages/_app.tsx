import { AppProps } from 'next/app'
import { DefaultSeo } from 'next-seo'
import { ChakraProvider, ChakraTheme } from '@chakra-ui/react'
import { setupSentry } from 'src/services/sentry'
import { theme as defaultTheme } from 'src/ui/theme'
import seo from 'src/seo.json'

setupSentry()

export const AppCore: React.FC<{ theme?: ChakraTheme }> = ({
  children,
  theme = defaultTheme
}) => {
  return (
    <>
      <DefaultSeo {...seo} />
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </>
  )
}

function App({ Component, pageProps, err }: AppProps & { err?: any }) {
  // Workaround for https://github.com/vercel/next.js/issues/8592
  return <AppCore>{<Component {...pageProps} err={err} />}</AppCore>
}

export default App
