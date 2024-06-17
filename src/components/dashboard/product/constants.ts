import { ProductMetricCategory } from "./types";

const PRODUCT_METRICS_SUB_CATEGORY_DATA = [
  { label: "Revenue", value: "revenue" },
  { label: "Units Sold", value: "unitsSold" },
];

const PRODUCT_METRICS_BAR_LINE_Y_AXIS_DATA = [
  { label: "Total", value: "total" },
  { label: "Overview", value: "overview" },
  { label: "Online", value: "online" },
  { label: "In Store", value: "inStore" },
];

const PRODUCT_METRIC_CATEGORY_DATA: ProductMetricCategory[] = [
  "All Products",
  "Accessory",
  "Central Processing Unit (CPU)",
  "Computer Case",
  "Display",
  "Graphics Processing Unit (GPU)",
  "Headphone",
  "Keyboard",
  "Memory (RAM)",
  "Microphone",
  "Motherboard",
  "Mouse",
  "Power Supply Unit (PSU)",
  "Speaker",
  "Storage",
  "Webcam",
];

export {
  PRODUCT_METRIC_CATEGORY_DATA,
  PRODUCT_METRICS_BAR_LINE_Y_AXIS_DATA,
  PRODUCT_METRICS_SUB_CATEGORY_DATA,
};
