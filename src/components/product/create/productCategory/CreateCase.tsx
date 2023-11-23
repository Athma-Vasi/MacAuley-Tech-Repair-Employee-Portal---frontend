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
  returnColorVariantValidationText,
  returnObjectKeyValidationText,
  returnUserDefinedFieldValueValidationText,
} from '../../../../utils';
import { AccessibleTextAreaInputCreatorInfo } from '../../../wrappers';
import {
  CASE_SIDE_PANEL_DATA,
  CASE_TYPE_DATA,
  COLOR_VARIANT_REGEX,
  OBJECT_KEY_REGEX,
  USER_DEFINED_VALUE_REGEX,
} from '../../constants';
import {
  CaseSidePanel,
  CaseType,
  CreateProductAction,
  CreateProductDispatch,
} from '../types';

type CreateCaseProps = {
  areCaseFieldsAdditionalMapFocused: Map<number, [boolean, boolean]>;
  areCaseFieldsAdditionalMapValid: Map<number, [boolean, boolean]>;
  borderColor: string;
  caseColor: string;
  caseFieldsAdditionalMap: Map<number, [string, string]>;
  caseSidePanel: CaseSidePanel;
  caseType: CaseType;
  createProductAction: CreateProductAction;
  createProductDispatch: React.Dispatch<CreateProductDispatch>;
  currentlySelectedAdditionalFieldIndex: number;
  isCaseColorFocused: boolean;
  isCaseColorValid: boolean;
  padding: MantineNumberSize;
};

