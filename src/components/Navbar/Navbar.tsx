import React, { useState } from "react";
import styled from "styled-components";
import { IconSocials } from "../../sections/HeroSection";
import Button from "../Button";
import WalletConnectProvider from '@walletconnect/web3-provider';
import Web3Modal from 'web3modal';
import {useEthers } from '@usedapp/core';
import { useNavigate } from "react-router-dom";

const NavbarItems = styled.div`
    border-radius: 0;
    padding: 12px 32px;  
    color: rgba(255,255,255,0.7);
    font-size: 1.2vmax;
    border: 3px solid transparent;
    transition: .4s cubic-bezier(0.77, 0, 0.175, 1);
    margin: 0 16px;
    cursor: pointer;

    &:hover {
        color: #fff;
        border-radius:  48px;
        background-color: rgba(255,255,255,0.1);
        border: 3px solid rgba(255,255,255,0.4);
    }

    &:active {
        opacity: 0.4;
    }

    @media (max-width: 800px){
        padding: 10px 20px;
        margin: 12px;
        font-size: 2vmax;
    }

    `
const DappNavContainer = styled.div`
    display: inline-flex;

    `

const NavbarContainer = styled.div<{ opened?: boolean }>`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    width: 100%;
    margin: 0;
    top: 32px;
    z-index: 200;
    position: fixed;
    transition: all 0.3s cubic-bezier(0.77, 0, 0.175, 1);

    @media (max-width: 800px){
        flex-direction: column;
        align-items: center;
        background: ${p => p.opened ? "black" : "transparent"};
        width: 100vw;
        height: ${p => p.opened ? "100vh" : "8vh"};
        top: 0px;
        & ${NavbarItems}:not(.exclude) {
            display: ${p => p.opened ? "flex" : "none"};
        }
    
        & ${NavbarItems}.exclude {
            display: ${p => p.opened ? "none" : "flex"};
        }
    }

    .exclude {
        display: none;
    }
`;

export const Navbar: React.FC = () => {
    const [navOpened, setNavOpened] = useState(false);

    const scrollAndClose = (target: string) => {
        document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
        setNavOpened(false);
    }

    return (
        <NavbarContainer opened={navOpened}>
            <NavbarItems className="exclude" onClick={() => setNavOpened(!navOpened)}>MENU</NavbarItems>
            <NavbarItems onClick={() => scrollAndClose("home")}>HOME</NavbarItems>
            <NavbarItems onClick={() => scrollAndClose("services")}>SERVICES</NavbarItems>
            <NavbarItems onClick={() => scrollAndClose("roadmap")}>ROADMAP</NavbarItems>
            <NavbarItems onClick={() => window.open('https://discord.gg/mountain-nodes')}>JOIN COMMUNITY</NavbarItems>
        </NavbarContainer>
    )
}

export const NavbarDApp: React.FC = () => {
    
    const navigate = useNavigate();
    
    const [navOpened, setNavOpened] = useState(false);

    const scrollAndClose = (target: string) => {
        document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
        setNavOpened(false);
    }
    const {account, activate} = useEthers();    
    const handleConnect = async ()=>{
        try{
            const providerOptions = {
                injected: {
                    display: {
                        name:'Metamask',
                        description: 'Connect with the provider of your wallet',
                    },
                    package:null,
                },
                walletconnect:{
                    package:WalletConnectProvider,
                    options:{
                        rpc:{

                        }
                    },
                },
            }
            const web3modal = new Web3Modal({
                providerOptions,
            })

            const provider = await web3modal.connect();
            await activate(provider);
        }
        catch (error){
            
        }
    }
    
    return (
        <NavbarContainer opened={navOpened}>
            <NavbarItems className="exclude" onClick={() => setNavOpened(!navOpened)}>MENU</NavbarItems>
            <IconSocials src={process.env.PUBLIC_URL + "img/logo.png"}></IconSocials>
            <DappNavContainer>
                <NavbarItems onClick={() => navigate('/app')}>HOME</NavbarItems>
                <NavbarItems onClick={() => navigate('/mint-node')}>MINT NODE</NavbarItems>
                <NavbarItems onClick={() => scrollAndClose("roadmap")}>TRADE $MNT</NavbarItems>
                <NavbarItems onClick={() => window.open('https://discord.gg/mountain-nodes')}>TOKENS</NavbarItems>
                <Button className="rounded" secondary onClick={handleConnect}>Connect Wallet</Button>
            </DappNavContainer>
        </NavbarContainer>
    )
}
