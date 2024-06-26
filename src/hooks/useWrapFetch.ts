import jwtDecode from "jwt-decode";
import { useRef } from "react";
import { useErrorBoundary } from "react-error-boundary";
import { useNavigate } from "react-router-dom";

import { DecodedToken } from "../components/login/types";
import { REFRESH_URL } from "../components/portalHeader/constants";
import { authAction } from "../context/authProvider";
import { globalAction } from "../context/globalProvider/state";
import { useAuth } from "./useAuth";
import { useGlobalState } from "./useGlobalState";

/**
 * - inspired by axios interceptors, the wrappedFetch fn will check access token expiration before calling fetch
 * - if the access token is expired, it will attempt to retrieve new access & refresh tokens and call fetch with the new access token
 * - else it will call fetch with the unexpired access token
 */
function useWrapFetch() {
  const {
    authState: { accessToken, sessionId },
    authDispatch,
  } = useAuth();

  const { globalDispatch } = useGlobalState();

  const navigate = useNavigate();
  const { showBoundary } = useErrorBoundary();

  const decodedToken = jwtDecode<DecodedToken>(accessToken);
  // check if access token is expired with buffer of 5 seconds
  const isAccessTokenExpired = decodedToken.exp * 1000 < Date.now() + 5000;

  // prevents race conditions
  const abortControllerRefTokenRequest = useRef<AbortController | null>(null);

  async function wrappedFetch({
    isMounted,
    requestInit,
    signal,
    url,
  }: {
    isMounted: boolean;
    requestInit: RequestInit;
    signal?: AbortSignal;
    url: URL | string;
  }): Promise<Response> {
    try {
      let newAccessToken = "";
      if (isAccessTokenExpired) {
        newAccessToken = (await fetchAccessAndRefreshTokens(isMounted)) ?? "";
      }

      const requestInitWithNewAccessToken: RequestInit = {
        ...requestInit,
        headers: {
          ...requestInit.headers,
          Authorization: `Bearer ${newAccessToken || accessToken}`,
        },
        signal,
      };

      const request = new Request(url.toString(), {
        ...requestInitWithNewAccessToken,
        signal,
      });
      const response = fetch(request);
      return response;
    } catch (error: any) {
      throw new Error(error.message, { cause: "Error in wrappedFetch" });
    }
  }

  async function fetchAccessAndRefreshTokens(
    isMounted: boolean
  ): Promise<string | undefined> {
    // before fetching access & refresh tokens, abort any previous requests
    abortControllerRefTokenRequest.current?.abort();
    // create new abort controller for current request
    abortControllerRefTokenRequest.current = new AbortController();

    const refreshUrl: URL = new URL(REFRESH_URL);

    const tokensRequest: Request = new Request(refreshUrl.toString(), {
      body: JSON.stringify({ sessionId }),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      method: "POST",
      mode: "cors",
      signal: abortControllerRefTokenRequest.current.signal,
    });

    try {
      const tokensResponse: Response = await fetch(tokensRequest);
      const data: { message?: string; accessToken?: string } =
        await tokensResponse.json();

      if (!isMounted) {
        return;
      }
      const { status } = tokensResponse;
      if (status !== 200) {
        throw new Error("Your session has expired. Please log in again.");
      }

      const { accessToken: newAccessToken } = data;
      if (!newAccessToken) {
        throw new Error("Error refreshing tokens");
      }

      authDispatch({
        type: authAction.setAccessToken,
        payload: newAccessToken,
      });
      authDispatch({
        type: authAction.setIsLoggedIn,
        payload: true,
      });

      return newAccessToken;
    } catch (error: any) {
      if (!isMounted || error.name === "AbortError") {
        return;
      }

      globalDispatch({
        type: globalAction.setErrorState,
        payload: {
          isError: true,
          errorMessage: error?.message,
          errorCallback: () => {
            globalDispatch({
              type: globalAction.setErrorState,
              payload: {
                isError: false,
                errorMessage: "",
                errorCallback: () => {},
              },
            });

            navigate("/");
          },
        },
      });

      showBoundary(error);
    }
  }

  return { wrappedFetch };
}

export { useWrapFetch };
