import { PROPERTY_DESCRIPTOR } from "../../../constants/data";
import type { Currency, SetPageInErrorPayload, Urgency } from "../../../types";
import type { CustomerDocument } from "../../customer/types";
import type { RepairCategory } from "../../dashboard/types";
import type { PartsNeeded, RequiredRepairs } from "../types";
import {
    type CreateRepairTicketAction,
    createRepairTicketAction,
} from "./actions";
import { initialCreateRepairTicketState } from "./state";
import type {
    CreateRepairTicketDispatch,
    CreateRepairTicketState,
    CustomerSearchOperator,
} from "./types";

function createRepairTicketReducer(
    state: CreateRepairTicketState,
    dispatch: CreateRepairTicketDispatch,
): CreateRepairTicketState {
    const reducer = createRepairTicketReducersMap.get(dispatch.action);
    return reducer ? reducer(state, dispatch) : state;
}

const createRepairTicketReducersMap = new Map<
    CreateRepairTicketAction[keyof CreateRepairTicketAction],
    (
        state: CreateRepairTicketState,
        dispatch: CreateRepairTicketDispatch,
    ) => CreateRepairTicketState
>([
    [
        createRepairTicketAction.setClearSearchInputs,
        createRepairTicketReducer_setClearSearchInputs,
    ],
    [
        createRepairTicketAction.setCurrentSearchObject,
        createRepairTicketReducer_setCurrentSearchObject,
    ],
    [
        createRepairTicketAction.setCurrentSearchResultPage,
        createRepairTicketReducer_setCurrentSearchResultPage,
    ],
    [
        createRepairTicketAction.setCustomerId,
        createRepairTicketReducer_setCustomerId,
    ],
    [
        createRepairTicketAction.setCustomerSearchResults,
        createRepairTicketReducer_setCustomerSearchResults,
    ],
    [
        createRepairTicketAction.setDeleteSearchObjectField,
        createRepairTicketReducer_setDeleteSearchObjectField,
    ],
    [
        createRepairTicketAction.setSearchOperator,
        createRepairTicketReducer_setSearchOperator,
    ],
    [
        createRepairTicketAction.setSelectedCustomer,
        createRepairTicketReducer_setSelectedCustomer,
    ],
    [
        createRepairTicketAction.setPartName,
        createRepairTicketReducer_setPartName,
    ],
    [
        createRepairTicketAction.setPartSerialId,
        createRepairTicketReducer_setPartSerialId,
    ],
    [
        createRepairTicketAction.setDateReceived,
        createRepairTicketReducer_setDateReceived,
    ],
    [
        createRepairTicketAction.setDescriptionOfIssue,
        createRepairTicketReducer_setDescriptionOfIssue,
    ],
    [
        createRepairTicketAction.setInitialInspectionNotes,
        createRepairTicketReducer_setInitialInspectionNotes,
    ],
    [
        createRepairTicketAction.setRepairCategory,
        createRepairTicketReducer_setRepairCategory,
    ],
    [
        createRepairTicketAction.setRequiredRepairs,
        createRepairTicketReducer_setRequiredRepairs,
    ],
    [
        createRepairTicketAction.setPartsNeeded,
        createRepairTicketReducer_setPartsNeeded,
    ],
    [
        createRepairTicketAction.setPartsNeededModels,
        createRepairTicketReducer_setPartsNeededModels,
    ],
    [
        createRepairTicketAction.setPartUnderWarranty,
        createRepairTicketReducer_setPartUnderWarranty,
    ],
    [
        createRepairTicketAction.setEstimatedRepairCost,
        createRepairTicketReducer_setEstimatedRepairCost,
    ],
    [
        createRepairTicketAction.setEstimatedRepairCostCurrency,
        createRepairTicketReducer_setEstimatedRepairCostCurrency,
    ],
    [
        createRepairTicketAction.setEstimatedCompletionDate,
        createRepairTicketReducer_setEstimatedCompletionDate,
    ],
    [
        createRepairTicketAction.setRepairPriority,
        createRepairTicketReducer_setRepairPriority,
    ],
    [
        createRepairTicketAction.setTriggerFormSubmit,
        createRepairTicketReducer_setTriggerFormSubmit,
    ],
    [
        createRepairTicketAction.setPageInError,
        createRepairTicketReducer_setPageInError,
    ],
    [
        createRepairTicketAction.setIsSubmitting,
        createRepairTicketReducer_setIsSubmitting,
    ],
    [
        createRepairTicketAction.setIsSuccessful,
        createRepairTicketReducer_setIsSuccessful,
    ],
]);

