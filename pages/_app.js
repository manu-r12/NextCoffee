import StoreProvider from '@/context/store-context'
import '@/styles/globals.css'



export default function App({ Component, pageProps }) {
  return <StoreProvider><Component {...pageProps} /></StoreProvider>
}


