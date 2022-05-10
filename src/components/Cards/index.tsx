import React from "react";
import styled from "styled-components";
import Button from "../Button";


const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 30%;
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
    font-size: 20px;
    line-height: 26px;
    color: rgb(133, 133, 133);
`
const ContentValue = styled.div`

`

export const ButtonCard: React.FC<{ cardContent: string, contentValue: string }> = (props) => {
    return (

        <Container>
            <TextContainer>
                <CardContent>{props.cardContent}</CardContent>
                <ContentValue>{props.contentValue}</ContentValue>
            </TextContainer>
            <Button secondary className="rounded">Test</Button>
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
`
