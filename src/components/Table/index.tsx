import React, { useEffect } from "react";
import styled from "styled-components";
import {
  useNodeMapping,
  useClaimRewards,
  useCalculateRewards,
  useGetAllNodeIdsOfAccount,
} from "../../hooks";
import { useEthers } from "@usedapp/core";
import { BigNumber, utils } from "ethers";
import { CardButton } from "../Cards";

const TableContainer = styled.div`
  margin: 8px;
  width: 100%;
  max-height: 16vh;
  
  overflow-y: auto;
  
  @media (max-width: 800px) {
    display: flex;
    width: 100%;
    max-height: 32vh;
    width: 100%;

  }
`

const Table = styled.table`
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

const NodeIcon = styled.img`
  width: 48px;
  height: 48px;
`
const TableRow: React.FC<{ nodeId: number }> = (props) => {

  const { chainId } = useEthers();

  const nodeInfo = useNodeMapping(chainId!, props.nodeId);
  const nodeType = nodeInfo[2]
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

  const nodeRewards = useCalculateRewards(chainId!, props.nodeId);
  return (
    <tr>
      <td><NodeIcon src={nodeIcon}></NodeIcon></td>
      <td>{props.nodeId && props.nodeId}</td>
      <td>{type}</td>
      <td className="nodeRewardAmmount">{Number(utils.formatEther(nodeRewards)).toFixed(5)}</td>
      <td className="btnContainer"><CardButton onClick={() => claimRewardsFromOneNode(BigNumber.from(props.nodeId.toString()))}>Claim</CardButton></td>
    </tr>
  );
}

export const TableComponent: React.FC = () => {

  const { account, chainId } = useEthers();

  const ownedNodeIds = useGetAllNodeIdsOfAccount(chainId!, account!);

  return (
    <TableContainer>
      <Table>
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
            ownedNodeIds.map((value) => {
              return (
                <TableRow nodeId={value} />
              );
            })
          }
        </tbody>
      </Table>
    </TableContainer>
  );
}
