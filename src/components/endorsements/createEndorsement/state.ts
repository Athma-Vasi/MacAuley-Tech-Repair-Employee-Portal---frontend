import {
  CreateEndorsementAction,
  CreateEndorsementDispatch,
  CreateEndorsementState,
} from './types';

const initialCreateEndorsementState: CreateEndorsementState = {
  title: '',
  isValidTitle: false,
  isTitleFocused: false,

  userToBeEndorsed: '',
  isValidUserToBeEndorsed: false,
  isUserToBeEndorsedFocused: false,

  summaryOfEndorsement: '',
  isValidSummaryOfEndorsement: false,
  isSummaryOfEndorsementFocused: false,

  attributeEndorsed: 'adaptibility and flexibility',

  currentStepperPosition: 0,
  stepsInError: new Set(),

  isError: false,
  errorMessage: '',
  isSubmitting: false,
  submitMessage: '',
  isSuccessful: false,
  successMessage: '',
  isLoading: false,
  loadingMessage: '',
};
