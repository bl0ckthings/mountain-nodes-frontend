import React from 'react';
import styled from 'styled-components';
import { AppContainer } from '../App';
import { BlankCard, ButtonCard, TextOnlyCard } from '../components/Cards';
import { Section } from '../components/Containers';
import { NavbarDApp } from '../components/Navbar/Navbar';

const Container = styled(Section)`
    background-image: url(${process.env.PUBLIC_URL + "/img/backgrounds/background.png"});
    background-size: cover;
    display: flex;
    flex-direction: row;
    width:100%;
    height:100vh;
`

const CardContainer = styled.div`
display:flex;
width:48%;
margin-top:80px;
flex-direction:column;
`

const CardContainer2 = styled.div`
display:flex;
width:48%;
margin-top:80px;
flex-direction:column;
`
const Msg = styled.h3`
    border: 1px solid;
    border-radius: 10px;
    padding:8px;
    font-size:15px;
    font-weight:normal;
    margin-top:5px;
`

const DApp = () => {
    return (
        <AppContainer style={{ backgroundColor: 'black' }}>
            <NavbarDApp />
            <Container>
                <CardContainer>
                    <ButtonCard cardContent={'Rewards'} contentValue={'0.0000 MTN'} buttonValue={'Claim/Compound'}></ButtonCard>
                    <ButtonCard cardContent={'Monthly fee / Post due'} contentValue={'0.000 MTN'} buttonValue={'Pay all fees'}></ButtonCard>
                    <BlankCard>
                        You don't own any Nodes
                        <Msg>Mint your first node</Msg>
                    </BlankCard>
                </CardContainer>
                <CardContainer2>
                    <TextOnlyCard cardLeftContent={'rewards'} leftContentValue={'0.000MTN'} cardRightContent={'USD per day'} rightContentValue={'$0.00'}></TextOnlyCard>
                    <TextOnlyCard cardLeftContent={'MTN Price'} leftContentValue={'$[Price]'} cardRightContent={'MTN Balance'} rightContentValue={'0.0000'}></TextOnlyCard>
                    <BlankCard></BlankCard>
                </CardContainer2>
            </Container>
        </AppContainer>
    )
}

export default DApp;