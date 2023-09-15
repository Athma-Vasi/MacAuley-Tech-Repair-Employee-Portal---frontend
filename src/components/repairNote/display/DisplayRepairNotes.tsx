import { DisplayResource } from '../../displayResource';
import { REPAIR_NOTE_QUERY_DATA, REPAIR_NOTE_ROUTE_PATHS } from '../constants';

function DisplayRepairNotes() {
  return (
    <DisplayResource
      componentQueryData={REPAIR_NOTE_QUERY_DATA}
      createResourcePath="/home/repair-note/create"
      paths={REPAIR_NOTE_ROUTE_PATHS}
      requestBodyHeading="repairNote"
    />
  );
}

export default DisplayRepairNotes;
