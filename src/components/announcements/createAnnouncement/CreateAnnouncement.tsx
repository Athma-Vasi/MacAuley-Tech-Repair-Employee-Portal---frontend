import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Flex, Group, Stack, Text, Tooltip } from '@mantine/core';
import { ChangeEvent, MouseEvent, useEffect, useReducer, useRef } from 'react';
import { MdOutlineAdd } from 'react-icons/md';
import { TbPlus, TbTrash, TbUpload } from 'react-icons/tb';

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
  logState,
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
  TextWrapper,
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
import { useGlobalState } from '../../../hooks';

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
  const {
    globalState: { padding, rowGap, width },
  } = useGlobalState();

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
    const isStepInError =
      areValidArticleParagraphs.includes(false) || isArticleLengthExceeded;

    createAnnouncementDispatch({
      type: createAnnouncementAction.setStepsInError,
      payload: {
        kind: isStepInError ? 'add' : 'delete',
        step: 1,
      },
    });
  }, [areValidArticleParagraphs, isArticleLengthExceeded]);

  useEffect(() => {
    logState({
      state: createAnnouncementState,
      groupLabel: 'create announcement state',
    });
  }, [createAnnouncementState]);

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
      regexValidationProps: article.map((paragraph) => ({
        content: paragraph,
        contentKind: 'paragraph',
        minLength: 2,
        maxLength: 2000,
      })),
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
      const deleteParagraphButtonCreatorInfo: AccessibleButtonCreatorInfo = {
        buttonVariant: 'outline',
        buttonDisabled: article.length === 1,
        buttonLabel: (
          <Tooltip label={`Delete paragraph ${index + 1}`}>
            <Group>
              <TbTrash />
              <Text>Delete</Text>
            </Group>
          </Tooltip>
        ),
        buttonOnClick: () => {
          createAnnouncementDispatch({
            type: createAnnouncementAction.setModifyArticleParagraph,
            payload: {
              index,
              kind: 'delete',
            },
          });
        },
        semanticDescription: `delete paragraph ${index + 1} text input button`,
        semanticName: `delete paragraph ${index + 1} button`,
      };

      const insertParagraphButtonCreatorInfo: AccessibleButtonCreatorInfo = {
        buttonVariant: 'outline',
        buttonLabel: (
          <Tooltip label={`Insert paragraph between ${index} and ${index + 1}`}>
            <Group>
              <TbPlus />
              <Text>Insert</Text>
            </Group>
          </Tooltip>
        ),
        buttonOnClick: () => {
          createAnnouncementDispatch({
            type: createAnnouncementAction.setModifyArticleParagraph,
            payload: {
              index,
              kind: 'insert',
            },
          });
        },
        semanticDescription: `insert paragraph ${index} text input button`,
        semanticName: `insert paragraph ${index} button`,
      };

      const [createdDeleteParagraphButton, createdInsertParagraphButton] =
        returnAccessibleButtonElements([
          deleteParagraphButtonCreatorInfo,
          insertParagraphButtonCreatorInfo,
        ]);

      const displayInsertParagraphButton =
        index === 0 ? null : createdInsertParagraphButton;

      const creatorInfoObject: AccessibleTextAreaInputCreatorInfo = {
        description: {
          error: articleParagraphInputErrorTexts[index],
          valid: articleParagraphInputValidTexts[index],
        },
        dynamicInputs: [
          createdDeleteParagraphButton,
          displayInsertParagraphButton,
        ],
        inputText: article[index],
        isValidInputText: areValidArticleParagraphs[index],
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
        semanticName: `Paragraph ${index + 1}`,
        ref: index === article.length - 1 ? newArticleParagraphRef : null,
        required: true,
      };

      return creatorInfoObject;
    });

  const addNewArticleParagraphButtonCreatorInfo: AccessibleButtonCreatorInfo = {
    buttonVariant: 'outline',
    buttonLabel: (
      <Tooltip label="Add new paragraph">
        <Group>
          <TbPlus />
          <Text>Add</Text>
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
    semanticDescription: 'click button to add new paragraph',
    semanticName: 'add paragraph button',
  };

  const submitButtonCreatorInfo: AccessibleButtonCreatorInfo = {
    buttonLabel: 'Submit',
    semanticDescription: 'create announcement form submit button',
    semanticName: 'submit button',
    leftIcon: <TbUpload />,
    buttonOnClick: (event: MouseEvent<HTMLButtonElement>) => {
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

  const [createdAddNewArticleParagraphButton, createdSubmitButton] =
    returnAccessibleButtonElements([
      addNewArticleParagraphButtonCreatorInfo,
      submitButtonCreatorInfo,
    ]);
  const displaySubmitButton =
    currentStepperPosition === CREATE_ANNOUNCEMENT_MAX_STEPPER_POSITION
      ? createdSubmitButton
      : null;
  const displayAddArticleParagraphButton = createdAddNewArticleParagraphButton;

  const displayAnnouncementDetailsFormPage = (
    <FormLayoutWrapper>
      {createdTitleTextInput}
      {createdAuthorTextInput}
      {createdBannerImageSrcTextInput}
      {createdBannerImageAltTextInput}
    </FormLayoutWrapper>
  );

  const displayArticleParagraphsFormPage = (
    <Stack w="100%" p={padding}>
      <Group position="apart" w="100%">
        <TextWrapper creatorInfoObj={{ size: 'lg' }}>{title}</TextWrapper>
        <TextWrapper creatorInfoObj={{}}>
          Max article length: {MAX_ARTICLE_LENGTH} characters
        </TextWrapper>
      </Group>
      {createdArticleParagraphsTextAreaInputs}
      <Group w="100%" position="apart">
        <TextWrapper
          creatorInfoObj={{}}
        >{`${timeToRead} min read`}</TextWrapper>

        {displayAddArticleParagraphButton}

        {isArticleLengthExceeded ? (
          <TextWrapper creatorInfoObj={{ color: 'red' }}>
            Maximum character length of {MAX_ARTICLE_LENGTH} reached
          </TextWrapper>
        ) : null}
      </Group>
      <TextWrapper creatorInfoObj={{}}>
        Current article length: {article.join(' ').length} characters
      </TextWrapper>
    </Stack>
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
      childrenTitle="Create Announcement"
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

  return <>{displayCreateAnnouncementComponent}</>;
}

export { CreateAnnouncement };
