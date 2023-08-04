import { useEffect, useReducer } from 'react';
import { FetchDataInput, UseFetchProps } from './types';
import { initialUseFetchState, useFetchReducer } from './state';
import { useAuth } from '../useAuth';

function useFetch({ initialUrl, request }: UseFetchProps) {
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
      isMounted,
      request,
      signal,
      url,
    }: FetchDataInput) {
      fetchDispatch({
        type: 'setIsLoading',
        payload: true,
      });

      // const requestwithSignal: Request = new Request(url.toString(), {
      //   method,
      //   headers: {
      //     'Content-Type': 'application/json',
      //     Authorization: `Bearer ${accessToken}`,
      //   },
      //   body,
      //   signal,
      // });

      const requestWithSignal = new Request(url.toString(), {
        ...request,
        signal,
      });

      try {
        const response = await fetch(requestWithSignal);
        const data: {
          message: string;
          pages?: number;
          totalDocuments?: number;
          resourceData: Record<string, any>[];
        } = await response.json();

        if (isMounted) {
          if (response.ok) {
            fetchDispatch({
              type: 'setData',
              payload: data.resourceData,
            });
          }
        } else {
          fetchDispatch({
            type: 'setIsError',
            payload: true,
          });
          fetchDispatch({
            type: 'setErrorMessage',
            payload: data.message,
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
