import { useCall, useCalls, useContractFunction } from "@usedapp/core";
import { BigNumber, Contract, ethers, utils } from "ethers";
import { useEffect, useRef } from "react";

import MountainAbi from '../abi/Mountain.json';
import { Mountain } from "../gen/types";
import { applicationContracts } from "./contracts";

export const useForwardedRef = <T>(ref: any) => {
    const innerRef = useRef<T>(null);

    useEffect(() => {
        if (!ref) return;
        if (typeof ref === 'function') {
            ref(innerRef.current);
        } else {
            ref.current = innerRef.current;
        }
    });

    return innerRef;
}


const MountainInterface = new ethers.utils.Interface(MountainAbi);

export const useGetNumberOfNodes = (chainId: number, account: string) => {
    const MountainContract = new Contract(applicationContracts['Mountain'][chainId], MountainInterface) as Mountain;
    const { value, error } = useCall({ contract: MountainContract, method: "getNumberOfNodes", args: [account] }, { chainId: chainId }) ?? {};

    if (error) {
        return BigNumber.from(0);
    }

    if (!value) {
        return BigNumber.from(0);
    }

    return value[0];
}

export const useGetNodePrice = (chainId: number, nodeId: number) => {
    const MountainContract = new Contract(applicationContracts['Mountain'][chainId], MountainInterface) as Mountain;
    const { value, error } = useCall({ contract: MountainContract, method: "getNodePrice", args: [nodeId] }, { chainId: chainId }) ?? {};

    if (error) {
        return 0;
    }

    if (!value) {
        return 0;
    }

    let formattedValue: number = parseInt(value[0]?._hex);
    let temp: string = utils.formatEther(formattedValue.toString());
    formattedValue = Number(temp);
    return formattedValue;
}

export const useIsNodeOwner = (chainId: number, account: string) => {
    const MountainContract = new Contract(applicationContracts['Mountain'][chainId], MountainInterface) as Mountain;
    const { value, error } = useCall({ contract: MountainContract, method: "isNodeOwner", args: [account] }, { chainId: chainId }) ?? {};

    if (error) {
        return false;
    }

    if (!value) {
        return false;
    }

    return value[0];
}

export const useGetAccountNodeByIndex = (chainId: number, account: string, index: number) => {
    const MountainContract = new Contract(applicationContracts['Mountain'][chainId], MountainInterface) as Mountain;
    const { value, error } = useCall({ contract: MountainContract, method: "accountNodes", args: [account, index] }, { chainId: chainId }) ?? {};

    if (error) {
        return BigNumber.from(0);
    }

    if (!value) {
        return BigNumber.from(0);
    }

    return value[0] && value[0];
}


export const useCreateNodeAndTransferToPools = (chainId: number) => {
    const MountainContract = new Contract(applicationContracts['Mountain'][chainId], MountainInterface) as Mountain;
    const { state, send } = useContractFunction(MountainContract, "createNodeAndTransferToPools", { transactionName: 'Mint Node' });

    return { send, state };
}

export const useNodeMapping = (chainId: number, nodeId: number) => {
    const MountainContract = new Contract(applicationContracts['Mountain'][chainId], MountainInterface) as Mountain;
    const { value, error } = useCall({ contract: MountainContract, method: "nodeMapping", args: [nodeId] }, { chainId: chainId }) ?? {};

    if (error) {
        return [];
    }

    if (!value) {
        return [];
    }

    return value;
}

export const useClaimAllRewards = (chainId: number) => {
    const MountainContract = new Contract(applicationContracts['Mountain'][chainId], MountainInterface) as Mountain;
    const { state, send } = useContractFunction(MountainContract, "claimAllRewards", { transactionName: 'Claim all rewards' });

    return { send, state };
}

export const useClaimRewards = (chainId: number) => {
    const MountainContract = new Contract(applicationContracts['Mountain'][chainId], MountainInterface) as Mountain;
    const { state, send } = useContractFunction(MountainContract, "claimRewards", { transactionName: 'Claim rewards' });

    return { send, state };
}

export const useCalculateRewards = (chainId: number, nodeId: number) => {
    const MountainContract = new Contract(applicationContracts['Mountain'][chainId], MountainInterface) as Mountain;
    const { value, error } = useCall({ contract: MountainContract, method: "calculateRewards", args: [nodeId] }, { chainId: chainId }) ?? {};

    if (error) {
        return BigNumber.from(0);
    }
    if (!value) {
        return BigNumber.from(0);
    }

    return value[0];
}

export const useBalanceOf = (chainId: number, account: string) => {
    const MountainContract = new Contract(applicationContracts['Mountain'][chainId], MountainInterface) as Mountain;
    const { value, error } = useCall({ contract: MountainContract, method: "balanceOf", args: [account] }, { chainId: chainId }) ?? {};

    if (error) {
        return BigNumber.from(0);
    }
    if (!value) {
        return BigNumber.from(0);
    }

    return value[0];
}

export const useTotalSupply = (chainId: number) => {
    const MountainContract = new Contract(applicationContracts['Mountain'][chainId], MountainInterface) as Mountain;
    const { value, error } = useCall({ contract: MountainContract, method: "totalSupply", args: [] }, { chainId: chainId }) ?? {};

    if (error) {
        return BigNumber.from(0);
    }
    if (!value) {
        return BigNumber.from(0);
    }

    return value[0];
}

