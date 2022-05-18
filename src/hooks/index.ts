import { ChainId, useCall, useContractFunction } from "@usedapp/core";
import { BigNumber, Contract, ethers } from "ethers";
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
    const { value, error } = useCall({contract: MountainContract, method: "getNumberOfNodes", args: [account]}, {chainId: chainId}) ?? {};

    if (error) {
        return 333;
    }

    if (!value) {
        return 444;
    }

    return value[0];
}

export const useGetNodePrice = (chainId: number, nodeId: number) => {
    const MountainContract = new Contract(applicationContracts['Mountain'][chainId], MountainInterface) as Mountain;
    const { value, error } = useCall({contract: MountainContract, method: "getNodePrice", args: [nodeId]}, {chainId: chainId}) ?? {};

    if (error) {
        return 333;
    }

    if (!value) {
        return 444;
    }

    return value[0];
}

export const useIsNodeOwner = (chainId: number, account: string) => {
    const MountainContract = new Contract(applicationContracts['Mountain'][chainId], MountainInterface) as Mountain;
    const { value, error } = useCall({contract: MountainContract, method: "isNodeOwner", args: [account]}, {chainId: chainId}) ?? {};

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
    const { value, error } = useCall({contract: MountainContract, method: "accountNodes", args: [account, index]}, {chainId: chainId}) ?? {};

    if (error) {
        return 333;
    }

    if (!value) {
        return 444;
    }

    return value[0];
}


export const useCreateNodeAndTransferToPools = (chainId: number) => {
    const MountainContract = new Contract(applicationContracts['Mountain'][chainId], MountainInterface) as Mountain;
    const {state, send} = useContractFunction(MountainContract, "createNodeAndTransferToPools", {transactionName: 'Mint Node'} );
    
    return {send, state};
}

export const useClaimAllRewards = (chainId: number) => {
    const MountainContract = new Contract(applicationContracts['Mountain'][chainId], MountainInterface) as Mountain;
    const { state, send } = useContractFunction(MountainContract, "claimAllRewards", {transactionName: 'Claim all rewards'} );

    return { send, state };
}