import { Flex, Group, Text } from '@mantine/core';

const SURVEY_BUILDER_HELP_TEXT = (
  <Flex direction="column" align="center" justify="flex-start" rowGap="xs">
    <Text>
      <strong>Question: </strong>Enter a question for your survey. Your survey
      can have multiple questions (currently a maximum of 3).
    </Text>
    <Group w="100%" position="left" pl="sm">
      <Text>Example: How do you typically commute to work?</Text>
    </Group>

    <Text>
      <strong>Response kind:</strong> Select the type of response you want to
      collect for your question from the entered options. Choose 'Choose one'
      for a single response, or 'Choose any' for multiple responses, or 'Rating'
      for a rating.
    </Text>
    <Group w="100%" position="left" pl="sm">
      <Text>
        Example: 'Choose one' or 'Choose any' for answer relating to commute.
      </Text>
    </Group>

    <Text>
      <strong>Input kind</strong>: Select the type of HTML input you want to use
      for your response. Currently, there are 'Agree/Disagree', 'Radio',
      'Checkbox', and 'Emotion', 'Stars'.
    </Text>
    <Group w="100%" position="left" pl="sm">
      <Text>
        Example: 'Radio' to constrain response to single choice. 'Checkbox' to
        allow multiple choices.
      </Text>
    </Group>

    <Text>
      <strong>Response data options:</strong> Enter the response data options
      for your question (currently a maximum of 7 options per question).
    </Text>
    <Group w="100%" position="left" pl="sm">
      <Text>
        Example: 'Personal vehicle', 'Public transport', 'Ride share', etc. Each
        response data option input corresponds to a choice.
      </Text>
    </Group>
  </Flex>
);

export { SURVEY_BUILDER_HELP_TEXT };