function createRepairTicketReducer_setClearSearchInputs(
    _state: CreateRepairTicketState,
    _dispatch: CreateRepairTicketDispatch,
): CreateRepairTicketState {
    return initialCreateRepairTicketState;
}

function createRepairTicketReducer_setCurrentSearchObject(
    state: CreateRepairTicketState,
    dispatch: CreateRepairTicketDispatch,
): CreateRepairTicketState {
    const searchObj = dispatch.payload as Record<string, unknown>;
    return (
        Object.entries(searchObj).reduce<CreateRepairTicketState>(
            (acc, [key, value]) => {
                Object.defineProperty(acc.currentSearchObject, key, {
                    value,
                    ...PROPERTY_DESCRIPTOR,
                });

                return acc;
            },
            structuredClone(state),
        ) ?? state
    );
}

function createRepairTicketReducer_setCurrentSearchResultPage(
    state: CreateRepairTicketState,
    dispatch: CreateRepairTicketDispatch,
): CreateRepairTicketState {
    return {
        ...state,
        currentSearchResultPage: dispatch.payload as number,
    };
}

function createRepairTicketReducer_setCustomerId(
    state: CreateRepairTicketState,
    dispatch: CreateRepairTicketDispatch,
): CreateRepairTicketState {
    return {
        ...state,
        customerId: dispatch.payload as string,
    };
}

function createRepairTicketReducer_setCustomerSearchResults(
    state: CreateRepairTicketState,
    dispatch: CreateRepairTicketDispatch,
): CreateRepairTicketState {
    return {
        ...state,
        customerSearchResults: dispatch.payload as Omit<
            CustomerDocument,
            "password" | "paymentInformation"
        >[],
    };
}

function createRepairTicketReducer_setDeleteSearchObjectField(
    state: CreateRepairTicketState,
    dispatch: CreateRepairTicketDispatch,
): CreateRepairTicketState {
    return {
        ...state,
        deleteSearchObjectField: dispatch.payload as string,
    };
}

function createRepairTicketReducer_setSearchOperator(
    state: CreateRepairTicketState,
    dispatch: CreateRepairTicketDispatch,
): CreateRepairTicketState {
    return {
        ...state,
        searchOperator: dispatch.payload as CustomerSearchOperator,
    };
}

function createRepairTicketReducer_setSelectedCustomer(
    state: CreateRepairTicketState,
    dispatch: CreateRepairTicketDispatch,
): CreateRepairTicketState {
    return {
        ...state,
        selectedCustomer: dispatch.payload as CustomerDocument | null,
    };
}

function createRepairTicketReducer_setPartName(
    state: CreateRepairTicketState,
    dispatch: CreateRepairTicketDispatch,
): CreateRepairTicketState {
    return {
        ...state,
        partName: dispatch.payload as string,
    };
}

function createRepairTicketReducer_setPartSerialId(
    state: CreateRepairTicketState,
    dispatch: CreateRepairTicketDispatch,
): CreateRepairTicketState {
    return {
        ...state,
        partSerialId: dispatch.payload as string,
    };
}

function createRepairTicketReducer_setDateReceived(
    state: CreateRepairTicketState,
    dispatch: CreateRepairTicketDispatch,
): CreateRepairTicketState {
    return {
        ...state,
        dateReceived: dispatch.payload as string,
    };
}

function createRepairTicketReducer_setDescriptionOfIssue(
    state: CreateRepairTicketState,
    dispatch: CreateRepairTicketDispatch,
): CreateRepairTicketState {
    return {
        ...state,
        descriptionOfIssue: dispatch.payload as string,
    };
}

