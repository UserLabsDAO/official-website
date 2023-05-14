import React, { useMemo } from 'react';
import logo from './resources/logo.png';
import './App.css';
import AppPhone from './phone/AppPhone';
import { BrowserView, MobileView } from 'react-device-detect';
import AppWeb from './web/AppWeb';
import { ToastContainer } from 'react-toastify';
import { LanguageProvider } from './language/LanguageProvider';
import { InjectedConnector } from 'wagmi/connectors/injected'
import { useAccount, useConnect, useNetwork } from 'wagmi';
import { switchNetwork,connector } from 'util/index';

const dd = require('./font/FZYouSJW_509R.TTF')

function App() {
  const { isConnected } = useAccount()
  const { chain } = useNetwork()

  const { connect, connectAsync, isIdle, isSuccess, isError, reset } = useConnect({ connector })

  useMemo(() => {
    if (chain?.id !== 1 && switchNetwork) {
      switchNetwork(1)
    }

    if (connector.ready && !isConnected && !isError) {
      connect({ connector })
    }
  }, [])
  return (
    <LanguageProvider>
      <div className='App'>
        <ToastContainer
          position="bottom-center"
          autoClose={1000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark" />


        <BrowserView>
          <link rel="preload" as="font" href="https://cijian-link-app.oss-cn-zhangjiakou.aliyuncs.com/fonts/FZYouSJW_509R.TTF" crossOrigin="" />
          <AppWeb />
        </BrowserView>
        <MobileView>
          <AppPhone />
        </MobileView></div></LanguageProvider>
  );
}

export default App;
