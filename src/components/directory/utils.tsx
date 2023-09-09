import {
  Card,
  Flex,
  Group,
  Image,
  MantineNumberSize,
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

import {
  DagreLabelPos,
  DagreRankAlign,
  DagreRankDir,
  DagreRankerAlgorithm,
  DirectoryUserDocument,
} from './types';
import { CSSProperties } from 'react';

type ReturnDirectoryProfileCardInput = {
  userDocument: DirectoryUserDocument;
  padding: MantineNumberSize;
  rowGap: MantineNumberSize;
  style: CSSProperties;
  cardHeight?: number;
};

function returnDirectoryProfileCard({
  userDocument: {
    firstName,
    lastName,
    preferredPronouns,
    jobPosition,
    storeLocation,
    profilePictureUrl,
  },
  padding,
  rowGap,
  style = {},
  cardHeight = 200,
}: ReturnDirectoryProfileCardInput) {
  const { border, color } = style;
  const createdSocialMediaIcons = (
    <Flex wrap="wrap" align="center" justify="flex-start" columnGap={4}>
      <Tooltip label={`View ${firstName} ${lastName}'s Mastodon profile`}>
        <Group>
          <TbBrandMastodon size={18} style={{ cursor: 'pointer', color }} />
        </Group>
      </Tooltip>

      <Tooltip label={`View ${firstName} ${lastName}'s LinkedIn profile`}>
        <Group>
          <TiSocialLinkedin size={18} style={{ cursor: 'pointer', color }} />
        </Group>
      </Tooltip>

      <Tooltip label={`View ${firstName} ${lastName}'s Flickr profile`}>
        <Group>
          <TiSocialFlickr size={18} style={{ cursor: 'pointer', color }} />
        </Group>
      </Tooltip>

      <Tooltip label={`View ${firstName} ${lastName}'s Dribbble profile`}>
        <Group>
          <TiSocialDribbble size={18} style={{ cursor: 'pointer', color }} />
        </Group>
      </Tooltip>
    </Flex>
  );

  const displayProfileCard = (
    <Card radius="md" w={325} h={cardHeight} style={{ ...style }}>
      <Flex
        justify="space-between"
        w="100%"
        h="100%"
        pb="sm"
        style={{ outline: '1px solid teal' }}
        align="center"
      >
        <Stack align="center" w="38%" style={{ outline: '1px solid brown' }}>
          <Image
            src={profilePictureUrl}
            alt={`Picture of ${firstName} ${lastName}`}
            width={84}
            height={84}
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
          style={{ borderLeft: border }}
        >
          <Title order={4}>{`${firstName} ${lastName}`}</Title>
          <Text pb={padding}>{preferredPronouns}</Text>
          <Text>{jobPosition}</Text>
          {storeLocation ? <Text>{storeLocation}</Text> : null}
        </Flex>
      </Flex>
    </Card>
  );

  return displayProfileCard;
}

type ReturnDagreLayoutedElementsInput = {
  edges: Edge[];
  nodes: Node[];
  nodeHeight?: number;
  nodeWidth?: number;
  rankdir?: DagreRankDir; // default 'TB'
  align?: DagreRankAlign; // default undefined
  nodesep?: number; // default 50
  edgesep?: number; // default 10
  ranksep?: number; // default 50
  marginx?: number; // default 0
  marginy?: number; // default 0
  ranker?: DagreRankerAlgorithm; // default 'network-simplex'
  minlen?: number; // minimum edge length default: 1
  weight?: number; // default: 1
  labelpos?: DagreLabelPos; // default: 'r'
  labeloffset?: number; // default: 10
};

function returnDagreLayoutedElements(
  dagreLayoutOptions: ReturnDagreLayoutedElementsInput
) {
  const {
    edges,
    nodes,
    nodeHeight = 267,
    nodeWidth = 371,
    rankdir = 'TB',
    align,
    nodesep = 50,
    edgesep = 10,
    ranksep = 50,
    marginx = 0,
    marginy = 0,
    ranker = 'network-simplex',
    minlen = 1,
    weight = 1,
    labelpos = 'r',
    labeloffset = 10,
  } = dagreLayoutOptions;

  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({
    minlen,
    weight,
    labelpos,
    labeloffset,
  }));

  const isHorizontal = rankdir === 'LR';
  dagreGraph.setGraph({
    rankdir,
    align,
    nodesep,
    edgesep,
    ranksep,
    marginx,
    marginy,
    ranker,
  });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    // type mismatch in library defs
    node.targetPosition = isHorizontal ? ('left' as any) : ('top' as any);
    node.sourcePosition = isHorizontal ? ('right' as any) : ('bottom' as any);

    // shifting the dagre node position (anchor=center center) to the top left
    // so it matches the React Flow node anchor point (top left).
    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    };

    return node;
  });

  return { nodes, edges };
}

export { returnDagreLayoutedElements, returnDirectoryProfileCard };
