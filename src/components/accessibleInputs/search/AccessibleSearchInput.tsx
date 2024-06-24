import {
  Container,
  Flex,
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

import { Trie } from "../../../classes/trie";
import { COLORS_SWATCHES } from "../../../constants/data";
import { VALIDATION_FUNCTIONS_TABLE } from "../../../constants/validations";
import { useGlobalState } from "../../../hooks";
import {
  SetPageInErrorPayload,
  StepperPage,
  ValidationFunctionsTable,
} from "../../../types";
import { returnThemeColors, splitCamelCase } from "../../../utils";
import {
  createAccessibleValueValidationTextElements,
  returnFullValidation,
  returnValidationTexts,
} from "../utils";

type AccessibleSearchInputAttributes<
  ValidValueAction extends string = string,
  InvalidValueAction extends string = string
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
  validationFunctionsTable?: ValidationFunctionsTable;
  validValueAction: ValidValueAction;
  value: string;
  withAsterisk?: boolean;
};

type AccessibleSearchInputProps<
  ValidValueAction extends string = string,
  InvalidValueAction extends string = string
> = {
  attributes: AccessibleSearchInputAttributes<ValidValueAction, InvalidValueAction>;
};

function AccessibleSearchInput<
  ValidValueAction extends string = string,
  InvalidValueAction extends string = string
>({ attributes }: AccessibleSearchInputProps<ValidValueAction, InvalidValueAction>) {
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
  const [trieResults, setTrieResults] = useState<string[]>([]);
  const [valueBuffer, setValueBuffer] = useState<string>(value);
  const [isPopoverOpened, { open: openPopover, close: closePopover }] =
    useDisclosure(false);

  const {
    globalState: { themeObject },
  } = useGlobalState();

  const {
    generalColors: { greenColorShade, grayColorShade, themeColorShades },
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
    valueBuffer,
  });

  const { invalidValueTextElement } = createAccessibleValueValidationTextElements({
    isPopoverOpened,
    isValueBufferValid,
    name,
    themeObject,
    validationTexts,
    valueBuffer,
  });

  const dropdown = trieResults.length ? (
    <Flex direction="column" mah={500} pr={2} style={{ overflow: "auto" }}>
      {trieResults.map((result) => (
        <Text
          aria-live="polite"
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
          onMouseEnter={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            event.currentTarget.style.backgroundColor = themeColorShades?.[1] ?? "";
          }}
          onMouseLeave={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
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
  ) : (
    <Text aria-live="polite">No results found</Text>
  );

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
              setTrieResults(trie.autoComplete(value));
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
            <Stack>{isValueBufferValid ? dropdown : invalidValueTextElement}</Stack>
          </Popover.Dropdown>
        ) : null}
      </Popover>
    </Container>
  );
}

export { AccessibleSearchInput };

export type { AccessibleSearchInputAttributes };
