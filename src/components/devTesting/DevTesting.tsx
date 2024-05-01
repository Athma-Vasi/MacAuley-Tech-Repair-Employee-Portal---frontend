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
import { createRandomBusinessMetrics } from "../dashboard/utils";
import { returnRepairMetricsCharts2 } from "../dashboard/repairDashboard/utilsTemp";
import { returnSelectedDateRepairMetrics } from "../dashboard/repairDashboard/utils";

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
    async function helper() {
      const businessMetrics = await createRandomBusinessMetrics({
        daysPerMonth: DAYS_PER_MONTH,
        months: MONTHS,
        productCategories: PRODUCT_CATEGORIES,
        repairCategories: REPAIR_CATEGORIES,
        storeLocations: STORE_LOCATION_DATA,
      });

      const selectedDateRepairMetrics = returnSelectedDateRepairMetrics({
        businessMetrics,
        day: "01",
        month: "January",
        months: MONTHS,
        selectedRepairCategory: REPAIR_CATEGORIES[0],
        storeLocation: STORE_LOCATION_DATA[0],
        year: "2021",
      });

      const repairMetricsCharts = await returnRepairMetricsCharts2({
        businessMetrics,
        months: MONTHS,
        selectedDateRepairMetrics,
        selectedRepairCategory: REPAIR_CATEGORIES[0],
        storeLocation: STORE_LOCATION_DATA[0],
      });

      console.log("repairMetricsCharts", repairMetricsCharts);
    }

    helper();
  }, []);

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

/**
 * const productCategoryDocuments = [
      ...ACCESSORY_DOCUMENTS,
      ...CASE_DOCUMENTS,
      ...CPU_DOCUMENTS,
      ...DESKTOP_COMPUTER_DOCUMENTS,
      ...DISPLAY_DOCUMENTS,
      ...GPU_DOCUMENTS,
      ...HEADPHONE_DOCUMENTS,
      ...KEYBOARD_DOCUMENTS,
      ...LAPTOP_DOCUMENTS,
      ...MICROPHONE_DOCUMENTS,
      ...MOTHERBOARD_DOCUMENTS,
      ...MOUSE_DOCUMENTS,
      ...PSU_DOCUMENTS,
      ...RAM_DOCUMENTS,
      ...SMARTPHONE_DOCUMENTS,
      ...SPEAKER_DOCUMENTS,
      ...STORAGE_DOCUMENTS,
      ...TABLET_DOCUMENTS,
      ...WEBCAM_DOCUMENTS,
    ];
 */
