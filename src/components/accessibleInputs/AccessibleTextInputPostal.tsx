import {
  Container,
  Group,
  MantineSize,
  Popover,
  Stack,
  Text,
  TextInput,
  Tooltip,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ChangeEvent, Dispatch, ReactNode, useState } from "react";
import { TbCheck, TbRefresh } from "react-icons/tb";

import { COLORS_SWATCHES } from "../../constants/data";
import { VALIDATION_FUNCTIONS_TABLE } from "../../constants/validations";
import { useGlobalState } from "../../hooks";
import {
  Country,
  SetPageInErrorPayload,
  StepperPage,
  ValidationFunctionsTable,
} from "../../types";
import { returnThemeColors, splitCamelCase } from "../../utils";
import {
  createAccessibleValueValidationTextElements,
  returnFullValidation,
  returnValidationTexts,
} from "./utils";

type AccessibleTextInputPostalAttributes<
  ValidValueAction extends string = string,
  InvalidValueAction extends string = string
> = {
  autoComplete?: "on" | "off";
  country: Country;
  disabled?: boolean;
  icon?: ReactNode;
  initialInputValue?: string;
  invalidValueAction: InvalidValueAction;
  label?: ReactNode;
  maxLength?: number;
  minLength?: number;
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
  placeholder?: string;
  ref?: React.RefObject<HTMLInputElement>;
  required?: boolean;
  rightSection?: boolean;
  rightSectionIcon?: ReactNode;
  rightSectionOnClick?: () => void;
  name: string;
  size?: MantineSize;
  stepperPages: StepperPage[];
  validationFunctionsTable?: ValidationFunctionsTable;
  validValueAction: ValidValueAction;
  value: string;
  withAsterisk?: boolean;
};

type AccessibleTextInputPostalProps<
  ValidValueAction extends string = string,
  InvalidValueAction extends string = string
> = {
  attributes: AccessibleTextInputPostalAttributes<ValidValueAction, InvalidValueAction>;
};

function AccessibleTextInputPostal<
  ValidValueAction extends string = string,
  InvalidValueAction extends string = string
>({ attributes }: AccessibleTextInputPostalProps<ValidValueAction, InvalidValueAction>) {
  const {
    autoComplete = "off",
    country,
    disabled = false,
    icon = null,
    initialInputValue = "",
    invalidValueAction,
    maxLength = 18,
    minLength = 18,
    name,
    onBlur,
    onChange,
    onFocus,
    onKeyDown,
    parentDispatch,
    page = 0,
    placeholder,
    ref = null,
    required = false,
    rightSection = false,
    rightSectionIcon = null,
    rightSectionOnClick = () => {},
    size = "sm",
    stepperPages,
    validationFunctionsTable = VALIDATION_FUNCTIONS_TABLE,
    validValueAction,
    value,
    withAsterisk = false,
  } = attributes;

  const label = (
    <Text color={disabled ? "gray" : void 0}>
      {attributes.label ?? splitCamelCase(name)}
    </Text>
  );

  const [valueBuffer, setValueBuffer] = useState(value);
  const [isPopoverOpened, { open: openPopover, close: closePopover }] =
    useDisclosure(false);

  const {
    globalState: { themeObject },
  } = useGlobalState();

  const {
    generalColors: { greenColorShade, iconGray },
  } = returnThemeColors({ colorsSwatches: COLORS_SWATCHES, themeObject });

  const { full } = returnFullValidation({ name, stepperPages, validationFunctionsTable });
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
    validationFunctionsTable,
    valueBuffer,
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
            aria-required={required}
            autoComplete={autoComplete}
            error={!isValueBufferValid && valueBuffer !== initialInputValue}
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
              const length = valueBuffer.length;

              if (country === "Canada") {
                if (length === 3) {
                  console.log("inside length === 3");

                  setValueBuffer(`${valueBuffer} `);
                }

                if (length === 7) {
                  setValueBuffer(valueBuffer.trim());
                }
              }

              if (country === "United States") {
                if (length === 6) {
                  setValueBuffer(`${valueBuffer.slice(0, 5)}-${valueBuffer.slice(5)}`);
                }
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

export { AccessibleTextInputPostal };

export type { AccessibleTextInputPostalAttributes };
