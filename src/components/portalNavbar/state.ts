import { toggleNavlinksActive } from '../../utils';
import {
  PortalNavbarAction,
  PortalNavbarDispatch,
  PortalNavbarState,
} from './types';

const initialPortalNavbarState: PortalNavbarState = {
  isHomeActive: true,
  isDashboardActive: false,
  isNotesActive: false,

  // company
  isCompanyActive: false,
  isAddressChangeActive: false,
  isBenefitActive: false,
  isExpenseClaimActive: false,
  isLeaveRequestActive: false,
  isRequestResourceActive: false,

  // general
  isGeneralActive: false,
  isEndorsementActive: false,
  isPrinterIssueActive: false,
  isAnonymousRequestActive: false,
  isRefermentActive: false,

  // outreach
  isOutreachActive: false,
  isAnnouncementActive: false,
  isSurveyActive: false,
  isEventActive: false,

  isDirectoryActive: false,
};

const portalNavbarAction: PortalNavbarAction = {
  setIsHomeActive: 'setIsHomeActive',
  setIsDashboardActive: 'setIsDashboardActive',
  setIsNotesActive: 'setIsNotesActive',

  // company
  setIsCompanyActive: 'setIsCompanyActive',
  setIsAddressChangeActive: 'setIsAddressChangeActive',
  setIsBenefitActive: 'setIsBenefitActive',
  setIsExpenseClaimActive: 'setIsExpenseClaimActive',
  setIsLeaveRequestActive: 'setIsLeaveRequestActive',
  setIsRequestResourceActive: 'setIsRequestResourceActive',

  // general
  setIsGeneralActive: 'setIsGeneralActive',
  setIsEndorsementActive: 'setIsEndorsementActive',
  setIsPrinterIssueActive: 'setIsPrinterIssueActive',
  setIsAnonymousRequestActive: 'setIsAnonymousRequestActive',
  setIsRefermentActive: 'setIsRefermentActive',

  // outreach
  setIsOutreachActive: 'setIsOutreachActive',
  setIsAnnouncementActive: 'setIsAnnouncementActive',
  setIsSurveyActive: 'setIsSurveyActive',
  setIsEventActive: 'setIsEventActive',

  setIsDirectoryActive: 'setIsDirectoryActive',
};

function portalNavbarReducer(
  state: PortalNavbarState,
  action: PortalNavbarDispatch
): PortalNavbarState {
  switch (action.type) {
    case portalNavbarAction.setIsHomeActive: {
      const updatedState = toggleNavlinksActive({
        navlinksState: state,
        payload: action.payload,
        toggledNavlink: 'isHomeActive',
      });

      return updatedState;
    }

    case portalNavbarAction.setIsDashboardActive: {
      const updatedState = toggleNavlinksActive({
        navlinksState: state,
        payload: action.payload,
        toggledNavlink: 'isDashboardActive',
      });

      return updatedState;
    }

    case portalNavbarAction.setIsNotesActive: {
      const updatedState = toggleNavlinksActive({
        navlinksState: state,
        payload: action.payload,
        toggledNavlink: 'isNotesActive',
      });

      return updatedState;
    }

    // company
    case portalNavbarAction.setIsCompanyActive: {
      const updatedState = toggleNavlinksActive({
        navlinksState: state,
        payload: action.payload,
        toggledNavlink: 'isCompanyActive',
      });

      return updatedState;
    }

    case portalNavbarAction.setIsAddressChangeActive: {
      const updatedState = toggleNavlinksActive({
        navlinksState: state,
        payload: action.payload,
        toggledNavlink: 'isAddressChangeActive',
      });

      return updatedState;
    }

    case portalNavbarAction.setIsBenefitActive: {
      const updatedState = toggleNavlinksActive({
        navlinksState: state,
        payload: action.payload,
        toggledNavlink: 'isBenefitActive',
      });

      return updatedState;
    }

    case portalNavbarAction.setIsExpenseClaimActive: {
      const updatedState = toggleNavlinksActive({
        navlinksState: state,
        payload: action.payload,
        toggledNavlink: 'isExpenseClaimActive',
      });

      return updatedState;
    }

    case portalNavbarAction.setIsLeaveRequestActive: {
      const updatedState = toggleNavlinksActive({
        navlinksState: state,
        payload: action.payload,
        toggledNavlink: 'isLeaveRequestActive',
      });

      return updatedState;
    }

    case portalNavbarAction.setIsRequestResourceActive: {
      const updatedState = toggleNavlinksActive({
        navlinksState: state,
        payload: action.payload,
        toggledNavlink: 'isRequestResourceActive',
      });

      return updatedState;
    }

    // general
    case portalNavbarAction.setIsGeneralActive: {
      const updatedState = toggleNavlinksActive({
        navlinksState: state,
        payload: action.payload,
        toggledNavlink: 'isGeneralActive',
      });

      return updatedState;
    }

    case portalNavbarAction.setIsEndorsementActive: {
      const updatedState = toggleNavlinksActive({
        navlinksState: state,
        payload: action.payload,
        toggledNavlink: 'isEndorsementActive',
      });

      return updatedState;
    }

    case portalNavbarAction.setIsPrinterIssueActive: {
      const updatedState = toggleNavlinksActive({
        navlinksState: state,
        payload: action.payload,
        toggledNavlink: 'isPrinterIssueActive',
      });

      return updatedState;
    }

    case portalNavbarAction.setIsAnonymousRequestActive: {
      const updatedState = toggleNavlinksActive({
        navlinksState: state,
        payload: action.payload,
        toggledNavlink: 'isAnonymousRequestActive',
      });

      return updatedState;
    }

    case portalNavbarAction.setIsRefermentActive: {
      const updatedState = toggleNavlinksActive({
        navlinksState: state,
        payload: action.payload,
        toggledNavlink: 'isRefermentActive',
      });

      return updatedState;
    }

    // outreach
    case portalNavbarAction.setIsOutreachActive: {
      const updatedState = toggleNavlinksActive({
        navlinksState: state,
        payload: action.payload,
        toggledNavlink: 'isOutreachActive',
      });

      return updatedState;
    }

    case portalNavbarAction.setIsAnnouncementActive: {
      const updatedState = toggleNavlinksActive({
        navlinksState: state,
        payload: action.payload,
        toggledNavlink: 'isAnnouncementActive',
      });

      return updatedState;
    }

    case portalNavbarAction.setIsSurveyActive: {
      const updatedState = toggleNavlinksActive({
        navlinksState: state,
        payload: action.payload,
        toggledNavlink: 'isSurveyActive',
      });

      return updatedState;
    }

    case portalNavbarAction.setIsEventActive: {
      const updatedState = toggleNavlinksActive({
        navlinksState: state,
        payload: action.payload,
        toggledNavlink: 'isEventActive',
      });

      return updatedState;
    }

    case portalNavbarAction.setIsDirectoryActive: {
      const updatedState = toggleNavlinksActive({
        navlinksState: state,
        payload: action.payload,
        toggledNavlink: 'isDirectoryActive',
      });

      return updatedState;
    }

    default:
      return state;
  }
}

export { initialPortalNavbarState, portalNavbarAction, portalNavbarReducer };
