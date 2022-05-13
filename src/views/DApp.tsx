import React from 'react';
import styled, { keyframes } from 'styled-components';
import { ConnectButton } from '../components/Button';
import { BlankCard, ButtonCard, CardButton, TextOnlyCard } from '../components/Cards';
import { Section } from '../components/Containers';
import { NavbarDApp } from '../components/Navbar/Navbar';

const Container = styled.div`
        display: flex;
        flex-direction: column;
        row-gap:30px;
        width:100%;
        height: 100%;

        & div {
            width: 100%;
        }

        & div:nth-child(2){
            row-gap: 16px;
            display: flex;
            flex-direction: column;
        }
    `
const CardInputContainer = styled.div`
    display:flex;
    align-items: center;
    justify-content: space-between;
    width: 90%;
    background-color: #222;
    color:#fff;
    border: solid 1px;;
    border-radius: 8px;
    :focus{
        outline-width:0;
    }
`
const CardInput = styled.input`
    width: 90%;
    /* height: 30px; */
    height: 100%;
    padding: 4px 8px;
    border: none;
    background-color: #222;
    color:#fff;
    /* border: solid 1px; */
    /* border-right:none; */
    /* border-radius: 5px 0 0 5px; */
    border-radius: 12px;

    font-size: var(--font-size-base);
    margin: 0;
    font-family: 'Poppins', sans-serif;
    font-weight: 400;
    line-height: 1.3;

    :focus{
        outline-width:0;
    }
`
const Text = styled.h5`
    text-align:center;
    margin-bottom: 32px;
`
const InputWrapper = styled.div`
    display:flex;
    column-gap:15px;   
    width: 100% ;
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
`
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
const handleMaxClicked = () => {

}
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
                    <BlankCard>
                        <Container>
                            <div>
                                <Text>Flexible Node</Text>
                                <CardButton className=' rounded fakeButton'>Current Value: 0.0000 / 100 MNT</CardButton>
                            </div>

                            <div>
                                <InputWrapper>
                                    <CardInputContainer>
                                        <CardInput></CardInput>
                                        <CardButton className='inputMaxButton' onClick={handleMaxClicked}>Max</CardButton>
                                    </CardInputContainer>
                                    <CardButton>Loading</CardButton>
                                </InputWrapper>
                                <CardButton style={{ width: '100%' }} className='rounded'>Claim / Compound MTN</CardButton>
                            </div>

                        </Container>
                    </BlankCard>
                </TopGrid>
                <BottomGrid>
                    <GridTitle span={3}>Protocol Stats</GridTitle>
                    <TextOnlyCard cardLeftContent='Total Nodes' leftContentValue='0'></TextOnlyCard>
                    <TextOnlyCard cardLeftContent='Total MTN supply' leftContentValue='6 545 765 MTN'></TextOnlyCard>
                    <TextOnlyCard cardLeftContent='Calculating MTN' leftContentValue='1.5739 MTN'></TextOnlyCard>

                </BottomGrid>
                <Footer>
                    <ConnectButton />
                </Footer>
            </Section>
        </>
    )
}

export default DApp;