import type { DecodedToken } from "../../types";
import type { AuthState } from "./types";

const initialAuthState: AuthState = {
  accessToken: "",
  decodedToken: {} as DecodedToken,
  isLoggedIn: false,
  userDocument: {},
};

export { initialAuthState };
