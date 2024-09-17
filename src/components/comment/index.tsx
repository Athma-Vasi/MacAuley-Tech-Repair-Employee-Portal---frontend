import ErrorSuspenseHOC from "../error/ErrorSuspenseHOC";
import DisplayComment from "./DisplayComment";

function CommentWrapper() {
    return ErrorSuspenseHOC(DisplayComment)({});
}

export default CommentWrapper;
