import { faCheck, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Grid, Group, Text } from "@mantine/core";
import { TbCheck, TbExclamationCircle } from "react-icons/tb";

import { COLORS_SWATCHES } from "../../constants/data";
import { VALIDATION_FUNCTIONS_TABLE } from "../../constants/validations";
import { ThemeObject } from "../../context/globalProvider/types";
import { StepperPage, Validation, ValidationFunctionsTable } from "../../types";
import { capitalizeJoinWithAnd, returnThemeColors, splitCamelCase } from "../../utils";
import { AccessibleButton, AccessibleButtonAttributes } from "./AccessibleButton";
import {
  AccessibleCheckboxInputGroup,
  AccessibleCheckboxInputGroupAttributes,
  AccessibleCheckboxInputSingle,
  AccessibleCheckboxInputSingleAttributes,
} from "./AccessibleCheckboxInput";
import {
  AccessibleDateTimeInput,
  AccessibleDateTimeInputAttributes,
} from "./AccessibleDateTimeInput";
import {
  AccessibleRadioInputGroup,
  AccessibleRadioInputGroupAttributes,
  AccessibleRadioInputSingle,
  AccessibleRadioInputSingleAttributes,
} from "./AccessibleRadioInput";
import {
  AccessibleSelectInput,
  AccessibleSelectInputAttributes,
} from "./AccessibleSelectInput";
import {
  AccessibleSwitchInput,
  AccessibleSwitchInputAttributes,
} from "./AccessibleSwitchInput";
import {
  AccessibleTextAreaInput,
  AccessibleTextAreaInputAttributes,
} from "./AccessibleTextAreaInput";
import {
  AccessibleTextInputPhone,
  AccessibleTextInputPhoneAttributes,
} from "./AccessibleTextInputPhone";
import {
  AccessibleTextInputPostal,
  AccessibleTextInputPostalAttributes,
} from "./AccessibleTextInputPostal";
import {
  AccessibleTextInput,
  AccessibleTextInputAttributes,
} from "./text/AccessibleTextInput";

type CreateAccessibleValueValidationTextElements = {
  isPopoverOpened: boolean;
  isValueBufferValid: boolean;
  name: string;
  themeObject: ThemeObject;
  valueBuffer: string;
  validationTexts: {
    valueInvalidText: string;
    valueValidText: string;
  };
};

