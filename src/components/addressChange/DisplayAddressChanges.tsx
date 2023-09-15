import { DisplayResource } from '../displayResource';
import { ADDRESS_CHANGE_PATHS, ADDRESS_CHANGE_QUERY_DATA } from './constants';

function DisplayAddressChanges() {
  return (
    <DisplayResource
      componentQueryData={ADDRESS_CHANGE_QUERY_DATA}
      createResourcePath="/home/company/address-change/create"
      paths={ADDRESS_CHANGE_PATHS}
      requestBodyHeading="addressChange"
    />
  );
}

export default DisplayAddressChanges;
