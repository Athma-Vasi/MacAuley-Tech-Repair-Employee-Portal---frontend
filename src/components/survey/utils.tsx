import { Group, Stack } from '@mantine/core';

import { addFieldsToObject, splitCamelCase } from '../../utils';
import { FormReviewObject } from '../formReviewPage/FormReviewPage';
import { SurveyQuestions } from './create/types';
import { SurveyResponseInput, SurveyResponseKind } from './types';

type MergeSurveyQuestionsGroupProps = {
  createdQuestionsTextInputs: JSX.Element[];
  createdResponseKindRadioGroups: JSX.Element[];
  createdResponseInputHtmlRadioGroups: JSX.Element[];
  createdResponseDataOptionsTextInputs: (JSX.Element[] | null)[];
  createdAddNewResponseDataOptionButtons: (JSX.Element[] | null)[];
  createdHelpButton: JSX.Element;
  displayAddNewQuestionButton?: JSX.Element | undefined | null;
};

function mergeSurveyQuestionsGroup({
  createdQuestionsTextInputs,
  createdResponseKindRadioGroups,
  createdResponseInputHtmlRadioGroups,
  createdResponseDataOptionsTextInputs,
  createdAddNewResponseDataOptionButtons,
  createdHelpButton,
  displayAddNewQuestionButton,
}: MergeSurveyQuestionsGroupProps) {
  return createdQuestionsTextInputs.map((createdQuestionsTextInput, index) => (
    <Stack key={`${index}`} w="100%">
      <Group w="100%" position="apart">
        {createdHelpButton}
        {displayAddNewQuestionButton ?? null}
      </Group>
      {createdQuestionsTextInput}
      {createdResponseKindRadioGroups[index]}
      {createdResponseInputHtmlRadioGroups[index]}
      {createdResponseDataOptionsTextInputs?.[index]}
      <Group w="100%" position="right">
        {createdAddNewResponseDataOptionButtons?.[index]}
      </Group>
    </Stack>
  ));
}

type GroupMergedQuestionsByAmountProps = {
  questionsGroup: JSX.Element[];
  amount: number;
};

function groupMergedQuestionsByAmount({
  questionsGroup,
  amount,
}: GroupMergedQuestionsByAmountProps): JSX.Element[] {
  let counter = 0;

  return questionsGroup.reduce((acc: JSX.Element[], curr) => {
    let tempArr: JSX.Element[] = [];

    if (counter < amount) {
      tempArr.push(curr);
      counter += 1;
    } else {
      tempArr = [];
      tempArr.push(curr);
      counter = 1;
    }

    return acc;
  }, []);
}

type SetSurveyQuestionsInput = {
  questions: string[];
  responseKinds: string[];
  responseInputHtml: string[];
  responseDataOptionsArray: string[][];
};

function setSurveyQuestions({
  questions,
  responseKinds,
  responseInputHtml,
  responseDataOptionsArray,
}: SetSurveyQuestionsInput): SurveyQuestions[] {
  // replace empty values in responseDataOptionsArray with empty array
  // because dynamic input creation in SurveyBuilder.tsx creates empty values in responseDataOptionsArray, areResponseDataOptions${Valid, Focused}
  // @see https://stackoverflow.com/questions/61700308/replace-the-empty-element-of-an-array-with-another-array-or-with-another-element
  responseDataOptionsArray = Array.from(responseDataOptionsArray, (arr, idx) =>
    idx in responseDataOptionsArray ? arr : []
  );

  return questions.reduce(
    (surveyQuestions: SurveyQuestions[], question, questionIdx) => {
      const surveyObject = addFieldsToObject({
        object: Object.create(null),
        fieldValuesTuples: [
          ['question', question],
          ['responseKind', responseKinds[questionIdx]],
          ['responseInput', responseInputHtml[questionIdx]],
          [
            'responseDataOptions',
            questionIdx > responseDataOptionsArray.length - 1
              ? []
              : responseDataOptionsArray[questionIdx],
          ] ?? [],
        ],
      }) as SurveyQuestions;
      surveyQuestions.push(surveyObject);

      return surveyQuestions;
    },
    []
  );
}

type CreateSurveyFormReviewObjectInput = {
  initialFormReviewObject: FormReviewObject;
  questions: string[];
  areValidQuestions: boolean[];
  responseKinds: string[];
  responseInputHtml: string[];
  responseDataOptionsArray: string[][];
  areResponseDataOptionsValid: boolean[][];
};
/**
 * @description Pure function. Creates a new form review object from dynamically created inputs in SurveyBuilder.tsx.
 */
function createSurveyFormReviewObject({
  initialFormReviewObject,
  questions,
  areValidQuestions,
  responseKinds,
  responseInputHtml,
  responseDataOptionsArray,
  areResponseDataOptionsValid,
}: CreateSurveyFormReviewObjectInput): FormReviewObject {
  // only add to form review object if there are questions
  if (questions.length === 1 && questions[0] === '') {
    return initialFormReviewObject;
  }

  const formReviewObject = questions.reduce(
    (formReviewObjectAcc: FormReviewObject, question: string, questionIdx) => {
      // create question field in form review object
      const modifiedQuestion = `Question ${questionIdx + 1}`;
      formReviewObjectAcc[modifiedQuestion] = [];

      // add question to form review object
      {
        const inputName = 'Question';
        const inputValue = question;
        const isInputValueValid = areValidQuestions[questionIdx];

        formReviewObjectAcc[modifiedQuestion].push({
          inputName,
          inputValue,
          isInputValueValid,
        });
      }

      // add response type to form review object
      {
        const inputName = 'Response type';
        const inputValue = splitCamelCase(responseKinds[questionIdx]);
        const isInputValueValid = true;

        formReviewObjectAcc[modifiedQuestion].push({
          inputName,
          inputValue,
          isInputValueValid,
        });
      }

      // add response input to form review object
      const inputName = 'Response input';
      const inputValue = splitCamelCase(responseInputHtml[questionIdx]);
      const isInputValueValid = true;

      formReviewObjectAcc[modifiedQuestion].push({
        inputName,
        inputValue,
        isInputValueValid,
      });

      // only add response data options to form review object if there are response data options
      if (!responseDataOptionsArray[questionIdx]) {
        return formReviewObjectAcc;
      }

      // add response data options to form review object
      const questionObjectArray = responseDataOptionsArray[questionIdx].map(
        (responseDataOption: string, responseDataOptionIdx) => {
          const inputName = `Option ${responseDataOptionIdx + 1}`;
          const inputValue = responseDataOption;
          const isInputValueValid =
            areResponseDataOptionsValid[questionIdx][responseDataOptionIdx];

          return {
            inputName,
            inputValue,
            isInputValueValid,
          };
        }
      );
      formReviewObjectAcc[modifiedQuestion].push(...questionObjectArray);

      return formReviewObjectAcc;
    },
    structuredClone(initialFormReviewObject)
  );

  return formReviewObject;
}

export {
  createSurveyFormReviewObject,
  groupMergedQuestionsByAmount,
  mergeSurveyQuestionsGroup,
  setSurveyQuestions,
};
