import ErrorSuspenseHOC from "../error/ErrorSuspenseHOC";
import NotFound from "./NotFound";

function NotFoundWrapper() {
    return ErrorSuspenseHOC(NotFound)({});
}

export default NotFoundWrapper;
