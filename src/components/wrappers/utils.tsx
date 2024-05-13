import { faCheck, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Grid, Group, Text } from "@mantine/core";
import { TbCheck, TbExclamationCircle } from "react-icons/tb";

import { COLORS_SWATCHES } from "../../constants/data";
import { useGlobalState } from "../../hooks";
import { returnThemeColors } from "../../utils";
import {
  AccessibleTextAreaInput,
  AccessibleTextAreaInputAttributes,
} from "./AccessibleTextAreaInput";
import {
  AccessibleTextInput,
  AccessibleTextInputAttributes,
} from "./AccessibleTextInput";

type AccessibleErrorValidTextElemProps = {
  semanticName: string;
  inputText: string;
  isInputTextValid: boolean;
  isInputTextFocused: boolean;
  regexValidationText?: string | undefined;
};
/**
 * @returns [errorTextElement, validTextElement]
 */
function AccessibleErrorValidTextElements({
  semanticName,
  inputText,
  isInputTextValid,
  isInputTextFocused,
  regexValidationText,
}: AccessibleErrorValidTextElemProps): [React.JSX.Element, React.JSX.Element] {
  const {
    globalState: { themeObject },
  } = useGlobalState();

  const {
    generalColors: { redColorShade, greenColorShade },
  } = returnThemeColors({ themeObject, colorsSwatches: COLORS_SWATCHES });

  const errorTextElement = (
    <Text
      id={`${semanticName.split(" ").join("-")}-error`}
      style={{
        display: isInputTextFocused && inputText && !isInputTextValid ? "block" : "none",
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
            <Text>{regexValidationText}</Text>
          </Group>
        </Grid.Col>
      </Grid>
    </Text>
  );

  const validTextElement = (
    <Text
      id={`${semanticName.split(" ").join("-")}-valid`}
      style={{
        display: isInputTextFocused && inputText && isInputTextValid ? "block" : "none",
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
              {semanticName.length > 0
                ? `${semanticName[0].toUpperCase()}${semanticName.slice(1)} is valid`
                : ""}
            </Text>
          </Group>
        </Grid.Col>
      </Grid>
    </Text>
  );

  return [errorTextElement, validTextElement];
}

type AccessibleSelectedDeselectedTextElementsProps = {
  semanticName: string;
  isSelected: boolean;
  selectedDescription: string;
  deselectedDescription: string;
  theme?: "muted" | "default";
};
/**
 * @returns [selectedTextElement, deselctedTextElement]
 */
function AccessibleSelectedDeselectedTextElements({
  semanticName,
  isSelected,
  selectedDescription,
  deselectedDescription,
  theme = "default",
}: AccessibleSelectedDeselectedTextElementsProps): [
  React.JSX.Element,
  React.JSX.Element
] {
  const {
    globalState: { themeObject },
  } = useGlobalState();

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

  const selectedText = `${semanticName[0].toUpperCase()}${semanticName.slice(
    1
  )}, ${selectedDescription} ${
    selectedDescription.split(",").length > 1 ? "is" : "are"
  } selected.`;

  const deselectedIcon =
    theme === "default" ? (
      <FontAwesomeIcon icon={faInfoCircle} color={redColorShade} />
    ) : null;

  const deselectedText = `${semanticName[0].toUpperCase()}${semanticName.slice(
    1
  )} deselected. ${deselectedDescription}`;

  return [
    // selected text elem
    <Text
      id={`${semanticName.split(" ").join("-")}-selected`}
      style={{ display: isSelected ? "block" : "none" }}
      color={theme === "muted" ? textColor : greenColorShade}
      w="100%"
      aria-live="polite"
    >
      {selectedIcon}
      {selectedText}
    </Text>,
    // deselected text elem
    <Text
      id={`${semanticName.split(" ").join("-")}-deselected`}
      style={{ display: !isSelected ? "block" : "none" }}
      color={
        theme === "default"
          ? deselectedDescription.length > 0
            ? redColorShade
            : textColor
          : grayColorShade
      }
      w="100%"
      aria-live="polite"
    >
      {deselectedIcon}
      {deselectedText}
    </Text>,
  ];
}

type AccessibleEnabledDisabledTextElemProps = {
  semanticName: string;
  isEnabled: boolean;
  enabledAccessibleText?: string;
  disabledAccessibleText?: string;
  theme?: "muted" | "default";
};
/**
 * @returns [enabledTextElement, disabledTextElement]
 */
function AccessibleEnabledDisabledButtonTextElements({
  semanticName,
  isEnabled,
  disabledAccessibleText,
  enabledAccessibleText,
  theme = "default",
}: AccessibleEnabledDisabledTextElemProps): [React.JSX.Element, React.JSX.Element] {
  const {
    globalState: { themeObject },
  } = useGlobalState();

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

  const enabledText = `All form inputs are valid. ${semanticName[0].toUpperCase()}${semanticName.slice(
    1
  )} is enabled. You may submit the form.`;

  const disabledIcon =
    theme === "default" ? (
      <FontAwesomeIcon icon={faInfoCircle} color={redColorShade} />
    ) : null;

  const disabledText = `One or more inputs are in error. ${semanticName[0].toUpperCase()}${semanticName.slice(
    1
  )} disabled. Please fix errors before submitting the form.`;

  return [
    // enabled text elem
    <Text
      id={`${semanticName.split(" ").join("-")}-enabled`}
      style={{ display: isEnabled ? "block" : "none" }}
      color={theme === "muted" ? textColor : greenColorShade}
      w="100%"
      aria-live="polite"
    >
      {enabledIcon}
      {enabledAccessibleText ?? enabledText}
    </Text>,
    // disabled text elem
    <Text
      id={`${semanticName.split(" ").join("-")}-disabled`}
      style={{ display: !isEnabled ? "block" : "none" }}
      color={
        theme === "default" ? (!isEnabled ? redColorShade : textColor) : grayColorShade
      }
      w="100%"
      aria-live="polite"
    >
      {disabledIcon}
      {disabledAccessibleText ?? disabledText}
    </Text>,
  ];
}

function createAccessibleTextInputs(attributesArray: AccessibleTextInputAttributes[]) {
  return attributesArray.map((attributes, index) => (
    <AccessibleTextInput
      key={`${index}-${attributes.semanticName}`}
      attributes={attributes}
    />
  ));
}

function createAccessibleTextAreaInputs(
  attributesArray: AccessibleTextAreaInputAttributes[]
) {
  return attributesArray.map((attributes, index) => (
    <AccessibleTextAreaInput
      key={`${index}-${attributes.semanticName}`}
      attributes={attributes}
    />
  ));
}

export {
  AccessibleEnabledDisabledButtonTextElements,
  AccessibleErrorValidTextElements,
  AccessibleSelectedDeselectedTextElements,
  createAccessibleTextAreaInputs,
  createAccessibleTextInputs,
};
