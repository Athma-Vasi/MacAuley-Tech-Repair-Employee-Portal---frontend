import { RegisterAction, RegisterDispatch } from '../types';

type StepperWrapperProps = {
  children?: React.ReactNode;
  currentStepperPosition: number;
  parentComponentAction: Record<string, any>;
  registerDispatch: React.Dispatch<RegisterDispatch>;
};

export type { StepperWrapperProps };
