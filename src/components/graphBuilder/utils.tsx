import dagre from 'dagre';
import { Edge, Node } from 'reactflow';

import { FlowNodesLayoutDirection } from '../directory/types';

type ReturnDagreLayoutedElementsInput = {
  direction?: FlowNodesLayoutDirection;
  edges: Edge[];
  nodes: Node[];
  nodeHeight?: number;
  nodeWidth?: number;
};

function returnDagreLayoutedElements({
  direction = 'TB',
  edges,
  nodes,
  nodeHeight = 217,
  nodeWidth = 351,
}: ReturnDagreLayoutedElementsInput) {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  const getLayoutedElements = (
    nodes: Node[],
    edges: Edge[],
    direction = 'TB'
  ) => {
    const isHorizontal = direction === 'LR';
    dagreGraph.setGraph({ rankdir: direction });

    nodes.forEach((node) => {
      dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
    });

    edges.forEach((edge) => {
      dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    nodes.forEach((node) => {
      const nodeWithPosition = dagreGraph.node(node.id);
      //  type mismatch in library defs
      node.targetPosition = isHorizontal ? ('left' as any) : ('top' as any);
      node.sourcePosition = isHorizontal ? ('right' as any) : ('bottom' as any);

      // We are shifting the dagre node position (anchor=center center) to the top left
      // so it matches the React Flow node anchor point (top left).
      node.position = {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2,
      };

      return node;
    });

    return { nodes, edges };
  };

  return getLayoutedElements(nodes, edges, direction);
}

export { returnDagreLayoutedElements };
