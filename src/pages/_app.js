import '@/styles/globals.css'
import Head from 'next/head';
import AccountProvider from '../../context/bankAccount'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Budgify</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <AccountProvider>
        <Component {...pageProps} />
      </AccountProvider>
    </>
  )
}
