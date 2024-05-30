import { Directory1State } from "./types";

const initialDirectory1State: Directory1State = {
  dagreMinLen: 1,
  dagreNodeSep: 50,
  dagreRankAlign: "UL",
  dagreRankDir: "TB",
  dagreRankSep: 50,
  dagreRanker: "network-simplex",
  department: "All Departments",
  isLoading: false,
  jobPosition: "All Job Positions",
  pagesInError: new Set(),
  search: "",
  storeLocation: "All Store Locations",
};

export { initialDirectory1State };
