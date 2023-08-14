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
import { ChangeEvent, useEffect, useReducer } from 'react';
import { FaRegCommentDots } from 'react-icons/fa';
import { MdOutlineAddReaction } from 'react-icons/md';
import {
  TbBrandFacebook,
  TbBrandMastodon,
  TbBrandWhatsapp,
  TbUpload,
} from 'react-icons/tb';
import {
  TiSocialDribbble,
  TiSocialFlickr,
  TiSocialGithub,
  TiSocialInstagram,
  TiSocialLinkedin,
} from 'react-icons/ti';

import { GRAMMAR_TEXTAREA_INPUT_REGEX } from '../../../../constants/regex';
import { useAuth, useGlobalState } from '../../../../hooks';
import {
  returnAccessibleButtonElements,
  returnAccessibleErrorValidTextElements,
  returnAccessibleTextAreaInputElements,
} from '../../../../jsxCreators';
import {
  formatDate,
  logState,
  returnGrammarValidationText,
  urlBuilder,
} from '../../../../utils';
import { CustomNotification } from '../../../customNotification';
import { CustomRating } from '../../../customRating/CustomRating';
import { AccessibleTextAreaInputCreatorInfo } from '../../../wrappers';
import {
  displayAnnouncementAction,
  displayAnnouncementReducer,
  initialDisplayAnnouncementState,
} from './state';
import {
  AnnouncementDocument,
  RatingEmotion,
  RatingResponse,
} from '../../create/types';
import { ResourceRequestServerResponse } from '../../../../types';
import { InvalidTokenError } from 'jwt-decode';
import { CommentSchema } from '../../../comments/types';

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

    comment,
    isCommentValid,
    isCommentFocused,
    triggerCommentSubmit,

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
    globalState: { padding, rowGap, width, announcementDocument },
  } = useGlobalState();
  const {
    authState: { username, accessToken },
  } = useAuth();

  const [
    openedRatingModal,
    { open: openRatingModal, close: closeRatingModal },
  ] = useDisclosure(false);
  const [
    openedCommentModal,
    { open: openCommentModal, close: closeCommentModal },
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
        path: `/api/v1/actions/outreach/announcement/${announcement._id}`,
      });

      const prevRatingResponse = structuredClone(announcement.ratingResponse);
      if (!prevRatingResponse) {
        return;
      }

      const prevRatingEmotion = prevRatingResponse.ratingEmotion;
      switch (rating) {
        case 1: {
          prevRatingEmotion.devastated += 1;
          break;
        }
        case 2: {
          prevRatingEmotion.annoyed += 1;
          break;
        }
        case 3: {
          prevRatingEmotion.neutral += 1;
          break;
        }
        case 4: {
          prevRatingEmotion.happy += 1;
          break;
        }
        case 5: {
          prevRatingEmotion.ecstatic += 1;
          break;
        }
        default:
          break;
      }

      const ratingResponse: RatingResponse = {
        ratingEmotion: prevRatingEmotion,
        ratingCount: prevRatingResponse.ratingCount + 1,
      };

      const body = JSON.stringify({
        announcementFields: {
          ratingResponse,
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
        const data: ResourceRequestServerResponse<AnnouncementDocument> =
          await response.json();

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

  // submit comment on trigger

  // validate comment on every change
  useEffect(() => {
    const isValid = GRAMMAR_TEXTAREA_INPUT_REGEX.test(comment);

    displayAnnouncementDispatch({
      type: displayAnnouncementAction.setIsCommentValid,
      payload: isValid,
    });
  }, [comment]);

  useEffect(() => {
    logState({
      state: displayAnnouncementState,
      groupLabel: 'announcement',
    });
  }, [displayAnnouncementState]);
  /** ------------- end useEffects ------------- */

  /** ------------- begin component render bypass ------------- */
  if (isLoading || isError || isSubmitting || isSuccessful) {
    return (
      <CustomNotification
        errorMessage={errorMessage}
        isLoading={isLoading}
        isError={isError}
        isSubmitting={isSubmitting}
        isSuccessful={isSuccessful}
        loadingMessage={loadingMessage}
        successMessage={successMessage}
        submitMessage={submitMessage}
        parentDispatch={displayAnnouncementDispatch}
        navigateTo={{
          errorPath: '/portal',
          successPath: `/portal/outreach/announcement/display/${announcement?._id}`,
        }}
      />
    );
  }
  /** ------------- end component render bypass ------------- */

  /** ------------- begin accessible texts ------------- */
  const [commentInputErrorText, commentInputValidText] =
    returnAccessibleErrorValidTextElements({
      inputElementKind: 'comment',
      inputText: comment,
      isInputTextFocused: isCommentFocused,
      isValidInputText: isCommentValid,
      regexValidationText: returnGrammarValidationText({
        content: comment,
        contentKind: 'comment',
        maxLength: 2000,
        minLength: 2,
      }),
    });
  /** ------------- end accessible texts ------------- */

  /** ------------- begin input creator info objects ------------- */
  const commentTextAreaInputCreatorInfo: AccessibleTextAreaInputCreatorInfo = {
    description: {
      error: commentInputErrorText,
      valid: commentInputValidText,
    },
    inputText: comment,
    isValidInputText: isCommentValid,
    onBlur: () => {
      displayAnnouncementDispatch({
        type: displayAnnouncementAction.setIsCommentFocused,
        payload: false,
      });
    },
    onChange: (event: ChangeEvent<HTMLTextAreaElement>) => {
      displayAnnouncementDispatch({
        type: displayAnnouncementAction.setComment,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      displayAnnouncementDispatch({
        type: displayAnnouncementAction.setIsCommentFocused,
        payload: true,
      });
    },
    label: `${username}: `,
    placeholder: 'Enter your comment here',
    semanticName: 'comment',
    required: true,
  };
  /** ------------- end input creator info objects ------------- */

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
    <Group position="left" px={padding}>
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

  const createdSocialMediaIcons = (
    <Group px={padding}>
      <Tooltip label="Github">
        <Group>
          <TiSocialGithub
            size={24}
            style={{ cursor: 'pointer', color: 'dimgray' }}
          />
        </Group>
      </Tooltip>

      <Tooltip label="Mastodon">
        <Group>
          <TbBrandMastodon
            size={24}
            style={{ cursor: 'pointer', color: 'dimgray' }}
          />
        </Group>
      </Tooltip>

      <Tooltip label="Facebook">
        <Group>
          <TbBrandFacebook
            size={24}
            style={{ cursor: 'pointer', color: 'dimgray' }}
          />
        </Group>
      </Tooltip>

      <Tooltip label="WhatsApp">
        <Group>
          <TbBrandWhatsapp
            size={24}
            style={{ cursor: 'pointer', color: 'dimgray' }}
          />
        </Group>
      </Tooltip>

      <Tooltip label="LinkedIn">
        <Group>
          <TiSocialLinkedin
            size={24}
            style={{ cursor: 'pointer', color: 'dimgray' }}
          />
        </Group>
      </Tooltip>

      <Tooltip label="Instagram">
        <Group>
          <TiSocialInstagram
            size={24}
            style={{ cursor: 'pointer', color: 'dimgray' }}
          />
        </Group>
      </Tooltip>

      <Tooltip label="Flickr">
        <Group>
          <TiSocialFlickr
            size={24}
            style={{ cursor: 'pointer', color: 'dimgray' }}
          />
        </Group>
      </Tooltip>

      <Tooltip label="Dribbble">
        <Group>
          <TiSocialDribbble
            size={24}
            style={{ cursor: 'pointer', color: 'dimgray' }}
          />
        </Group>
      </Tooltip>
    </Group>
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

  /** rating */
  const createdRatingComponent = (
    <CustomRating
      question="Tell us how you feel! (It's anonymous)"
      ratingKind="emotion"
      setRatingDispatch={displayAnnouncementDispatch}
    />
  );

  const [createdSubmitRatingButton, createdSubmitCommentButton] =
    returnAccessibleButtonElements([
      {
        buttonLabel: 'Submit',
        leftIcon: <MdOutlineAddReaction />,
        rightIcon: <TbUpload />,
        semanticDescription: 'Button to submit rating and view results',
        semanticName: 'submitRatingButton',
        buttonDisabled: rating === 0,
        buttonOnClick: () => {
          displayAnnouncementDispatch({
            type: displayAnnouncementAction.setTriggerRatingSubmit,
            payload: true,
          });

          closeRatingModal();
        },
      },
      // submit comment button
      {
        buttonLabel: 'Submit',
        leftIcon: <FaRegCommentDots />,
        rightIcon: <TbUpload />,
        semanticDescription: 'Button to submit comment',
        semanticName: 'submitCommentButton',
        buttonDisabled: !isCommentValid,
        buttonOnClick: () => {
          displayAnnouncementDispatch({
            type: displayAnnouncementAction.setTriggerCommentSubmit,
            payload: true,
          });
          closeCommentModal();
        },
      },
    ]);

  const displayRatingModal = (
    <Modal
      opened={openedRatingModal}
      onClose={closeRatingModal}
      centered
      size={width < 480 ? 'calc(100% - 3rem)' : '640px'}
      title="Rate this article"
    >
      <Group
        position="right"
        spacing={rowGap}
        p={padding}
        w="100%"
        style={{ border: '1px solid #e0e0e0', borderRadius: '4px' }}
      >
        <Group position="left">{createdRatingComponent}</Group>
        <Group position="right">{createdSubmitRatingButton}</Group>
      </Group>
    </Modal>
  );

  /** comment */
  const [createdCommentTextAreaInput] = returnAccessibleTextAreaInputElements([
    commentTextAreaInputCreatorInfo,
  ]);

  const displayCommentModal = (
    <Modal
      opened={openedCommentModal}
      onClose={() => {
        closeCommentModal();
      }}
      centered
      size={width < 480 ? 'calc(100% - 3rem)' : '640px'}
      title={
        <Title
          order={5}
          style={{ borderBottom: '1px solid #e0e0e0' }}
          color="dark"
          pr={padding}
        >
          You are commenting on {announcement?.title ?? ''}
        </Title>
      }
    >
      <Stack
        w="100%"
        p={padding}
        // style={{ border: '1px solid #e0e0e0', borderRadius: '4px' }}
      >
        {createdCommentTextAreaInput}
        <Group position="right">{createdSubmitCommentButton}</Group>
      </Stack>
    </Modal>
  );

  /** reader response */
  const displayReaderResponseIcons = (
    <Group w="100%" position="left" spacing={padding} p={padding}>
      <MdOutlineAddReaction
        size={24}
        style={{ cursor: 'pointer', color: 'dimgray' }}
        onClick={() => {
          openRatingModal();
        }}
      />
      <FaRegCommentDots
        size={24}
        style={{ cursor: 'pointer', color: 'dimgray' }}
        onClick={() => {
          openCommentModal();
        }}
      />
    </Group>
  );

  const displayAnnouncementComponent = (
    <Stack w="100%" style={{ background: 'white' }}>
      {displayRatingModal}
      {displayCommentModal}
      {articleTitle}
      {displayArticleInfo}
      {createdSocialMediaIcons}
      {articleImage}
      {displayArticleParagraphs}
      {displayReaderResponseIcons}
    </Stack>
  );
  /** ------------- end input creators ------------- */
  return displayAnnouncementComponent;
}

export default DisplayAnnouncement;
