import { toggleNavlinksActive } from '../../../utils';
import { UserAvatarAction, UserAvatarDispatch, UserAvatarState } from './types';

const initialUserAvatarState: UserAvatarState = {
  colorSchemeSwitchChecked: true,
  prefersReducedMotionSwitchChecked: false,
  triggerPrefersReducedMotionFormSubmit: false,

  isAppearanceNavLinkActive: false,
  isProfileNavLinkActive: false,
  isLogoutNavLinkActive: false,

  triggerLogoutSubmit: false,
  isSubmitting: false,
  submitMessage: '',
  isSuccessful: false,
  successMessage: '',
};

const userAvatarAction: UserAvatarAction = {
  setColorSchemeSwitchChecked: 'setColorSchemeSwitchChecked',
  setPrefersReducedMotionSwitchChecked: 'setPrefersReducedMotionSwitchChecked',
  triggerPrefersReducedMotionFormSubmit:
    'triggerPrefersReducedMotionFormSubmit',

  setIsAppearanceNavLinkActive: 'setIsAppearanceNavLinkActive',
  setIsProfileNavLinkActive: 'setIsProfileNavLinkActive',
  setIsLogoutNavLinkActive: 'setIsLogoutNavLinkActive',

  setTriggerLogoutSubmit: 'setTriggerLogoutSubmit',
  setIsSubmitting: 'setIsSubmitting',
  setSubmitMessage: 'setSubmitMessage',
  setIsSuccessful: 'setIsSuccessful',
  setSuccessMessage: 'setSuccessMessage',
};

function userAvatarReducer(
  state: UserAvatarState,
  action: UserAvatarDispatch
): UserAvatarState {
  switch (action.type) {
    case userAvatarAction.setColorSchemeSwitchChecked:
      return {
        ...state,
        colorSchemeSwitchChecked: action.payload,
      };
    case userAvatarAction.setPrefersReducedMotionSwitchChecked:
      return {
        ...state,
        prefersReducedMotionSwitchChecked: action.payload,
      };
    case userAvatarAction.triggerPrefersReducedMotionFormSubmit:
      return {
        ...state,
        triggerPrefersReducedMotionFormSubmit: action.payload,
      };

    case userAvatarAction.setIsAppearanceNavLinkActive: {
      const updatedState = toggleNavlinksActive({
        navlinksState: state,
        payload: action.payload,
        toggledNavlink: 'isAppearanceNavLinkActive',
      });

      return updatedState;
    }

    case userAvatarAction.setIsProfileNavLinkActive: {
      const updatedState = toggleNavlinksActive({
        navlinksState: state,
        payload: action.payload,
        toggledNavlink: 'isProfileNavLinkActive',
      });

      return updatedState;
    }
    case userAvatarAction.setIsLogoutNavLinkActive: {
      const updatedState = toggleNavlinksActive({
        navlinksState: state,
        payload: action.payload,
        toggledNavlink: 'isLogoutNavLinkActive',
      });

      return updatedState;
    }
    case userAvatarAction.setTriggerLogoutSubmit:
      return {
        ...state,
        triggerLogoutSubmit: action.payload,
      };
    case userAvatarAction.setIsSubmitting:
      return {
        ...state,
        isSubmitting: action.payload,
      };
    case userAvatarAction.setSubmitMessage:
      return {
        ...state,
        submitMessage: action.payload,
      };
    case userAvatarAction.setIsSuccessful:
      return {
        ...state,
        isSuccessful: action.payload,
      };
    case userAvatarAction.setSuccessMessage:
      return {
        ...state,
        successMessage: action.payload,
      };
    default:
      return state;
  }
}

export { initialUserAvatarState, userAvatarAction, userAvatarReducer };
