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

const NodeRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const NodeContainer = styled(Container)`
    flex-direction: column;
    align-items: stretch;
    width: 40vw;
    height: 60vh;

    & .rewards {
        font-weight: 600;
    }

    & video {
        align-self: center;
    }
    & h3 {
        align-self: center;
        font-weight: 500;
    }
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

export const BlankCard = styled(Container)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
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


export const NodeCard: React.FC<{ nodeName: string, videoUrl: string }> = (props) => {
    return (
        <NodeContainer className="node">
            <video src={props.videoUrl} width="500" autoPlay loop muted disablePictureInPicture></video>
            <h3>{props.nodeName}</h3>
            <div>
            <NodeRow><div>Cost</div><div>??? MTN</div></NodeRow>
            <NodeRow><div>Rewards per Day</div><div className="rewards">??? MTN</div></NodeRow>
            <NodeRow><div>Monthly Fee</div><div>??? $</div></NodeRow>
            </div >
        </NodeContainer >
    )
}