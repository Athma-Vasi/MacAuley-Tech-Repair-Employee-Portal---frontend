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
};

function returnDirectoryProfileCard({
  userDocument: {
    firstName,
    lastName,
    preferredPronouns,
    email,
    contactNumber,
    department,
    jobPosition,
    storeLocation,
    profilePictureUrl,
  },
  padding,
  rowGap,
  style = {},
}: ReturnDirectoryProfileCardInput) {
  const { backgroundColor = '#f5f5f5', border, color } = style;

  console.log('backgroundColor: ', backgroundColor);
  // console.log('border: ', border);
  // console.log('color: ', color);

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
    <Card
      radius="md"
      w={325}
      h={200}
      p={0}
      style={{
        border,
        backgroundColor,
        color,
      }}
    >
      <Flex justify="space-between" w={325} h={200} align="center">
        <Flex
          direction="column"
          align="center"
          w="38%"
          rowGap="xs"
          style={{
            borderRight: border,
          }}
        >
          <Image
            src={profilePictureUrl}
            alt={`Picture of ${firstName} ${lastName}`}
            width={84}
            height={84}
            radius={9999}
            withPlaceholder
            placeholder={<TbPhotoOff size={18} />}
          />
          <Text>{preferredPronouns}</Text>
          {createdSocialMediaIcons}
        </Flex>
        <Flex
          direction="column"
          p={padding}
          rowGap="xs"
          align="flex-start"
          justify="center"
          w="62%"
          h="100%"
          // style={{ borderLeft: border }}
        >
          <Title
            order={6}
            style={{
              letterSpacing: '1px',
            }}
          >{`${firstName} ${lastName}`}</Title>
          <Text align="initial">{jobPosition}</Text>
          <Flex w="100%" align="center" justify="center" wrap="wrap">
            {email.split('@').map((str, idx) => (
              <Flex w="100%" gap={2}>
                {idx === 1 ? <Text pl={padding}>@</Text> : null}
                <Text key={`${str}-${idx}`} align="initial">
                  {str}
                </Text>
              </Flex>
            ))}
          </Flex>
          <Text>{contactNumber}</Text>
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
