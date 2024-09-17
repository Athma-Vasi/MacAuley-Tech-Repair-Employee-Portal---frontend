import ErrorSuspenseHOC from "../error/ErrorSuspenseHOC";
import Resource from "./Resource";

function ResourceWrapper() {
    return ErrorSuspenseHOC(Resource)({});
}

export default ResourceWrapper;
