import {
  Box,
  Group,
  HoverCard,
  Modal,
  ScrollArea,
  Stack,
  Table,
  Text,
  Tooltip,
  UnstyledButton,
} from "@mantine/core";
import { FileUploadDocument, QueryResponseData } from "../../types";
import { TiArrowUpThick } from "react-icons/ti";
import { COMMENT_RESOURCE_DATA } from "./TEMPDATA";
import { formatDate, replaceLastCommaWithAnd } from "../../utils";
import { SortDirection } from "../query/types";
import React from "react";
import { formatDocumentValue } from "./utils";
import { useDisclosure } from "@mantine/hooks";
import { ResourceDispatch } from "./types";
import { ResourceAction } from "./actions";
import { GoldenGrid } from "../accessibleInputs/GoldenGrid";

type DesktopProps = {
  // queryValues: Array<string>;
  // resourceActionPATCH: string;
  // uploadedFiles: Map<string, Array<FileUploadDocument>>;

  resourceData: Array<QueryResponseData>;
  resourceDispatch: React.Dispatch<ResourceDispatch>;
  selectedDocument: QueryResponseData | null;
  selectedField: string;
  setSelectedDocument: ResourceAction["setSelectedDocument"];
  setSelectedField: ResourceAction["setSelectedField"];
  setSortFieldDirection: ResourceAction["setSortFieldDirection"];
};

function Desktop({
  resourceData,
  resourceDispatch,
  selectedDocument,
  selectedField,
  setSelectedDocument,
  setSelectedField,
  setSortFieldDirection,
}: DesktopProps): JSX.Element {
  const [
    openedDocumentEditModal,
    { open: openDocumentEditModal, close: closeDocumentEditModal },
  ] = useDisclosure(false);

  const headerValues = resourceData.length > 0 ? Object.keys(resourceData[0]) : [];

  const tableHeader = (
    <thead>
      <tr>
        {headerValues.map((headerValue, index) => {
          const ascendingIconWithTooltip = (
            <Tooltip label={`Sort ${headerValue} in ascending order`}>
              <Group>
                <TiArrowUpThick
                  // color={ascendingIconColor}
                  style={{ cursor: "pointer" }}
                  size={17}
                  onClick={(_event: React.MouseEvent<SVGElement, MouseEvent>) => {
                    resourceDispatch({
                      action: setSortFieldDirection,
                      payload: { direction: "ascending", field: headerValue },
                    });
                  }}
                />
              </Group>
            </Tooltip>
          );

          const descendingIconWithTooltip = (
            <Tooltip label={`Sort ${headerValue} in descending order`}>
              <Group>
                <TiArrowUpThick
                  // color={descendingIconColor}
                  style={{ cursor: "pointer" }}
                  size={17}
                  onClick={(_event: React.MouseEvent<SVGElement, MouseEvent>) => {
                    resourceDispatch({
                      action: setSortFieldDirection,
                      payload: { direction: "descending", field: headerValue },
                    });
                  }}
                />
              </Group>
            </Tooltip>
          );

          const headerValueWithSortIcons = (
            <Group maw={300} miw={50}>
              {ascendingIconWithTooltip}
              {headerValue}
              {descendingIconWithTooltip}
            </Group>
          );

          return <th key={index}>{headerValueWithSortIcons}</th>;
        })}
      </tr>
    </thead>
  );

  const tableBody = resourceData.map((document, docIndex) => {
    const tableRow = Object.entries(document).map(([key, value], rowIndex) => {
      const { slicedValue, unSlicedValue } = formatDocumentValue(key, value);

      const unmodifiableFieldsSet = new Set([
        "_id",
        "username",
        "userId",
        "userRole",
        "createdAt",
        "updatedAt",
        "__v",
        // repair note
        "dateReceived",
        "estimatedCompletionDate",
        // company
        "planStartDate",
        "expenseClaimDate",
        "startDate",
        "endDate",
        "dateNeededBy",
        // general
        "dateOfOccurrence",
        // outreach
        "rsvpDeadline",
        "eventStartDate",
        "eventEndDate",
        // register - user
        "dateOfBirth",
      ]);

      const button = (
        <UnstyledButton
          maw={300}
          miw={50}
          onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            console.log(`Button clicked: ${event.currentTarget}`);

            resourceDispatch({
              action: setSelectedDocument,
              payload: document,
            });

            resourceDispatch({
              action: setSelectedField,
              payload: key,
            });

            openDocumentEditModal();
          }}
          style={{ cursor: unmodifiableFieldsSet.has(key) ? "not-allowed" : "pointer" }}
        >
          {slicedValue}
        </UnstyledButton>
      );

      const buttonWithHoverCard = (
        <HoverCard width={500} shadow="lg" withArrow>
          <HoverCard.Target>{button}</HoverCard.Target>

          <HoverCard.Dropdown>
            <Text>{unSlicedValue}</Text>
          </HoverCard.Dropdown>
        </HoverCard>
      );

      return (
        <td key={`${docIndex}-${rowIndex}-${key}-${slicedValue}`}>
          {buttonWithHoverCard}
        </td>
      );
    });

    return (
      <tbody key={`${docIndex}`} style={{ outline: "1px solid green" }}>
        <tr style={{ outline: "1px solid violet" }}>{tableRow}</tr>
      </tbody>
    );
  });

  const documentEditModal = (
    <Modal
      centered
      opened={openedDocumentEditModal}
      onClose={closeDocumentEditModal}
      title={<Text>Edit Document</Text>}
    >
      <Stack>
        {Object.entries(selectedDocument ?? {}).map(([key, value], index) => (
          <GoldenGrid key={`${index}-${key}-${value?.toString().slice(17) ?? ""}`}>
            <Text>{key}</Text>
            <Text>{value?.toString() ?? ""}</Text>
          </GoldenGrid>
        ))}
      </Stack>
    </Modal>
  );

  return (
    <Stack>
      {documentEditModal}
      <Table striped highlightOnHover>
        {tableHeader}
        {tableBody}
      </Table>
    </Stack>
  );
}

export { Desktop };
