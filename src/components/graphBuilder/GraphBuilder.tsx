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
} from 'reactflow';

import { useEffect } from 'react';

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
    reactFlowInstance.setViewport({
      x: 0,
      y: 0,
      zoom: 1,
    });

    reactFlowInstance.fitView({
      minZoom: 0.4,
      maxZoom: 2,
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
      <Controls
        onZoomIn={() => {
          reactFlowInstance.zoomIn();
        }}
      />
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
