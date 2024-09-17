import ErrorSuspenseHOC from "../../error/ErrorSuspenseHOC";
import Survey from "./Survey";

function CreateSurveyWrapper() {
    return ErrorSuspenseHOC(Survey)({});
}

export default CreateSurveyWrapper;
