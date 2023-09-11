import { QueryResponseData } from '../../types';
import { DisplayResource } from '../displayResource';
import {
  REQUEST_RESOURCE_PATHS,
  REQUEST_RESOURCE_QUERY_DATA,
} from './constants';
import { RequestResourceDocument } from './create/types';

function DisplayRequestResources() {
  return (
    <DisplayResource<QueryResponseData<RequestResourceDocument>[]>
      componentQueryData={REQUEST_RESOURCE_QUERY_DATA}
      paths={REQUEST_RESOURCE_PATHS}
      requestBodyHeading="requestResource"
    />
  );
}

export default DisplayRequestResources;
