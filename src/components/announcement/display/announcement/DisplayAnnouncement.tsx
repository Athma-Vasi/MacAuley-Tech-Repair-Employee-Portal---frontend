import {
  Flex,
  Group,
  Modal,
  Space,
  Stack,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useReducer, useRef } from "react";
import { useErrorBoundary } from "react-error-boundary";
import { useNavigate } from "react-router-dom";

import {
  COLORS_SWATCHES,
  FETCH_REQUEST_TIMEOUT,
} from "../../../../constants/data";
import { authAction } from "../../../../context/authProvider";
import { globalAction } from "../../../../context/globalProvider/actions";
import { useAuth, useGlobalState } from "../../../../hooks";
import {
  fetchRequestPATCHSafe,
  formatDate,
  returnThemeColors,
} from "../../../../utils";
import { AccessibleButton } from "../../../accessibleInputs/AccessibleButton";
import AccessibleImage from "../../../accessibleInputs/AccessibleImage";
import { ResponsivePieChart } from "../../../charts";
import type { PieChartData } from "../../../charts/responsivePieChart/types";
import { Comment } from "../../../comment/Comment";
import { CustomRating } from "../../../customRating/CustomRating";
import { NotificationModal } from "../../../notificationModal";
import { ANNOUNCEMENT_ROUTE_PATHS } from "../../constants";
import type { AnnouncementDocument } from "../../create/types";
import { displayAnnouncementAction } from "./actions";
import { displayAnnouncementReducer } from "./reducers";
import { initialDisplayAnnouncementState } from "./state";
import { updateRatingResponse } from "./utils";

