import '@/styles/globals.css'
import Head from 'next/head';
import { useState, useEffect } from 'react';
import AccountProvider from '../../context/bankAccount'
import Router from "next/router";
import Spinner from '@/components/spinner/Spinner';

export default function App({ Component, pageProps }) {
  const [loading, setLoading ] = useState(false);

  useEffect(() => {
    const start = () => {
      setLoading(true);
    };

    const end = () => {
      setLoading(false);
    };

    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  })

  return (
    <>
      <Head>
        <title>Budgify</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      { loading
        ? <Spinner />
        :
          <AccountProvider>
            <Component {...pageProps} />
          </AccountProvider>
      }
    </>
  )
}
