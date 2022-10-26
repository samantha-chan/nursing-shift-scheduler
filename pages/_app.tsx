import { ChakraProvider } from '@chakra-ui/react'
import theme from '../src/theme/theme'
import { StoreContextProvider } from '../src/utils/StoreContext'

type AppProps = {
  Component: any;
  pageProps: any;
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StoreContextProvider nurseList={pageProps?.nurseList} shiftList={pageProps?.shiftList}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </StoreContextProvider>
  )

}

export default MyApp
