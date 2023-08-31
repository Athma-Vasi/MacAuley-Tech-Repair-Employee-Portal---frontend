import dagre from 'dagre';
import { Edge, Node } from 'reactflow';

import {
  DagreLabelPos,
  DagreRankAlign,
  DagreRankDir,
  DagreRankerAlgorithm,
} from '../directory/types';

type ReturnDagreLayoutedElementsInput = {
  edges: Edge[];
  nodes: Node[];
  nodeHeight?: number;
  nodeWidth?: number;
  rankdir?: DagreRankDir; // default 'TB'
  align?: DagreRankAlign; // default undefined
  nodesep?: number; // default 50
  edgesep?: number; // default 10
  ranksep?: number; // default 50
  marginx?: number; // default 0
  marginy?: number; // default 0
  ranker?: DagreRankerAlgorithm; // default 'network-simplex'
  minlen?: number; // minimum edge length default: 1
  weight?: number; // default: 1
  labelpos?: DagreLabelPos; // default: 'r'
  labeloffset?: number; // default: 10
};

function returnDagreLayoutedElements(
  dagreLayoutOptions: ReturnDagreLayoutedElementsInput
) {
  const {
    edges,
    nodes,
    nodeHeight = 217,
    nodeWidth = 351,
    rankdir = 'TB',
    align,
    nodesep = 50,
    edgesep = 10,
    ranksep = 50,
    marginx = 0,
    marginy = 0,
    ranker = 'network-simplex',
    minlen = 1,
    weight = 1,
    labelpos = 'r',
    labeloffset = 10,
  } = dagreLayoutOptions;

  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({
    minlen,
    weight,
    labelpos,
    labeloffset,
  }));

  const isHorizontal = rankdir === 'LR';
  dagreGraph.setGraph({
    rankdir,
    align,
    nodesep,
    edgesep,
    ranksep,
    marginx,
    marginy,
    ranker,
  });

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

    // shifting the dagre node position (anchor=center center) to the top left
    // so it matches the React Flow node anchor point (top left).
    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    };

    return node;
  });

  return { nodes, edges };
}

export { returnDagreLayoutedElements };
