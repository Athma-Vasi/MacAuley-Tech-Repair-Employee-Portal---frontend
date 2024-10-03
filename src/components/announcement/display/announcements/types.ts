import type { AnnouncementDocument } from "../../create/types";
import type { DisplayAnnouncementsAction } from "./actions";

type DisplayAnnouncementsState = {
  currentPage: number;
  errorMessage: string;
  isError: boolean;
  isLoading: boolean;
  loadingMessage: string;
  newQueryFlag: boolean;
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
    action: DisplayAnnouncementsAction["setErrorMessage"];
    payload: string;
  }
  | {
    action: DisplayAnnouncementsAction["setIsError"];
    payload: boolean;
  }
  | {
    action: DisplayAnnouncementsAction["setIsLoading"];
    payload: boolean;
  }
  | {
    action: DisplayAnnouncementsAction["setLoadingMessage"];
    payload: string;
  }
  | {
    action: DisplayAnnouncementsAction["setNewQueryFlag"];
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
