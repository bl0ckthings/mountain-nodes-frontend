import React from "react";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 12px;
    background: linear-gradient(45deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.2));
    backdrop-filter: blur(16px);
    padding: 16px 24px;
    height: 100%;

    @media (max-width: 800px) {
        align-items: center;
    }
`

const NodeRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const NodeContainer = styled(Container)`
    flex-direction: column;
    align-items: stretch;
    width: 100%;
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

    &.right {
        align-items: flex-end;
    }
`
const CardContent = styled.p`
    color: rgba(255, 255, 255, 0.6);
`
const ContentValue = styled.h5`
`

export const CardButton = styled.button`
    border: 0;
    border-radius:8px;
    font-size: var(--font-size-base);
    padding: 12px 32px;
    color: white;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.77, 0, 0.175, 1);
    background-color: #ffffff00;
    border: 1px solid white;
   // transform: perspective(200px);
    transform-style: flat;
    
    :not(:not(.inputMaxButton)) {
        border: none;
        padding: 0 16px;
        text-align: right;
        cursor:pointer;
        :hover{
        filter:brightness(1.2);
        }

    }

    :not(.inputMaxButton){       
        &:hover {
        background: white;
        color: black;
        box-shadow: 0px 0px 72px rgba(255, 255, 255, 0.45);
       // transform: perspective(200px) rotateY(-5deg);
        z-index: 2;
        }
    
    &:active {
        transition:0s;

        z-index: 2;
        transform: scale(0.98);
        //transform: perspective(200px) rotateY(-5deg) translateZ(-12px);
        }

    &.fakeButton {
        width: 100%;
        pointer-events: none;
        background-color: rgba(34, 34, 34, 0.7);
     }
    
    @media (max-width: 800px) {
        padding: 8px 16px;
        border-radius: 6px;
        
        &:hover {
           // transform: perspective(200px);
        }

        &:active {
            //transform: perspective(200px);
        }
    }
   
    }

   
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
            {
                (props.cardRightContent && props.rightContentValue) &&
                <TextContainer className='right'>
                    <CardContent>{props.cardRightContent}</CardContent>
                    <ContentValue>{props.rightContentValue}</ContentValue>
                </TextContainer>
            }
        </Container>

    )
}

export const BlankCard = styled(Container)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

export const NodeCard: React.FC<{ nodeName: string, videoUrl: string , price:number , reward: number, fee:number  }> = (props) => {
    return (
        <NodeContainer className="node">
            <video src={props.videoUrl} width="500px" autoPlay loop muted disablePictureInPicture></video>
            <h3>{props.nodeName}</h3>
            <div>
                <NodeRow><div>Cost</div><div>{props.price} MTN</div></NodeRow>
                <NodeRow><div>Rewards per Day</div><div className="rewards">{props.reward} MTN</div></NodeRow>
                <NodeRow><div>Monthly Fee</div><div>{props.fee} $</div></NodeRow>
            </div >
        </NodeContainer >
    )
}