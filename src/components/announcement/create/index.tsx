import ErrorSuspenseHOC from "../../error/ErrorSuspenseHOC";
import Announcement from "./Announcement";

function CreateAnnouncementWrapper() {
    return ErrorSuspenseHOC(Announcement)({});
}

export default CreateAnnouncementWrapper;