export const useGetAllNodeIdsOfAccount = (chainId: number, account: string) => {
    const MountainContract = new Contract(applicationContracts['Mountain'][chainId], MountainInterface) as Mountain;


    const nodeIndexArr: number[] = [];
    const length = useGetNumberOfNodes(chainId, account);
    for (let i = 0; i < length.toNumber(); i++) {
        nodeIndexArr.push(i);
    }

    const calls = nodeIndexArr.map((index) => ({
        contract: MountainContract,
        method: 'accountNodes',
        args: [account, nodeIndexArr[index]]
    })) ?? []

    const results = useCalls(calls) ?? []
    results.forEach((result, idx) => {
        if (result && result.error) {
            console.error(`Error encountered calling accountNodes' on ${calls[idx]?.contract.address}: ${result.error.message}`)
        }
    })

    let formattedResult: number[] = []
    results.map(result => {
        formattedResult.push(parseInt(result?.value?.[0]))
    })

    return formattedResult;
}


export const useGetAllRewards = (chainId: number, account: string) => {
    const MountainContract = new Contract(applicationContracts['Mountain'][chainId], MountainInterface) as Mountain;

    const nodeIds = useGetAllNodeIdsOfAccount(chainId, account);

    const calls = nodeIds.map((value) => ({
        contract: MountainContract,
        method: 'calculateRewards',
        args: [value]
    })) ?? []

    const results = useCalls(calls) ?? []
    results.forEach((result, idx) => {
        if (result && result.error) {
            console.error(`Error encountered calling calculateRewards' on ${calls[idx]?.contract.address}: ${result.error.message}`)
        }
    })

    let totalReward = 0;
    results.map(result => {
        totalReward += parseInt(result?.value?.[0])
    });

    return totalReward;
}

const useDailyReward = (chainId: number, nodeType: number) => {
    const MountainContract = new Contract(applicationContracts['Mountain'][chainId], MountainInterface) as Mountain;
    const { value, error } = useCall({ contract: MountainContract, method: "dailyReward", args: [nodeType] }, { chainId: chainId }) ?? {};

    if (error) {
        return 0;
    }
    if (!value) {
        return 0;
    }

    //Result must be divided by 1000 to be usable as interest rate (since result is permille, it will return 0.something)
    let formattedValue = parseInt(value[0]?._hex) / 1000;

    return formattedValue;
}

const useGetAllNodeTypes = (chainId: number, account: string) => {
    const MountainContract = new Contract(applicationContracts['Mountain'][chainId], MountainInterface) as Mountain;

    const nodeIds = useGetAllNodeIdsOfAccount(chainId, account);

    const calls = nodeIds.map((value) => ({
        contract: MountainContract,
        method: 'nodeMapping',
        args: [value]
    })) ?? []

    const results = useCalls(calls) ?? []
    results.forEach((result, idx) => {
        if (result && result.error) {
            console.error(`Error encountered calling nodeMapping' on ${calls[idx]?.contract.address}: ${result.error.message}`)
        }
    })

    let tab: string[] = []
    results.map(result => tab.push(result?.value?.[2].toString()));

    return tab;
}

const useGetDailyInterestOfOwnedNodes = (chainId: number, account: string) => {
    const MountainContract = new Contract(applicationContracts['Mountain'][chainId], MountainInterface) as Mountain;

    const IceNodeInterest = useDailyReward(chainId, 0);
    const IceNodePrice = useGetNodePrice(chainId, 0);

    const EarthNodeInterest = useDailyReward(chainId, 1);
    const EarthNodePrice = useGetNodePrice(chainId, 1);

    const FireNodeInterest = useDailyReward(chainId, 2);
    const FireNodePrice = useGetNodePrice(chainId, 2);

    const nodeTypes = useGetAllNodeTypes(chainId, account)
    const calls = nodeTypes.map((value) => ({
        contract: MountainContract,
        method: 'dailyReward',
        args: [Number(value)]
    })) ?? []

    const results = useCalls(calls) ?? []
    results.forEach((result, idx) => {
        if (result && result.error) {
            console.error(`Error encountered calling dailyRewards' on ${calls[idx]?.contract.address}: ${result.error.message}`)
        }
    })

    let rewardPerNodeArr: number[] = [];
    nodeTypes.map((value) => {
        value == '0' ?
            rewardPerNodeArr.push(IceNodePrice * IceNodeInterest)
            :
            value == '1' ?
                rewardPerNodeArr.push(EarthNodePrice * EarthNodeInterest)
                :
                value == '2' && rewardPerNodeArr.push(FireNodePrice * FireNodeInterest)                                     
    })

    // console.log(rewardPerNodeArr);
    return rewardPerNodeArr;
}

export const useGetDailyRewards = (chainId: number, account: string) => {

    const dailyRewards = useGetDailyInterestOfOwnedNodes(chainId, account);
    const initialValue = 0;
    const total: number = dailyRewards.reduce(
        (previousValue, currentValue) => previousValue + currentValue,
        initialValue
    );

    return total.toFixed(5);
}

export const useNumberOfNodes = (chainId: number) => {
    const MountainContract = new Contract(applicationContracts['Mountain'][chainId], MountainInterface) as Mountain;
    const { value, error } = useCall({ contract: MountainContract, method: "numberOfNodes", args: [] }, { chainId: chainId }) ?? {};

    if (error) {
        return 0;
    }

    if (!value) {
        return 0;
    }

    return parseInt(value[0]._hex);
}