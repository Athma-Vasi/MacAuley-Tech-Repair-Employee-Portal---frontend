import type { UserAvatarAction } from "./actions";

type UserAvatarState = {
  colorSchemeSwitchChecked: boolean;
  errorMessage: string;
  isError: boolean;
  isSubmitting: boolean;
  isSuccessful: boolean;
  prefersReducedMotionSwitchChecked: boolean;
  submittingMessage: string;
  triggerLogoutSubmit: boolean;
  triggerPrefersReducedMotionFormSubmit: boolean;
};

type UserAvatarDispatch = {
  action: UserAvatarAction["setColorSchemeSwitchChecked"];
  payload: boolean;
} | {
  action: UserAvatarAction["setErrorMessage"];
  payload: string;
} | {
  action: UserAvatarAction["setIsError"];
  payload: boolean;
} | {
  action: UserAvatarAction["setIsSubmitting"];
  payload: boolean;
} | {
  action: UserAvatarAction["setIsSuccessful"];
  payload: boolean;
} | {
  action: UserAvatarAction["setPrefersReducedMotionSwitchChecked"];
  payload: boolean;
} | {
  action: UserAvatarAction["setSubmittingMessage"];
  payload: string;
} | {
  action: UserAvatarAction["setTriggerLogoutSubmit"];
  payload: boolean;
} | {
  action: UserAvatarAction["triggerPrefersReducedMotionFormSubmit"];
  payload: boolean;
};

export type { UserAvatarDispatch, UserAvatarState };
