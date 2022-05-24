import { AvalancheTestnet } from "@usedapp/core";
import { config } from "..";
import { ContractAddress } from "./types";

export const applicationContracts: { [key: string]: ContractAddress } = {
    "Mountain": {
        [AvalancheTestnet.chainId]: "0x2968cC756FB2CBc2e1a1c17267f69Ff651041d6a"
    },
    "PangolinPair": {
        [AvalancheTestnet.chainId]: "0x512af65bc65836d6d04144d4d11ce565e4f37852"
    },
    "USDCPair": {
        [AvalancheTestnet.chainId]: "0x67A760Ab698C6E4D0A82854134E50fb71b32abde"
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