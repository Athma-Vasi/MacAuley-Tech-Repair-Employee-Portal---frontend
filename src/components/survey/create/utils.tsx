import { Flex, Group, Text } from "@mantine/core";

import { PROPERTY_DESCRIPTOR } from "../../../constants/data";
import { CheckboxRadioSelectData } from "../../../types";
import { INDEX_ALPHABET_TABLE } from "../constants";
import { SurveyResponseInput, SurveyResponseKind } from "../types";
import { SurveyState } from "./types";

const SURVEY_HELP_TEXT = (
  <Flex direction="column" align="center" justify="flex-start" rowGap="xs">
    <Text>
      <strong>Question: </strong>Enter a question for your survey. Your survey can have
      multiple questions (currently a maximum of 3).
    </Text>
    <Group w="100%" position="left" pl="sm">
      <Text>Example: How do you typically commute to work?</Text>
    </Group>

    <Text>
      <strong>Response kind:</strong> Select the type of response you want to collect for
      your question from the entered options. Choose 'Choose one' for a single response,
      or 'Choose any' for multiple responses, or 'Rating' for a rating.
    </Text>
    <Group w="100%" position="left" pl="sm">
      <Text>Example: 'Choose one' or 'Choose any' for answer relating to commute.</Text>
    </Group>

    <Text>
      <strong>Input kind</strong>: Select the type of HTML input you want to use for your
      response. Currently, there are 'Agree/Disagree', 'Radio', 'Checkbox', and 'Emotion',
      'Stars'.
    </Text>
    <Group w="100%" position="left" pl="sm">
      <Text>
        Example: 'Radio' to constrain response to single choice. 'Checkbox' to allow
        multiple choices.
      </Text>
    </Group>

    <Text>
      <strong>Response data options:</strong> Enter the response data options for your
      question (currently a maximum of 7 options per question).
    </Text>
    <Group w="100%" position="left" pl="sm">
      <Text>
        Example: 'Personal vehicle', 'Public transport', 'Ride share', etc. Each response
        data option input corresponds to a choice.
      </Text>
    </Group>
  </Flex>
);

function returnCorrectResponseInputData(
  responseKind: SurveyResponseKind
): CheckboxRadioSelectData<SurveyResponseInput> {
  return responseKind === "chooseOne"
    ? [{ label: "Radio", value: "radio" }]
    : responseKind === "chooseAny"
    ? [{ label: "Checkbox", value: "checkbox" }]
    : [
        { label: "Emotion", value: "emotion" },
        { label: "Stars", value: "stars" },
      ];
}

/** flattens state into stepper-friendly format for review page */
function makeSurveyStateForStepper(state: SurveyState): SurveyState {
  return Object.entries(state).reduce<SurveyState>((stateAcc, [stateKey, stateValue]) => {
    switch (stateKey) {
      case "questions": {
        Array.isArray(stateValue)
          ? stateValue.forEach((question, questionIdx) => {
              Object.defineProperty(stateAcc, `question ${questionIdx + 1}`, {
                value: question,
                ...PROPERTY_DESCRIPTOR,
              });
            })
          : void 0;

        break;
      }

      case "responseKinds": {
        Array.isArray(stateValue)
          ? stateValue.forEach((responseKind, responseKindIdx) => {
              Object.defineProperty(stateAcc, `responseKinds ${responseKindIdx + 1}`, {
                value: responseKind,
                ...PROPERTY_DESCRIPTOR,
              });
            })
          : void 0;

        break;
      }

      case "responseInputs": {
        Array.isArray(stateValue)
          ? stateValue.forEach((responseInput, responseInputIdx) => {
              Object.defineProperty(stateAcc, `responseInputs ${responseInputIdx + 1}`, {
                value: responseInput,
                ...PROPERTY_DESCRIPTOR,
              });
            })
          : void 0;

        break;
      }

      case "responseOptions": {
        Array.isArray(stateValue)
          ? stateValue.forEach((responseOptions, responseOptionsIdx) => {
              Array.isArray(responseOptions)
                ? responseOptions.forEach((responseOption, responseOptionIdx) => {
                    Object.defineProperty(
                      stateAcc,
                      `responseOption ${responseOptionsIdx + 1} ${
                        INDEX_ALPHABET_TABLE[responseOptionIdx] ?? responseOptionIdx + 1
                      }`,
                      {
                        value: responseOption,
                        ...PROPERTY_DESCRIPTOR,
                      }
                    );
                  })
                : void 0;
            })
          : void 0;

        break;
      }

      default: {
        Object.defineProperty(stateAcc, stateKey, {
          value: stateValue,
          ...PROPERTY_DESCRIPTOR,
        });

        break;
      }
    }

    return stateAcc;
  }, Object.create(null));
}

export { makeSurveyStateForStepper, returnCorrectResponseInputData, SURVEY_HELP_TEXT };
