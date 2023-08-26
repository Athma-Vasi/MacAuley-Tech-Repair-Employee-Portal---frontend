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
  TiSocialGithub,
  TiSocialLinkedin,
} from 'react-icons/ti';
import { Edge, Node } from 'reactflow';

import { UserDocument } from '../../types';

type ReturnDirectoryProfileCardInput = {
  userDocument: UserDocument;
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
    department,
  } = userDocument;

  const createdSocialMediaIcons = (
    <Flex wrap="wrap" align="center" justify="flex-start" columnGap={4}>
      <Tooltip label={`View ${firstName} ${lastName}'s Github profile`}>
        <Group>
          <TiSocialGithub
            size={24}
            style={{ cursor: 'pointer', color: 'dimgray' }}
          />
        </Group>
      </Tooltip>

      <Tooltip label={`View ${firstName} ${lastName}'s Mastodon profile`}>
        <Group>
          <TbBrandMastodon
            size={24}
            style={{ cursor: 'pointer', color: 'dimgray' }}
          />
        </Group>
      </Tooltip>

      <Tooltip label={`View ${firstName} ${lastName}'s LinkedIn profile`}>
        <Group>
          <TiSocialLinkedin
            size={24}
            style={{ cursor: 'pointer', color: 'dimgray' }}
          />
        </Group>
      </Tooltip>

      <Tooltip label={`View ${firstName} ${lastName}'s Flickr profile`}>
        <Group>
          <TiSocialFlickr
            size={24}
            style={{ cursor: 'pointer', color: 'dimgray' }}
          />
        </Group>
      </Tooltip>

      <Tooltip label={`View ${firstName} ${lastName}'s Dribbble profile`}>
        <Group>
          <TiSocialDribbble
            size={24}
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
        p={padding}
      >
        <Stack
          align="center"
          style={{ borderRight: '1px solid #e0e0e0' }}
          px={padding}
          w="38%"
        >
          <Image
            src={profilePictureUrl}
            alt={`Picture of ${firstName} ${lastName}`}
            width={96}
            height={96}
            radius={9999}
            withPlaceholder
            placeholder={<TbPhotoOff size={20} />}
          />
          {createdSocialMediaIcons}
        </Stack>
        <Flex
          direction="column"
          p={padding}
          align="center"
          justify="center"
          w="62%"
          rowGap={rowGap}
        >
          <Title order={4} color="dark">{`${firstName} ${lastName}`}</Title>
          <Text color="dark" size="md">
            {jobPosition}
          </Text>
          <Text color="dark" size="sm">
            {department}
          </Text>
          <Text color="dark" size="sm">
            {preferredPronouns}
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
  direction?: 'TB' | 'LR';
};

function returnDagreLayoutedElements({
  nodes,
  edges,
  direction = 'TB',
}: ReturnDagreLayoutedElementsInput) {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  const nodeWidth = 500;
  const nodeHeight = 309;

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
