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
            <Text size="sm">
              {name.length > 0 ? `${name[0].toUpperCase()}${name.slice(1)} is valid` : ""}
            </Text>
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

  const deselectedIcon =
    theme === "default" ? (
      <FontAwesomeIcon icon={faInfoCircle} color={redColorShade} />
    ) : null;

  const deselectedText = `For ${name}, no selection made.`;

  return [
    // selected text elem
    <Text
      id={`${name}-selected`}
      style={{ display: checked ? "block" : "none" }}
      color={theme === "muted" ? textColor : greenColorShade}
      w="100%"
      aria-live="polite"
    >
      {selectedIcon}
      {selectedText}
    </Text>,
    // deselected text elem
    <Text
      id={`${name}-deselected`}
      style={{ display: !checked ? "block" : "none" }}
      color={theme === "default" ? textColor : grayColorShade}
      w="100%"
      aria-live="polite"
    >
      {deselectedIcon}
      {deselectedText}
    </Text>,
  ];
}

type CreateAccessibleRadioSelectionTextElements = {
  checked: boolean;
  name: string;
  theme?: "muted" | "default";
  themeObject: ThemeObject;
  value: string;
};

function createAccessibleRadioScreenreaderTextElements({
  checked,
  name,
  themeObject,
  value,
  theme = "default",
}: CreateAccessibleRadioSelectionTextElements) {
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

  const text = `For ${name}, ${value} selected.`;

  const screenreaderTextElement = (
    <Text
      id={`${name}-selected`}
      style={{ display: checked ? "block" : "none" }}
      color={theme === "muted" ? textColor : greenColorShade}
      w="100%"
      aria-live="polite"
    >
      {icon}
      {text}
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

  const disabledIcon =
    theme === "default" ? (
      <FontAwesomeIcon icon={faInfoCircle} color={redColorShade} />
    ) : null;

  const defaultDisabledText = `One or more inputs are in error. ${name} disabled. Please fix errors before submitting form.`;

  return [
    // enabled text elem
    <Text
      id={`${name}-enabled`}
      style={{ display: isEnabled ? "block" : "none" }}
      color={theme === "muted" ? textColor : greenColorShade}
      w="100%"
      aria-live="polite"
    >
      {enabledIcon}
      {customEnabledText ?? defaultEnabledText}
    </Text>,
    // disabled text elem
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
    </Text>,
  ];
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
}: CreateAccessibleSliderSelectionTextElements) {
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

  const text = `For ${name}, ${value} selected.`;

  const screenreaderTextElement = (
    <Text
      id={`${name}-selected`}
      color={theme === "muted" ? textColor : greenColorShade}
      w="100%"
      aria-live="polite"
    >
      {icon}
      {text}
    </Text>
  );

  return { screenreaderTextElement };
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
  createAccessibleTextAreaInputs,
  createAccessibleTextInputs,
  createAccessibleValueValidationTextElements,
};
