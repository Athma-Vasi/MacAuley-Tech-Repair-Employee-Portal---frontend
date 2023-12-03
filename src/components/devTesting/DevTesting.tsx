import { Button, Center, Group, Stack, Text } from "@mantine/core";
import jwtDecode from "jwt-decode";
import { useEffect, useReducer } from "react";

import { useAuth, useWrapFetch } from "../../hooks";
import { UserRoles } from "../../types";
import { logState, urlBuilder } from "../../utils";
import { USERS_DOCS } from "./constants";
import {
  returnCustomerSchemas,
  returnUpdateCustomerProductReviewsIdsFields,
} from "./customer/customer";
import { CUSTOMER_DOCUMENTS } from "./customer/customerDocuments";
import {
  ACCESSORY_ARRAYS,
  ACCESSORY_DOCUMENTS,
  ACCESSORY_REVIEWS,
  ACCESSORY_REVIEW_DOCUMENTS,
  returnAccessoryProductReviewSchemas,
  returnAccessorySchemas,
} from "./productCategory/accessory";
import {
  CASE_ARRAY,
  CASE_DOCUMENTS,
  CASE_REVIEWS,
  CASE_REVIEW_DOCUMENTS,
  returnCaseProductReviewSchemas,
  returnCaseSchemas,
} from "./productCategory/case";
import {
  CPU_DOCUMENTS,
  CPU_REVIEW_DOCUMENTS,
  CPU_REVIEWS,
  CPUS_ARRAY,
  returnCpuProductReviewSchemas,
  returnCpuSchemas,
} from "./productCategory/cpu";
import {
  DESKTOP_COMPUTER_DOCUMENTS,
  DESKTOP_COMPUTER_REVIEW_DOCUMENTS,
  DESKTOP_COMPUTER_REVIEWS,
  DESKTOP_COMPUTERS_ARRAY,
  returnDesktopComputerProductReviewSchemas,
  returnDesktopComputerSchemas,
} from "./productCategory/desktopComputer";
import {
  DISPLAY_DOCUMENTS,
  DISPLAY_REVIEW_DOCUMENTS,
  DISPLAY_REVIEWS,
  DISPLAYS_ARRAY,
  returnDisplayProductReviewSchemas,
  returnDisplaySchemas,
} from "./productCategory/display";
import {
  GPU_DOCUMENTS,
  GPU_REVIEW_DOCUMENTS,
  GPU_REVIEWS,
  GPUS_ARRAY,
  returnGpuProductReviewSchemas,
  returnGpuSchemas,
} from "./productCategory/gpu";
import {
  HEADPHONE_DOCUMENTS,
  HEADPHONE_REVIEW_DOCUMENTS,
  HEADPHONE_REVIEWS,
  HEADPHONES_ARRAY,
  returnHeadphoneProductReviewSchemas,
  returnHeadphoneSchemas,
} from "./productCategory/headphone";
import {
  KEYBOARD_DOCUMENTS,
  KEYBOARD_REVIEW_DOCUMENTS,
  KEYBOARD_REVIEWS,
  KEYBOARDS_ARRAY,
  returnKeyboardProductReviewSchemas,
  returnKeyboardSchemas,
} from "./productCategory/keyboard";
import {
  LAPTOPS_ARRAY,
  LAPTOP_DOCUMENTS,
  LAPTOP_REVIEWS,
  LAPTOP_REVIEW_DOCUMENTS,
  returnLaptopProductReviewSchemas,
  returnLaptopSchemas,
} from "./productCategory/laptop";
import {
  MICROPHONES_ARRAY,
  MICROPHONE_DOCUMENTS,
  MICROPHONE_REVIEWS,
  MICROPHONE_REVIEW_DOCUMENTS,
  returnMicrophoneProductReviewSchemas,
  returnMicrophoneSchemas,
} from "./productCategory/microphone";
import {
  MOTHERBOARDS_ARRAY,
  MOTHERBOARD_DOCUMENTS,
  MOTHERBOARD_REVIEWS,
  MOTHERBOARD_REVIEW_DOCUMENTS,
  returnMotherboardProductReviewSchemas,
  returnMotherboardSchemas,
} from "./productCategory/motherboard";
import {
  MOUSE_ARRAY,
  MOUSE_DOCUMENTS,
  MOUSE_REVIEWS,
  MOUSE_REVIEW_DOCUMENTS,
  returnMouseProductReviewSchemas,
  returnMouseSchemas,
} from "./productCategory/mouse";
import {
  PSUS_ARRAY,
  PSU_DOCUMENTS,
  PSU_REVIEWS,
  PSU_REVIEW_DOCUMENTS,
  returnPsuProductReviewSchemas,
  returnPsuSchemas,
} from "./productCategory/psu";
import {
  RAMS_ARRAY,
  RAM_DOCUMENTS,
  RAM_REVIEWS,
  RAM_REVIEW_DOCUMENTS,
  returnRamProductReviewSchemas,
  returnRamSchemas,
} from "./productCategory/ram";
import {
  returnSmartphoneProductReviewSchemas,
  returnSmartphoneSchemas,
  SMARTPHONE_DOCUMENTS,
  SMARTPHONE_REVIEW_DOCUMENTS,
  SMARTPHONE_REVIEWS,
  SMARTPHONES_ARRAY,
} from "./productCategory/smartphone";
import {
  returnSpeakerProductReviewSchemas,
  returnSpeakerSchemas,
  SPEAKER_DOCUMENTS,
  SPEAKER_REVIEW_DOCUMENTS,
  SPEAKER_REVIEWS,
  SPEAKERS_ARRAY,
} from "./productCategory/speaker";
import {
  returnStorageProductReviewSchemas,
  returnStorageSchemas,
  STORAGE_ARRAY,
  STORAGE_DOCUMENTS,
  STORAGE_REVIEW_DOCUMENTS,
  STORAGE_REVIEWS,
} from "./productCategory/storage";
import {
  returnTabletProductReviewSchemas,
  returnTabletSchemas,
  TABLET_DOCUMENTS,
  TABLET_REVIEW_DOCUMENTS,
  TABLET_REVIEWS,
  TABLETS_ARRAY,
} from "./productCategory/tablet";
import {
  returnWebcamProductReviewSchemas,
  returnWebcamSchemas,
  WEBCAM_DOCUMENTS,
  WEBCAM_REVIEW_DOCUMENTS,
  WEBCAM_REVIEWS,
  WEBCAMS_ARRAY,
} from "./productCategory/webcam";
import { devTestingAction, devTestingReducer, initialDevTestingState } from "./state";
import {
  returnRemoveProductReviewSkuFields,
  returnUpdateProductCategoryRatingsCountFields,
  returnUpdateProductCategoryReviewIdsFields,
} from "./productReview/review";
import {
  returnUpdateProductCategoryCurrencyFields,
  returnUpdateProductCategorySkuFields,
} from "./productCategory/all";
import { PRODUCT_REVIEW_DOCUMENTS } from "./productReview/reviewDocuments";
import { returnPurchaseSchemas } from "./purchase/purchase";
import { RMA_REASONS_POOL, returnRMASchemas } from "./rma/rma";
import { constants } from "buffer";
import { PURCHASE_DOCUMENTS } from "./purchase/purchaseDocuments";

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
        path: "rma/dev",
      });

      const newBodiesArrCount =
        bodiesArr.length - bodiesArrCount > 75 ? bodiesArrCount + 75 : bodiesArr.length;
      const slicedBodiesArr = bodiesArr.slice(bodiesArrCount, newBodiesArrCount);
      const { userInfo } = jwtDecode<{
        exp: number;
        iat: number;
        userInfo: { userId: string; username: string; roles: UserRoles };
      }>(accessToken);

      const reqBody = {
        userInfo,
        rmaSchemas: slicedBodiesArr,
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

        devTestingDispatch({
          type: devTestingAction.setBodiesArrCount,
          payload: newBodiesArrCount,
        });

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

  useEffect(() => {
    // const productCategoryDocuments = [
    //   ...ACCESSORY_DOCUMENTS,
    //   ...CASE_DOCUMENTS,
    //   ...CPU_DOCUMENTS,
    //   ...DESKTOP_COMPUTER_DOCUMENTS,
    //   ...DISPLAY_DOCUMENTS,
    //   ...GPU_DOCUMENTS,
    //   ...HEADPHONE_DOCUMENTS,
    //   ...KEYBOARD_DOCUMENTS,
    //   ...LAPTOP_DOCUMENTS,
    //   ...MICROPHONE_DOCUMENTS,
    //   ...MOTHERBOARD_DOCUMENTS,
    //   ...MOUSE_DOCUMENTS,
    //   ...PSU_DOCUMENTS,
    //   ...RAM_DOCUMENTS,
    //   ...SMARTPHONE_DOCUMENTS,
    //   ...SPEAKER_DOCUMENTS,
    //   ...STORAGE_DOCUMENTS,
    //   ...TABLET_DOCUMENTS,
    //   ...WEBCAM_DOCUMENTS,
    // ];

    // const bodiesArr = returnPurchaseSchemas({
    //   customerDocuments: CUSTOMER_DOCUMENTS,
    //   productCategoryDocuments,
    //   productReviewDocuments: PRODUCT_REVIEW_DOCUMENTS,
    // });

    const bodiesArr = returnRMASchemas({
      rmaReasonsPool: RMA_REASONS_POOL,
      purchaseDocuments: PURCHASE_DOCUMENTS,
    });

    devTestingDispatch({
      type: devTestingAction.setBodiesArr,
      payload: bodiesArr,
    });
  }, []);

  useEffect(() => {
    logState({
      state: devTestingState,
      groupLabel: "Dev Testing",
    });
  }, [devTestingState]);

  return (
    <Center w="100%">
      <Stack>
        <Text>POST REQUEST</Text>
        <Group>
          <Button
            disabled={bodiesArrCount === bodiesArr.length || triggerPostFormSubmit}
            onClick={() => {
              devTestingDispatch({
                type: devTestingAction.setTriggerPostFormSubmit,
                payload: true,
              });
            }}
          >
            Trigger POST
          </Button>
        </Group>

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
