import {
  Box,
  MantineColor,
  MantineNumberSize,
  MantineSize,
  SegmentedControl,
} from "@mantine/core";

type AccessibleSegmentedControlAttributes<
  ValidValueAction extends string = string,
  Payload extends string = string
> = {
  color?: MantineColor;
  data: Payload[];
  defaultValue?: Payload;
  disabled?: boolean;
  fullWidth?: boolean;
  label?: React.ReactNode;
  name: string;
  onChange?: (value: Payload) => void;
  orientation?: "horizontal" | "vertical";
  parentDispatch: React.Dispatch<{
    action: ValidValueAction;
    payload: Payload;
  }>;
  radius?: MantineNumberSize;
  readOnly?: boolean;
  size?: MantineSize;
  transitionDuration?: number;
  transitionTimingFunction?: string;
  validValueAction: ValidValueAction;
  value: Payload;
};

type AccessibleSegmentedControlProps<
  ValidValueAction extends string = string,
  Payload extends string = string
> = {
  attributes: AccessibleSegmentedControlAttributes<ValidValueAction, Payload>;
};

function AccessibleSegmentedControl<
  ValidValueAction extends string = string,
  Payload extends string = string
>({ attributes }: AccessibleSegmentedControlProps<ValidValueAction, Payload>) {
  const {
    color,
    data,
    defaultValue,
    disabled = false,
    fullWidth = false,
    name,
    onChange,
    orientation = "horizontal",
    parentDispatch,
    radius = "sm",
    readOnly = false,
    size = "sm",
    transitionDuration = 150,
    transitionTimingFunction = "ease",
    validValueAction,
    value,
  } = attributes;

  //   const {
  //     globalState: { themeObject },
  //   } = useGlobalState();

  //   const { switchOnTextElement, switchOffTextElement } =
  //     createAccessibleSwitchOnOffTextElements({
  //       checked,
  //       name,
  //       switchOffDescription,
  //       switchOnDescription,
  //       themeObject,
  //     });

  return (
    <Box>
      <SegmentedControl
        aria-label={name}
        color={color}
        data={data}
        defaultValue={defaultValue}
        disabled={disabled}
        fullWidth={fullWidth}
        onChange={(value: Payload) => {
          parentDispatch({ action: validValueAction, payload: value });
          onChange?.(value);
        }}
        orientation={orientation}
        radius={radius}
        readOnly={readOnly}
        size={size}
        transitionDuration={transitionDuration}
        transitionTimingFunction={transitionTimingFunction}
        value={value}
      />

      <Box
        style={
          // This is an invisible element that is used to provide screen reader users with additional information
          // @see https://webaim.org/techniques/css/invisiblecontent/
          {
            height: "1px",
            left: "-9999px",
            position: "absolute",
            top: "auto",
            width: "1px",
          }
        }
      >
        {/* {switchOnTextElement}
        {switchOffTextElement} */}
      </Box>
    </Box>
  );
}

export { AccessibleSegmentedControl };
export type { AccessibleSegmentedControlAttributes };
