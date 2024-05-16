import { ReactNode, useState } from "react";
import { InputsRegexes } from "../../utils/validations";
import { createAccessibleButtons } from "./utils";
import { TiArrowLeftThick } from "react-icons/ti";

type AccessibleStepperData = Array<{
  description: string;
  ariaLabel: string;
  children: ReactNode;
  childrenTitle?: string;
}>;

type AccessibleStepperAttributes = {
  accessibleStepperData: AccessibleStepperData;
  inputsRegexes: InputsRegexes;
};

type AccessibleStepperProps = {
  attributes: AccessibleStepperAttributes;
};

function AccessibleStepper({ attributes }: AccessibleStepperProps) {
  const [activeStep, setActiveStep] = useState(0);

  const [] = createAccessibleButtons([
    {
      name: "Back",
      onClick: () => {
        setActiveStep(activeStep - 1);
      },
      disabled: activeStep === 0,
      leftIcon: <TiArrowLeftThick />,
    },
  ]);
}