function DisplayAnnouncement() {
  const [displayAnnouncementState, displayAnnouncementDispatch] = useReducer(
    displayAnnouncementReducer,
    initialDisplayAnnouncementState,
  );
  const {
    errorMessage,
    isError,
    isSubmitting,
    isSuccessful,
    rating,
    submitMessage,
    triggerRatingSubmit,
  } = displayAnnouncementState;

  const {
    globalState: {
      width,
      announcementDocument,
      themeObject,
    },
    globalDispatch,
  } = useGlobalState();

  const {
    authState: {
      accessToken,
      userDocument,
      decodedToken: { userInfo: { userId, roles, username } },
    },
    authDispatch,
  } = useAuth();

  const navigateFn = useNavigate();
  const { showBoundary } = useErrorBoundary();

  const [
    openedRatingModal,
    { open: openRatingModal, close: closeRatingModal },
  ] = useDisclosure(false);

  const [
    openedStatisticsModal,
    { open: openStatisticsModal, close: closeStatisticsModal },
  ] = useDisclosure(false);

  const [
    openedSubmitFormModal,
    { open: openSubmitFormModal, close: closeSubmitFormModal },
  ] = useDisclosure(false);

  const [openedErrorModal, { open: openErrorModal, close: closeErrorModal }] =
    useDisclosure(false);

  const fetchAbortControllerRef = useRef<AbortController | null>(null);
  const isComponentMountedRef = useRef(false);

  useEffect(() => {
    fetchAbortControllerRef.current?.abort();
    fetchAbortControllerRef.current = new AbortController();
    const fetchAbortController = fetchAbortControllerRef.current;

    isComponentMountedRef.current = true;
    const isComponentMounted = isComponentMountedRef.current;

    async function handleRatingFormSubmit() {
      if (!announcementDocument) {
        return;
      }

      const updatedAnnouncementDocument = updateRatingResponse(
        announcementDocument,
        rating,
        userId ?? "",
      );

      const body = {
        documentUpdate: {
          fields: updatedAnnouncementDocument,
          updateOperator: "$set",
        },
      };

      try {
        const ratingSubmitResult = await fetchRequestPATCHSafe({
          accessToken,
          authAction,
          authDispatch,
          closeSubmitFormModal,
          fetchAbortController,
          isComponentMounted,
          navigateFn,
          openSubmitFormModal,
          parentDispatch: displayAnnouncementDispatch as React.Dispatch<any>,
          requestBody: JSON.stringify(body),
          roleResourceRoutePaths: ANNOUNCEMENT_ROUTE_PATHS,
          roles,
          setIsSubmittingAction: displayAnnouncementAction.setIsSubmitting,
          setSubmittingMessageAction:
            displayAnnouncementAction.setSubmitMessage,
          submitMessage:
            `Your rating to ${announcementDocument.title} is on its way!`,
          triggerFormSubmitAction:
            displayAnnouncementAction.setTriggerRatingSubmit,
        });

        if (ratingSubmitResult.err) {
          showBoundary(ratingSubmitResult.val.data);
          return;
        }

        const unwrappedResult = ratingSubmitResult.safeUnwrap();

        if (unwrappedResult.kind === "error") {
          displayAnnouncementDispatch({
            action: displayAnnouncementAction.setIsError,
            payload: true,
          });
          displayAnnouncementDispatch({
            action: displayAnnouncementAction.setErrorMessage,
            payload: unwrappedResult.message ?? "Unknown error occurred",
          });

          openErrorModal();
          return;
        }

        const serverResponse = unwrappedResult.data;
        if (serverResponse === undefined) {
          displayAnnouncementDispatch({
            action: displayAnnouncementAction.setIsError,
            payload: true,
          });
          displayAnnouncementDispatch({
            action: displayAnnouncementAction.setErrorMessage,
            payload: "Network error",
          });

          openErrorModal();
          return;
        }

        const newAnnouncementDocument = ratingSubmitResult.val
          .data as AnnouncementDocument | undefined;

        if (newAnnouncementDocument) {
          globalDispatch({
            action: globalAction.setAnnouncementDocument,
            payload: newAnnouncementDocument,
          });
        }

        closeRatingModal();
      } catch (error: unknown) {
        if (!isComponentMounted || fetchAbortController?.signal.aborted) {
          return;
        }
        showBoundary(error);
      }
    }

    if (triggerRatingSubmit) {
      handleRatingFormSubmit();
    }

    const timerId = setTimeout(() => {
      fetchAbortController?.abort("Request timed out");
    }, FETCH_REQUEST_TIMEOUT);

    return () => {
      clearTimeout(timerId);
      fetchAbortController?.abort("Component unmounted");
      isComponentMountedRef.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerRatingSubmit]);

  if (!announcementDocument) {
    return null;
  }

  const {
    appThemeColors: { backgroundColor, borderColor },
  } = returnThemeColors({
    themeObject,
    colorsSwatches: COLORS_SWATCHES,
  });

  const articleTitle = (
    <Title
      order={1}
      size={52}
      style={{
        letterSpacing: "0.1rem",
      }}
    >
      {announcementDocument?.title ?? ""}
    </Title>
  );

  const spacer = <Text size="md">》</Text>;

  const articleAuthor = (
    <Group>
      <Text size="md" style={{ letterSpacing: "0.05rem" }}>
        {announcementDocument?.author?.toUpperCase() ?? ""}
      </Text>
      {spacer}
    </Group>
  );

  const formattedDate = formatDate({
    date: announcementDocument?.createdAt ?? new Date().toISOString(),
    formatOptions: {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      timeZoneName: "short",
    },
    locale: "en-US",
  });

  const articleCreatedAt = (
    <Group>
      <Text size="md">{formattedDate}</Text>
      {spacer}
    </Group>
  );

  const articleTimeToRead = (
    <Group>
      <Text size="md">{announcementDocument?.timeToRead ?? 1} min read</Text>
    </Group>
  );

  const displayArticleInfo = (
    <Group position="left">
      {articleAuthor}
      {articleCreatedAt}
      {articleTimeToRead}
    </Group>
  );

  const articleImage = (
    <AccessibleImage
      attributes={{
        alt: announcementDocument?.bannerImageAlt,
        name: announcementDocument?.bannerImageAlt,
        src: announcementDocument?.bannerImageSrc,
        withPlaceholder: true,
      }}
    />
  );

  /** article paragraphs */
  const articleParagraphs = announcementDocument?.article?.map(
    (paragraph, index) => {
      const firstWordsStartingParagraph = index === 0
        ? paragraph.split(" ").slice(0, 2).join(" ")
        : "";
      const restWordsStartingParagraph = index === 0
        ? paragraph.split(" ").slice(2).join(" ")
        : paragraph;
      const displayLargeFirstWords = (
        <Text
          size={32}
          w="fit-content"
          style={{ float: "left" }}
          key={`${index.toString()}-first-words`}
        >
          <strong>{firstWordsStartingParagraph}</strong>
        </Text>
      );
      const displayFirstParagraph = (
        <>
          {displayLargeFirstWords}
          <Text
            key={`${index.toString()}-rest-words`}
            size="md"
            w="fit-content"
            style={{
              lineHeight: "1.75rem",
            }}
          >
            {restWordsStartingParagraph}
          </Text>
        </>
      );

      const createdParagraph = (
        <Text
          key={index.toString()}
          size="md"
          style={{
            lineHeight: "1.75rem",
          }}
        >
          {index === 0 ? displayFirstParagraph : paragraph}
        </Text>
      );

      return createdParagraph;
    },
  );

  const displayArticleParagraphs = (
    <Flex w="100%" align="center" justify="center">
      <Stack w={width < 480 ? "85%" : "62%"}>
        {articleParagraphs}
      </Stack>
    </Flex>
  );

  const submitRatingButton = (
    <AccessibleButton
      attributes={{
        enabledScreenreaderText: "Submit your rating",
        kind: "submit",
        name: "submit",
        onClick: () => {
          displayAnnouncementDispatch({
            action: displayAnnouncementAction.setTriggerRatingSubmit,
            payload: true,
          });

          closeRatingModal();
        },
      }}
    />
  );

  const rateAnnouncementButton = (
    <AccessibleButton
      attributes={{
        enabledScreenreaderText: "Rate this announcement",
        kind: "rate",
        name: "rate",
        onClick: () => {
          openRatingModal();
        },
      }}
    />
  );

  const viewStatisticsButton = (
    <AccessibleButton
      attributes={{
        enabledScreenreaderText: "View statistics",
        kind: "expand",
        name: "view",
        onClick: () => {
          openStatisticsModal();
        },
      }}
    />
  );

  const ratingComponent = (
    <CustomRating
      question="Tell us how you feel! (It's anonymous)"
      ratingKind="emotion"
      setRatingDispatch={displayAnnouncementDispatch}
    />
  );

  const displayRatingAndSubmit = (
    <Group
      position="right"
      w="100%"
      style={{ border: borderColor, borderRadius: "4px" }}
    >
      <Group position="left">{ratingComponent}</Group>
      <Space w="lg" />
      <Group position="right">
        <Tooltip
          position="left"
          label={rating === 0
            ? "Please rate before submitting"
            : "Submit your rating"}
        >
          <Group>{submitRatingButton}</Group>
        </Tooltip>
      </Group>
    </Group>
  );

  const ratingPieChartDataArray = Object.entries(
    announcementDocument.ratingResponse.ratingEmotion,
  ).map(
    ([key, value]) => {
      const capsKey = `${key.charAt(0).toUpperCase()}${key.slice(1)}`;
      const pieChartData: PieChartData = {
        id: capsKey,
        label: capsKey,
        value,
      };

      return pieChartData;
    },
  );

  const showStatisticsCard = (
    <Stack w="100%">
      <Group position="right">
        <Text size="md">
          {announcementDocument?.ratingResponse?.ratingCount ?? 0}{" "}
          people have rated this
        </Text>
      </Group>
      <ResponsivePieChart
        pieChartData={ratingPieChartDataArray}
        unitKind="number"
      />
    </Stack>
  );

  const ratingModalSize =
    announcementDocument?.ratedUserIds?.includes(userId ?? "")
      ? "calc(100% - 2rem)"
      : width < 480
      ? "calc(100% - 3rem)"
      : "640px";
  const ratingModalTitle = (
    <Title order={4}>{announcementDocument?.title ?? ""}</Title>
  );
  const displayRatingModal = (
    <Modal
      opened={openedRatingModal}
      onClose={closeRatingModal}
      centered
      size={ratingModalSize}
      title={ratingModalTitle}
    >
      {displayRatingAndSubmit}
    </Modal>
  );

  const statisticsModalTitle = (
    <Title order={4}>
      MacAuley family responses to {announcementDocument?.title ?? ""}
    </Title>
  );
  const displayStatisticsModal = (
    <Modal
      opened={openedStatisticsModal}
      onClose={closeStatisticsModal}
      centered
      size="calc(100% - 3rem)"
      title={statisticsModalTitle}
    >
      {showStatisticsCard}
    </Modal>
  );

  /** reader response */
  const displayReaderResponseIcons = (
    <Group w="100%" position="center">
      <Group
        w={width < 480 ? "85%" : "62%"}
        position="left"
      >
        <Text size="md">
          {announcementDocument?.ratedUserIds?.includes(userId ?? "")
            ? "View reactions of MacAuley family members!"
            : "How do you feel about this?"}
        </Text>
        {/* rating icon */}
        <Tooltip
          label={announcementDocument?.ratedUserIds?.includes(userId ?? "")
            ? "View statistics"
            : "Rate to view reactions of MacAuley family members"}
        >
          <Group>
            {announcementDocument?.ratedUserIds?.includes(userId ?? "")
              ? viewStatisticsButton
              : rateAnnouncementButton}
          </Group>
        </Tooltip>
        {/* spacer */}
        <Space w="xs" />
      </Group>
    </Group>
  );

  const displayComments = announcementDocument
    ? (
      <Comment
        // parentResourceId={announcementDocument?._id ?? ""}
        // parentResourceTitle={announcementDocument?.title ?? ""}
      />
    )
    : null;

  const displaySubmitSuccessNotificationModal = (
    <NotificationModal
      onCloseCallbacks={[
        closeSubmitFormModal,
        () => {
          navigateFn(
            `/home/actions/announcementDocument/display/${announcementDocument?.title}`,
          );
        },
      ]}
      opened={openedSubmitFormModal}
      notificationProps={{
        isLoading: isSubmitting,
        text: isSubmitting ? submitMessage : "Success!",
      }}
      title={
        <Title order={4}>{isSuccessful ? "Success!" : "Submitting ..."}</Title>
      }
    />
  );

  const displayAnnouncementComponent = (
    <Flex direction="column" w="100%" bg={backgroundColor}>
      {displaySubmitSuccessNotificationModal}
      {displayRatingModal}
      {displayStatisticsModal}
      {articleTitle}
      {displayArticleInfo}
      {articleImage}
      {displayArticleParagraphs}
      {displayReaderResponseIcons}
      {displayComments}
    </Flex>
  );

  return displayAnnouncementComponent;
}

export default DisplayAnnouncement;
