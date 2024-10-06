import type { ColorScheme } from "../../../context/globalProvider/types";
import type { UserAvatarState } from "./types";

function returnInitialUserAvatarState(
  colorScheme: ColorScheme,
): UserAvatarState {
  return {
    colorSchemeSwitchChecked: colorScheme === "light",
    errorMessage: "",
    isError: false,
    isSubmitting: false,
    isSuccessful: false,
    prefersReducedMotionSwitchChecked: false,
    submittingMessage: "",
    triggerLogoutSubmit: false,
    triggerPrefersReducedMotionFormSubmit: false,
  };
}

export { returnInitialUserAvatarState };
