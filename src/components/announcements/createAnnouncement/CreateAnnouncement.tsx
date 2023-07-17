import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Button, Flex, Group, Text, Tooltip } from '@mantine/core';
import { ChangeEvent, useEffect, useReducer, useRef } from 'react';
import { GrAdd } from 'react-icons/gr';
import { MdOutlineAdd } from 'react-icons/md';

import {
  GRAMMAR_TEXT_INPUT_REGEX,
  GRAMMAR_TEXTAREA_INPUT_REGEX,
  URL_REGEX,
} from '../../../constants/regex';
import {
  returnAccessibleButtonElements,
  returnAccessibleDynamicTextAreaInputElements,
  returnAccessibleErrorValidTextElements,
  returnAccessibleErrorValidTextElementsForDynamicInputs,
  returnAccessibleTextInputElements,
} from '../../../jsxCreators';
import {
  returnGrammarValidationText,
  returnNameValidationText,
  returnUrlValidationText,
} from '../../../utils';
import {
  AccessibleButtonCreatorInfo,
  AccessibleTextAreaInputCreatorInfo,
  AccessibleTextInputCreatorInfo,
  FormLayoutWrapper,
  StepperWrapper,
} from '../../wrappers';
import { ARTICLE_TITLE_REGEX } from '../constants';
import {
  CREATE_ANNOUNCEMENT_DESCRIPTION_OBJECTS,
  CREATE_ANNOUNCEMENT_MAX_STEPPER_POSITION,
  MAX_ARTICLE_LENGTH,
} from './constants';
import {
  createAnnouncementAction,
  createAnnouncementReducer,
  initialCreateAnnouncementState,
} from './state';

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
    areValidArticleParagraphs,
    areArticleParagraphsFocused,
    isArticleLengthExceeded,

    timeToRead,
    triggerFormSubmit,
    currentStepperPosition,
    stepsInError,

    isError,
    errorMessage,
    isSubmitting,
    submitMessage,
    isSuccessful,
    successMessage,
    isLoading,
    loadingMessage,
  } = createAnnouncementState;

  const newArticleParagraphRef = useRef<HTMLTextAreaElement>(null);
  // sets focus on paragraph input on render, and on every new paragraph textarea creation
  useEffect(() => {
    newArticleParagraphRef.current?.focus();
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
    const isValidAuth = GRAMMAR_TEXT_INPUT_REGEX.test(author);

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
    const isValidBannerAlt = GRAMMAR_TEXT_INPUT_REGEX.test(bannerImageAlt);

    createAnnouncementDispatch({
      type: createAnnouncementAction.setIsValidBannerImageAlt,
      payload: isValidBannerAlt,
    });
  }, [bannerImageAlt]);

  // validate article arr on every change
  useEffect(() => {
    const isValidArticleBoolArr = article.map((paragraph) =>
      GRAMMAR_TEXTAREA_INPUT_REGEX.test(paragraph)
    );

    createAnnouncementDispatch({
      type: createAnnouncementAction.setAreValidArticleParagraphs,
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

  // update for stepper wrapper change
  useEffect(() => {
    const isRequiredInputInError = !isValidTitle || !isValidAuthor;
    const areOptionalInputsInError =
      (!isValidBannerImageSrc && bannerImageSrc !== '') ||
      (!isValidBannerImageAlt && bannerImageAlt !== '');

    const isStepInError = isRequiredInputInError || areOptionalInputsInError;

    createAnnouncementDispatch({
      type: createAnnouncementAction.setStepsInError,
      payload: {
        kind: isStepInError ? 'add' : 'delete',
        step: 0,
      },
    });
  }, [
    isValidTitle,
    isValidAuthor,
    isValidBannerImageSrc,
    isValidBannerImageAlt,
    bannerImageSrc,
    bannerImageAlt,
  ]);

  // update for stepper wrapper change
  useEffect(() => {
    const isStepInError = areValidArticleParagraphs.includes(false);

    createAnnouncementDispatch({
      type: createAnnouncementAction.setStepsInError,
      payload: {
        kind: isStepInError ? 'add' : 'delete',
        step: 1,
      },
    });
  }, [areValidArticleParagraphs]);

  // below are the accessible text elements for the screen reader to read out
  const [titleInputErrorText, titleInputValidText] =
    returnAccessibleErrorValidTextElements({
      inputElementKind: 'title',
      inputText: title,
      isInputTextFocused: isTitleFocused,
      isValidInputText: isValidTitle,
      regexValidationText: returnGrammarValidationText({
        content: title,
        contentKind: 'title',
        minLength: 2,
        maxLength: 75,
      }),
    });

  const [authorInputErrorText, authorInputValidText] =
    returnAccessibleErrorValidTextElements({
      inputElementKind: 'author',
      inputText: author,
      isInputTextFocused: isAuthorFocused,
      isValidInputText: isValidAuthor,
      regexValidationText: returnNameValidationText({
        content: author,
        contentKind: 'author',
        minLength: 2,
        maxLength: 100,
      }),
    });

  const [bannerImgSrcInputErrorText, bannerImgSrcInputValidText] =
    returnAccessibleErrorValidTextElements({
      inputElementKind: 'banner image src',
      inputText: bannerImageSrc,
      isInputTextFocused: isBannerImageSrcFocused,
      isValidInputText: isValidBannerImageSrc,
      regexValidationText: returnUrlValidationText(bannerImageSrc),
    });

  const [bannerImgAltInputErrorText, bannerImgAltInputValidText] =
    returnAccessibleErrorValidTextElements({
      inputElementKind: 'banner image alt',
      inputText: bannerImageAlt,
      isInputTextFocused: isBannerImageAltFocused,
      isValidInputText: isValidBannerImageAlt,
      regexValidationText: returnGrammarValidationText({
        content: bannerImageAlt,
        contentKind: 'banner image alt',
        minLength: 2,
        maxLength: 75,
      }),
    });

  const [articleParagraphInputErrorTexts, articleParagraphInputValidTexts] =
    returnAccessibleErrorValidTextElementsForDynamicInputs({
      areInputTextsFocused: areArticleParagraphsFocused,
      areValidInputTexts: areValidArticleParagraphs,
      inputTextArray: article,
      semanticName: 'article paragraph',
      regexValidationProps: {
        content: article.join(' '),
        contentKind: 'article paragraph',
        minLength: 2,
        maxLength: 2000,
      },
      regexValidationFunction: returnGrammarValidationText,
    });

  // following are info objects for input creators
  const titleTextInputCreatorInfo: AccessibleTextInputCreatorInfo = {
    description: {
      error: titleInputErrorText,
      valid: titleInputValidText,
    },
    inputText: title,
    isValidInputText: isValidTitle,
    label: 'Article title',
    onBlur: () => {
      createAnnouncementDispatch({
        type: createAnnouncementAction.setIsTitleFocused,
        payload: false,
      });
    },
    onChange: (event) => {
      createAnnouncementDispatch({
        type: createAnnouncementAction.setTitle,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      createAnnouncementDispatch({
        type: createAnnouncementAction.setIsTitleFocused,
        payload: true,
      });
    },
    placeholder: 'Enter article title',
    semanticName: 'title',
    required: true,
    withAsterisk: true,
  };

  const authorTextInputCreatorInfo: AccessibleTextInputCreatorInfo = {
    description: {
      error: authorInputErrorText,
      valid: authorInputValidText,
    },
    inputText: author,
    isValidInputText: isValidAuthor,
    label: 'Author',
    onBlur: () => {
      createAnnouncementDispatch({
        type: createAnnouncementAction.setIsAuthorFocused,
        payload: false,
      });
    },
    onChange: (event) => {
      createAnnouncementDispatch({
        type: createAnnouncementAction.setAuthor,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      createAnnouncementDispatch({
        type: createAnnouncementAction.setIsAuthorFocused,
        payload: true,
      });
    },
    placeholder: 'Enter author name',
    semanticName: 'author',
    required: true,
    withAsterisk: true,
  };

  const bannerImageSrcTextInputCreatorInfo: AccessibleTextInputCreatorInfo = {
    description: {
      error: bannerImgSrcInputErrorText,
      valid: bannerImgSrcInputValidText,
    },
    inputText: bannerImageSrc,
    isValidInputText: isValidBannerImageSrc,
    label: 'Banner image src',
    onBlur: () => {
      createAnnouncementDispatch({
        type: createAnnouncementAction.setIsBannerImageSrcFocused,
        payload: false,
      });
    },
    onChange: (event) => {
      createAnnouncementDispatch({
        type: createAnnouncementAction.setBannerImageSrc,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      createAnnouncementDispatch({
        type: createAnnouncementAction.setIsBannerImageSrcFocused,
        payload: true,
      });
    },
    placeholder: 'Enter banner image src',
    semanticName: 'banner image src',
  };

  const bannerImageAltTextInputCreatorInfo: AccessibleTextInputCreatorInfo = {
    description: {
      error: bannerImgAltInputErrorText,
      valid: bannerImgAltInputValidText,
    },
    inputText: bannerImageAlt,
    isValidInputText: isValidBannerImageAlt,
    label: 'Banner image alt text',
    onBlur: () => {
      createAnnouncementDispatch({
        type: createAnnouncementAction.setIsBannerImageAltFocused,
        payload: false,
      });
    },
    onChange: (event) => {
      createAnnouncementDispatch({
        type: createAnnouncementAction.setBannerImageAlt,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      createAnnouncementDispatch({
        type: createAnnouncementAction.setIsBannerImageAltFocused,
        payload: true,
      });
    },
    placeholder: 'Enter banner image alt text',
    semanticName: 'banner image alt',
  };

  const articleParagraphTextAreaInputsCreatorInfo: AccessibleTextAreaInputCreatorInfo[] =
    Array.from({ length: article.length }, (_, index) => {
      const creatorInfoObject = {
        description: {
          error: articleParagraphInputErrorTexts[index],
          valid: articleParagraphInputValidTexts[index],
        },
        dynamicInputProps: {
          semanticAction: 'delete',
          dynamicIndex: index,
          dynamicIcon: faTrash,
          dynamicInputOnClick: () => {
            createAnnouncementDispatch({
              type: createAnnouncementAction.setDeleteArticleParagraph,
              payload: index,
            });
          },
        },
        inputText: article[index],
        isValidInputText: areValidArticleParagraphs[index],
        // label: `Paragraph ${index + 1}`,
        onBlur: () => {
          createAnnouncementDispatch({
            type: createAnnouncementAction.setAreArticleParagraphsFocused,
            payload: {
              index,
              value: false,
            },
          });
        },
        onChange: (event: ChangeEvent<HTMLTextAreaElement>) => {
          createAnnouncementDispatch({
            type: createAnnouncementAction.setArticle,
            payload: {
              index,
              value: event.currentTarget.value,
            },
          });
        },
        onFocus: () => {
          createAnnouncementDispatch({
            type: createAnnouncementAction.setAreArticleParagraphsFocused,
            payload: {
              index,
              value: true,
            },
          });
        },
        placeholder: `Enter paragraph ${index + 1}`,
        semanticName: `article paragraph ${index + 1}`,
        ref: index === article.length - 1 ? newArticleParagraphRef : null,
        required: true,
        withAsterisk: true,
      };

      return creatorInfoObject;
    });

  const addNewArticleParagraphButtonCreatorInfo: AccessibleButtonCreatorInfo = {
    buttonVariant: 'outline',
    buttonLabel: (
      <Tooltip label="Add new article paragraph">
        <Group>
          <MdOutlineAdd size={20} />
          <Text color="gray">Add</Text>
        </Group>
      </Tooltip>
    ),
    buttonOnClick: () => {
      createAnnouncementDispatch({
        type: createAnnouncementAction.setArticle,
        payload: {
          index: article.length,
          value: '',
        },
      });
    },
    semanticDescription: 'add new article paragraph text input button',
    semanticName: 'add paragraph button',
  };

  const submitButtonCreatorInfo: AccessibleButtonCreatorInfo = {
    buttonLabel: 'Submit',
    semanticDescription: 'create announcement form submit button',
    semanticName: 'submit button',
    buttonOnClick: (event: React.MouseEvent<HTMLButtonElement>) => {
      createAnnouncementDispatch({
        type: createAnnouncementAction.setTriggerFormSubmit,
        payload: true,
      });
    },
    // ensures form submit happens only once
    buttonDisabled: stepsInError.size > 0 || triggerFormSubmit,
  };

  const createdArticleParagraphsTextAreaInputs =
    returnAccessibleDynamicTextAreaInputElements(
      articleParagraphTextAreaInputsCreatorInfo
    );

  const [
    createdTitleTextInput,
    createdAuthorTextInput,
    createdBannerImageSrcTextInput,
    createdBannerImageAltTextInput,
  ] = returnAccessibleTextInputElements([
    titleTextInputCreatorInfo,
    authorTextInputCreatorInfo,
    bannerImageSrcTextInputCreatorInfo,
    bannerImageAltTextInputCreatorInfo,
  ]);

  const createdAddNewArticleParagraphButton = returnAccessibleButtonElements([
    addNewArticleParagraphButtonCreatorInfo,
  ]);

  const displayAddArticleParagraphButton = createdAddNewArticleParagraphButton;

  const [createdSubmitButton] = returnAccessibleButtonElements([
    submitButtonCreatorInfo,
  ]);
  const displaySubmitButton =
    currentStepperPosition === CREATE_ANNOUNCEMENT_MAX_STEPPER_POSITION
      ? createdSubmitButton
      : null;

  const displayAnnouncementDetailsFormPage = (
    <FormLayoutWrapper>
      {createdTitleTextInput}
      {createdAuthorTextInput}
      {createdBannerImageSrcTextInput}
      {createdBannerImageAltTextInput}
    </FormLayoutWrapper>
  );

  const displayArticleParagraphsFormPage = (
    <FormLayoutWrapper>
      <Text color="dark" size="sm">
        Max article length: {MAX_ARTICLE_LENGTH} characters
      </Text>
      {createdArticleParagraphsTextAreaInputs}
      <Flex align="center" justify="space-between" w="100%">
        <Text color="dark">{`${timeToRead} min read`}</Text>

        {displayAddArticleParagraphButton}
        {isArticleLengthExceeded ? (
          <Text color="red" size="sm">
            Maximum character length of 14000 reached
          </Text>
        ) : null}
      </Flex>
    </FormLayoutWrapper>
  );

  const displayCreateAnnouncementReviewPage = <h3>announcement review page</h3>;

  const displayCreateAnnouncementForm =
    currentStepperPosition === 0
      ? displayAnnouncementDetailsFormPage
      : currentStepperPosition === 1
      ? displayArticleParagraphsFormPage
      : currentStepperPosition === 2
      ? displayCreateAnnouncementReviewPage
      : displaySubmitButton;

  const displayCreateAnnouncementComponent = (
    <StepperWrapper
      currentStepperPosition={currentStepperPosition}
      setCurrentStepperPosition={
        createAnnouncementAction.setCurrentStepperPosition
      }
      descriptionObjectsArray={CREATE_ANNOUNCEMENT_DESCRIPTION_OBJECTS}
      maxStepperPosition={CREATE_ANNOUNCEMENT_MAX_STEPPER_POSITION}
      parentComponentDispatch={createAnnouncementDispatch}
      stepsInError={stepsInError}
    >
      {displayCreateAnnouncementForm}
    </StepperWrapper>
  );

  useEffect(() => {
    async function createAnnouncementFormSubmit() {
      console.log('create announcement form submit');
    }

    if (triggerFormSubmit) {
      createAnnouncementFormSubmit();
    }
  }, [triggerFormSubmit]);

  return (
    <Flex
      direction="column"
      align="flex-start"
      justify="center"
      rowGap="lg"
      w={400}
    >
      {displayCreateAnnouncementComponent}
    </Flex>
  );
}

export { CreateAnnouncement };

/**
 * <Flex
      direction="column"
      align="flex-start"
      justify="center"
      rowGap="lg"
      w="400px"
    >
      <TextInput
        size="sm"
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
      <TextInput
        size="sm"
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
      <TextInput
        size="sm"
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
      <TextInput
        size="sm"
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
      {article.map((paragraph, index) => {
        return (
          <Fragment key={`${index}${title}`}>
            <Textarea
              size="sm"
              w="100%"
              color="dark"
              label={`Paragraph ${index + 1}`}
              placeholder={`Enter paragraph ${index + 1}`}
              value={paragraph}
              aria-required
              aria-describedby={
                areValidArticleParagraphs[index]
                  ? `article-paragraph-input-note-valid-${index}`
                  : `article-paragraph-input-note-error-${index}`
              }
              description={
                areValidArticleParagraphs[index]
                  ? articleParagraphInputValidTexts[index]
                  : articleParagraphInputErrorTexts[index]
              }
              aria-invalid={areValidArticleParagraphs[index] ? 'false' : 'true'}
              icon={
                areValidArticleParagraphs[index] ? (
                  <FontAwesomeIcon icon={faCheck} color="green" />
                ) : null
              }
              error={!areValidArticleParagraphs[index] && paragraph !== ''}
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
                  type: createAnnouncementAction.setAreArticleParagraphsFocused,
                  payload: {
                    index,
                    value: true,
                  },
                });
              }}
              onBlur={() => {
                createAnnouncementDispatch({
                  type: createAnnouncementAction.setAreArticleParagraphsFocused,
                  payload: {
                    index,
                    value: false,
                  },
                });
              }}
              required
              withAsterisk
              autosize
              minRows={3}
              maxRows={10}
              minLength={3}
              maxLength={2000}
              ref={
                index === article.length - 1 ? newArticleParagraphRef : null
              }
            />
          </Fragment>
        );
      })}

      <Flex align="center" justify="space-between" w="100%">
        <Text color="dark">{`${timeToRead} min read`}</Text>

        <Button
          variant="default"
          size="sm"
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
      {isArticleLengthExceeded ? (
        <Text color="red" size="sm">
          Maximum character length of 14000 reached
        </Text>
      ) : null}
    </Flex>
 */

/**
     *  const createdArticleParagraphsTextAreaInputs = article.map(
    (paragraph, index) => {
      return (
        <Fragment key={`${index}${title}`}>
          <Textarea
            size="sm"
            w="100%"
            color="dark"
            // label={`Paragraph ${index + 1}`}
            label={
              <Flex align="center" justify="space-between" columnGap="xl">
                <Text>Paragraph {index + 1}</Text>
                <Tooltip label={`Delete paragraph ${index + 1}`}>
                  <Button
                    size="xs"
                    variant="subtle"
                    onClick={() => {
                      createAnnouncementDispatch({
                        type: createAnnouncementAction.setDeleteArticleParagraph,
                        payload: index,
                      });
                    }}
                  >
                    <FontAwesomeIcon icon={faTrash} color="gray" />
                  </Button>
                </Tooltip>
              </Flex>
            }
            placeholder={`Enter paragraph ${index + 1}`}
            value={paragraph}
            aria-required
            aria-describedby={
              areValidArticleParagraphs[index]
                ? `article-paragraph-input-note-valid-${index}`
                : `article-paragraph-input-note-error-${index}`
            }
            description={
              areValidArticleParagraphs[index]
                ? articleParagraphInputValidTexts[index]
                : articleParagraphInputErrorTexts[index]
            }
            aria-invalid={areValidArticleParagraphs[index] ? 'false' : 'true'}
            icon={
              areValidArticleParagraphs[index] ? (
                <FontAwesomeIcon icon={faCheck} color="green" />
              ) : null
            }
            error={!areValidArticleParagraphs[index] && paragraph !== ''}
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
                type: createAnnouncementAction.setAreArticleParagraphsFocused,
                payload: {
                  index,
                  value: true,
                },
              });
            }}
            onBlur={() => {
              createAnnouncementDispatch({
                type: createAnnouncementAction.setAreArticleParagraphsFocused,
                payload: {
                  index,
                  value: false,
                },
              });
            }}
            required
            withAsterisk={false}
            autosize
            minRows={3}
            maxRows={10}
            minLength={3}
            maxLength={2000}
            ref={index === article.length - 1 ? newArticleParagraphRef : null}
          />
        </Fragment>
      );
    }
  );
     */
