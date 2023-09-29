import { Flex } from '@mantine/core';
import { DisplayResource } from '../displayResource';
import DisplayResourceHeader from '../displayResourceHeader/DisplayResourceHeader';
import {
  PRINTER_ISSUE_QUERY_DATA,
  PRINTER_ISSUE_ROUTE_PATHS,
} from './constants';
import { PrinterIssueDocument } from './create/types';

function DisplayPrinterIssues() {
  const imageSrc =
    'https://images.pexels.com/photos/12437643/pexels-photo-12437643.jpeg?auto=compress';
  const imageAlt = 'Gloved Hand Fixing Printer';
  const resourceDescription = 'Submit Your Printer Issues with Ease';
  const resourceTitle = 'Printer Issues';

  const displayResourceHeader = (
    <DisplayResourceHeader
      imageAlt={imageAlt}
      imageSrc={imageSrc}
      resourceDescription={resourceDescription}
      resourceTitle={resourceTitle}
    />
  );

  const displayResource = (
    <DisplayResource<PrinterIssueDocument>
      componentQueryData={PRINTER_ISSUE_QUERY_DATA}
      createResourcePath="/home/general/printer-issue/create"
      resourceUrlPaths={PRINTER_ISSUE_ROUTE_PATHS}
      requestBodyHeading="printerIssue"
    />
  );

  const displayPrinterIssueComponent = (
    <Flex direction="column" w="100%">
      {displayResourceHeader}
      {displayResource}
    </Flex>
  );

  return displayPrinterIssueComponent;
}

export default DisplayPrinterIssues;
