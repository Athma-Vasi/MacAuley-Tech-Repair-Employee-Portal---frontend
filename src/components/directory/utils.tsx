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

import { DirectoryUserDocument } from './types';

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

export { returnDirectoryProfileCard };
