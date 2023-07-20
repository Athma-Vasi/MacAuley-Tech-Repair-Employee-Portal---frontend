import { useEffect, useReducer } from 'react';

import { SelectInputData } from '../../types';
import { logState } from '../../utils';

function QueryBuilder() {
  //
  return <h5>Query builder</h5>;
}

export { QueryBuilder };

/**
 *  useEffect(() => {
    // loop through valuesLabelsTypes and assign to both filter select data or sort select data
    const [filterSelectData, sortSelectData, valueTypeObj] = Object.entries(
      valuesLabelsTypes
    ).reduce(
      (
        acc: [SelectInputData, SelectInputData, ValueTypeObject],
        [value, labelType]
      ) => {
        const [label, type] = labelType;

        const selectData = {
          label: label,
          value,
        };
        // selectData (string[]) cannot be sorted, the rest(number, boolean, date) can be sorted and filtered
        if (type === 'selectData') {
          acc[0].push(selectData);
        } else {
          acc[0].push(selectData);
          acc[1].push(selectData);
        }

        // used to discriminate operations on values
        Object.defineProperty(acc[2], label, {
          value: type,
          writable: false,
          enumerable: true,
          configurable: false,
        });

        return acc;
      },
      [[], [], {}]
    );
  }, []);
 */
