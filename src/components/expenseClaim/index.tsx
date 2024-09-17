import ErrorSuspenseHOC from "../error/ErrorSuspenseHOC";
import DisplayExpenseClaims from "./DisplayExpenseClaims";

function DisplayExpenseClaimsWrapper() {
    return ErrorSuspenseHOC(DisplayExpenseClaims)({});
}

export default DisplayExpenseClaimsWrapper;
