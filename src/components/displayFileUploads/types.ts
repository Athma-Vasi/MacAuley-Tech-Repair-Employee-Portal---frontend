import { CSSProperties } from 'react';

import { FileUploadDocument } from '../../types';
import { ComponentQueryData } from '../queryBuilder';

type DisplayFileUploadsProps = {
  style?: CSSProperties;
  componentQueryData: ComponentQueryData[];
  paths: {
    employee: string;
    manager: string;
    admin: string;
  };
  requestBodyHeading: string;
};

type DisplayFileUploadsState = {
  fileUploadsData: FileUploadDocument[];
  pages: number;
  totalDocuments: number;

  newQueryFlag: boolean;
  queryBuilderString: string;
  pageQueryString: string;

  deleteFile: {
    id: string;
    value: boolean;
  };
  triggerRefresh: boolean;

  isError: boolean;
  errorMessage: string;
  isSubmitting: boolean;
  submitMessage: string;
  isSuccessful: boolean;
  successMessage: string;
  isLoading: boolean;
  loadingMessage: string;
};

type DisplayFileUploadsAction = {
  setFileUploadsData: 'setFileUploadsData';
  setPages: 'setPages';
  setTotalDocuments: 'setTotalDocuments';

  setNewQueryFlag: 'setNewQueryFlag';
  setQueryBuilderString: 'setQueryBuilderString';
  setPageQueryString: 'setPageQueryString';

  setDeleteFile: 'setDeleteFile';
  setTriggerRefresh: 'setTriggerRefresh';

  setIsError: 'setIsError';
  setErrorMessage: 'setErrorMessage';
  setIsSubmitting: 'setIsSubmitting';
  setSubmitMessage: 'setSubmitMessage';
  setIsSuccessful: 'setIsSuccessful';
  setSuccessMessage: 'setSuccessMessage';
  setIsLoading: 'setIsLoading';
  setLoadingMessage: 'setLoadingMessage';
};

type DisplayFileUploadsDispatch =
  | {
      type: DisplayFileUploadsAction['setFileUploadsData'];
      payload: FileUploadDocument[];
    }
  | {
      type:
        | DisplayFileUploadsAction['setPages']
        | DisplayFileUploadsAction['setTotalDocuments'];
      payload: number;
    }
  | {
      type:
        | DisplayFileUploadsAction['setNewQueryFlag']
        | DisplayFileUploadsAction['setTriggerRefresh']
        | DisplayFileUploadsAction['setIsError']
        | DisplayFileUploadsAction['setIsSubmitting']
        | DisplayFileUploadsAction['setIsSuccessful']
        | DisplayFileUploadsAction['setIsLoading'];

      payload: boolean;
    }
  | {
      type:
        | DisplayFileUploadsAction['setQueryBuilderString']
        | DisplayFileUploadsAction['setPageQueryString']
        | DisplayFileUploadsAction['setErrorMessage']
        | DisplayFileUploadsAction['setSubmitMessage']
        | DisplayFileUploadsAction['setSuccessMessage']
        | DisplayFileUploadsAction['setLoadingMessage'];

      payload: string;
    }
  | {
      type: DisplayFileUploadsAction['setDeleteFile'];
      payload: {
        id: string;
        value: boolean;
      };
    };

type DisplayFileUploadsReducer = (
  state: DisplayFileUploadsState,
  action: DisplayFileUploadsDispatch
) => DisplayFileUploadsState;

export type {
  DisplayFileUploadsAction,
  DisplayFileUploadsDispatch,
  DisplayFileUploadsProps,
  DisplayFileUploadsReducer,
  DisplayFileUploadsState,
};
