import ErrorSuspenseHOC from "../error/ErrorSuspenseHOC";
import PortalLayout from "./PortalLayout";

function PortalLayoutWrapper() {
    return ErrorSuspenseHOC(PortalLayout)({});
}

export default PortalLayoutWrapper;
