import { Container, MantineSize, PasswordInput, Popover, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ChangeEvent, Dispatch, ReactNode, RefObject, useState } from "react";
import { TbCheck } from "react-icons/tb";

import { COLORS_SWATCHES } from "../../constants/data";
import { useGlobalState } from "../../hooks";
import { SetPageInErrorPayload, StepperPage } from "../../types";
import { returnThemeColors, splitCamelCase } from "../../utils";
import {
  createAccessibleValueValidationTextElements,
  returnFullRegex,
  returnValidationTexts,
} from "./utils";

type AccessiblePasswordInputAttributes<
  ValidValueAction extends string = string,
  InvalidValueAction extends string = string
> = {
  icon?: ReactNode;
  initialInputValue?: string;
  invalidValueAction: InvalidValueAction;
  label?: ReactNode;
  maxLength?: number;
  minLength?: number;
  name: string;
  onBlur?: () => void;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  /** stepper page location of input. default 0 = first page = step 0 */
  page?: number;
  parentDispatch: Dispatch<
    | {
        action: ValidValueAction;
        payload: string;
      }
    | {
        action: InvalidValueAction;
        payload: SetPageInErrorPayload;
      }
  >;
  validValueAction: ValidValueAction;
  placeholder: string;
  ref?: RefObject<HTMLInputElement>;
  required?: boolean;
  size?: MantineSize;
  stepperPages: StepperPage[];
  value: string;
  withAsterisk?: boolean;
};

type AccessiblePasswordInputProps = {
  attributes: AccessiblePasswordInputAttributes;
};

function AccessiblePasswordInput({ attributes }: AccessiblePasswordInputProps) {
  const {
    stepperPages,
    icon = null,
    initialInputValue = "",
    invalidValueAction,
    name,
    label = splitCamelCase(attributes.name),
    maxLength = 32,
    minLength = 8,
    onBlur,
    onChange,
    onFocus,
    page = 0,
    parentDispatch,
    placeholder,
    ref = null,
    required = false,
    size = "sm",
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

  const { fullRegex } = returnFullRegex(name, stepperPages);
  const isValueBufferValid = fullRegex.test(valueBuffer);

  const leftIcon = isValueBufferValid ? (
    icon ? (
      icon
    ) : (
      <TbCheck color={greenColorShade} size={18} />
    )
  ) : null;

  const validationTexts = returnValidationTexts({
    name,
    stepperPages,
    value,
  });

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
                action: invalidValueAction,
                payload: {
                  kind: isValueBufferValid ? "delete" : "add",
                  page,
                },
              });

              parentDispatch({
                action: validValueAction,
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
