import {
  Flex,
  Loader,
  LoadingOverlay,
  Stack,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { useEffect, useReducer, useRef } from "react";
import { useErrorBoundary } from "react-error-boundary";
import { useNavigate } from "react-router-dom";

import { useDisclosure } from "@mantine/hooks";
import {
  COLORS_SWATCHES,
  FETCH_REQUEST_TIMEOUT,
} from "../../../../constants/data";
import { authAction } from "../../../../context/authProvider";
import { globalAction } from "../../../../context/globalProvider/actions";
import { useAuth, useGlobalState } from "../../../../hooks";
import { fetchRequestGETSafe, returnThemeColors } from "../../../../utils";
import AccessibleImage from "../../../accessibleInputs/AccessibleImage";
import AccessiblePagination from "../../../accessibleInputs/AccessiblePagination";
import DisplayResourceHeader from "../../../displayResourceHeader/DisplayResourceHeader";
import { NotificationModal } from "../../../notificationModal";
import { ANNOUNCEMENT_ROUTE_PATHS } from "../../constants";
import { displayAnnouncementsAction } from "./actions";
import { displayAnnouncementsReducer } from "./reducers";
import { initialDisplayAnnouncementsState } from "./state";

function DisplayAnnouncements() {
  const [displayAnnouncementsState, displayAnnouncementsDispatch] = useReducer(
    displayAnnouncementsReducer,
    initialDisplayAnnouncementsState,
  );
  const {
    currentPage,
    errorMessage,
    isError,
    isLoading,
    loadingMessage,
    newQueryFlag,
    pages,
    responseData,
    totalDocuments,
  } = displayAnnouncementsState;

  const {
    globalState: { themeObject, width },
    globalDispatch,
  } = useGlobalState();

  const {
    authState: {
      accessToken,
      decodedToken: { sessionId, userInfo: { roles, userId, username } },
    },
    authDispatch,
  } = useAuth();

  const navigateFn = useNavigate();
  const { showBoundary } = useErrorBoundary();

  const [
    openedLoadingModal,
    { open: openLoadingModal, close: closeLoadingModal },
  ] = useDisclosure(false);

  const [openedErrorModal, { open: openErrorModal, close: closeErrorModal }] =
    useDisclosure(false);

  const fetchAbortControllerRef = useRef<AbortController | null>(null);
  const isComponentMountedRef = useRef(false);

  useEffect(() => {
    fetchAbortControllerRef.current?.abort("Previous request cancelled");
    fetchAbortControllerRef.current = new AbortController();
    const fetchAbortController = fetchAbortControllerRef.current;

    isComponentMountedRef.current = true;
    const isComponentMounted = isComponentMountedRef.current;

    async function handleFetchAnnouncementsFormSubmit() {
      const queryString =
        `&page=${currentPage}&newQueryFlag=${newQueryFlag}&totalDocuments=${totalDocuments}`;

      try {
        const fetchAnnouncementsResult = await fetchRequestGETSafe({
          accessToken,
          authAction,
          authDispatch,
          closeSubmitFormModal: closeLoadingModal,
          fetchAbortController,
          isComponentMounted,
          loadingMessage: "Fetching announcements from server...",
          navigateFn,
          openSubmitFormModal: openLoadingModal,
          parentDispatch: displayAnnouncementsDispatch as React.Dispatch<
            unknown
          >,
          queryString,
          roleResourceRoutePaths: ANNOUNCEMENT_ROUTE_PATHS,
          roles,
          setIsLoadingAction: displayAnnouncementsAction.setIsLoading,
          setLoadingMessageAction: displayAnnouncementsAction.setLoadingMessage,
          setResourceDataAction: displayAnnouncementsAction.setResponseData,
          setTotalDocumentsAction: displayAnnouncementsAction.setTotalDocuments,
          setTotalPagesAction: displayAnnouncementsAction.setPages,
        });

        if (fetchAnnouncementsResult.err) {
          showBoundary(fetchAnnouncementsResult.val.data);
          return;
        }

        const unwrappedResult = fetchAnnouncementsResult.safeUnwrap();

        if (unwrappedResult.kind === "error") {
          displayAnnouncementsDispatch({
            action: displayAnnouncementsAction.setIsError,
            payload: true,
          });
          displayAnnouncementsDispatch({
            action: displayAnnouncementsAction.setErrorMessage,
            payload: unwrappedResult.message ?? "Unknown error occurred",
          });

          openErrorModal();
          return;
        }

        const serverResponse = unwrappedResult.data;
        if (serverResponse === undefined) {
          displayAnnouncementsDispatch({
            action: displayAnnouncementsAction.setIsError,
            payload: true,
          });
          displayAnnouncementsDispatch({
            action: displayAnnouncementsAction.setErrorMessage,
            payload: "Network error",
          });

          openErrorModal();
          return;
        }
      } catch (error: unknown) {
        if (!isComponentMounted || fetchAbortController.signal.aborted) {
          return;
        }
        showBoundary(error);
      }
    }

    handleFetchAnnouncementsFormSubmit();

    const timerId = setTimeout(() => {
      fetchAbortController?.abort("Request timed out");
    }, FETCH_REQUEST_TIMEOUT);

    return () => {
      clearTimeout(timerId);
      fetchAbortController?.abort("Component unmounted");
      isComponentMountedRef.current = false;
    };
  }, []);

  if (!responseData) {
    return null;
  }

  const {
    appThemeColors: { backgroundColor, borderColor },
  } = returnThemeColors({
    themeObject,
    colorsSwatches: COLORS_SWATCHES,
  });

  const createdAnnouncementsCards = responseData.map(
    (announcement, announcementIdx) => {
      const { _id, bannerImageAlt, title, bannerImageSrcCompressed } =
        announcement;

      const imageElement = (
        <AccessibleImage
          attributes={{
            alt: bannerImageAlt,
            name: title,
            src: bannerImageSrcCompressed,
            isOverlay: true,
            overlayText: title,
          }}
          key={`${_id}-${announcementIdx.toString()}`}
        />
      );

      // required to avoid breadcrumbs showing '%20' instead of spaces
      const dynamicPath = title ? title.replace(/ /g, "-") : _id;
      const announcementCard = (
        <UnstyledButton
          key={`${_id}-${announcementIdx.toString()}`}
          w={350}
          h={217}
          onClick={() => {
            globalDispatch({
              action: globalAction.setAnnouncementDocument,
              payload: announcement,
            });

            navigateFn(`/home/actions/announcement/${dynamicPath}`, {
              replace: false,
            });
          }}
        >
          {imageElement}
        </UnstyledButton>
      );

      return announcementCard;
    },
  );

  const imageSrc =
    "https://images.pexels.com/photos/3761509/pexels-photo-3761509.jpeg?auto=compress";
  const imageAlt = "Cheerful young woman holding a megaphone";
  const resourceDescription = "Explore MacAuley Company Announcements";
  const resourceTitle = "Announcements";

  const displayAnnouncementHeader = (
    <DisplayResourceHeader
      imageAlt={imageAlt}
      imageSrc={imageSrc}
      resourceDescription={resourceDescription}
      resourceTitle={resourceTitle}
    />
  );

  const displayAnnouncementCards = (
    <Flex
      align="flex-start"
      bg={backgroundColor}
      justify="center"
      w="100%"
      wrap="wrap"
      style={{ borderRadius: "4px", position: "relative" }}
    >
      <LoadingOverlay
        visible={isLoading}
        zIndex={500}
        overlayBlur={3}
        overlayOpacity={1}
        radius={4}
        loader={
          <Stack align="center">
            <Text>Loading announcements: page {currentPage}</Text>
            <Loader />
          </Stack>
        }
      />
      {createdAnnouncementsCards}
    </Flex>
  );

  const sectionWidth = width < 480 // for iPhone 5/SE
    ? 375 - 20
    : width < 768 // for iPhone 6/7/8
    ? width - 40
    // at 768vw the navbar appears at width of 225px
    : width < 1024
    ? (width - 225) * 0.8
    // at >= 1200vw the navbar width is 300px
    : width < 1200
    ? (width - 225) * 0.8
    : 900 - 40;

  const pagination = (
    <AccessiblePagination
      attributes={{
        name: "announcements",
        parentDispatch: displayAnnouncementsDispatch,
        setPageNumber: displayAnnouncementsAction.setCurrentPage,
        total: pages,
        value: currentPage,
      }}
    />
  );

  // const displayQueryBuilder = (
  //   <Group w="100%" bg={backgroundColor} position="center">
  //     <QueryBuilder
  //       collectionName="announcement"
  //       componentQueryData={ANNOUNCEMENT_QUERY_DATA}
  //       queryBuilderStringDispatch={displayAnnouncementsDispatch}
  //       setQueryBuilderString={displayAnnouncementsAction.setQueryBuilderString}
  //       disableProjection={true}
  //     />
  //   </Group>
  // );

  const errorNotificationModal = (
    <NotificationModal
      onCloseCallbacks={[closeErrorModal]}
      opened={openedErrorModal}
      notificationProps={{ isLoading: isError, text: errorMessage }}
    />
  );

  const displayAnnouncementsComponent = (
    <Stack w="100%" align="center">
      {errorNotificationModal}
      {displayAnnouncementHeader}
      {/* {displayQueryBuilder} */}
      {displayAnnouncementCards}
      {pagination}
    </Stack>
  );

  return displayAnnouncementsComponent;
}

export default DisplayAnnouncements;
