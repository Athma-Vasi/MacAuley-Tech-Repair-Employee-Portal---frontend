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
      minZoom: 0.1,
      maxZoom: 2,
    });
  }, [layoutedEdges, layoutedNodes, reactFlowInstance]);

  const displayReactFlow = (
    <ReactFlow nodes={layoutedNodes} edges={layoutedEdges} fitView>
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
      w="75vw"
      h="75vh"
      style={{ outline: '1px solid brown' }}
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
