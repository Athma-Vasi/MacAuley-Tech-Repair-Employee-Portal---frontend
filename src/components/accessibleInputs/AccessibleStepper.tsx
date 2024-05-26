import { Group, MantineSize, Stack, Stepper, Text, Title } from "@mantine/core";
import { ReactNode, useEffect, useState } from "react";
import { TbCheck, TbX } from "react-icons/tb";

import { COLORS_SWATCHES } from "../../constants/data";
import { useGlobalState } from "../../hooks";
import { StepperPage } from "../../types";
import { returnThemeColors } from "../../utils";
import { FormReviewStep } from "../formReview/FormReview";
import { createAccessibleButtons } from "./utils";

type AccessibleStepperAttributes = {
  allowNextStepsSelect?: boolean;
  componentState: Record<string, unknown>;
  onPreviousClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onNextClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  pageElements: React.JSX.Element[];
  size?: MantineSize;
  stepperPages: StepperPage[];
  submitButton?: JSX.Element;
  title?: ReactNode;
};

type AccessibleStepperProps = {
  attributes: AccessibleStepperAttributes;
};

function AccessibleStepper({ attributes }: AccessibleStepperProps) {
  const {
    allowNextStepsSelect,
    componentState,
    onNextClick,
    onPreviousClick,
    pageElements,
    size = "md",
    stepperPages,
    submitButton = null,
    title,
  } = attributes;

  const {
    globalState: { themeObject },
  } = useGlobalState();

  const [activeStep, setActiveStep] = useState(0);
  const [stepsInError, setStepsInError] = useState<boolean[]>(
    stepperPages.map((page) => false)
  );

  const maxStep = stepperPages.length;

  // useEffect(() => {
  //   const newActivePage = maxStep - 3;
  //   setActiveStep(newActivePage);
  // }, [maxStep]);

  const [backButton, nextButton] = createAccessibleButtons([
    {
      disabledScreenreaderText: "You are on the first step",
      enabledScreenreaderText: `Go back to ${
        stepperPages[activeStep - 1]?.description ?? "the beginning"
      }`,
      disabled: activeStep === 0,
      kind: "previous",
      name: "Back",
      onClick: (event: React.MouseEvent<HTMLButtonElement>) => {
        setStepsInError(returnStepsInError(stepperPages, componentState));
        setActiveStep(activeStep <= maxStep ? activeStep - 1 : activeStep);
        onPreviousClick?.(event);
      },
    },
    {
      enabledScreenreaderText: `Go to ${
        stepperPages[activeStep + 1]?.description ?? "the end"
      }`,
      disabledScreenreaderText: "You are on the last step",
      disabled: activeStep === maxStep,
      kind: "next",
      name: "Next",
      onClick: (event: React.MouseEvent<HTMLButtonElement>) => {
        setStepsInError(returnStepsInError(stepperPages, componentState));
        setActiveStep(activeStep < maxStep + 1 ? activeStep + 1 : activeStep);
        onNextClick?.(event);
      },
    },
  ]);

  const screenreaderText = `You are at ${
    activeStep === 0
      ? "the first step"
      : activeStep < maxStep + 1
      ? "the last step"
      : `step: ${activeStep + 1}`
  }`;

  const {
    generalColors: { grayColorShade, redColorShade, greenColorShade },
  } = returnThemeColors({
    colorsSwatches: COLORS_SWATCHES,
    themeObject,
  });

  const formReviewPage = (
    <FormReviewStep componentState={componentState} stepperPages={stepperPages} />
  );

  const stepperSteps = [...pageElements, formReviewPage].map((elements, pageIndex) => {
    const page = stepperPages[pageIndex];

    const description = (
      <Text color={stepsInError[pageIndex] ? redColorShade : grayColorShade}>
        {page.kind === "review"
          ? page.description ?? "Review your changes"
          : page.description}
      </Text>
    );

    const completedIcon = stepsInError[pageIndex] ? (
      <TbX size={26} />
    ) : (
      <TbCheck size={26} />
    );

    return (
      <Stepper.Step
        aria-label={screenreaderText}
        color={stepsInError[pageIndex] ? redColorShade : greenColorShade}
        completedIcon={completedIcon}
        description={description}
        key={`step-${pageIndex}`}
      >
        {elements ?? null}
      </Stepper.Step>
    );
  });

  const stepper = (
    <Stepper active={activeStep} allowNextStepsSelect={allowNextStepsSelect} size={size}>
      {stepperSteps}

      <Stepper.Completed>
        <Text>Stepper completed</Text>
        {submitButton}
      </Stepper.Completed>
    </Stepper>
  );

  return (
    <Stack>
      {title ? <Title order={4}>{title}</Title> : null}
      {stepper}
      <Group>
        {backButton}
        {nextButton}
      </Group>
    </Stack>
  );
}

function returnStepsInError(
  stepperPages: StepperPage[],
  componentState: Record<string, unknown>
): boolean[] {
  return stepperPages.reduce<boolean[]>(
    (stepsAcc, page, index) => {
      const { children, kind } = page;

      if (kind && kind === "review") {
        return stepsAcc;
      }

      children.forEach((child) => {
        const { name: childName } = child;

        Object.entries(componentState).forEach(([stateKey, stateValue]) => {
          if (childName === stateKey) {
            const { validations } = child;

            if (!validations) {
              return;
            }
            const { full: fullValidation } = validations;

            const value =
              typeof stateValue === "string" ? stateValue : stateValue?.toString() ?? "";

            const isStepValid =
              typeof fullValidation === "function"
                ? fullValidation(value)
                : fullValidation.test(value);

            if (!isStepValid) {
              stepsAcc[index] = true;
            }
          }
        });
      });

      return stepsAcc;
    },
    stepperPages.map((page) => false)
  );
}

export { AccessibleStepper };

/**
 * function createValuesRegexes<
    ComponentState extends Record<string, unknown> = Record<string, unknown>
  >(stepperPages: StepperPage[], state: ComponentState): ValuesRegexes[] {
    return stepperPages.reduce<ValuesRegexes[]>((valuesRegexesAcc, page) => {
      const pageValues = page.children.reduce<ValuesRegexes>((pageAcc, child) => {
        if (child.regexes) {
          const {
            regexes: { full },
            name: childName,
          } = child;

          const value = Object.entries(state).reduce(
            (valueAcc, [stateKey, stateValue]) => {
              if (stateKey === childName) {
                typeof stateValue === "string" || typeof stateValue === "boolean"
                  ? (valueAcc = stateValue.toString())
                  : (valueAcc = "");
              }

              return valueAcc;
            },
            ""
          );

          pageAcc.push({ fullRegex: full, value });
        }

        return pageAcc;
      }, []);

      valuesRegexesAcc.push(pageValues);

      return valuesRegexesAcc;
    }, []);
  }
 */
