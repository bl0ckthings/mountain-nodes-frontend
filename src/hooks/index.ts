import { ChainId, useCall, useCalls, useContractFunction } from "@usedapp/core";
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
        return BigNumber.from(0);
    }

    if (!value) {
        return BigNumber.from(0);
    }

    return value[0];
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

// export const useGetAllNodesOfAccount = (chainId: number) => {
//     const MountainContract = new Contract(applicationContracts['Mountain'][chainId], MountainInterface) as Mountain;
//     const { value, error } = useCall({ contract: MountainContract, method: "getAccountNodes", args: [] }, { chainId: chainId }) ?? {};

//     if (error) {
//         // console.log('ERROR : ' + error);
//         return [BigNumber.from(1)];
//     }
//     if (!value) {
//         // console.log("ya pas de valuer, bouffon !")
//         return [BigNumber.from(2)];
//     }

//     // console.log("value : " + value[0]);
//     return value[0];
// }

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
        if(result && result.error) {
            console.error(`Error encountered calling getAllNodeIdsOfAccount' on ${calls[idx]?.contract.address}: ${result.error.message}`)
        }
    })
return results.map(result => result?.value?.[0])
}


export const useGetAllRewards = (chainId: number, account: string) => {
    const MountainContract = new Contract(applicationContracts['Mountain'][chainId], MountainInterface) as Mountain;
    
    const nodeIds = useGetAllNodeIdsOfAccount(chainId, account);
    // console.log(nodeIds);
    const calls = nodeIds.map((index) => ({
        contract: MountainContract,
        method: 'calculateRewards',
        args: [nodeIds[index - 1]]
    })) ?? []

    const results = useCalls(calls) ?? []
    results.forEach((result, idx) => {
        if(result && result.error) {
            console.error(`Error encountered calling getAllRewards' on ${calls[idx]?.contract.address}: ${result.error.message}`)
        }
    })


    // return results.map(result => Number(utils.formatEther(BigNumber.from((parseInt(result?.value?.[0]).toString(), 10).toString()))).toFixed(5))


    let totalReward = 0;
    results.map(result => {        
        // totalReward += Number(utils.formatEther(BigNumber.from((parseInt(result?.value?.[0]).toString(), 10).toString())))
        totalReward += parseInt(result?.value?.[0])
    });

    // const totalReward = results.reduce(
    //   (previousValue, currentValue) => previousValue + currentValue?.value,
    //   initialValue
    // );
    
// return results.map(result => result?.value?.[0])
return totalReward;
}