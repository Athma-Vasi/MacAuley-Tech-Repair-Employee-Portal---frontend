import { Button, Center, Group, Stack, Text } from "@mantine/core";
import { constants } from "buffer";
import jwtDecode from "jwt-decode";
import { useEffect, useReducer } from "react";
import { RiContactsBookLine } from "react-icons/ri";

import { useAuth, useWrapFetch } from "../../hooks";
import { UserRoles } from "../../types";
import { logState, urlBuilder } from "../../utils";
import {
  DAYS_PER_MONTH,
  MONTHS,
  PRODUCT_CATEGORIES,
  REPAIR_CATEGORIES,
} from "../dashboard/constants";
import { createRandomBusinessMetrics } from "../dashboard/utils";
import { STORE_LOCATION_DATA } from "../register/constants";
import {
  BUSINESS_METRICS_TEMPLATE,
  FINANCIAL_METRICS_DAILY_TEMPLATE,
  FINANCIAL_METRICS_MONTHLY_TEMPLATE,
  FINANCIAL_METRICS_YEARLY_TEMPLATE,
  YEAR_ONLINE_TRANSACTIONS_SPREAD,
  YEAR_UNITS_SOLD_SPREAD,
} from "./constantsDashboard";
import { devTestingAction, devTestingReducer, initialDevTestingState } from "./state";

function DevTesting() {
  const [devTestingState, devTestingDispatch] = useReducer(
    devTestingReducer,
    initialDevTestingState
  );
  const { triggerPostFormSubmit, bodiesArr, bodiesArrCount, triggerGetRequest } =
    devTestingState;

  const {
    authState: { accessToken },
  } = useAuth();

  const { wrappedFetch } = useWrapFetch();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    async function submitDevTestingForm() {
      const url: URL = urlBuilder({
        path: "username-email-set",
      });

      // const newBodiesArrCount =
      //   bodiesArr.length - bodiesArrCount > 75 ? bodiesArrCount + 75 : bodiesArr.length;
      // const slicedBodiesArr = bodiesArr.slice(bodiesArrCount, newBodiesArrCount);
      const { userInfo } = jwtDecode<{
        exp: number;
        iat: number;
        userInfo: { userId: string; username: string; roles: UserRoles };
      }>(accessToken);

      const reqBody = {
        userInfo,
        username: bodiesArr.username,
        email: bodiesArr.email,
      };

      const requestInit: RequestInit = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqBody),
      };

      try {
        const response: Response = await wrappedFetch({
          isMounted,
          requestInit,
          signal: controller.signal,
          url,
        });
        const data = await response.json();

        if (!isMounted) {
          return;
        }

        if (!response.ok) {
          throw new Error(data.message);
        }

        // devTestingDispatch({
        //   type: devTestingAction.setBodiesArrCount,
        //   payload: newBodiesArrCount,
        // });

        console.log({ data });
      } catch (error: any) {
        console.error(error);
      } finally {
        devTestingDispatch({
          type: devTestingAction.setTriggerPostFormSubmit,
          payload: false,
        });
      }
    }

    if (triggerPostFormSubmit) {
      submitDevTestingForm();
    }

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [triggerPostFormSubmit]);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    async function getAllResourceDocumentsBulk() {
      const url: URL = urlBuilder({
        path: "rma/dev",
      });

      const requestInit: RequestInit = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };

      try {
        const response: Response = await wrappedFetch({
          isMounted,
          requestInit,
          signal: controller.signal,
          url,
        });
        const data: { message: string; resourceData: Record<string, any>[] } =
          await response.json();

        if (!isMounted) {
          return;
        }

        if (!response.ok) {
          throw new Error(data.message);
        }

        devTestingDispatch({
          type: devTestingAction.setResourceDocuments,
          payload: data.resourceData,
        });
      } catch (error: any) {
        console.error(error);
      } finally {
        devTestingDispatch({
          type: devTestingAction.setTriggerPostFormSubmit,
          payload: false,
        });
      }
    }

    if (triggerGetRequest) {
      getAllResourceDocumentsBulk();
    }

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [triggerGetRequest]);

  // useEffect(() => {
  //   logState({
  //     state: devTestingState,
  //     groupLabel: "Dev Testing",
  //   });
  // }, [devTestingState]);

  return (
    <Center w="100%">
      <Stack>
        <Text>POST REQUEST</Text>
        {/* <Group>
          <Button
            // disabled={bodiesArrCount === bodiesArr.length || triggerPostFormSubmit}
            onClick={() => {
              devTestingDispatch({
                type: devTestingAction.setTriggerPostFormSubmit,
                payload: true,
              });
            }}
          >
            Trigger POST
          </Button>
        </Group> */}

        <Text>GET REQUEST</Text>
        <Group>
          <Button
            disabled={triggerGetRequest}
            onClick={() => {
              devTestingDispatch({
                type: devTestingAction.setTriggerGetRequest,
                payload: true,
              });
            }}
          >
            Trigger GET
          </Button>
        </Group>
      </Stack>
    </Center>
  );
}

