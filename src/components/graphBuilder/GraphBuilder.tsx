import 'reactflow/dist/style.css';

import { Button, Flex } from '@mantine/core';

import ReactFlow, {
  Background,
  Controls,
  Edge,
  Node,
  Panel,
  useReactFlow,
  ReactFlowProvider,
  Viewport,
} from 'reactflow';

import { useEffect, useState } from 'react';

type GraphBuilderProps = {
  layoutedNodes: Node[];
  layoutedEdges: Edge[];
};

function GraphBuilder({ layoutedEdges, layoutedNodes }: GraphBuilderProps) {
  // ┏━ begin hooks ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  const reactFlowInstance = useReactFlow();

  // ━━━━━ end hooks ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

  // ┏━ begin useEffects ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  useEffect(() => {
    reactFlowInstance.fitView({
      padding: 0.1,
      nodes: layoutedNodes,
      minZoom: 0.5,
      maxZoom: 1,
    });

    reactFlowInstance.setViewport({
      x: 100,
      y: 100,
      zoom: 0.5,
    });
  }, [layoutedEdges, layoutedNodes, reactFlowInstance]);

  const displayReactFlow = (
    <ReactFlow
      nodes={layoutedNodes}
      edges={layoutedEdges}
      fitView
      minZoom={0.1}
      maxZoom={2}
    >
      <Background />
      <Controls />
      <Panel position="top-right">
        <></>
      </Panel>
    </ReactFlow>
  );

  return (
    <Flex
      w="100%"
      h="100%"
      style={{ border: '1px solid #e0e0e0', borderRadius: '4px' }}
      direction="column"
    >
      {/* {displayButtons} */}
      {displayReactFlow}
    </Flex>
  );
}

// done in order to use the react flow hooks
export default function GraphBuilderWrapper({
  layoutedEdges = [],
  layoutedNodes = [],
}: {
  layoutedEdges?: Edge[];
  layoutedNodes?: Node[];
}) {
  return (
    <ReactFlowProvider>
      <GraphBuilder
        layoutedEdges={layoutedEdges}
        layoutedNodes={layoutedNodes}
      />
    </ReactFlowProvider>
  );
}
