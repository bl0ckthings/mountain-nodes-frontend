import React from "react";
import { useEthers, useTokenBalance } from "@usedapp/core";



export const HandleMint=()=>{
    const {account} = useEthers();
    const tokenAdress='0x6b175474e89094c44da98b954eedeac495271d0f';
    const tokenBalance = useTokenBalance(tokenAdress,account)
    
    console.log(tokenBalance);
        }