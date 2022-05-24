import { AvalancheTestnet } from "@usedapp/core";
import { ContractAddress } from "./types";

export const applicationContracts: {[key: string]: ContractAddress} = {
    "Mountain": {
        [AvalancheTestnet.chainId]: "0x2968cC756FB2CBc2e1a1c17267f69Ff651041d6a"
    }
}