import { Text } from '@mantine/core';
import { useLocation, useParams } from 'react-router-dom';

function DisplayAnnouncement() {
  const location = useLocation();
  const { announcement } = location.state;
  const { announcementId } = useParams();

  console.log('location.state', location.state);
  console.log('announcement', announcement);
  console.log('announcementId', announcementId);

  return (
    <>
      <Text>{announcement.title}</Text>
    </>
  );
}

export default DisplayAnnouncement;
