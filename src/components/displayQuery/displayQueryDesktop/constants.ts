// used to prevent display of sort arrows on groupedBy or id fields
const HEADER_EXCLUSION_SET = new Set([
  "_id",
  "benefit user id",
  "completed surveys",
  "customer id",
  "delete",
  "disliked user ids",
  "edit",
  "file uploads",
  "liked user ids",
  "product reviews ids",
  "purchase document id",
  "purchase history ids",
  "reported user ids",
  "rma history ids",
  "uploaded files ids",
  "user id",
  "view profile",
]);

export { HEADER_EXCLUSION_SET };
