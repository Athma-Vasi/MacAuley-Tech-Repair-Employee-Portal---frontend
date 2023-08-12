import { QueryResponseData } from '../../../types';
import { AnnouncementDocument } from '../create/types';

type DisplayAnnouncementsState = {
  responseData: QueryResponseData<AnnouncementDocument>[] | null;
  pages: number;
  totalDocuments: number;

  newQueryFlag: boolean;
  queryBuilderString: string;
  pageQueryString: string;

  triggerRefresh: boolean;

  isError: boolean;
  errorMessage: string;
  isLoading: boolean;
  loadingMessage: string;
  isSuccessful: boolean;
  successMessage: string;
  isSubmitting: boolean;
  submitMessage: string;
};

type DisplayAnnouncementsAction = {
  setResponseData: 'setResponseData';
  setPages: 'setPages';
  setTotalDocuments: 'setTotalDocuments';

  setNewQueryFlag: 'setNewQueryFlag';
  setQueryBuilderString: 'setQueryBuilderString';
  setPageQueryString: 'setPageQueryString';

  setTriggerRefresh: 'setTriggerRefresh';

  setIsError: 'setIsError';
  setErrorMessage: 'setErrorMessage';
  setIsLoading: 'setIsLoading';
  setLoadingMessage: 'setLoadingMessage';
  setIsSuccessful: 'setIsSuccessful';
  setSuccessMessage: 'setSuccessMessage';
  setIsSubmitting: 'setIsSubmitting';
  setSubmitMessage: 'setSubmitMessage';
};

type DisplayAnnouncementsDispatch =
  | {
      type: DisplayAnnouncementsAction['setResponseData'];
      payload: QueryResponseData<AnnouncementDocument>[];
    }
  | {
      type:
        | DisplayAnnouncementsAction['setPages']
        | DisplayAnnouncementsAction['setTotalDocuments'];
      payload: number;
    }
  | {
      type:
        | DisplayAnnouncementsAction['setNewQueryFlag']
        | DisplayAnnouncementsAction['setTriggerRefresh']
        | DisplayAnnouncementsAction['setIsError']
        | DisplayAnnouncementsAction['setIsLoading']
        | DisplayAnnouncementsAction['setIsSuccessful']
        | DisplayAnnouncementsAction['setIsSubmitting'];

      payload: boolean;
    }
  | {
      type:
        | DisplayAnnouncementsAction['setQueryBuilderString']
        | DisplayAnnouncementsAction['setPageQueryString']
        | DisplayAnnouncementsAction['setErrorMessage']
        | DisplayAnnouncementsAction['setLoadingMessage']
        | DisplayAnnouncementsAction['setSuccessMessage']
        | DisplayAnnouncementsAction['setSubmitMessage'];

      payload: string;
    };

type DisplayAnnouncementsReducer = (
  state: DisplayAnnouncementsState,
  action: DisplayAnnouncementsDispatch
) => DisplayAnnouncementsState;

export type {
  DisplayAnnouncementsAction,
  DisplayAnnouncementsDispatch,
  DisplayAnnouncementsReducer,
  DisplayAnnouncementsState,
};
