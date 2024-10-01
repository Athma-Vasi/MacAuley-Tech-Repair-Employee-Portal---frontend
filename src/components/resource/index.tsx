import type { RoleResourceRoutePaths, StepperPage } from "../../types";
import ErrorSuspenseHOC from "../error/ErrorSuspenseHOC";
import Resource from "./Resource";

function ResourceWrapper(
    {
        isLoading,
        isSubmitting,
        resourceName,
        responseDocs,
        roleResourceRoutePaths,
        stepperPages,
    }: {
        isLoading: boolean;
        isSubmitting: boolean;
        resourceName: string;
        responseDocs: Array<Record<string, unknown>>;
        roleResourceRoutePaths: RoleResourceRoutePaths;
        stepperPages: Array<StepperPage>;
    },
) {
    return ErrorSuspenseHOC(Resource)({
        isLoading,
        isSubmitting,
        resourceName,
        responseDocs,
        roleResourceRoutePaths,
        stepperPages,
    });
}

export default ResourceWrapper;
