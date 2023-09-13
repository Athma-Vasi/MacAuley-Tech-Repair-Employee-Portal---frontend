import { PROPERTY_DESCRIPTOR } from '../../../constants/data';
import { Country } from '../../../types';
import {
  PartsNeeded,
  RepairNoteInitialSchema,
  RequiredRepairs,
} from '../types';

type ReturnPartialRepairNoteRequestObjectInput = {
  customerCountry: Country;
  initialRepairNote: RepairNoteInitialSchema;
};
/**
 * @description Pure function. Returns a repair note request object with the correct properties based on the customer's country. Satisfies the repair note schema contract for POST (province / state are undefined if the customer's country is not Canada / United States, respectively)
 */
function returnPartialRepairNoteRequestObject({
  customerCountry,
  initialRepairNote,
}: ReturnPartialRepairNoteRequestObjectInput): Partial<RepairNoteInitialSchema> {
  return Object.entries(initialRepairNote).reduce(
    (repairNoteObjAcc: Partial<RepairNoteInitialSchema>, keyValTuple) => {
      const [key, value] = keyValTuple as [
        keyof RepairNoteInitialSchema,
        string | boolean | RequiredRepairs[] | PartsNeeded[]
      ];

      switch (key) {
        case 'customerProvince': {
          if (customerCountry === 'Canada') {
            // to avoid error TS2322, property is defined instead of assigned
            Object.defineProperty(repairNoteObjAcc, 'customerProvince', {
              ...PROPERTY_DESCRIPTOR,
              value,
            });
          }
          break;
        }
        case 'customerState': {
          if (customerCountry === 'United States') {
            Object.defineProperty(repairNoteObjAcc, 'customerState', {
              ...PROPERTY_DESCRIPTOR,
              value,
            });
          }
          break;
        }
        default: {
          Object.defineProperty(repairNoteObjAcc, key, {
            ...PROPERTY_DESCRIPTOR,
            value,
          });
          break;
        }
      }

      return repairNoteObjAcc;
    },
    Object.create(null)
  );
}

export { returnPartialRepairNoteRequestObject };
