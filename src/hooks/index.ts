import { ChainId, useCall } from "@usedapp/core";
import { Contract, ethers } from "ethers";
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
