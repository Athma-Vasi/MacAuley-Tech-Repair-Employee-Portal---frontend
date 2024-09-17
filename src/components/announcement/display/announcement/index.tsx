import ErrorSuspenseHOC from "../../../error/ErrorSuspenseHOC";
import DisplayAnnouncement from "./DisplayAnnouncement";

function DisplayAnnouncementWrapper() {
    return ErrorSuspenseHOC(DisplayAnnouncement)({});
}

export default DisplayAnnouncementWrapper;
