import {
  Flex,
  Group,
  Image,
  Modal,
  Space,
  Stack,
  Text,
  Title,
  Tooltip,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { InvalidTokenError } from 'jwt-decode';
import { useEffect, useReducer } from 'react';
import { MdOutlineAddReaction } from 'react-icons/md';
import { TbMoodHappy, TbUpload } from 'react-icons/tb';

import { globalAction } from '../../../../context/globalProvider/state';
import { useAuth, useGlobalState } from '../../../../hooks';
import { returnAccessibleButtonElements } from '../../../../jsxCreators';
import { UserDocument } from '../../../../types';
import { formatDate, logState, urlBuilder } from '../../../../utils';
import { Comment } from '../../../comment';
import { CustomNotification } from '../../../customNotification';
import { CustomRating } from '../../../customRating/CustomRating';
import { ResponsivePieChart } from '../../../displayStatistics/responsivePieChart';
import { AnnouncementDocument, RatingResponse } from '../../create/types';
import {
  displayAnnouncementAction,
  displayAnnouncementReducer,
  initialDisplayAnnouncementState,
} from './state';

function DisplayAnnouncement() {
  /** ------------- begin hooks ------------- */
  const [displayAnnouncementState, displayAnnouncementDispatch] = useReducer(
    displayAnnouncementReducer,
    initialDisplayAnnouncementState
  );
  const {
    announcement,
    rating,
    triggerRatingSubmit,
    ratingPieChartDataArray,

    isError,
    errorMessage,
    isLoading,
    loadingMessage,
    isSuccessful,
    successMessage,
    isSubmitting,
    submitMessage,
  } = displayAnnouncementState;

  const {
    globalState: { padding, rowGap, width, announcementDocument, userDocument },
    globalDispatch,
  } = useGlobalState();
  const {
    authState: { userId, accessToken },
  } = useAuth();

  const [
    openedRatingModal,
    { open: openRatingModal, close: closeRatingModal },
  ] = useDisclosure(false);
  const [
    openedStatisticsModal,
    { open: openStatisticsModal, close: closeStatisticsModal },
  ] = useDisclosure(false);

  /** ------------- end hooks ------------- */

  /** ------------- begin useEffects ------------- */
  // submit rating on trigger
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    async function submitRating() {
      if (!announcement) {
        return;
      }
      displayAnnouncementDispatch({
        type: displayAnnouncementAction.setIsSubmitting,
        payload: true,
      });

      const url: URL = urlBuilder({
        path: `/api/v1/actions/outreach/announcement/${announcement._id}/rating`,
      });

      const body = JSON.stringify({
        announcementFields: {
          ratingResponse: announcement.ratingResponse,
          ratedUserIds: announcement.ratedUserIds,
        },
      });

      const request: Request = new Request(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body,
        signal: controller.signal,
      });

      try {
        const response = await fetch(request);
        const data: {
          message: string;
          resourceData: [
            Omit<AnnouncementDocument, '__v'>,
            Omit<UserDocument, '__v' | 'password'>
          ];
        } = await response.json();

        if (!isMounted) {
          return;
        }

        const { ok } = response;
        if (!ok) {
          displayAnnouncementDispatch({
            type: displayAnnouncementAction.setIsError,
            payload: true,
          });
          displayAnnouncementDispatch({
            type: displayAnnouncementAction.setErrorMessage,
            payload: data.message,
          });
          return;
        }

        const [updatedAnnouncementDocument, updatedUserDocument] =
          data.resourceData;
        globalDispatch({
          type: globalAction.setUserDocument,
          payload: updatedUserDocument,
        });

        displayAnnouncementDispatch({
          type: displayAnnouncementAction.setIsSuccessful,
          payload: true,
        });
        displayAnnouncementDispatch({
          type: displayAnnouncementAction.setSuccessMessage,
          payload: data.message,
        });
      } catch (error: any) {
        if (!isMounted) {
          return;
        }
        if (error.name === 'AbortError') {
          return;
        }

        displayAnnouncementDispatch({
          type: displayAnnouncementAction.setIsError,
          payload: true,
        });

        error instanceof InvalidTokenError
          ? displayAnnouncementDispatch({
              type: displayAnnouncementAction.setErrorMessage,
              payload: 'Invalid token',
            })
          : !error.response
          ? displayAnnouncementDispatch({
              type: displayAnnouncementAction.setErrorMessage,
              payload: 'No response from server',
            })
          : displayAnnouncementDispatch({
              type: displayAnnouncementAction.setErrorMessage,
              payload:
                error.message ?? 'Unknown error occurred. Please try again.',
            });
      } finally {
        displayAnnouncementDispatch({
          type: displayAnnouncementAction.setIsSubmitting,
          payload: false,
        });
        displayAnnouncementDispatch({
          type: displayAnnouncementAction.setTriggerRatingSubmit,
          payload: false,
        });
      }
    }

    if (triggerRatingSubmit) {
      submitRating();
    }

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [triggerRatingSubmit]);

  useEffect(() => {
    if (!announcementDocument) {
      return;
    }

    displayAnnouncementDispatch({
      type: displayAnnouncementAction.setAnnouncement,
      payload: announcementDocument,
    });
    displayAnnouncementDispatch({
      type: displayAnnouncementAction.setIsLoading,
      payload: false,
    });
    displayAnnouncementDispatch({
      type: displayAnnouncementAction.setLoadingMessage,
      payload: '',
    });
  }, [announcementDocument]);

  // set rating response to state
  useEffect(() => {
    if (!announcement) {
      return;
    }
    if (!announcement.ratingResponse) {
      return;
    }

    displayAnnouncementDispatch({
      type: displayAnnouncementAction.setRatingPieChartDataArray,
      payload: announcement.ratingResponse,
    });
  }, [triggerRatingSubmit]);

  useEffect(() => {
    logState({
      state: displayAnnouncementState,
      groupLabel: 'announcement',
    });
  }, [displayAnnouncementState]);
  /** ------------- end useEffects ------------- */

  /** ------------- begin component render bypass ------------- */
  // if (isLoading || isError || isSubmitting || isSuccessful) {
  //   return (
  //     <CustomNotification
  //       errorMessage={errorMessage}
  //       isLoading={isLoading}
  //       isError={isError}
  //       isSubmitting={isSubmitting}
  //       isSuccessful={isSuccessful}
  //       loadingMessage={loadingMessage}
  //       successMessage={successMessage}
  //       submitMessage={submitMessage}
  //       parentDispatch={displayAnnouncementDispatch}
  //       navigateTo={{
  //         errorPath: '/portal',
  //         successPath: `/portal/outreach/announcement/display/${announcement?._id}`,
  //       }}
  //     />
  //   );
  // }
  /** ------------- end component render bypass ------------- */

  /** ------------- begin input creators ------------- */
  const articleTitle = (
    <Title
      order={1}
      color="dark"
      size={52}
      style={{
        letterSpacing: '0.1rem',
      }}
      px={padding}
      pt={padding}
    >
      {announcement?.title ?? ''}
    </Title>
  );

  const spacer = (
    <Text size="md" color="dark">
      》
    </Text>
  );

  const articleAuthor = (
    <>
      <Text size="md" color="dark" style={{ letterSpacing: '0.05rem' }}>
        {announcement?.author?.toUpperCase() ?? ''}
      </Text>
      <Space w="xs" />
      {spacer}
    </>
  );

  const formattedDate = formatDate({
    date: announcement?.createdAt ?? new Date().toISOString(),
    formatOptions: {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      timeZoneName: 'short',
    },
    locale: 'en-US',
  });

  const articleCreatedAt = (
    <>
      <Space w="xs" />
      <Text size="md" color="dark">
        {formattedDate}
      </Text>
      <Space w="xs" />
      {spacer}
    </>
  );

  const articleTimeToRead = (
    <>
      <Space w="xs" />
      <Text size="md" color="dark">
        {announcement?.timeToRead ?? 1} min read
      </Text>
      <Space w="xs" />
    </>
  );

  const displayArticleInfo = (
    <Group position="left" p={padding}>
      {articleAuthor}
      {articleCreatedAt}
      {articleTimeToRead}
    </Group>
  );

  const articleImage = (
    <Image
      src={announcement?.bannerImageSrc ?? ''}
      alt={announcement?.bannerImageAlt ?? ''}
      withPlaceholder
      w="100%"
    />
  );

  /** article paragraphs */
  const articleParagraphs = announcement?.article?.map((paragraph, index) => {
    const firstWordsStartingParagraph =
      index === 0 ? paragraph.split(' ').slice(0, 2).join(' ') : '';
    const restWordsStartingParagraph =
      index === 0 ? paragraph.split(' ').slice(2).join(' ') : paragraph;
    const displayLargeFirstWords = (
      <Text
        size={32}
        color="dark"
        pr={padding}
        w="fit-content"
        style={{ float: 'left' }}
      >
        <strong>{firstWordsStartingParagraph}</strong>
      </Text>
    );
    const displayFirstParagraph = (
      <>
        {displayLargeFirstWords}
        <Text
          key={`${index}`}
          size="md"
          color="dark"
          w="fit-content"
          style={{
            lineHeight: '1.75rem',
          }}
        >
          {restWordsStartingParagraph}
        </Text>
      </>
    );

    const createdParagraph = (
      <Text
        key={`${index}`}
        size="md"
        color="dark"
        style={{
          lineHeight: '1.75rem',
        }}
      >
        {index === 0 ? displayFirstParagraph : paragraph}
      </Text>
    );

    return createdParagraph;
  });

  const displayArticleParagraphs = (
    <Flex w="100%" align="center" justify="center" py={padding}>
      <Stack w={width < 480 ? '85%' : '62%'} px={padding}>
        {articleParagraphs}
      </Stack>
    </Flex>
  );

  /** buttons */
  const [
    createdSubmitRatingButton,
    createdRateAnnouncementButton,
    createdViewStatisticsButton,
  ] = returnAccessibleButtonElements([
    // submit rating button
    {
      buttonLabel: 'Submit',
      leftIcon: <MdOutlineAddReaction />,
      rightIcon: <TbUpload />,
      semanticDescription: 'Button to submit rating and view results',
      semanticName: 'submitRatingButton',
      buttonDisabled: rating === 0,
      buttonOnClick: () => {
        displayAnnouncementDispatch({
          type: displayAnnouncementAction.updateRatingResponse,
          payload: {
            rating,
            userId,
          },
        });
        displayAnnouncementDispatch({
          type: displayAnnouncementAction.setTriggerRatingSubmit,
          payload: true,
        });

        closeRatingModal();
      },
    },
    // rate button
    {
      buttonLabel: 'Rate',
      leftIcon: <TbMoodHappy />,
      rightIcon: <TbUpload />,
      semanticDescription: 'Button to submit rating',
      semanticName: 'submitRatingButton',
      buttonOnClick: () => {
        openRatingModal();
      },
    },
    // view statistics button
    {
      buttonLabel: 'View',
      leftIcon: <MdOutlineAddReaction />,
      semanticDescription: 'Button to submit rating and view results',
      semanticName: 'submitRatingButton',
      buttonOnClick: () => {
        openStatisticsModal();
      },
    },
  ]);

  /** rating */
  const createdRatingComponent = (
    <CustomRating
      question="Tell us how you feel! (It's anonymous)"
      ratingKind="emotion"
      setRatingDispatch={displayAnnouncementDispatch}
    />
  );

  const displayRatingAndSubmit = (
    <Group
      position="right"
      spacing={rowGap}
      p={padding}
      w="100%"
      style={{ border: '1px solid #e0e0e0', borderRadius: '4px' }}
    >
      <Group position="left">{createdRatingComponent}</Group>
      <Space w="lg" />
      <Group position="right">{createdSubmitRatingButton}</Group>
    </Group>
  );

  const showStatisticsCard = (
    <Stack w="100%">
      <Group position="right">
        <Text size="md" color="dark">
          {announcement?.ratingResponse?.ratingCount ?? 0} people have rated
          this
        </Text>
      </Group>
      <ResponsivePieChart pieChartData={ratingPieChartDataArray} />
    </Stack>
  );

  const ratingModalSize = announcement?.ratedUserIds?.includes(userId ?? '')
    ? 'calc(100% - 2rem)'
    : width < 480
    ? 'calc(100% - 3rem)'
    : '640px';
  const ratingModalTitle = (
    <Title order={2} color="dark">
      {announcement?.title ?? ''}
    </Title>
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
    <Title order={2} color="dark">
      MacAuley family responses to {announcement?.title ?? ''}
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
    <Group w="100%" position="center" pt={padding}>
      <Group
        w={width < 480 ? '85%' : '62%'}
        p={padding}
        spacing={rowGap}
        style={{
          borderTop: '1px solid #e0e0e0',
          borderLeft: '1px solid #e0e0e0',
          borderRight: '1px solid #e0e0e0',
          borderRadius: '4px 4px 0 0',
        }}
        position="left"
      >
        <Text color="dark">
          {announcement?.ratedUserIds?.includes(userId ?? '')
            ? 'View reactions of MacAuley family members!'
            : 'How do you feel about this?'}
        </Text>
        {/* rating icon */}
        <Tooltip
          label={
            announcement?.ratedUserIds?.includes(userId ?? '')
              ? 'View statistics'
              : 'Rate to view reactions of MacAuley family members'
          }
        >
          <Group>
            {announcement?.ratedUserIds?.includes(userId ?? '')
              ? createdViewStatisticsButton
              : createdRateAnnouncementButton}
          </Group>
        </Tooltip>
        {/* spacer */}
        <Space w="xs" />
      </Group>
    </Group>
  );

  const displayAnnouncementComponent = (
    <Flex direction="column" w="100%" style={{ background: 'white' }}>
      {displayRatingModal}
      {displayStatisticsModal}
      {articleTitle}
      {displayArticleInfo}
      {articleImage}
      {displayArticleParagraphs}
      {displayReaderResponseIcons}
      <Comment parentResourceId={announcement?._id ?? ''} />
    </Flex>
  );
  /** ------------- end input creators ------------- */
  return displayAnnouncementComponent;
}

export default DisplayAnnouncement;
