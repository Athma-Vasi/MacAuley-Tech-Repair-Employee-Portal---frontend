import {
  DefaultProps,
  NumberInput,
  NumberInputHandlers,
  NumberInputStylesNames,
  TextInput,
} from "@mantine/core";

type Formatter = (value: string | "") => string;
type Parser = (value: string | "") => string;

interface NumberInputProps
  extends DefaultProps<NumberInputStylesNames>,
    Omit<
      React.ComponentPropsWithoutRef<typeof TextInput>,
      "onChange" | "value" | "classNames" | "styles" | "type"
    > {
  /** Called when value changes */
  onChange?(value: number | ""): void;
  /** Input value for controlled component */
  value?: number | "";
  /** Default value for uncontrolled component */
  defaultValue?: number | "";
  /** The decimal separator */
  decimalSeparator?: string;
  /** The thousands separator */
  thousandsSeparator?: string;
  /** Maximum possible value */
  max?: number;
  /** Minimal possible value */
  min?: number;
  /** First value if no initial value was set and increment/decrement is triggered using controls or up/down arrows */
  startValue?: number;
  /** Number by which value will be incremented/decremented with controls and up/down arrows */
  step?: number;
  /** Delay before stepping the value. Can be a number of milliseconds or a function that receives the current step count and returns the delay in milliseconds. */
  stepHoldInterval?: number | ((stepCount: number) => number);
  /** Initial delay in milliseconds before stepping the value. */
  stepHoldDelay?: number;
  /** Removes increment/decrement controls */
  hideControls?: boolean;
  /** Amount of digits after the decimal point  */
  precision?: number;
  /** Only works if a precision is given, removes the trailing zeros, false by default */
  removeTrailingZeros?: boolean;
  /** Prevent value clamp on blur */
  noClampOnBlur?: boolean;
  /** Get increment/decrement handlers */
  handlersRef?: React.ForwardedRef<NumberInputHandlers | undefined>;
  /** Formats the number into the input */
  formatter?: Formatter;
  /** Parses the value from formatter, should be used with formatter at the same time */
  parser?: Parser;
  /** Input type, defaults to text */
  type?: "text" | "number";
}

type AccessibleNumberInputCreatorInfo = NumberInputProps;

type NumberInputWrapperProps = {
  creatorInfoObject: AccessibleNumberInputCreatorInfo;
};

function NumberInputWrapper({ creatorInfoObject }: NumberInputWrapperProps) {
  const {
    label = "",
    description = "",
    required = false,
    value,
    onChange,
    min = 0,
    max = 100,
    step = 1,
    hideControls = false,
    placeholder = "",
    radius = "sm",
    size = "sm",
    style = {},
    type = "number",
    ...others
  } = creatorInfoObject;

  return (
    <NumberInput
      label={label}
      description={description}
      required={required}
      value={value}
      onChange={onChange}
      min={min}
      max={max}
      step={step}
      hideControls={hideControls}
      placeholder={placeholder}
      radius={radius}
      size={size}
      style={style}
      type={type}
      {...others}
    />
  );
}

export { NumberInputWrapper };