function CreateCase({
  areCaseFieldsAdditionalMapFocused,
  areCaseFieldsAdditionalMapValid,
  borderColor,
  caseColor,
  caseFieldsAdditionalMap,
  caseSidePanel,
  caseType,
  createProductAction,
  createProductDispatch,
  currentlySelectedAdditionalFieldIndex,
  isCaseColorFocused,
  isCaseColorValid,
  padding,
}: CreateCaseProps) {
  // ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
  //  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
  //    VALIDATION USE EFFECTS
  //  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
  // ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀

  // ╭─────────────────────────────────────────────────────────────────╮
  //    CASE COLOR
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    const isValid = COLOR_VARIANT_REGEX.test(caseColor);

    createProductDispatch({
      type: createProductAction.setIsCaseColorValid,
      payload: isValid,
    });
  }, [
    caseColor,
    createProductAction.setIsCaseColorValid,
    createProductDispatch,
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    CASE FIELDS ADDITIONAL
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    const currentlyUpdatingCaseFieldAdditional = caseFieldsAdditionalMap.get(
      currentlySelectedAdditionalFieldIndex
    );

    if (!currentlyUpdatingCaseFieldAdditional) {
      return;
    }

    const [key, value] = currentlyUpdatingCaseFieldAdditional;

    const isKeyValid = OBJECT_KEY_REGEX.test(key);
    createProductDispatch({
      type: createProductAction.setAreCaseFieldsAdditionalMapValid,
      payload: {
        operation: 'update',
        data: isKeyValid,
        index: currentlySelectedAdditionalFieldIndex,
        kind: 'key',
      },
    });

    const isValueValid = USER_DEFINED_VALUE_REGEX.test(value);
    createProductDispatch({
      type: createProductAction.setAreCaseFieldsAdditionalMapValid,
      payload: {
        operation: 'update',
        data: isValueValid,
        index: currentlySelectedAdditionalFieldIndex,
        kind: 'value',
      },
    });
  }, [
    currentlySelectedAdditionalFieldIndex,
    caseFieldsAdditionalMap,
    createProductDispatch,
    createProductAction.setAreCaseFieldsAdditionalMapValid,
  ]);

  // ╔═════════════════════════════════════════════════════════════════╗
  //   STEPPER STATE UPDATE
  // ╚═════════════════════════════════════════════════════════════════╝
  useEffect(() => {
    // required inputs with empty string count as error
    // optional inputs with empty string count as valid
    // select inputs are not included as they always have a default value

    const areCaseFieldsAdditionalMapInError = Array.from(
      areCaseFieldsAdditionalMapValid
    ).some(([_key, value]) => !value);

    const areCaseInputsInError =
      !isCaseColorValid || areCaseFieldsAdditionalMapInError;

    createProductDispatch({
      type: createProductAction.setStepsInError,
      payload: {
        kind: areCaseInputsInError ? 'add' : 'delete',
        step: 1,
      },
    });
  }, [
    areCaseFieldsAdditionalMapValid,
    createProductAction.setStepsInError,
    createProductDispatch,
    isCaseColorValid,
  ]);

  // ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
  //  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
  //    INPUT CREATION
  //  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
  // ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀

  // ╭─────────────────────────────────────────────────────────────────╮
  //    CASE TYPE
  // ╰─────────────────────────────────────────────────────────────────╯
  const [createdCaseTypeSelectInput] = returnAccessibleSelectInputElements([
    {
      data: CASE_TYPE_DATA,
      description: '',
      label: 'Case Type',
      onChange: (event: ChangeEvent<HTMLSelectElement>) => {
        createProductDispatch({
          type: createProductAction.setCaseType,
          payload: event.currentTarget.value as CaseType,
        });
      },
      value: caseType,
      required: true,
    },
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    CASE COLOR
  // ╰─────────────────────────────────────────────────────────────────╯

  // error/valid text elements
  const [caseColorInputErrorText, caseColorInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'case color',
      inputText: caseColor,
      isInputTextFocused: isCaseColorFocused,
      isValidInputText: isCaseColorValid,
      regexValidationText: returnColorVariantValidationText({
        content: caseColor,
        contentKind: 'case color',
        maxLength: 30,
        minLength: 2,
      }),
    });

  // screenreader accessible text input element
  const [createdCaseColorTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: caseColorInputErrorText,
        valid: caseColorInputValidText,
      },
      inputText: caseColor,
      isValidInputText: isCaseColorValid,
      label: 'Case Color',
      maxLength: 30,
      minLength: 2,
      onBlur: () => {
        createProductDispatch({
          type: createProductAction.setIsCaseColorFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createProductDispatch({
          type: createProductAction.setCaseColor,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createProductDispatch({
          type: createProductAction.setIsCaseColorFocused,
          payload: true,
        });
      },
      placeholder: 'Enter case color',
      required: true,
      semanticName: 'case color',
    },
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    CASE SIDE PANEL
  // ╰─────────────────────────────────────────────────────────────────╯
  const [createdCaseSidePanelSelectInput] = returnAccessibleSelectInputElements(
    [
      {
        data: CASE_SIDE_PANEL_DATA,
        description: 'Select case side panel',
        label: 'Case Side Panel',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          createProductDispatch({
            type: createProductAction.setCaseSidePanel,
            payload: event.currentTarget.value as CaseSidePanel,
          });
        },
        value: caseSidePanel,
        required: true,
      },
    ]
  );

  // ╔═════════════════════════════════════════════════════════════════╗
  //   CASE ADDITIONAL FIELDS
  // ╚═════════════════════════════════════════════════════════════════╝

  // ╭─────────────────────────────────────────────────────────────────╮
  //    ADD ADDITIONAL FIELD BUTTON
  // ╰─────────────────────────────────────────────────────────────────╯
  const [createdAddCaseFieldsAdditionalMapButton] =
    returnAccessibleButtonElements([
      {
        buttonLabel: 'Add',
        semanticDescription: 'Add new additional Case field',
        semanticName: 'Add new field',
        leftIcon: <TbPlus />,
        buttonOnClick: (event: MouseEvent<HTMLButtonElement>) => {
          createProductDispatch({
            type: createProductAction.setCaseFieldsAdditionalMap,
            payload: {
              operation: 'add',
              data: ['', ''],
            },
          });

          createProductDispatch({
            type: createProductAction.setAreCaseFieldsAdditionalMapFocused,
            payload: {
              operation: 'add',
              data: [false, false],
            },
          });

          createProductDispatch({
            type: createProductAction.setAreCaseFieldsAdditionalMapValid,
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
  const caseFieldsAdditionalMapKeysErrorValidTextElements: [
    JSX.Element,
    JSX.Element
  ][] = Array.from(caseFieldsAdditionalMap).map((keyFieldValue) => {
    const [mapKey, [field, _value]] = keyFieldValue;

    // error/valid text elements that are consumed by the text input element creator
    const [
      caseFieldsAdditionalMapKeysInputErrorText,
      caseFieldsAdditionalMapKeysInputValidText,
    ] = AccessibleErrorValidTextElements({
      inputElementKind: `additional field name ${mapKey + 1}`,
      inputText: field,
      isInputTextFocused:
        areCaseFieldsAdditionalMapFocused.get(mapKey)?.[0] ?? false,
      isValidInputText:
        areCaseFieldsAdditionalMapValid.get(mapKey)?.[0] ?? false,
      regexValidationText: returnObjectKeyValidationText({
        content: field,
        contentKind: `additional field name ${mapKey + 1}`,
        maxLength: 75,
        minLength: 1,
      }),
    });

    return [
      caseFieldsAdditionalMapKeysInputErrorText,
      caseFieldsAdditionalMapKeysInputValidText,
    ];
  });

  // ╭─────────────────────────────────────────────────────────────────╮
  //    ERROR/VALID ELEMENTS TUPLE => FIELD VALUES
  // ╰─────────────────────────────────────────────────────────────────╯

  // returns an array of tuples containing the error and valid text elements for each field value
  const caseFieldsAdditionalMapValuesErrorValidTextElements: [
    JSX.Element,
    JSX.Element
  ][] = Array.from(caseFieldsAdditionalMap).map((keyFieldValue) => {
    const [mapKey, [_field, value]] = keyFieldValue;

    // error/valid text elements that are consumed by the text input element creator
    const [
      caseFieldsAdditionalMapValuesInputErrorText,
      caseFieldsAdditionalMapValuesInputValidText,
    ] = AccessibleErrorValidTextElements({
      inputElementKind: `additional field value ${mapKey + 1}`,
      inputText: value,
      isInputTextFocused:
        areCaseFieldsAdditionalMapFocused.get(mapKey)?.[1] ?? false,
      isValidInputText:
        areCaseFieldsAdditionalMapValid.get(mapKey)?.[1] ?? false,
      regexValidationText: returnUserDefinedFieldValueValidationText({
        content: value,
        contentKind: `additional field value ${mapKey + 1}`,
        maxLength: 2000,
        minLength: 2,
      }),
    });

    return [
      caseFieldsAdditionalMapValuesInputErrorText,
      caseFieldsAdditionalMapValuesInputValidText,
    ];
  });

  const createdCaseFieldsAdditionalMapTextInputElements = Array.from(
    caseFieldsAdditionalMap
  ).map((keyFieldValue) => {
    const [mapKey, [field, value]] = keyFieldValue;

    // ╭─────────────────────────────────────────────────────────────────╮
    //    ADDITIONAL FIELD ACCESSIBLE TEXT INPUT => FIELD NAME
    // ╰─────────────────────────────────────────────────────────────────╯
    const caseFieldsAdditionalMapKeysTextInputCreatorInfo: AccessibleTextAreaInputCreatorInfo =
      {
        description: {
          error: caseFieldsAdditionalMapKeysErrorValidTextElements[mapKey][0],
          valid: caseFieldsAdditionalMapKeysErrorValidTextElements[mapKey][1],
        },
        inputText: field,
        isValidInputText:
          areCaseFieldsAdditionalMapValid.get(mapKey)?.[0] ?? false,
        label: `Name ${mapKey + 1}`,
        maxLength: 75,
        minLength: 1,
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setAreCaseFieldsAdditionalMapFocused,
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
            type: createProductAction.setCaseFieldsAdditionalMap,
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
            type: createProductAction.setAreCaseFieldsAdditionalMapFocused,
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
    const caseFieldsAdditionalMapValuesTextInputCreatorInfo: AccessibleTextAreaInputCreatorInfo =
      {
        description: {
          error: caseFieldsAdditionalMapValuesErrorValidTextElements[mapKey][0],
          valid: caseFieldsAdditionalMapValuesErrorValidTextElements[mapKey][1],
        },
        inputText: value,
        isValidInputText:
          areCaseFieldsAdditionalMapValid.get(mapKey)?.[1] ?? false,
        label: `Value ${mapKey + 1}`,
        maxLength: 2000,
        minLength: 2,
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setAreCaseFieldsAdditionalMapFocused,
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
            type: createProductAction.setCaseFieldsAdditionalMap,
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
            type: createProductAction.setAreCaseFieldsAdditionalMapFocused,
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
      createdCaseFieldsAdditionalMapKeysTextAreaInput,
      createdCaseFieldsAdditionalMapValuesTextAreaInput,
    ] = returnAccessibleTextAreaInputElements([
      caseFieldsAdditionalMapKeysTextInputCreatorInfo,
      caseFieldsAdditionalMapValuesTextInputCreatorInfo,
    ]);

    // ╭─────────────────────────────────────────────────────────────────╮
    //    DELETE FIELD BUTTON
    // ╰─────────────────────────────────────────────────────────────────╯
    const [createdDeleteButton] = returnAccessibleButtonElements([
      {
        buttonLabel: 'Delete',
        buttonOnClick: (event: MouseEvent<HTMLButtonElement>) => {
          createProductDispatch({
            type: createProductAction.setCaseFieldsAdditionalMap,
            payload: {
              operation: 'remove',
              index: mapKey,
            },
          });

          createProductDispatch({
            type: createProductAction.setAreCaseFieldsAdditionalMapFocused,
            payload: {
              operation: 'remove',
              index: mapKey,
            },
          });

          createProductDispatch({
            type: createProductAction.setAreCaseFieldsAdditionalMapValid,
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
        semanticDescription: `Delete additional Case field ${mapKey + 1}`,
        semanticName: 'Delete field and value',
      },
    ]);

    const displayDeleteButton = (
      <Tooltip label={`Delete additional Case field ${mapKey + 1}`}>
        <Group>{createdDeleteButton}</Group>
      </Tooltip>
    );

    return (
      <Stack key={`caseFieldsAdditionalMap-${mapKey}`} pt={padding} w="100%">
        <Group position="apart">
          <Text size="md" weight={600}>{`Additional Case field ${
            mapKey + 1
          }`}</Text>
          {displayDeleteButton}
        </Group>
        <Group position="apart">
          {createdCaseFieldsAdditionalMapKeysTextAreaInput}
          {createdCaseFieldsAdditionalMapValuesTextAreaInput}
        </Group>
      </Stack>
    );
  });

  // ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
  //  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
  //    INPUT DISPLAY
  //  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
  // ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀

  const displayCaseFieldsAdditionalMapButton = (
    <Tooltip
      label={`Add additional Case field ${caseFieldsAdditionalMap.size + 1}`}
    >
      <Group>{createdAddCaseFieldsAdditionalMapButton}</Group>
    </Tooltip>
  );

  const displayComputerCaseSpecificationsInputs = (
    <Group py={padding} position="apart" w="100%">
      <Group w="100%" position="apart">
        <Title order={4}>Case Specifications</Title>
        {displayCaseFieldsAdditionalMapButton}
      </Group>
      {createdCaseTypeSelectInput}
      {createdCaseColorTextInput}
      {createdCaseSidePanelSelectInput}
      {createdCaseFieldsAdditionalMapTextInputElements}
    </Group>
  );

  return displayComputerCaseSpecificationsInputs;
}

export default CreateCase;
