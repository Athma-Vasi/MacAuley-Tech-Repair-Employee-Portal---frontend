import { Group, Text, Title, Tooltip } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { InvalidTokenError } from "jwt-decode";
import { ChangeEvent, MouseEvent, useEffect, useReducer, useRef } from "react";
import { useErrorBoundary } from "react-error-boundary";
import { TbRowInsertBottom, TbRowInsertTop, TbTrash, TbUpload } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

import { COLORS_SWATCHES } from "../../../constants/data";
import {
  FULL_NAME_REGEX,
  GRAMMAR_TEXT_INPUT_REGEX,
  GRAMMAR_TEXTAREA_INPUT_REGEX,
  URL_REGEX,
} from "../../../constants/regex";
import { globalAction } from "../../../context/globalProvider/state";
import { useGlobalState, useWrapFetch } from "../../../hooks";
import {
  AccessibleErrorValidTextElements,
  AccessibleErrorValidTextElementsForDynamicInputs,
  returnAccessibleButtonElements,
  returnAccessibleDynamicTextAreaInputElements,
  returnAccessibleTextInputElements,
} from "../../../jsxCreators";
import { ResourceRequestServerResponse } from "../../../types";
import {
  logState,
  returnGrammarValidationText,
  returnNameValidationText,
  returnThemeColors,
  returnUrlValidationText,
  urlBuilder,
} from "../../../utils";
import FormReviewPage, {
  FormReviewObjectArray,
} from "../../formReviewPage/FormReviewPage";
import { NotificationModal } from "../../notificationModal";
import {
  AccessibleButtonCreatorInfo,
  AccessibleTextAreaInputCreatorInfo,
  AccessibleTextInputCreatorInfo,
  FormLayoutWrapper,
  StepperWrapper,
} from "../../wrappers";
import { ARTICLE_TITLE_REGEX } from "../constants";
import {
  CREATE_ANNOUNCEMENT_DESCRIPTION_OBJECTS,
  CREATE_ANNOUNCEMENT_MAX_STEPPER_POSITION,
  MAX_ARTICLE_LENGTH,
} from "./constants";
import {
  createAnnouncementAction,
  createAnnouncementReducer,
  initialCreateAnnouncementState,
} from "./state";
import { AnnouncementDocument, RatingResponse } from "./types";
import { createAnnouncementFormReviewObject } from "./utils";

