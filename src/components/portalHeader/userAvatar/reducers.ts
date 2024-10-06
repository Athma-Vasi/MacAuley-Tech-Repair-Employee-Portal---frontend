import { type UserAvatarAction, userAvatarAction } from "./actions";
import type { UserAvatarDispatch, UserAvatarState } from "./types";

function userAvatarReducer(
    state: UserAvatarState,
    dispatch: UserAvatarDispatch,
): UserAvatarState {
    const reducer = userAvatarReducersMap.get(dispatch.action);
    return reducer ? reducer(state, dispatch) : state;
}

const userAvatarReducersMap = new Map<
    UserAvatarAction[keyof UserAvatarAction],
    (state: UserAvatarState, dispatch: UserAvatarDispatch) => UserAvatarState
>([
    [
        userAvatarAction.setColorSchemeSwitchChecked,
        userAvatarReducer_setColorSchemeSwitchChecked,
    ],
    [userAvatarAction.setErrorMessage, userAvatarReducer_setErrorMessage],
    [userAvatarAction.setIsError, userAvatarReducer_setIsError],
    [userAvatarAction.setIsSubmitting, userAvatarReducer_setIsSubmitting],
    [userAvatarAction.setIsSuccessful, userAvatarReducer_setIsSuccessful],
    [
        userAvatarAction.setPrefersReducedMotionSwitchChecked,
        userAvatarReducer_setPrefersReducedMotionSwitchChecked,
    ],
    [
        userAvatarAction.setSubmittingMessage,
        userAvatarReducer_setSubmittingMessage,
    ],
    [
        userAvatarAction.setTriggerLogoutSubmit,
        userAvatarReducer_setTriggerLogoutSubmit,
    ],
    [
        userAvatarAction.triggerPrefersReducedMotionFormSubmit,
        userAvatarReducer_triggerPrefersReducedMotionFormSubmit,
    ],
]);

function userAvatarReducer_setColorSchemeSwitchChecked(
    state: UserAvatarState,
    dispatch: UserAvatarDispatch,
): UserAvatarState {
    return {
        ...state,
        colorSchemeSwitchChecked: dispatch.payload as boolean,
    };
}

function userAvatarReducer_setErrorMessage(
    state: UserAvatarState,
    dispatch: UserAvatarDispatch,
): UserAvatarState {
    return {
        ...state,
        errorMessage: dispatch.payload as string,
    };
}

function userAvatarReducer_setIsError(
    state: UserAvatarState,
    dispatch: UserAvatarDispatch,
): UserAvatarState {
    return {
        ...state,
        isError: dispatch.payload as boolean,
    };
}

function userAvatarReducer_setIsSubmitting(
    state: UserAvatarState,
    dispatch: UserAvatarDispatch,
): UserAvatarState {
    return {
        ...state,
        isSubmitting: dispatch.payload as boolean,
    };
}

function userAvatarReducer_setIsSuccessful(
    state: UserAvatarState,
    dispatch: UserAvatarDispatch,
): UserAvatarState {
    return {
        ...state,
        isSuccessful: dispatch.payload as boolean,
    };
}

function userAvatarReducer_setPrefersReducedMotionSwitchChecked(
    state: UserAvatarState,
    dispatch: UserAvatarDispatch,
): UserAvatarState {
    return {
        ...state,
        prefersReducedMotionSwitchChecked: dispatch.payload as boolean,
    };
}

function userAvatarReducer_setSubmittingMessage(
    state: UserAvatarState,
    dispatch: UserAvatarDispatch,
): UserAvatarState {
    return {
        ...state,
        submittingMessage: dispatch.payload as string,
    };
}

function userAvatarReducer_setTriggerLogoutSubmit(
    state: UserAvatarState,
    dispatch: UserAvatarDispatch,
): UserAvatarState {
    return {
        ...state,
        triggerLogoutSubmit: dispatch.payload as boolean,
    };
}

function userAvatarReducer_triggerPrefersReducedMotionFormSubmit(
    state: UserAvatarState,
    dispatch: UserAvatarDispatch,
): UserAvatarState {
    return {
        ...state,
        triggerPrefersReducedMotionFormSubmit: dispatch.payload as boolean,
    };
}

export { userAvatarReducer };