function createRepairTicketReducer_setInitialInspectionNotes(
    state: CreateRepairTicketState,
    dispatch: CreateRepairTicketDispatch,
): CreateRepairTicketState {
    return {
        ...state,
        initialInspectionNotes: dispatch.payload as string,
    };
}

function createRepairTicketReducer_setRepairCategory(
    state: CreateRepairTicketState,
    dispatch: CreateRepairTicketDispatch,
): CreateRepairTicketState {
    return {
        ...state,
        repairCategory: dispatch.payload as RepairCategory,
    };
}

function createRepairTicketReducer_setRequiredRepairs(
    state: CreateRepairTicketState,
    dispatch: CreateRepairTicketDispatch,
): CreateRepairTicketState {
    return {
        ...state,
        requiredRepairs: dispatch.payload as RequiredRepairs[],
    };
}

function createRepairTicketReducer_setPartsNeeded(
    state: CreateRepairTicketState,
    dispatch: CreateRepairTicketDispatch,
): CreateRepairTicketState {
    return {
        ...state,
        partsNeeded: dispatch.payload as PartsNeeded[],
    };
}

function createRepairTicketReducer_setPartsNeededModels(
    state: CreateRepairTicketState,
    dispatch: CreateRepairTicketDispatch,
): CreateRepairTicketState {
    return {
        ...state,
        partsNeededModels: dispatch.payload as string,
    };
}

function createRepairTicketReducer_setPartUnderWarranty(
    state: CreateRepairTicketState,
    dispatch: CreateRepairTicketDispatch,
): CreateRepairTicketState {
    return {
        ...state,
        partUnderWarranty: dispatch.payload as boolean,
    };
}

function createRepairTicketReducer_setEstimatedRepairCost(
    state: CreateRepairTicketState,
    dispatch: CreateRepairTicketDispatch,
): CreateRepairTicketState {
    return {
        ...state,
        estimatedRepairCost: dispatch.payload as string,
    };
}

function createRepairTicketReducer_setEstimatedRepairCostCurrency(
    state: CreateRepairTicketState,
    dispatch: CreateRepairTicketDispatch,
): CreateRepairTicketState {
    return {
        ...state,
        estimatedRepairCostCurrency: dispatch.payload as Currency,
    };
}

function createRepairTicketReducer_setEstimatedCompletionDate(
    state: CreateRepairTicketState,
    dispatch: CreateRepairTicketDispatch,
): CreateRepairTicketState {
    return {
        ...state,
        estimatedCompletionDate: dispatch.payload as string,
    };
}

function createRepairTicketReducer_setRepairPriority(
    state: CreateRepairTicketState,
    dispatch: CreateRepairTicketDispatch,
): CreateRepairTicketState {
    return {
        ...state,
        repairPriority: dispatch.payload as Urgency,
    };
}

function createRepairTicketReducer_setTriggerFormSubmit(
    state: CreateRepairTicketState,
    dispatch: CreateRepairTicketDispatch,
): CreateRepairTicketState {
    return {
        ...state,
        triggerFormSubmit: dispatch.payload as boolean,
    };
}

function createRepairTicketReducer_setPageInError(
    state: CreateRepairTicketState,
    dispatch: CreateRepairTicketDispatch,
): CreateRepairTicketState {
    const { kind, page } = dispatch.payload as SetPageInErrorPayload;
    const pagesInError = new Set(state.pagesInError);
    kind === "add" ? pagesInError.add(page) : pagesInError.delete(page);

    return {
        ...state,
        pagesInError,
    };
}

function createRepairTicketReducer_setIsSubmitting(
    state: CreateRepairTicketState,
    dispatch: CreateRepairTicketDispatch,
): CreateRepairTicketState {
    return {
        ...state,
        isSubmitting: dispatch.payload as boolean,
    };
}

function createRepairTicketReducer_setIsSuccessful(
    state: CreateRepairTicketState,
    dispatch: CreateRepairTicketDispatch,
): CreateRepairTicketState {
    return {
        ...state,
        isSuccessful: dispatch.payload as boolean,
    };
}

export { createRepairTicketReducer };