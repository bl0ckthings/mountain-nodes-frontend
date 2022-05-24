import { AvalancheTestnet, shortenAddress, useEthers } from "@usedapp/core";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3Modal from 'web3modal';
import styled, { css } from "styled-components";
import { CardButton } from "../Cards";

const Button = styled.button<{ secondary?: boolean }>`
    display: flex;
    width: fit-content;
    align-items: center;
    border: 0;
    padding: 16px 48px;
    border-radius: 10px 0 0 10px;
    color: #272727;
    column-gap: 12px;
    font-size: var(--font-size-base);
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    background-color: rgba(255, 255, 255, 0.7);

    & img {
        transition: all 0.3s cubic-bezier(0.77, 0, 0.175, 1);
    }

    &:hover {
        background-color: rgba(255, 255, 255, 0.9);

        & img.hovering {
            transform: translateX(15%);
        }
    }
    
    ${props => props.secondary && css`
        border: 1px solid rgba(255, 255, 255, 0.7);
        border-radius: 0 10px 10px 0;
        background-color: rgba(255, 255, 255, 0.1);
        color: white;

        h4 {
            font-weight:200;
        }

        &:hover {
            background-color: rgba(255, 255, 255, 0.3);
        }
        
        &:active {
            background-color: rgba(255, 255, 255, 0.2);
        }
    `}

    @media (max-width: 800px){
        h4 {
            font-size: 1rem;
        }

        img {
            width: 32px;
            height: 32px;
        }
    }
`

export const ConnectButton: React.FC<{className?: string}> = (props) => {
    const { account, activate, chainId, switchNetwork, deactivate } = useEthers();

    const handleConnect = async () => {
        try {
            const providerOptions = {
                injected: {
                    display: {
                        name: 'Metamask',
                        description: 'Connect with the provider of your wallet',
                    },
                    package: null,
                },
                walletconnect: {
                    package: WalletConnectProvider,
                    options: {
                        rpc: {

                        }
                    },
                },
            }
            const web3modal = new Web3Modal({
                providerOptions,
            })

            const provider = await web3modal.connect();
            await activate(provider);
            console.log(account);
        }
        catch (error) {

        }
    }



    const isRightNetwork = chainId === AvalancheTestnet.chainId;
    return ( 
        account ?
            isRightNetwork ?
            <CardButton onClick={deactivate}>{shortenAddress(account)}</CardButton>
            :
            <CardButton className="wrongNetwork" onClick={() => switchNetwork(AvalancheTestnet.chainId)}>Switch Network</CardButton>
        :
        <CardButton className={"rounded dapp-button " + props.className} onClick={handleConnect}>Connect Wallet</CardButton>
        
        )
}

export default Button;