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
import {
  ChangeEvent,
  Dispatch,
  KeyboardEvent,
  ReactNode,
  RefObject,
  useState,
} from "react";
import { TbCheck, TbRefresh } from "react-icons/tb";

import { COLORS_SWATCHES } from "../../../constants/data";
import { VALIDATION_FUNCTIONS_TABLE } from "../../../constants/validations";
import { useGlobalState } from "../../../hooks";
import {
  SetPageInErrorPayload,
  StepperPage,
  ValidationFunctionsTable,
} from "../../../types";
import { returnThemeColors, splitCamelCase } from "../../../utils";
import { SetFilterInputValuesDispatchData } from "../../query/QueryFilter";
import {
  createAccessibleValueValidationTextElements,
  returnFullValidation,
  returnValidationTexts,
} from "../utils";

type AccessibleTextInputAttributes<
  ValidValueAction extends string = string,
  InvalidValueAction extends string = string
> = {
  ariaAutoComplete?: "both" | "list" | "none" | "inline";
  autoComplete?: "on" | "off";
  disabled?: boolean;
  icon?: ReactNode;
  /** [pageIndex, pagePositionIndex, ...] */
  dynamicIndexes?: number[];
  initialInputValue?: string;
  invalidValueAction: InvalidValueAction;
  label?: ReactNode;
  maxLength?: number;
  minLength?: number;
  name: string;
  onBlur?: () => void;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
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
  setFilterInputValuesDispatchData?: SetFilterInputValuesDispatchData<
    ValidValueAction,
    InvalidValueAction
  >;
  /** stepper page location of input. default 0 = first page = step 0 */
  page?: number;
  placeholder?: string;
  ref?: RefObject<HTMLInputElement> | null;
  required?: boolean;
  rightSection?: boolean;
  rightSectionIcon?: ReactNode;
  rightSectionOnClick?: () => void;
  size?: MantineSize;
  stepperPages: StepperPage[];
  validationFunctionsTable?: ValidationFunctionsTable;
  validValueAction: ValidValueAction;
  value: string;
  withAsterisk?: boolean;
};

type AccessibleTextInputProps<
  ValidValueAction extends string = string,
  InvalidValueAction extends string = string
> = {
  attributes: AccessibleTextInputAttributes<ValidValueAction, InvalidValueAction>;
};

function AccessibleTextInput<
  ValidValueAction extends string = string,
  InvalidValueAction extends string = string
>({ attributes }: AccessibleTextInputProps<ValidValueAction, InvalidValueAction>) {
  const {
    ariaAutoComplete = "none",
    autoComplete = "off",
    disabled = false,
    icon = null,
    dynamicIndexes,
    initialInputValue = "",
    invalidValueAction,
    maxLength = 75,
    minLength = 2,
    name,
    onBlur,
    onChange,
    onFocus,
    onKeyDown,
    page = 0,
    parentDispatch,
    parentDynamicDispatch,
    placeholder = "",
    setFilterInputValuesDispatchData,
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
    withAsterisk = required,
  } = attributes;

  const label = (
    <Text color={disabled ? "gray" : void 0}>
      {attributes.label ?? splitCamelCase(name)}
    </Text>
  );

  const [valueBuffer, setValueBuffer] = useState<string>(value);
  const [isPopoverOpened, { open: openPopover, close: closePopover }] =
    useDisclosure(false);

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
      <Tooltip label={`Reset ${name} to ${initialInputValue}`}>
        <Group style={{ cursor: "pointer" }}>
          <TbRefresh
            aria-label={`Reset ${name} value to ${initialInputValue}`}
            color={grayColorShade}
            size={18}
            onClick={rightSectionOnClick}
          />
        </Group>
      </Tooltip>
    )
  ) : null;

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
          <TextInput
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
            // color={grayColorShade}
            disabled={disabled}
            error={!isValueBufferValid && valueBuffer !== initialInputValue}
            icon={leftIcon}
            label={label}
            maxLength={maxLength}
            minLength={minLength}
            name={name}
            onBlur={() => {
              // if this input is not created dynamically by user
              if (dynamicIndexes === undefined) {
                // standard dispatch
                if (parentDispatch) {
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
                }

                // dispatch for query filter
                if (setFilterInputValuesDispatchData) {
                  const {
                    fieldNamesOperatorsTypesMap,
                    searchFieldSelectInputData,
                    setFilterInputValuesDispatch,
                    selectInputsDataMap,
                  } = setFilterInputValuesDispatchData;

                  setFilterInputValuesDispatch({
                    action: validValueAction,
                    payload: {
                      fieldNamesOperatorsTypesMap,
                      searchFieldSelectInputData,
                      value: valueBuffer,
                      selectInputsDataMap,
                    },
                  });

                  setFilterInputValuesDispatch({
                    action: invalidValueAction,
                    payload: {
                      kind: isValueBufferValid ? "delete" : "add",
                      page,
                    },
                  });
                }
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
            onKeyDown={onKeyDown}
            placeholder={placeholder}
            ref={ref}
            required={required}
            rightSection={rightIcon}
            size={size}
            value={valueBuffer}
            width={300}
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

export { AccessibleTextInput };

export type { AccessibleTextInputAttributes };
