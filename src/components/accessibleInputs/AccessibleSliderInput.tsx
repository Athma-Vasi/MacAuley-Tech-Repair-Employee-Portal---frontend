import { Box, MantineSize, MantineTransition, RangeSlider, Slider } from "@mantine/core";
import { ReactNode } from "react";

import { useGlobalState } from "../../hooks";
import { SliderInputData } from "../../types";
import { returnSliderMarks, splitCamelCase } from "../../utils";
import { createAccessibleSliderScreenreaderTextElements } from "./utils";

type AccessibleSliderInputAttributes<ValidValueAction extends string = string> = {
  color?: string;
  disabled?: boolean;
  kind?: "slider" | "range-slider";
  label: ReactNode | ((value: number) => ReactNode);
  labelTransition?: MantineTransition;
  labelTransitionDuration?: number;
  labelTransitionTimingFunction?: string;
  marks?: SliderInputData;
  max: number;
  min: number;
  name: string;
  /** use with range-slider */
  onChangeRangeSlider?: (value: [number, number]) => void;
  /** use with slider */
  onChangeSlider?: (value: number) => void;
  parentDispatch: React.Dispatch<{
    type: ValidValueAction;
    payload: number | [number, number];
  }>;
  precision?: number;
  rangeSliderDefaultValues?: [number, number];
  size?: MantineSize;
  sliderDefaultValue?: number;
  step?: number;
  thumbChildren?: ReactNode;
  /** use with range-slider */
  thumbFromLabel?: string;
  /** use with slider */
  thumbLabel?: string;
  thumbSize?: number;
  validValueAction: ValidValueAction;
  value: number;
};

type AccessibleSliderInputProps = {
  attributes: AccessibleSliderInputAttributes;
};

function AccessibleSliderInput({ attributes }: AccessibleSliderInputProps) {
  const {
    color,
    disabled = false,
    kind = "slider",
    label = null,
    labelTransition = "skew-down",
    labelTransitionDuration = 100,
    labelTransitionTimingFunction = "ease",
    marks,
    max,
    min,
    name,
    onChangeRangeSlider,
    onChangeSlider,
    parentDispatch,
    precision = 1,
    rangeSliderDefaultValues = [min, max],
    size = "sm",
    sliderDefaultValue = min,
    step,
    thumbChildren,
    thumbFromLabel,
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

  const accessibleSliderInput =
    kind === "slider" ? (
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
        onChange={(value: number) => {
          parentDispatch({
            type: validValueAction,
            payload: value,
          });

          if (onChangeSlider) {
            onChangeSlider(value);
          }
        }}
        precision={precision}
        size={size}
        step={step}
        style={{ border: "none", outline: "none" }}
        thumbChildren={thumbChildren}
        thumbLabel={thumbLabel}
        thumbSize={thumbSize}
        value={value}
      />
    ) : (
      <RangeSlider
        aria-describedby={`${name}-selected`}
        aria-label={name}
        color={color}
        defaultValue={rangeSliderDefaultValues}
        disabled={disabled}
        label={label}
        marks={marks}
        max={max}
        min={min}
        name={name}
        onChange={(value: [number, number]) => {
          parentDispatch({
            type: validValueAction,
            payload: value,
          });

          if (onChangeRangeSlider) {
            onChangeRangeSlider(value);
          }
        }}
        precision={precision}
        size={size}
        step={step}
        style={{ border: "none", outline: "none" }}
        thumbChildren={thumbChildren}
        thumbFromLabel={thumbFromLabel}
        thumbSize={thumbSize}
        value={rangeSliderDefaultValues}
      />
    );

  return (
    <Box>
      {accessibleSliderInput}
      <Box style={{ display: "hidden" }}>{screenreaderTextElement}</Box>
    </Box>
  );
}

export { AccessibleSliderInput };
export type { AccessibleSliderInputAttributes };
