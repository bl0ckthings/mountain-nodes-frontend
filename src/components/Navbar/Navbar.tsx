import React, { useState } from "react";
import styled from "styled-components";

const NavbarItems = styled.div`
    border-radius:  0;
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

const NavbarContainer = styled.div<{opened?: boolean}>`
    display: flex;
    align-items: center;
    justify-content: center;
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
