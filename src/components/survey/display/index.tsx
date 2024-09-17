import ErrorSuspenseHOC from "../../error/ErrorSuspenseHOC";
import DisplaySurveys from "./DisplaySurveys";

function DisplaySurveysWrapper() {
    return ErrorSuspenseHOC(DisplaySurveys)({});
}

export default DisplaySurveysWrapper;
