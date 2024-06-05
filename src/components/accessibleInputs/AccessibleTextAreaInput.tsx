import { Container, MantineSize, Popover, Stack, Text, Textarea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  ChangeEvent,
  Dispatch,
  FocusEvent,
  KeyboardEvent,
  ReactNode,
  useEffect,
  useState,
} from "react";
import React from "react";
import { TbCheck, TbRefresh } from "react-icons/tb";

import { COLORS_SWATCHES } from "../../constants/data";
import { useGlobalState } from "../../hooks";
import { SetPageInErrorPayload, StepperPage } from "../../types";
import { returnThemeColors, splitCamelCase } from "../../utils";
import {
  createAccessibleValueValidationTextElements,
  returnFullValidation,
  returnValidationTexts,
} from "./utils";

type AccessibleTextAreaInputAttributes<
  ValidValueAction extends string = string,
  InvalidValueAction extends string = string
> = {
  ariaAutoComplete?: "both" | "list" | "none" | "inline";
  autoComplete?: "on" | "off";
  disabled?: boolean;
  /** [pageIndex, pagePositionIndex, ...] */
  dynamicIndexes?: number[];
  icon?: ReactNode;
  initialInputValue?: string;
  label?: ReactNode;
  maxLength?: number;
  maxRows?: number;
  minLength?: number;
  minRows?: number;
  name: string;
  onBlur?: (event: FocusEvent<HTMLTextAreaElement>) => void;
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  onFocus?: (event: FocusEvent<HTMLTextAreaElement>) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLTextAreaElement>) => void;
  /** stepper page location of input. default 0 = first page = step 0 */
  page?: number;
  parentDispatch?: Dispatch<
    | {
        action: ValidValueAction;
        payload: string;
      }
    | {
        action: InvalidValueAction;
        payload: SetPageInErrorPayload;
      }
  >;
  /** for inputs created by user */
  parentDynamicDispatch?: Dispatch<
    | {
        action: ValidValueAction;
        payload: {
          dynamicIndexes: number[];
          value: string;
        };
      }
    | {
        action: InvalidValueAction;
        payload: SetPageInErrorPayload;
      }
  >;
  validValueAction: ValidValueAction;
  invalidValueAction: InvalidValueAction;
  placeholder?: string;
  ref?: React.RefObject<HTMLTextAreaElement> | null;
  required?: boolean;
  rightSection?: boolean;
  rightSectionIcon?: ReactNode;
  rightSectionOnClick?: () => void;
  size?: MantineSize;
  stepperPages: StepperPage[];
  value: string;
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
    disabled = false,
    dynamicIndexes,
    icon = null,
    initialInputValue = "",
    maxLength = 2000,
    maxRows = 7,
    minLength = 2,
    minRows = 3,
    name,
    onBlur,
    onChange,
    onFocus,
    onKeyDown,
    parentDispatch,
    parentDynamicDispatch,
    validValueAction,
    invalidValueAction,
    page = 0,
    placeholder = "",
    ref = null,
    required = false,
    rightSection = false,
    rightSectionIcon = null,
    rightSectionOnClick = () => {},
    size = "sm",
    stepperPages,
    value,
    withAsterisk = required,
  } = attributes;

  const label = (
    <Text color={disabled ? "gray" : void 0}>
      {attributes.label ?? splitCamelCase(name)}
    </Text>
  );

  const [valueBuffer, setValueBuffer] = useState(value);
  const [isPopoverOpened, { open: openPopover, close: closePopover }] =
    useDisclosure(false);

  // required because valueBuffer still has stale value on dynamic inputs
  useEffect(() => {
    dynamicIndexes === undefined ? void 0 : setValueBuffer(value);
  }, [dynamicIndexes, value]);

  const {
    globalState: { themeObject },
  } = useGlobalState();

  const {
    generalColors: { greenColorShade, grayColorShade },
  } = returnThemeColors({ themeObject, colorsSwatches: COLORS_SWATCHES });

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

  const { full } = returnFullValidation(name, stepperPages);
  const isValueBufferValid =
    typeof full === "function" ? full(valueBuffer) : full.test(valueBuffer);

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
    valueBuffer,
  });

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
    <Container w="100%" key={name}>
      <Popover
        opened={isPopoverOpened}
        position="bottom"
        shadow="md"
        transitionProps={{ transition: "pop" }}
        width="target"
        withArrow
      >
        <Popover.Target>
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
            label={label}
            maxLength={maxLength}
            maxRows={maxRows}
            minLength={minLength}
            minRows={minRows}
            name={name}
            onBlur={(event: FocusEvent<HTMLTextAreaElement>) => {
              if (dynamicIndexes === undefined) {
                parentDispatch?.({
                  action: invalidValueAction,
                  payload: {
                    kind: isValueBufferValid ? "delete" : "add",
                    page,
                  },
                });

                parentDispatch?.({
                  action: validValueAction,
                  payload: valueBuffer,
                });
              } else {
                parentDynamicDispatch?.({
                  action: invalidValueAction,
                  payload: {
                    kind: isValueBufferValid ? "delete" : "add",
                    page,
                  },
                });

                parentDynamicDispatch?.({
                  action: validValueAction,
                  payload: { dynamicIndexes, value: valueBuffer },
                });
              }

              onBlur?.(event);
              closePopover();
            }}
            onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
              setValueBuffer(event.currentTarget.value);
              onChange?.(event);
            }}
            onFocus={(event: FocusEvent<HTMLTextAreaElement>) => {
              openPopover();
              onFocus?.(event);
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
