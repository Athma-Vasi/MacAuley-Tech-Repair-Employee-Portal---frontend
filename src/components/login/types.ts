import type { LoginAction } from "./actions";

type LoginState = {
  isError: boolean;
  isLoading: boolean;
  isSubmitting: boolean;
  isSuccessful: boolean;
  password: string;
  triggerFormSubmit: boolean;
  username: string;
};

type LoginDispatch = {
  action: LoginAction["setIsError"];
  payload: boolean;
} | {
  action: LoginAction["setIsLoading"];
  payload: boolean;
} | {
  action: LoginAction["setIsSubmitting"];
  payload: boolean;
} | {
  action: LoginAction["setIsSuccessful"];
  payload: boolean;
} | {
  action: LoginAction["setPassword"];
  payload: string;
} | {
  action: LoginAction["setTriggerFormSubmit"];
  payload: boolean;
} | {
  action: LoginAction["setUsername"];
  payload: string;
};

export type { LoginDispatch, LoginState };
