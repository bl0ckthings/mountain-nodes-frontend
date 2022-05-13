import React, { useState } from "react";
import styled from "styled-components";
import { ConnectButton } from "../Button";
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
    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width: 800px) {
        flex-direction: column;
    }
`

const NavbarContainer = styled.div<{ opened?: boolean, position?: string, justifyContent?: string }>`
    display: flex;
    align-items: center;
    justify-content: ${p => p.justifyContent ?? "center"};
    width: 100%;
    margin: 0;
    top: 32px;
    z-index: 200;
    position: ${p => p.position ?? "fixed"};
    transition: all 0.3s cubic-bezier(0.77, 0, 0.175, 1);

    @media (max-width: 800px){
        align-items: center;

        &.variable-position {
            flex-direction: row;
            justify-content: ${p => p.opened ? "center" : "space-between"};
            position: ${p => p.opened ? "fixed" : "unset"};
        }

        &:not(.variable-position) {
            flex-direction: column;
        }

        background: ${p => p.opened ? "black" : "transparent"};
        width: 100vw;
        height: ${p => p.opened ? "100vh" : "8vh"};
        top: 0px;
        padding: 0px ${p => p.opened ? "0px" : "32px"};

        & ${DappNavContainer}:not(.exclude) {
            display: ${p => p.opened ? "flex" : "none"};
        }

        & ${DappNavContainer}.exclude {
            display: ${p => p.opened ? "none" : "flex"};
        }

        & ${NavbarItems}:not(.exclude) {
            display: ${p => p.opened ? "flex" : "none"};
        }
        
        & ${NavbarItems}.exclude {
            display: ${p => p.opened ? "none" : "flex"};
        }

        & .dapp-button {
            /* position: absolute; */
            right: 15%;
        }
    }

    .exclude {
        display: none;
    }
`;

const Logo = styled.img`
    width: 48px;
    height: 48px;

    @media (max-width: 800px) {
        /* position: absolute; */
        left: 15%;
    }
`

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

    return (
        <NavbarContainer className="variable-position" justifyContent="space-between" opened={navOpened} position="unset">
            {
                !navOpened && <Logo src={process.env.PUBLIC_URL + "img/logo.png"}></Logo>
            }
            <NavbarItems className='exclude' onClick={() => setNavOpened(!navOpened)}>MENU</NavbarItems>
            <DappNavContainer>
                <NavbarItems onClick={() => navigate('/app')}>HOME</NavbarItems>
                <NavbarItems onClick={() => navigate('/mint-node')}>MINT NODE</NavbarItems>
                <NavbarItems onClick={() => scrollAndClose("roadmap")}>TRADE $MNT</NavbarItems>
                <NavbarItems onClick={() => window.open('https://discord.gg/mountain-nodes')}>TOKENS</NavbarItems>
            </DappNavContainer>
            {
                !navOpened && <ConnectButton className="hide-on-mobile" />
            }
        </NavbarContainer>
    )
}