export default DevTesting;

// useEffect(() => {
//   console.group("Promise Testing Sync useEffect");
//   console.log("Start");
//   const promise1 = () =>
//     new Promise((resolve, reject) => {
//       for (let idx = 0; idx < 3; idx += 1) {
//         console.log("Promise 1 before resolve with index: " + idx);
//       }

//       setTimeout(() => {
//         console.log("Promise 1 timeout");
//       }, 2000);

//       const value1 = () =>
//         new Promise((resolve, reject) => resolve("Promise 1 after resolve with value"));

//       resolve(value1());
//     });

//   console.log("Between Promises");

//   const promise2 = () =>
//     new Promise((resolve, reject) => {
//       for (let idx = 0; idx < 3; idx += 1) {
//         console.log("Promise 2 before resolve with index: " + idx);
//       }

//       setTimeout(() => {
//         console.log("Promise 2 timeout");
//       }, 1000);

//       const value2 = () => {
//         for (let idx = 0; idx < 3; idx += 1) {
//           console.log("Promise 2 after resolve with index: " + idx);
//         }
//       };

//       resolve(value2());
//     });

//   const nonPromise1 = () => {
//     for (let idx = 0; idx < 3; idx += 1) {
//       console.log("Non-promise 1 with index: " + idx);
//     }
//     return "Non-Promise 1";
//   };

//   console.log("Middle");

//   Promise.all([promise1(), promise2(), nonPromise1()]).then((values) => {
//     console.log("Promise.all values", values);
//   });

//   console.log("End");
//   console.groupEnd();

//   async function helper() {
//     console.group("Async Testing Sync useEffect");
//     console.log("Start");
//     const async1 = async () => {
//       for (let idx = 0; idx < 3; idx += 1) {
//         console.log("Async 1 before resolve with index: " + idx);
//       }
//       const value1 = await new Promise((resolve, reject) => {
//         setTimeout(() => {
//           console.log("Async 1 timeout");
//         }, 2000);
//         resolve("Async 1 after resolve");
//       });
//       return value1;
//     };

//     console.log("Between Async");

//     const async2 = async () => {
//       for (let idx = 0; idx < 3; idx += 1) {
//         console.log("Async 2 before resolve with index: " + idx);
//       }
//       const value2 = await new Promise((resolve, reject) => {
//         setTimeout(() => {
//           console.log("Async 2 timeout");
//         }, 1000);
//         resolve("Async 2 after resolve");
//       });
//       return value2;
//     };

//     const nonAsync1 = () => {
//       console.log("Non-Async 1");
//       return "Non-Async 1";
//     };

//     console.log("Middle");

//     const [asyncValue1, asyncValue2, nonAsyncValue1] = await Promise.all([
//       async1(),
//       async2(),
//       nonAsync1(),
//     ]);
//     console.log({ asyncValue1, asyncValue2, nonAsyncValue1 });

//     console.log("End");
//     console.groupEnd();
//   }

//   helper();
// }, []);
