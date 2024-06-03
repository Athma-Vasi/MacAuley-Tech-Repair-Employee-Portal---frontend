import { Group, MantineSize, Stack, Stepper, Text, Title } from "@mantine/core";
import { ReactNode, useState } from "react";
import { TbCheck, TbX } from "react-icons/tb";

import { COLORS_SWATCHES } from "../../constants/data";
import { VALIDATION_FUNCTIONS_TABLE } from "../../constants/validations";
import { useGlobalState } from "../../hooks";
import { StepperPage } from "../../types";
import { returnThemeColors } from "../../utils";
import { FormReviewStep } from "../formReview/FormReview";
import { createAccessibleButtons } from "./utils";

type AccessibleStepperAttributes = {
  allowNextStepsSelect?: boolean;
  componentState: Record<string, unknown>;
  displayReviewPage?: boolean;
  displaySubmitPage?: boolean;
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
    displayReviewPage = true,
    displaySubmitPage = true,
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
        setStepsInError(returnStepsInError(componentState, stepperPages));
        setActiveStep(activeStep <= maxStep ? activeStep - 1 : activeStep);
        onPreviousClick?.(event);
      },
    },
    {
      enabledScreenreaderText: `Go to ${
        stepperPages[activeStep + 1]?.description ?? "the end"
      }`,
      disabledScreenreaderText: "You are on the last step",
      disabled: displaySubmitPage ? activeStep === maxStep : activeStep === maxStep - 1,
      kind: "next",
      name: "Next",
      onClick: (event: React.MouseEvent<HTMLButtonElement>) => {
        setStepsInError(returnStepsInError(componentState, stepperPages));
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
    generalColors: { grayColorShade, redColorShade, textColor, themeColorShade },
  } = returnThemeColors({
    colorsSwatches: COLORS_SWATCHES,
    themeObject,
  });

  const formReviewPage = displayReviewPage ? (
    <FormReviewStep componentState={componentState} stepperPages={stepperPages} />
  ) : (
    void 0
  );

  const pages = formReviewPage ? [...pageElements, formReviewPage] : pageElements;

  const stepperSteps = pages.map((elements, pageIndex) => {
    const page = stepperPages[pageIndex];

    const descriptionColor = page.preventErrorStateDisplay
      ? textColor
      : stepsInError[pageIndex]
      ? redColorShade
      : textColor;

    const description = (
      <Text color={descriptionColor}>
        {page.kind === "review"
          ? page.description ?? "Review your changes"
          : page.description}
      </Text>
    );

    const completedIcon = page.preventErrorStateDisplay ? (
      <Text color="white">{`${pageIndex + 1}`}</Text>
    ) : stepsInError[pageIndex] ? (
      <TbX size={26} />
    ) : (
      <TbCheck size={26} />
    );

    const stepColor = page.preventErrorStateDisplay
      ? themeColorShade
      : stepsInError[pageIndex]
      ? redColorShade
      : grayColorShade;

    return (
      <Stepper.Step
        aria-label={screenreaderText}
        color={stepColor}
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

      {displaySubmitPage ? (
        <Stepper.Completed>
          <Text>Stepper completed</Text>
          {submitButton}
        </Stepper.Completed>
      ) : null}
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
  componentState: Record<string, unknown>,
  stepperPages: StepperPage[]
): boolean[] {
  return stepperPages.reduce<boolean[]>(
    (stepsAcc, page, index) => {
      const { children, kind } = page;

      if (kind && kind === "review") {
        return stepsAcc;
      }

      children.forEach((child) => {
        const { name: childName } = child;
        console.group("returnStepsInError() - Child");
        console.log({ childName });
        console.groupEnd();

        Object.entries(componentState).forEach(([stateKey, stateValue]) => {
          if (childName === stateKey) {
            const { validationKey } = child;

            // let correctValidations = validations;

            // if (typeof validations === "string") {
            //   const validationsObj = VALIDATION_FUNCTIONS_TABLE[validations];
            //   if (validationsObj) {
            //     correctValidations = validationsObj;
            //   }
            // }

            // const { full: fullValidation } = correctValidations as Validation;

            const value =
              typeof stateValue === "string" ? stateValue : stateValue?.toString() ?? "";

            const { full } = VALIDATION_FUNCTIONS_TABLE[validationKey ?? "allowAll"];
            const isStepValid =
              typeof full === "function" ? full(value) : full.test(value);

            if (!isStepValid) {
              stepsAcc[index] = true;
            }

            console.group("returnStepsInError() - Validation results");
            console.log({ childName, isStepValid, value });
            console.groupEnd();
          }
        });
      });

      return stepsAcc;
    },
    stepperPages.map((page) => false)
  );
}

export { AccessibleStepper };
