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
import { StepperPage, StepperChild, SetStepsInErrorPayload } from "../../../types";
import { returnThemeColors, splitCamelCase } from "../../../utils";
import {
  createAccessibleValueValidationTextElements,
  returnValidationTexts,
} from "../utils";

type AccessibleTextInputAttributes<
  ValidValueAction extends string = string,
  InvalidValueAction extends string = string
> = {
  ariaAutoComplete?: "both" | "list" | "none" | "inline";
  autoComplete?: "on" | "off";
  componentScaffolding: StepperPage[];
  disabled?: boolean;
  dynamicInputs?: ReactNode[]; // inputs created on demand by user
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
  placeholder?: string;
  ref?: RefObject<HTMLInputElement> | null;
  required?: boolean;
  rightSection?: boolean;
  rightSectionIcon?: ReactNode;
  rightSectionOnClick?: () => void;
  size?: MantineSize;
  /** stepper page location of input. default 0 */
  step?: number;
  withAsterisk?: boolean;
};

type AccessibleTextInputsProps<
  ValidValueAction extends string = string,
  InvalidValueAction extends string = string
> = {
  attributes: AccessibleTextInputAttributes<ValidValueAction, InvalidValueAction>;
};

function AccessibleTextInput<
  ValidValueAction extends string = string,
  InvalidValueAction extends string = string
>({ attributes }: AccessibleTextInputsProps<ValidValueAction, InvalidValueAction>) {
  const {
    ariaAutoComplete = "none",
    autoComplete = "off",
    componentScaffolding,
    disabled = false,
    dynamicInputs = null,
    icon = null,
    initialInputValue = "",
    invalidValueAction,
    label = splitCamelCase(attributes.name),
    maxLength = 75,
    minLength = 2,
    name = splitCamelCase(attributes.name),
    onBlur,
    onChange,
    onFocus,
    onKeyDown,
    parentDispatch,
    placeholder = "",
    ref = null,
    required = false,
    rightSection = false,
    rightSectionIcon = null,
    rightSectionOnClick = () => {},
    size = "sm",
    step = 0,
    validValueAction,
    value,
    withAsterisk = required,
  } = attributes;

  const [valueBuffer, setValueBuffer] = useState<string>(value);
  const [isPopoverOpened, { open: openPopover, close: closePopover }] =
    useDisclosure(false);

  const {
    globalState: { themeObject },
  } = useGlobalState();

  const {
    generalColors: { greenColorShade, grayColorShade },
  } = returnThemeColors({ themeObject, colorsSwatches: COLORS_SWATCHES });

  const dynamicInputLabel = dynamicInputs ? (
    <Group w="100%" position="apart" py="sm">
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
  )?.regexes ?? { full: /.*/, partials: [] };

  const validationTexts = returnValidationTexts({
    name,
    partials,
    value,
  });

  const isValueBufferValid = fullRegex.test(valueBuffer);

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

  const leftIcon = isValueBufferValid ? (
    icon ? (
      icon
    ) : (
      <TbCheck color={greenColorShade} size={18} />
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
            color={grayColorShade}
            disabled={disabled}
            error={!isValueBufferValid && valueBuffer !== initialInputValue}
            icon={leftIcon}
            label={dynamicInputLabel}
            maxLength={maxLength}
            minLength={minLength}
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
              // accessibleTextInputDispatch({
              //   type: accessibleTextInputAction.setPopoverOpened,
              //   payload: false,
              // });
            }}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setValueBuffer(event.currentTarget.value);
              console.log("event", event);
              // accessibleTextInputDispatch({
              //   type: accessibleTextInputAction.setValueBuffer,
              //   payload: event.currentTarget.value,
              // });

              onChange?.(event);
            }}
            onFocus={() => {
              openPopover();
              // accessibleTextInputDispatch({
              //   type: accessibleTextInputAction.setPopoverOpened,
              //   payload: true,
              // });

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
