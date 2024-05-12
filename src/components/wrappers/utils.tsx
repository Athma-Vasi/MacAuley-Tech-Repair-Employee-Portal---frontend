import { faCheck, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Grid, Group, Text } from "@mantine/core";
import { TbCheck, TbExclamationCircle } from "react-icons/tb";

import { COLORS_SWATCHES } from "../../constants/data";
import { useGlobalState } from "../../hooks";
import { returnThemeColors } from "../../utils";

type AccessibleErrorValidTextElemProps = {
  inputElementKind: string;
  inputText: string;
  isValidInputText: boolean;
  isInputTextFocused: boolean;
  regexValidationText?: string | undefined;
};

function AccessibleErrorValidTextElements({
  inputElementKind,
  inputText,
  isValidInputText,
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
      id={`${inputElementKind.split(" ").join("-")}-input-note-error`}
      style={{
        display: isInputTextFocused && inputText && !isValidInputText ? "block" : "none",
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
      id={`${inputElementKind.split(" ").join("-")}-input-note-valid`}
      style={{
        display: isInputTextFocused && inputText && isValidInputText ? "block" : "none",
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
              {inputElementKind.length > 0
                ? `${inputElementKind[0].toUpperCase()}${inputElementKind.slice(
                    1
                  )} is valid`
                : ""}
            </Text>
          </Group>
        </Grid.Col>
      </Grid>
    </Text>
  );

  return [errorTextElement, validTextElement];
}

type ReturnAccessibleSelectedDeselectedTextElementsProps = {
  semanticName: string;
  isSelected: boolean;
  selectedDescription?: string;
  deselectedDescription?: string;
  theme?: "muted" | "default";
};

function AccessibleSelectedDeselectedTextElements({
  semanticName,
  isSelected,
  selectedDescription = "",
  deselectedDescription = "",
  theme = "default",
}: ReturnAccessibleSelectedDeselectedTextElementsProps): [
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

  return [
    // selected text elem
    <Text
      id={`${semanticName.split(" ").join("-")}-selected`}
      style={{ display: isSelected ? "block" : "none" }}
      color={theme === "muted" ? textColor : greenColorShade}
      w="100%"
      aria-live="polite"
    >
      {theme === "default" ? (
        <FontAwesomeIcon icon={faCheck} color={greenColorShade} />
      ) : null}{" "}
      {`${semanticName[0].toUpperCase()}${semanticName.slice(1)} selected${
        selectedDescription.length > 0 ? ` - ${selectedDescription}` : ""
      }`}
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
      {theme === "default" ? (
        <FontAwesomeIcon icon={faInfoCircle} color={redColorShade} />
      ) : null}{" "}
      {`${semanticName[0].toUpperCase()}${semanticName.slice(1)} deselected${
        deselectedDescription.length > 0 ? ` - ${deselectedDescription}` : ""
      }`}
    </Text>,
  ];
}

export { AccessibleErrorValidTextElements, AccessibleSelectedDeselectedTextElements };
