import React from 'react';
import styled from 'styled-components';
import { AppContainer } from '../App';
import { Section } from '../components/Containers';
import { NavbarDApp } from '../components/Navbar/Navbar';

const Container = styled(Section)`
    background-image: url(${process.env.PUBLIC_URL + "/img/backgrounds/background.png"});
    background-size: cover;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

`

const DApp = () => {
    return (
        <AppContainer style={{ backgroundColor: 'black' }}>
            <NavbarDApp />
            <Container>
            </Container>
        </AppContainer>
    )
}

export default DApp;