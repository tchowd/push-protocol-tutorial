import { InjectedConnector } from '@web3-react/injected-connector'
import { useWeb3React } from "@web3-react/core"
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useDisconnect } from "wagmi";
import { Button, Text, VStack } from "@chakra-ui/react";


const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42, 37, 80001],
})


const Auth = () => {
  const { active, account, activate } = useWeb3React()
  const { isConnected, isDisconnected} = useAccount()
  const { disconnect } = useDisconnect()

  async function connect() {
    try {
      await activate(injected)
      console.log(injected)
    } catch (err) {
      console.log(err)
    }
  }
  
  return (
    <div>
      {active && isConnected ? (
          <VStack>
            <Text fontSize='xl'>Connected with: <br></br> 
              {account}
              </Text>
            {active && isConnected ? 
            <Button onClick={() => disconnect()} colorScheme='messenger'>Disconnect Metamask</Button> 
            : isDisconnected}
          </VStack>
      ) : ( 
        <>
        <VStack>
          <ConnectButton/> 
          {isConnected  ? 
            <Button onClick={() => connect()} colorScheme='messenger'> Enter Page</Button> 
          : null }
        </VStack>
        </>
      )}

    </div>
  )
};

export default Auth;