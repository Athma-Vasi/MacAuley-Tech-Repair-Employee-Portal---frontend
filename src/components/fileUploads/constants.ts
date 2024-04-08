import {
  ALLOWED_FILE_ENCODINGS,
  ALLOWED_FILE_EXTENSIONS,
  ALLOWED_FILE_MIME_TYPES,
} from "../../constants/data";
import {
  DATE_FULL_RANGE_REGEX,
  FILE_NAME_REGEX,
  FILE_SIZE_REGEX,
  USERNAME_REGEX,
} from "../../constants/regex";
import { ResourceRoutePaths } from "../../types";
import {
  returnDateFullRangeValidationText,
  returnFileSizeValidationText,
  returnFilenameValidationText,
  returnUsernameRegexValidationText,
} from "../../utils";
import { ComponentQueryData } from "../queryBuilder";

const FILE_UPLOADS_QUERY_DATA: ComponentQueryData[] = [
  {
    label: "Username",
    value: "username",
    inputKind: "textInput",
    regex: USERNAME_REGEX,
    regexValidationFn: returnUsernameRegexValidationText,
  },
  {
    label: "Created Date",
    value: "createdAt",
    inputKind: "dateInput",
    regex: DATE_FULL_RANGE_REGEX,
    regexValidationFn: returnDateFullRangeValidationText,
  },
  {
    label: "Updated Date",
    value: "updatedAt",
    inputKind: "dateInput",
    regex: DATE_FULL_RANGE_REGEX,
    regexValidationFn: returnDateFullRangeValidationText,
  },
  {
    label: "File Name",
    value: "fileName",
    inputKind: "textInput",
    regex: FILE_NAME_REGEX,
    regexValidationFn: returnFilenameValidationText,
  },
  {
    label: "File Extension",
    value: "fileExtension",
    inputKind: "selectInput",
    selectData: ALLOWED_FILE_EXTENSIONS,
  },
  {
    label: "File Size",
    value: "fileSize",
    inputKind: "numberInput",
    regex: FILE_SIZE_REGEX,
    regexValidationFn: returnFileSizeValidationText,
  },
  {
    label: "File Mime Type",
    value: "fileMimeType",
    inputKind: "selectInput",
    selectData: ALLOWED_FILE_MIME_TYPES,
  },
  {
    label: "File Encoding",
    value: "fileEncoding",
    inputKind: "selectInput",
    selectData: ALLOWED_FILE_ENCODINGS,
  },
];

const FILE_UPLOADS_RESOURCE_ROUTE_PATHS: ResourceRoutePaths = {
  admin: "file-upload",
  manager: "file-upload",
  employee: "file-upload",
};

export { FILE_UPLOADS_QUERY_DATA, FILE_UPLOADS_RESOURCE_ROUTE_PATHS };
