import {
  Container,
  Group,
  MantineSize,
  Popover,
  Stack,
  Text,
  Textarea,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ChangeEvent, Dispatch, KeyboardEvent, ReactNode, useState } from "react";
import React from "react";
import { TbCheck, TbRefresh } from "react-icons/tb";

import { COLORS_SWATCHES } from "../../constants/data";
import { useGlobalState } from "../../hooks";
import { StepperPage, StepperChild, SetStepsInErrorPayload } from "../../types";
import { returnThemeColors, splitCamelCase } from "../../utils";
import {
  createAccessibleValueValidationTextElements,
  returnValidationTexts,
} from "./utils";

type AccessibleTextAreaInputAttributes<
  ValidValueAction extends string = string,
  InvalidValueAction extends string = string
> = {
  ariaAutoComplete?: "both" | "list" | "none" | "inline";
  autoComplete?: "on" | "off";
  componentScaffolding: StepperPage[];
  disabled?: boolean;
  dynamicInputs?: ReactNode[]; // inputs created by the user (ex: buttons in the survey builder)
  icon?: ReactNode;
  initialInputValue?: string;
  value: string;
  label?: ReactNode;
  maxLength?: number;
  maxRows?: number;
  minLength?: number;
  minRows?: number;
  name: string;
  onBlur?: () => void;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  onFocus?: () => void;
  onKeyDown?: (event: KeyboardEvent<HTMLTextAreaElement>) => void;
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
  ref?: React.RefObject<HTMLTextAreaElement> | null;
  required?: boolean;
  rightSection?: boolean;
  rightSectionIcon?: ReactNode;
  rightSectionOnClick?: () => void;
  size?: MantineSize;
  /** stepper page location of input. default 0 */ step?: number;
  withAsterisk?: boolean;
};

type AccessibleTextAreaInputProps<
  ValidValueAction extends string = string,
  InvalidValueAction extends string = string
> = {
  attributes: AccessibleTextAreaInputAttributes<ValidValueAction, InvalidValueAction>;
};

function AccessibleTextAreaInput<
  ValidValueAction extends string = string,
  InvalidValueAction extends string = string
>({ attributes }: AccessibleTextAreaInputProps<ValidValueAction, InvalidValueAction>) {
  const {
    ariaAutoComplete = "none",
    autoComplete = "off",
    componentScaffolding,
    disabled = false,
    dynamicInputs = null,
    icon = null,
    initialInputValue = "",
    value,
    name = splitCamelCase(attributes.name),
    label = splitCamelCase(attributes.name),
    maxLength = 2000,
    maxRows = 7,
    minLength = 2,
    minRows = 3,
    onBlur,
    onChange,
    onFocus,
    onKeyDown,
    parentDispatch,
    validValueAction,
    invalidValueAction,
    placeholder,
    ref = null,
    required = false,
    rightSection = false,
    rightSectionIcon = null,
    rightSectionOnClick = () => {},
    size = "sm",
    step = 0,
    withAsterisk = required,
  } = attributes;

  const [valueBuffer, setValueBuffer] = useState(value);
  const [isPopoverOpened, { open: openPopover, close: closePopover }] =
    useDisclosure(false);

  const {
    globalState: { themeObject, padding },
  } = useGlobalState();

  const {
    generalColors: { greenColorShade, grayColorShade },
  } = returnThemeColors({ themeObject, colorsSwatches: COLORS_SWATCHES });

  const dynamicInputLabel = dynamicInputs ? (
    <Group w="100%" position="apart" py={padding}>
      <Text size="sm">{label}</Text>
      {dynamicInputs.map((input, index) => (
        <Group key={`${index}`}>{input}</Group>
      ))}
    </Group>
  ) : (
    label
  );

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

  const rightIcon = rightSection ? (
    rightSectionIcon ? (
      rightSectionIcon
    ) : (
      <TbRefresh
        aria-label={`Reset ${name} value to ${initialInputValue}`}
        color={grayColorShade}
        size={18}
        onClick={rightSectionOnClick}
      />
    )
  ) : null;

  const { invalidValueTextElement, validValueTextElement } =
    createAccessibleValueValidationTextElements({
      isPopoverOpened,
      isValueBufferValid,
      name,
      themeObject,
      validationTexts,
      valueBuffer,
    });

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
          <div onBlurCapture={() => openPopover()} onFocusCapture={() => closePopover()}>
            <Textarea
              aria-autocomplete={ariaAutoComplete}
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
              autoComplete={autoComplete}
              color={grayColorShade}
              disabled={disabled}
              error={!isValueBufferValid && value !== initialInputValue}
              icon={leftIcon}
              label={dynamicInputLabel}
              maxLength={maxLength}
              maxRows={maxRows}
              minLength={minLength}
              minRows={minRows}
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
              onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
                setValueBuffer(event.currentTarget.value);
                onChange?.(event);
              }}
              onFocus={() => {
                openPopover();
                onFocus?.();
              }}
              onKeyDown={onKeyDown}
              placeholder={placeholder}
              ref={ref}
              required={required}
              rightSection={rightIcon}
              size={size}
              value={valueBuffer}
              withAsterisk={withAsterisk}
            />
          </div>
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

export { AccessibleTextAreaInput };

export type { AccessibleTextAreaInputAttributes };
