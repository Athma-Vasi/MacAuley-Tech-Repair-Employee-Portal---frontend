import { Fragment, useEffect, useReducer } from 'react';
import {
  initialPreviewSurveyState,
  previewSurveyAction,
  previewSurveyReducer,
} from './state';
import { PreviewSurveyProps } from './types';
import {
  AccessibleCheckboxGroupInputCreatorInfo,
  AccessibleRadioGroupInputCreatorInfo,
  DescriptionObjectsArray,
  StepperWrapper,
} from '../../wrappers';
import { SurveyQuestion } from '../types';
import { Card, Group, Stack, Text, Tooltip } from '@mantine/core';
import { SURVEY_AGREE_DISAGREE_RESPONSE_DATA_OPTIONS } from '../constants';
import {
  returnAccessibleButtonElements,
  returnAccessibleCheckboxGroupInputsElements,
  returnAccessibleRadioGroupInputsElements,
} from '../../../jsxCreators';
import { CheckBoxMultipleData, RadioGroupInputData } from '../../../types';
import { CustomRating } from '../../customRating/CustomRating';
import { TbChartPie3, TbUpload } from 'react-icons/tb';
import { useGlobalState } from '../../../hooks';
import { logState, replaceLastCommaWithAnd } from '../../../utils';

function PreviewSurvey({
  surveyDescription,
  surveyQuestions,
  surveyTitle,
  closePreviewSurveyModal,
}: PreviewSurveyProps) {
  /** ------------- begin hooks ------------- */
  const [previewSurveyState, previewSurveyDispatch] = useReducer(
    previewSurveyReducer,
    initialPreviewSurveyState
  );
  const {
    surveyResponsesArray,
    questionsResponseInputMap,
    questionsResponseDataOptionsMap,

    stepperDescriptionsArray,
    currentStepperPosition,
    stepsInError,
  } = previewSurveyState;

  const {
    globalState: { width, padding, rowGap },
  } = useGlobalState();

  /** ------------- end hooks ------------- */

  /** ------------- begin useEffects ------------- */

  // set survey questions to state on mount
  useEffect(() => {
    if (!surveyQuestions) {
      return;
    }

    previewSurveyDispatch({
      type: previewSurveyAction.setSurveyQuestions,
      payload: surveyQuestions,
    });
  }, [surveyQuestions]);

  // set stepper descriptions on mount
  useEffect(() => {
    if (!surveyTitle || !surveyDescription || !surveyQuestions) {
      return;
    }

    const [questionsResponseInputMap, questionsResponseDataOptionsMap] =
      surveyQuestions.reduce(
        (acc, surveyQuestion: SurveyQuestion, idx) => {
          const { question, responseDataOptions, responseInput, responseKind } =
            surveyQuestion;

          acc[0].set(question, responseInput);
          acc[1].set(question, responseDataOptions);

          return acc;
        },
        [new Map(), new Map()]
      );

    const stepperDescriptionsArray: DescriptionObjectsArray =
      surveyQuestions.map((question) => {
        const stepperDescriptionObject = {
          ariaLabel: question.question,
          description:
            question.question.length > 23
              ? question.question.slice(0, 23) + '...'
              : question.question,
        };
        return stepperDescriptionObject;
      });

    previewSurveyDispatch({
      type: previewSurveyAction.setQuestionsResponseInputMap,
      payload: questionsResponseInputMap,
    });
    previewSurveyDispatch({
      type: previewSurveyAction.setQuestionsResponseDataOptionsMap,
      payload: questionsResponseDataOptionsMap,
    });
    previewSurveyDispatch({
      type: previewSurveyAction.setStepperDescriptionsArray,
      payload: stepperDescriptionsArray,
    });
  }, [surveyTitle, surveyDescription, surveyQuestions]);

  // check steps in error on every response / stepper position change
  useEffect(() => {
    // if there is no responses, then set the steps in error from current stepper position to zero (the beginning of the stepper)
    if (surveyResponsesArray.length === 0) {
      Array.from({ length: currentStepperPosition }).forEach((_, idx) => {
        previewSurveyDispatch({
          type: previewSurveyAction.setStepsInError,
          payload: {
            kind: 'add',
            step: idx,
          },
        });
      });
    }
    // if there are responses, check if any questions were skipped, or if any responses are empty strings, empty arrays or zero numbers
    else {
      if (surveyResponsesArray.length < currentStepperPosition) {
        // set the steps in error from the surveyResponses length to the current stepper position
        Array.from({
          length: currentStepperPosition - surveyResponsesArray.length,
        }).forEach((_, idx) => {
          previewSurveyDispatch({
            type: previewSurveyAction.setStepsInError,
            payload: {
              kind: 'add',
              step: surveyResponsesArray.length + idx,
            },
          });
        });
      }

      // iterate through responses and add or remove the step from the steps in error
      surveyResponsesArray.forEach((surveyResponse, idx) => {
        const { response } = surveyResponse;

        // the user did not respond to the question
        if (
          response === '' || // for 'radio' or 'agreeDisagree'
          (Array.isArray(response) && response.length === 0) || // for 'checkbox'
          response === 0 // for 'rating': 'emotion' or 'stars'
        ) {
          previewSurveyDispatch({
            type: previewSurveyAction.setStepsInError,
            payload: {
              kind: 'add',
              step: idx,
            },
          });
        } else {
          previewSurveyDispatch({
            type: previewSurveyAction.setStepsInError,
            payload: {
              kind: 'delete',
              step: idx,
            },
          });
        }
      });
    }
  }, [currentStepperPosition, surveyResponsesArray]);

  useEffect(() => {
    logState({
      state: previewSurveyState,
      groupLabel: 'previewSurveyState',
    });
  }, [previewSurveyState]);

  /** ------------- end useEffects ------------- */

  /** ------------- begin input creation ------------- */

  // loop through the survey questions and create the appropriate inputs
  const createdSurvey = surveyQuestions.reduce(
    (acc: Array<JSX.Element>, surveyQuestion, questionIdx) => {
      const { question, responseDataOptions, responseInput, responseKind } =
        surveyQuestion;

      const dynamicComponentProps = {
        genericProps: {
          question,
          rating: 0,
        },
        genericDispatch: previewSurveyDispatch,
      };

      // every survey's inputs are controlled
      switch (responseInput) {
        // agreeDisagree is a radio group with set values
        case 'agreeDisagree': {
          // const value = surveyResponsesArray.get(question) as string;
          const value = surveyResponsesArray.find(
            (q) => q?.question === question
          )?.response as string;

          const description = (
            <Text size="sm" aria-label="polite">{`You have selected: ${
              value ?? 'N/A'
            }`}</Text>
          );

          const radioInputCreatorInfoObj: AccessibleRadioGroupInputCreatorInfo =
            {
              dataObjectArray: SURVEY_AGREE_DISAGREE_RESPONSE_DATA_OPTIONS,
              description,
              key: `${questionIdx}-${question}-${responseInput}-${responseKind}`,
              label: question,
              onChange: (value: string) => {
                previewSurveyDispatch({
                  type: previewSurveyAction.setSurveyResponsesArray,
                  payload: {
                    question,
                    response: value,
                  },
                });
              },
              semanticName: question,
              value: value ?? '',
            };

          const [createdRadioInput] = returnAccessibleRadioGroupInputsElements([
            radioInputCreatorInfoObj,
          ]);

          const displayRadioInput = (
            <Fragment
              key={`${questionIdx}-${question}-${responseInput}-${responseKind}`}
            >
              {createdRadioInput}
            </Fragment>
          );

          acc[questionIdx] = displayRadioInput;
          break;
        }
        // radio is a radio group with dynamic values with constrained single selection
        case 'radio': {
          const dataObjectArray: RadioGroupInputData = responseDataOptions.map(
            (responseDataOption) => ({
              value: responseDataOption,
              label: responseDataOption,
            })
          );
          const value = surveyResponsesArray.find(
            (q) => q?.question === question
          )?.response as string;
          const description = (
            <Text size="sm" aria-label="polite">{`You have selected: ${
              value ?? 'N/A'
            }`}</Text>
          );

          const radioInputCreatorInfoObj: AccessibleRadioGroupInputCreatorInfo =
            {
              dataObjectArray,
              description,
              key: `${questionIdx}-${question}-${responseInput}-${responseKind}`,
              label: question,
              onChange: (value: string) => {
                previewSurveyDispatch({
                  type: previewSurveyAction.setSurveyResponsesArray,
                  payload: {
                    question,
                    response: value,
                  },
                });
              },
              semanticName: question,
              value: value ?? '',
            };

          const [createdRadioInput] = returnAccessibleRadioGroupInputsElements([
            radioInputCreatorInfoObj,
          ]);

          const displayRadioInput = (
            <Fragment
              key={`${questionIdx}-${question}-${responseInput}-${responseKind}`}
            >
              {createdRadioInput}
            </Fragment>
          );

          acc[questionIdx] = displayRadioInput;
          break;
        }
        // checkbox is a checkbox group with dynamic values with unconstrained multiple selections (array of strings)
        case 'checkbox': {
          const dataObjectArray: CheckBoxMultipleData = responseDataOptions.map(
            (responseDataOption) => ({
              value: responseDataOption,
              label: responseDataOption,
            })
          );
          const checkboxValue = surveyResponsesArray.find(
            (q) => q?.question === question
          )?.response as string[];
          const selectedValues = replaceLastCommaWithAnd(
            checkboxValue?.join(', ') ?? ''
          );
          const description = {
            selected: (
              <Text
                size="sm"
                aria-label="polite"
              >{`You have selected: ${selectedValues}`}</Text>
            ),
            deselected: (
              <Text size="sm" aria-label="polite">
                Choose as many as you would like.
              </Text>
            ),
          };

          const checkboxInputCreatorInfoObj: AccessibleCheckboxGroupInputCreatorInfo =
            {
              dataObjectArray,
              description,
              key: `${questionIdx}-${question}-${responseInput}-${responseKind}`,
              onChange: (value: string[]) => {
                previewSurveyDispatch({
                  type: previewSurveyAction.setSurveyResponsesArray,
                  payload: {
                    question,
                    response: value,
                  },
                });
              },
              semanticName: question,
              value: checkboxValue ?? [],
            };

          const [createdCheckboxInput] =
            returnAccessibleCheckboxGroupInputsElements([
              checkboxInputCreatorInfoObj,
            ]);

          const displayCheckboxInput = (
            <Fragment
              key={`${questionIdx}-${question}-${responseInput}-${responseKind}`}
            >
              {createdCheckboxInput}
            </Fragment>
          );

          acc[questionIdx] = displayCheckboxInput;
          break;
        }
        // emotion is a rating component with emojis as values from 1-5
        case 'emotion': {
          const value = surveyResponsesArray.find(
            (q) => q?.question === question
          )?.response as number;

          const createdEmotionRatingInput = (
            <CustomRating
              controlledValue={value ?? 0}
              question={question}
              ratingKind="emotion"
              dynamicComponentProps={dynamicComponentProps}
            />
          );

          const displayEmotionRatingInput = (
            <Fragment
              key={`${questionIdx}-${question}-${responseInput}-${responseKind}`}
            >
              {createdEmotionRatingInput}
            </Fragment>
          );

          acc[questionIdx] = displayEmotionRatingInput;
          break;
        }
        // stars is a rating component with stars as values from 1-5
        case 'stars': {
          const value = surveyResponsesArray.find(
            (q) => q?.question === question
          )?.response as number;

          const createdStarsRatingInput = (
            <CustomRating
              controlledValue={value ?? 0}
              question={question}
              ratingKind="stars"
              dynamicComponentProps={dynamicComponentProps}
            />
          );

          const displayStarsRatingInput = (
            <Fragment
              key={`${questionIdx}-${question}-${responseInput}-${responseKind}`}
            >
              {createdStarsRatingInput}
            </Fragment>
          );

          acc[questionIdx] = displayStarsRatingInput;
          break;
        }

        default:
          break;
      }

      return acc;
    },
    // create an initial array of arrays with the same length as uncompletedSurveys
    Array.from<JSX.Element>({ length: surveyQuestions.length })
  );

  // display the survey question's input based on the stepper position state
  const displaySurveyQuestion = (
    <Stack w="100%" p={padding}>
      {createdSurvey.slice(currentStepperPosition, currentStepperPosition + 1)}
    </Stack>
  );

  const createdSubmitButton = returnAccessibleButtonElements([
    {
      buttonLabel: 'Submit',
      buttonDisabled:
        surveyResponsesArray.length === 0 || stepsInError.size !== 0,
      semanticDescription: 'Submit survey',
      semanticName: 'Submit survey',
      buttonOnClick: () => {
        closePreviewSurveyModal();
      },
      leftIcon: <TbChartPie3 />,
      rightIcon: <TbUpload />,
    },
  ]);
  const displaySubmitButton = (
    <Tooltip label={'Will not submit response. Closes modal.'}>
      <Group w="100%" position="center">
        {createdSubmitButton}
      </Group>
    </Tooltip>
  );

  // if the stepper position is at the end of the stepper, display the submit button
  const displayPage =
    currentStepperPosition === stepperDescriptionsArray.length
      ? displaySubmitButton
      : displaySurveyQuestion;

  const createdStepperWrapper = (
    <StepperWrapper
      childrenTitle={surveyTitle}
      currentStepperPosition={currentStepperPosition}
      descriptionObjectsArray={stepperDescriptionsArray}
      maxStepperPosition={stepperDescriptionsArray.length}
      setCurrentStepperPosition={previewSurveyAction.setCurrentStepperPosition}
      stepsInError={stepsInError}
      parentComponentDispatch={previewSurveyDispatch}
    >
      <Stack w="100%">{displayPage}</Stack>
    </StepperWrapper>
  );

  const createdStepperCard = (
    <Card shadow="md" radius="md" withBorder w="100%">
      <Card.Section>{createdStepperWrapper}</Card.Section>
    </Card>
  );

  /** ------------- end input creation ------------- */

  return <>{createdStepperCard}</>;
}

export default PreviewSurvey;
