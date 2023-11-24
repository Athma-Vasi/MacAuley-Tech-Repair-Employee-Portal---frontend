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
} from '../../../jsxCreators';
import {
  returnMediumIntegerValidationText,
  returnObjectKeyValidationText,
  returnUserDefinedFieldValueValidationText,
} from '../../../utils';
import { AccessibleTextAreaInputCreatorInfo } from '../../wrappers';
import {
  MEDIUM_INTEGER_REGEX,
  OBJECT_KEY_REGEX,
  PSU_EFFICIENCY_RATING_DATA,
  PSU_FORM_FACTOR_DATA,
  PSU_MODULARITY_DATA,
  USER_DEFINED_VALUE_REGEX,
} from '../constants';
import {
  CreateProductAction,
  CreateProductDispatch,
  PsuEfficiency,
  PsuFormFactor,
  PsuModularity,
} from '../types';

type CreatePsuProps = {
  arePsuFieldsAdditionalMapFocused: Map<number, [boolean, boolean]>;
  arePsuFieldsAdditionalMapValid: Map<number, [boolean, boolean]>;
  borderColor: string;
  createProductAction: CreateProductAction;
  createProductDispatch: React.Dispatch<CreateProductDispatch>;
  currentlySelectedAdditionalFieldIndex: number;
  isPsuWattageFocused: boolean;
  isPsuWattageValid: boolean;
  padding: MantineNumberSize;
  psuEfficiency: PsuEfficiency;
  psuFieldsAdditionalMap: Map<number, [string, string]>;
  psuFormFactor: PsuFormFactor;
  psuModularity: PsuModularity;
  psuWattage: string;
};

