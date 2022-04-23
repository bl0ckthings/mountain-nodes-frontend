import React from "react";
import styled from "styled-components";

const NavbarContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin: 0;
`;

const NavbarItems = styled.div`
    border-radius:  0;
    padding: 12px 32px;  
    color: rgba(255,255,255,0.7);
    font-size: 1.2vmax;
    border: 3px solid transparent;
    transition: .3s ease-in-out;
    margin: 0 16px;
    cursor: pointer;

    &:hover {
        color: #fff;
        border-radius:  48px;
        background-color: rgba(255,255,255,0.1);
        border: 3px solid rgba(255,255,255,0.4);
    }
`

export const Navbar: React.FC = () => {
    return (
        <NavbarContainer>
            <NavbarItems>HOME</NavbarItems>
            <NavbarItems>SERVICES</NavbarItems>
            <NavbarItems>ABOUT</NavbarItems>
            <NavbarItems>WHITEPAPER</NavbarItems>
            <NavbarItems>JOIN COMMUNITY</NavbarItems>
        </NavbarContainer>
    )
}
