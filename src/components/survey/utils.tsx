import { Group, Stack } from "@mantine/core";

import { addFieldsToObject } from "../../utils";
import type { SurveyQuestions } from "./create/types";

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
    <Stack key={index.toString()} w="100%">
      {createdQuestionsTextInput}
      {createdResponseKindRadioGroups[index]}
      {createdResponseInputHtmlRadioGroups[index]}
      {createdResponseDataOptionsTextInputs?.[index]}

      <Group w="100%" position="apart">
        <Group position="left">{createdHelpButton}</Group>

        <Group position={displayAddNewQuestionButton ? "left" : "right"}>
          {createdAddNewResponseDataOptionButtons?.[index]}
        </Group>
        <Group position="right">{displayAddNewQuestionButton ?? null}</Group>
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
  responseInputs: string[];
  responseOptions: string[][];
};

function setSurveyQuestions({
  questions,
  responseKinds,
  responseInputs,
  responseOptions,
}: SetSurveyQuestionsInput): SurveyQuestions[] {
  // replace empty values in responseOptions with empty array
  // because dynamic input creation in Survey.tsx creates empty values in responseOptions, areResponseDataOptions${Valid, Focused}
  // @see https://stackoverflow.com/questions/61700308/replace-the-empty-element-of-an-array-with-another-array-or-with-another-element
  responseOptions = Array.from(
    responseOptions,
    (arr, idx) => idx in responseOptions ? arr : [],
  );

  return questions.reduce(
    (surveyQuestions: SurveyQuestions[], question, questionIdx) => {
      const surveyObject = addFieldsToObject({
        object: Object.create(null),
        fieldValuesTuples: [
          ["question", question],
          ["responseKind", responseKinds[questionIdx]],
          ["responseInput", responseInputs[questionIdx]],
          [
            "responseDataOptions",
            questionIdx > responseOptions.length - 1
              ? []
              : responseOptions[questionIdx],
          ],
        ],
      }) as SurveyQuestions;
      surveyQuestions.push(surveyObject);

      return surveyQuestions;
    },
    [],
  );
}

// type CreateSurveyFormReviewObjectInput = {
//   initialFormReviewObject: FormReviewObjec;
//   questions: string[];
//   areValidQuestions: boolean[];
//   responseKinds: string[];
//   responseInputs: string[];
//   responseOptions: string[][];
//   areResponseDataOptionsValid: boolean[][];
// };
// /**
//  * @description Pure function. Creates a new form review object from dynamically created inputs in Survey.tsx.
//  */
// function createSurveyFormReviewObject({
//   initialFormReviewObject,
//   questions,
//   areValidQuestions,
//   responseKinds,
//   responseInputs,
//   responseOptions,
//   areResponseDataOptionsValid,
// }: CreateSurveyFormReviewObjectInput): FormReviewObjectArray {
//   // only add to form review object if there are questions
//   if (questions.length === 1 && questions[0] === "") {
//     return initialFormReviewObject;
//   }

//   const formReviewObject = questions.reduce(
//     (
//       formReviewObjectAcc: FormReviewObjectArray,
//       question: string,
//       questionIdx,
//     ) => {
//       // create question field in form review object
//       const modifiedQuestion = `Question ${questionIdx + 1}`;
//       formReviewObjectAcc[modifiedQuestion] = [];

//       // add question to form review object
//       {
//         const inputName = "Question";
//         const inputValue = question;
//         const isInputValueValid = areValidQuestions[questionIdx];

//         formReviewObjectAcc[modifiedQuestion].push({
//           inputName,
//           inputValue,
//           isInputValueValid,
//         });
//       }

//       // add response type to form review object
//       {
//         const inputName = "Response type";
//         const inputValue = splitCamelCase(responseKinds[questionIdx]);
//         const isInputValueValid = true;

//         formReviewObjectAcc[modifiedQuestion].push({
//           inputName,
//           inputValue,
//           isInputValueValid,
//         });
//       }

//       // add response input to form review object
//       const inputName = "Response input";
//       const inputValue = splitCamelCase(responseInputs[questionIdx]);
//       const isInputValueValid = true;

//       formReviewObjectAcc[modifiedQuestion].push({
//         inputName,
//         inputValue,
//         isInputValueValid,
//       });

//       // only add response data options to form review object if there are response data options
//       if (!responseOptions[questionIdx]) {
//         return formReviewObjectAcc;
//       }

//       // add response data options to form review object
//       const questionObjectArray = responseOptions[questionIdx].map(
//         (responseDataOption: string, responseDataOptionIdx) => {
//           const inputName = `Option ${responseDataOptionIdx + 1}`;
//           const inputValue = responseDataOption;
//           const isInputValueValid =
//             areResponseDataOptionsValid[questionIdx][responseDataOptionIdx];

//           return {
//             inputName,
//             inputValue,
//             isInputValueValid,
//           };
//         },
//       );
//       formReviewObjectAcc[modifiedQuestion].push(...questionObjectArray);

//       return formReviewObjectAcc;
//     },
//     structuredClone(initialFormReviewObject),
//   );

//   return formReviewObject;
// }

export {
  groupMergedQuestionsByAmount,
  mergeSurveyQuestionsGroup,
  setSurveyQuestions,
};
