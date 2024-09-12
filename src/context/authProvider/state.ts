import type { DecodedToken } from "../../types";
import type { AuthState } from "./types";

const initialAuthState: AuthState = {
  accessToken: "",
  decodedToken: {} as DecodedToken,
  userDocument: {},
};

export { initialAuthState };
