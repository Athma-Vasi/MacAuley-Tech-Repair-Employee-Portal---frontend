import { Group, MantineSize, Stack, Stepper, Text, Title } from "@mantine/core";
import { ReactNode, useState } from "react";
import { TbCheck, TbX } from "react-icons/tb";
import { TiArrowLeftThick } from "react-icons/ti";

import { COLORS_SWATCHES } from "../../constants/data";
import { useGlobalState } from "../../hooks";
import { StepperPage } from "../../types";
import { returnThemeColors } from "../../utils";
import { createAccessibleButtons } from "./utils";

type AccessibleStepperAttributes = {
  allowNextStepsSelect?: boolean;
  componentState: Record<string, unknown>;
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

  const [backButton, nextButton] = createAccessibleButtons([
    {
      disabledScreenreaderText: "You are on the first step",
      enabledScreenreaderText: `Go back to ${
        stepperPages[activeStep - 1]?.description ?? "the beginning"
      }`,
      disabled: activeStep === 0,
      leftIcon: <TiArrowLeftThick />,
      name: "Back",
      onClick: () => {
        setStepsInError(returnStepsInError(stepperPages, componentState));

        setActiveStep(activeStep <= maxStep ? activeStep - 1 : activeStep);
      },
    },
    {
      enabledScreenreaderText: `Go to ${
        stepperPages[activeStep + 1]?.description ?? "the end"
      }`,
      disabledScreenreaderText: "You are on the last step",
      disabled: activeStep === maxStep,
      name: "Next",
      onClick: () => {
        setStepsInError(returnStepsInError(stepperPages, componentState));

        setActiveStep(activeStep < maxStep + 1 ? activeStep + 1 : activeStep);
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
    generalColors: { themeColorShade, grayColorShade, redColorShade },
  } = returnThemeColors({
    colorsSwatches: COLORS_SWATCHES,
    themeObject,
  });

  const stepperSteps = pageElements.map((elements, pageIndex) => {
    const description = (
      <Text color={stepsInError[pageIndex] ? redColorShade : grayColorShade}>
        {stepperPages[pageIndex].kind === "review"
          ? "Review your changes"
          : stepperPages[pageIndex].description}
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
        color={stepsInError[pageIndex] ? redColorShade : themeColorShade}
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
    (stepsAcc, step, index) => {
      const { children, kind } = step;

      if (kind && kind === "review") {
        return stepsAcc;
      }

      children.forEach((child) => {
        const { name: childName } = child;

        Object.entries(componentState).forEach(([stateKey, stateValue]) => {
          if (childName === stateKey) {
            const { full: fullRegex } = child.regexes ?? { full: /.*/ };

            const isStepValid = fullRegex.test(
              typeof stateValue === "string" ? stateValue : stateValue?.toString() ?? ""
            );

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
