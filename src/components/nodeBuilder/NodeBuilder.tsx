import 'reactflow/dist/style.css';

import { Flex } from '@mantine/core';

import { FlowEdge, FlowNode, NodeBuilderProps } from './types';

import React, { useCallback } from 'react';
import ReactFlow, {
  addEdge,
  ConnectionLineType,
  Panel,
  useNodesState,
  useEdgesState,
  Background,
  Controls,
  Edge,
  Node,
} from 'reactflow';
import dagre from 'dagre';
import { returnDagreLayoutedElements } from '../directory/utils';

// import { initialNodes, initialEdges } from './nodes-edges.js';

function NodeBuilder({ initialEdges, initialNodes }: NodeBuilderProps) {
  const { nodes, edges } = returnDagreLayoutedElements({
    edges: initialEdges,
    nodes: initialNodes,
    direction: 'TB',
  });

  return (
    <Flex w="75vw" h="75vh" style={{ outline: '1px solid brown' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        // onNodesChange={onNodesChange}
        // onEdgesChange={onEdgesChange}
        // onConnect={onConnect}
        // connectionLineType={ConnectionLineType.SmoothStep}
        fitView
      >
        <Background />
        <Controls />
        {/* <Panel position="top-right">
          <button type="button" onClick={() => onLayout('TB')}>
            vertical layout
          </button>
          <button type="button" onClick={() => onLayout('LR')}>
            horizontal layout
          </button>
        </Panel> */}
      </ReactFlow>
    </Flex>
  );
}

export default NodeBuilder;
