import { ChangeEvent, useEffect, useReducer } from 'react';
import { DisplayQueryProps } from './types';
import { SelectInputData } from '../../types';
import {
  displayQueryReducer,
  initialDisplayQueryState,
  displayQueryAction,
} from './state';
import { groupQueryResponse, logState } from '../../utils';
import {
  AccessibleRadioGroupInputCreatorInfo,
  AccessibleSelectInputCreatorInfo,
} from '../wrappers';
import {
  returnAccessibleRadioGroupInputsElements,
  returnAccessibleSelectInputElements,
} from '../../jsxCreators';

function DisplayQuery<Doc>({
  style = {},
  queryResponseData,
  componentQueryData,
}: DisplayQueryProps<Doc>) {
  const [displayQueryState, displayQueryDispatch] = useReducer(
    displayQueryReducer,
    initialDisplayQueryState
  );
  const { groupByRadioData, groupBySelectValueMap, groupBySelection } =
    displayQueryState;

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
      [
        {
          label: 'Username',
          value: 'username',
        },
      ]
    );

    displayQueryDispatch({
      type: displayQueryAction.setGroupByRadioData,
      payload: initialGroupByRadioData,
    });
  }, [queryResponseData, componentQueryData]);

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
  //   const [createdGroupBySelectInput] = returnAccessibleSelectInputElements([
  //     groupBySelectInputCreatorInfo,
  //   ]);

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

  console.log(
    'groupedByData',
    groupQueryResponse({
      queryResponseData,
      groupBySelection,
    })
  );
  return <>{createdGroupByRadioGroup}</>;
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
