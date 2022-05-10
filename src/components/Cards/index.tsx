import React from "react";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 25px;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(16px);
    padding: 20px;
    margin: 1vw;

`
const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    /* margin: 8px; */

    & .right {
        align-items: flex-end;
    }
`
const CardContent = styled.div`
    font-size: 15px;
    line-height: 26px;
    color: rgb(133, 133, 133);
    `
const ContentValue = styled.div`
    font-size:25px;
`
const ButtonValue = styled.div`
    font-size: 18px;
`
const CardButton = styled.button`
    border: 0;
    border-radius:12px;
    padding: 16px 48px;
    color: #888888;
    font-size: 100%;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    background-color: #1C1C1C;
`

export const ButtonCard: React.FC<{ cardContent: string, contentValue: string, buttonValue: string }> = (props) => {
    return (

        <Container>
            <TextContainer>
                <CardContent>{props.cardContent}</CardContent>
                <ContentValue>{props.contentValue}</ContentValue>
            </TextContainer>
            <CardButton>{props.buttonValue}</CardButton>
        </Container>

    )
}

export const TextOnlyCard: React.FC<{ cardLeftContent: string, leftContentValue: string, cardRightContent?: string, rightContentValue?: string }> = (props) => {
    return (

        <Container>
            <TextContainer>
                <CardContent>{props.cardLeftContent}</CardContent>
                <ContentValue>{props.leftContentValue}</ContentValue>
            </TextContainer>
            <TextContainer className='right'>
                <CardContent>{props.cardRightContent}</CardContent>
                <ContentValue>{props.rightContentValue}</ContentValue>
            </TextContainer>
        </Container>

    )
}

export const BlankCard = styled(Container)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height:300px;
    font-size:25px;
`
