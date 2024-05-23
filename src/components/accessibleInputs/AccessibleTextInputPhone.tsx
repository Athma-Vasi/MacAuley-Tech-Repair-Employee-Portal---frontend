import {
  Container,
  Group,
  MantineSize,
  Popover,
  Stack,
  TextInput,
  Tooltip,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ChangeEvent, Dispatch, ReactNode, useState } from "react";
import { TbCheck, TbRefresh } from "react-icons/tb";

import { COLORS_SWATCHES } from "../../constants/data";
import { useGlobalState } from "../../hooks";
import { SetPageInErrorPayload, StepperPage } from "../../types";
import { returnThemeColors, splitCamelCase } from "../../utils";
import {
  createAccessibleValueValidationTextElements,
  returnFullRegex,
  returnValidationTexts,
} from "./utils";

type AccessibleTextInputPhoneAttributes<
  ValidValueAction extends string = string,
  InvalidValueAction extends string = string
> = {
  ariaRequired?: boolean;
  autoComplete?: "on" | "off";
  icon?: ReactNode;
  initialInputValue?: string;
  label?: ReactNode;
  maxLength?: number;
  minLength?: number;
  name: string;
  onBlur?: () => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
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
  invalidValueAction: InvalidValueAction;
  placeholder?: string;
  ref?: React.RefObject<HTMLInputElement>;
  required?: boolean;
  rightSection?: boolean;
  rightSectionIcon?: ReactNode;
  rightSectionOnClick?: () => void;
  size?: MantineSize;
  stepperPages: StepperPage[];
  value: string;
  withAsterisk?: boolean;
};

type AccessibleTextInputPhoneProps<
  ValidValueAction extends string = string,
  InvalidValueAction extends string = string
> = {
  attributes: AccessibleTextInputPhoneAttributes<ValidValueAction, InvalidValueAction>;
};

function AccessibleTextInputPhone<
  ValidValueAction extends string = string,
  InvalidValueAction extends string = string
>({ attributes }: AccessibleTextInputPhoneProps<ValidValueAction, InvalidValueAction>) {
  const {
    ariaRequired = false,
    autoComplete = "off",
    icon = null,
    initialInputValue = "+(1)",
    maxLength = 18,
    minLength = 18,
    name,
    onBlur,
    onChange,
    onFocus,
    onKeyDown,
    parentDispatch,
    validValueAction,
    invalidValueAction,
    page = 0,
    placeholder,
    ref = null,
    required = false,
    rightSection = false,
    rightSectionIcon = null,
    rightSectionOnClick = () => {},
    size = "sm",
    stepperPages,
    value,
    withAsterisk = false,
  } = attributes;

  const label = attributes.label ?? splitCamelCase(name);

  const [valueBuffer, setValueBuffer] = useState(() => value);
  const [isPopoverOpened, { open: openPopover, close: closePopover }] =
    useDisclosure(false);

  const {
    globalState: { themeObject },
  } = useGlobalState();

  const {
    generalColors: { greenColorShade, iconGray },
  } = returnThemeColors({ colorsSwatches: COLORS_SWATCHES, themeObject });

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

  const rightIcon = rightSection ? (
    rightSectionIcon ? (
      rightSectionIcon
    ) : (
      <Tooltip label={`Reset ${splitCamelCase(name)} to ${initialInputValue}`}>
        <Group style={{ cursor: "pointer" }}>
          <TbRefresh
            aria-label={`Reset ${splitCamelCase(name)} value to ${initialInputValue}`}
            color={iconGray}
            size={18}
            onClick={rightSectionOnClick}
          />
        </Group>
      </Tooltip>
    )
  ) : null;

  const { validValueTextElement, invalidValueTextElement } =
    createAccessibleValueValidationTextElements({
      isPopoverOpened,
      isValueBufferValid,
      name,
      themeObject,
      valueBuffer,
      validationTexts,
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
          <TextInput
            aria-describedby={
              isValueBufferValid
                ? // id of validValueTextElement
                  `${name}-valid`
                : // id of invalidValueTextElement
                  `${name}-invalid`
            }
            aria-invalid={!isValueBufferValid}
            aria-label={name}
            aria-required={ariaRequired}
            autoComplete={autoComplete}
            error={!isValueBufferValid && valueBuffer !== initialInputValue}
            icon={leftIcon}
            label={label}
            maxLength={maxLength}
            minLength={minLength}
            name={name}
            onBlur={() => {
              parentDispatch({
                action: validValueAction,
                payload: valueBuffer,
              });

              parentDispatch({
                action: invalidValueAction,
                payload: {
                  kind: isValueBufferValid ? "delete" : "add",
                  page,
                },
              });
              onBlur?.();
              closePopover();
            }}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              const length = valueBuffer.length;

              if (length === 4) {
                setValueBuffer(`${valueBuffer}(`);
                return;
              }

              if (length === 8) {
                setValueBuffer(`${valueBuffer}) `);
                return;
              }

              if (length === 13) {
                setValueBuffer(`${valueBuffer}-`);
                return;
              }

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

export { AccessibleTextInputPhone };

export type { AccessibleTextInputPhoneAttributes };
