import { DisplayResource } from '../displayResource';
import {
  PRINTER_ISSUE_QUERY_DATA,
  PRINTER_ISSUE_ROUTE_PATHS,
} from './constants';
import { PrinterIssueDocument } from './create/types';

function DisplayPrinterIssues() {
  return (
    <DisplayResource<PrinterIssueDocument>
      componentQueryData={PRINTER_ISSUE_QUERY_DATA}
      paths={PRINTER_ISSUE_ROUTE_PATHS}
      requestBodyHeading="printerIssue"
    />
  );
}

export default DisplayPrinterIssues;
