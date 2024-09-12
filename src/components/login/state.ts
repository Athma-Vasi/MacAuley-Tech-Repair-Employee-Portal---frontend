import type { LoginState } from "./types";

const initialLoginState: LoginState = {
  isError: false,
  isLoading: true,
  isSubmitting: false,
  isSuccessful: false,
  password: "",
  triggerFormSubmit: false,
  username: "",
};

export { initialLoginState };
