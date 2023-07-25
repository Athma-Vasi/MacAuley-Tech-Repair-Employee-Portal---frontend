import { useEffect, useReducer } from 'react';

import { QueryResponseData, SelectInputData } from '../../../types';
import {
  displayQueryMobileAction,
  displayQueryMobileReducer,
  initialDisplayQueryMobileState,
} from './state';
import { DisplayQueryMobileProps } from './types';
import { logState } from '../../../utils';

function DisplayQueryMobile<Doc>({
  style = {},
  queryResponseData,
  componentQueryData,
}: DisplayQueryMobileProps<Doc>): JSX.Element {
  const [displayQueryMobileState, displayQueryMobileDispatch] = useReducer(
    displayQueryMobileReducer,
    initialDisplayQueryMobileState
  );
  const { groupBySelectData } = displayQueryMobileState;

  // create initial groupBySelectData state
  useEffect(() => {
    const initialGroupBySelectData: SelectInputData = [
      {
        label: 'Group By',
        value: '',
      },
      { label: 'Username', value: 'username' },
    ];

    componentQueryData.forEach(({ label, inputKind, value, selectData }) => {
      if (inputKind === 'selectInput') {
        initialGroupBySelectData.push({
          label,
          value,
        });
      }
    });

    displayQueryMobileDispatch({
      type: displayQueryMobileAction.setGroupBySelectData,
      payload: initialGroupBySelectData,
    });
  }, [queryResponseData, componentQueryData]);

  useEffect(() => {
    logState({
      state: displayQueryMobileState,
      groupLabel: 'DisplayQueryMobile',
    });
  }, [displayQueryMobileState]);
  return <></>;
}

export { DisplayQueryMobile };
export type { QueryResponseData };

/**
  const [activeParent, setActiveParent] = useState(0);
 *   
 * const displayQueryMobile = queryData.map((queryDataItem, index) => {
    return (
      <FormLayoutWrapper>
        <NavLink
          key={`parent-query-data-item-${index}`}
          active={activeParent === index}
          onClick={() => {
            setActiveParent(index);
          }}
          style={{
            ...style,
            outline: '1px solid blue',
          }}
          rightSection={<TbChevronRight />}
          label={queryDataItem.username}
          w={navLinkWidth}
        >
          <Flex
            direction="column"
            align="flex-start"
            justify="center"
            w={flexWrapperWidth}
            style={{ outline: '1px solid brown' }}
          >
            {Object.entries(queryDataItem).map(
              ([fieldKey, fieldValue], index) => {
                return (
                  <Grid
                    style={{
                      borderBottom: '1px solid #e0e0e0',
                      outline: '1px solid teal',
                      backgroundColor: index % 2 === 0 ? '#fff' : '#f0f0f0',
                    }}
                    w="100%"
                    h={50}
                    columns={2}
                  >
                    <Grid.Col span={1}>
                      <Flex align="center" justify="flex-start">
                        <Text>{fieldKey}</Text>
                      </Flex>
                    </Grid.Col>
                    <Grid.Col span={1}>
                      <Flex align="center" justify="flex-start">
                        <Text>{fieldValue}</Text>
                      </Flex>
                    </Grid.Col>
                  </Grid>
                );
              }
            )}
          </Flex>
        </NavLink>
      </FormLayoutWrapper>
    );
  });
 */

/**
   * const displayQueryMobile = (
    <FormLayoutWrapper>
      <Accordion defaultValue="Leave requests query results">
        {queryData.map((queryDataItem, index) => {
          return (
            <Accordion.Item
              key={`parent-query-data-item-${index}`}
              value={queryDataItem.username}
              style={{
                ...style,
                outline: '1px solid blue',
              }}
              // rightSection={<TbChevronRight />}
            >
              <Flex
                direction="column"
                align="flex-start"
                justify="center"
                w={flexWrapperWidth}
                style={{ outline: '1px solid brown' }}
              >
                {Object.entries(queryDataItem).map(
                  ([fieldKey, fieldValue], index) => {
                    return (
                      <Accordion.Control>
                        <Grid
                          style={{
                            borderBottom: '1px solid #e0e0e0',
                            outline: '1px solid teal',
                            backgroundColor:
                              index % 2 === 0 ? '#fff' : '#f0f0f0',
                          }}
                          w="100%"
                          h={50}
                          columns={2}
                        >
                          <Accordion.Panel>
                            <Grid.Col span={1}>
                              <Flex align="center" justify="flex-start">
                                <Text>{fieldKey}</Text>
                              </Flex>
                            </Grid.Col>
                            <Grid.Col span={1}>
                              <Flex align="center" justify="flex-start">
                                <Text>{fieldValue}</Text>
                              </Flex>
                            </Grid.Col>
                          </Accordion.Panel>
                        </Grid>
                      </Accordion.Control>
                    );
                  }
                )}
              </Flex>
            </Accordion.Item>
          );
        })}
      </Accordion>
    </FormLayoutWrapper>
  );
   */
