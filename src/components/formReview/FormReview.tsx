import { Grid, Group, Spoiler, Stack, Text, Title } from "@mantine/core";
import { ReactNode } from "react";

import { COLORS_SWATCHES, PROPERTY_DESCRIPTOR } from "../../constants/data";
import { VALIDATION_FUNCTIONS_TABLE } from "../../constants/validations";
import { useGlobalState } from "../../hooks";
import { StepperPage } from "../../types";
import { capitalizeJoinWithAnd, returnThemeColors, splitCamelCase } from "../../utils";
import { createAccessibleButtons } from "../accessibleInputs/utils";

type FormReview = {
  name: string;
  value: string | boolean;
  isValueValid?: boolean;
};

type FormReviews = Record<
  string, // page name
  Array<FormReview>
>;

type FormReviewProps = {
  componentState: Record<string, unknown>;
  stepperPages: StepperPage[];
  title?: ReactNode;
};

function FormReviewStep({ componentState, stepperPages, title }: FormReviewProps) {
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

  const formReviewObject = returnFormReviews(stepperPages, componentState);

  const displayFormReviewStack = Object.entries(formReviewObject).map(
    ([pageName, pageObjectArr], index) => {
      const displayPageName = (
        <Title order={5} style={{ marginTop: 16 }}>
          {splitCamelCase(pageName)}
        </Title>
      );

      const displayPageSection = pageObjectArr.map((pageObject, index) => {
        const { name, isValueValid = true } = pageObject;
        const { value } = pageObject;

        const displayInputName = (
          <Text color={isValueValid ? void 0 : redColorShade}>
            {splitCamelCase(name)}
          </Text>
        );

        const rowBackgroundColorLight = index % 2 === 0 ? "#f9f9f9" : "transparent";
        const rowBackgroundColorDark = "transparent";
        const rowBackgroundColor =
          themeObject.colorScheme === "dark"
            ? rowBackgroundColorDark
            : rowBackgroundColorLight;

        const [showLabelButton, hideLabelButton] = createAccessibleButtons([
          {
            name: "show",
            enabledScreenreaderText: "Click to show the hidden text",
            kind: "show",
          },
          {
            name: "hide",
            enabledScreenreaderText: "Click to hide the shown text",
            kind: "hide",
          },
        ]);

        const displayValue = (
          <Spoiler
            maxHeight={131}
            showLabel={showLabelButton}
            hideLabel={hideLabelButton}
          >
            <Text>{value}</Text>
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

  const displayTitle = title ? (
    <Group w="100%" position="center">
      <Title order={4}>{title}</Title>
    </Group>
  ) : null;

  const displayFormReview = (
    <Stack w="100%" p={padding} style={{ border: borderColor, borderRadius: 4 }}>
      {displayTitle}
      {displayFormReviewStack}
    </Stack>
  );

  return displayFormReview;
}

function returnFormReviews<
  State extends Record<string, unknown> = Record<string, unknown>
>(stepperPages: StepperPage[], componentState: State): FormReviews {
  return stepperPages.reduce<FormReviews>((formReviewsAcc, stepperPage) => {
    const { description, kind, children } = stepperPage;

    if (kind && kind === "review") {
      return formReviewsAcc;
    }

    const formReviews = children.map((child) => {
      const { name, validationKey } = child;
      const value = componentState[name];

      const stringifiedValue = Array.isArray(value)
        ? capitalizeJoinWithAnd(value)
        : typeof value === "boolean"
        ? value
          ? "Yes"
          : "No"
        : // for survey component ...
        value === "chooseAny" || value === "choseOne"
        ? splitCamelCase(value)
        : value?.toString() ?? "";

      let isValueValid = true;

      if (validationKey) {
        const validation = VALIDATION_FUNCTIONS_TABLE[validationKey ?? "allowAll"];
        isValueValid =
          typeof validation.full === "function"
            ? validation.full(value?.toString() ?? "")
            : validation.full.test(value?.toString() ?? "");
      }

      return {
        name,
        value: stringifiedValue,
        isValueValid,
      };
    });

    Object.defineProperty(formReviewsAcc, description, {
      value: formReviews,
      ...PROPERTY_DESCRIPTOR,
    });

    return formReviewsAcc;
  }, Object.create(null));
}

export { FormReviewStep };
export type { FormReviews };
