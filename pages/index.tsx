import { Web3Context } from './context';
import { useWeb3React } from "@web3-react/core";
import NotificationsTest from './notifications/Notifications';
import ConnectButton from './components/Connect';
import { useAccount } from 'wagmi';
import { Center, Container, Text, VStack } from '@chakra-ui/react';

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
    <Container>
      <Center marginTop={'20rem'}>
        <VStack>
        <Text fontSize='4xl'>Push Protocol SDK Starter Kit App</Text>
        <ConnectButton />
        </VStack>
      </Center>

      {checkForWeb3Data(web3Data) && isConnected ? (
        <Web3Context.Provider value={web3Data}>
             <NotificationsTest />
        </Web3Context.Provider>
      ) : null}
    </Container>
  )
}
