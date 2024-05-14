import { faCheck, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Grid, Group, Text } from "@mantine/core";
import { TbCheck, TbExclamationCircle } from "react-icons/tb";

import { COLORS_SWATCHES } from "../../constants/data";
import { ThemeObject } from "../../context/globalProvider/types";
import { replaceLastCommaWithAnd, returnThemeColors } from "../../utils";
import {
  AccessibleTextAreaInput,
  AccessibleTextAreaInputAttributes,
} from "./AccessibleTextAreaInput";
import {
  AccessibleTextInput,
  AccessibleTextInputAttributes,
} from "./AccessibleTextInput";

type CreateAccessibleValueValidationTextElements = {
  name: string;
  valueBuffer: string;
  isValueBufferValid: boolean;
  isInputFocused: boolean;
  themeObject: ThemeObject;
  validationText?: string | undefined;
};
/**
 * @returns [validValueTextElement, invalidValueTextElement]
 */
function createAccessibleValueValidationTextElements({
  name,
  valueBuffer,
  isValueBufferValid,
  isInputFocused,
  themeObject,
  validationText,
}: CreateAccessibleValueValidationTextElements): [React.JSX.Element, React.JSX.Element] {
  const {
    generalColors: { redColorShade, greenColorShade },
  } = returnThemeColors({ themeObject, colorsSwatches: COLORS_SWATCHES });

  const invalidValueTextElement = (
    <Text
      id={`${name}-invalid`}
      style={{
        display: isInputFocused && valueBuffer && !isValueBufferValid ? "block" : "none",
      }}
      w="100%"
      aria-live="polite"
    >
      <Grid columns={14}>
        <Grid.Col span={2}>
          <Group position="center">
            <TbExclamationCircle color={redColorShade} size={22} />
          </Group>
        </Grid.Col>
        <Grid.Col span={12}>
          <Group position="right">
            <Text>{validationText}</Text>
          </Group>
        </Grid.Col>
      </Grid>
    </Text>
  );

  const validValueTextElement = (
    <Text
      id={`${name}-valid`}
      style={{
        display: isInputFocused && valueBuffer && isValueBufferValid ? "block" : "none",
      }}
      color={greenColorShade}
      w="100%"
      aria-live="polite"
    >
      <Grid columns={14}>
        <Grid.Col span={2}>
          <Group position="center">
            <TbCheck color={greenColorShade} size={22} />
          </Group>
        </Grid.Col>
        <Grid.Col span={12}>
          <Group position="left">
            <Text size="sm">{`${name[0].toUpperCase()}${name.slice(1)} is valid`}</Text>
          </Group>
        </Grid.Col>
      </Grid>
    </Text>
  );

  return [validValueTextElement, invalidValueTextElement];
}

type CreateAccessibleCheckboxSelectionsTextElements = {
  checked: boolean;
  kind: "single" | "group";
  name: string;
  theme?: "muted" | "default";
  themeObject: ThemeObject;
  value: string | string[];
};
/**
 * @returns [selectedTextElement, deselctedTextElement]
 */
function createAccessibleCheckboxSelectionsTextElements({
  checked,
  kind,
  name,
  theme = "default",
  themeObject,
  value,
}: CreateAccessibleCheckboxSelectionsTextElements): [
  React.JSX.Element,
  React.JSX.Element
] {
  const {
    generalColors: { greenColorShade, textColor, grayColorShade, redColorShade },
  } = returnThemeColors({
    themeObject,
    colorsSwatches: COLORS_SWATCHES,
  });

  const selectedIcon =
    theme === "default" ? (
      <FontAwesomeIcon icon={faCheck} color={greenColorShade} />
    ) : null;

  const selectedText =
    kind === "single"
      ? `For ${name}, ${value} selected.`
      : `For ${name}, ${replaceLastCommaWithAnd(
          Array.isArray(value) ? value.join(", ") : value
        )} ${value.length > 1 ? "are" : "is"} selected.`;

  const selectedTextElement = (
    <Text
      id={`${name}-selected`}
      style={{ display: checked ? "block" : "none" }}
      color={theme === "muted" ? textColor : greenColorShade}
      w="100%"
      aria-live="polite"
    >
      {selectedIcon}
      {selectedText}
    </Text>
  );

  const deselectedIcon =
    theme === "default" ? (
      <FontAwesomeIcon icon={faInfoCircle} color={redColorShade} />
    ) : null;

  const deselectedText = `For ${name}, no selection made.`;

  const deselectedTextElement = (
    <Text
      id={`${name}-deselected`}
      style={{ display: !checked ? "block" : "none" }}
      color={theme === "default" ? textColor : grayColorShade}
      w="100%"
      aria-live="polite"
    >
      {deselectedIcon}
      {deselectedText}
    </Text>
  );

  return [selectedTextElement, deselectedTextElement];
}

