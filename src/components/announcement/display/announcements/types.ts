import type { AnnouncementDocument } from "../../create/types";
import type { DisplayAnnouncementsAction } from "./actions";

type DisplayAnnouncementsState = {
  currentPage: number;
  isLoading: boolean;
  pages: number;
  responseData: Array<AnnouncementDocument> | null;
  totalDocuments: number;
};

type DisplayAnnouncementsDispatch =
  | {
    action: DisplayAnnouncementsAction["setCurrentPage"];
    payload: number;
  }
  | {
    action: DisplayAnnouncementsAction["setIsLoading"];
    payload: boolean;
  }
  | {
    action: DisplayAnnouncementsAction["setPages"];
    payload: number;
  }
  | {
    action: DisplayAnnouncementsAction["setResponseData"];
    payload: Array<AnnouncementDocument>;
  }
  | {
    action: DisplayAnnouncementsAction["setTotalDocuments"];
    payload: number;
  };

export type { DisplayAnnouncementsDispatch, DisplayAnnouncementsState };
