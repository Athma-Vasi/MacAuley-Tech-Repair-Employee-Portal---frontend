import {
  Grid,
  Group,
  Spoiler,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { useGlobalState } from '../../hooks';
import { COLORS_SWATCHES } from '../../constants/data';
import { TbArrowDown, TbArrowUp } from 'react-icons/tb';
import { returnAccessibleButtonElements } from '../../jsxCreators';

type FormReviewObject = Record<
  string, // page name
  Array<{
    inputName: string;
    inputValue?: string;
    isInputValueValid?: boolean;
  }>
>;

type FormReviewPageProps = {
  formReviewObject: FormReviewObject;
  formName?: string;
};

function FormReviewPage({
  formReviewObject,
  formName = 'Form review',
}: FormReviewPageProps) {
  const {
    globalState: {
      themeObject: { colorScheme, primaryShade },
      padding,
      rowGap,
    },
  } = useGlobalState();

  const { gray, red } = COLORS_SWATCHES;

  const borderColorGray =
    colorScheme === 'light' ? `1px solid ${gray[3]}` : `1px solid ${gray[8]}`;
  const borderColorRed =
    colorScheme === 'light'
      ? `1px solid ${red[primaryShade.light]}`
      : `1px solid ${red[primaryShade.dark]}`;

  const textColorRed =
    colorScheme === 'light' ? red[primaryShade.light] : red[primaryShade.dark];

  const displayFormReviewStack = Object.entries(formReviewObject).map(
    ([pageName, pageObjectArr], index) => {
      const displayPageName = (
        <Title order={5} style={{ marginTop: 16 }}>
          {pageName}
        </Title>
      );

      const displayPageSection = pageObjectArr.map((pageObject, index) => {
        const { inputName, isInputValueValid = true } = pageObject;
        const { inputValue = isInputValueValid ? 'Yes' : 'No' } = pageObject;

        const displayInputName = (
          <Text color={isInputValueValid ? undefined : textColorRed}>
            {inputName}
          </Text>
        );

        const [showLabelButton, hideLabelButton] =
          returnAccessibleButtonElements([
            {
              buttonLabel: 'Show',
              semanticDescription: 'Show button to show the hidden text',
              semanticName: `button to show ${inputName} input text`,
              leftIcon: <TbArrowDown />,
            },
            {
              buttonLabel: 'Hide',
              semanticDescription: 'Hide button to hide the shown text',
              semanticName: `button to hide ${inputName} input text`,
              leftIcon: <TbArrowUp />,
            },
          ]);

        const displayValue = (
          <Spoiler
            maxHeight={131}
            showLabel={showLabelButton}
            hideLabel={hideLabelButton}
          >
            <Text>{inputValue}</Text>
          </Spoiler>
        );

        const displayPageSection = (
          <Grid
            columns={10}
            key={`form-review-${index}`}
            style={{
              // borderBottom: isInputValueValid
              //   ? borderColorGray
              //   : borderColorRed,
              borderBottom: borderColorGray,
            }}
            gutter={rowGap}
            w="100%"
          >
            <Grid.Col span={4}>{displayInputName}</Grid.Col>
            <Grid.Col span={6}>{displayValue}</Grid.Col>
          </Grid>
        );

        return displayPageSection;
      });

      const formReviewStack = (
        <Stack key={`form-review-${index}`} w="100%">
          {displayPageName}
          {displayPageSection}
        </Stack>
      );

      return formReviewStack;
    }
  );

  const displayTitle = (
    <Group w="100%" position="center">
      <Title order={4}>{formName} form</Title>
    </Group>
  );

  const displayFormReviewPage = (
    <Stack
      w="100%"
      p={padding}
      // h="62vh"
      style={{
        // overflowY: 'scroll',
        border: borderColorGray,
        borderRadius: 4,
      }}
    >
      {displayTitle}
      {displayFormReviewStack}
    </Stack>
  );

  return displayFormReviewPage;
}

export default FormReviewPage;
export type { FormReviewObject };
