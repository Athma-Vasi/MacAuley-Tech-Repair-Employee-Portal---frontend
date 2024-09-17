import ErrorSuspenseHOC from "../../../error/ErrorSuspenseHOC";
import DisplayAnnouncements from "./DisplayAnnouncements";

function DisplayAnnouncementsWrapper() {
    return ErrorSuspenseHOC(DisplayAnnouncements)({});
}

export default DisplayAnnouncementsWrapper;
