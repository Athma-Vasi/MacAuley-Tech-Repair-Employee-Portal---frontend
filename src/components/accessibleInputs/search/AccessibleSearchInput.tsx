import {
  Container,
  Flex,
  Group,
  type MantineSize,
  Popover,
  Stack,
  Text,
  TextInput,
  Tooltip,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  type ChangeEvent,
  type Dispatch,
  type KeyboardEvent,
  type ReactNode,
  type RefObject,
  useEffect,
  useState,
} from "react";
import { TbCheck, TbRefresh, TbX } from "react-icons/tb";

import { Trie } from "../../../classes/trie";
import {
  COLORS_SWATCHES,
  INPUT_MAX_WIDTH,
  INPUT_MIN_WIDTH,
} from "../../../constants/data";
import { VALIDATION_FUNCTIONS_TABLE } from "../../../constants/validations";
import { useGlobalState } from "../../../hooks";
import type {
  SetPageInErrorPayload,
  StepperPage,
  ValidationFunctionsTable,
} from "../../../types";
import { returnThemeColors, splitCamelCase } from "../../../utils";
import {
  createAccessibleValueValidationTextElements,
  returnPartialValidations,
  returnValidationTexts,
} from "../utils";

type AccessibleSearchInputAttributes<
  ValidValueAction extends string = string,
  InvalidValueAction extends string = string,
> = {
  ariaAutoComplete?: "both" | "list" | "none" | "inline";
  autoComplete?: "on" | "off";
  data: string[];
  disabled?: boolean;
  icon?: ReactNode;
  initialInputValue?: string;
  invalidValueAction?: InvalidValueAction;
  label?: ReactNode;
  maxLength?: number;
  minLength?: number;
  name: string;
  onBlur?: () => void;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
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
  trieResults: string[];
  validationFunctionsTable?: ValidationFunctionsTable;
  validValueAction: ValidValueAction;
  value: string;
  withAsterisk?: boolean;
};

type AccessibleSearchInputProps<
  ValidValueAction extends string = string,
  InvalidValueAction extends string = string,
> = {
  attributes: AccessibleSearchInputAttributes<
    ValidValueAction,
    InvalidValueAction
  >;
  uniqueId?: string;
};

function AccessibleSearchInput<
  ValidValueAction extends string = string,
  InvalidValueAction extends string = string,
>(
  { attributes, uniqueId }: AccessibleSearchInputProps<
    ValidValueAction,
    InvalidValueAction
  >,
) {
  const {
    ariaAutoComplete = "none",
    autoComplete = "off",
    data,
    disabled = false,
    icon = null,
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
    placeholder = "",
    ref = null,
    required = false,
    rightSection = false,
    rightSectionIcon = null,
    rightSectionOnClick = () => {},
    size = "sm",
    stepperPages,
    trieResults,
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

  const [trie] = useState(() => Trie.buildTrie(data));
  // const [trieResults, setTrieResults] = useState<string[]>([]);
  const [valueBuffer, setValueBuffer] = useState<string>(value);
  const [isPopoverOpened, { open: openPopover, close: closePopover }] =
    useDisclosure(false);

  const {
    globalState: { themeObject },
  } = useGlobalState();

  const {
    generalColors: {
      greenColorShade,
      grayColorShade,
      themeColorShades,
      redColorShade,
    },
  } = returnThemeColors({ themeObject, colorsSwatches: COLORS_SWATCHES });

  const rightIcon = rightSection
    ? (
      rightSectionIcon
        ? rightSectionIcon
        : (
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
    )
    : null;

  const { partials } = returnPartialValidations({
    name,
    stepperPages,
    validationFunctionsTable,
  });

  const isValueBufferValid = partials.every(([regexOrFunc, _validationText]) =>
    typeof regexOrFunc === "function"
      ? regexOrFunc(valueBuffer)
      : regexOrFunc.test(valueBuffer)
  );

  const leftIcon = icon ??
    (isValueBufferValid
      ? <TbCheck color={greenColorShade} size={18} />
      : valueBuffer.length === 0
      ? null
      : <TbX color={redColorShade} size={18} />);

  const validationTexts = returnValidationTexts({
    name,
    stepperPages,
    validationFunctionsTable,
    valueBuffer,
  });

  const { invalidValueTextElement } =
    createAccessibleValueValidationTextElements({
      isPopoverOpened,
      isValueBufferValid,
      name,
      themeObject,
      validationTexts,
      valueBuffer,
    });

  console.group("AccessibleSearchInput");
  console.log("trie", trie);
  console.log("trieResults", trieResults);
  console.log("valueBuffer", valueBuffer);
  console.log("isPopoverOpened", isPopoverOpened);
  console.groupEnd();

  const dropdown = trieResults.length
    ? (
      <Flex direction="column" mah={500} pr={2} style={{ overflow: "auto" }}>
        {trieResults.map((result, idx) => (
          <Text
            aria-live="polite"
            key={`${name}-${result}-${uniqueId}-${idx.toString()}`}
            onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
              setValueBuffer(event.currentTarget.innerText);
              parentDispatch({
                action: validValueAction,
                payload: event.currentTarget.innerText,
              });
              closePopover();
            }}
            onKeyDown={(event: React.KeyboardEvent<HTMLDivElement>) => {
              if (event.key === "ArrowDown") {
                console.log("down");
              }
            }}
            onMouseEnter={(
              event: React.MouseEvent<HTMLDivElement, MouseEvent>,
            ) => {
              event.currentTarget.style.backgroundColor =
                themeColorShades?.[1] ?? "";
            }}
            onMouseLeave={(
              event: React.MouseEvent<HTMLDivElement, MouseEvent>,
            ) => {
              event.currentTarget.style.backgroundColor = "transparent";
            }}
            p={8}
            style={{
              cursor: "pointer",
              borderRadius: 4,
              transition: "background-color 0.1s ease-in-out",
            }}
            tabIndex={0}
          >
            {result}
          </Text>
        ))}
      </Flex>
    )
    : <Text aria-live="polite">No results found</Text>;

  return (
    <Container
      key={`${name}-${value}-${uniqueId ?? ""}`}
      style={{ minWidth: INPUT_MIN_WIDTH, maxWidth: INPUT_MAX_WIDTH }}
      w="100%"
    >
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
            aria-describedby={isValueBufferValid ? void 0 : `${name}-invalid`}
            aria-invalid={!isValueBufferValid}
            aria-label={name}
            aria-required={required}
            autoComplete={autoComplete}
            color={grayColorShade}
            disabled={disabled}
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

              if (invalidValueAction) {
                parentDispatch({
                  action: invalidValueAction,
                  payload: {
                    kind: isValueBufferValid ? "delete" : "add",
                    page,
                  },
                });
              }

              onBlur?.();
              // closePopover();
            }}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              const {
                currentTarget: { value },
              } = event;

              setValueBuffer(value);
              // setTrieResults(() => trie.autoComplete(value));
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

        {isPopoverOpened && valueBuffer.length
          ? (
            <Popover.Dropdown>
              <Stack>
                {isValueBufferValid ? dropdown : invalidValueTextElement}
              </Stack>
            </Popover.Dropdown>
          )
          : null}
      </Popover>
    </Container>
  );
}

export { AccessibleSearchInput };

export type { AccessibleSearchInputAttributes };
