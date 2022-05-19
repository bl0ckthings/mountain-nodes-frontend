import React, { useEffect } from "react";
import styled from "styled-components";
import {
  useGetNumberOfNodes,
  useGetAccountNodeByIndex,
  useNodeMapping,
} from "../../hooks";
import { useCall, useEthers } from "@usedapp/core";
import { constants } from "perf_hooks";

const TableContent = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr ;
`;

const TableColumn = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size:var(--font-size-base);
`;
const NodeIcon = styled.img`
  width: 48px;
  height: 48px;
`;

export const Table: React.FC = () => {
const { account, chainId } = useEthers();
const node = useNodeMapping(chainId!, 6);
const nodeId = node[0]
const nodeType = node[2]
let nodeText = '' 
let nodeIcon = 
  nodeType && nodeType.toNumber() === 0 ? process.env.PUBLIC_URL + 'media/Lave.png' 
: nodeType && nodeType.toNumber() === 1 ? process.env.PUBLIC_URL + 'media/Green.png' 
: nodeType && nodeType.toNumber() === 2 ? process.env.PUBLIC_URL + 'media/Glace.png' : 'null'
  nodeType && nodeType.toNumber() === 0 ? nodeText="Lava" : nodeType && nodeType.toNumber() === 1 ? nodeText="Green" 
: nodeType && nodeType.toNumber() === 2 ? nodeText="Ice" :nodeText= "Error";
//const test = useGetAccountNodeByIndex(chainId!,account!,0)
return (
    <>
        <TableContent>
        <TableColumn><NodeIcon src={nodeIcon}/></TableColumn>
        <TableColumn>{nodeId && nodeId.toNumber()}</TableColumn>
        <TableColumn>{nodeText}</TableColumn>
      </TableContent>
      <TableContent>
        <TableColumn><NodeIcon src={nodeIcon}/></TableColumn>
        <TableColumn>{nodeId && nodeId.toNumber()}</TableColumn>
        <TableColumn>{nodeText}</TableColumn>
      </TableContent>
      
    </>
  );
};