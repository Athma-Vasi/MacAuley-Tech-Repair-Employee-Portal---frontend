import { RegisterAction, RegisterDispatch } from '../types';

type StepperWrapperProps = {
  children?: React.ReactNode;
  currentStepperPosition: number;
  registerAction: RegisterAction;
  registerDispatch: React.Dispatch<RegisterDispatch>;
};

export type { StepperWrapperProps };
