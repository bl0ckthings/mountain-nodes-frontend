import { useEthers } from '@usedapp/core';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { ConnectButton } from '../components/Button';
import { BlankCard, ButtonCard, CardButton, TextOnlyCard } from '../components/Cards';
import { Section } from '../components/Containers';
import { NavbarDApp } from '../components/Navbar/Navbar';
import { useClaimAllRewards, useIsNodeOwner, useGetNumberOfNodes, useGetAccountNodeByIndex, useCalculateRewards, useNodeMapping, useBalanceOf, useTotalSupply, useGetAllNodeIdsOfAccount, useGetAllRewards } from '../hooks';
import { TableComponent, Table } from '../components/Table';
import { BigNumber, utils } from 'ethers';
import { debug } from 'console';
import { parseBytes32String } from 'ethers/lib/utils';

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
    border-radius: 8px;

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

    const navigate = useNavigate();


    const { account, chainId } = useEthers();

    const { send: sendClaimAllRewards, state: claimAllRewardsState } = useClaimAllRewards(chainId!);

    useEffect(() => {
        if (claimAllRewardsState.status === 'Success') {
            alert("Successfully claimed all rewards");
        }

        if (claimAllRewardsState.status === 'Fail') {
            alert("Failed to claim all rewards");
        }

    }, [claimAllRewardsState])
    let isUserNodeOwner = useIsNodeOwner(chainId!, account!);

    // const nodeId = accountNodes;
    // const nodes = useNodeMapping(chainId!, nodeId.toNumber());
    // const nodeType = nodes[2]
    const mtnBalance = useBalanceOf(chainId!, account!);

    const formattedBalance: string = Number(utils.formatEther(mtnBalance)).toFixed(4).toString();
    const totalSupply: string = utils.commify(utils.formatEther(useTotalSupply(chainId!))) + ' MTN';
    const balance = useGetNumberOfNodes(chainId!, account!)
    const accountNodes = useGetAccountNodeByIndex(chainId!, account!, 0);

    const nodeId = accountNodes;

    const RewardPerDay = useCalculateRewards(chainId!, nodeId.toNumber()!)
    const test = Number(utils.formatEther(RewardPerDay)).toFixed(3)


    // const accountNodeList = useGetAllNodesOfAccount(chainId!);

    const tempPrint = () => {
        // console.log(accountNodeList[0]);
    }

    const nodeIds = useGetAllNodeIdsOfAccount(chainId!, account!);
    // const allRewards = useGetAllRewards(chainId!, account!);
    const allRewards: number = useGetAllRewards(chainId!, account!);

    let totalReward: string = 'calculating ...';
    allRewards.toString() !== "NaN" ?
    totalReward = Number(utils.formatEther(BigNumber.from(allRewards.toString()))).toFixed(5)
    :
    totalReward = 'calculating ...';
    
//     let rewardValue: Number = 0;
//     let formattedReward: string = '0';
// const getR = (): string => {

//     rewardValue = parseInt(allRewards[1] && allRewards[1].toString(), 10);
//     rewardValue.toString() !== "NaN" ?
//     formattedReward = Number(utils.formatEther(BigNumber.from(rewardValue.toString()))).toFixed(5)
//     :
//     formattedReward = "0"

//     return formattedReward;
// }
    

// let rwrd = '0';
// account ?
// rwrd = getR()
// :
// rwrd = 'Please connect your wallet'



// account ?
// getR()
// :
// console.log("not connected yet")
    // 
    // allRewards[1] && console.log(utils.formatEther(allRewards[1]._hex).toFixed(4));


    // const initialValue = 0;  
    // const totalReward = formattedAllRewards.reduce(
    //   (previousValue, currentValue) => previousValue + currentValue,
    //   initialValue
    // );

    // const formattedTotalReward: string = Number(utils.formatEther(totalReward)).toFixed(6).toString();
    // console.log(formattedTotalReward);

    return (
        <>
            <Overlay />
            <Section style={{ backgroundImage: `url(${process.env.PUBLIC_URL + "/img/backgrounds/background.png"})`, backgroundPosition: 'center', backgroundSize: 'cover', alignItems: "center" }}>
                <NavbarDApp />
                <TopGrid>
                    <GridTitle>Dashboard</GridTitle>
                    <ButtonCard handleClick={() => sendClaimAllRewards()} cardContent='Rewards' contentValue={totalReward} buttonValue='Claim/Compound' />
                    <TextOnlyCard cardLeftContent='Rewards per day' leftContentValue='0.0000 MTN' cardRightContent='USD per day' rightContentValue='$0.00' />
                    <ButtonCard cardContent='Monthly Fee' contentValue='Not implemented' buttonValue='Pay all fees' />
                    <TextOnlyCard cardLeftContent='MTN Price' leftContentValue='0.0000 $' cardRightContent='MTN Balance' rightContentValue={formattedBalance} />
                    <BlankCard style={{ gridColumn: "2 span" }}>

                        {isUserNodeOwner ?
                            // <Table/> 
                            <TableComponent />
                            : <>
                                <Text>You dont own any nodes</Text>
                                <CardButton onClick={() => navigate('/mint-node')}>Mint your first node</CardButton>
                            </>
                        }

                    </BlankCard>

                    {/* <CardButton onClick={handleNumberOfNodes}>Get number of nodes test</CardButton> */}
                    {/* <BlankCard>
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
                    </BlankCard> */}
                </TopGrid>
                <BottomGrid>
                    <GridTitle span={3}>Protocol Stats</GridTitle>
                    <TextOnlyCard cardLeftContent='Total Nodes' leftContentValue={balance.toString()}></TextOnlyCard>
                    <TextOnlyCard cardLeftContent='Total MTN supply' leftContentValue={totalSupply}></TextOnlyCard>
                    <TextOnlyCard cardLeftContent='Calculating MTN' leftContentValue={totalSupply}></TextOnlyCard>

                </BottomGrid>
                <Footer>
                    <ConnectButton />
                </Footer>
            </Section>
        </>
    )
}

export default DApp;