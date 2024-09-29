// import {
//   Box,
//   Group,
//   HoverCard,
//   Modal,
//   ScrollArea,
//   Stack,
//   Table,
//   Text,
//   Textarea,
//   Tooltip,
//   UnstyledButton,
// } from "@mantine/core";
// import { FileUploadDocument, QueryResponseData } from "../../types";
// import { TiArrowDownThick, TiArrowUpThick } from "react-icons/ti";
// import { formatDate, replaceLastCommaWithAnd } from "../../utils";
// import { SortDirection } from "../query/types";
// import React from "react";
// import { formatDocumentValue } from "./utils";
// import { useDisclosure } from "@mantine/hooks";
// import { ResourceDispatch } from "./types";
// import { resourceAction, ResourceAction } from "./actions";
// import { GoldenGrid } from "../accessibleInputs/GoldenGrid";
// import { UNMODIFIABLE_FIELDS_SET } from "./constants";
// import { AccessibleTextAreaInput } from "../accessibleInputs/AccessibleTextAreaInput";
// import { AccessibleButton } from "../accessibleInputs/AccessibleButton";

// type DesktopProps = {
//   // queryValues: Array<string>;
//   // resourceActionPATCH: string;
//   // uploadedFiles: Map<string, Array<FileUploadDocument>>;

//   openDocumentEditModal: () => void;
//   resourceData: Array<QueryResponseData>;
//   resourceDispatch: React.Dispatch<ResourceDispatch>;
// };

// function Desktop({
//   openDocumentEditModal,
//   resourceData,
//   resourceDispatch,
// }: DesktopProps): JSX.Element {
//   if (resourceData.length === 0) {
//     return <Text>No data to display</Text>;
//   }

//   const headerValues = resourceData.length > 0 ? Object.keys(resourceData[0]) : [];

//   const tableHeader = (
//     <thead>
//       <tr>
//         {headerValues.map((headerValue, index) => {
//           const ascendingIconWithTooltip = (
//             <Tooltip label={`Sort ${headerValue} in ascending order`}>
//               <Group>
//                 <TiArrowUpThick
//                   // color={ascendingIconColor}
//                   style={{ cursor: "pointer" }}
//                   size={17}
//                   onClick={(_event: React.MouseEvent<SVGElement, MouseEvent>) => {
//                     resourceDispatch({
//                       action: resourceAction.setSortFieldDirection,
//                       payload: { direction: "ascending", field: headerValue },
//                     });
//                   }}
//                 />
//               </Group>
//             </Tooltip>
//           );

//           const descendingIconWithTooltip = (
//             <Tooltip label={`Sort ${headerValue} in descending order`}>
//               <Group>
//                 <TiArrowDownThick
//                   // color={descendingIconColor}
//                   style={{ cursor: "pointer" }}
//                   size={17}
//                   onClick={(_event: React.MouseEvent<SVGElement, MouseEvent>) => {
//                     resourceDispatch({
//                       action: resourceAction.setSortFieldDirection,
//                       payload: { direction: "descending", field: headerValue },
//                     });
//                   }}
//                 />
//               </Group>
//             </Tooltip>
//           );

//           const headerValueWithSortIcons = (
//             <Group maw={300} miw={50}>
//               {ascendingIconWithTooltip}
//               {headerValue}
//               {descendingIconWithTooltip}
//             </Group>
//           );

//           return <th key={index}>{headerValueWithSortIcons}</th>;
//         })}
//       </tr>
//     </thead>
//   );

//   const tableBody = resourceData.map((document, docIndex) => {
//     const tableRow = Object.entries(document).map(([key, value], keyIndex) => {
//       const { slicedValue, unSlicedValue } = formatDocumentValue(key, value);

//       const button = (
//         <UnstyledButton
//           maw={300}
//           miw={50}
//           onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
//             console.log(`Button clicked: ${event.currentTarget}`);

//             if (UNMODIFIABLE_FIELDS_SET.has(key)) {
//               return;
//             }

//             resourceDispatch({
//               action: resourceAction.setSelectedDocument,
//               payload: document,
//             });
//             resourceDispatch({ action: resourceAction.setSelectedField, payload: key });
//             openDocumentEditModal();
//           }}
//           style={{ cursor: UNMODIFIABLE_FIELDS_SET.has(key) ? "not-allowed" : "pointer" }}
//         >
//           {slicedValue}
//         </UnstyledButton>
//       );

//       const buttonWithHoverCard = (
//         <HoverCard closeDelay={50} openDelay={250} shadow="lg" width={500} withArrow>
//           <HoverCard.Target>{button}</HoverCard.Target>

//           <HoverCard.Dropdown>
//             <Text>{unSlicedValue}</Text>
//           </HoverCard.Dropdown>
//         </HoverCard>
//       );

//       return (
//         <td key={`${docIndex}-${document._id}-${keyIndex}-${key}-${slicedValue}`}>
//           {buttonWithHoverCard}
//         </td>
//       );
//     });

//     return (
//       <tbody key={`${docIndex}`} style={{ outline: "1px solid green" }}>
//         <tr style={{ outline: "1px solid violet" }}>{tableRow}</tr>
//       </tbody>
//     );
//   });

//   return (
//     <Stack>
//       <Table striped highlightOnHover>
//         {tableHeader}
//         {tableBody}
//       </Table>
//     </Stack>
//   );
// }

// export { Desktop };

export type {};
