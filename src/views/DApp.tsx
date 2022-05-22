import { useEthers } from '@usedapp/core';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { ConnectButton } from '../components/Button';
import { BlankCard, ButtonCard, CardButton, TextOnlyCard } from '../components/Cards';
import { Section } from '../components/Containers';
import { NavbarDApp } from '../components/Navbar/Navbar';
import { useClaimAllRewards, useIsNodeOwner, useGetNumberOfNodes, useGetAccountNodeByIndex, useCalculateRewards, useNodeMapping, useBalanceOf, useTotalSupply, useGetAllNodeIdsOfAccount, useGetAllRewards, useGetNodePrice, useGetDailyRewards, useNumberOfNodes } from '../hooks';
import { TableComponent, Table } from '../components/Table';
import { BigNumber, utils } from 'ethers';

const Text = styled.h5`
    text-align:center;
    margin-bottom: 32px;
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

const GridBlankCard = styled(BlankCard)`
    grid-column: 2 span;

    @media (max-width: 800px) {
        grid-column: unset;
    }
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
        /* grid-column: unset; */
        grid-template-columns: 1fr !important;
        grid-template-rows: 0.2fr repeat(3, 1fr) 2fr;
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
        grid-template-rows: repeat(4, 1fr) 0.5fr;
    }
`
const MtnPriceCardContainer = styled.div`
    grid-column: span 2;

    @media (max-width: 800px) {
        grid-column: unset;
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


    const mtnBalance = useBalanceOf(chainId!, account!);

    const formattedBalance: string = Number(utils.formatEther(mtnBalance)).toFixed(4).toString();
    const totalSupply: string = utils.commify(utils.formatEther(useTotalSupply(chainId!))) + ' MTN';

    const allRewards: number = useGetAllRewards(chainId!, account!);

    const dailyRewards = useGetDailyRewards(chainId!, account!);

    const totalNumberOfNode = useNumberOfNodes(chainId!);

    let totalReward: string = '0';
    allRewards.toString() !== "NaN" ?
        totalReward = Number(utils.formatEther(BigNumber.from(allRewards.toString()))).toFixed(5)
        :
        totalReward = '0.00000';

    return (
        <>
            <Overlay />
            <Section style={{ backgroundImage: `url(${process.env.PUBLIC_URL + "/img/backgrounds/background.png"})`, backgroundPosition: 'center', backgroundSize: 'cover', alignItems: "center", paddingTop: "16px"}}>
                <NavbarDApp />
                <TopGrid>
                    <GridTitle>Dashboard</GridTitle>
                    <ButtonCard handleClick={() => sendClaimAllRewards()} cardContent='Rewards' contentValue={totalReward} buttonValue='Claim/Compound' />
                    <TextOnlyCard cardLeftContent='Rewards per day' leftContentValue={dailyRewards.toString()} cardRightContent='USD per day' rightContentValue='$0.00' />
                    <MtnPriceCardContainer>
                        <TextOnlyCard cardLeftContent='MTN Price' leftContentValue='0.0000 $' cardRightContent='MTN Balance' rightContentValue={formattedBalance} />
                    </MtnPriceCardContainer>
                    <GridBlankCard>
                        {isUserNodeOwner ?
                            // <Table/> 
                            <TableComponent />
                            : <>
                                <Text>You dont own any nodes</Text>
                                <CardButton onClick={() => navigate('/mint-node')}>Mint your first node</CardButton>
                            </>
                        }
                    </GridBlankCard>
                </TopGrid>
                <BottomGrid>
                    <GridTitle span={3}>Protocol Stats</GridTitle>
                    <TextOnlyCard cardLeftContent='Total Nodes' leftContentValue={totalNumberOfNode.toString()}></TextOnlyCard>
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