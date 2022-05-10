import React from 'react';
import styled from 'styled-components';
import { AppContainer } from '../App';
import { Section } from '../components/Containers';
import { NavbarDApp } from '../components/Navbar/Navbar';

const DApp = () => {
    return (
        <AppContainer style={{backgroundColor:'black'}}>
            <NavbarDApp />
            <Section>
                
            </Section>
        </AppContainer>
    )
}

export default DApp;