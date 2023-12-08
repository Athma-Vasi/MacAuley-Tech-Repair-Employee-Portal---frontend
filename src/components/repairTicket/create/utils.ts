// import { PROPERTY_DESCRIPTOR } from "../../../constants/data";
// import { Country } from "../../../types";
// import { PartsNeeded, RepairTicketInitialSchema, RequiredRepairs } from "../types";

// type ReturnPartialRepairTicketRequestObjectInput = {
//   customerCountry: Country;
//   initialRepairTicket: RepairTicketInitialSchema;
// };
// /**
//  * @description Pure function. Returns a repair note request object with the correct properties based on the customer's country. Satisfies the repair note schema contract for POST (province / state are undefined if the customer's country is not Canada / United States, respectively)
//  */
// function returnPartialRepairTicketRequestObject({
//   customerCountry,
//   initialRepairTicket,
// }: ReturnPartialRepairTicketRequestObjectInput): Partial<RepairTicketInitialSchema> {
//   return Object.entries(initialRepairTicket).reduce(
//     (repairTicketObjAcc: Partial<RepairTicketInitialSchema>, keyValTuple) => {
//       const [key, value] = keyValTuple as [
//         keyof RepairTicketInitialSchema,
//         string | boolean | RequiredRepairs[] | PartsNeeded[]
//       ];

//       switch (key) {
//         case "customerProvince": {
//           if (customerCountry === "Canada") {
//             // to avoid error TS2322, property is defined instead of assigned
//             Object.defineProperty(repairTicketObjAcc, "customerProvince", {
//               ...PROPERTY_DESCRIPTOR,
//               value,
//             });
//           }
//           break;
//         }
//         case "customerState": {
//           if (customerCountry === "United States") {
//             Object.defineProperty(repairTicketObjAcc, "customerState", {
//               ...PROPERTY_DESCRIPTOR,
//               value,
//             });
//           }
//           break;
//         }
//         default: {
//           Object.defineProperty(repairTicketObjAcc, key, {
//             ...PROPERTY_DESCRIPTOR,
//             value,
//           });
//           break;
//         }
//       }

//       return repairTicketObjAcc;
//     },
//     Object.create(null)
//   );
// }

// export { returnPartialRepairTicketRequestObject };
export {};
