import { Flex } from '@mantine/core';
import { QueryResponseData } from '../../../types';
import { DisplayResource } from '../../displayResource';
import DisplayResourceHeader from '../../displayResourceHeader/DisplayResourceHeader';
import { REPAIR_NOTE_QUERY_DATA, REPAIR_NOTE_ROUTE_PATHS } from '../constants';
import { RepairNoteDocument } from '../types';

function DisplayRepairNotes() {
  const imageSrc =
    'https://images.pexels.com/photos/7639370/pexels-photo-7639370.jpeg?auto=compress';
  const imageAlt = 'A Person Fixing a Laptop';
  const resourceDescription = 'Welcome to Repair Notes Management Portal';
  const resourceTitle = 'Repair Notes';

  const displayResourceHeader = (
    <DisplayResourceHeader
      imageAlt={imageAlt}
      imageSrc={imageSrc}
      resourceDescription={resourceDescription}
      resourceTitle={resourceTitle}
    />
  );

  const displayResource = (
    <DisplayResource<QueryResponseData<RepairNoteDocument>[]>
      componentQueryData={REPAIR_NOTE_QUERY_DATA}
      createResourcePath="/home/repair-note/create"
      paths={REPAIR_NOTE_ROUTE_PATHS}
      requestBodyHeading="repairNote"
    />
  );

  const displayRepairNoteComponent = (
    <Flex direction="column" w="100%">
      {displayResourceHeader}
      {displayResource}
    </Flex>
  );

  return displayRepairNoteComponent;
}

export default DisplayRepairNotes;
