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
        displayAnnouncementsAction.setIsLoading,
        displayAnnouncementsReducer_setIsLoading,
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

function displayAnnouncementsReducer_setIsLoading(
    state: DisplayAnnouncementsState,
    dispatch: DisplayAnnouncementsDispatch,
): DisplayAnnouncementsState {
    return {
        ...state,
        isLoading: dispatch.payload as boolean,
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
