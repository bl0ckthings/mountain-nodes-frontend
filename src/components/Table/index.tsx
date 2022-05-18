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
  grid-template-rows: 1fr 1fr 1fr;
`;

const TableColumn = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: top;
`;
const NodeIcon = styled.img`
  width: 24px;
  height: 24px;
`;

export const Table: React.FC = () => {
const { account, chainId } = useEthers();
const node = useNodeMapping(chainId!, 1);
console.log(node[0])
const nodeId = node[0]
const nodeType = node[2]
let nodeText = ''
nodeType && nodeType.toNumber() === 0 ? nodeText="Lava Node" : nodeType && nodeType.toNumber() === 1 ? nodeText="Green Node" : nodeType && nodeType.toNumber() === 2 ? nodeText="Ice Node" :nodeText= "Error"
  return (
    <>
        <TableContent>
        <TableColumn></TableColumn>
        <TableColumn>{nodeId && nodeId.toNumber()}</TableColumn>
        <TableColumn>{nodeText}</TableColumn>
      </TableContent>
    </>
  );
};
