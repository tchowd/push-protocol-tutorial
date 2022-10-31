import { Web3Context } from './context/Web3Context';
import { useWeb3React } from "@web3-react/core";
import Notifications from './notifications/Notifications';
import ConnectButton from './components/Connect';
import { useAccount } from 'wagmi';
import { Center, Container, Text, VStack } from '@chakra-ui/react';

interface Web3ReactState {
  active: boolean;
}

const checkForWeb3Data = ({ active  } : Web3ReactState) => {
  return active ;
}


export default function Home() {
  const web3Data : Web3ReactState = useWeb3React();
  const { isConnected} = useAccount()

  return (
    <Container>
      <Center marginTop={'5rem'}>
        <VStack>
          <Text fontSize='4xl'>Push Protocol SDK Starter Kit App</Text>
          <ConnectButton />
        </VStack>
      </Center>

      {checkForWeb3Data(web3Data) && isConnected ? (
        <Web3Context.Provider value={web3Data}>
             <Notifications />
        </Web3Context.Provider>
      ) : null}
    </Container>
  )
}
