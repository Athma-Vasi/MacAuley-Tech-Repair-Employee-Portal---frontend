import { Flex, Modal, SegmentedControl, Text, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  ChangeEvent,
  FormEvent,
  KeyboardEvent,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import { TbTrash, TbUpload } from 'react-icons/tb';

import { ACKNOWLEDGEMENT_TEXT_INPUT_REGEX } from '../../constants/regex';
import { useGlobalState } from '../../hooks';
import {
  returnAccessibleButtonElements,
  returnAccessibleErrorValidTextElements,
  returnAccessibleRadioGroupInputsElements,
  returnAccessibleTextInputElements,
} from '../../jsxCreators';
import {
  groupQueryResponse,
  logState,
  returnAcknowledgementValidationText,
} from '../../utils';
import {
  AccessibleButtonCreatorInfo,
  AccessibleRadioGroupInputCreatorInfo,
  AccessibleTextInputCreatorInfo,
} from '../wrappers';
import { DisplayQueryDesktop } from './displayQueryDesktop/DisplayQueryDesktop';
import { DisplayQueryMobile } from './displayQueryMobile/DisplayQueryMobile';
import {
  displayQueryAction,
  displayQueryReducer,
  initialDisplayQueryState,
} from './state';
import { DisplayQueryProps } from './types';

function DisplayQuery<Doc>({
  componentQueryData,
  parentComponentName,
  parentRequestStatusDispatch,
  parentDeleteFormDispatch,
  queryResponseData,
  style = {},
  totalDocuments,
}: DisplayQueryProps<Doc>) {
  const {
    globalState: { padding, width, rowGap },
  } = useGlobalState();

  const [
    openedDeleteAcknowledge,
    { open: openDeleteAcknowledge, close: closeDeleteAcknowledge },
  ] = useDisclosure(false);

  const [displayQueryState, displayQueryDispatch] = useReducer(
    displayQueryReducer,
    initialDisplayQueryState
  );

  const {
    groupByRadioData,
    currentSelectionData,
    groupBySelection,
    groupedByQueryResponseData,
    restOfGroupedQueryResponseData,
    currentSegmentedSelection,
    popoversOpenCloseState,
    acknowledgementText,
    isAcknowledgementTextFocused,
    isValidAcknowledgementText,
    deleteFormId,
  } = displayQueryState;

  async function handleDeleteFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log('delete form submitted');

    if (!isValidAcknowledgementText) return;

    parentDeleteFormDispatch({
      type: 'setDeleteForm',
      payload: {
        id: deleteFormId,
        value: true,
      },
    });
  }

  // validate acknowledgement text on every change
  useEffect(() => {
    const isValid = ACKNOWLEDGEMENT_TEXT_INPUT_REGEX.test(acknowledgementText);

    displayQueryDispatch({
      type: displayQueryAction.setIsValidAcknowledgementText,
      payload: isValid,
    });
  }, [acknowledgementText]);

  // create initial groupByRadioData state
  useEffect(() => {
    const initialGroupByRadioData = componentQueryData
      .reduce(
        (
          acc: Array<{ value: string; label: string }>,
          { inputKind, label, value }
        ) => {
          if (inputKind === 'selectInput' || inputKind === 'booleanInput') {
            // only push if it is also present in query response data
            const isFieldExcluded = queryResponseData.filter(
              (queryResponseObj) => {
                return Object.entries(queryResponseObj).find(
                  ([key, _]) => key === value
                );
              }
            );

            if (isFieldExcluded.length > 0) {
              acc.push({ label, value });
            }
          }

          return acc;
        },
        [{ label: 'Username', value: 'username' }]
      )
      // username is not displayed when resource is anonymousRequest
      .filter(({ value }) => {
        return parentComponentName === 'Anonymous Request'
          ? value !== 'username'
          : true;
      });

    displayQueryDispatch({
      type: displayQueryAction.setGroupByRadioData,
      payload: initialGroupByRadioData,
    });
  }, [queryResponseData, componentQueryData]);

  // assign current groupBy selection's corresponding options data
  useEffect(() => {
    const currentSelectData =
      groupBySelection === 'username'
        ? ['']
        : componentQueryData.reduce(
            (acc, componentQueryObj) => {
              if (groupBySelection === componentQueryObj.value) {
                if (componentQueryObj.selectData) {
                  // rome-ignore lint:
                  acc = componentQueryObj.selectData;
                }
              }

              return acc;
            },
            ['']
          );
    console.log('currentSelectData: ', currentSelectData);

    displayQueryDispatch({
      type: displayQueryAction.setCurrentSelectionData,
      payload: currentSelectData,
    });
  }, [groupBySelection, componentQueryData]);

  // group the queries on every selection or query change
  useEffect(() => {
    const { groupedBy, rest } = groupQueryResponse({
      queryResponseData,
      groupBySelection,
      currentSelectionData,
    });

    displayQueryDispatch({
      type: displayQueryAction.setGroupedByQueryResponseData,
      payload: groupedBy,
    });

    displayQueryDispatch({
      type: displayQueryAction.setRestOfGroupedQueryResponseData,
      payload: rest,
    });
  }, [queryResponseData, groupBySelection, currentSelectionData]);

  /** ------------- accessible error/valid text elems ------------- */

  const [acknowledgementInputErrorText, acknowledgementInputValidText] =
    returnAccessibleErrorValidTextElements({
      inputElementKind: 'acknowledgement',
      inputText: acknowledgementText,
      isValidInputText: isValidAcknowledgementText,
      isInputTextFocused: isAcknowledgementTextFocused,
      regexValidationText:
        returnAcknowledgementValidationText(acknowledgementText),
    });

  /** ------------- end accessible error/valid text elems ------------- */

  /** ------------- input creator info objects ------------- */

  const groupByRadioGroupCreatorInfo: AccessibleRadioGroupInputCreatorInfo = {
    dataObjectArray: groupByRadioData,
    description: 'Group by fields with constrained values',
    onChange: (value: string) => {
      displayQueryDispatch({
        type: displayQueryAction.setGroupBySelection,
        payload: value,
      });
    },
    semanticName: 'group by',
    value: groupBySelection,
    label: 'Group by',
  };

  const segmentedControl = (
    <SegmentedControl
      data={[
        { label: 'Condensed', value: 'condensed' },
        { label: 'Expanded', value: 'expanded' },
      ]}
      value={currentSegmentedSelection}
      onChange={(value: string) => {
        displayQueryDispatch({
          type: displayQueryAction.setCurrentSegmentedSelection,
          payload: value as 'condensed' | 'expanded',
        });
      }}
      radius="lg"
    />
  );

  const acknowledgementTextInputCreatorInfo: AccessibleTextInputCreatorInfo = {
    description: {
      error: acknowledgementInputErrorText,
      valid: acknowledgementInputValidText,
    },
    inputText: acknowledgementText,
    isValidInputText: isValidAcknowledgementText,
    label: 'Acknowledgement',
    name: 'acknowledgement',
    onBlur: () => {
      displayQueryDispatch({
        type: displayQueryAction.setIsAcknowledgementTextFocused,
        payload: false,
      });
    },
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      displayQueryDispatch({
        type: displayQueryAction.setAcknowledgementText,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      displayQueryDispatch({
        type: displayQueryAction.setIsAcknowledgementTextFocused,
        payload: true,
      });
    },
    placeholder: 'Enter your acknowledgement',
    required: true,
    withAsterisk: true,
    semanticName: 'acknowledgement',
  };

  const deleteButtonCreatorInfo: AccessibleButtonCreatorInfo = {
    buttonLabel: 'Delete',
    semanticDescription: 'confirm delete form submit button',
    semanticName: 'confirm delete button',
    buttonType: 'submit',
    leftIcon: <TbTrash />,
    rightIcon: <TbUpload />,
    buttonOnClick: () => {
      closeDeleteAcknowledge();
    },
    // buttonOnKeyDown: (event: KeyboardEvent<HTMLButtonElement>) => {
    //   if (event.key === 'U+000A' || event.key === 'Enter') {
    //     event.preventDefault();
    //     return;
    //   }
    // },
    buttonDisabled: !isValidAcknowledgementText,
  };

  /** ------------- end input creator info objects ------------- */

  /** ------------- created inputs------------- */

  const [createdGroupByRadioGroup] = returnAccessibleRadioGroupInputsElements([
    groupByRadioGroupCreatorInfo,
  ]);

  const [createdAcknowledgementTextInput] = returnAccessibleTextInputElements([
    acknowledgementTextInputCreatorInfo,
  ]);

  const [createdDeleteButton] = returnAccessibleButtonElements([
    deleteButtonCreatorInfo,
  ]);

  /** ------------- end created inputs------------- */

  const displayGroupByRadioGroup = (
    <Flex
      align="center"
      justify="flex-start"
      w={width < 768 ? '100%' : width < 1440 ? '85%' : '62%'}
      style={{
        border: '1px solid #e0e0e0',
        borderRadius: 4,
      }}
      columnGap={rowGap}
      p={padding}
    >
      {createdGroupByRadioGroup}
    </Flex>
  );

  const displayTableViewSegmentControl = (
    <Flex
      align="center"
      justify="flex-start"
      w={width < 768 ? '100%' : width < 1440 ? '85%' : '62%'}
      style={{
        border: '1px solid #e0e0e0',
        borderRadius: 4,
      }}
      columnGap={rowGap}
      p={padding}
    >
      <Text>Table view</Text>
      {segmentedControl}
    </Flex>
  );

  const displayAcknowledgementModal = (
    <Modal
      opened={openedDeleteAcknowledge}
      onClose={closeDeleteAcknowledge}
      centered
      size={375}
    >
      <form onSubmit={handleDeleteFormSubmit}>
        <Flex
          w="100%"
          style={{
            border: '1px solid #e0e0e0',
            borderRadius: 4,
          }}
          rowGap={rowGap}
          p={padding}
          direction="column"
        >
          <Title>Delete form</Title>
          <Text size="sm">
            To delete this form, please enter: 'I solemnly swear that I am up to
            no good.'
          </Text>
          {createdAcknowledgementTextInput}
          <Flex
            w="100%"
            justify="flex-end"
            align="center"
            columnGap={rowGap}
            p={padding}
          >
            {createdDeleteButton}
          </Flex>
        </Flex>
      </form>
    </Modal>
  );

  const displayQueryComponent =
    width <= 1024 ? (
      <DisplayQueryMobile
        componentQueryData={componentQueryData}
        deleteFormIdDispatch={displayQueryDispatch}
        groupedByQueryResponseData={groupedByQueryResponseData}
        openDeleteAcknowledge={openDeleteAcknowledge}
        popoversOpenCloseState={popoversOpenCloseState}
        popoversStateDispatch={displayQueryDispatch}
        requestStatusDispatch={parentRequestStatusDispatch}
        restOfGroupedQueryResponseData={restOfGroupedQueryResponseData}
        tableViewSelection={currentSegmentedSelection}
      />
    ) : (
      <DisplayQueryDesktop
        componentQueryData={componentQueryData}
        deleteFormIdDispatch={displayQueryDispatch}
        groupedByQueryResponseData={groupedByQueryResponseData}
        openDeleteAcknowledge={openDeleteAcknowledge}
        popoversOpenCloseState={popoversOpenCloseState}
        popoversStateDispatch={displayQueryDispatch}
        requestStatusDispatch={parentRequestStatusDispatch}
        restOfGroupedQueryResponseData={restOfGroupedQueryResponseData}
        tableViewSelection={currentSegmentedSelection}
      />
    );

  useEffect(() => {
    logState({
      state: displayQueryState,
      groupLabel: 'displayQueryState',
    });
  }, [displayQueryState]);

  return (
    <Flex
      direction="column"
      rowGap={rowGap}
      w="100%"
      align="flex-start"
      justify="center"
      style={{
        ...style,
      }}
    >
      {displayGroupByRadioGroup}
      {displayTableViewSegmentControl}
      {displayAcknowledgementModal}
      <Flex align="center" justify="space-between" w="100%">
        <Text>{parentComponentName}</Text>
        <Text>Total documents: {totalDocuments}</Text>
      </Flex>
      {displayQueryComponent}
    </Flex>
  );
}

export { DisplayQuery };

/**
 *   const groupBySelectInputCreatorInfo: AccessibleSelectInputCreatorInfo = {
      data: groupBySelectData,
      description: 'Group by fields with constrained values',
      label: 'Group by',
      onChange: (event: ChangeEvent<HTMLSelectElement>) => {
        displayQueryDispatch({
          type: displayQueryAction.setGroupBySelection,
          // find the corresponding label for the value
          payload:
            componentQueryData.find(({ label, value }) =>
              label === event.currentTarget.value ? value : ''
            )?.value || 'username',
        });
      },
      // assign the label and not the value
      value:
        componentQueryData.find(({ label, value }) =>
          value === groupBySelection ? label : ''
        )?.label || 'Username',
    };
 */

/**
     * componentQueryData.forEach(({ label, inputKind, value, selectData }) => {
      if (inputKind === 'selectInput') {
        // only push if it is also present in query response data
        const isFieldExcluded = queryResponseData.filter((queryResponseObj) => {
          return Object.entries(queryResponseObj).find(([key, _]) => {
            if (key === value) {
              return true;
            }
            return false;
          });
        });

        if (isFieldExcluded.length > 0) {
          initialGroupByRadioData.push({
            label,
            value,
          });
        }
      }
    });
     */
