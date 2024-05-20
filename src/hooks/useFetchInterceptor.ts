import jwtDecode from "jwt-decode";

import { DecodedToken } from "../components/login/types";
import { REFRESH_URL } from "../components/portalHeader/constants";
import { authAction } from "../context/authProvider";
import { useAuth } from "./useAuth";

type FetchInterceptorInput = {
  fetchAbortController: AbortController | null;
  preFetchAbortController: AbortController | null;
  requestInit: RequestInit;
  url: URL | string;
};

type FetchInterceptor = (input: FetchInterceptorInput) => Promise<Response>;

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

  async function fetchInterceptor({
    fetchAbortController,
    preFetchAbortController,
    requestInit,
    url,
  }: {
    fetchAbortController: AbortController | null;
    preFetchAbortController: AbortController | null;
    requestInit: RequestInit;
    url: URL | string;
  }): Promise<Response> {
    try {
      throw new Error("test error inside useFetchInterceptor");

      let newAccessToken = "";
      if (isAccessTokenExpired) {
        newAccessToken =
          (await fetchAccessAndRefreshTokens(preFetchAbortController)) ?? "";
      }

      if (!fetchAbortController || !preFetchAbortController) {
        return new Response(null, {
          status: 400,
          statusText: "Bad Request. Controllers not found",
        });
      }

      if (!newAccessToken) {
        return new Response(null, { status: 401, statusText: "Unauthorized" });
        // return Promise.reject(
        //   new Response(null, { status: 401, statusText: "Unauthorized" })
        // );
      }

      const requestInitWithNewAccessToken: RequestInit = {
        ...requestInit,
        headers: {
          ...requestInit.headers,
          Authorization: `Bearer ${newAccessToken || accessToken}`,
        },
        signal: fetchAbortController?.signal,
      };

      const request = new Request(url.toString(), {
        ...requestInitWithNewAccessToken,
      });

      const response = await fetch(request);

      return response;
    } catch (error: any) {
      return new Response(null, { status: 500, statusText: "Internal Server Error" });
    }
  }

  async function fetchAccessAndRefreshTokens(
    preFetchRequestAbortController: AbortController | null
  ): Promise<string | undefined> {
    try {
      if (!preFetchRequestAbortController) {
        return Promise.resolve("");
      }

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
        signal: preFetchRequestAbortController.signal,
      });

      const tokensResponse: Response = await fetch(tokensRequest);
      const data: { message?: string; accessToken?: string } =
        await tokensResponse.json();

      const { status } = tokensResponse;
      if (status !== 200) {
        return Promise.resolve("");
      }

      const { accessToken: newAccessToken } = data;
      if (!newAccessToken) {
        return Promise.resolve("");
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
      return Promise.resolve("");
    }
  }

  return { fetchInterceptor };
}

export { useFetchInterceptor };
export type { FetchInterceptor, FetchInterceptorInput };
