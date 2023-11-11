import { type } from 'os';
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

  firstName: string;
  middleName: string;
  lastName: string;
  jobPosition: JobPosition;
  department: Department;
  profilePictureUrl: string;
  parentResourceId: string;
  comment: string;
  quotedUsername: string;
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
  parentResourceTitle: string;
  parentResourceId?: string;
};

type CommentsMap = Map<string, CommentDocument>;

type UpdateCommentRequestBody = {
  fieldsToUpdate: Partial<
    Pick<
      CommentDocument,
      | 'dislikedUserIds'
      | 'dislikesCount'
      | 'likedUserIds'
      | 'likesCount'
      | 'reportedUserIds'
      | 'reportsCount'
      | 'isDeleted'
      | 'isFeatured'
    >
  >;
};

type UpdateCommentPayload = {
  kind: 'like' | 'dislike' | 'report' | 'delete' | 'feature';
  value: boolean;
  userId: string;
  commentId: string;
};

type CommentState = {
  newComment: string;
  isNewCommentValid: boolean;
  isNewCommentFocused: boolean;

  quotedUsername: string;
  quotedComment: string;

  updateCommentId: string;
  updateCommentRequestBody: UpdateCommentRequestBody;
  totalDocuments: number;
  numberOfPages: number;
  limitPerPage: string;
  resetPage: boolean;
  newQueryFlag: boolean;
  queryBuilderString: string;
  pageQueryString: string;

  commentsMap: CommentsMap;
  queryValuesArray: string[]; // passed up from QueryBuilder to highlight comment phrases == query values

  triggerCommentFetch: boolean;
  triggerCommentUpdate: boolean;
  triggerCommentSubmit: boolean;

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

  setQuotedUsername: 'setQuotedUsername';
  setQuotedComment: 'setQuotedComment';

  setReactedCommentId: 'setReactedCommentId';
  setUpdateCommentRequestBody: 'setUpdateCommentRequestBody';

  setTotalDocuments: 'setTotalDocuments';
  setNumberOfPages: 'setNumberOfPages';
  setLimitPerPage: 'setLimitPerPage';
  setResetPage: 'setResetPage';
  setNewQueryFlag: 'setNewQueryFlag';
  setQueryBuilderString: 'setQueryBuilderString';
  setPageQueryString: 'setPageQueryString';

  setCommentsMap: 'setCommentsMap';
  updateCommentsMap: 'updateCommentsMap';
  setQueryValuesArray: 'setQueryValuesArray';

  setTriggerCommentFetch: 'setTriggerCommentFetch';
  setTriggerCommentUpdate: 'setTriggerCommentUpdate';
  setTriggerCommentSubmit: 'setTriggerCommentSubmit';

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
        | CommentAction['setQuotedUsername']
        | CommentAction['setQuotedComment']
        | CommentAction['setReactedCommentId']
        | CommentAction['setNewComment']
        | CommentAction['setLimitPerPage']
        | CommentAction['setQueryBuilderString']
        | CommentAction['setPageQueryString']
        | CommentAction['setSuccessMessage']
        | CommentAction['setLoadingMessage']
        | CommentAction['setSubmitMessage'];
      payload: string;
    }
  | {
      type:
        | CommentAction['setIsNewCommentValid']
        | CommentAction['setIsNewCommentFocused']
        | CommentAction['setResetPage']
        | CommentAction['setNewQueryFlag']
        | CommentAction['setTriggerCommentFetch']
        | CommentAction['setTriggerCommentUpdate']
        | CommentAction['setTriggerCommentSubmit']
        | CommentAction['setIsSubmitting']
        | CommentAction['setIsLoading']
        | CommentAction['setIsSuccessful'];
      payload: boolean;
    }
  | {
      type: CommentAction['setQueryValuesArray'];
      payload: {
        kind: 'add' | 'remove' | 'clear';
        value: string;
      };
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
      type: CommentAction['setUpdateCommentRequestBody'];
      payload: UpdateCommentPayload;
    };

type CommentReducer = (
  state: CommentState,
  action: CommentDispatch
) => CommentState;

type CreatedCommentsSectionObject = {
  profilePicElement: React.JSX.Element;
  usernameElement: React.JSX.Element;
  firstNameElement: React.JSX.Element;
  middleNameElement: React.JSX.Element | null;
  lastNameElement: React.JSX.Element;
  jobPositionElement: React.JSX.Element;
  departmentElement: React.JSX.Element;
  socialMediaIconsElement: React.JSX.Element;
  commentElement: React.JSX.Element;
  quotedUsernameElement: React.JSX.Element | null;
  quotedCommentElement: React.JSX.Element | null;
  likesCountElement: React.JSX.Element;
  dislikesCountElement: React.JSX.Element;
  totalLikesDislikesElement: React.JSX.Element;
  reportsCountElement: React.JSX.Element;
  replyButtonElement: React.JSX.Element;
  likeButtonElement: React.JSX.Element;
  dislikeButtonElement: React.JSX.Element;
  reportButtonElement: React.JSX.Element;
  deleteButtonElement: React.JSX.Element | null;
  featureButtonElement: React.JSX.Element | null;
  isFeaturedElement: React.JSX.Element | null;
  createdAtElement: React.JSX.Element;
  updatedAtElement: React.JSX.Element | null;
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
  UpdateCommentRequestBody,
};
