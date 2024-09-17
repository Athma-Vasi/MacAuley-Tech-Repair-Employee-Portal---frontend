import ErrorSuspenseHOC from "../../error/ErrorSuspenseHOC";
import ExpenseClaim from "./ExpenseClaim";

function CreateExpenseClaimWrapper() {
    return ErrorSuspenseHOC(ExpenseClaim)({});
}

export default CreateExpenseClaimWrapper;
