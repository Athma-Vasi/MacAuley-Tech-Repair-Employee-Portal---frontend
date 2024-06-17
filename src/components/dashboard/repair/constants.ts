import { RepairMetricCategory } from "./types";

const REPAIR_METRICS_SUB_CATEGORY_DATA = [
  { label: "Revenue", value: "revenue" },
  { label: "Units Repaired", value: "unitsRepaired" },
];

const REPAIR_METRICS_DATA: RepairMetricCategory[] = [
  "Accessory",
  "All Repairs",
  "Audio/Video",
  "Computer Component",
  "Electronic Device",
  "Mobile Device",
  "Peripheral",
];

export { REPAIR_METRICS_DATA, REPAIR_METRICS_SUB_CATEGORY_DATA };
