import { AvalancheTestnet } from "@usedapp/core";
import { ContractAddress } from "./types";

export const applicationContracts: {[key: string]: ContractAddress} = {
    "Mountain": {
        [AvalancheTestnet.chainId]: "0x6735cb75c2B66193fdCC18C44e557E2Bd9A1d672"
    }
}