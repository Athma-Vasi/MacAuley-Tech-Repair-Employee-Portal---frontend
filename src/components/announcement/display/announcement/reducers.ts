import {
    type DisplayAnnouncementAction,
    displayAnnouncementAction,
} from "./actions";
import type {
    DisplayAnnouncementDispatch,
    DisplayAnnouncementState,
} from "./types";

function displayAnnouncementReducer(
    state: DisplayAnnouncementState,
    dispatch: DisplayAnnouncementDispatch,
): DisplayAnnouncementState {
    const reducer = displayAnnouncementReducersMap.get(dispatch.action);
    return reducer ? reducer(state, dispatch) : state;
}

const displayAnnouncementReducersMap = new Map<
    DisplayAnnouncementAction[keyof DisplayAnnouncementAction],
    (
        state: DisplayAnnouncementState,
        dispatch: DisplayAnnouncementDispatch,
    ) => DisplayAnnouncementState
>([
    [
        displayAnnouncementAction.setIsSubmitting,
        displayAnnouncementReducer_setIsSubmitting,
    ],
    [
        displayAnnouncementAction.setIsSuccessful,
        displayAnnouncementReducer_setIsSuccessful,
    ],
    [
        displayAnnouncementAction.setSubmitMessage,
        displayAnnouncementReducer_setSubmitMessage,
    ],
    [
        displayAnnouncementAction.setTriggerRatingSubmit,
        displayAnnouncementReducer_setTriggerRatingSubmit,
    ],
    [displayAnnouncementAction.setRating, displayAnnouncementReducer_setRating],
]);

function displayAnnouncementReducer_setIsSubmitting(
    state: DisplayAnnouncementState,
    dispatch: DisplayAnnouncementDispatch,
): DisplayAnnouncementState {
    return {
        ...state,
        isSubmitting: dispatch.payload as boolean,
    };
}

function displayAnnouncementReducer_setIsSuccessful(
    state: DisplayAnnouncementState,
    dispatch: DisplayAnnouncementDispatch,
): DisplayAnnouncementState {
    return {
        ...state,
        isSuccessful: dispatch.payload as boolean,
    };
}

function displayAnnouncementReducer_setSubmitMessage(
    state: DisplayAnnouncementState,
    dispatch: DisplayAnnouncementDispatch,
): DisplayAnnouncementState {
    return {
        ...state,
        submitMessage: dispatch.payload as string,
    };
}

function displayAnnouncementReducer_setTriggerRatingSubmit(
    state: DisplayAnnouncementState,
    dispatch: DisplayAnnouncementDispatch,
): DisplayAnnouncementState {
    return {
        ...state,
        triggerRatingSubmit: dispatch.payload as boolean,
    };
}

function displayAnnouncementReducer_setRating(
    state: DisplayAnnouncementState,
    dispatch: DisplayAnnouncementDispatch,
): DisplayAnnouncementState {
    return {
        ...state,
        rating: dispatch.payload as number,
    };
}

export { displayAnnouncementReducer };
