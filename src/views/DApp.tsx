import React from 'react';
import styled, { keyframes } from 'styled-components';
import { AppContainer } from '../App';
import { ConnectButton } from '../components/Button';
import { BlankCard, ButtonCard, CardButton, TextOnlyCard } from '../components/Cards';
import { Section } from '../components/Containers';
import { NavbarDApp } from '../components/Navbar/Navbar';

const Container = styled.div`
    display: flex;
    flex-direction: row;
    width:100%;
    height: 100%;
    justify-content:center;
`

const CardContainer = styled.div`
    display:flex;
    width:42%;
    height:95%;
    margin-top:80px;
    flex-direction:column;
`

const CardInput = styled.input`
    width: 90%;
    height: 30px;
    border: none;
    background-color: #222;
    color:#fff;
    border: solid 1px;
    border-right:none;
    border-radius: 5px 0 0 5px;
    :focus{
        outline-width:0;
    }
`
const BigCardContainer = styled.div`
    width:95%;
    height:100%;
    display:flex;
    place-items:center; 
    justify-content: start;
    gap:10px;
    flex-direction:column;
`
const Inputbutton = styled.button`
    border-radius: 0 5px 5px 0;
    width: fit-content;
    height: 30px;
    background-color: #222;
    color: #fff;
    cursor:pointer;
    border: solid 1px;
    border-left:none;
    width:20%;
    justify-content:end;
    :hover{
        filter:brightness(1.2);
    }
`
const BigCardButton = styled.button`
    border: 0;
    border-radius:12px;
    padding: 8px 30px;
    color: #888888;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    background-color: #1C1C1C;
`
const InputContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`
const ClaimButton = styled.button`
    border-radius:10px;
    width: fit-content;
    width:100%;
    height: 35px;
    background-color: #222;
    color: #888;
    cursor:pointer;
    border:none;
    :hover{
        filter:brightness(1.2);
    }
`

const BigCardItemsBottom = styled.div`
display: flex;
flex-direction: column;
width: 100%;
height: 100%;
justify-content:space-evenly;
`
const BigCardItemsTop = styled.div`
display: flex;
flex-direction: column;
width: 100%;
height: 100%;
row-gap:15px;
`

const Text = styled.h5`
    text-align:center;
    margin-bottom: 32px;
`
const InputWrapper = styled.div`
    display:flex;
    column-gap:15px;
`

const unfade = keyframes`
    to {
        opacity: 0;
    }
`

const Overlay = styled.div`
    position: absolute;
    width: 100%;
    height: 100vh;
    background-color: black;
    z-index: 999;
    opacity: 1;
    pointer-events: none;
    animation: ${unfade} 0.32s ease-in-out forwards;
`;

const TopGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 0.2fr 1fr 1fr 2fr;
    grid-gap: 32px;
    margin-top: 12px;
    width: 100%;
    max-width: 1480px;
    min-height: 60vh;

    @media (max-width: 800px) {
        grid-template-columns: repeat(1, 1fr);
        grid-template-rows: 0.2fr repeat(4, 1fr) 2fr 2fr;
    }
`

const BottomGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 0.2fr 1fr;
    grid-gap: 32px;
    margin-top: 64px;
    width: 100%;
    max-width: 1480px;
    min-height: 15vh;

    @media (max-width: 800px) {
        grid-template-columns: repeat(1, 1fr);
        grid-template-rows: repeat(4, 1fr);
    }
`

const Card = styled.div`
    background: linear-gradient(45deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.3));
    border-radius: 16px;
    backdrop-filter: blur(32px);
    width: 100%;
    height: 100%;
`

const GridTitle = styled.h5<{ span?: number }>`
    grid-column: span ${p => p.span ?? 2};

    @media (max-width: 800px) {
        grid-column: unset;
    }
`

const Footer = styled.div`
    display: none;
    align-items: center;
    justify-content: center;
    padding: 16px 0px;
    position: fixed;
    bottom: 0;
    width: 100%;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(32px);

    @media (max-width: 800px) {
        display: flex;
    }
`

const DApp = () => {
    return (
        <>
            <Overlay />
            <Section style={{ backgroundImage: `url(${process.env.PUBLIC_URL + "/img/backgrounds/background.png"})`, backgroundPosition: 'center', backgroundSize: 'cover', alignItems: "center" }}>
                <NavbarDApp />
                <TopGrid>
                    <GridTitle>Dashboard</GridTitle>
                    <ButtonCard cardContent='Rewards' contentValue='0.0000 MTN' buttonValue='Claim/Compound' />
                    <TextOnlyCard cardLeftContent='Rewards' leftContentValue='0.0000 MTN' cardRightContent='USD per day' rightContentValue='$0.00' />
                    <ButtonCard cardContent='Monthly Fee' contentValue='0.0000 MTN' buttonValue='Pay all fees' />
                    <TextOnlyCard cardLeftContent='Rewards' leftContentValue='0.0000 MTN' cardRightContent='USD per day' rightContentValue='$0.00' />
                    <BlankCard>
                        <Text>You don't own any nodes</Text>
                        <CardButton>Mint your first node</CardButton>
                    </BlankCard>
                    <Card />
                </TopGrid>
                <BottomGrid>
                    <GridTitle span={3}>Protocol Stats</GridTitle>
                    <Card />
                    <Card />
                    <Card />
                </BottomGrid>
                
                <Footer>
                    <ConnectButton/>
                </Footer>
            </Section>
        </>
    )
}

export default DApp;