import { Fragment } from 'react';

type MergeSurveyQuestionsGroupProps = {
  createdQuestionsTextInputs: JSX.Element[];
  createdResponseKindRadioGroups: JSX.Element[];
  createdResponseInputHtmlRadioGroups: JSX.Element[];
  displayAddNewQuestionButton?: JSX.Element | undefined | null;
};

function mergeSurveyQuestionsGroup({
  createdQuestionsTextInputs,
  createdResponseKindRadioGroups,
  createdResponseInputHtmlRadioGroups,
  displayAddNewQuestionButton,
}: MergeSurveyQuestionsGroupProps) {
  return createdQuestionsTextInputs.map((createdQuestionsTextInput, index) => (
    <Fragment key={`${index}`}>
      {createdQuestionsTextInput}
      {createdResponseKindRadioGroups[index]}
      {createdResponseInputHtmlRadioGroups[index]}
      {displayAddNewQuestionButton ?? null}
    </Fragment>
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
