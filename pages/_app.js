import React from 'react';
import PropTypes from 'prop-types';
import App, { Container } from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import { Provider } from 'react-redux';
import { withStore } from '../redux';
import { ga } from '../helpers';
import { PersistGate } from 'redux-persist/integration/react';

if (process.browser) {
  Router.events.on('routeChangeComplete', url => ga.pageview(url));
}

class MyApp extends App {
  static propTypes = {
    Component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    pageProps: PropTypes.shape({}).isRequired,
    reduxStore: PropTypes.shape({}).isRequired,
  };

  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return { pageProps };
  }

  render() {
    const { Component, pageProps, reduxStore } = this.props;

    return (
      <Container>
        <Head>
          <title>Backend Server for Bryllyant</title>
        </Head>
        <Provider store={reduxStore}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    );
    /*
    return (
      <Container>
        <Head>
          <title>Backend Server for Bryllyant</title>
        </Head>
        <Provider store={reduxStore}>
          <PersistGate loading={null} persistor={reduxStore.__PERSISTOR}>
            <Component {...pageProps} />
          </PersistGate>
        </Provider>
      </Container>
    );
    */
  }
}

export default withStore(MyApp);
