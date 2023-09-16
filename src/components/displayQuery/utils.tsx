import { Stack, Text, Title } from '@mantine/core';

const GROUP_BY_HELP_MODAL_CONTENT = (
  <Stack w="100%">
    <Title order={6}>How it works: </Title>
    <Text>
      'Group by' allows grouping of documents based on fields that have values
      that are known beforehand (such as select, radio, or checkbox inputs).
    </Text>
    <Text>
      Each radio option corresponds to a field in the document. Upon selection
      of a field, the results displayed in the table are grouped (ascending
      order) by the field's corresponding values. Any values that are not
      present are gathered under 'Rest of constrained values'.
    </Text>
    <Text>
      This allows flexibility in sorting, as a document with many fields can be
      grouped together and then the grouped by results sorted using the Query
      Builder's sort (a sort within a sort).
    </Text>
  </Stack>
);

export { GROUP_BY_HELP_MODAL_CONTENT };
