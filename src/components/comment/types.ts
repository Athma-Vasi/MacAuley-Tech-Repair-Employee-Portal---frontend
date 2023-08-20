import {
  Department,
  JobPosition,
  QueryResponseData,
  User,
  UserRoles,
} from '../../types';

type CommentSchema = {
  userId: string;
  username: string;
  roles: UserRoles;

  jobPosition: JobPosition;
  department: Department;
  profilePictureUrl: string;
  parentResourceId: string;
  comment: string;
  quotedComment: string;
  likesCount: number;
  dislikesCount: number;
  reportsCount: number;

  isFeatured: boolean;
  isDeleted: boolean;

  likedUserIds: string[];
  dislikedUserIds: string[];
  reportedUserIds: string[];
};

type CommentDocument = CommentSchema & {
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

type GetCommentsServerResponse = {
  message: string;
  pages: number;
  totalDocuments: number;
  resourceData: CommentDocument[];
};

type CommentProps = {
  parentResourceId?: string;
};

type CommentsMap = Map<string, CommentDocument>;

type ReactedCommentRequestBody = {
  fieldsToUpdate: Partial<
    Pick<
      CommentDocument,
      | 'dislikedUserIds'
      | 'dislikesCount'
      | 'likedUserIds'
      | 'likesCount'
      | 'reportedUserIds'
      | 'reportsCount'
    >
  >;
};

type ReactedCommentPayload = {
  field: 'likes' | 'dislikes' | 'reports' | '';
  value: boolean;
  userId: string;
  commentId: string;
};

type CommentState = {
  newComment: string;
  isNewCommentValid: boolean;
  isNewCommentFocused: boolean;

  quotedComment: string;
  reactedRequestBody: ReactedCommentRequestBody;
  totalDocuments: number;
  numberOfPages: number;
  limitPerPage: string;
  newQueryFlag: boolean;
  queryBuilderString: string;
  pageQueryString: string;
  areCommentsVisible: boolean;

  commentIdsToFetch: string[];
  commentsMap: CommentsMap;

  triggerCommentUpdate: boolean;
  triggerCommentSubmit: boolean;

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

  setQuotedComment: 'setQuotedComment';
  setReactedRequestBody: 'setReactedRequestBody';
  setTotalDocuments: 'setTotalDocuments';
  setNumberOfPages: 'setNumberOfPages';
  setLimitPerPage: 'setLimitPerPage';
  setNewQueryFlag: 'setNewQueryFlag';
  setQueryBuilderString: 'setQueryBuilderString';
  setPageQueryString: 'setPageQueryString';
  setAreCommentsVisible: 'setAreCommentsVisible';

  setCommentIdsToFetch: 'setCommentIdsToFetch';
  setCommentsMap: 'setCommentsMap';
  updateCommentsMap: 'updateCommentsMap';

  setTriggerCommentUpdate: 'setTriggerCommentUpdate';
  setTriggerCommentSubmit: 'setTriggerCommentSubmit';

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
        | CommentAction['setTotalDocuments']
        | CommentAction['setNumberOfPages'];
      payload: number;
    }
  | {
      type:
        | CommentAction['setQuotedComment']
        | CommentAction['setNewComment']
        | CommentAction['setLimitPerPage']
        | CommentAction['setQueryBuilderString']
        | CommentAction['setPageQueryString']
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
        | CommentAction['setNewQueryFlag']
        | CommentAction['setAreCommentsVisible']
        | CommentAction['setTriggerCommentUpdate']
        | CommentAction['setTriggerCommentSubmit']
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
      type: CommentAction['setCommentsMap'];
      payload: { commentsMap: CommentsMap };
    }
  | {
      type: CommentAction['updateCommentsMap'];
      payload: { commentDoc: CommentDocument };
    }
  | {
      type: CommentAction['setReactedRequestBody'];
      payload: ReactedCommentPayload;
    };

type CommentReducer = (
  state: CommentState,
  action: CommentDispatch
) => CommentState;

type CreatedCommentsSectionObject = {
  profilePicElement: React.JSX.Element;
  usernameElement: React.JSX.Element;
  jobPositionElement: React.JSX.Element;
  departmentElement: React.JSX.Element;
  commentElement: React.JSX.Element;
  quotedCommentElement: React.JSX.Element | null;
  likesCountElement: React.JSX.Element;
  dislikesCountElement: React.JSX.Element;
  totalLikesDislikesElement: React.JSX.Element;
  reportsCountElement: React.JSX.Element;
  replyButtonElement: React.JSX.Element;
  likeButtonElement: React.JSX.Element;
  dislikeButtonElement: React.JSX.Element;
  reportButtonElement: React.JSX.Element;
  isFeaturedElement: React.JSX.Element | null;
  createdAtElement: React.JSX.Element;
  updatedAtElement: React.JSX.Element;
};

export type {
  CommentAction,
  CommentDispatch,
  CommentDocument,
  CommentProps,
  CommentReducer,
  CommentSchema,
  CommentsMap,
  CommentState,
  CreatedCommentsSectionObject,
  GetCommentsServerResponse,
  ReactedCommentRequestBody,
};
