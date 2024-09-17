import ErrorSuspenseHOC from "../../error/ErrorSuspenseHOC";
import Event from "./Event";

function CreateEventWrapper() {
    return ErrorSuspenseHOC(Event)({});
}

export default CreateEventWrapper;
