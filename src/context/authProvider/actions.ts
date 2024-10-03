type AuthAction = {
    setAccessToken: "setAccessToken";
    setDecodedToken: "setDecodedToken";
    setIsLoggedIn: "setIsLoggedIn";
    setRefreshToken: "setRefreshToken";
    setUserDocument: "setUserDocument";
};

const authAction: AuthAction = {
    setAccessToken: "setAccessToken",
    setDecodedToken: "setDecodedToken",
    setIsLoggedIn: "setIsLoggedIn",
    setRefreshToken: "setRefreshToken",
    setUserDocument: "setUserDocument",
};

export { authAction };
export type { AuthAction };
