import { useEffect, useReducer, useRef } from "react";
import { initialAnnouncementState } from "./state";
import { Group, Stack, Text } from "@mantine/core";
import { useErrorBoundary } from "react-error-boundary";
import { useAuth } from "../../../hooks";
import { useFetchInterceptor } from "../../../hooks/useFetchInterceptor";
import { StepperPage } from "../../../types";
import { returnAnnouncementStepperPages } from "./constants";
import { AccessibleTextAreaInput } from "../../accessibleInputs/AccessibleTextAreaInput";
import { AnnouncementAction, announcementAction } from "./actions";
import { createAccessibleButtons } from "../../accessibleInputs/utils";
import { AccessibleButton } from "../../accessibleInputs/AccessibleButton";
import { announcementReducer } from "./reducers";
import { TEXT_AREA_INPUT_VALIDATIONS } from "../../../constants/validations";

function Announcement() {
  const [announcementState, announcementDispatch] = useReducer(
    announcementReducer,
    initialAnnouncementState
  );

  const {
    title,
    author,
    bannerImageSrc,
    bannerImageAlt,
    article,
    triggerFormSubmit,
    pagesInError,
    isSubmitting,
    isSuccessful,
  } = announcementState;

  const {
    authState: { sessionId, userId, username },
  } = useAuth();
  const { fetchInterceptor } = useFetchInterceptor();
  const { showBoundary } = useErrorBoundary();

  const fetchAbortControllerRef = useRef<AbortController | null>(null);
  const preFetchAbortControllerRef = useRef<AbortController | null>(null);
  const isComponentMountedRef = useRef(false);

  useEffect(() => {
    fetchAbortControllerRef.current?.abort();
    fetchAbortControllerRef.current = new AbortController();
    const fetchAbortController = fetchAbortControllerRef.current;

    preFetchAbortControllerRef.current?.abort();
    preFetchAbortControllerRef.current = new AbortController();
    const preFetchAbortController = preFetchAbortControllerRef.current;

    isComponentMountedRef.current = true;
    let isComponentMounted = isComponentMountedRef.current;

    if (triggerFormSubmit) {
      // formSubmitPOST({
      //   dispatch: addressChangeDispatch,
      //   fetchAbortController,
      //   fetchInterceptor,
      //   isComponentMounted,
      //   isSubmittingAction: addressChangeAction.setIsSubmitting,
      //   isSuccessfulAction: addressChangeAction.setIsSuccessful,
      //   preFetchAbortController,
      //   roleResourceRoutePaths: ADDRESS_CHANGE_ROLE_PATHS,
      //   schema,
      //   schemaName: "addressChangeSchema",
      //   sessionId,
      //   showBoundary,
      //   userId,
      //   username,
      //   userRole: "manager",
      // });
    }

    return () => {
      isComponentMountedRef.current = false;
      preFetchAbortController?.abort();
      fetchAbortController?.abort();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerFormSubmit]);

  if (isSubmitting) {
    const submittingState = (
      <Stack>
        <Text size="md">Submitting address changes! Please wait...</Text>
      </Stack>
    );

    return submittingState;
  }

  if (isSuccessful) {
    const successfulState = (
      <Stack>
        <Text size="md">Address changes submitted successfully!</Text>
      </Stack>
    );

    return successfulState;
  }

  /**
   * type AnnouncementState = {
  article: string[];
  author: string;
  bannerImageAlt: string;
  bannerImageSrc: string;
  isSubmitting: boolean;
  isSuccessful: boolean;
  pagesInError: Set<number>;
  title: string;
  triggerFormSubmit: boolean;
};
   */

  const ANNOUNCEMENT_STEPPER_PAGES: StepperPage[] = returnAnnouncementStepperPages();

  const articleTextAreaInputs = article.map((paragraph, index) => {
    ANNOUNCEMENT_STEPPER_PAGES[1].children.push({
      inputType: "text",
      name: `paragraph ${index + 1}`,
      validations: TEXT_AREA_INPUT_VALIDATIONS,
    });

    const paragraphTextAreaInput = (
      <AccessibleTextAreaInput<
        AnnouncementAction["setParagraph"],
        AnnouncementAction["setPageInError"]
      >
        attributes={{
          index,
          invalidValueAction: announcementAction.setPageInError,
          name: `paragraph ${index + 1}`,
          parentDynamicDispatch: announcementDispatch,
          stepperPages: ANNOUNCEMENT_STEPPER_PAGES,
          validValueAction: announcementAction.setParagraph,
          value: paragraph,
        }}
      />
    );

    const addParagraphButton = (
      <AccessibleButton
        attributes={{
          // disabled: false,
          disabledScreenreaderText: "Max article length reached",
          enabledScreenreaderText: `Add new paragraph: ${index + 1}`,
          kind: "add",
          label: "",
          name: "add",
          onClick: (
            _event:
              | React.MouseEvent<HTMLButtonElement, MouseEvent>
              | React.PointerEvent<HTMLButtonElement>
          ) => {
            announcementDispatch({
              action: announcementAction.addParagraph,
              payload: null,
            });
          },
        }}
      />
    );

    const removeParagraphButton = (
      <AccessibleButton
        attributes={{
          // disabled:false,
          name: "delete",
          kind: "delete",
          label: "",
          onClick: (
            _event:
              | React.MouseEvent<HTMLButtonElement, MouseEvent>
              | React.PointerEvent<HTMLButtonElement>
          ) => {
            announcementDispatch({
              action: announcementAction.removeParagraph,
              payload: index,
            });
          },
        }}
      />
    );

    const insertParagraphButton = (
      <AccessibleButton
        attributes={{
          // disabled: false,
          enabledScreenreaderText: `Insert paragraph between ${index} and ${index + 1}`,
          kind: "insert",
          label: "",
          name: "insert",
          onClick: (
            _event:
              | React.MouseEvent<HTMLButtonElement, MouseEvent>
              | React.PointerEvent<HTMLButtonElement>
          ) => {
            announcementDispatch({
              action: announcementAction.insertParagraph,
              payload: index,
            });
          },
        }}
      />
    );

    const slideParagraphUpButton = (
      <AccessibleButton
        attributes={{
          // disabled: false,
          enabledScreenreaderText: `Move paragraph ${index + 1} up`,
          kind: "up",
          label: "",
          name: "up",
          onClick: (
            _event:
              | React.MouseEvent<HTMLButtonElement, MouseEvent>
              | React.PointerEvent<HTMLButtonElement>
          ) => {
            announcementDispatch({
              action: announcementAction.slideParagraphUp,
              payload: index,
            });
          },
        }}
      />
    );

    const slideParagraphDownButton = (
      <AccessibleButton
        attributes={{
          // disabled: false,
          enabledScreenreaderText: `Move paragraph ${index + 1} down`,
          kind: "down",
          label: "",
          name: "down",
          onClick: (
            _event:
              | React.MouseEvent<HTMLButtonElement, MouseEvent>
              | React.PointerEvent<HTMLButtonElement>
          ) => {
            announcementDispatch({
              action: announcementAction.slideParagraphDown,
              payload: index,
            });
          },
        }}
      />
    );

    const paragraphButtons = (
      <Group>
        {addParagraphButton}
        {removeParagraphButton}
        {insertParagraphButton}
        {slideParagraphUpButton}
        {slideParagraphDownButton}
      </Group>
    );

    const paragraphGroup = (
      <Group>
        {paragraphTextAreaInput}
        {paragraphButtons}
      </Group>
    );

    return paragraphGroup;
  });

  const announcementForm = <Group>{articleTextAreaInputs}</Group>;

  return announcementForm;
}

export default Announcement;

/**
 * const {
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
  

  
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    async function announcementFormSubmit() {
      announcementDispatch({
        type: announcementAction.setIsSubmitting,
        payload: true,
      });
      announcementDispatch({
        type: announcementAction.setSubmitMessage,
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

        announcementDispatch({
          type: announcementAction.setIsSuccessful,
          payload: true,
        });
        announcementDispatch({
          type: announcementAction.setSuccessMessage,
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
        announcementDispatch({
          type: announcementAction.setIsSubmitting,
          payload: false,
        });
        announcementDispatch({
          type: announcementAction.setSubmitMessage,
          payload: "",
        });
        announcementDispatch({
          type: announcementAction.setTriggerFormSubmit,
          payload: false,
        });
      }
    }

    if (triggerFormSubmit) {
      announcementFormSubmit();
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

    announcementDispatch({
      type: announcementAction.setIsValidTitle,
      payload: isValidTtl,
    });
  }, [title]);

  // validate author on every change
  useEffect(() => {
    const isValidAuth = FULL_NAME_REGEX.test(author);

    announcementDispatch({
      type: announcementAction.setIsValidAuthor,
      payload: isValidAuth,
    });
  }, [author]);

  // validate banner image src on every change
  useEffect(() => {
    const isValidBannerUrl = URL_REGEX.test(bannerImageSrc);

    announcementDispatch({
      type: announcementAction.setIsValidBannerImageSrc,
      payload: isValidBannerUrl,
    });
  }, [bannerImageSrc]);

  // validate banner image alt on every change
  useEffect(() => {
    const isValidBannerAlt = GRAMMAR_TEXT_INPUT_REGEX.test(bannerImageAlt);

    announcementDispatch({
      type: announcementAction.setIsValidBannerImageAlt,
      payload: isValidBannerAlt,
    });
  }, [bannerImageAlt]);

  // validate article arr on every change
  useEffect(() => {
    const isValidArticleBoolArr = article.map((paragraph) =>
      GRAMMAR_TEXTAREA_INPUT_REGEX.test(paragraph)
    );

    announcementDispatch({
      type: announcementAction.setAreValidArticleParagraphs,
      payload: isValidArticleBoolArr,
    });
  }, [article]);

  // validate article length on every change
  useEffect(() => {
    const isValidArticleLength = article.join(" ").length >= MAX_ARTICLE_LENGTH;

    announcementDispatch({
      type: announcementAction.setIsArticleLengthExceeded,
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

    announcementDispatch({
      type: announcementAction.setTimeToRead,
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

    announcementDispatch({
      type: announcementAction.setPageInError,
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

    announcementDispatch({
      type: announcementAction.setPageInError,
      payload: {
        kind: isStepInError ? "add" : "delete",
        step: 1,
      },
    });
  }, [areValidArticleParagraphs, isArticleLengthExceeded]);

  useEffect(() => {
    logState({
      state: announcementState,
      groupLabel: "create announcement state",
    });
  }, [announcementState]);
  

  
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
  

  
  const titleTextInputCreatorInfo: AccessibleTextInputCreatorInfo = {
    description: {
      error: titleInputErrorText,
      valid: titleInputValidText,
    },
    inputText: title,
    isValidInputText: isValidTitle,
    label: "Article title",
    onBlur: () => {
      announcementDispatch({
        type: announcementAction.setIsTitleFocused,
        payload: false,
      });
    },
    onChange: (event) => {
      announcementDispatch({
        type: announcementAction.setTitle,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      announcementDispatch({
        type: announcementAction.setIsTitleFocused,
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
      announcementDispatch({
        type: announcementAction.setIsAuthorFocused,
        payload: false,
      });
    },
    onChange: (event) => {
      announcementDispatch({
        type: announcementAction.setAuthor,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      announcementDispatch({
        type: announcementAction.setIsAuthorFocused,
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
      announcementDispatch({
        type: announcementAction.setIsBannerImageSrcFocused,
        payload: false,
      });
    },
    onChange: (event) => {
      announcementDispatch({
        type: announcementAction.setBannerImageSrc,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      announcementDispatch({
        type: announcementAction.setIsBannerImageSrcFocused,
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
      announcementDispatch({
        type: announcementAction.setIsBannerImageAltFocused,
        payload: false,
      });
    },
    onChange: (event) => {
      announcementDispatch({
        type: announcementAction.setBannerImageAlt,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      announcementDispatch({
        type: announcementAction.setIsBannerImageAltFocused,
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
          announcementDispatch({
            type: announcementAction.removeParagraph,
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
          announcementDispatch({
            type: announcementAction.removeParagraph,
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
          announcementDispatch({
            type: announcementAction.setAreArticleParagraphsFocused,
            payload: {
              index,
              value: false,
            },
          });
        },
        onChange: (event: ChangeEvent<HTMLTextAreaElement>) => {
          announcementDispatch({
            type: announcementAction.addParagraph,
            payload: {
              index,
              value: event.currentTarget.value,
            },
          });
        },
        onFocus: () => {
          announcementDispatch({
            type: announcementAction.setAreArticleParagraphsFocused,
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
      announcementDispatch({
        type: announcementAction.addParagraph,
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
      announcementDispatch({
        type: announcementAction.setTriggerFormSubmit,
        payload: true,
      });
    },
    // ensures form submit happens only once
    buttonDisabled: pagesInError.size > 0 || triggerFormSubmit,
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
    currentStepperPosition === ANNOUNCEMENT_MAX_STEPPER_POSITION ? (
      <Tooltip
        label={
          pagesInError.size > 0
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

  const ANNOUNCEMENT_REVIEW_OBJECT: FormReviewObjectArray = {
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

  const dynamicAnnouncementFormReviewObject = announcementFormReviewObject({
    initialAnnouncementFormReviewObject: ANNOUNCEMENT_REVIEW_OBJECT,
    article,
    areValidArticleParagraphs,
  });

  const displayAnnouncementReviewPage = (
    <FormReviewPage
      formReviewObject={dynamicAnnouncementFormReviewObject}
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

  const displayAnnouncementForm =
    currentStepperPosition === 0
      ? displayAnnouncementDetailsFormPage
      : currentStepperPosition === 1
      ? displayArticleParagraphsFormPage
      : currentStepperPosition === 2
      ? displayAnnouncementReviewPage
      : displaySubmitButton;

  const displayAnnouncementComponent = (
    <StepperWrapper
      childrenTitle="Create Announcement"
      currentStepperPosition={currentStepperPosition}
      setCurrentStepperPosition={announcementAction.setCurrentStepperPosition}
      descriptionObjectsArray={ANNOUNCEMENT_DESCRIPTION_OBJECTS}
      maxStepperPosition={ANNOUNCEMENT_MAX_STEPPER_POSITION}
      parentComponentDispatch={announcementDispatch}
      pagesInError={pagesInError}
    >
      {displaySubmitSuccessNotificationModal}
      {displayAnnouncementForm}
    </StepperWrapper>
  );
  
  return displayAnnouncementComponent;

 */
