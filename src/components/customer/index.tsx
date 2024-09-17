import ErrorSuspenseHOC from "../error/ErrorSuspenseHOC";
import Customer from "./Customer";

function CustomerWrapper() {
    return ErrorSuspenseHOC(Customer)({});
}

export default CustomerWrapper;
