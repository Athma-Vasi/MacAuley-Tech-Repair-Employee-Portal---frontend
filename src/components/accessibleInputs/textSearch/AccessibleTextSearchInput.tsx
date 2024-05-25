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

  // const initialAccessibleTextSearchInputState: AccessibleTextSearchInputState = {
  //   valueBuffer: value,
  // };
  // const [accessibleTextInputState, accessibleTextInputDispatch] = useReducer(
  //   accessibleTextInputReducer,
  //   initialAccessibleTextSearchInputState
  // );
  // const { valueBuffer } = accessibleTextInputState;

  // const [valueBuffer, setValueBuffer] = useState<string>(value);

  const [bst, setBst] = useState<BinarySearchTree<string>>(
    new BinarySearchTree<string>(data)
  );
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
              // parentDispatch({
              //   action: invalidValueAction,
              //   payload: {
              //     kind: isValueBufferValid ? "delete" : "add",
              //     page,
              //   },
              // });

              // parentDispatch({
              //   action: validValueAction,
              //   payload: valueBuffer,
              // });

              onBlur?.();
              closePopover();
            }}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              // setValueBuffer(event.currentTarget.value);
              // accessibleTextInputDispatch({
              //   action: accessibleTextInputAction.setValueBuffer,
              //   payload: event.currentTarget.value,
              // });
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
            // value={valueBuffer}
            width={300}
            withAsterisk={withAsterisk}
          />
        </Popover.Target>

        {/* {isPopoverOpened && valueBuffer.length ? (
          <Popover.Dropdown>
            <Stack>
              {isValueBufferValid ? validValueTextElement : invalidValueTextElement}
            </Stack>
          </Popover.Dropdown>
        ) : null} */}
      </Popover>
    </Container>
  );
}

export { AccessibleTextSearchInput };

export type { AccessibleTextSearchInputAttributes };
