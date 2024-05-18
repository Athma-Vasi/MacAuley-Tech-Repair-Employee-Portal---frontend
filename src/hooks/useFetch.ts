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
 * - inspired by axios interceptors, the fetchInterceptor fn will check access token expiration before calling fetch
 * - if the access token is expired, it will attempt to retrieve new access & refresh tokens and call fetch with the new access token
 * - else it will call fetch with the unexpired access token
 */
function useFetchInterceptor() {
  const {
    authState: { accessToken, sessionId },
    authDispatch,
  } = useAuth();

  const decodedToken = jwtDecode<DecodedToken>(accessToken);

  const isAccessTokenExpired = decodedToken.exp * 1000 < Date.now() + 5000;

  const fetchRequestAbortController = useRef<AbortController | null>(null);
  const preFetchRequestAbortController = useRef<AbortController | null>(null);

  async function fetchInterceptor({
    isMounted,
    requestInit,
    url,
  }: {
    isMounted: boolean;
    requestInit: RequestInit;
    url: URL | string;
  }): Promise<Response> {
    fetchRequestAbortController.current?.abort();
    fetchRequestAbortController.current = new AbortController();

    try {
      let newAccessToken = "";
      if (isAccessTokenExpired) {
        newAccessToken = (await fetchAccessAndRefreshTokens(isMounted)) ?? "";
      }

      if (!isMounted) {
        return new Response(null, { status: 400 });
      }

      if (!newAccessToken.length) {
        throw new Error("Unable to refresh tokens. Please try again.");
      }

      const requestInitWithNewAccessToken: RequestInit = {
        ...requestInit,
        headers: {
          ...requestInit.headers,
          Authorization: `Bearer ${newAccessToken || accessToken}`,
        },
        signal: fetchRequestAbortController.current.signal,
      };

      const request = new Request(url.toString(), {
        ...requestInitWithNewAccessToken,
        signal: fetchRequestAbortController.current.signal,
      });
      const response = fetch(request);
      return response;
    } catch (error: any) {
      throw new Error(error.message, { cause: "Error in fetchInterceptor" });
    }
  }

  async function fetchAccessAndRefreshTokens(
    isMounted: boolean
  ): Promise<string | undefined> {
    preFetchRequestAbortController.current?.abort();
    preFetchRequestAbortController.current = new AbortController();

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
      signal: preFetchRequestAbortController.current.signal,
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

      throw new Error(error.message, { cause: "Error in fetchAccessAndRefreshTokens" });
    }
  }

  return { fetchInterceptor };
}

export { useFetchInterceptor };