function createAccessibleValueValidationTextElements({
  isPopoverOpened,
  isValueBufferValid,
  name,
  themeObject,
  valueBuffer,
  validationTexts: { valueInvalidText, valueValidText },
}: CreateAccessibleValueValidationTextElements): {
  validValueTextElement: React.JSX.Element;
  invalidValueTextElement: React.JSX.Element;
} {
  const {
    generalColors: { redColorShade, greenColorShade },
  } = returnThemeColors({ themeObject, colorsSwatches: COLORS_SWATCHES });

  const invalidValueTextElement = (
    <Text
      id={`${name}-invalid`}
      style={{
        display: isPopoverOpened && valueBuffer && !isValueBufferValid ? "block" : "none",
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
            <Text>{valueInvalidText}</Text>
          </Group>
        </Grid.Col>
      </Grid>
    </Text>
  );

  const validValueTextElement = (
    <Text
      id={`${name}-valid`}
      style={{
        display: isPopoverOpened && valueBuffer && isValueBufferValid ? "block" : "none",
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
            <Text size="sm">{valueValidText}</Text>
          </Group>
        </Grid.Col>
      </Grid>
    </Text>
  );

  return { validValueTextElement, invalidValueTextElement };
}

type CreateAccessibleCheckboxSelectionsTextElements = {
  checked: boolean;
  isIcons?: boolean;
  kind: "single" | "group";
  name: string;
  theme?: "muted" | "default";
  themeObject: ThemeObject;
  value: string | string[];
};

function createAccessibleCheckboxSelectionsTextElements({
  checked,
  isIcons = false,
  kind,
  name,
  theme = "default",
  themeObject,
  value,
}: CreateAccessibleCheckboxSelectionsTextElements): {
  selectedTextElement: React.JSX.Element;
  deselectedTextElement: React.JSX.Element;
} {
  const {
    generalColors: { greenColorShade, grayColorShade, redColorShade, darkSchemeGray },
  } = returnThemeColors({
    themeObject,
    colorsSwatches: COLORS_SWATCHES,
  });

  const selectedIcon =
    theme === "default" ? (
      <FontAwesomeIcon icon={faCheck} color={greenColorShade} />
    ) : null;

  const stringifiedValue = Array.isArray(value) ? capitalizeJoinWithAnd(value) : value;

  const selectedText =
    kind === "single"
      ? `${value} selected.`
      : `${stringifiedValue} ${value.length > 1 ? "are" : "is"} selected.`;

  const selectedTextElement = (
    <Text
      id={`${name}-selected`}
      style={{ display: checked ? "block" : "none" }}
      color={darkSchemeGray}
      w="100%"
      aria-live="polite"
    >
      {isIcons ? selectedIcon : null} {selectedText}
    </Text>
  );

  const deselectedIcon =
    theme === "default" ? (
      <FontAwesomeIcon icon={faInfoCircle} color={redColorShade} />
    ) : null;

  const deselectedText = "No selection made.";

  const deselectedTextElement = (
    <Text
      id={`${name}-deselected`}
      style={{ display: !checked ? "block" : "none" }}
      color={theme === "default" ? darkSchemeGray : grayColorShade}
      w="100%"
      aria-live="polite"
    >
      {isIcons ? deselectedIcon : null} {deselectedText}
    </Text>
  );

  return { selectedTextElement, deselectedTextElement };
}

type CreateAccessibleRadioSelectionTextElements = {
  name: string;
  theme?: "muted" | "default";
  themeObject: ThemeObject;
  value: string;
};

function createAccessibleRadioScreenreaderTextElements({
  name,
  themeObject,
  value,
  theme = "default",
}: CreateAccessibleRadioSelectionTextElements): {
  screenreaderTextElement: React.JSX.Element;
} {
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

type CreateAccessibleButtonScreenreaderTextElements = {
  disabledScreenreaderText?: string;
  enabledScreenreaderText?: string;
  isEnabled: boolean;
  name: string;
  theme?: "muted" | "default";
  themeObject: ThemeObject;
  type?: "submit" | "button" | "reset";
};

function createAccessibleButtonScreenreaderTextElements({
  disabledScreenreaderText,
  enabledScreenreaderText,
  isEnabled,
  name,
  theme = "default",
  themeObject,
  type = "submit",
}: CreateAccessibleButtonScreenreaderTextElements): {
  enabledTextElement: React.JSX.Element;
  disabledTextElement: React.JSX.Element;
} {
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
      {enabledScreenreaderText ?? defaultEnabledText}
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
      {disabledScreenreaderText ?? defaultDisabledText}
    </Text>
  );

  return { enabledTextElement, disabledTextElement };
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
}: CreateAccessibleSliderSelectionTextElements): {
  screenreaderTextElement: React.JSX.Element;
} {
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

function createAccessibleSwitchOnOffTextElements({
  checked,
  name,
  switchOffDescription,
  switchOnDescription,
  themeObject,
  theme = "default",
}: CreateAccessibleSwitchSelectionTextElements): {
  switchOnTextElement: React.JSX.Element;
  switchOffTextElement: React.JSX.Element;
} {
  const {
    generalColors: { grayColorShade, redColorShade, greenColorShade },
  } = returnThemeColors({
    themeObject,
    colorsSwatches: COLORS_SWATCHES,
  });

  const switchOnIcon =
    theme === "default" ? (
      <FontAwesomeIcon icon={faCheck} color={greenColorShade} />
    ) : null;

  const switchOnText = switchOnDescription ?? `${name} is on.`;

  const switchOnTextElement = (
    <Text
      id={`${name}-on`}
      // style={{ display: checked ? "block" : "none" }}
      color={grayColorShade}
      w="100%"
      aria-live="polite"
    >
      {switchOnIcon} {switchOnText}
    </Text>
  );

  const switchOffIcon =
    theme === "default" ? (
      <FontAwesomeIcon icon={faInfoCircle} color={redColorShade} />
    ) : null;

  const switchOffText = switchOffDescription ?? `${name} is off.`;

  const switchOffTextElement = (
    <Text
      id={`${name}-off`}
      // style={{ display: !checked ? "block" : "none" }}
      color={theme === "default" ? redColorShade : grayColorShade}
      w="100%"
      aria-live="polite"
    >
      {switchOffIcon} {switchOffText}
    </Text>
  );

  return { switchOnTextElement, switchOffTextElement };
}

function createAccessibleTextInputs<
  ValidValueAction extends string = string,
  InvalidValueAction extends string = string
>(
  attributesArray: AccessibleTextInputAttributes<ValidValueAction, InvalidValueAction>[]
): React.JSX.Element[] {
  return attributesArray.map((attributes, index) => (
    <AccessibleTextInput key={`${index}-${attributes.name}`} attributes={attributes} />
  ));
}

function createAccessibleTextAreaInputs<
  ValidValueAction extends string = string,
  InvalidValueAction extends string = string
>(
  attributesArray: AccessibleTextAreaInputAttributes<
    ValidValueAction,
    InvalidValueAction
  >[]
): React.JSX.Element[] {
  return attributesArray.map((attributes, index) => (
    <AccessibleTextAreaInput
      key={`${index}-${attributes.name}`}
      attributes={attributes}
    />
  ));
}

function createAccessibleCheckboxSingleInputs<
  ValidValueAction extends string = string,
  InvalidValueAction extends string = string
>(
  attributesArray: AccessibleCheckboxInputSingleAttributes<
    ValidValueAction,
    InvalidValueAction
  >[]
): React.JSX.Element[] {
  return attributesArray.map((attributes, index) => (
    <AccessibleCheckboxInputSingle
      key={`${index}-${attributes.name}`}
      attributes={attributes}
    />
  ));
}

function createAccessibleCheckboxGroupInputs<
  ValidValueAction extends string = string,
  Payload extends string = string
>(
  attributesArray: AccessibleCheckboxInputGroupAttributes<ValidValueAction, Payload>[]
): React.JSX.Element[] {
  return attributesArray.map((attributes, index) => (
    <AccessibleCheckboxInputGroup
      key={`${index}-${attributes.name}`}
      attributes={attributes}
    />
  ));
}

function createAccessibleRadioSingleInputs<ValidValueAction extends string = string>(
  attributesArray: AccessibleRadioInputSingleAttributes<ValidValueAction>[]
): React.JSX.Element[] {
  return attributesArray.map((attributes, index) => (
    <AccessibleRadioInputSingle
      key={`${index}-${attributes.name}`}
      attributes={attributes}
    />
  ));
}

function createAccessibleRadioGroupInputs<ValidValueAction extends string = string>(
  attributesArray: AccessibleRadioInputGroupAttributes<ValidValueAction>[]
): React.JSX.Element[] {
  return attributesArray.map((attributes, index) => (
    <AccessibleRadioInputGroup
      key={`${index}-${attributes.name}`}
      attributes={attributes}
    />
  ));
}

function createAccessibleSelectInputs<
  ValidValueAction extends string = string,
  Payload extends string = string
>(
  attributesArray: AccessibleSelectInputAttributes<ValidValueAction, Payload>[]
): React.JSX.Element[] {
  return attributesArray.map((attributes, index) => (
    <AccessibleSelectInput key={`${index}-${attributes.name}`} attributes={attributes} />
  ));
}

function createAccessibleButtons(
  attributesArray: AccessibleButtonAttributes[]
): React.JSX.Element[] {
  return attributesArray.map((attributes, index) => (
    <AccessibleButton key={index} attributes={attributes} />
  ));
}

function createAccessibleTextInputsPostal<
  ValidValueAction extends string = string,
  InvalidValueAction extends string = string
>(
  attributesArray: AccessibleTextInputPostalAttributes<
    ValidValueAction,
    InvalidValueAction
  >[]
): React.JSX.Element[] {
  return attributesArray.map((attributes, index) => (
    <AccessibleTextInputPostal
      key={`${index}-${attributes.name}`}
      attributes={attributes}
    />
  ));
}

function createAccessibleTextInputsPhone<
  ValidValueAction extends string = string,
  InvalidValueAction extends string = string
>(
  attributesArray: AccessibleTextInputPhoneAttributes<
    ValidValueAction,
    InvalidValueAction
  >[]
): React.JSX.Element[] {
  return attributesArray.map((attributes, index) => (
    <AccessibleTextInputPhone
      key={`${index}-${attributes.name}`}
      attributes={attributes}
    />
  ));
}

function createAccessibleSwitchInputs<
  ValidValueAction extends string = string,
  InvalidValueAction extends string = string
>(
  attributesArray: AccessibleSwitchInputAttributes<ValidValueAction, InvalidValueAction>[]
): React.JSX.Element[] {
  return attributesArray.map((attributes, index) => (
    <AccessibleSwitchInput key={`${index}-${attributes.name}`} attributes={attributes} />
  ));
}

function createAccessibleDateTimeInputs<
  ValidValueAction extends string = string,
  InvalidValueAction extends string = string
>(
  attributesArray: AccessibleDateTimeInputAttributes<
    ValidValueAction,
    InvalidValueAction
  >[]
): React.JSX.Element[] {
  return attributesArray.map((attributes, index) => (
    <AccessibleDateTimeInput
      key={`${index}-${attributes.name}`}
      attributes={attributes}
    />
  ));
}

type ValidationTexts = {
  valueValidText: string;
  valueInvalidText: string;
};

function returnValidationTexts({
  name,
  stepperPages,
  valueBuffer,
}: {
  name: string;
  stepperPages: StepperPage[];
  valueBuffer: string;
}): ValidationTexts {
  const initialValidationTexts = {
    valueInvalidText: "",
    valueValidText: "",
  };

  return stepperPages.reduce<ValidationTexts>((validationTextsAcc, page) => {
    const { kind, children } = page;

    if (kind && kind === "review") {
      return validationTextsAcc;
    }

    children.forEach((child) => {
      const { name: inputName, validationKey } = child;
      if (inputName !== name) {
        return;
      }

      console.group("returnValidationTexts");
      console.log("inputName", inputName);
      console.log("validationKey", validationKey);
      console.groupEnd();

      const validation = VALIDATION_FUNCTIONS_TABLE[validationKey ?? "allowAll"];
      const { partials } = validation;

      const partialInvalidText = partials.length
        ? partials
            .map(([regexOrFunc, errorMessage]) =>
              typeof regexOrFunc === "function"
                ? regexOrFunc(valueBuffer)
                  ? ""
                  : errorMessage
                : regexOrFunc.test(valueBuffer)
                ? ""
                : errorMessage
            )
            .join(" ")
        : "";

      validationTextsAcc.valueInvalidText = `${splitCamelCase(
        name
      )} is invalid. ${partialInvalidText}`;
      validationTextsAcc.valueValidText = `${splitCamelCase(name)} is valid.`;
    });

    return validationTextsAcc;
  }, initialValidationTexts);
}

function returnFullValidation({
  name,
  stepperPages,
  validationFunctionsTable,
}: {
  name: string;
  stepperPages: StepperPage[];
  validationFunctionsTable: ValidationFunctionsTable;
}): { full: Validation["full"] } {
  const initial = { full: new RegExp("") };

  return stepperPages.reduce<{ full: Validation["full"] }>((regexAcc, page) => {
    const { children, kind } = page;

    if (kind && kind === "review") {
      return regexAcc;
    }

    children.forEach((child) => {
      const { name: inputName, validationKey } = child;

      if (inputName !== name) {
        return;
      }

      const validation = validationFunctionsTable[validationKey ?? "allowAll"];
      const { full } = validation;
      regexAcc.full = full;
    });

    return regexAcc;
  }, initial);
}

export {
  createAccessibleButtons,
  createAccessibleButtonScreenreaderTextElements,
  createAccessibleCheckboxGroupInputs,
  createAccessibleCheckboxSelectionsTextElements,
  createAccessibleCheckboxSingleInputs,
  createAccessibleDateTimeInputs,
  createAccessibleRadioGroupInputs,
  createAccessibleRadioScreenreaderTextElements,
  createAccessibleRadioSingleInputs,
  createAccessibleSelectInputs,
  createAccessibleSliderScreenreaderTextElements,
  createAccessibleSwitchInputs,
  createAccessibleSwitchOnOffTextElements,
  createAccessibleTextAreaInputs,
  createAccessibleTextInputs,
  createAccessibleTextInputsPhone,
  createAccessibleTextInputsPostal,
  createAccessibleValueValidationTextElements,
  returnFullValidation,
  returnValidationTexts,
};
