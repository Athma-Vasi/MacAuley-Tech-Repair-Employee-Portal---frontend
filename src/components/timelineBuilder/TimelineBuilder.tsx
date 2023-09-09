import {
  Accordion,
  Flex,
  Group,
  NavLink,
  Stack,
  Timeline,
  Tooltip,
} from '@mantine/core';
import { TbChevronRight, TbLayersLinked, TbLink } from 'react-icons/tb';

import { useGlobalState } from '../../hooks';
import { TimelineBuilderProps } from './types';

function TimelineBuilder({ timelines }: TimelineBuilderProps): JSX.Element {
  const {
    globalState: { padding },
  } = useGlobalState();

  const createTimelines = Object.entries(timelines).map(
    ([chainKind, statementsArr], index) => {
      return (
        <Stack w="100%" key={`timeline-${index}`}>
          {/* accordion */}
          <Accordion w="100%">
            <Accordion.Item
              value={`${chainKind.charAt(0).toUpperCase()}${chainKind.slice(
                1
              )}`}
            >
              <Accordion.Control
                disabled={statementsArr.length === 0}
              >{`${chainKind.charAt(0).toUpperCase()}${chainKind.slice(
                1
              )}`}</Accordion.Control>
              <Accordion.Panel>
                <Timeline
                  active={Number.MAX_SAFE_INTEGER}
                  w="100%"
                  py={padding}
                >
                  {statementsArr.map((statement, index) => (
                    <Timeline.Item
                      key={`timeline-statement-${index}`}
                      title={statement}
                      bullet={<TbLink />}
                      w="100%"
                    />
                  ))}
                </Timeline>
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        </Stack>
      );
    }
  );

  return <Group>{createTimelines}</Group>;
}

export { TimelineBuilder };

/**
 * <NavLink
          label={key}
          key={`timeline-${index}`}
          icon={<TbLayersLinked />}
          rightSection={<TbChevronRight />}
          childrenOffset="xs"
          disabled={value.length === 0}
          w="38%"
          // style={{ outline: '1px solid brown' }}
        >
          {value.length === 0 ? null : (
            <Timeline
              active={Number.MAX_SAFE_INTEGER}
              style={{ outline: '1px solid green' }}
              w="75%"
            >
              {value.map((item, index) => (
                <Timeline.Item
                  key={`timeline-item-${index}`}
                  title={item}
                  bullet={<TbLink />}
                  w="100%"
                  style={{ outline: '1ps solid teal' }}
                />
              ))}
            </Timeline>
          )}
        </NavLink>
 */

/**
         * <Accordion defaultValue={key} key={`accordion-${index}`}>
          <Accordion.Item value={key}>
            <Accordion.Control>{key}</Accordion.Control>
            <Accordion.Panel>
              <FormLayoutWrapper direction="column">
                <TextWrapper creatorInfoObj={{}}>{key}</TextWrapper>
                <Timeline
                  active={Number.MAX_SAFE_INTEGER}
                  style={{ outline: '1px solid green' }}
                  w="100%"
                >
                  {value.map((item, index) => (
                    <Timeline.Item
                      key={`timeline-item-${index}`}
                      title={item}
                      bullet={<TbLink />}
                      w="100%"
                      style={{ outline: '1ps solid teal' }}
                    />
                  ))}
                </Timeline>
              </FormLayoutWrapper>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
         */
