// import React from "react";
// import { QueryResponseData } from "../../types";
// import { AccessibleSelectInput } from "../accessibleInputs/AccessibleSelectInput";
// import { queryAction } from "../query/actions";
// import { ResourceAction, resourceAction } from "./actions";
// import { ResourceDispatch } from "./types";
// import {
//   Box,
//   Card,
//   Group,
//   NativeSelect,
//   Stack,
//   Text,
//   UnstyledButton,
// } from "@mantine/core";
// import { SortDirection } from "../query/types";
// import { splitCamelCase } from "../../utils";
// import { SORT_DIRECTION_DATA } from "../query/constants";
// import { GoldenGrid } from "../accessibleInputs/GoldenGrid";
// import { formatDocumentValue } from "./utils";
// import { UNMODIFIABLE_FIELDS_SET } from "./constants";
// import { TbDisabled, TbEdit, TbEditOff } from "react-icons/tb";

// type MobileProps = {
//   resourceData: Array<Record<string, unknown>>;
//   resourceDispatch: React.Dispatch<ResourceDispatch>;
//   sortDirection: SortDirection;
//   sortField: string;
// };

// function Mobile({
//   openDocumentEditModal,
//   resourceData,
//   resourceDispatch,
//   sortDirection,
//   sortField,
// }: MobileProps) {
//   const sortFieldSelectInput = (
//     <AccessibleSelectInput
//       attributes={{
//         data: resourceData.length > 0
//           ? Object.keys(resourceData[0]).map((field) => ({
//             label: splitCamelCase(field),
//             value: field,
//           }))
//           : [],
//         name: "sortField",
//         parentDispatch: resourceDispatch,
//         validValueAction: resourceAction.setSortField,
//         value: sortField,
//       }}
//     />
//   );

//   const sortDirectionSelectInput = (
//     <AccessibleSelectInput
//       attributes={{
//         data: SORT_DIRECTION_DATA,
//         name: "sortDirection",
//         parentDispatch: resourceDispatch,
//         validValueAction: resourceAction.setSortDirection,
//         value: sortDirection,
//       }}
//     />
//   );

//   const cards = resourceData.map((document, docIndex) => {
//     const card = (
//       <Card
//         key={`${docIndex}-${document._id}`}
//         shadow="sm"
//         radius="md"
//         withBorder
//       >
//         {Object.entries(document).map(([key, value], keyIndex) => {
//           const { slicedValue, unSlicedValue } = formatDocumentValue(
//             key,
//             value,
//           );

//           return (
//             <Stack
//               key={`${docIndex}-${document._id}-${keyIndex}-${key}-${slicedValue}`}
//               maw={350}
//               miw={50}
//               style={{ outline: "1px solid violet" }}
//             >
//               <UnstyledButton
//                 onClick={(
//                   event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
//                 ) => {
//                   console.log(`Button clicked: ${event.currentTarget}`);

//                   if (UNMODIFIABLE_FIELDS_SET.has(key)) {
//                     return;
//                   }

//                   resourceDispatch({
//                     action: resourceAction.setSelectedDocument,
//                     payload: document,
//                   });
//                   resourceDispatch({
//                     action: resourceAction.setSelectedField,
//                     payload: key,
//                   });
//                   openDocumentEditModal();
//                 }}
//               >
//                 <GoldenGrid>
//                   <Group>
//                     {UNMODIFIABLE_FIELDS_SET.has(key)
//                       ? <TbEditOff />
//                       : <TbEdit />}
//                     <Text>{splitCamelCase(key)}</Text>
//                   </Group>

//                   <Text>{slicedValue}</Text>
//                 </GoldenGrid>
//               </UnstyledButton>
//             </Stack>
//           );
//         })}
//       </Card>
//     );

//     return card;
//   });

//   return (
//     <Stack>
//       {sortFieldSelectInput}
//       {sortDirectionSelectInput}
//       {cards}
//     </Stack>
//   );
// }

// export { Mobile };

export type {};
