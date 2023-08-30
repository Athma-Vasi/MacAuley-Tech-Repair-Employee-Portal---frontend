import {
  GraphBuilderAction,
  GraphBuilderDispatch,
  GraphBuilderState,
} from './types';

const initialGraphBuilderState: GraphBuilderState = {
  nodes: [],
  edges: [],

  // dagre layout options
  dagreRankDir: 'TB',
  dagreRankAlign: undefined,
  dagreNodeSep: 50, // default 50
  dagreEdgeSep: 10, // default 10
  dagreRankSep: 50, // default 50
  dagreMarginX: 0, // default 0
  dagreMarginY: 0, // default 0
  dagreRanker: 'network-simplex', // default 'network-simplex'
  dagreMinLen: 1, // minimum edge length default: 1
  dagreWeight: 1, // default: 1
  dagreLabelPos: 'r', // default: 'r'
  dagreLabelOffset: 10, // default: 10
};

const graphBuilderAction: GraphBuilderAction = {
  setNodes: 'setNodes',
  setEdges: 'setEdges',

  // dagre layout options
  setDagreRankDir: 'setDagreRankDir',
  setDagreRankAlign: 'setDagreRankAlign',
  setDagreNodeSep: 'setDagreNodeSep',
  setDagreEdgeSep: 'setDagreEdgeSep',
  setDagreRankSep: 'setDagreRankSep',
  setDagreMarginX: 'setDagreMarginX',
  setDagreMarginY: 'setDagreMarginY',
  setDagreRanker: 'setDagreRanker',
  setDagreMinLen: 'setDagreMinLen',
  setDagreWeight: 'setDagreWeight',
  setDagreLabelPos: 'setDagreLabelPos',
  setDagreLabelOffset: 'setDagreLabelOffset',
};

function graphBuilderReducer(
  state: GraphBuilderState,
  action: GraphBuilderDispatch
): GraphBuilderState {
  switch (action.type) {
    case graphBuilderAction.setNodes:
      return {
        ...state,
        nodes: action.payload,
      };
    case graphBuilderAction.setEdges:
      return {
        ...state,
        edges: action.payload,
      };

    // dagre layout options
    case graphBuilderAction.setDagreRankDir:
      return {
        ...state,
        dagreRankDir: action.payload,
      };
    case graphBuilderAction.setDagreRankAlign:
      return {
        ...state,
        dagreRankAlign: action.payload,
      };
    case graphBuilderAction.setDagreNodeSep:
      return {
        ...state,
        dagreNodeSep: action.payload,
      };
    case graphBuilderAction.setDagreEdgeSep:
      return {
        ...state,
        dagreEdgeSep: action.payload,
      };
    case graphBuilderAction.setDagreRankSep:
      return {
        ...state,
        dagreRankSep: action.payload,
      };
    case graphBuilderAction.setDagreMarginX:
      return {
        ...state,
        dagreMarginX: action.payload,
      };
    case graphBuilderAction.setDagreMarginY:
      return {
        ...state,
        dagreMarginY: action.payload,
      };
    case graphBuilderAction.setDagreRanker:
      return {
        ...state,
        dagreRanker: action.payload,
      };
    case graphBuilderAction.setDagreMinLen:
      return {
        ...state,
        dagreMinLen: action.payload,
      };
    case graphBuilderAction.setDagreWeight:
      return {
        ...state,
        dagreWeight: action.payload,
      };
    case graphBuilderAction.setDagreLabelPos:
      return {
        ...state,
        dagreLabelPos: action.payload,
      };
    case graphBuilderAction.setDagreLabelOffset:
      return {
        ...state,
        dagreLabelOffset: action.payload,
      };
    default:
      return state;
  }
}

export { graphBuilderAction, graphBuilderReducer, initialGraphBuilderState };
