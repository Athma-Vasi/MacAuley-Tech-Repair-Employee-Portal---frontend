import type { ResourceRoutePaths } from "../../types";

// const COMMENT_QUERY_DATA = [
//   {
//     label: "Username",
//     value: "username",
//     inputKind: "textInput",
//     regex: USERNAME_REGEX,
//     regexValidationFn: returnUsernameRegexValidationText,
//   },
//   {
//     label: "First Name",
//     value: "firstName",
//     inputKind: "textInput",
//     regex: FULL_NAME_REGEX,
//     regexValidationFn: returnNameValidationText,
//   },
//   {
//     label: "Middle Name",
//     value: "middleName",
//     inputKind: "textInput",
//     regex: FULL_NAME_REGEX,
//     regexValidationFn: returnNameValidationText,
//   },
//   {
//     label: "Last Name",
//     value: "lastName",
//     inputKind: "textInput",
//     regex: FULL_NAME_REGEX,
//     regexValidationFn: returnNameValidationText,
//   },

//   {
//     label: "Job Position",
//     value: "jobPosition",
//     inputKind: "selectInput",
//     selectData: JOB_POSITION_DATA,
//   },
//   {
//     label: "Department",
//     value: "department",
//     inputKind: "selectInput",
//     selectData: DEPARTMENT_DATA,
//   },
//   {
//     label: "Profile Picture URL",
//     value: "profilePictureUrl",
//     inputKind: "textInput",
//     regex: URL_REGEX,
//     regexValidationFn: returnUrlValidationText,
//   },
//   {
//     label: "Comment",
//     value: "comment",
//     inputKind: "textInput",
//     regex: GRAMMAR_TEXTAREA_INPUT_REGEX,
//     regexValidationFn: returnGrammarValidationText,
//   },
//   {
//     label: "Quoted Username",
//     value: "quotedUsername",
//     inputKind: "textInput",
//     regex: USERNAME_REGEX,
//     regexValidationFn: returnUsernameRegexValidationText,
//   },
//   {
//     label: "Quoted Comment",
//     value: "quotedComment",
//     inputKind: "textInput",
//     regex: GRAMMAR_TEXTAREA_INPUT_REGEX,
//     regexValidationFn: returnGrammarValidationText,
//   },
//   {
//     label: "Likes Count",
//     value: "likesCount",
//     inputKind: "numberInput",
//     regex: INTEGER_REGEX,
//     regexValidationFn: returnIntegerValidationText,
//   },
//   {
//     label: "Dislikes Count",
//     value: "dislikesCount",
//     inputKind: "numberInput",
//     regex: INTEGER_REGEX,
//     regexValidationFn: returnIntegerValidationText,
//   },
//   {
//     label: "Reports Count",
//     value: "reportsCount",
//     inputKind: "numberInput",
//     regex: INTEGER_REGEX,
//     regexValidationFn: returnIntegerValidationText,
//   },
//   {
//     label: "Featured",
//     value: "isFeatured",
//     inputKind: "booleanInput",
//     booleanData: [true, false],
//   },
//   {
//     label: "Deleted",
//     value: "isDeleted",
//     inputKind: "booleanInput",
//     booleanData: [true, false],
//   },
//   {
//     label: "Created Date",
//     value: "createdAt",
//     inputKind: "dateInput",
//     regex: DATE_FULL_RANGE_REGEX,
//     regexValidationFn: returnDateFullRangeValidationText,
//   },
//   {
//     label: "Updated Date",
//     value: "updatedAt",
//     inputKind: "dateInput",
//     regex: DATE_FULL_RANGE_REGEX,
//     regexValidationFn: returnDateFullRangeValidationText,
//   },
// ];

const COMMENT_RESOURCE_ROUTE_PATHS: ResourceRoutePaths = {
  admin: "comment",
  manager: "comment",
  employee: "comment/user",
};

const COMMENT_LIMIT_PER_PAGE_SELECT_DATA = ["5", "10", "15", "20", "25"];

export { COMMENT_LIMIT_PER_PAGE_SELECT_DATA, COMMENT_RESOURCE_ROUTE_PATHS };
