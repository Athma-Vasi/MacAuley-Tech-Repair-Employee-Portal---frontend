import type { RoleResourceRoutePaths, StepperPage } from "../../types";
import ErrorSuspenseHOC from "../error/ErrorSuspenseHOC";
import Resource from "./Resource";

function ResourceWrapper(
    { resourceName, responseDocs, roleResourceRoutePaths, stepperPages }: {
        resourceName: string;
        responseDocs: Array<Record<string, unknown>>;
        roleResourceRoutePaths: RoleResourceRoutePaths;
        stepperPages: Array<StepperPage>;
    },
) {
    return ErrorSuspenseHOC(Resource)({
        resourceName,
        responseDocs,
        roleResourceRoutePaths,
        stepperPages,
    });
}

export default ResourceWrapper;