function CreatePsu({
  arePsuFieldsAdditionalMapFocused,
  arePsuFieldsAdditionalMapValid,
  borderColor,
  createProductAction,
  createProductDispatch,
  currentlySelectedAdditionalFieldIndex,
  isPsuWattageFocused,
  isPsuWattageValid,
  padding,
  psuEfficiency,
  psuFieldsAdditionalMap,
  psuFormFactor,
  psuModularity,
  psuWattage,
}: CreatePsuProps) {
  // ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
  //  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
  //    VALIDATION USE EFFECTS
  //  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
  // ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀

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
    const currentlyUpdatingPsuFieldAdditional = psuFieldsAdditionalMap.get(
      currentlySelectedAdditionalFieldIndex
    );

    if (!currentlyUpdatingPsuFieldAdditional) {
      return;
    }

    const [key, value] = currentlyUpdatingPsuFieldAdditional;

    const isKeyValid = OBJECT_KEY_REGEX.test(key);
    createProductDispatch({
      type: createProductAction.setArePsuFieldsAdditionalMapValid,
      payload: {
        operation: 'update',
        data: isKeyValid,
        index: currentlySelectedAdditionalFieldIndex,
        kind: 'key',
      },
    });

    const isValueValid = USER_DEFINED_VALUE_REGEX.test(value);
    createProductDispatch({
      type: createProductAction.setArePsuFieldsAdditionalMapValid,
      payload: {
        operation: 'update',
        data: isValueValid,
        index: currentlySelectedAdditionalFieldIndex,
        kind: 'value',
      },
    });
  }, [
    createProductAction.setArePsuFieldsAdditionalMapValid,
    createProductDispatch,
    currentlySelectedAdditionalFieldIndex,
    psuFieldsAdditionalMap,
  ]);

  // ╔═════════════════════════════════════════════════════════════════╗
  //   STEPPER STATE UPDATE
  // ╚═════════════════════════════════════════════════════════════════╝
  useEffect(() => {
    // required inputs with empty string count as error
    // optional inputs with empty string count as valid
    // select inputs are not included as they always have a default value

    const arePsuInputsUserDefinedInError = Array.from(
      arePsuFieldsAdditionalMapValid
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
    arePsuFieldsAdditionalMapValid,
    createProductAction.setStepsInError,
    createProductDispatch,
    currentlySelectedAdditionalFieldIndex,
    isPsuWattageValid,
  ]);

  // ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
  //  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
  //    INPUT CREATION
  //  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
  // ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀

  // ╭─────────────────────────────────────────────────────────────────╮
  //    PSU WATTAGE
  // ╰─────────────────────────────────────────────────────────────────╯

  // error/valid text elements
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

  // screenreader accessible text input element
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
  const [createdAddPsuFieldsAdditionalMapButton] =
    returnAccessibleButtonElements([
      {
        buttonLabel: 'Add',
        semanticDescription: 'Add new additional PSU field',
        semanticName: 'Add new field',
        leftIcon: <TbPlus />,
        buttonOnClick: (event: MouseEvent<HTMLButtonElement>) => {
          createProductDispatch({
            type: createProductAction.setPsuFieldsAdditionalMap,
            payload: {
              operation: 'add',
              data: ['', ''],
            },
          });

          createProductDispatch({
            type: createProductAction.setArePsuFieldsAdditionalMapFocused,
            payload: {
              operation: 'add',
              data: [false, false],
            },
          });

          createProductDispatch({
            type: createProductAction.setArePsuFieldsAdditionalMapValid,
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
  const psuFieldsAdditionalMapKeysErrorValidTextElements: [
    JSX.Element,
    JSX.Element
  ][] = Array.from(psuFieldsAdditionalMap).map((keyFieldValue) => {
    const [mapKey, [field, _value]] = keyFieldValue;

    // error/valid text elements that are consumed by the text input element creator
    const [
      psuFieldsAdditionalMapKeysInputErrorText,
      psuFieldsAdditionalMapKeysInputValidText,
    ] = AccessibleErrorValidTextElements({
      inputElementKind: `additional field name ${mapKey + 1}`,
      inputText: field,
      isInputTextFocused:
        arePsuFieldsAdditionalMapFocused.get(mapKey)?.[0] ?? false,
      isValidInputText:
        arePsuFieldsAdditionalMapValid.get(mapKey)?.[0] ?? false,
      regexValidationText: returnObjectKeyValidationText({
        content: field,
        contentKind: `additional field name ${mapKey + 1}`,
        maxLength: 75,
        minLength: 1,
      }),
    });

    return [
      psuFieldsAdditionalMapKeysInputErrorText,
      psuFieldsAdditionalMapKeysInputValidText,
    ];
  });

  // ╭─────────────────────────────────────────────────────────────────╮
  //    ERROR/VALID ELEMENTS TUPLE => FIELD VALUES
  // ╰─────────────────────────────────────────────────────────────────╯

  // returns an array of tuples containing the error and valid text elements for each field value
  const psuFieldsAdditionalMapValuesErrorValidTextElements: [
    JSX.Element,
    JSX.Element
  ][] = Array.from(psuFieldsAdditionalMap).map((keyFieldValue) => {
    const [mapKey, [_field, value]] = keyFieldValue;

    // error/valid text elements that are consumed by the text input element creator
    const [
      psuFieldsAdditionalMapValuesInputErrorText,
      psuFieldsAdditionalMapValuesInputValidText,
    ] = AccessibleErrorValidTextElements({
      inputElementKind: `additional field value ${mapKey + 1}`,
      inputText: value,
      isInputTextFocused:
        arePsuFieldsAdditionalMapFocused.get(mapKey)?.[1] ?? false,
      isValidInputText:
        arePsuFieldsAdditionalMapValid.get(mapKey)?.[1] ?? false,
      regexValidationText: returnUserDefinedFieldValueValidationText({
        content: value,
        contentKind: `additional field value ${mapKey + 1}`,
        maxLength: 2000,
        minLength: 2,
      }),
    });

    return [
      psuFieldsAdditionalMapValuesInputErrorText,
      psuFieldsAdditionalMapValuesInputValidText,
    ];
  });

  const createdPsuFieldsAdditionalMapTextInputElements = Array.from(
    psuFieldsAdditionalMap
  ).map((keyFieldValue) => {
    const [mapKey, [field, value]] = keyFieldValue;

    // ╭─────────────────────────────────────────────────────────────────╮
    //    ADDITIONAL FIELD ACCESSIBLE TEXT INPUT => FIELD NAME
    // ╰─────────────────────────────────────────────────────────────────╯
    const psuFieldsAdditionalMapKeysTextInputCreatorInfo: AccessibleTextAreaInputCreatorInfo =
      {
        description: {
          error: psuFieldsAdditionalMapKeysErrorValidTextElements[mapKey][0],
          valid: psuFieldsAdditionalMapKeysErrorValidTextElements[mapKey][1],
        },
        inputText: field,
        isValidInputText:
          arePsuFieldsAdditionalMapValid.get(mapKey)?.[0] ?? false,
        label: `Name ${mapKey + 1}`,
        maxLength: 75,
        minLength: 1,
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setArePsuFieldsAdditionalMapFocused,
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
            type: createProductAction.setPsuFieldsAdditionalMap,
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
            type: createProductAction.setArePsuFieldsAdditionalMapFocused,
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
    //    ADDITIONAL FIELD ACCESSIBLE TEXT INPUT => FIELD VALUE
    // ╰─────────────────────────────────────────────────────────────────╯
    const psuFieldsAdditionalMapValuesTextInputCreatorInfo: AccessibleTextAreaInputCreatorInfo =
      {
        description: {
          error: psuFieldsAdditionalMapValuesErrorValidTextElements[mapKey][0],
          valid: psuFieldsAdditionalMapValuesErrorValidTextElements[mapKey][1],
        },
        inputText: value,
        isValidInputText:
          arePsuFieldsAdditionalMapValid.get(mapKey)?.[1] ?? false,
        label: `Value ${mapKey + 1}`,
        maxLength: 2000,
        minLength: 2,
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setArePsuFieldsAdditionalMapFocused,
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
            type: createProductAction.setPsuFieldsAdditionalMap,
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
            type: createProductAction.setArePsuFieldsAdditionalMapFocused,
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
      createdPsuFieldsAdditionalMapKeysTextAreaInput,
      createdPsuFieldsAdditionalMapValuesTextAreaInput,
    ] = returnAccessibleTextAreaInputElements([
      psuFieldsAdditionalMapKeysTextInputCreatorInfo,
      psuFieldsAdditionalMapValuesTextInputCreatorInfo,
    ]);

    // ╭─────────────────────────────────────────────────────────────────╮
    //    DELETE FIELD BUTTON
    // ╰─────────────────────────────────────────────────────────────────╯
    const [createdDeleteButton] = returnAccessibleButtonElements([
      {
        buttonLabel: 'Delete',
        buttonOnClick: (event: MouseEvent<HTMLButtonElement>) => {
          createProductDispatch({
            type: createProductAction.setPsuFieldsAdditionalMap,
            payload: {
              operation: 'remove',
              index: mapKey,
            },
          });

          createProductDispatch({
            type: createProductAction.setArePsuFieldsAdditionalMapFocused,
            payload: {
              operation: 'remove',
              index: mapKey,
            },
          });

          createProductDispatch({
            type: createProductAction.setArePsuFieldsAdditionalMapValid,
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
        semanticDescription: `Delete additional PSU field ${mapKey + 1}`,
        semanticName: 'Delete field and value',
      },
    ]);

    const displayDeleteButton = (
      <Tooltip label={`Delete additional PSU field ${mapKey + 1}`}>
        <Group>{createdDeleteButton}</Group>
      </Tooltip>
    );

    return (
      <Stack key={`psuFieldsAdditionalMap-${mapKey}`} pt={padding} w="100%">
        <Group position="apart">
          <Text size="md" weight={600}>{`Additional PSU field ${
            mapKey + 1
          }`}</Text>
          {displayDeleteButton}
        </Group>
        <Group position="apart">
          {createdPsuFieldsAdditionalMapKeysTextAreaInput}
          {createdPsuFieldsAdditionalMapValuesTextAreaInput}
        </Group>
      </Stack>
    );
  });

  // ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
  //  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
  //    INPUT DISPLAY
  //  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
  // ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀

  const displayPsuFieldsAdditionalMapButton = (
    <Tooltip
      label={`Add additional PSU field ${psuFieldsAdditionalMap.size + 1}`}
    >
      <Group>{createdAddPsuFieldsAdditionalMapButton}</Group>
    </Tooltip>
  );

  const displayPowerSupplySpecificationsInputs = (
    <Group py={padding} position="apart" w="100%">
      <Group w="100%" position="apart">
        <Title order={4}>Power Supply Unit (PSU) Specifications</Title>
        {displayPsuFieldsAdditionalMapButton}
      </Group>
      {createdPsuWattageTextInput}
      {createdPsuEfficiencyRatingSelectInput}
      {createdPsuFormFactorSelectInput}
      {createdPsuModularitySelectInput}
      {createdPsuFieldsAdditionalMapTextInputElements}
    </Group>
  );

  return displayPowerSupplySpecificationsInputs;
}

export default CreatePsu;