type CreateAccessibleRadioSelectionTextElements = {
  checked: boolean;
  name: string;
  theme?: "muted" | "default";
  themeObject: ThemeObject;
  value: string;
};

type CreateAccessibleSelectionTextElementsOutput = {
  screenreaderTextElement: React.JSX.Element;
};

function createAccessibleRadioScreenreaderTextElements({
  checked,
  name,
  themeObject,
  value,
  theme = "default",
}: CreateAccessibleRadioSelectionTextElements): CreateAccessibleSelectionTextElementsOutput {
  const {
    generalColors: { greenColorShade, textColor },
  } = returnThemeColors({
    themeObject,
    colorsSwatches: COLORS_SWATCHES,
  });

  const icon =
    theme === "default" ? (
      <FontAwesomeIcon icon={faCheck} color={greenColorShade} />
    ) : null;

  const screenreaderTextElement = (
    <Text
      id={`${name}-selected`}
      style={{ display: checked ? "block" : "none" }}
      color={theme === "muted" ? textColor : greenColorShade}
      w="100%"
      aria-live="polite"
    >
      {icon}
      {`For ${name}, ${value} selected.`}
    </Text>
  );

  return { screenreaderTextElement };
}

type CreateAccessibleButtonScreenreaderTextElements = {
  customDisabledText?: string;
  customEnabledText?: string;
  isEnabled: boolean;
  name: string;
  theme?: "muted" | "default";
  themeObject: ThemeObject;
};
/**
 * @returns [enabledTextElement, disabledTextElement]
 */
function createAccessibleButtonScreenreaderTextElements({
  customDisabledText,
  customEnabledText,
  isEnabled,
  name,
  theme = "default",
  themeObject,
}: CreateAccessibleButtonScreenreaderTextElements): [
  React.JSX.Element,
  React.JSX.Element
] {
  const {
    generalColors: { greenColorShade, textColor, grayColorShade, redColorShade },
  } = returnThemeColors({
    themeObject,
    colorsSwatches: COLORS_SWATCHES,
  });

  const enabledIcon =
    theme === "default" ? (
      <FontAwesomeIcon icon={faCheck} color={greenColorShade} />
    ) : null;

  const defaultEnabledText = `All form inputs are valid. ${name} is enabled. You may submit the form.`;

  const enabledTextElement = (
    <Text
      id={`${name}-enabled`}
      style={{ display: isEnabled ? "block" : "none" }}
      color={theme === "muted" ? textColor : greenColorShade}
      w="100%"
      aria-live="polite"
    >
      {enabledIcon}
      {customEnabledText ?? defaultEnabledText}
    </Text>
  );

  const disabledIcon =
    theme === "default" ? (
      <FontAwesomeIcon icon={faInfoCircle} color={redColorShade} />
    ) : null;

  const defaultDisabledText = `One or more inputs are in error. ${name} disabled. Please fix errors before submitting form.`;

  const disabledTextElement = (
    <Text
      id={`${name}-disabled`}
      style={{ display: !isEnabled ? "block" : "none" }}
      color={
        theme === "default" ? (!isEnabled ? redColorShade : textColor) : grayColorShade
      }
      w="100%"
      aria-live="polite"
    >
      {disabledIcon}
      {customDisabledText ?? defaultDisabledText}
    </Text>
  );

  return [enabledTextElement, disabledTextElement];
}

