import { Container, MantineSize, PasswordInput, Popover, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ChangeEvent, Dispatch, ReactNode, RefObject, useState } from "react";
import { TbCheck } from "react-icons/tb";

import { COLORS_SWATCHES } from "../../constants/data";
import { useGlobalState } from "../../hooks";
import { StepperPage, StepperChild, SetStepsInErrorPayload } from "../../types";
import { returnThemeColors, splitCamelCase } from "../../utils";
import {
  createAccessibleValueValidationTextElements,
  returnValidationTexts,
} from "./utils";

type AccessiblePasswordInputAttributes<
  ValidValueAction extends string = string,
  InvalidValueAction extends string = string
> = {
  componentScaffolding: StepperPage[];
  icon?: ReactNode;
  initialInputValue?: string;
  value: string;
  label?: ReactNode;
  maxLength?: number;
  minLength?: number;
  name: string;
  onBlur?: () => void;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  parentDispatch: Dispatch<
    | {
        type: ValidValueAction;
        payload: string;
      }
    | {
        type: InvalidValueAction;
        payload: SetStepsInErrorPayload;
      }
  >;
  validValueAction: ValidValueAction;
  invalidValueAction: InvalidValueAction;
  placeholder: string;
  ref?: RefObject<HTMLInputElement>;
  required?: boolean;
  size?: MantineSize;
  /** stepper page location of input. default 0 */ step?: number;
  withAsterisk?: boolean;
};

type AccessiblePasswordInputProps = {
  attributes: AccessiblePasswordInputAttributes;
};

function AccessiblePasswordInput({ attributes }: AccessiblePasswordInputProps) {
  const {
    componentScaffolding,
    icon = null,
    initialInputValue = "",
    invalidValueAction,
    name = splitCamelCase(attributes.name),
    label = splitCamelCase(attributes.name),
    maxLength = 32,
    minLength = 8,
    onBlur,
    onChange,
    onFocus,
    parentDispatch,
    placeholder,
    ref = null,
    required = false,
    size = "sm",
    step = 0,
    validValueAction,
    value,
    withAsterisk = false,
  } = attributes;

  const [valueBuffer, setValueBuffer] = useState(value);
  const [isPopoverOpened, { open: openPopover, close: closePopover }] =
    useDisclosure(false);

  const {
    globalState: { themeObject },
  } = useGlobalState();

  const {
    generalColors: { greenColorShade },
  } = returnThemeColors({ themeObject, colorsSwatches: COLORS_SWATCHES });

  const component = componentScaffolding[step];
  const { full: fullRegex, partials } = component.children.find(
    (child: StepperChild) => child.name === name
  )?.regexes ?? { full: /** matches any char zero or more times */ /.*/, partials: [] };

  const validationTexts = returnValidationTexts({
    name,
    partials,
    value,
  });

  const isValueBufferValid = fullRegex.test(valueBuffer);

  const leftIcon = isValueBufferValid ? (
    icon ? (
      icon
    ) : (
      <TbCheck color={greenColorShade} size={18} />
    )
  ) : null;

  const { validValueTextElement, invalidValueTextElement } =
    createAccessibleValueValidationTextElements({
      isPopoverOpened,
      isValueBufferValid,
      name,
      themeObject,
      validationTexts,
      valueBuffer,
    });

  const inputWidth = 330;

  return (
    <Container w={350}>
      <Popover
        opened={isPopoverOpened}
        position="bottom"
        shadow="md"
        transitionProps={{ transition: "pop" }}
        width="target"
        withArrow
      >
        <Popover.Target>
          <PasswordInput
            aria-describedby={
              isValueBufferValid
                ? // id of validValueTextElement
                  `${name}-valid`
                : // id of invalidValueTextElement
                  `${name}-invalid`
            }
            aria-invalid={!isValueBufferValid}
            aria-label={name}
            aria-required={required}
            error={!isValueBufferValid && value !== initialInputValue}
            icon={leftIcon}
            label={label}
            maxLength={maxLength}
            minLength={minLength}
            name={name}
            onBlur={() => {
              parentDispatch({
                type: invalidValueAction,
                payload: {
                  kind: isValueBufferValid ? "delete" : "add",
                  step,
                },
              });

              parentDispatch({
                type: validValueAction,
                payload: valueBuffer,
              });

              onBlur?.();
              closePopover();
            }}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setValueBuffer(event.currentTarget.value);
              onChange?.(event);
            }}
            onFocus={() => {
              openPopover();
              onFocus?.();
            }}
            placeholder={placeholder}
            ref={ref}
            required={required}
            size={size}
            value={valueBuffer}
            w={inputWidth}
            withAsterisk={withAsterisk}
          />
        </Popover.Target>

        {isPopoverOpened && valueBuffer.length ? (
          <Popover.Dropdown>
            <Stack>
              {isValueBufferValid ? validValueTextElement : invalidValueTextElement}
            </Stack>
          </Popover.Dropdown>
        ) : null}
      </Popover>
    </Container>
  );
}

export { AccessiblePasswordInput };

export type { AccessiblePasswordInputAttributes };
