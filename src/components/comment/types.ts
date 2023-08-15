import { QueryResponseData, UserRoles } from '../../types';

type CommentSchema = {
  userId: string;
  username: string;
  roles: UserRoles;

  // (if applicable) id of parent comment that will be updated
  parentCommentId: [string];
  // (if applicable) children comment ids
  childrenIds: string[];

  comment: string;
  repliesCount: number;
  likesCount: number;
  dislikesCount: number;
  reportsCount: number;

  isFeatured: boolean;
  isDeleted: boolean;
};

type CommentDocument = CommentSchema & {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};

type CommentProps = {
  commentIds: string[];
  setNewCommentIdDispatch: React.Dispatch<{
    type: 'setNewCommentId';
    payload: string;
  }>;
  parentParamId?: string;
};

type CommentState = {
  newComment: string;
  isNewCommentValid: boolean;
  isNewCommentFocused: boolean;

  commentsArray: QueryResponseData<CommentDocument>[];

  triggerFormSubmit: boolean;

  pages: number;
  totalDocuments: number;
  newQueryFlag: boolean;
  queryBuilderString: string;
  pageQueryString: string;

  isError: boolean;
  errorMessage: string;
  isSubmitting: boolean;
  submitMessage: string;
  isLoading: boolean;
  loadingMessage: string;
  isSuccessful: boolean;
  successMessage: string;
};

type CommentAction = {
  setNewComment: 'setNewComment';
  setIsNewCommentValid: 'setIsNewCommentValid';
  setIsNewCommentFocused: 'setIsNewCommentFocused';

  setCommentsArray: 'setCommentsArray';

  setTriggerFormSubmit: 'setTriggerFormSubmit';

  setPages: 'setPages';
  setTotalDocuments: 'setTotalDocuments';
  setNewQueryFlag: 'setNewQueryFlag';
  setQueryBuilderString: 'setQueryBuilderString';
  setPageQueryString: 'setPageQueryString';

  setIsError: 'setIsError';
  setErrorMessage: 'setErrorMessage';
  setIsSubmitting: 'setIsSubmitting';
  setSubmitMessage: 'setSubmitMessage';
  setIsLoading: 'setIsLoading';
  setLoadingMessage: 'setLoadingMessage';
  setIsSuccessful: 'setIsSuccessful';
  setSuccessMessage: 'setSuccessMessage';
};

type CommentDispatch =
  | {
      type:
        | CommentAction['setNewComment']
        | CommentAction['setQueryBuilderString']
        | CommentAction['setPageQueryString']
        | CommentAction['setErrorMessage']
        | CommentAction['setSuccessMessage']
        | CommentAction['setLoadingMessage']
        | CommentAction['setSubmitMessage'];
      payload: string;
    }
  | {
      type: CommentAction['setPages'] | CommentAction['setTotalDocuments'];
      payload: number;
    }
  | {
      type:
        | CommentAction['setIsNewCommentValid']
        | CommentAction['setIsNewCommentFocused']
        | CommentAction['setTriggerFormSubmit']
        | CommentAction['setNewQueryFlag']
        | CommentAction['setIsError']
        | CommentAction['setIsSubmitting']
        | CommentAction['setIsLoading']
        | CommentAction['setIsSuccessful'];
      payload: boolean;
    }
  | {
      type: CommentAction['setCommentsArray'];
      payload: QueryResponseData<CommentDocument>;
    };

type CommentReducer = (
  state: CommentState,
  action: CommentDispatch
) => CommentState;

export type {
  CommentAction,
  CommentDispatch,
  CommentDocument,
  CommentProps,
  CommentReducer,
  CommentSchema,
  CommentState,
};
