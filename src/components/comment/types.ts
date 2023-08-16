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
/**
 * @desc - used to store the data of a comment and its child comments, along with some bookkeeping fields
 */
type CustomCommentObject = {
  commentDoc: QueryResponseData<CommentDocument>;
  childPagesCount: number;
  childLimitPerPage: number;
  totalChildComments: number;
  newQueryFlag: boolean;
  queryBuilderString: string;
  pageQueryString: string;
  isShowChildComments: boolean;
};

type CommentIdsTree = {
  id: string;
  children: CommentIdsTree[];
};

type CommentState = {
  newComment: string;
  isNewCommentValid: boolean;
  isNewCommentFocused: boolean;

  commentIdsToFetch: string[];
  commentIdsTreeArray: CommentIdsTree[];
  customCommentObjectsMap: Map<string, CustomCommentObject>;

  triggerFormSubmit: boolean;

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

  setCommentIdsToFetch: 'setCommentIdsToFetch';
  setInitialCommentIdsTreeArray: 'setInitialCommentIdsTreeArray';
  setCustomCommentObjectsMap: 'setCustomCommentObjectsMap';

  setTriggerFormSubmit: 'setTriggerFormSubmit';

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
        | CommentAction['setErrorMessage']
        | CommentAction['setSuccessMessage']
        | CommentAction['setLoadingMessage']
        | CommentAction['setSubmitMessage'];
      payload: string;
    }
  | {
      type:
        | CommentAction['setIsNewCommentValid']
        | CommentAction['setIsNewCommentFocused']
        | CommentAction['setTriggerFormSubmit']
        | CommentAction['setIsError']
        | CommentAction['setIsSubmitting']
        | CommentAction['setIsLoading']
        | CommentAction['setIsSuccessful'];
      payload: boolean;
    }
  | {
      type: CommentAction['setCommentIdsToFetch'];
      payload: string[];
    }
  | {
      type: CommentAction['setInitialCommentIdsTreeArray'];
      payload: CommentIdsTree[];
    }
  | {
      type: CommentAction['setCustomCommentObjectsMap'];
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
  CommentIdsTree,
  CommentProps,
  CommentReducer,
  CommentSchema,
  CommentState,
  CustomCommentObject,
};
