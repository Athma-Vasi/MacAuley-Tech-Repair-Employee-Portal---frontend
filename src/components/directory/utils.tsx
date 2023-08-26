import {
  Card,
  Flex,
  Group,
  Image,
  Stack,
  Text,
  Title,
  Tooltip,
} from '@mantine/core';
import dagre from 'dagre';
import { TbBrandMastodon, TbPhotoOff } from 'react-icons/tb';
import {
  TiSocialDribbble,
  TiSocialFlickr,
  TiSocialLinkedin,
} from 'react-icons/ti';
import { Edge, Node } from 'reactflow';

import { DirectoryUserDocument, FlowNodesLayoutDirection } from './types';

type ReturnDirectoryProfileCardInput = {
  userDocument: DirectoryUserDocument;
  padding: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  rowGap: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
};

function returnDirectoryProfileCard({
  userDocument,
  padding,
  rowGap,
}: ReturnDirectoryProfileCardInput) {
  const {
    firstName,
    lastName,
    profilePictureUrl,
    preferredPronouns,
    jobPosition,
  } = userDocument;

  const createdSocialMediaIcons = (
    <Flex wrap="wrap" align="center" justify="flex-start" columnGap={4}>
      <Tooltip label={`View ${firstName} ${lastName}'s Mastodon profile`}>
        <Group>
          <TbBrandMastodon
            size={18}
            style={{ cursor: 'pointer', color: 'dimgray' }}
          />
        </Group>
      </Tooltip>

      <Tooltip label={`View ${firstName} ${lastName}'s LinkedIn profile`}>
        <Group>
          <TiSocialLinkedin
            size={18}
            style={{ cursor: 'pointer', color: 'dimgray' }}
          />
        </Group>
      </Tooltip>

      <Tooltip label={`View ${firstName} ${lastName}'s Flickr profile`}>
        <Group>
          <TiSocialFlickr
            size={18}
            style={{ cursor: 'pointer', color: 'dimgray' }}
          />
        </Group>
      </Tooltip>

      <Tooltip label={`View ${firstName} ${lastName}'s Dribbble profile`}>
        <Group>
          <TiSocialDribbble
            size={18}
            style={{ cursor: 'pointer', color: 'dimgray' }}
          />
        </Group>
      </Tooltip>
    </Flex>
  );

  const displayProfileCard = (
    <Card shadow="sm" padding={padding} radius="md" w="100%" h="100%">
      <Flex
        justify="space-between"
        w="100%"
        h="100%"
        style={{ outline: '1px solid teal' }}
        align="center"
        // p={padding}
      >
        <Stack
          align="center"
          // px={padding}
          w="38%"
          style={{ outline: '1px solid brown' }}
        >
          <Image
            src={profilePictureUrl}
            alt={`Picture of ${firstName} ${lastName}`}
            width={72}
            height={72}
            radius={9999}
            withPlaceholder
            placeholder={<TbPhotoOff size={18} />}
          />
          {createdSocialMediaIcons}
        </Stack>
        <Flex
          direction="column"
          p={padding}
          align="center"
          justify="center"
          w="62%"
          style={{ borderLeft: '1px solid #e0e0e0' }}
        >
          <Title order={4} color="dark">{`${firstName} ${lastName}`}</Title>
          <Text color="dark" size="sm" pb={padding}>
            {preferredPronouns}
          </Text>
          <Text color="dark" size="sm">
            {jobPosition}
          </Text>
        </Flex>
      </Flex>
    </Card>
  );

  return displayProfileCard;
}

type ReturnDagreLayoutedElementsInput = {
  nodes: Node[];
  edges: Edge[];
  direction?: FlowNodesLayoutDirection;
};

function returnDagreLayoutedElements({
  nodes,
  edges,
  direction = 'TB',
}: ReturnDagreLayoutedElementsInput) {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  const nodeWidth = 351;
  const nodeHeight = 217;

  const getLayoutedElements = (
    nodes: Node[],
    edges: Edge[],
    direction = 'TB'
  ) => {
    const isHorizontal = direction === 'LR';
    dagreGraph.setGraph({ rankdir: direction });

    nodes.forEach((node) => {
      dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
    });

    edges.forEach((edge) => {
      dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    nodes.forEach((node) => {
      const nodeWithPosition = dagreGraph.node(node.id);
      //  type mismatch in library defs
      node.targetPosition = isHorizontal ? ('left' as any) : ('top' as any);
      node.sourcePosition = isHorizontal ? ('right' as any) : ('bottom' as any);

      // We are shifting the dagre node position (anchor=center center) to the top left
      // so it matches the React Flow node anchor point (top left).
      node.position = {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2,
      };

      return node;
    });

    return { nodes, edges };
  };

  return getLayoutedElements(nodes, edges, direction);
}

export { returnDagreLayoutedElements, returnDirectoryProfileCard };
