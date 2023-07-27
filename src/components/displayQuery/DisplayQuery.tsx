import { Flex, Group, SegmentedControl, Text, Title } from '@mantine/core';
import { useEffect, useReducer } from 'react';

import { returnAccessibleRadioGroupInputsElements } from '../../jsxCreators';
import { groupQueryResponse, logState } from '../../utils';
import { AccessibleRadioGroupInputCreatorInfo } from '../wrappers';
import { DisplayQueryMobile } from './displayQueryMobile/DisplayQueryMobile';
import {
  displayQueryAction,
  displayQueryReducer,
  initialDisplayQueryState,
} from './state';
import { DisplayQueryProps } from './types';
import { useGlobalState } from '../../hooks';
import { DisplayQueryDesktop } from './displayQueryDesktop/DisplayQueryDesktop';

function DisplayQuery<Doc>({
  style = {},
  queryResponseData,
  componentQueryData,
  parentComponentDispatch,
  parentComponentName,
}: DisplayQueryProps<Doc>) {
  const {
    globalState: { padding, width, rowGap },
  } = useGlobalState();
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
  } = displayQueryState;

  // create initial groupByRadioData state
  useEffect(() => {
    const initialGroupByRadioData = componentQueryData.reduce(
      (acc, { inputKind, label, value, selectData }) => {
        if (inputKind === 'selectInput') {
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
    );

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

  // set the popovers initial state to closed on query response data change

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

  /** ------------- end input creator info objects ------------- */

  /** ------------- created inputs------------- */

  const [createdGroupByRadioGroup] = returnAccessibleRadioGroupInputsElements([
    groupByRadioGroupCreatorInfo,
  ]);

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

  const displayQueryComponent =
    width <= 1024 ? (
      <DisplayQueryMobile
        tableViewSelection={currentSegmentedSelection}
        groupedByQueryResponseData={groupedByQueryResponseData}
        restOfGroupedQueryResponseData={restOfGroupedQueryResponseData}
        componentQueryData={componentQueryData}
        requestStatusDispatch={parentComponentDispatch}
        popoversOpenCloseState={popoversOpenCloseState}
        popoversStateDispatch={displayQueryDispatch}
      />
    ) : (
      <DisplayQueryDesktop
        tableViewSelection={currentSegmentedSelection}
        componentQueryData={componentQueryData}
        groupedByQueryResponseData={groupedByQueryResponseData}
        requestStatusDispatch={parentComponentDispatch}
        restOfGroupedQueryResponseData={restOfGroupedQueryResponseData}
        popoversOpenCloseState={popoversOpenCloseState}
        popoversStateDispatch={displayQueryDispatch}
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
      // w={width < 768 ? '100%' : width < 1440 ? '85%' : '62%'}
      w="100%"
      // p={padding}
      align="flex-start"
      justify="center"
      style={{
        ...style,
        // border: '1px solid #e0e0e0',
        // borderRadius: 4,
      }}
    >
      {displayGroupByRadioGroup}
      {displayTableViewSegmentControl}
      <Text>{parentComponentName}</Text>
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
