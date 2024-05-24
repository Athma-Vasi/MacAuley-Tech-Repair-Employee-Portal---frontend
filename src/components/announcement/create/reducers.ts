import { SetPageInErrorPayload } from "../../../types";
import { AnnouncementAction, announcementAction } from "./actions";
import { AnnouncementDispatch, AnnouncementState, ParagraphPayload } from "./types";

function announcementReducer(
  state: AnnouncementState,
  dispatch: AnnouncementDispatch
): AnnouncementState {
  const reducer = announcementReducers.get(dispatch.action);
  return reducer ? reducer(state, dispatch) : state;
}

const announcementReducers = new Map<
  AnnouncementAction[keyof AnnouncementAction],
  (state: AnnouncementState, dispatch: AnnouncementDispatch) => AnnouncementState
>([
  [announcementAction.addParagraph, announcementReducer_addParagraph],
  [announcementAction.insertParagraph, announcementReducer_insertParagraph],
  [announcementAction.removeParagraph, announcementReducer_removeParagraph],
  [announcementAction.setParagraph, announcementReducer_setParagraph],
  [announcementAction.slideParagraphUp, announcementReducer_slideParagraphUp],
  [announcementAction.slideParagraphDown, announcementReducer_slideParagraphDown],
  [announcementAction.setAuthor, announcementReducer_setAuthor],
  [announcementAction.setBannerImageAlt, announcementReducer_setBannerImageAlt],
  [announcementAction.setBannerImageSrc, announcementReducer_setBannerImageSrc],
  [announcementAction.setIsSubmitting, announcementReducer_setIsSubmitting],
  [announcementAction.setIsSuccessful, announcementReducer_setIsSuccessful],
  [announcementAction.setPageInError, announcementReducer_setPageInError],
  [announcementAction.setTitle, announcementReducer_setTitle],
  [announcementAction.setTriggerFormSubmit, announcementReducer_setTriggerFormSubmit],
]);

function announcementReducer_addParagraph(
  state: AnnouncementState,
  _dispatch: AnnouncementDispatch
): AnnouncementState {
  return {
    ...state,
    article: [...state.article, ""],
  };
}

function announcementReducer_insertParagraph(
  state: AnnouncementState,
  dispatch: AnnouncementDispatch
): AnnouncementState {
  const { index, value } = dispatch.payload as ParagraphPayload;
  const clonedState = structuredClone(state);
  clonedState.article.splice(index, 0, value);

  return clonedState;
}

function announcementReducer_removeParagraph(
  state: AnnouncementState,
  dispatch: AnnouncementDispatch
): AnnouncementState {
  const { index } = dispatch.payload as ParagraphPayload;
  const clonedState = structuredClone(state);
  clonedState.article.splice(index, 1);

  return clonedState;
}

function announcementReducer_setParagraph(
  state: AnnouncementState,
  dispatch: AnnouncementDispatch
): AnnouncementState {
  const { index, value } = dispatch.payload as ParagraphPayload;
  const clonedState = structuredClone(state);
  clonedState.article[index] = value;

  return clonedState;
}

function announcementReducer_slideParagraphUp(
  state: AnnouncementState,
  dispatch: AnnouncementDispatch
): AnnouncementState {
  const { index } = dispatch.payload as ParagraphPayload;
  const clonedState = structuredClone(state);
  const [removed] = clonedState.article.splice(index, 1);
  clonedState.article.splice(index - 1, 0, removed);

  return clonedState;
}

function announcementReducer_slideParagraphDown(
  state: AnnouncementState,
  dispatch: AnnouncementDispatch
): AnnouncementState {
  const { index } = dispatch.payload as ParagraphPayload;
  const clonedState = structuredClone(state);
  const [removed] = clonedState.article.splice(index, 1);
  clonedState.article.splice(index + 1, 0, removed);

  return clonedState;
}

function announcementReducer_setAuthor(
  state: AnnouncementState,
  dispatch: AnnouncementDispatch
): AnnouncementState {
  return {
    ...state,
    author: dispatch.payload as string,
  };
}

function announcementReducer_setBannerImageAlt(
  state: AnnouncementState,
  dispatch: AnnouncementDispatch
): AnnouncementState {
  return {
    ...state,
    bannerImageAlt: dispatch.payload as string,
  };
}

function announcementReducer_setBannerImageSrc(
  state: AnnouncementState,
  dispatch: AnnouncementDispatch
): AnnouncementState {
  return {
    ...state,
    bannerImageSrc: dispatch.payload as string,
  };
}

function announcementReducer_setIsSubmitting(
  state: AnnouncementState,
  dispatch: AnnouncementDispatch
): AnnouncementState {
  return {
    ...state,
    isSubmitting: dispatch.payload as boolean,
  };
}

function announcementReducer_setIsSuccessful(
  state: AnnouncementState,
  dispatch: AnnouncementDispatch
): AnnouncementState {
  return {
    ...state,
    isSuccessful: dispatch.payload as boolean,
  };
}

function announcementReducer_setPageInError(
  state: AnnouncementState,
  dispatch: AnnouncementDispatch
): AnnouncementState {
  const { kind, page } = dispatch.payload as SetPageInErrorPayload;
  const pagesInError = new Set(state.pagesInError);
  kind === "add" ? pagesInError.add(page) : pagesInError.delete(page);

  return {
    ...state,
    pagesInError,
  };
}

function announcementReducer_setTitle(
  state: AnnouncementState,
  dispatch: AnnouncementDispatch
): AnnouncementState {
  return {
    ...state,
    title: dispatch.payload as string,
  };
}

function announcementReducer_setTriggerFormSubmit(
  state: AnnouncementState,
  dispatch: AnnouncementDispatch
): AnnouncementState {
  return {
    ...state,
    triggerFormSubmit: dispatch.payload as boolean,
  };
}

export { announcementReducer };
