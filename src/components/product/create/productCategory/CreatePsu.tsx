import {
  Group,
  MantineNumberSize,
  Stack,
  Text,
  Title,
  Tooltip,
} from '@mantine/core';
import { ChangeEvent, MouseEvent, useEffect } from 'react';
import { TbPlus, TbTrash } from 'react-icons/tb';

import {
  AccessibleErrorValidTextElements,
  returnAccessibleButtonElements,
  returnAccessibleSelectInputElements,
  returnAccessibleTextAreaInputElements,
  returnAccessibleTextInputElements,
} from '../../../../jsxCreators';
import {
  returnMediumIntegerValidationText,
  returnObjectKeyValidationText,
  returnUserDefinedFieldValueValidationText,
} from '../../../../utils';
import { AccessibleTextAreaInputCreatorInfo } from '../../../wrappers';
import {
  MEDIUM_INTEGER_REGEX,
  OBJECT_KEY_REGEX,
  PSU_EFFICIENCY_RATING_DATA,
  PSU_FORM_FACTOR_DATA,
  PSU_MODULARITY_DATA,
  USER_DEFINED_VALUE_REGEX,
} from '../../constants';
import {
  CreateProductAction,
  CreateProductDispatch,
  PsuEfficiency,
  PsuFormFactor,
  PsuModularity,
} from '../types';

type CreatePsuProps = {
  arePsuFieldsAdditionalFocused: Map<number, [boolean, boolean]>;
  arePsuFieldsAdditionalValid: Map<number, [boolean, boolean]>;
  borderColor: string;
  createProductAction: CreateProductAction;
  createProductDispatch: React.Dispatch<CreateProductDispatch>;
  currentlySelectedAdditionalFieldIndex: number;
  isPsuWattageFocused: boolean;
  isPsuWattageValid: boolean;
  padding: MantineNumberSize;
  psuEfficiency: PsuEfficiency;
  psuFieldsAdditional: Map<number, [string, string]>;
  psuFormFactor: PsuFormFactor;
  psuModularity: PsuModularity;
  psuWattage: string;
};

