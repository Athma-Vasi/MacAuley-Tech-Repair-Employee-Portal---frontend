import { Accordion, Flex, NavLink, Timeline } from '@mantine/core';
import { TbChevronRight, TbLayersLinked, TbLink } from 'react-icons/tb';

import { TimelineBuilderProps } from './types';
import { FormLayoutWrapper, TextWrapper } from '../wrappers';
import { useGlobalState } from '../../hooks';

function TimelineBuilder({ timelines }: TimelineBuilderProps): JSX.Element {
  const {
    globalState: { padding },
  } = useGlobalState();

  const createTimelines = Object.entries(timelines).map(
    ([key, value], index) => {
      return (
        <Flex direction="column" w="100%">
          <NavLink
            label={`${key.charAt(0).toUpperCase()}${key.slice(1)}`}
            key={`timeline-${index}`}
            icon={<TbLayersLinked />}
            rightSection={<TbChevronRight />}
            childrenOffset="xs"
            disabled={value.length === 0}
            w="62%"
          >
            {value.length === 0 ? null : (
              <Timeline active={Number.MAX_SAFE_INTEGER} w="100%" py={padding}>
                {value.map((item, index) => (
                  <Timeline.Item
                    key={`timeline-item-${index}`}
                    title={item}
                    bullet={<TbLink />}
                    w="100%"
                  />
                ))}
              </Timeline>
            )}
          </NavLink>
        </Flex>
      );
    }
  );

  return <>{createTimelines}</>;
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
