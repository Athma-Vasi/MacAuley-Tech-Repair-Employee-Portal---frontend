import { Fragment, useEffect, useReducer, useRef } from 'react';
import {
  createAnnouncementAction,
  createAnnouncementReducer,
  initialCreateAnnouncementState,
} from './state';
import { Button, Flex, Text, TextInput, Textarea } from '@mantine/core';
import {
  ARTICLE_CONTENT_REGEX,
  ARTICLE_TITLE_REGEX,
  USERNAME_REGEX,
} from '../../../constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import {
  returnArticleTitleValidationText,
  returnArticleParagraphValidationText,
  returnImageAltValidationText,
} from '../../../utils';
import { FULL_NAME_REGEX, URL_REGEX } from '../../register/constants';
import {
  returnFullNameValidationText,
  returnUrlValidationText,
} from '../../register/utils';
import {
  returnArticleParagraphInputErrorElements,
  returnArticleParagraphInputValidElements,
} from './utils';
import { MAX_ARTICLE_LENGTH } from './constants';

function CreateAnnouncement() {
  const [createAnnouncementState, createAnnouncementDispatch] = useReducer(
    createAnnouncementReducer,
    initialCreateAnnouncementState
  );
  const {
    title,
    isValidTitle,
    isTitleFocused,
    author,
    isValidAuthor,
    isAuthorFocused,
    bannerImageSrc,
    isValidBannerImageSrc,
    isBannerImageSrcFocused,
    bannerImageAlt,
    isValidBannerImageAlt,
    isBannerImageAltFocused,
    article,
    isValidArticleParagraph,
    isArticleParagraphFocused,
    isArticleLengthExceeded,
    timeToRead,
  } = createAnnouncementState;

  const titleRef = useRef<HTMLInputElement>(null);
  // sets focus on title input on render
  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  const lastArticleParagraphRef = useRef<HTMLTextAreaElement>(null);
  // sets focus on paragraph input on render, and on every new paragraph textarea creation
  useEffect(() => {
    lastArticleParagraphRef.current?.focus();
  }, [article.length]);

  // validate title on every change
  useEffect(() => {
    const isValidTtl = ARTICLE_TITLE_REGEX.test(title);

    createAnnouncementDispatch({
      type: createAnnouncementAction.setIsValidTitle,
      payload: isValidTtl,
    });
  }, [title]);

  // validate author on every change
  useEffect(() => {
    const isValidAuth = FULL_NAME_REGEX.test(author);

    createAnnouncementDispatch({
      type: createAnnouncementAction.setIsValidAuthor,
      payload: isValidAuth,
    });
  }, [author]);

  // validate banner image src on every change
  useEffect(() => {
    const isValidBannerUrl = URL_REGEX.test(bannerImageSrc);

    createAnnouncementDispatch({
      type: createAnnouncementAction.setIsValidBannerImageSrc,
      payload: isValidBannerUrl,
    });
  }, [bannerImageSrc]);

  // validate banner image alt on every change
  useEffect(() => {
    const isValidBannerAlt = ARTICLE_TITLE_REGEX.test(bannerImageAlt);

    createAnnouncementDispatch({
      type: createAnnouncementAction.setIsValidBannerImageAlt,
      payload: isValidBannerAlt,
    });
  }, [bannerImageAlt]);

  // validate article arr on every change
  useEffect(() => {
    const isValidArticleBoolArr = article.map((paragraph) =>
      ARTICLE_CONTENT_REGEX.test(paragraph)
    );

    createAnnouncementDispatch({
      type: createAnnouncementAction.setIsValidArticleParagraph,
      payload: isValidArticleBoolArr,
    });
  }, [article]);

  // validate article length on every change
  useEffect(() => {
    const isValidArticleLength = article.join(' ').length >= MAX_ARTICLE_LENGTH;

    createAnnouncementDispatch({
      type: createAnnouncementAction.setIsArticleLengthExceeded,
      payload: isValidArticleLength,
    });
  }, [article]);

  // calculate time to read on every article change
  useEffect(() => {
    const wordsPerMinute = 200;
    // join article array into a string, split on whitespace, and count the length of the array
    const numberOfWords = article.join(' ').split(/\s/g).length;
    // round up to the nearest minute
    const timeToRead = Math.ceil(numberOfWords / wordsPerMinute);

    createAnnouncementDispatch({
      type: createAnnouncementAction.setTimeToRead,
      payload: timeToRead,
    });
  }, [article]);

  const titleInputErrorText = (
    <Text
      id="title-input-note-error"
      style={{
        display: isTitleFocused && title && !isValidTitle ? 'block' : 'none',
      }}
      color="red"
      w="100%"
      aria-live="polite"
    >
      <FontAwesomeIcon icon={faInfoCircle} />{' '}
      {returnArticleTitleValidationText({
        str: title,
        kind: 'title',
      })}
    </Text>
  );

  const titleInputValidText = (
    <Text
      id="title-input-note-valid"
      style={{
        display: isTitleFocused && title && isValidTitle ? 'block' : 'none',
      }}
      color="green"
      w="100%"
      aria-live="polite"
    >
      <FontAwesomeIcon icon={faCheck} /> Title is valid
    </Text>
  );

  const authorInputErrorText = (
    <Text
      id="author-input-note-error"
      style={{
        display: isAuthorFocused && author && !isValidAuthor ? 'block' : 'none',
      }}
      color="red"
      w="100%"
      aria-live="polite"
    >
      <FontAwesomeIcon icon={faInfoCircle} />{' '}
      {returnFullNameValidationText(author)}
    </Text>
  );

  const authorInputValidText = (
    <Text
      id="author-input-note-valid"
      style={{
        display: isAuthorFocused && author && isValidAuthor ? 'block' : 'none',
      }}
      color="green"
      w="100%"
      aria-live="polite"
    >
      <FontAwesomeIcon icon={faCheck} /> Author is valid
    </Text>
  );

  const bannerImgSrcInputErrorText = (
    <Text
      id="banner-img-src-input-note-error"
      style={{
        display:
          isBannerImageSrcFocused && bannerImageSrc && !isValidBannerImageSrc
            ? 'block'
            : 'none',
      }}
      color="red"
      w="100%"
      aria-live="polite"
    >
      <FontAwesomeIcon icon={faInfoCircle} />{' '}
      {returnUrlValidationText(bannerImageSrc)}
    </Text>
  );

  const bannerImgSrcInputValidText = (
    <Text
      id="banner-img-src-input-note-valid"
      style={{
        display:
          isBannerImageSrcFocused && bannerImageSrc && isValidBannerImageSrc
            ? 'block'
            : 'none',
      }}
      color="green"
      w="100%"
      aria-live="polite"
    >
      <FontAwesomeIcon icon={faCheck} /> Banner image url is valid
    </Text>
  );

  const bannerImgAltInputErrorText = (
    <Text
      id="banner-img-alt-input-note-error"
      style={{
        display:
          isBannerImageAltFocused && bannerImageAlt && !isValidBannerImageAlt
            ? 'block'
            : 'none',
      }}
      color="red"
      w="100%"
      aria-live="polite"
    >
      <FontAwesomeIcon icon={faInfoCircle} />{' '}
      {returnImageAltValidationText({
        str: bannerImageAlt,
        kind: 'banner image alt text',
      })}
    </Text>
  );

  const bannerImgAltInputValidText = (
    <Text
      id="banner-img-alt-input-note-valid"
      style={{
        display:
          isBannerImageAltFocused && bannerImageAlt && isValidBannerImageAlt
            ? 'block'
            : 'none',
      }}
      color="green"
      w="100%"
      aria-live="polite"
    >
      <FontAwesomeIcon icon={faCheck} /> Banner image alt text is valid
    </Text>
  );

  const articleParagraphInputErrorTexts =
    returnArticleParagraphInputErrorElements({
      article,
      isValidArticleParagraph,
      isArticleParagraphFocused,
      returnRegexValidationText: returnArticleParagraphValidationText,
    });

  const articleParagraphInputValidTexts =
    returnArticleParagraphInputValidElements({
      article,
      isValidArticleParagraph,
      isArticleParagraphFocused,
    });

  return (
    <Flex
      direction="column"
      align="flex-start"
      justify="center"
      rowGap="lg"
      w="400px"
    >
      <TextInput
        size="md"
        w="100%"
        color="dark"
        label="Article title"
        placeholder="Enter article title"
        value={title}
        aria-required
        aria-describedby={
          isValidTitle ? 'title-input-note-valid' : 'title-input-note-error'
        }
        description={isValidTitle ? titleInputValidText : titleInputErrorText}
        aria-invalid={isValidTitle ? 'false' : 'true'}
        icon={
          isValidTitle ? <FontAwesomeIcon icon={faCheck} color="green" /> : null
        }
        error={!isValidTitle && title !== ''}
        onChange={(event) => {
          createAnnouncementDispatch({
            type: createAnnouncementAction.setTitle,
            payload: event.currentTarget.value,
          });
        }}
        onFocus={() => {
          createAnnouncementDispatch({
            type: createAnnouncementAction.setIsTitleFocused,
            payload: true,
          });
        }}
        onBlur={() => {
          createAnnouncementDispatch({
            type: createAnnouncementAction.setIsTitleFocused,
            payload: false,
          });
        }}
        ref={titleRef}
        minLength={3}
        maxLength={150}
        required
        withAsterisk
      />
      {/* author name input */}
      <TextInput
        size="md"
        w="100%"
        color="dark"
        label="Author name"
        placeholder="Enter author name"
        value={author}
        aria-required
        aria-describedby={
          isValidAuthor ? 'author-input-note-valid' : 'author-input-note-error'
        }
        description={
          isValidAuthor ? authorInputValidText : authorInputErrorText
        }
        aria-invalid={isValidAuthor ? 'false' : 'true'}
        icon={
          isValidAuthor ? (
            <FontAwesomeIcon icon={faCheck} color="green" />
          ) : null
        }
        error={!isValidAuthor && author !== ''}
        onChange={(event) => {
          createAnnouncementDispatch({
            type: createAnnouncementAction.setAuthor,
            payload: event.currentTarget.value,
          });
        }}
        onFocus={() => {
          createAnnouncementDispatch({
            type: createAnnouncementAction.setIsAuthorFocused,
            payload: true,
          });
        }}
        onBlur={() => {
          createAnnouncementDispatch({
            type: createAnnouncementAction.setIsAuthorFocused,
            payload: false,
          });
        }}
        minLength={2}
        maxLength={100}
        required
        withAsterisk
      />
      {/* banner img src input */}
      <TextInput
        size="md"
        w="100%"
        color="dark"
        label="Banner image src"
        placeholder="Enter banner image url"
        value={bannerImageSrc}
        aria-required
        aria-describedby={
          isValidBannerImageSrc
            ? 'banner-img-src-input-note-valid'
            : 'banner-img-src-input-note-error'
        }
        description={
          isValidBannerImageSrc
            ? bannerImgSrcInputValidText
            : bannerImgSrcInputErrorText
        }
        aria-invalid={isValidBannerImageSrc ? 'false' : 'true'}
        icon={
          isValidBannerImageSrc ? (
            <FontAwesomeIcon icon={faCheck} color="green" />
          ) : null
        }
        error={!isValidBannerImageSrc && bannerImageSrc !== ''}
        onChange={(event) => {
          createAnnouncementDispatch({
            type: createAnnouncementAction.setBannerImageSrc,
            payload: event.currentTarget.value,
          });
        }}
        onFocus={() => {
          createAnnouncementDispatch({
            type: createAnnouncementAction.setIsBannerImageSrcFocused,
            payload: true,
          });
        }}
        onBlur={() => {
          createAnnouncementDispatch({
            type: createAnnouncementAction.setIsBannerImageSrcFocused,
            payload: false,
          });
        }}
        required
        withAsterisk
      />
      {/* banner image alt text */}
      <TextInput
        size="md"
        w="100%"
        color="dark"
        label="Banner image alt"
        placeholder="Enter banner image alt text"
        value={bannerImageAlt}
        aria-required
        aria-describedby={
          isValidBannerImageAlt
            ? 'banner-img-alt-input-note-valid'
            : 'banner-img-alt-input-note-error'
        }
        description={
          isValidBannerImageAlt
            ? bannerImgAltInputValidText
            : bannerImgAltInputErrorText
        }
        aria-invalid={isValidBannerImageAlt ? 'false' : 'true'}
        icon={
          isValidBannerImageAlt ? (
            <FontAwesomeIcon icon={faCheck} color="green" />
          ) : null
        }
        error={!isValidBannerImageAlt && bannerImageAlt !== ''}
        onChange={(event) => {
          createAnnouncementDispatch({
            type: createAnnouncementAction.setBannerImageAlt,
            payload: event.currentTarget.value,
          });
        }}
        onFocus={() => {
          createAnnouncementDispatch({
            type: createAnnouncementAction.setIsBannerImageAltFocused,
            payload: true,
          });
        }}
        onBlur={() => {
          createAnnouncementDispatch({
            type: createAnnouncementAction.setIsBannerImageAltFocused,
            payload: false,
          });
        }}
        required
        withAsterisk
        minLength={3}
        maxLength={150}
      />
      {/* article content text area */}
      {article.map((paragraph, index) => {
        return (
          <Fragment key={`${index}${title}`}>
            <Textarea
              size="md"
              w="100%"
              color="dark"
              label={`Paragraph ${index + 1}`}
              placeholder={`Enter paragraph ${index + 1}`}
              value={paragraph}
              aria-required
              aria-describedby={
                isValidArticleParagraph[index]
                  ? `article-paragraph-input-note-valid-${index}`
                  : `article-paragraph-input-note-error-${index}`
              }
              description={
                isValidArticleParagraph[index]
                  ? articleParagraphInputValidTexts[index]
                  : articleParagraphInputErrorTexts[index]
              }
              aria-invalid={isValidArticleParagraph[index] ? 'false' : 'true'}
              icon={
                isValidArticleParagraph[index] ? (
                  <FontAwesomeIcon icon={faCheck} color="green" />
                ) : null
              }
              error={!isValidArticleParagraph[index] && paragraph !== ''}
              onChange={(event) => {
                createAnnouncementDispatch({
                  type: createAnnouncementAction.setArticle,
                  payload: {
                    index: index,
                    value: event.currentTarget.value,
                  },
                });
              }}
              onFocus={() => {
                createAnnouncementDispatch({
                  type: createAnnouncementAction.setIsArticleParagraphFocused,
                  payload: {
                    index,
                    value: true,
                  },
                });
              }}
              onBlur={() => {
                createAnnouncementDispatch({
                  type: createAnnouncementAction.setIsArticleParagraphFocused,
                  payload: {
                    index,
                    value: false,
                  },
                });
              }}
              required
              withAsterisk
              minLength={3}
              maxLength={2000}
              ref={
                index === article.length - 1 ? lastArticleParagraphRef : null
              }
            />
          </Fragment>
        );
      })}

      {/* button to create new text area paragraph */}
      <Flex align="center" justify="space-between" w="100%">
        <Text color="dark">{`${timeToRead} min read`}</Text>

        <Button
          variant="default"
          size="md"
          disabled={isArticleLengthExceeded}
          onClick={() => {
            createAnnouncementDispatch({
              type: createAnnouncementAction.setArticle,
              payload: {
                index: article.length,
                value: '',
              },
            });
          }}
        >
          Add paragraph
        </Button>
      </Flex>
      {/* max length exceeded notice */}
      {isArticleLengthExceeded ? (
        <Text color="red" size="sm">
          Maximum character length of 14000 reached
        </Text>
      ) : null}
    </Flex>
  );
}

export { CreateAnnouncement };
