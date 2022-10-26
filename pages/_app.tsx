import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import theme from '../src/theme/theme'
import { StoreContextProvider } from '../src/utils/StoreContext'

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
