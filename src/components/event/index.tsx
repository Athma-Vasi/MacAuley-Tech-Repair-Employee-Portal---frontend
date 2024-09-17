import ErrorSuspenseHOC from "../error/ErrorSuspenseHOC";
import DisplayEvents from "./DisplayEvents";

function DisplayEventsWrapper() {
    return ErrorSuspenseHOC(DisplayEvents)({});
}

export default DisplayEventsWrapper;
