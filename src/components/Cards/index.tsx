import { useEthers, useTokenBalance } from "@usedapp/core";
import { BigNumber, utils } from "ethers";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useCreateNodeAndTransferToPools, useGetAvaxPriceInUSDC, useGetTokenPriceInAVAX } from "../../hooks";
import { getContract } from "../../hooks/contracts";
import { InputField } from "../Input";
import { Video } from "../Video";
import test from './test.svg';

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
    margin-bottom: 16px;
    height: 95%;
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

    &:disabled {
        cursor: not-allowed;
        opacity: 0.5;
    }

    &:not(.inputMaxButton){       
        &:hover:not(:disabled) {
        background: white;
        color: black;
        box-shadow: 0px 0px 72px rgba(255, 255, 255, 0.45);
       // transform: perspective(200px) rotateY(-5deg);
        z-index: 2;
        }
    
    &:active:not(:disabled) {
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

export const ButtonCard: React.FC<{ cardContent: string, contentValue: string, buttonValue: string, handleClick?: React.MouseEventHandler<HTMLButtonElement> | undefined }> = (props) => {
    return (
        <Container>
            <TextContainer>
                <CardContent>{props.cardContent}</CardContent>
                <ContentValue>{props.contentValue}</ContentValue>
            </TextContainer>
            <CardButton onClick={props.handleClick}>{props.buttonValue}</CardButton>
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
    backdrop-filter: blur(16px);
    top: 0px;
    bottom: 0px;
    right: 0px;
    left: 0px;  
    z-index: 999;
`

const CloseOverlay = styled.img`
    width: 24px;
    height: 24px;
    position: absolute;
    right: 16px;
    top: 16px;
    border-radius:5px;
    z-index: 5;
`
const OverlayContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    width: 100%;
    height: 100%;
    padding: 0px;
`
const OverlayTitle = styled.div`
    grid-column:span 2;
    font-size:var(--font-size-md);
    display: flex;
    justify-content: center;
    align-items: center;
`

const GridBottomContent = styled.div`
    display: flex;
    text-align: start;
    flex-direction: column;
    place-content: center;
    padding: 15px;
`

const OverlayTable = styled.table<{ titleColor: string }>`
    width: 100%;
    border-collapse: collapse;
    border-spacing: 120px 24px;
    
    & td, & th {
        padding: 12px;
    }

    & tbody tr {
        margin: 24px;
        border-top: 1px solid rgba(255, 255, 255, 0.5);
        transition: all 0.3s ease-in-out;

        &:hover {
            background: rgba(255, 255, 255, 0.1);
        }
    }

    & th {
        text-align: left;
    }

    & td:first-child {
        display: flex;
        flex-direction: column;
    }

    & td:first-child span:first-child {
        color: ${p => p.titleColor};
        font-weight: 800;
        font-size: 120%;
    }
`

export const NodeCard: React.FC<{ nodeName: string, videoUrl: string, price: number, reward: number, fallbackImage?: string, color: string, MTNprice: number, cost: number, balance: number, nodeType: number }> = (props) => {
    const [overlayOpened, setOverlayOpened] = useState(false);
    const { account, chainId } = useEthers();
    const tokenBalance = useTokenBalance(getContract("Mountain", chainId!), account);
    const tokenPriceInAVAX = useGetTokenPriceInAVAX(chainId!, BigNumber.from(props.price) || BigNumber.from("0"));
    const avaxPriceInUSDC = useGetAvaxPriceInUSDC(chainId!);
    const { send: sendCreateNodeAndTransfer, state: createNodeAndTransferState } = useCreateNodeAndTransferToPools(chainId!);

    const [refferalCode, setRefferalCode] = useState("");

    useEffect(() => {
        if (createNodeAndTransferState.status === "Success") {
            alert("Successfully minted node");
        }

        if (createNodeAndTransferState.status === "Fail") {
            alert("Failed to mint node");
        }

        console.log("MTN Price:", props.price);
        console.log("Prices:", tokenPriceInAVAX, avaxPriceInUSDC);
        console.log("TokenPriceInUSDC:", tokenPriceInAVAX * avaxPriceInUSDC);

    }, [createNodeAndTransferState, tokenPriceInAVAX, avaxPriceInUSDC, props.price])

    const isInputValid = (refferalCode.trim().length === 42 && refferalCode.startsWith("0x")) || refferalCode.trim().length === 0;

    return (
        <NodeContainer onClick={(e) => {
            setOverlayOpened(true);
        }} className="node">
            {
                overlayOpened &&
                <Overlay>
                    <CloseOverlay src={test} onClick={(e) => {
                        setOverlayOpened(false);
                        e.stopPropagation();
                    }} />
                    <OverlayContainer>
                        <OverlayTitle>MINT {props.nodeName}</OverlayTitle>

                        <OverlayTable titleColor={props.color}>
                            <thead>
                                <tr>
                                    <th>COST</th>
                                    <th>BALANCE</th>
                                    <th>COST</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <span>MTN</span>
                                        <span>{props.price.toFixed(2)}</span>
                                    </td>
                                    <td>{(tokenBalance && parseInt(utils.formatEther(tokenBalance)).toFixed(2)) || 0}</td>
                                    <td>{(tokenPriceInAVAX * (10 ** 18)).toFixed(6) || "0.00"} AVAX</td>
                                </tr>
                                <tr>
                                    <td>
                                        <span>USDC.e</span>
                                        <span>{((tokenPriceInAVAX * avaxPriceInUSDC) * (10 ** 18)).toFixed(2) || "0.00"}</span>
                                    </td>
                                    <td>{(tokenBalance && parseInt(utils.formatEther(tokenBalance)).toFixed(2)) || 0}</td>
                                    <td>{((tokenPriceInAVAX * avaxPriceInUSDC) * (10 ** 18)).toFixed(2) || "0.00"} $</td>
                                </tr>
                            </tbody>
                        </OverlayTable>

                        <GridBottomContent style={{ gridColumn: "3 span" }}>
                            <InputField isValid={isInputValid} value={refferalCode} onChange={(event) => { setRefferalCode(event.target.value) }} placeholder="Refferal code..." />
                            <CardButton disabled={!isInputValid} onClick={() => sendCreateNodeAndTransfer(utils.parseEther(props.price.toString()), props.nodeType, (refferalCode.trim().length === 42 && refferalCode.startsWith("0x")) ? refferalCode.trim() : "0x0000000000000000000000000000000000000000")}>Confirm Mint</CardButton>
                        </GridBottomContent>
                    </OverlayContainer>
                </Overlay>
            }
            <Video fallbackImage={props.fallbackImage} src={props.videoUrl} isMuted loop></Video>
            <h3>{props.nodeName}</h3>
            <div style={{ marginBottom: 12 }}>
                <NodeRow><div>Cost</div><div>{props.price} MTN</div></NodeRow>
                <NodeRow><div>Rewards per Day</div><div className="rewards">{props.reward} MTN</div></NodeRow>
            </div>

        </NodeContainer>
    )
}