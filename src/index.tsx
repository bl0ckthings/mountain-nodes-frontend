import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DApp from './views/DApp';
import Nodes from './views/Nodes';
import { AvalancheTestnet, DAppProvider } from '@usedapp/core';
import { getDefaultProvider } from 'ethers';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


const config = {
  readOnlyChainId: AvalancheTestnet.chainId,
  readOnlyUrls: {
    [AvalancheTestnet.chainId]: getDefaultProvider('https://api.avax-test.network/ext/bc/C/rpc'),
  },
}

root.render(
  <React.StrictMode>
    <DAppProvider config={config}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/app" element={<DApp />} />
          <Route path='/mint-node' element={<Nodes />} />
        </Routes>
      </BrowserRouter>
    </DAppProvider>
  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
