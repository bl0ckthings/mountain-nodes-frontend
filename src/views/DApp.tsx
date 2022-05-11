import React from 'react';
import styled from 'styled-components';
import { AppContainer } from '../App';
import { BlankCard, ButtonCard, CardButton, TextOnlyCard } from '../components/Cards';
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
const Msgbutton = styled.button`
    border: 1px solid #fff;
    border-radius: 10px;
    padding:10px 20px;
    font-size:15px;
    color:#fff;
    font-weight:normal;
    margin-top:10px;
    background-color:transparent;
    cursor:pointer;

    :hover{
        background-color: rgba(255,255,255,0.2);
    }
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

const Text = styled.h1`
    font-size:20px;
    text-align:center;
`
const InputWrapper = styled.div`
    display:flex;
    column-gap:15px;
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
                        <Text>You don't own any Nodes</Text>
                        <Msgbutton>Mint your first node</Msgbutton>
                    </BlankCard>
                </CardContainer>

                <CardContainer2>
                    <TextOnlyCard cardLeftContent={'rewards'} leftContentValue={'0.000MTN'} cardRightContent={'USD per day'} rightContentValue={'$0.00'}></TextOnlyCard>
                    <TextOnlyCard cardLeftContent={'MTN Price'} leftContentValue={'$[Price]'} cardRightContent={'MTN Balance'} rightContentValue={'0.0000'}></TextOnlyCard>
                    <BlankCard>
                        <BigCardContainer>
                            <BigCardItemsTop>
                                <Text>Flexible Node</Text>
                                <Msgbutton>Current value:0.0000 / 100MTN</Msgbutton>
                        </BigCardItemsTop>                           
                        <BigCardItemsBottom>
                            <InputWrapper>
                            <InputContainer>
                                <CardInput></CardInput>
                                <Inputbutton>Max</Inputbutton>
                            </InputContainer>
                            <BigCardButton>Loading</BigCardButton>
                            </InputWrapper>
                            <ClaimButton>Claim/Compound MTN</ClaimButton>
                        </BigCardItemsBottom>
                        </BigCardContainer>
                </BlankCard>
            </CardContainer2>
        </Container>
    </AppContainer >
    )
}

export default DApp;