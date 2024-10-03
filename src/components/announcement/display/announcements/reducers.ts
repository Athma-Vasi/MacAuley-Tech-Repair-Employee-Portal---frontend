import type { AnnouncementDocument } from "../../create/types";
import {
    type DisplayAnnouncementsAction,
    displayAnnouncementsAction,
} from "./actions";
import type {
    DisplayAnnouncementsDispatch,
    DisplayAnnouncementsState,
} from "./types";

function displayAnnouncementsReducer(
    state: DisplayAnnouncementsState,
    dispatch: DisplayAnnouncementsDispatch,
): DisplayAnnouncementsState {
    const reducer = displayAnnouncementsReducersMap.get(dispatch.action);
    return reducer ? reducer(state, dispatch) : state;
}

const displayAnnouncementsReducersMap = new Map<
    DisplayAnnouncementsAction[keyof DisplayAnnouncementsAction],
    (
        state: DisplayAnnouncementsState,
        dispatch: DisplayAnnouncementsDispatch,
    ) => DisplayAnnouncementsState
>([
    [
        displayAnnouncementsAction.setCurrentPage,
        displayAnnouncementsReducer_setCurrentPage,
    ],
    [
        displayAnnouncementsAction.setErrorMessage,
        displayAnnouncementsReducer_setErrorMessage,
    ],
    [
        displayAnnouncementsAction.setIsError,
        displayAnnouncementsReducer_setIsError,
    ],
    [
        displayAnnouncementsAction.setIsLoading,
        displayAnnouncementsReducer_setIsLoading,
    ],
    [
        displayAnnouncementsAction.setLoadingMessage,
        displayAnnouncementsReducer_setLoadingMessage,
    ],
    [
        displayAnnouncementsAction.setNewQueryFlag,
        displayAnnouncementsReducer_setNewQueryFlag,
    ],
    [displayAnnouncementsAction.setPages, displayAnnouncementsReducer_setPages],
    [
        displayAnnouncementsAction.setResponseData,
        displayAnnouncementsReducer_setResponseData,
    ],
    [
        displayAnnouncementsAction.setTotalDocuments,
        displayAnnouncementsReducer_setTotalDocuments,
    ],
]);

function displayAnnouncementsReducer_setCurrentPage(
    state: DisplayAnnouncementsState,
    dispatch: DisplayAnnouncementsDispatch,
): DisplayAnnouncementsState {
    return {
        ...state,
        currentPage: dispatch.payload as number,
    };
}

function displayAnnouncementsReducer_setErrorMessage(
    state: DisplayAnnouncementsState,
    dispatch: DisplayAnnouncementsDispatch,
): DisplayAnnouncementsState {
    return {
        ...state,
        errorMessage: dispatch.payload as string,
    };
}

function displayAnnouncementsReducer_setIsError(
    state: DisplayAnnouncementsState,
    dispatch: DisplayAnnouncementsDispatch,
): DisplayAnnouncementsState {
    return {
        ...state,
        isError: dispatch.payload as boolean,
    };
}

function displayAnnouncementsReducer_setIsLoading(
    state: DisplayAnnouncementsState,
    dispatch: DisplayAnnouncementsDispatch,
): DisplayAnnouncementsState {
    return {
        ...state,
        isLoading: dispatch.payload as boolean,
    };
}

function displayAnnouncementsReducer_setLoadingMessage(
    state: DisplayAnnouncementsState,
    dispatch: DisplayAnnouncementsDispatch,
): DisplayAnnouncementsState {
    return {
        ...state,
        loadingMessage: dispatch.payload as string,
    };
}

function displayAnnouncementsReducer_setNewQueryFlag(
    state: DisplayAnnouncementsState,
    dispatch: DisplayAnnouncementsDispatch,
): DisplayAnnouncementsState {
    return {
        ...state,
        newQueryFlag: dispatch.payload as boolean,
    };
}

function displayAnnouncementsReducer_setPages(
    state: DisplayAnnouncementsState,
    dispatch: DisplayAnnouncementsDispatch,
): DisplayAnnouncementsState {
    return {
        ...state,
        pages: dispatch.payload as number,
    };
}

function displayAnnouncementsReducer_setResponseData(
    state: DisplayAnnouncementsState,
    dispatch: DisplayAnnouncementsDispatch,
): DisplayAnnouncementsState {
    return {
        ...state,
        responseData: dispatch.payload as Array<AnnouncementDocument>,
    };
}

function displayAnnouncementsReducer_setTotalDocuments(
    state: DisplayAnnouncementsState,
    dispatch: DisplayAnnouncementsDispatch,
): DisplayAnnouncementsState {
    return {
        ...state,
        totalDocuments: dispatch.payload as number,
    };
}

export { displayAnnouncementsReducer };
