import { useEffect, useReducer } from 'react';

import { initialUseFetchState, useFetchAction, useFetchReducer } from './state';
import { FetchDataInput, FetchResponseGeneric } from './types';

function useFetch() {
  const [useFetchState, fetchDispatch] = useReducer(
    useFetchReducer,
    initialUseFetchState
  );
  const { request, triggerFetch } = useFetchState;

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const { signal } = controller;

    if (!request) {
      return;
    }

    async function fetchData({ isMounted, request, signal }: FetchDataInput) {
      request?.method === 'GET'
        ? fetchDispatch({
            type: 'setIsLoading',
            payload: true,
          })
        : fetchDispatch({
            type: 'setIsSubmitting',
            payload: true,
          });

      const requestWithSignal = new Request({
        ...request,
        signal,
      });

      try {
        const response = await fetch(requestWithSignal);
        const data: FetchResponseGeneric = await response.json();

        if (isMounted) {
          if (response.ok) {
            fetchDispatch({
              type: 'setData',
              payload: data,
            });
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
          request.method === 'GET'
            ? fetchDispatch({
                type: 'setIsLoading',
                payload: false,
              })
            : fetchDispatch({
                type: 'setIsSubmitting',
                payload: false,
              });
        }
      }
    }

    if (triggerFetch && request) {
      fetchData({ isMounted, request, signal });
    }

    return () => {
      isMounted = false;
      controller.abort('Fetch aborted.');
    };
  }, [request]);

  return { useFetchState, fetchDispatch, useFetchAction };
}

export { useFetch };
