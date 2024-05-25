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

import { COLORS_SWATCHES } from "../../../constants/data";
import { useGlobalState } from "../../../hooks";
import { SetPageInErrorPayload, StepperPage } from "../../../types";
import { returnThemeColors, splitCamelCase } from "../../../utils";
import {
  createAccessibleValueValidationTextElements,
  returnFullValidation,
  returnValidationTexts,
} from "../utils";
import { BinarySearchTree } from "../../../classes/binarySearchTree";

type AccessibleTextSearchInputAttributes<
  ValidValueAction extends string = string,
  InvalidValueAction extends string = string
> = {
  ariaAutoComplete?: "both" | "list" | "none" | "inline";
  autoComplete?: "on" | "off";
  data: string[];
  disabled?: boolean;
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

  validValueAction: ValidValueAction;
  invalidValueAction: InvalidValueAction;
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
  withAsterisk?: boolean;
};

type AccessibleTextSearchInputProps<
  ValidValueAction extends string = string,
  InvalidValueAction extends string = string
> = {
  attributes: AccessibleTextSearchInputAttributes<ValidValueAction, InvalidValueAction>;
};

function AccessibleTextSearchInput<
  ValidValueAction extends string = string,
  InvalidValueAction extends string = string
>({ attributes }: AccessibleTextSearchInputProps<ValidValueAction, InvalidValueAction>) {
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
    validValueAction,
    value,
    withAsterisk = required,
  } = attributes;

  const label = attributes.label ?? splitCamelCase(name);

  const [bst] = useState<BinarySearchTree<string>>(new BinarySearchTree<string>(data));
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

  const results = valueBuffer.length ? bst.search(valueBuffer) : [];

  const dropdown = results.length ? (
    <Flex direction="column" mah={500} pr={2} style={{ overflow: "auto" }}>
      {results.map((result) => (
        <Text
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
            transition: "background-color 0.15s ease-in-out",
          }}
        >
          {result}
        </Text>
      ))}
    </Flex>
  ) : null;

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
            // aria-describedby={
            //   isValueBufferValid
            //     ? // id of validValueTextElement
            //       `${name}-valid`
            //     : // id of invalidValueTextElement
            //       `${name}-invalid`
            // }
            // aria-invalid={!isValueBufferValid}
            aria-label={name}
            aria-required={required}
            autoComplete={autoComplete}
            color={grayColorShade}
            disabled={disabled}
            // error={!isValueBufferValid && valueBuffer !== initialInputValue}
            // icon={leftIcon}
            label={label}
            maxLength={maxLength}
            minLength={minLength}
            name={name}
            onBlur={() => {
              parentDispatch({
                action: validValueAction,
                payload: valueBuffer,
              });

              onBlur?.();
              // closePopover();
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

        {isPopoverOpened && results.length ? (
          <Popover.Dropdown>
            <Stack>{dropdown}</Stack>
          </Popover.Dropdown>
        ) : null}
      </Popover>
    </Container>
  );
}

export { AccessibleTextSearchInput };

export type { AccessibleTextSearchInputAttributes };
