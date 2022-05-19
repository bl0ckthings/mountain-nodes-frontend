import React, { useEffect } from "react";
import styled from "styled-components";
import {
  useGetNumberOfNodes,
  useGetAccountNodeByIndex,
  useNodeMapping,
} from "../../hooks";
import { ChainId, useCall, useEthers } from "@usedapp/core";
import { constants } from "perf_hooks";
import { BigNumber } from "ethers";

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
  const node = useNodeMapping(chainId!, 5);
  const nodeId = node[0]
  const nodeType = node[2]
  let nodeText = ''
  let nodeIcon = nodeType && nodeType.toNumber() === 0 ? process.env.PUBLIC_URL + 'media/Lave.png' : nodeType && nodeType.toNumber() === 1 ? process.env.PUBLIC_URL + 'media/Green.png' : nodeType && nodeType.toNumber() === 2 ? process.env.PUBLIC_URL + 'media/Glace.png' : 'null'
  console.log(nodeIcon)
  nodeType && nodeType.toNumber() === 0 ? nodeText = "Lava" : nodeType && nodeType.toNumber() === 1 ? nodeText = "Green" : nodeType && nodeType.toNumber() === 2 ? nodeText = "Ice" : nodeText = "Error"
  return (
    <>
      <TableContent>
        <TableColumn><NodeIcon src={nodeIcon} /></TableColumn>
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



const NewTableRow: React.FC<{ accountNodeIndex: number }> = (props) => {

  const { account, chainId } = useEthers();
  const accountNodes = useGetAccountNodeByIndex(chainId!, account!, props.accountNodeIndex);

  const nodeId = accountNodes;
  const nodes = useNodeMapping(chainId!, nodeId.toNumber());
  const nodeType = nodes[2]
  let type = nodeType && nodeType.toNumber() === 0 ? "Ice" : nodeType && nodeType.toNumber() === 1 ? "Earth" : nodeType && nodeType.toNumber() === 2 ? "Fire" : "Error"

  let nodeIcon = nodeType && nodeType.toNumber() === 0 ? process.env.PUBLIC_URL + 'media/Glace.png' : nodeType && nodeType.toNumber() === 1 ? process.env.PUBLIC_URL + 'media/Green.png' : nodeType && nodeType.toNumber() === 2 ? process.env.PUBLIC_URL + 'media/Lave.png' : 'null'

  return (

    <tr>
      <td><NodeIcon src={nodeIcon}></NodeIcon></td>
      <td>{nodeId && nodeId.toNumber()}</td>
      <td>{type}</td>
    </tr>
  );
}

export const NewTable: React.FC = () => {

  const { account, chainId } = useEthers();

  const indexArr: number[] = [];
  const length = useGetNumberOfNodes(chainId!, account!);

  const zebi = () => {
    for (let i = 0; i < length.toNumber(); i++) {
      indexArr.push(i);

    }
  }
  zebi();

  return (
    <table>
      <thead>Owned Nodes</thead>
      <tbody>
        <td>Icon</td>
        <td>ID</td>
        <td>Type</td>
        {
          indexArr.map((value) => {
            return (
              <NewTableRow accountNodeIndex={value} />
            );
          })
        }
      </tbody>
    </table>

  );
}

// const TableContainer = styled.div`
//   & ${NewTable} {
    
//   }
// `