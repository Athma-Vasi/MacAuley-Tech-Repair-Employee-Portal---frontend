import { Grid, Group, Spoiler, Stack, Text, Title } from "@mantine/core";
import { TbArrowDown, TbArrowUp } from "react-icons/tb";

import { COLORS_SWATCHES } from "../../constants/data";
import { useGlobalState } from "../../hooks";
import { returnAccessibleButtonElements } from "../../jsxCreators";
import {
  capitalizeAll,
  replaceLastCommaWithAnd,
  returnThemeColors,
  splitCamelCase,
} from "../../utils";

type FormReview = {
  name: string;
  value: string | boolean;
  isValueValid?: boolean;
};

type FormReviewArray = Record<
  string, // page name
  Array<FormReview>
>;

type FormReviewProps = {
  formReviewObject: FormReviewArray;
  formName?: string;
};

function FormReview({ formReviewObject, formName = "Form review" }: FormReviewProps) {
  const {
    globalState: { themeObject, padding, rowGap },
  } = useGlobalState();

  const {
    appThemeColors: { borderColor },
    generalColors: { redColorShade },
  } = returnThemeColors({
    colorsSwatches: COLORS_SWATCHES,
    themeObject,
  });

  const displayFormReviewStack = Object.entries(formReviewObject).map(
    ([pageName, pageObjectArr], index) => {
      const displayPageName = (
        <Title order={5} style={{ marginTop: 16 }}>
          {splitCamelCase(pageName)}
        </Title>
      );

      const displayPageSection = pageObjectArr.map((pageObject, index) => {
        const { name, isValueValid = true } = pageObject;
        const { value = isValueValid ? "Yes" : "No" } = pageObject;

        const displayInputName = (
          <Text color={isValueValid ? void 0 : redColorShade}>{capitalizeAll(name)}</Text>
        );

        const rowBackgroundColorLight = index % 2 === 0 ? "#f9f9f9" : "transparent";
        const rowBackgroundColorDark = "transparent";
        const rowBackgroundColor =
          themeObject.colorScheme === "dark"
            ? rowBackgroundColorDark
            : rowBackgroundColorLight;

        const [showLabelButton, hideLabelButton] = returnAccessibleButtonElements([
          {
            buttonLabel: "Show",
            semanticDescription: "Show button to show the hidden text",
            semanticName: `button to show ${name} input text`,
            leftIcon: <TbArrowDown />,
          },
          {
            buttonLabel: "Hide",
            semanticDescription: "Hide button to hide the shown text",
            semanticName: `button to hide ${name} input text`,
            leftIcon: <TbArrowUp />,
          },
        ]);

        const displayValue = (
          <Spoiler
            maxHeight={131}
            showLabel={showLabelButton}
            hideLabel={hideLabelButton}
          >
            <Text>
              {Array.isArray(value)
                ? replaceLastCommaWithAnd(value.join(", "))
                : value.toString()}
            </Text>
          </Spoiler>
        );

        const displayPageSection = (
          <Grid
            columns={10}
            key={`form-review-${index}`}
            style={{ borderBottom: borderColor }}
            gutter={rowGap}
            w="100%"
          >
            <Grid.Col span={4} style={{ background: rowBackgroundColor }}>
              {displayInputName}
            </Grid.Col>
            <Grid.Col span={6} style={{ background: rowBackgroundColor }}>
              {displayValue}
            </Grid.Col>
          </Grid>
        );

        return displayPageSection;
      });

      const formReviewStack = (
        <Stack key={`form-review-${index}`} w="100%" pb={padding}>
          {displayPageName}
          {displayPageSection}
        </Stack>
      );

      return formReviewStack;
    }
  );

  const displayTitle = (
    <Group w="100%" position="center">
      <Title order={4}>{formName}</Title>
    </Group>
  );

  const displayFormReview = (
    <Stack w="100%" p={padding} style={{ border: borderColor, borderRadius: 4 }}>
      {displayTitle}
      {displayFormReviewStack}
    </Stack>
  );

  return displayFormReview;
}

export { FormReview };
export type { FormReviewArray };
