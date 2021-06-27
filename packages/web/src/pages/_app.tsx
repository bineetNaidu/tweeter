import 'antd/dist/antd.css';
import Layout from 'antd/lib/layout/layout';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { Navbar } from '../components/Navbar';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Tweeter.io</title>
      </Head>
      <Layout style={{ minHeight: '100vh', height: '100%' }}>
        <Navbar />
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
