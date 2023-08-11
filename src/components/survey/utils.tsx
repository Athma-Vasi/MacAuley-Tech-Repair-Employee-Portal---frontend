import { Group, Stack } from '@mantine/core';

import { addFieldsToObject } from '../../utils';
import { SurveyResponseInput, SurveyResponseKind } from './types';
import { SurveyQuestions } from './surveyBuilder/types';

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

export {
  groupMergedQuestionsByAmount,
  mergeSurveyQuestionsGroup,
  setSurveyQuestions,
};
