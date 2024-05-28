import { Box, Container, MantineSize, MantineTransition, Slider } from "@mantine/core";
import { ReactNode } from "react";

import { useGlobalState } from "../../hooks";
import { SliderMarksData } from "../../types";
import { returnSliderMarks } from "../../utils";
import { createAccessibleSliderScreenreaderTextElements } from "./utils";

type DynamicSliderInputPayload = {
  index: number;
  value: number;
};

type AccessibleSliderInputAttributes<ValidValueAction extends string = string> = {
  color?: string;
  disabled?: boolean;
  /** when the input is created dynamically */
  index?: number;
  label?: ReactNode | ((value: number) => ReactNode);
  labelTransition?: MantineTransition;
  labelTransitionDuration?: number;
  labelTransitionTimingFunction?: string;
  marks?: SliderMarksData;
  max: number;
  min: number;
  name: string;
  onBlur?: () => void;
  onChange?: (value: number) => void;
  onFocus?: () => void;
  /** default dispatch for non-user-created inputs */
  parentDispatch?: React.Dispatch<{
    action: ValidValueAction;
    payload: number;
  }>;
  /** default dispatch for user-created dynamic inputs */
  parentDynamicDispatch?: React.Dispatch<{
    action: ValidValueAction;
    payload: DynamicSliderInputPayload;
  }>;
  precision?: number;
  size?: MantineSize;
  sliderDefaultValue?: number;
  step?: number;
  thumbChildren?: ReactNode;
  thumbLabel?: string;
  thumbSize?: number;
  validValueAction: ValidValueAction;
  value: number;
};

type AccessibleSliderInputProps<ValidValueAction extends string = string> = {
  attributes: AccessibleSliderInputAttributes<ValidValueAction>;
};

function AccessibleSliderInput<ValidValueAction extends string = string>({
  attributes,
}: AccessibleSliderInputProps<ValidValueAction>) {
  const {
    color,
    disabled = false,
    index,
    label = null,
    labelTransition = "skew-down",
    labelTransitionDuration = 100,
    labelTransitionTimingFunction = "ease",
    marks,
    max,
    min,
    name,
    onBlur,
    onChange,
    onFocus,
    parentDispatch,
    parentDynamicDispatch,
    precision = 1,
    size = "sm",
    sliderDefaultValue = min,
    step,
    thumbChildren,
    thumbLabel,
    thumbSize,
    validValueAction,
    value,
  } = attributes;

  const {
    globalState: { themeObject },
  } = useGlobalState();

  const sliderMarks = marks ? marks : disabled ? void 0 : returnSliderMarks({ max, min });

  const { screenreaderTextElement } = createAccessibleSliderScreenreaderTextElements({
    name,
    themeObject,
    value,
  });

  const accessibleSliderInput = (
    <Slider
      aria-describedby={`${name}-selected`}
      aria-label={name}
      color={color}
      defaultValue={sliderDefaultValue}
      disabled={disabled}
      label={label}
      labelTransition={labelTransition}
      labelTransitionDuration={labelTransitionDuration}
      labelTransitionTimingFunction={labelTransitionTimingFunction}
      marks={sliderMarks}
      max={max}
      min={min}
      name={name}
      onBlur={onBlur}
      onChange={(value: number) => {
        index === undefined
          ? parentDispatch?.({
              action: validValueAction,
              payload: value,
            })
          : parentDynamicDispatch?.({
              action: validValueAction,
              payload: { index, value },
            });

        onChange?.(value);
      }}
      onFocus={onFocus}
      precision={precision}
      size={size}
      step={step}
      style={{ border: "none", outline: "none" }}
      thumbChildren={thumbChildren}
      thumbLabel={thumbLabel}
      thumbSize={thumbSize}
      value={value}
    />
  );

  return (
    <Container w={300}>
      {accessibleSliderInput}
      <Box
        style={
          // This is an invisible element that is used to provide screen reader users with additional information
          // @see https://webaim.org/techniques/css/invisiblecontent/
          {
            height: "1px",
            left: "-9999px",
            position: "absolute",
            top: "auto",
            width: "1px",
          }
        }
      >
        {screenreaderTextElement}
      </Box>
    </Container>
  );
}

export { AccessibleSliderInput };
export type {
  AccessibleSliderInputAttributes,
  AccessibleSliderInputProps,
  DynamicSliderInputPayload,
};
