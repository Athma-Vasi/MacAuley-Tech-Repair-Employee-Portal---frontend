import { type LoginAction, loginAction } from "./actions";
import type { LoginDispatch, LoginState } from "./types";

function loginReducer(
    state: LoginState,
    dispatch: LoginDispatch,
): LoginState {
    const reducer = loginReducersMap.get(dispatch.action);
    return reducer ? reducer(state, dispatch) : state;
}

const loginReducersMap = new Map<
    LoginAction[keyof LoginAction],
    (state: LoginState, dispatch: LoginDispatch) => LoginState
>([
    [loginAction.setIsError, loginReducer_setIsError],
    [loginAction.setIsLoading, loginReducer_setIsLoading],
    [loginAction.setIsSubmitting, loginReducer_setIsSubmitting],
    [loginAction.setIsSuccessful, loginReducer_setIsSuccessful],
    [loginAction.setPassword, loginReducer_setPassword],
    [loginAction.setTriggerFormSubmit, loginReducer_setTriggerFormSubmit],
]);

function loginReducer_setIsError(
    state: LoginState,
    dispatch: LoginDispatch,
): LoginState {
    return {
        ...state,
        isError: dispatch.payload as boolean,
    };
}

function loginReducer_setIsLoading(
    state: LoginState,
    dispatch: LoginDispatch,
): LoginState {
    return {
        ...state,
        isLoading: dispatch.payload as boolean,
    };
}

function loginReducer_setIsSubmitting(
    state: LoginState,
    dispatch: LoginDispatch,
): LoginState {
    return {
        ...state,
        isSubmitting: dispatch.payload as boolean,
    };
}

function loginReducer_setIsSuccessful(
    state: LoginState,
    dispatch: LoginDispatch,
): LoginState {
    return {
        ...state,
        isSuccessful: dispatch.payload as boolean,
    };
}

function loginReducer_setPassword(
    state: LoginState,
    dispatch: LoginDispatch,
): LoginState {
    return {
        ...state,
        password: dispatch.payload as string,
    };
}

function loginReducer_setTriggerFormSubmit(
    state: LoginState,
    dispatch: LoginDispatch,
): LoginState {
    return {
        ...state,
        triggerFormSubmit: dispatch.payload as boolean,
    };
}

export { loginReducer };
