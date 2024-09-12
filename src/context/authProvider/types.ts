import type { ReactNode } from "react";
import type { DecodedToken } from "../../types";
import type { AuthAction } from "./actions";

type AuthState = {
  accessToken: string;
  decodedToken: DecodedToken;
  userDocument: Record<string, unknown>;
};

type AuthProviderProps = {
  children?: ReactNode;
};

type AuthDispatch =
  | {
    action: AuthAction["setAccessToken"];
    payload: string;
  }
  | {
    action: AuthAction["setDecodedToken"];
    payload: DecodedToken;
  }
  | {
    action: AuthAction["setUserDocument"];
    payload: Record<string, unknown>;
  };

export type { AuthDispatch, AuthProviderProps, AuthState };
