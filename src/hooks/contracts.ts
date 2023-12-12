import { Avalanche } from "@usedapp/core";
import { config } from "..";
import { ContractAddress } from "./types";

export const applicationContracts: { [key: string]: ContractAddress } = {
    "Mountain": {
        [Avalanche.chainId]: "0xD965aC836A59c608458999E7fD23Ddc53F44a215"
    },
    "PangolinPair": {
        [Avalanche.chainId]: "0xEC7E1F9B0f19bb8cD5302892773eD78ECa501a53"
    },
    "USDCPair": {
        [Avalanche.chainId]: "0x5425890298aed601595a70AB815c96711a31Bc65"
    }
}

export const getContract = (name: string, chainId: number) => {
    try {
        return applicationContracts[name][chainId] || applicationContracts[name][config.readOnlyChainId || 1];
    } catch {
        console.warn("Contract was read using readOnlyChainId.");
        return applicationContracts[name][config.readOnlyChainId || 1];
    }
}