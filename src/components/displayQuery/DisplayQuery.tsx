import { Flex, Group, Text, Title } from '@mantine/core';
import { useEffect, useReducer } from 'react';

import { returnAccessibleRadioGroupInputsElements } from '../../jsxCreators';
import { groupQueryResponse, logState } from '../../utils';
import {
  AccessibleRadioGroupInputCreatorInfo,
  FormLayoutWrapper,
} from '../wrappers';
import {
  displayQueryAction,
  displayQueryReducer,
  initialDisplayQueryState,
} from './state';
import { DisplayQueryProps } from './types';

function DisplayQuery<Doc>({
  style = {},
  queryResponseData,
  componentQueryData,
}: DisplayQueryProps<Doc>) {
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
  /** ------------- end input creator info objects ------------- */

  /** ------------- created inputs------------- */

  const [createdGroupByRadioGroup] = returnAccessibleRadioGroupInputsElements([
    groupByRadioGroupCreatorInfo,
  ]);

  //
  //
  // log state
  useEffect(() => {
    logState({
      state: displayQueryState,
      groupLabel: 'DisplayQuery',
    });

    console.log('componentQueryData', componentQueryData);
  }, [displayQueryState, componentQueryData]);

  const displayGroupedByQueryResponseData = Array.from(
    groupedByQueryResponseData
  ).map(([label, queryObjArr]) => {
    const displayLabel = <Title>{label}</Title>;
    const displayQueryObjArr = queryObjArr.map((queryObj) => {
      const displayQueryObj = Object.entries(queryObj).map(([key, value]) => {
        return (
          <Group>
            <Text>{key}</Text>
            <Text>{value}</Text>
          </Group>
        );
      });

      return <FormLayoutWrapper>{displayQueryObj}</FormLayoutWrapper>;
    });

    return (
      <FormLayoutWrapper>
        {displayLabel}
        {displayQueryObjArr}
      </FormLayoutWrapper>
    );
  });

  return (
    <>
      {createdGroupByRadioGroup}
      <Flex direction="column" rowGap="xl">
        {displayGroupedByQueryResponseData}
      </Flex>
      {JSON.stringify(restOfGroupedQueryResponseData, null, 2)}
    </>
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