function CreateAnnouncement() {
  /** ------------- begin hooks ------------- */
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

    isSubmitting,
    submitMessage,
    isSuccessful,
    successMessage,
    isLoading,
    loadingMessage,
  } = createAnnouncementState;
  const {
    globalState: { width, themeObject },
    globalDispatch,
  } = useGlobalState();

  const { wrappedFetch } = useWrapFetch();

  const navigate = useNavigate();
  const { showBoundary } = useErrorBoundary();

  const [
    openedSubmitSuccessNotificationModal,
    {
      open: openSubmitSuccessNotificationModal,
      close: closeSubmitSuccessNotificationModal,
    },
  ] = useDisclosure(false);
  /** ------------- end hooks ------------- */

  /** ------------- begin useEffects ------------- */
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    async function createAnnouncementFormSubmit() {
      createAnnouncementDispatch({
        type: createAnnouncementAction.setIsSubmitting,
        payload: true,
      });
      createAnnouncementDispatch({
        type: createAnnouncementAction.setSubmitMessage,
        payload: "Create announcement request is on the way!",
      });
      openSubmitSuccessNotificationModal();

      const url: URL = urlBuilder({
        path: "actions/outreach/announcement",
      });

      const ratingResponse: RatingResponse = {
        ratingEmotion: {
          estatic: 0,
          happy: 0,
          neutral: 0,
          annoyed: 0,
          devastated: 0,
        },
        ratingCount: 0,
      };

      // copilot magic...removes the query string from the (pexels.com) image url and compresses the image
      const bannerImageSrcCompressed = bannerImageSrc.replace(
        /(\?auto=compress&cs=tinysrgb&w=)(\d+)&(h=)(\d+)&(dpr=)(\d+)/,
        "$11260$3750$41"
      );

      const body = JSON.stringify({
        announcementSchema: {
          title,
          author,
          bannerImageSrc,
          bannerImageSrcCompressed,
          bannerImageAlt,
          article,
          timeToRead,
          ratingResponse,
          ratedUserIds: [],
        },
      });

      const requestInit: RequestInit = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
      };

      try {
        const response = await wrappedFetch({
          isMounted,
          requestInit,
          signal: controller.signal,
          url,
        });
        const data: ResourceRequestServerResponse<AnnouncementDocument> =
          await response.json();

        if (!isMounted) {
          return;
        }
        if (!response.ok) {
          throw new Error(data.message);
        }

        createAnnouncementDispatch({
          type: createAnnouncementAction.setIsSuccessful,
          payload: true,
        });
        createAnnouncementDispatch({
          type: createAnnouncementAction.setSuccessMessage,
          payload: data.message ?? "Success!",
        });
      } catch (error: any) {
        if (!isMounted || error.name === "AbortError") {
          return;
        }

        const errorMessage =
          error instanceof InvalidTokenError
            ? "Invalid token. Please login again."
            : !error.response
            ? "Network error. Please try again."
            : error?.message ?? "Unknown error occurred. Please try again.";

        globalDispatch({
          type: globalAction.setErrorState,
          payload: {
            isError: true,
            errorMessage,
            errorCallback: () => {
              navigate("/home");

              globalDispatch({
                type: globalAction.setErrorState,
                payload: {
                  isError: false,
                  errorMessage: "",
                  errorCallback: () => {},
                },
              });
            },
          },
        });

        showBoundary(error);
      } finally {
        createAnnouncementDispatch({
          type: createAnnouncementAction.setIsSubmitting,
          payload: false,
        });
        createAnnouncementDispatch({
          type: createAnnouncementAction.setSubmitMessage,
          payload: "",
        });
        createAnnouncementDispatch({
          type: createAnnouncementAction.setTriggerFormSubmit,
          payload: false,
        });
      }
    }

    if (triggerFormSubmit) {
      createAnnouncementFormSubmit();
    }

    return () => {
      isMounted = false;
      controller.abort();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerFormSubmit]);

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
    const isValidArticleLength = article.join(" ").length >= MAX_ARTICLE_LENGTH;

    createAnnouncementDispatch({
      type: createAnnouncementAction.setIsArticleLengthExceeded,
      payload: isValidArticleLength,
    });
  }, [article]);

  // calculate time to read on every article change
  useEffect(() => {
    const wordsPerMinute = 200;
    // join article array into a string, split on whitespace, and count the length of the array
    const numberOfWords = article.join(" ").split(/\s/g).length;
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
      (!isValidBannerImageSrc && bannerImageSrc !== "") ||
      (!isValidBannerImageAlt && bannerImageAlt !== "");

    const isStepInError = isRequiredInputInError || areOptionalInputsInError;

    createAnnouncementDispatch({
      type: createAnnouncementAction.setStepsInError,
      payload: {
        kind: isStepInError ? "add" : "delete",
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
        kind: isStepInError ? "add" : "delete",
        step: 1,
      },
    });
  }, [areValidArticleParagraphs, isArticleLengthExceeded]);

  useEffect(() => {
    logState({
      state: createAnnouncementState,
      groupLabel: "create announcement state",
    });
  }, [createAnnouncementState]);
  /** ------------- end useEffects ------------- */

  /** ------------- begin accessible text elements ------------- */
  const [titleInputErrorText, titleInputValidText] = AccessibleErrorValidTextElements({
    inputElementKind: "title",
    inputText: title,
    isInputTextFocused: isTitleFocused,
    isValidInputText: isValidTitle,
    regexValidationText: returnGrammarValidationText({
      content: title,
      contentKind: "title",
      minLength: 2,
      maxLength: 75,
    }),
  });

  const [authorInputErrorText, authorInputValidText] = AccessibleErrorValidTextElements({
    inputElementKind: "author",
    inputText: author,
    isInputTextFocused: isAuthorFocused,
    isValidInputText: isValidAuthor,
    regexValidationText: returnNameValidationText({
      content: author,
      contentKind: "author",
      minLength: 2,
      maxLength: 100,
    }),
  });

  const [bannerImgSrcInputErrorText, bannerImgSrcInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "banner image src",
      inputText: bannerImageSrc,
      isInputTextFocused: isBannerImageSrcFocused,
      isValidInputText: isValidBannerImageSrc,
      regexValidationText: returnUrlValidationText({
        content: bannerImageSrc,
        contentKind: "banner image src",
      }),
    });

  const [bannerImgAltInputErrorText, bannerImgAltInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "banner image alt",
      inputText: bannerImageAlt,
      isInputTextFocused: isBannerImageAltFocused,
      isValidInputText: isValidBannerImageAlt,
      regexValidationText: returnGrammarValidationText({
        content: bannerImageAlt,
        contentKind: "banner image alt",
        minLength: 2,
        maxLength: 75,
      }),
    });

  const [articleParagraphInputErrorTexts, articleParagraphInputValidTexts] =
    AccessibleErrorValidTextElementsForDynamicInputs({
      areInputTextsFocused: areArticleParagraphsFocused,
      areValidInputTexts: areValidArticleParagraphs,
      inputTextArray: article,
      semanticName: "article paragraph",
      regexValidationProps: article.map((paragraph) => ({
        content: paragraph,
        contentKind: "paragraph",
        minLength: 2,
        maxLength: 2000,
      })),
      regexValidationFunction: returnGrammarValidationText,
    });
  /** ------------- end accessible text elements ------------- */

  /** ------------- begin info objects for input creators ------------- */
  const titleTextInputCreatorInfo: AccessibleTextInputCreatorInfo = {
    description: {
      error: titleInputErrorText,
      valid: titleInputValidText,
    },
    inputText: title,
    isValidInputText: isValidTitle,
    label: "Article title",
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
    placeholder: "Enter article title",
    semanticName: "title",
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
    label: "Author",
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
    placeholder: "Enter author name",
    semanticName: "author",
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
    label: "Banner image src",
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
    placeholder: "Enter banner image src",
    semanticName: "banner image src",
  };

  const bannerImageAltTextInputCreatorInfo: AccessibleTextInputCreatorInfo = {
    description: {
      error: bannerImgAltInputErrorText,
      valid: bannerImgAltInputValidText,
    },
    inputText: bannerImageAlt,
    isValidInputText: isValidBannerImageAlt,
    label: "Banner image alt text",
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
    placeholder: "Enter banner image alt text",
    semanticName: "banner image alt",
  };

  const articleParagraphTextAreaInputsCreatorInfo: AccessibleTextAreaInputCreatorInfo[] =
    Array.from({ length: article.length }, (_, index) => {
      const deleteParagraphButtonCreatorInfo: AccessibleButtonCreatorInfo = {
        buttonDisabled: article.length === 1,
        buttonLabel: (
          <Tooltip label={`Delete paragraph ${index + 1}`}>
            <Group>
              <TbTrash />
              Delete
            </Group>
          </Tooltip>
        ),
        buttonOnClick: () => {
          createAnnouncementDispatch({
            type: createAnnouncementAction.setModifyArticleParagraph,
            payload: {
              index,
              kind: "delete",
            },
          });
        },
        semanticDescription: `Delete paragraph ${index + 1} button`,
        semanticName: "Delete paragraph button",
      };

      const insertParagraphButtonCreatorInfo: AccessibleButtonCreatorInfo = {
        buttonLabel: (
          <Tooltip label={`Insert paragraph between ${index} and ${index + 1}`}>
            <Group>
              <TbRowInsertTop />
              Insert
            </Group>
          </Tooltip>
        ),
        buttonOnClick: () => {
          createAnnouncementDispatch({
            type: createAnnouncementAction.setModifyArticleParagraph,
            payload: {
              index,
              kind: "insert",
            },
          });
        },
        semanticDescription: `Insert paragraph between ${index} and ${index + 1}`,
        semanticName: "Insert paragraph button",
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
        dynamicInputs: [createdDeleteParagraphButton, displayInsertParagraphButton],
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
        textAreaWidth: width < 480 ? 330 : width >= 1024 ? 1024 * 0.62 : width * 0.62,
      };

      return creatorInfoObject;
    });

  const addNewArticleParagraphButtonCreatorInfo: AccessibleButtonCreatorInfo = {
    buttonLabel: (
      <Tooltip label="Add new paragraph">
        <Group>
          <TbRowInsertBottom />
          Add
        </Group>
      </Tooltip>
    ),
    buttonOnClick: () => {
      createAnnouncementDispatch({
        type: createAnnouncementAction.setArticle,
        payload: {
          index: article.length,
          value: "",
        },
      });
    },
    semanticDescription: "click button to add new paragraph",
    semanticName: "add paragraph button",
  };

  const submitButtonCreatorInfo: AccessibleButtonCreatorInfo = {
    buttonLabel: "Submit",
    semanticDescription: "create announcement form submit button",
    semanticName: "submit button",
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
  /** ------------- end info objects for input creators ------------- */

  /** ------------- begin input creators ------------- */
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
  /** ------------- end input creators ------------- */

  /** ------------- begin input display ------------- */
  const displaySubmitButton =
    currentStepperPosition === CREATE_ANNOUNCEMENT_MAX_STEPPER_POSITION ? (
      <Tooltip
        label={
          stepsInError.size > 0
            ? "Please fix errors before submitting"
            : "Submit Announcement form"
        }
      >
        <Group w="100%" position="center">
          {createdSubmitButton}
        </Group>
      </Tooltip>
    ) : null;
  const displayAddArticleParagraphButton = createdAddNewArticleParagraphButton;

  const displayAnnouncementDetailsFormPage = (
    <FormLayoutWrapper>
      {createdTitleTextInput}
      {createdAuthorTextInput}
      {createdBannerImageSrcTextInput}
      {createdBannerImageAltTextInput}
    </FormLayoutWrapper>
  );

  const {
    generalColors: { redColorShade },
  } = returnThemeColors({
    themeObject,
    colorsSwatches: COLORS_SWATCHES,
  });

  const displayArticleParagraphsFormPage = (
    <FormLayoutWrapper>
      <Group position="apart" w="100%">
        <Title order={4}>{title}</Title>
        <Text>Max article length: {MAX_ARTICLE_LENGTH} characters</Text>
      </Group>
      {createdArticleParagraphsTextAreaInputs}
      <Group w="100%" position="apart">
        <Text>{`${timeToRead} min read`}</Text>

        {displayAddArticleParagraphButton}
      </Group>
      <Text>Current article length: {article.join(" ").length} characters</Text>
      {isArticleLengthExceeded ? (
        <Text color={redColorShade}>
          {`Maximum character length of ${MAX_ARTICLE_LENGTH} ${
            article.join(" ").length === MAX_ARTICLE_LENGTH ? "reached" : "exceeded"
          }`}
        </Text>
      ) : null}
    </FormLayoutWrapper>
  );

  const CREATE_ANNOUNCEMENT_REVIEW_OBJECT: FormReviewObjectArray = {
    "Announcement Details": [
      {
        inputName: "Article Title",
        inputValue: title,
        isInputValueValid: isValidTitle,
      },
      {
        inputName: "Author",
        inputValue: author,
        isInputValueValid: isValidAuthor,
      },
      {
        inputName: "Banner Image Src",
        inputValue: bannerImageSrc,
        isInputValueValid: isValidBannerImageSrc,
      },
      {
        inputName: "Banner Image Alt",
        inputValue: bannerImageAlt,
        isInputValueValid: isValidBannerImageAlt,
      },
    ],
  };

  const dynamicCreateAnnouncementFormReviewObject = createAnnouncementFormReviewObject({
    initialAnnouncementFormReviewObject: CREATE_ANNOUNCEMENT_REVIEW_OBJECT,
    article,
    areValidArticleParagraphs,
  });

  const displayCreateAnnouncementReviewPage = (
    <FormReviewPage
      formReviewObject={dynamicCreateAnnouncementFormReviewObject}
      formName="Create Announcement"
    />
  );

  const displaySubmitSuccessNotificationModal = (
    <NotificationModal
      onCloseCallbacks={[
        closeSubmitSuccessNotificationModal,
        () => {
          navigate("/home/outreach/announcement");
        },
      ]}
      opened={openedSubmitSuccessNotificationModal}
      notificationProps={{
        loading: isSubmitting,
        text: isSubmitting ? submitMessage : successMessage,
      }}
      title={<Title order={4}>{isSuccessful ? "Success!" : "Submitting ..."}</Title>}
    />
  );

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
      setCurrentStepperPosition={createAnnouncementAction.setCurrentStepperPosition}
      descriptionObjectsArray={CREATE_ANNOUNCEMENT_DESCRIPTION_OBJECTS}
      maxStepperPosition={CREATE_ANNOUNCEMENT_MAX_STEPPER_POSITION}
      parentComponentDispatch={createAnnouncementDispatch}
      stepsInError={stepsInError}
    >
      {displaySubmitSuccessNotificationModal}
      {displayCreateAnnouncementForm}
    </StepperWrapper>
  );
  /** ------------- end input display ------------- */
  return displayCreateAnnouncementComponent;
}

export default CreateAnnouncement;