function CreatePsu({
  arePsuFieldsAdditionalFocused,
  arePsuFieldsAdditionalValid,
  borderColor,
  createProductAction,
  createProductDispatch,
  currentlySelectedAdditionalFieldIndex,
  isPsuWattageFocused,
  isPsuWattageValid,
  padding,
  psuEfficiency,
  psuFieldsAdditional,
  psuFormFactor,
  psuModularity,
  psuWattage,
}: CreatePsuProps) {
  // ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
  //  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
  //    VALIDATION USE EFFECTS
  //  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
  // ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄

  // ╭─────────────────────────────────────────────────────────────────╮
  //    PSU WATTAGE
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    const isValid = MEDIUM_INTEGER_REGEX.test(psuWattage);

    createProductDispatch({
      type: createProductAction.setIsPsuWattageValid,
      payload: isValid,
    });
  }, [
    createProductAction.setIsPsuWattageValid,
    createProductDispatch,
    psuWattage,
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    PSU ADDITIONAL FIELDS
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    const currentlyUpdatingPsuFieldAdditional = psuFieldsAdditional.get(
      currentlySelectedAdditionalFieldIndex
    );

    if (!currentlyUpdatingPsuFieldAdditional) {
      return;
    }

    const [key, value] = currentlyUpdatingPsuFieldAdditional;

    const isKeyValid = OBJECT_KEY_REGEX.test(key);
    createProductDispatch({
      type: createProductAction.setArePsuFieldsAdditionalValid,
      payload: {
        operation: 'update',
        data: isKeyValid,
        index: currentlySelectedAdditionalFieldIndex,
        kind: 'key',
      },
    });

    const isValueValid = USER_DEFINED_VALUE_REGEX.test(value);
    createProductDispatch({
      type: createProductAction.setArePsuFieldsAdditionalValid,
      payload: {
        operation: 'update',
        data: isValueValid,
        index: currentlySelectedAdditionalFieldIndex,
        kind: 'value',
      },
    });
  }, [
    createProductAction.setArePsuFieldsAdditionalValid,
    createProductDispatch,
    currentlySelectedAdditionalFieldIndex,
    psuFieldsAdditional,
  ]);

  // ╔═════════════════════════════════════════════════════════════════╗
  //   STEPPER STATE UPDATE
  // ╚═════════════════════════════════════════════════════════════════╝
  useEffect(() => {
    // required inputs with empty string count as error
    // optional inputs with empty string count as valid
    // select inputs are not included as they always have a default value

    const arePsuInputsUserDefinedInError = Array.from(
      arePsuFieldsAdditionalValid
    ).some(([_key, value]) => !value);

    const arePsuInputsInError =
      !isPsuWattageValid || arePsuInputsUserDefinedInError;

    createProductDispatch({
      type: createProductAction.setStepsInError,
      payload: {
        kind: arePsuInputsInError ? 'add' : 'delete',
        step: 1,
      },
    });
  }, [
    arePsuFieldsAdditionalValid,
    createProductAction.setStepsInError,
    createProductDispatch,
    currentlySelectedAdditionalFieldIndex,
    isPsuWattageValid,
  ]);

  // ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
  //  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
  //    INPUT CREATION
  //  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
  // ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄

  // ╭─────────────────────────────────────────────────────────────────╮
  //    PSU WATTAGE
  // ╰─────────────────────────────────────────────────────────────────╯

  // screenreader error/valid text elements
  const [psuWattageInputErrorText, psuWattageInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'psu wattage',
      inputText: psuWattage,
      isInputTextFocused: isPsuWattageFocused,
      isValidInputText: isPsuWattageValid,
      regexValidationText: returnMediumIntegerValidationText({
        content: psuWattage,
        contentKind: 'psu wattage',
      }),
    });

  // accessible text input element creator
  const [createdPsuWattageTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: psuWattageInputErrorText,
        valid: psuWattageInputValidText,
      },
      inputText: psuWattage,
      isValidInputText: isPsuWattageValid,
      label: 'PSU Wattage',
      onBlur: () => {
        createProductDispatch({
          type: createProductAction.setIsPsuWattageFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createProductDispatch({
          type: createProductAction.setPsuWattage,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createProductDispatch({
          type: createProductAction.setIsPsuWattageFocused,
          payload: true,
        });
      },
      placeholder: 'Format: 0000',
      required: true,
      semanticName: 'psu wattage',
    },
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    PSU EFFICIENCY RATING
  // ╰─────────────────────────────────────────────────────────────────╯
  const [createdPsuEfficiencyRatingSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: PSU_EFFICIENCY_RATING_DATA,
        description: '',
        label: 'PSU Efficiency Rating',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          createProductDispatch({
            type: createProductAction.setPsuEfficiency,
            payload: event.currentTarget.value as PsuEfficiency,
          });
        },
        value: psuEfficiency,
        required: true,
      },
    ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    PSU MODULARITY
  // ╰─────────────────────────────────────────────────────────────────╯
  const [createdPsuModularitySelectInput] = returnAccessibleSelectInputElements(
    [
      {
        data: PSU_MODULARITY_DATA,
        description: 'Select PSU modularity',
        label: 'PSU Modularity',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          createProductDispatch({
            type: createProductAction.setPsuModularity,
            payload: event.currentTarget.value as PsuModularity,
          });
        },
        value: psuModularity,
        required: true,
      },
    ]
  );

  // ╭─────────────────────────────────────────────────────────────────╮
  //    PSU FORM FACTOR
  // ╰─────────────────────────────────────────────────────────────────╯
  const [createdPsuFormFactorSelectInput] = returnAccessibleSelectInputElements(
    [
      {
        data: PSU_FORM_FACTOR_DATA,
        description: 'Select PSU form factor',
        label: 'PSU Form Factor',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          createProductDispatch({
            type: createProductAction.setPsuFormFactor,
            payload: event.currentTarget.value as PsuFormFactor,
          });
        },
        value: psuFormFactor,
        required: true,
      },
    ]
  );

  // ╔═════════════════════════════════════════════════════════════════╗
  //   PSU ADDITIONAL FIELDS
  // ╚═════════════════════════════════════════════════════════════════╝

  // ╭─────────────────────────────────────────────────────────────────╮
  //    ADD ADDITIONAL FIELD BUTTON
  // ╰─────────────────────────────────────────────────────────────────╯
  const [createdAddPsuFieldsAdditionalButton] = returnAccessibleButtonElements([
    {
      buttonLabel: 'Add',
      semanticDescription: 'Add new additional field',
      semanticName: 'Add new field',
      leftIcon: <TbPlus />,
      buttonOnClick: (event: MouseEvent<HTMLButtonElement>) => {
        createProductDispatch({
          type: createProductAction.setPsuFieldsAdditional,
          payload: {
            operation: 'add',
            data: ['', ''],
          },
        });

        createProductDispatch({
          type: createProductAction.setArePsuFieldsAdditionalFocused,
          payload: {
            operation: 'add',
            data: [false, false],
          },
        });

        createProductDispatch({
          type: createProductAction.setArePsuFieldsAdditionalValid,
          payload: {
            operation: 'add',
            data: [false, false],
          },
        });
      },
    },
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    ERROR/VALID ELEMENTS TUPLE => FIELD NAMES
  // ╰─────────────────────────────────────────────────────────────────╯

  // returns an array of tuples containing the error and valid text elements for each field name
  const psuFieldsAdditionalKeysErrorValidTextElements: [
    JSX.Element,
    JSX.Element
  ][] = Array.from(psuFieldsAdditional).map((keyFieldValue) => {
    const [mapKey, [field, _value]] = keyFieldValue;

    // screenreader error/valid text elements that are consumed by the text input element creator
    const [
      psuFieldsAdditionalKeysInputErrorText,
      psuFieldsAdditionalKeysInputValidText,
    ] = AccessibleErrorValidTextElements({
      inputElementKind: `additional field name ${mapKey + 1}`,
      inputText: field,
      isInputTextFocused:
        arePsuFieldsAdditionalFocused.get(mapKey)?.[0] ?? false,
      isValidInputText: arePsuFieldsAdditionalValid.get(mapKey)?.[0] ?? false,
      regexValidationText: returnObjectKeyValidationText({
        content: field,
        contentKind: `additional field name ${mapKey + 1}`,
        maxLength: 75,
        minLength: 1,
      }),
    });

    return [
      psuFieldsAdditionalKeysInputErrorText,
      psuFieldsAdditionalKeysInputValidText,
    ];
  });

  // ╭─────────────────────────────────────────────────────────────────╮
  //    ERROR/VALID ELEMENTS TUPLE => FIELD VALUES
  // ╰─────────────────────────────────────────────────────────────────╯

  // returns an array of tuples containing the error and valid text elements for each field value
  const psuFieldsAdditionalValuesErrorValidTextElements: [
    JSX.Element,
    JSX.Element
  ][] = Array.from(psuFieldsAdditional).map((keyFieldValue) => {
    const [mapKey, [_field, value]] = keyFieldValue;

    // screenreader error/valid text elements that are consumed by the text input element creator
    const [
      psuFieldsAdditionalValuesInputErrorText,
      psuFieldsAdditionalValuesInputValidText,
    ] = AccessibleErrorValidTextElements({
      inputElementKind: `additional field value ${mapKey + 1}`,
      inputText: value,
      isInputTextFocused:
        arePsuFieldsAdditionalFocused.get(mapKey)?.[1] ?? false,
      isValidInputText: arePsuFieldsAdditionalValid.get(mapKey)?.[1] ?? false,
      regexValidationText: returnUserDefinedFieldValueValidationText({
        content: value,
        contentKind: `additional field value ${mapKey + 1}`,
        maxLength: 2000,
        minLength: 2,
      }),
    });

    return [
      psuFieldsAdditionalValuesInputErrorText,
      psuFieldsAdditionalValuesInputValidText,
    ];
  });

  const createdPsuFieldsAdditionalTextInputElements = Array.from(
    psuFieldsAdditional
  ).map((keyFieldValue) => {
    const [mapKey, [field, value]] = keyFieldValue;

    // ╭─────────────────────────────────────────────────────────────────╮
    //    ADDITIONAL FIELD TEXT INPUT => FIELD NAME
    // ╰─────────────────────────────────────────────────────────────────╯
    const psuFieldsAdditionalKeysTextInputCreatorInfo: AccessibleTextAreaInputCreatorInfo =
      {
        description: {
          error: psuFieldsAdditionalKeysErrorValidTextElements[mapKey][0],
          valid: psuFieldsAdditionalKeysErrorValidTextElements[mapKey][1],
        },
        inputText: field,
        isValidInputText: arePsuFieldsAdditionalValid.get(mapKey)?.[0] ?? false,
        label: `Name ${mapKey + 1}`,
        maxLength: 75,
        minLength: 1,
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setArePsuFieldsAdditionalFocused,
            payload: {
              operation: 'update',
              data: false,
              index: mapKey,
              kind: 'key',
            },
          });
        },
        onChange: (event: ChangeEvent<HTMLTextAreaElement>) => {
          createProductDispatch({
            type: createProductAction.setPsuFieldsAdditional,
            payload: {
              operation: 'update',
              data: event.currentTarget.value,
              index: mapKey,
              kind: 'key',
            },
          });

          createProductDispatch({
            type: createProductAction.setCurrentlySelectedAdditionalFieldIndex,
            payload: mapKey,
          });
        },
        onFocus: () => {
          createProductDispatch({
            type: createProductAction.setArePsuFieldsAdditionalFocused,
            payload: {
              operation: 'update',
              data: true,
              index: mapKey,
              kind: 'key',
            },
          });
        },
        placeholder: 'Enter additional field name',
        required: true,
        semanticName: `additional field name ${mapKey + 1}`,
      };

    // ╭─────────────────────────────────────────────────────────────────╮
    //    ADDITIONAL FIELD TEXT INPUT => FIELD VALUE
    // ╰─────────────────────────────────────────────────────────────────╯
    const psuFieldsAdditionalValuesTextInputCreatorInfo: AccessibleTextAreaInputCreatorInfo =
      {
        description: {
          error: psuFieldsAdditionalValuesErrorValidTextElements[mapKey][0],
          valid: psuFieldsAdditionalValuesErrorValidTextElements[mapKey][1],
        },
        inputText: value,
        isValidInputText: arePsuFieldsAdditionalValid.get(mapKey)?.[1] ?? false,
        label: `Value ${mapKey + 1}`,
        maxLength: 2000,
        minLength: 2,
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setArePsuFieldsAdditionalFocused,
            payload: {
              operation: 'update',
              data: false,
              index: mapKey,
              kind: 'value',
            },
          });
        },
        onChange: (event: ChangeEvent<HTMLTextAreaElement>) => {
          createProductDispatch({
            type: createProductAction.setPsuFieldsAdditional,
            payload: {
              operation: 'update',
              data: event.currentTarget.value,
              index: mapKey,
              kind: 'value',
            },
          });

          createProductDispatch({
            type: createProductAction.setCurrentlySelectedAdditionalFieldIndex,
            payload: mapKey,
          });
        },
        onFocus: () => {
          createProductDispatch({
            type: createProductAction.setArePsuFieldsAdditionalFocused,
            payload: {
              operation: 'update',
              data: true,
              index: mapKey,
              kind: 'value',
            },
          });
        },
        placeholder: 'Enter additional field value',
        required: true,
        semanticName: `additional field value ${mapKey + 1}`,
      };

    const [
      createdPsuFieldsAdditionalKeysTextAreaInput,
      createdPsuFieldsAdditionalValuesTextAreaInput,
    ] = returnAccessibleTextAreaInputElements([
      psuFieldsAdditionalKeysTextInputCreatorInfo,
      psuFieldsAdditionalValuesTextInputCreatorInfo,
    ]);

    // ╭─────────────────────────────────────────────────────────────────╮
    //    DELETE FIELD BUTTON
    // ╰─────────────────────────────────────────────────────────────────╯
    const [createdDeleteButton] = returnAccessibleButtonElements([
      {
        buttonLabel: 'Delete',
        buttonOnClick: (event: MouseEvent<HTMLButtonElement>) => {
          createProductDispatch({
            type: createProductAction.setPsuFieldsAdditional,
            payload: {
              operation: 'remove',
              index: mapKey,
            },
          });

          createProductDispatch({
            type: createProductAction.setArePsuFieldsAdditionalFocused,
            payload: {
              operation: 'remove',
              index: mapKey,
            },
          });

          createProductDispatch({
            type: createProductAction.setArePsuFieldsAdditionalValid,
            payload: {
              operation: 'remove',
              index: mapKey,
            },
          });

          createProductDispatch({
            type: createProductAction.setCurrentlySelectedAdditionalFieldIndex,
            payload: -1,
          });
        },
        leftIcon: <TbTrash />,
        semanticDescription: `Delete additional field ${mapKey + 1}`,
        semanticName: 'Delete field and value',
      },
    ]);

    const displayDeleteButton = (
      <Tooltip label={`Delete additional field ${mapKey + 1}`}>
        <Group>{createdDeleteButton}</Group>
      </Tooltip>
    );

    return (
      <Stack key={`psuFieldsAdditional-${mapKey}`} pt={padding} w="100%">
        <Group position="apart">
          <Text size="md" weight={600}>{`Additional Psu field ${
            mapKey + 1
          }`}</Text>
          {displayDeleteButton}
        </Group>
        <Group position="apart">
          {createdPsuFieldsAdditionalKeysTextAreaInput}
          {createdPsuFieldsAdditionalValuesTextAreaInput}
        </Group>
      </Stack>
    );
  });

  // ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
  //  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
  //    INPUT DISPLAY
  //  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
  // ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄

  const displayPsuFieldsAdditionalButton = (
    <Tooltip label={`Add new additional field ${psuFieldsAdditional.size + 1}`}>
      <Group>{createdAddPsuFieldsAdditionalButton}</Group>
    </Tooltip>
  );

  const displayPowerSupplySpecificationsInputs = (
    <Group
      py={padding}
      position="apart"
      style={{ borderBottom: borderColor }}
      w="100%"
    >
      <Group w="100%" position="apart">
        <Title order={4}>Power Supply Unit (PSU) Specifications</Title>
        {displayPsuFieldsAdditionalButton}
      </Group>
      {createdPsuWattageTextInput}
      {createdPsuEfficiencyRatingSelectInput}
      {createdPsuFormFactorSelectInput}
      {createdPsuModularitySelectInput}
      {createdPsuFieldsAdditionalTextInputElements}
    </Group>
  );

  return displayPowerSupplySpecificationsInputs;
}

export default CreatePsu;
