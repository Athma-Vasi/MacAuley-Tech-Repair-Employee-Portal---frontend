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

export type { FlowEdge, FlowNode, FlowNodeType };
