import '../styles/globals.css'
import type { AppProps } from 'next/app'
import React from 'react';
import { ethers } from "ethers";
import { Web3ReactProvider } from "@web3-react/core";
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { publicProvider } from 'wagmi/providers/public';
import '@rainbow-me/rainbowkit/styles.css';
import { ChakraProvider } from '@chakra-ui/react'


function getLibrary(provider: any) {
  const gottenProvider = new ethers.providers.Web3Provider(provider, "any");
  return gottenProvider;
}

const { chains, provider } = configureChains(
  [chain.goerli], 
  [
    jsonRpcProvider({
      rpc: () => {
        return {
          http: 'https://rpc.ankr.com/polygon_mumbai', 
        };
      },
    }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'Push Protocol Workshop',
  chains,
});

const wagmiClient = createClient({
  autoConnect: false,
  connectors,
  provider,
});



export default function App({ Component, pageProps }: AppProps) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <WagmiConfig client={wagmiClient}>
        <ChakraProvider>
          <RainbowKitProvider chains={chains}>
            <Component {...pageProps} />
          </RainbowKitProvider>
        </ChakraProvider>
      </WagmiConfig>
    </Web3ReactProvider>
  )
}
