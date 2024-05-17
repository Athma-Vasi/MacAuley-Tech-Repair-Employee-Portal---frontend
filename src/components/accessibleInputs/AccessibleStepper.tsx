import { MantineSize, Stack, Stepper, Text } from "@mantine/core";
import { ReactNode, useState } from "react";
import { TbCheck, TbX } from "react-icons/tb";
import { TiArrowLeftThick } from "react-icons/ti";

import { COLORS_SWATCHES } from "../../constants/data";
import { useGlobalState } from "../../hooks";
import { returnThemeColors } from "../../utils";
import { createAccessibleButtons } from "./utils";

type AccessibleStepperData = {
  children?: ReactNode;
  description: string;
  kind?: "form" | "review";
  valuesRegexes?: Array<{ value: string | boolean; fullRegex: RegExp }>;
};

type AccessibleStepperAttributes = {
  /** last item in array must be form review page */
  accessibleStepperData: AccessibleStepperData[];
  allowNextStepsSelect?: boolean;
  size?: MantineSize;
  submitButton?: JSX.Element;
};

type AccessibleStepperProps = {
  attributes: AccessibleStepperAttributes;
};

function AccessibleStepper({ attributes }: AccessibleStepperProps) {
  const {
    accessibleStepperData,
    allowNextStepsSelect,
    size = "md",
    submitButton = null,
  } = attributes;

  const {
    globalState: { themeObject },
  } = useGlobalState();

  const [activeStep, setActiveStep] = useState(0);
  const [stepsInError, setStepsInError] = useState<boolean[]>(
    accessibleStepperData.map(() => false)
  );

  const maxStep = accessibleStepperData.length;

  const [backButton, nextButton] = createAccessibleButtons([
    {
      customDisabledText: "You are on the first step",
      customEnabledText: `Go back to ${
        accessibleStepperData[activeStep - 1]?.description ?? "the beginning"
      }`,
      disabled: activeStep === 0,
      leftIcon: <TiArrowLeftThick />,
      name: "Back",
      onClick: () => {
        setStepsInError(returnStepsInError(accessibleStepperData));

        setActiveStep(activeStep <= maxStep ? activeStep - 1 : activeStep);
      },
    },
    {
      customEnabledText: `Go to ${
        accessibleStepperData[activeStep + 1]?.description ?? "the end"
      }`,
      customDisabledText: "You are on the last step",
      disabled: activeStep === maxStep,
      name: "Next",
      onClick: () => {
        setStepsInError(returnStepsInError(accessibleStepperData));

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

  const stepperSteps = accessibleStepperData.map((step, stepIndex) => {
    const description = (
      <Text color={stepsInError[stepIndex] ? redColorShade : grayColorShade}>
        {step.description}
      </Text>
    );

    const completedIcon = stepsInError[stepIndex] ? (
      <TbX size={26} />
    ) : (
      <TbCheck size={26} />
    );

    return (
      <Stepper.Step
        aria-label={screenreaderText}
        color={stepsInError[stepIndex] ? redColorShade : themeColorShade}
        completedIcon={completedIcon}
        description={description}
        key={`step-${stepIndex}`}
      >
        {step.children ?? null}
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
      {stepper}
      {backButton}
      {nextButton}
    </Stack>
  );
}

function returnStepsInError(accessibleStepperData: AccessibleStepperData[]): boolean[] {
  return accessibleStepperData.reduce<boolean[]>(
    (acc, step, index) => {
      const { valuesRegexes, kind } = step;

      if (kind && kind === "review") {
        return acc;
      }
      if (!valuesRegexes) {
        return acc;
      }

      valuesRegexes.forEach(({ value, fullRegex }) => {
        const isValid = fullRegex.test(value.toString());

        if (!isValid) {
          acc[index] = true;
        }
      });

      return acc;
    },
    accessibleStepperData.map(() => false)
  );
}

export { AccessibleStepper };
