import { CSSProperties, ReactNode } from 'react';
import {
  CoordinateExtent,
  Edge,
  MarkerType,
  Node,
  Position,
  XYPosition,
} from 'reactflow';

type FlowNodeType = 'input' | 'default' | 'output' | 'group';

type FlowNode<NodeData = any> = {
  id: string;
  position: XYPosition;
  data: NodeData;
  type?: FlowNodeType;
  style?: CSSProperties;
  className?: string;
  targetPosition?: Position;
  sourcePosition?: Position;
  hidden?: boolean;
  selected?: boolean;
  dragging?: boolean;
  draggable?: boolean;
  selectable?: boolean;
  connectable?: boolean;
  deletable?: boolean;
  focusable?: boolean;
  dragHandle?: string;
  width?: number | null;
  height?: number | null;
  parentNode?: string;
  zIndex?: number;
  extent?: 'parent' | CoordinateExtent;
  expandParent?: boolean;
  positionAbsolute?: XYPosition;
  ariaLabel?: string;
};

type FlowEdge<T = any> = {
  id: string;
  type?: string;
  source: string;
  target: string;
  sourceHandle?: string | null;
  targetHandle?: string | null;
  label?: string | ReactNode;
  labelStyle?: CSSProperties;
  labelShowBg?: boolean;
  labelBgStyle?: CSSProperties;
  labelBgPadding?: [number, number];
  labelBgBorderRadius?: number;
  style?: CSSProperties;
  animated?: boolean;
  hidden?: boolean;
  deletable?: boolean;
  focusable?: boolean;
  data?: T;
  className?: string;
  sourceNode?: Node;
  targetNode?: Node;
  selected?: boolean;
  markerStart?: EdgeMarkerType;
  markerEnd?: EdgeMarkerType;
  zIndex?: number;
  ariaLabel?: string;
  interactionWidth?: number;
};

type EdgeMarker = {
  type: MarkerType; // 'arrow' or 'arrowclosed'
  color?: string; // arrow fill color
  width?: number;
  height?: number;
  markerUnits?: string; // defines the coordinate system https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/markerUnits
  orient?: string; // defines rotation - 'auto' | 'auto-start-reverse' | number
  strokeWidth?: number;
};

type EdgeMarkerType = string | EdgeMarker;

type GraphBuilderProps = {
  initialNodes: Node[];
  initialEdges: Edge[];
};

type DagreRankDir = 'TB' | 'BT' | 'LR' | 'RL';
type DagreRankAlign = 'UL' | 'UR' | 'DL' | 'DR' | undefined;
type DagreRankerAlgorithm = 'network-simplex' | 'tight-tree' | 'longest-path';
type DagreLabelPos = 'l' | 'c' | 'r';

type GraphBuilderState = {
  nodes: Node[];
  edges: Edge[];

  // dagre layout options
  dagreRankDir: DagreRankDir;
  dagreRankAlign?: DagreRankAlign;
  dagreNodeSep: number; // default 50
  dagreEdgeSep: number; // default 10
  dagreRankSep: number; // default 50
  dagreMarginX: number; // default 0
  dagreMarginY: number; // default 0
  dagreRanker: DagreRankerAlgorithm; // default 'network-simplex'
  dagreMinLen: number; // minimum edge length default: 1
  dagreWeight: number; // default: 1
  dagreLabelPos: DagreLabelPos; // default: 'r'
  dagreLabelOffset: number; // default: 10
};

type GraphBuilderAction = {
  setNodes: 'setNodes';
  setEdges: 'setEdges';

  // dagre layout options
  setDagreRankDir: 'setDagreRankDir';
  setDagreRankAlign: 'setDagreRankAlign';
  setDagreNodeSep: 'setDagreNodeSep';
  setDagreEdgeSep: 'setDagreEdgeSep';
  setDagreRankSep: 'setDagreRankSep';
  setDagreMarginX: 'setDagreMarginX';
  setDagreMarginY: 'setDagreMarginY';
  setDagreRanker: 'setDagreRanker';
  setDagreMinLen: 'setDagreMinLen';
  setDagreWeight: 'setDagreWeight';
  setDagreLabelPos: 'setDagreLabelPos';
  setDagreLabelOffset: 'setDagreLabelOffset';
};

type GraphBuilderDispatch =
  | {
      type: GraphBuilderAction['setNodes'];
      payload: Node[];
    }
  | {
      type: GraphBuilderAction['setEdges'];
      payload: Edge[];
    }
  | {
      type: GraphBuilderAction['setDagreRankDir'];
      payload: DagreRankDir;
    }
  | {
      type: GraphBuilderAction['setDagreRankAlign'];
      payload: DagreRankAlign;
    }
  | {
      type: GraphBuilderAction['setDagreRanker'];
      payload: DagreRankerAlgorithm;
    }
  | {
      type: GraphBuilderAction['setDagreLabelPos'];
      payload: DagreLabelPos;
    }
  | {
      type:
        | GraphBuilderAction['setDagreNodeSep']
        | GraphBuilderAction['setDagreEdgeSep']
        | GraphBuilderAction['setDagreRankSep']
        | GraphBuilderAction['setDagreMarginX']
        | GraphBuilderAction['setDagreMarginY']
        | GraphBuilderAction['setDagreMinLen']
        | GraphBuilderAction['setDagreWeight']
        | GraphBuilderAction['setDagreLabelOffset'];

      payload: number;
    };

type GraphBuilderReducer = (
  state: GraphBuilderState,
  action: GraphBuilderAction
) => GraphBuilderState;

export type {
  FlowEdge,
  FlowNode,
  FlowNodeType,
  GraphBuilderAction,
  GraphBuilderDispatch,
  GraphBuilderProps,
  GraphBuilderReducer,
  GraphBuilderState,
};
