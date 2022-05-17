import React, { useState } from "react";
import styled from "styled-components";
import { Video } from "../Video";

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
    justify-content: space-evenly;
    width: 60%;
    height: 100%;
    margin: 8px;
    width: 90%;
    transition: 0.3s cubic-bezier(0.77, 0, 0.175, 1);
    overflow: hidden;

    & .rewards {
        font-weight: 600;
    }

    & video {
        align-self: center;
    }

    & h3 {
        text-align: center;
        align-self: center;
        font-weight: 500;        
        margin: 32px;
    }

    &:hover {
        cursor: pointer;
        border: 1px solid white;
        transform: translateZ(0px);
        box-shadow: 0px 0px 48px rgba(255, 255, 255, 0.25);
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
    transform: perspective(200px);
    transform-style: flat;
    
    &.inputMaxButton {
        border: none;
        padding: 0 16px;
        text-align: right;
        cursor:pointer;
        opacity: 0.8;
        
        :hover{
            opacity: 1;
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
        transform: scale(0.99);
        //transform: perspective(200px) rotateY(-5deg) translateZ(-12px);
        }

    &.fakeButton {
        width: 100%;
        pointer-events: none;
        background-color: rgba(34, 34, 34, 0.7);
     }
    
     &.wrongNetwork {
        background-color: rgb(229, 68, 68);
        color: white;
        border: 1px solid rgb(229, 68, 68);
         &:hover{
             background-color: rgb(255, 53, 65);
             border: 1px solid rgba(255, 118, 127, 0.8);
             box-shadow: 0px 0px 72px rgba(255, 96, 107, 0.75)
         }

         &:active{
             background-color: rgb(207, 42, 53);
         }
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

const Overlay = styled.div`
    display: flex;
    position: fixed;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(32px);
    top: 0px;
    bottom: 0px;
    right: 0px;
    left: 0px;
    z-index: 999;
`

const CloseOverlay = styled.img`
    background: white;
    width: 32px;
    height: 32px;
    position: absolute;
    right: 16px;
    top: 16px;
    z-index: 5;
`
const OverlayContainer=styled.div`
    display:grid;
    width:100%;
    height:100%;
    grid-template-columns:1fr 1fr;
    grid-template-rows:0.3fr 0.5fr 1fr;
    
`
const OverlayTitle=styled.div`
    grid-column:span 2;
    font-size:var(--font-size-md);
    display: flex;
    justify-content: center;
    align-items: center;
`
const OverlayGridContent=styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
`
const OverlayBottomContent=styled.div`
    display:grid;
    grid-template-columns:1fr 1fr 1fr 1.5fr;
    grid-template-rows:0.2fr 1fr;
    padding:10px;
    width:100%;
    grid-column:span 2;
    text-align:center;
`

const GridBottomTitle=styled.p`
    color:rgba(255,255,255,0.5);
`
const GridBottomContent=styled.div`
    text-align:start;
    display:flex;
    flex-direction:column;
`

const NodeName=styled.span<{color:string}>`
    color:${p=>p.color};
`
export const NodeCard: React.FC<{ nodeName: string, videoUrl: string, price: number, reward: number, fee: number, fallbackImage?: string, color: string , MTNprice: number}> = (props) => {
    const [overlayOpened, setOverlayOpened] = useState(false);

    return (
        <NodeContainer onClick={(e) => {
            setOverlayOpened(true);
        }} className="node">
            {
                overlayOpened &&
                <Overlay>
                    <CloseOverlay onClick={(e) => {
                        setOverlayOpened(false);
                        e.stopPropagation();
                    }} />                   
                    <OverlayContainer>
                            <OverlayTitle>MINT {props.nodeName}</OverlayTitle>

                            <OverlayGridContent>
                                <span>MTN Price</span>
                                <span>$34</span>
                            </OverlayGridContent>

                            <OverlayGridContent>
                                <span>Wallet Node Limit</span>
                                <span>0/20,000</span>
                            </OverlayGridContent>
                            <OverlayBottomContent>
                                <GridBottomTitle style={{textAlign:'start'}}>Cost</GridBottomTitle>
                                <GridBottomTitle>Balance</GridBottomTitle>
                                <GridBottomTitle>Cost in $</GridBottomTitle>
                                <GridBottomTitle>Discount</GridBottomTitle>

                                <GridBottomContent>
                                    <NodeName color={props.color}>MTN</NodeName>
                                    <span>{props.MTNprice}</span>
                                </GridBottomContent>


                            </OverlayBottomContent>
                            
                    </OverlayContainer>
            </Overlay>
            }
            <Video fallbackImage={props.fallbackImage} src={props.videoUrl} isMuted loop></Video>
            <h3>{props.nodeName}</h3>
            <div>
                <NodeRow><div>Cost</div><div>{props.price} MTN</div></NodeRow>
                <NodeRow><div>Rewards per Day</div><div className="rewards">{props.reward} MTN</div></NodeRow>
                <NodeRow><div>Monthly Fee</div><div>{props.fee} $</div></NodeRow>
            </div >
            
        </NodeContainer>
    )
}