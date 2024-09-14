import type { PartsNeeded } from "./types";

const REQUIRED_REPAIRS_CHECKBOX_DATA = [
  {
    label: "Cleaning",
    value: "Cleaning",
  },
  {
    label: "Component replacement",
    value: "Component replacement",
  },
  {
    label: "Soldering",
    value: "Soldering",
  },
  {
    label: "Testing",
    value: "Testing",
  },
  {
    label: "Calibration",
    value: "Calibration",
  },
  {
    label: "Software update",
    value: "Software update",
  },
  {
    label: "Diagnostic evaluation",
    value: "Diagnostic evaluation",
  },
  {
    label: "Internal inspection",
    value: "Internal inspection",
  },
  {
    label: "External housing",
    value: "External housing",
  },
  {
    label: "Data recovery",
    value: "Data recovery",
  },
  {
    label: "Other",
    value: "Other",
  },
];

const PARTS_NEEDED_CHECKBOX_DATA: {
  label: PartsNeeded;
  value: PartsNeeded;
}[] = [
  {
    label: "CPU",
    value: "CPU",
  },
  {
    label: "GPU",
    value: "GPU",
  },
  {
    label: "Motherboard",
    value: "Motherboard",
  },
  {
    label: "RAM",
    value: "RAM",
  },
  {
    label: "Storage",
    value: "Storage",
  },
  {
    label: "PSU",
    value: "PSU",
  },
  {
    label: "Cooling",
    value: "Cooling",
  },
  {
    label: "Connectors",
    value: "Connectors",
  },
  {
    label: "Software",
    value: "Software",
  },
  {
    label: "Screen",
    value: "Screen",
  },
  {
    label: "Keyboard",
    value: "Keyboard",
  },
  {
    label: "Mouse",
    value: "Mouse",
  },
  {
    label: "Speaker",
    value: "Speaker",
  },
  {
    label: "Battery",
    value: "Battery",
  },
  {
    label: "Other",
    value: "Other",
  },
];

const REPAIR_STATUS_DATA = [
  "In progress",
  "Waiting for parts",
  "Awaiting approval",
  "Completed",
  "Cancelled",
];

export {
  PARTS_NEEDED_CHECKBOX_DATA,
  REPAIR_STATUS_DATA,
  REQUIRED_REPAIRS_CHECKBOX_DATA,
};
