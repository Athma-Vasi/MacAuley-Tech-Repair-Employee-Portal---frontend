type UserAvatarState = {
  colorSchemeSwitchChecked: boolean;
  prefersReducedMotionSwitchChecked: boolean;

  isAppearanceNavLinkActive: boolean;
  isProfileNavLinkActive: boolean;
  isLogoutNavLinkActive: boolean;

  triggerLogoutSubmit: boolean;
  isSubmitting: boolean;
  submitMessage: string;
  isSuccessful: boolean;
  successMessage: string;
};

type UserAvatarAction = {
  setColorSchemeSwitchChecked: 'setColorSchemeSwitchChecked';
  setPrefersReducedMotionSwitchChecked: 'setPrefersReducedMotionSwitchChecked';

  setIsAppearanceNavLinkActive: 'setIsAppearanceNavLinkActive';
  setIsProfileNavLinkActive: 'setIsProfileNavLinkActive';
  setIsLogoutNavLinkActive: 'setIsLogoutNavLinkActive';

  setTriggerLogoutSubmit: 'setTriggerLogoutSubmit';
  setIsSubmitting: 'setIsSubmitting';
  setSubmitMessage: 'setSubmitMessage';
  setIsSuccessful: 'setIsSuccessful';
  setSuccessMessage: 'setSuccessMessage';
};

type UserAvatarDispatch =
  | {
      type:
        | UserAvatarAction['setColorSchemeSwitchChecked']
        | UserAvatarAction['setPrefersReducedMotionSwitchChecked']
        | UserAvatarAction['setIsAppearanceNavLinkActive']
        | UserAvatarAction['setIsProfileNavLinkActive']
        | UserAvatarAction['setIsLogoutNavLinkActive']
        | UserAvatarAction['setTriggerLogoutSubmit']
        | UserAvatarAction['setIsSubmitting']
        | UserAvatarAction['setIsSuccessful'];

      payload: boolean;
    }
  | {
      type:
        | UserAvatarAction['setSubmitMessage']
        | UserAvatarAction['setSuccessMessage'];
      payload: string;
    };

type UserAvatarReducer = (
  state: UserAvatarState,
  action: UserAvatarDispatch
) => UserAvatarState;

export type {
  UserAvatarAction,
  UserAvatarDispatch,
  UserAvatarReducer,
  UserAvatarState,
};
