import { useEffect, useReducer } from 'react';

import { QueryResponseData, SelectInputData } from '../../../types';
import { logState } from '../../../utils';
import { DisplayQueryMobileProps } from './types';

function DisplayQueryMobile<Doc>({
  style = {},
}: DisplayQueryMobileProps<Doc>): JSX.Element {
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
