import { useEffect, useMemo, useReducer } from 'react';
import {
  FetchDataInput,
  UseFetchMethods,
  UseFetchProps,
  UseFetchRoleFlags,
  UseFetchState,
} from './types';
import { initialUseFetchState, useFetchReducer } from './state';
import { useAuth } from '../useAuth';
import { ResourceRoutePaths } from '../../types';
import { url } from 'inspector';

function useFetch({ body, method, initialUrl }: UseFetchProps) {
  const [useFetchState, fetchDispatch] = useReducer(
    useFetchReducer,
    initialUseFetchState
  );
  const {
    data,
    url,
    isLoading,
    loadingMessage,
    isError,
    errorMessage,
    isSubmitting,
    submitMessage,
    isSuccessful,
    successMessage,
  } = useFetchState;

  const {
    authState: { accessToken, roles, userId, username },
  } = useAuth();

  useEffect(() => {
    fetchDispatch({
      type: 'setUrl',
      payload: initialUrl,
    });
  }, [initialUrl]);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const { signal } = controller;

    async function fetchData({
      body = null,
      isMounted,
      method,
      signal,
      url,
    }: FetchDataInput) {
      fetchDispatch({
        type: 'setIsLoading',
        payload: true,
      });

      const request: Request = new Request(url.toString(), {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body,
        signal,
      });

      try {
        const response = await fetch(request);
        const data: {
          message: string;
          pages?: number;
          totalDocuments?: number;
          resourceData: Record<string, any>[];
        } = await response.json();

        if (!response.ok) {
          fetchDispatch({
            type: 'setIsError',
            payload: true,
          });
          fetchDispatch({
            type: 'setErrorMessage',
            payload: data.message,
          });
        }

        if (isMounted) {
          fetchDispatch({
            type: 'setData',
            payload: data.resourceData,
          });
        }
      } catch (error: any) {
        if (isMounted) {
          fetchDispatch({
            type: 'setIsError',
            payload: true,
          });
          fetchDispatch({
            type: 'setErrorMessage',
            payload: error.message,
          });
        }
      } finally {
        if (isMounted) {
          fetchDispatch({
            type: 'setIsLoading',
            payload: false,
          });
        }
      }
    }

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [url, accessToken]);

  return { useFetchState, fetchDispatch };
}

export { useFetch };
