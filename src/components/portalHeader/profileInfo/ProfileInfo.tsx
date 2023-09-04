import { Avatar, Group, Popover, Text, ThemeIcon } from '@mantine/core';
import { useGlobalState } from '../../../hooks';
import { TbArrowBarDown, TbArrowDown } from 'react-icons/tb';

function ProfileInfo() {
  const {
    globalState: { userDocument },
  } = useGlobalState();

  const displayAvatar = (
    <Group style={{ cursor: 'pointer' }}>
      <Avatar
        src={userDocument?.profilePictureUrl}
        alt="profile pic"
        radius={9999}
      />
      <TbArrowBarDown />
    </Group>
  );

  const displayThemeSelection = <Text color="dark">Theme</Text>;
  const displayProfile = <Text color="dark">Profile</Text>;

  const profilePopover = (
    <Popover width={300} withArrow position="bottom" shadow="md">
      <Popover.Target>{displayAvatar}</Popover.Target>

      <Popover.Dropdown>
        {displayThemeSelection}
        {displayProfile}
      </Popover.Dropdown>
    </Popover>
  );

  const displayProfileInfoComponent = profilePopover;

  return displayProfileInfoComponent;
}

export default ProfileInfo;
