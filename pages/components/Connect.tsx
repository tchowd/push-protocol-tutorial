import { InjectedConnector } from '@web3-react/injected-connector'
import { useWeb3React } from "@web3-react/core"
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { Button } from "@chakra-ui/react";


const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42, 37, 80001],
})


const ConnectButton1 = () => {
  const { active, account, activate, deactivate, chainId } = useWeb3React()

  const {address, isConnected, isDisconnected} = useAccount()
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
          <>
            <p>Connected with <span className="account">{account}</span></p>
            <p>{address}</p>
            
            {active && isConnected ? <button onClick={() => disconnect()}>Disconnect Metamask</button> : isDisconnected}
          </>
      ) : ( 
        <>
          <ConnectButton/> 

          {isConnected  ? 
            <Button onClick={() => connect()}> Enter Page</Button> : null
          }

        </>
      )}

    </div>
  )
};

export default ConnectButton1;