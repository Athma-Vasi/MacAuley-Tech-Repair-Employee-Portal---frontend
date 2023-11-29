import { Button, Center, Group, Stack, Text } from "@mantine/core";
import jwtDecode from "jwt-decode";
import { useEffect, useReducer } from "react";

import { useAuth, useWrapFetch } from "../../hooks";
import { UserRoles } from "../../types";
import { logState, urlBuilder } from "../../utils";
import {
	devTestingAction,
	devTestingReducer,
	initialDevTestingState,
} from "./state";
import {
	returnCustomerFieldsToAdd,
	returnCustomerSchemas,
} from "./customer/customer";
import { REVIEW_DOCUMENTS } from "./productReview/reviewDocuments";
import { USERS_DOCS } from "./constants";
import { CUSTOMER_DOCUMENTS } from "./customer/customerDocuments";
import {
	ACCESSORY_DOCUMENTS,
	ACCESSORY_REVIEWS,
} from "./productCategory/accessory";
import { CASE_DOCUMENTS, CASE_REVIEWS } from "./productCategory/case";
import { CPU_DOCUMENTS, CPU_REVIEWS } from "./productCategory/cpu";
import {
	DESKTOP_COMPUTER_DOCUMENTS,
	DESKTOP_COMPUTER_REVIEWS,
} from "./productCategory/desktopComputer";
import { DISPLAY_DOCUMENTS, DISPLAY_REVIEWS } from "./productCategory/display";
import { GPU_DOCUMENTS, GPU_REVIEWS } from "./productCategory/gpu";
import {
	HEADPHONE_DOCUMENTS,
	HEADPHONE_REVIEWS,
} from "./productCategory/headphone";
import {
	KEYBOARD_DOCUMENTS,
	KEYBOARD_REVIEWS,
} from "./productCategory/keyboard";
import { LAPTOP_DOCUMENTS, LAPTOP_REVIEWS } from "./productCategory/laptop";
import {
	MICROPHONE_DOCUMENTS,
	MICROPHONE_REVIEWS,
} from "./productCategory/microphone";
import {
	MOTHERBOARD_DOCUMENTS,
	MOTHERBOARD_REVIEWS,
} from "./productCategory/motherboard";
import { MOUSE_DOCUMENTS, MOUSE_REVIEWS } from "./productCategory/mouse";
import { PSU_DOCUMENTS, PSU_REVIEWS } from "./productCategory/psu";
import { RAM_DOCUMENTS, RAM_REVIEWS } from "./productCategory/ram";
import {
	SMARTPHONE_DOCUMENTS,
	SMARTPHONE_REVIEWS,
} from "./productCategory/smartphone";
import { SPEAKER_DOCUMENTS, SPEAKER_REVIEWS } from "./productCategory/speaker";
import { STORAGE_DOCUMENTS, STORAGE_REVIEWS } from "./productCategory/storage";
import { TABLET_DOCUMENTS, TABLET_REVIEWS } from "./productCategory/tablet";
import { WEBCAM_DOCUMENTS, WEBCAM_REVIEWS } from "./productCategory/webcam";
import { returnProductReviewSchemas } from "./productReview/review";

function DevTesting() {
	const [devTestingState, devTestingDispatch] = useReducer(
		devTestingReducer,
		initialDevTestingState,
	);
	const {
		triggerPostFormSubmit,
		bodiesArr,
		bodiesArrCount,
		triggerGetRequest,
	} = devTestingState;

	const {
		authState: { accessToken },
	} = useAuth();

	const { wrappedFetch } = useWrapFetch();

	useEffect(() => {
		let isMounted = true;
		const controller = new AbortController();

		async function submitDevTestingForm() {
			const url: URL = urlBuilder({
				path: "customer/dev/add-field",
			});

			const newBodiesArrCount =
				bodiesArr.length - bodiesArrCount > 75
					? bodiesArrCount + 75
					: bodiesArr.length;
			const slicedBodiesArr = bodiesArr.slice(
				bodiesArrCount,
				newBodiesArrCount,
			);
			const { userInfo } = jwtDecode<{
				exp: number;
				iat: number;
				userInfo: { userId: string; username: string; roles: UserRoles };
			}>(accessToken);

			const reqBody = {
				userInfo,
				customerFields: slicedBodiesArr,
			};

			console.log({ slicedBodiesArr });

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
				path: "product-review/dev",
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
		// const bodiesArr = returnCustomerFieldsToAdd(REVIEW_DOCUMENTS);
		// devTestingDispatch({
		// 	type: devTestingAction.setBodiesArr,
		// 	payload: bodiesArr,
		// });
	}, []);

	useEffect(() => {
		const updateOperator = "$set";

		const fields = { quantity: -2, "metrics.orders": 1 };

		const updateString = `{ "${updateOperator}": ${JSON.stringify(fields)} }`;
		const updateObject = JSON.parse(updateString);

		const obj = `{ ${updateOperator}: ${JSON.stringify(fields)} }`;
		console.log("obj", obj);
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
						disabled={
							bodiesArrCount === bodiesArr.length || triggerPostFormSubmit
						}
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
