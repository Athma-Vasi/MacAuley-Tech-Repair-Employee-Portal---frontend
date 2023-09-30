import 'reactflow/dist/style.css';

import { Button, Flex } from '@mantine/core';
import { useEffect } from 'react';
import ReactFlow, {
  Background,
  Controls,
  Edge,
  Node,
  Panel,
  ReactFlowProvider,
  useReactFlow,
  Viewport,
} from 'reactflow';
import { useGlobalState } from '../../hooks';
import { returnThemeColors } from '../../utils';
import { COLORS_SWATCHES } from '../../constants/data';

type GraphBuilderProps = {
  layoutedNodes: Node[];
  layoutedEdges: Edge[];
};

function GraphBuilder({ layoutedEdges, layoutedNodes }: GraphBuilderProps) {
  const {
    globalState: { themeObject },
  } = useGlobalState();
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
        <div />
      </Panel>
    </ReactFlow>
  );

  const {
    appThemeColors: { borderColor },
  } = returnThemeColors({
    themeObject,
    colorsSwatches: COLORS_SWATCHES,
  });

  return (
    <Flex
      w="100%"
      h="100%"
      style={{ border: borderColor, borderRadius: '4px' }}
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
