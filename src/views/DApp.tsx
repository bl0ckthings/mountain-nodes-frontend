import React from 'react';
import styled from 'styled-components';
import { AppContainer } from '../App';
import Button from '../components/Button';
import { BlankCard, ButtonCard, TextOnlyCard } from '../components/Cards';
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
        <AppContainer style={{backgroundColor:'black'}}>
            <NavbarDApp />
            <Container>   
            <ButtonCard cardContent='titleTest' contentValue='contentValueTest' />
            <TextOnlyCard cardLeftContent='leftContent' leftContentValue='leftContentValue' cardRightContent='rightContent' rightContentValue='rightContentValue' />
            <TextOnlyCard cardLeftContent='leftContent' leftContentValue='leftContentValue'/>
            <BlankCard>
                <div>BlankCardTest</div
                ><div>test</div>
                <div>test</div>
                <Button secondary className='rounded'>Test</Button>
            </BlankCard>
            </Container>
        </AppContainer>
    )
}

export default DApp;