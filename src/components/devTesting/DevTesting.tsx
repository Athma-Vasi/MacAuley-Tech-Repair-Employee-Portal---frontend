import { Button, Center, Group, Stack, Text } from "@mantine/core";
import jwtDecode from "jwt-decode";
import { useEffect, useReducer } from "react";

import { useAuth, useWrapFetch } from "../../hooks";
import { UserRoles } from "../../types";
import { logState, urlBuilder } from "../../utils";
import { USERS_DOCS } from "./constants";
import { returnCustomerSchemas } from "./customer/customer";
import { devTestingAction, devTestingReducer, initialDevTestingState } from "./state";
import { LAPTOPS_ARRAY, returnLaptopSchemas } from "./productCategory/laptop";
import {
  ACCESSORY_ARRAYS,
  ACCESSORY_DOCUMENTS,
  ACCESSORY_REVIEWS,
  returnAccessoryProductReviews,
  returnAccessorySchemas,
} from "./productCategory/accessory";
import { CPUS_ARRAY, returnCpuSchemas } from "./productCategory/cpu";
import { CASE_ARRAY, returnCaseSchemas } from "./productCategory/case";
import {
  DESKTOP_COMPUTERS_ARRAY,
  returnDesktopComputerSchemas,
} from "./productCategory/desktopComputer";
import { DISPLAYS_ARRAY, returnDisplaySchemas } from "./productCategory/display";
import { GPUS_ARRAY, returnGpuSchemas } from "./productCategory/gpu";
import { HEADPHONES_ARRAY, returnHeadphoneSchemas } from "./productCategory/headphone";
import { KEYBOARDS_ARRAY, returnKeyboardSchemas } from "./productCategory/keyboard";
import { RAMS_ARRAY, returnRamSchemas } from "./productCategory/ram";
import { MICROPHONES_ARRAY, returnMicrophoneSchemas } from "./productCategory/microphone";
import {
  MOTHERBOARDS_ARRAY,
  returnMotherboardSchemas,
} from "./productCategory/motherboard";
import { MOUSE_ARRAY, returnMouseSchemas } from "./productCategory/mouse";
import { PSUS_ARRAY, returnPsuSchemas } from "./productCategory/psu";
import { SMARTPHONES_ARRAY, returnSmartphoneSchemas } from "./productCategory/smartphone";
import { SPEAKERS_ARRAY, returnSpeakerSchemas } from "./productCategory/speaker";
import { STORAGE_ARRAY, returnStorageSchemas } from "./productCategory/storage";
import { TABLETS_ARRAY, returnTabletSchemas } from "./productCategory/tablet";
import { WEBCAMS_ARRAY, returnWebcamSchemas } from "./productCategory/webcam";
import { CUSTOMER_DOCUMENTS } from "./customer/customerDocuments";

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
        path: "product-review/dev",
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
        productReviewSchemas: slicedBodiesArr,
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
        path: "product-category/speaker",
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
    const bodiesArr = returnAccessoryProductReviews({
      accessoryDocuments: ACCESSORY_DOCUMENTS,
      accessoryReviews: ACCESSORY_REVIEWS,
      customerDocuments: CUSTOMER_DOCUMENTS,
    });

    devTestingDispatch({
      type: devTestingAction.setBodiesArr,
      payload: bodiesArr,
    });
  }, []);

  useEffect(() => {
    // const starRatingsCount =
    // 			returnProductCategoryStarRatingsCount({
    // 				productCategory: "Accessory",
    // 				reviewDocuments: REVIEW_DOCUMENTS,
    // 			});
    // 		console.log({ starRatingsCount });
  });

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

        {/* <Text>GET REQUEST</Text>
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
        </Group> */}
      </Stack>
    </Center>
  );
}

export default DevTesting;

/**
 * const bodiesArr = returnProductReviewSchemas({
			accessoryDocuments: ACCESSORY_DOCUMENTS,
			accessoryReviews: ACCESSORY_REVIEWS,
			caseDocuments: CASE_DOCUMENTS,
			caseReviews: CASE_REVIEWS,
			cpuDocuments: CPU_DOCUMENTS,
			cpuReviews: CPU_REVIEWS,
			desktopComputerDocuments: DESKTOP_COMPUTER_DOCUMENTS,
			desktopComputerReviews: DESKTOP_COMPUTER_REVIEWS,
			displayDocuments: DISPLAY_DOCUMENTS,
			displayReviews: DISPLAY_REVIEWS,
			gpuDocuments: GPU_DOCUMENTS,
			gpuReviews: GPU_REVIEWS,
			headphoneDocuments: HEADPHONE_DOCUMENTS,
			headphoneReviews: HEADPHONE_REVIEWS,
			keyboardDocuments: KEYBOARD_DOCUMENTS,
			keyboardReviews: KEYBOARD_REVIEWS,
			laptopDocuments: LAPTOP_DOCUMENTS,
			laptopReviews: LAPTOP_REVIEWS,
			microphoneDocuments: MICROPHONE_DOCUMENTS,
			microphoneReviews: MICROPHONE_REVIEWS,
			motherboardDocuments: MOTHERBOARD_DOCUMENTS,
			motherboardReviews: MOTHERBOARD_REVIEWS,
			mouseDocuments: MOUSE_DOCUMENTS,
			mouseReviews: MOUSE_REVIEWS,
			psuDocuments: PSU_DOCUMENTS,
			psuReviews: PSU_REVIEWS,
			ramDocuments: RAM_DOCUMENTS,
			ramReviews: RAM_REVIEWS,
			smartphoneDocuments: SMARTPHONE_DOCUMENTS,
			smartphoneReviews: SMARTPHONE_REVIEWS,
			speakerDocuments: SPEAKER_DOCUMENTS,
			speakerReviews: SPEAKER_REVIEWS,
			storageDocuments: STORAGE_DOCUMENTS,
			storageReviews: STORAGE_REVIEWS,
			tabletDocuments: TABLET_DOCUMENTS,
			tabletReviews: TABLET_REVIEWS,
			webcamDocuments: WEBCAM_DOCUMENTS,
			webcamReviews: WEBCAM_REVIEWS,
			customerDocuments: CUSTOMER_DOCUMENTS,
		});
 */
