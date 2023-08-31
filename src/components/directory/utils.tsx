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
import { TbBrandMastodon, TbPhotoOff } from 'react-icons/tb';
import {
  TiSocialDribbble,
  TiSocialFlickr,
  TiSocialLinkedin,
} from 'react-icons/ti';

import {
  DagreLabelPos,
  DagreRankAlign,
  DagreRankDir,
  DagreRankerAlgorithm,
  DirectoryUserDocument,
} from './types';
import dagre from 'dagre';
import { Edge, Node } from 'reactflow';

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
    storeLocation,
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
    <Card radius="md" w={325} h={200}>
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
          style={{ borderLeft: '1px solid #e0e0e0' }}
        >
          <Title order={4} color="dark">{`${firstName} ${lastName}`}</Title>
          <Text color="dark" size="sm" pb={padding}>
            {preferredPronouns}
          </Text>
          <Text color="dark" size="sm">
            {jobPosition}
          </Text>
          {storeLocation ? (
            <Text color="dark" size="sm">
              {storeLocation}
            </Text>
          ) : null}
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
    nodeHeight = 217,
    nodeWidth = 351,
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

export { returnDirectoryProfileCard, returnDagreLayoutedElements };
