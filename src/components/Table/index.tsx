import React, { useEffect } from "react";
import styled, { keyframes } from "styled-components";
import {
  useNodeMapping,
  useClaimRewards,
  useCalculateRewards,
  useGetAllNodeIdsOfAccount,
} from "../../hooks";
import { useEthers } from "@usedapp/core";
import { BigNumber, utils } from "ethers";
import { CardButton } from "../Cards";
import toast, { Toaster } from "react-hot-toast";

const TableContainer = styled.div`
  display: flex;
  margin: 8px;
  width: 100%;  
  overflow-y: auto;
  max-height: 20vh;
  flex-direction: column;
  align-items: center;
  
  @media (max-width: 800px) {
    width: 100%;
    max-height: 32vh;
  }
`

const growUp = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
`

const Table = styled.table`
  border-radius: 5px;
  box-sizing: border-box;
  font-size: medium;
  border-collapse: collapse;
  width: auto;
  white-space: nowrap;
  border-collapse: collapse;
  overflow-y: scroll;

  & tbody td:first-child {
    width: 10%;
  }

  & thead {
    text-align: center;
  }

  & td, th {
    text-align: center;
    padding: 8px;

    @media (max-width: 800px) {
      padding: 4px;
    }
  }

  & td:nth-child(3), & th:nth-child(3) {
    @media (max-width: 800px) {
      display: none;
    }
  }

  & th {
    font-weight: 800;
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
    animation: ${growUp} 0.35s ease-in-out;
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
  let type = nodeType && nodeType.toNumber() === 0 ? "Ice" : nodeType && nodeType.toNumber() === 1 ? "Earth" : nodeType && nodeType.toNumber() === 2 ? "Lava" : "Loading..."

  let nodeIcon = nodeType && nodeType.toNumber() === 0 ? process.env.PUBLIC_URL + 'media/Glace.png' : nodeType && nodeType.toNumber() === 1 ? process.env.PUBLIC_URL + 'media/Green.png' : nodeType && nodeType.toNumber() === 2 ? process.env.PUBLIC_URL + 'media/Lave.png' : 'null'

  const nodeRewards = useCalculateRewards(chainId!, props.nodeId);
  const { send: sendClaimRewards, state: claimRewardsState } = useClaimRewards(chainId!);


  const claimRewardsFromOneNode = async (id: BigNumber) => {
    try {
      await sendClaimRewards(id);
      console.log(id);
    } catch (error) {
      console.error(error);
      toast.error("Failed to claim rewards: ");
    }
  }


  useEffect(() => {
    if (claimRewardsState.status === "Success") {
      toast.success("Successfully claimed rewards")
    }

    if (claimRewardsState.status === "Fail") {
      alert("Failed to claim rewards");
      toast.error("Failed to claim rewards")
    }

  }, [claimRewardsState, nodeRewards])

  return (
    <tr>
      <td>{nodeIcon !== "null" && <NodeIcon src={nodeIcon} />}</td>
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
