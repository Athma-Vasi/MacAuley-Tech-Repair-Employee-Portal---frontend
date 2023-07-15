import { UserRoles } from '../../types';

type CommentSchema = {
  creatorId: string;
  creatorUsername: string;
  creatorRole: UserRoles;

  announcementId: string;
  parentCommentId: string;
  comment: string;
  isAnonymous: boolean;
  isDeleted: boolean;
};

type CommentDocument = CommentSchema & {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};

type CreateCommentState = {
  comment: string;
  isCommentValid: boolean;
  isCommentFocused: boolean;

  isAnonymous: boolean;
  isDeleted: boolean;

  isError: boolean;
  errorMessage: string;
  isSubmitting: boolean;
  submitMessage: string;
  isLoading: boolean;
  loadingMessage: string;
  isSuccess: boolean;
  successMessage: string;
};

type CreateCommentAction = {
  setComment: 'setComment';
  setIsCommentValid: 'setIsCommentValid';
  setIsCommentFocused: 'setIsCommentFocused';

  setIsAnonymous: 'setIsAnonymous';
  setIsDeleted: 'setIsDeleted';

  setIsError: 'setIsError';
  setErrorMessage: 'setErrorMessage';
  setIsSubmitting: 'setIsSubmitting';
  setSubmitMessage: 'setSubmitMessage';
  setIsLoading: 'setIsLoading';
  setLoadingMessage: 'setLoadingMessage';
  setIsSuccess: 'setIsSuccess';
  setSuccessMessage: 'setSuccessMessage';
};

type CreateCommentDispatch =
  | {
      type:
        | CreateCommentAction['setComment']
        | CreateCommentAction['setErrorMessage']
        | CreateCommentAction['setSuccessMessage']
        | CreateCommentAction['setLoadingMessage']
        | CreateCommentAction['setSubmitMessage'];
      payload: string;
    }
  | {
      type:
        | CreateCommentAction['setIsCommentValid']
        | CreateCommentAction['setIsCommentFocused']
        | CreateCommentAction['setIsAnonymous']
        | CreateCommentAction['setIsDeleted']
        | CreateCommentAction['setIsError']
        | CreateCommentAction['setIsSubmitting']
        | CreateCommentAction['setIsLoading']
        | CreateCommentAction['setIsSuccess'];
      payload: boolean;
    };

type CreateCommentReducer = (
  state: CreateCommentState,
  action: CreateCommentDispatch
) => CreateCommentState;

export type {
  CommentDocument,
  CommentSchema,
  CreateCommentAction,
  CreateCommentDispatch,
  CreateCommentReducer,
  CreateCommentState,
};
