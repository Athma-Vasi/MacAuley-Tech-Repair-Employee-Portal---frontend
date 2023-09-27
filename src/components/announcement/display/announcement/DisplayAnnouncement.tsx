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
import { useErrorBoundary } from 'react-error-boundary';
import { MdOutlineAddReaction } from 'react-icons/md';
import { TbMoodHappy, TbUpload } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';

import { COLORS_SWATCHES } from '../../../../constants/data';
import { globalAction } from '../../../../context/globalProvider/state';
import { useAuth, useGlobalState } from '../../../../hooks';
import { returnAccessibleButtonElements } from '../../../../jsxCreators';
import { UserDocument } from '../../../../types';
import {
  formatDate,
  logState,
  returnThemeColors,
  urlBuilder,
} from '../../../../utils';
import { Comment } from '../../../comment';
import { CustomNotification } from '../../../customNotification';
import { CustomRating } from '../../../customRating/CustomRating';
import { ResponsivePieChart } from '../../../displayStatistics/responsivePieChart';
import { AnnouncementDocument } from '../../create/types';
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

    isLoading,
    loadingMessage,
    isSuccessful,
    successMessage,
    isSubmitting,
    submitMessage,
  } = displayAnnouncementState;

  const {
    globalState: {
      padding,
      rowGap,
      width,
      announcementDocument,
      userDocument,
      themeObject,
    },
    globalDispatch,
  } = useGlobalState();
  const {
    authState: { userId, accessToken },
  } = useAuth();

  const navigate = useNavigate();
  const { showBoundary } = useErrorBoundary();

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
      displayAnnouncementDispatch({
        type: displayAnnouncementAction.setSubmitMessage,
        payload: `Your rating to ${announcement.title} is on its way!`,
      });

      const url: URL = urlBuilder({
        path: `actions/outreach/announcement/${announcement._id}/rating`,
      });

      const body = JSON.stringify({
        announcementFields: {
          ratingResponse: announcement.ratingResponse,
          ratedUserIds: announcement.ratedUserIds,
        },
      });

      const request: Request = new Request(url.toString(), {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body,
        signal: controller.signal,
      });

      try {
        const response: Response = await fetch(request);
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
        if (!response.ok) {
          throw new Error(data.message);
        }

        const [_updatedAnnouncementDocument, updatedUserDocument] =
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
          payload: data.message ?? 'Success!',
        });
      } catch (error: any) {
        if (!isMounted || error.name === 'AbortError') {
          return;
        }

        const errorMessage =
          error instanceof InvalidTokenError
            ? 'Invalid token. Please login again.'
            : !error.response
            ? 'Network error. Please try again.'
            : error?.message ?? 'Unknown error occurred. Please try again.';

        globalDispatch({
          type: globalAction.setErrorState,
          payload: {
            isError: true,
            errorMessage,
            errorCallback: () => {
              navigate('/home');

              globalDispatch({
                type: globalAction.setErrorState,
                payload: {
                  isError: false,
                  errorMessage: '',
                  errorCallback: () => {},
                },
              });
            },
          },
        });

        showBoundary(error);
      } finally {
        if (isMounted) {
          displayAnnouncementDispatch({
            type: displayAnnouncementAction.setIsSubmitting,
            payload: false,
          });
          displayAnnouncementDispatch({
            type: displayAnnouncementAction.setSubmitMessage,
            payload: '',
          });
          displayAnnouncementDispatch({
            type: displayAnnouncementAction.setTriggerRatingSubmit,
            payload: false,
          });
        }
      }
    }

    if (triggerRatingSubmit) {
      submitRating();
    }

    return () => {
      isMounted = false;
      controller.abort();
    };
    // only run on trigger
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
  }, [announcement, triggerRatingSubmit]);

  useEffect(() => {
    logState({
      state: displayAnnouncementState,
      groupLabel: 'announcement',
    });
  }, [displayAnnouncementState]);
  /** ------------- end useEffects ------------- */

  /** ------------- begin component render bypass ------------- */
  if (isLoading || isSubmitting || isSuccessful) {
    return (
      <CustomNotification
        isLoading={isLoading}
        isSubmitting={isSubmitting}
        isSuccessful={isSuccessful}
        loadingMessage={loadingMessage}
        successMessage={successMessage}
        submitMessage={submitMessage}
        parentDispatch={displayAnnouncementDispatch}
        navigateTo={{
          successPath: `/home/outreach/announcement/display/${announcement?.title}`,
        }}
      />
    );
  }
  /** ------------- end component render bypass ------------- */

  const {
    appThemeColors: { backgroundColor, borderColor },
  } = returnThemeColors({
    themeObject,
    colorsSwatches: COLORS_SWATCHES,
  });

  /** ------------- begin input creators ------------- */
  const articleTitle = (
    <Title
      order={1}
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

  const spacer = <Text size="md">》</Text>;

  const articleAuthor = (
    <Group>
      <Text size="md" style={{ letterSpacing: '0.05rem' }}>
        {announcement?.author?.toUpperCase() ?? ''}
      </Text>
      <Space w="xs" />
      {spacer}
    </Group>
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
    <Group>
      <Space w="xs" />
      <Text size="md">{formattedDate}</Text>
      <Space w="xs" />
      {spacer}
    </Group>
  );

  const articleTimeToRead = (
    <Group>
      <Space w="xs" />
      <Text size="md">{announcement?.timeToRead ?? 1} min read</Text>
      <Space w="xs" />
    </Group>
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
      <Text size={32} pr={padding} w="fit-content" style={{ float: 'left' }}>
        <strong>{firstWordsStartingParagraph}</strong>
      </Text>
    );
    const displayFirstParagraph = (
      <>
        {displayLargeFirstWords}
        <Text
          key={`${index}`}
          size="md"
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
      style={{ border: borderColor, borderRadius: '4px' }}
    >
      <Group position="left">{createdRatingComponent}</Group>
      <Space w="lg" />
      <Group position="right">
        <Tooltip
          position="left"
          label={
            rating === 0
              ? 'Please rate before submitting'
              : 'Submit your rating'
          }
        >
          <Group>{createdSubmitRatingButton}</Group>
        </Tooltip>
      </Group>
    </Group>
  );

  const showStatisticsCard = (
    <Stack w="100%">
      <Group position="right">
        <Text size="md">
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
  const ratingModalTitle = <Title order={4}>{announcement?.title ?? ''}</Title>;
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
        position="left"
      >
        <Text size="md">
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
    <Flex direction="column" w="100%" bg={backgroundColor}>
      {displayRatingModal}
      {displayStatisticsModal}
      {articleTitle}
      {displayArticleInfo}
      {articleImage}
      {displayArticleParagraphs}
      {displayReaderResponseIcons}
      <Comment
        parentResourceId={announcement?._id ?? ''}
        parentResourceTitle={announcement?.title ?? ''}
      />
    </Flex>
  );
  /** ------------- end input creators ------------- */
  return displayAnnouncementComponent;
}

export default DisplayAnnouncement;
