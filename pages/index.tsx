import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Web3Context } from './context';
import { useWeb3React } from "@web3-react/core";
import NotificationsTest from './notifications';
import ConnectButton from './components/Connect';
import { useAccount } from 'wagmi';

interface Web3ReactState {
  chainId?: number;
  account?: string | null | undefined;
  active: boolean;
  error?: Error;
  library?: unknown;
}

const checkForWeb3Data = ({ library, active, chainId  } : Web3ReactState) => {
  return library && active && chainId;
}


export default function Home() {
  const web3Data : Web3ReactState = useWeb3React();
  const { isConnected} = useAccount()

  return (
    <div className={styles.container}>
      <div >
        <h1>Push Protocol SDK Starter Kit App</h1>
        <ConnectButton />
      </div>

      {checkForWeb3Data(web3Data) && isConnected ? (
        <Web3Context.Provider value={web3Data}>
             <NotificationsTest />
        </Web3Context.Provider>
      ) : null}
    </div>
  )
}
