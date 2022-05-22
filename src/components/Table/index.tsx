import React, { useEffect } from "react";
import styled from "styled-components";
import {
  useGetNumberOfNodes,
  useGetAccountNodeByIndex,
  useNodeMapping,
  useClaimRewards,
  useCalculateRewards,
} from "../../hooks";
import { ChainId, useCall, useEthers } from "@usedapp/core";
import { constants } from "perf_hooks";
import { BigNumber, utils } from "ethers";
import { CardButton } from "../Cards";

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
        <TableColumn><NodeIcon src={nodeIcon} /></TableColumn>
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

  const { send: sendClaimRewards, state: claimRewardsState } = useClaimRewards(chainId!);

  const claimRewardsFromOneNode = (id: BigNumber) => {
    sendClaimRewards(id);
    console.log(id);
  }


  useEffect(() => {
    if (claimRewardsState.status === "Success") {
      alert("Successfully claimed rewards");
    }

    if (claimRewardsState.status === "Fail") {
      alert("Failed to claim rewards");
    }

  }, [claimRewardsState])

  const nodeRewards = useCalculateRewards(chainId!, nodeId.toNumber());
  // console.log("node reward of " + nodeId.toNumber() + " = " + nodeRewards);
  return (

    <tr>
      <td><NodeIcon src={nodeIcon}></NodeIcon></td>
      <td>{nodeId && nodeId.toNumber()}</td>
      <td>{type}</td>
      <td className="nodeRewardAmmount">{Number(utils.formatEther(nodeRewards)).toFixed(5)}</td>
      <td className="btnContainer"><CardButton onClick={() => claimRewardsFromOneNode(nodeId)}>Claim Rewards</CardButton></td>
    </tr>
  );
}
export const TableComponent: React.FC = () => {

  const { account, chainId } = useEthers();

  const indexArr: number[] = [];
  const length = useGetNumberOfNodes(chainId!, account!);

  const createArrayOfNodeIndexes = () => {
    for (let i = 0; i < length.toNumber(); i++) {
      indexArr.push(i);
      
    }
  }
  createArrayOfNodeIndexes();

  // const test =()=> indexArr.map((value)=>{
  //   useCalculateRewards(chainId!,value)
  // })

  return (
    <TableContainer>
      <NewTable>
        <thead>
          <tr className="headersRow">
            <th></th>
            <th>ID</th>
            <th>Type</th>
            <th>Rewards</th>
          </tr>
        </thead>
        <tbody>
          {
            indexArr.map((value) => {
              return (
                <NewTableRow accountNodeIndex={value} />
              );
            })
          }
        </tbody>
      </NewTable>
    </TableContainer>
  );
}

const TableContainer = styled.div`
  margin: 8px;
  width: 100%;
  max-height: 24vh;
  
  overflow-y: auto;
  
  @media (max-width: 800px) {
    display: flex;
    width: 100%;
    max-height: 12vh;

  }
`

const NewTable = styled.table`
  border-radius: 5px;
  font-size: medium;
  border-collapse: collapse;
  width: 100%;
  max-width: 100%;
  white-space: nowrap;

  border-collapse: collapse;
  overflow-y: auto;

  & thead {
    text-align: center;
  }
  & td, th {
    text-align: center;
    padding: 8px;
  }

  & th {
    font-weight: 400;
  }

  & tr:not(.headersRow) {
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  & .btnContainer {
    width: 10%;
  }

  & .nodeRewardAmmount {
    font-weight: 600;
  }

`