type CreateAccessibleSliderSelectionTextElements = {
  name: string;
  theme?: "muted" | "default";
  themeObject: ThemeObject;
  value: number;
};

function createAccessibleSliderScreenreaderTextElements({
  name,
  theme = "default",
  themeObject,
  value,
}: CreateAccessibleSliderSelectionTextElements): CreateAccessibleSelectionTextElementsOutput {
  const {
    generalColors: { greenColorShade, textColor },
  } = returnThemeColors({
    themeObject,
    colorsSwatches: COLORS_SWATCHES,
  });

  const icon =
    theme === "default" ? (
      <FontAwesomeIcon icon={faCheck} color={greenColorShade} />
    ) : null;

  const screenreaderTextElement = (
    <Text
      id={`${name}-selected`}
      color={theme === "muted" ? textColor : greenColorShade}
      w="100%"
      aria-live="polite"
    >
      {icon}
      {`For ${name}, ${value} selected.`}
    </Text>
  );

  return { screenreaderTextElement };
}

type CreateAccessibleSwitchSelectionTextElements = {
  checked: boolean;
  name: string;
  switchOffDescription?: string;
  switchOnDescription?: string;
  theme?: "muted" | "default";
  themeObject: ThemeObject;
};
/**
 * @returns [switchOnTextElement, switchOffTextElement]
 */
function createAccessibleSwitchOnOffTextElements({
  checked,
  name,
  switchOffDescription,
  switchOnDescription,
  themeObject,
  theme = "default",
}: CreateAccessibleSwitchSelectionTextElements): [React.JSX.Element, React.JSX.Element] {
  const {
    generalColors: { themeColorShade, textColor, grayColorShade },
  } = returnThemeColors({
    themeObject,
    colorsSwatches: COLORS_SWATCHES,
  });

  const switchOnIcon =
    theme === "default" ? (
      <FontAwesomeIcon icon={faCheck} color={themeColorShade} />
    ) : null;

  const switchOnTextElement = (
    <Text
      id={`${name}-on`}
      style={{ display: checked ? "block" : "none" }}
      color={theme === "muted" ? textColor : themeColorShade}
      w="100%"
      aria-live="polite"
    >
      {switchOnIcon}
      {`${name} is on. ${switchOnDescription}`}
    </Text>
  );

  const switchOffIcon =
    theme === "default" ? (
      <FontAwesomeIcon icon={faInfoCircle} color={grayColorShade} />
    ) : null;

  const switchOffTextElement = (
    <Text
      id={`${name}-off`}
      style={{ display: !checked ? "block" : "none" }}
      color={theme === "default" ? textColor : grayColorShade}
      w="100%"
      aria-live="polite"
    >
      {switchOffIcon}
      {`${name} is off. ${switchOffDescription}`}
    </Text>
  );

  return [switchOnTextElement, switchOffTextElement];
}

function createAccessibleTextInputs(attributesArray: AccessibleTextInputAttributes[]) {
  return attributesArray.map((attributes, index) => (
    <AccessibleTextInput key={`${index}-${attributes.name}`} attributes={attributes} />
  ));
}

function createAccessibleTextAreaInputs(
  attributesArray: AccessibleTextAreaInputAttributes[]
) {
  return attributesArray.map((attributes, index) => (
    <AccessibleTextAreaInput
      key={`${index}-${attributes.name}`}
      attributes={attributes}
    />
  ));
}

export {
  createAccessibleButtonScreenreaderTextElements,
  createAccessibleCheckboxSelectionsTextElements,
  createAccessibleRadioScreenreaderTextElements,
  createAccessibleSliderScreenreaderTextElements,
  createAccessibleSwitchOnOffTextElements,
  createAccessibleTextAreaInputs,
  createAccessibleTextInputs,
  createAccessibleValueValidationTextElements,
};
