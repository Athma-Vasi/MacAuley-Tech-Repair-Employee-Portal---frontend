import { DynamicSliderInputPayload } from "../AccessibleSliderInput";
import { AccessibleImageInputAction, accessibleImageInputAction } from "./actions";
import { AccessibleImageInputDispatch, AccessibleImageInputState } from "./types";

function accessibleImageInputReducer(
  state: AccessibleImageInputState,
  dispatch: AccessibleImageInputDispatch
): AccessibleImageInputState {
  const reducer = accessibleImageInputReducersMap.get(dispatch.action);
  return reducer ? reducer(state, dispatch) : state;
}

const accessibleImageInputReducersMap = new Map<
  AccessibleImageInputAction[keyof AccessibleImageInputAction],
  (
    state: AccessibleImageInputState,
    dispatch: AccessibleImageInputDispatch
  ) => AccessibleImageInputState
>([
  [
    accessibleImageInputAction.setCurrentImageIndex,
    accessibleImageInputReducer_setCurrentImageIndex,
  ],
  [
    accessibleImageInputAction.addImageToBuffer,
    accessibleImageInputReducer_addImageToBuffer,
  ],
  [
    accessibleImageInputAction.removeImageFromBuffer,
    accessibleImageInputReducer_removeImageFromBuffer,
  ],
  [
    accessibleImageInputAction.resetImageFileBlob,
    accessibleImageInputReducer_resetImageFileBlob,
  ],
  [
    accessibleImageInputAction.setImageFileBlobs,
    accessibleImageInputReducer_setImageFileBlobs,
  ],
  [accessibleImageInputAction.setQualities, accessibleImageInputReducer_setQualities],
  [
    accessibleImageInputAction.setOrientations,
    accessibleImageInputReducer_setOrientations,
  ],
]);

function accessibleImageInputReducer_setCurrentImageIndex(
  state: AccessibleImageInputState,
  dispatch: AccessibleImageInputDispatch
): AccessibleImageInputState {
  return {
    ...state,
    currentImageIndex: dispatch.payload as number,
  };
}

function accessibleImageInputReducer_addImageToBuffer(
  state: AccessibleImageInputState,
  dispatch: AccessibleImageInputDispatch
): AccessibleImageInputState {
  const image = dispatch.payload as File | null;

  if (!image) {
    return state;
  }

  const imagesBuffer = structuredClone(state.imagesBuffer);
  imagesBuffer.push(image);
  const imageFileBlobs = structuredClone(state.imageFileBlobs);
  imageFileBlobs.push(image);

  return {
    ...state,
    imagesBuffer,
    imageFileBlobs,
  };
}

function accessibleImageInputReducer_removeImageFromBuffer(
  state: AccessibleImageInputState,
  dispatch: AccessibleImageInputDispatch
): AccessibleImageInputState {
  const index = dispatch.payload as number;
  const imagesBuffer = structuredClone(state.imagesBuffer);
  imagesBuffer.splice(index, 1);
  const imageFileBlobs = structuredClone(state.imageFileBlobs);
  imageFileBlobs.splice(index, 1);

  return {
    ...state,
    imagesBuffer,
    imageFileBlobs,
  };
}

function accessibleImageInputReducer_resetImageFileBlob(
  state: AccessibleImageInputState,
  dispatch: AccessibleImageInputDispatch
): AccessibleImageInputState {
  const index = dispatch.payload as number;
  const clonedImage = structuredClone(state.imagesBuffer[index]);
  const imageFileBlobs = structuredClone(state.imageFileBlobs);
  imageFileBlobs[index] = clonedImage;

  const qualities = state.qualities.slice();
  qualities[index] = 10;
  const orientations = state.orientations.slice();
  orientations[index] = 1;

  return {
    ...state,
    imageFileBlobs,
    qualities,
    orientations,
  };
}

function accessibleImageInputReducer_setImageFileBlobs(
  state: AccessibleImageInputState,
  dispatch: AccessibleImageInputDispatch
): AccessibleImageInputState {
  const { fileBlob, index } = dispatch.payload as {
    index: number;
    fileBlob: File | Blob | null;
  };

  const imageFileBlobs = structuredClone(state.imageFileBlobs);
  imageFileBlobs[index] = fileBlob;

  return {
    ...state,
    imageFileBlobs,
  };
}

function accessibleImageInputReducer_setQualities(
  state: AccessibleImageInputState,
  dispatch: AccessibleImageInputDispatch
): AccessibleImageInputState {
  const { index, value } = dispatch.payload as DynamicSliderInputPayload;
  const clonedState = structuredClone(state);
  const qualities = clonedState.qualities;
  qualities[index] = value;
  clonedState.currentImageIndex = index;

  return clonedState;
}

function accessibleImageInputReducer_setOrientations(
  state: AccessibleImageInputState,
  dispatch: AccessibleImageInputDispatch
): AccessibleImageInputState {
  const { index, value } = dispatch.payload as DynamicSliderInputPayload;
  const clonedState = structuredClone(state);
  const orientations = clonedState.orientations;
  orientations[index] = value;
  clonedState.currentImageIndex = index;

  return clonedState;
}

export { accessibleImageInputReducer };
