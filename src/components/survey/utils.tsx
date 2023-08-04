import { Group, Stack } from '@mantine/core';
import { Fragment } from 'react';

type MergeSurveyQuestionsGroupProps = {
  createdQuestionsTextInputs: JSX.Element[];
  createdResponseKindRadioGroups: JSX.Element[];
  createdResponseInputHtmlRadioGroups: JSX.Element[];
  createdResponseDataOptionsTextInputs: JSX.Element[][];
  createdAddNewResponseDataOptionButtons: (JSX.Element[] | null)[];
  displayAddNewQuestionButton?: JSX.Element | undefined | null;
};

function mergeSurveyQuestionsGroup({
  createdQuestionsTextInputs,
  createdResponseKindRadioGroups,
  createdResponseInputHtmlRadioGroups,
  createdResponseDataOptionsTextInputs,
  createdAddNewResponseDataOptionButtons,
  displayAddNewQuestionButton,
}: MergeSurveyQuestionsGroupProps) {
  return createdQuestionsTextInputs.map((createdQuestionsTextInput, index) => (
    <Stack key={`${index}`} w="100%">
      <Group w="100%" position="center">
        {displayAddNewQuestionButton ?? null}
      </Group>
      {createdQuestionsTextInput}
      {createdResponseKindRadioGroups[index]}
      {createdResponseInputHtmlRadioGroups[index]}
      {createdResponseDataOptionsTextInputs[index]}
      <Group w="100%" position="center">
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

  return questionsGroup.reduce((acc: JSX.Element[], curr, index) => {
    let tempArr: JSX.Element[] = [];

    if (counter < amount) {
      tempArr.push(curr);
      counter++;
    } else {
      tempArr = [];
      tempArr.push(curr);
      counter = 1;
    }

    return acc;
  }, []);
}

export { mergeSurveyQuestionsGroup, groupMergedQuestionsByAmount };
