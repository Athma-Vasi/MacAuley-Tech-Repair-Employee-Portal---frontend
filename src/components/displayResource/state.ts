import type {
  DisplayResourceAction,
  DisplayResourceDispatch,
  DisplayResourceState,
} from "./types";

const displayResourceAction: DisplayResourceAction = {
  setResourceData: "setResourceData",
  updateResourceData: "updateResourceData",
  setPages: "setPages",
  setTotalDocuments: "setTotalDocuments",

  setQueryValuesArray: "setQueryValuesArray",
  setNewQueryFlag: "setNewQueryFlag",
  setQueryBuilderString: "setQueryBuilderString",
  setPageQueryString: "setPageQueryString",
  setLimitPerPage: "setLimitPerPage",
  setResetPage: "setResetPage",

  setFileUploads: "setFileUploads",
  setRequestStatus: "setRequestStatus",

  setDeleteResource: "setDeleteResource",
  setTriggerRefresh: "setTriggerRefresh",
  setTriggerUpdateRequestStatus: "setTriggerUpdateRequestStatus",

  setIsSubmitting: "setIsSubmitting",
  setSubmitMessage: "setSubmitMessage",
  setIsSuccessful: "setIsSuccessful",
  setSuccessMessage: "setSuccessMessage",
  setIsLoading: "setIsLoading",
  setLoadingMessage: "setLoadingMessage",
};

function displayResourceReducer<
  Doc extends Record<string, unknown> = Record<string, unknown>,
>(
  state: DisplayResourceState<Doc>,
  action: DisplayResourceDispatch<Doc>,
): DisplayResourceState<Doc> {
  switch (action.type) {
    case displayResourceAction.setResourceData:
      return {
        ...state,
        resourceData: action.payload,
      };

    case displayResourceAction.updateResourceData: {
      const { id, data, kind } = action.payload;

      switch (kind) {
        case "update": {
          const updatedResourceData = state.resourceData.map((resource) => {
            if (resource._id === id) {
              return {
                ...resource,
                ...data,
              };
            }
            return resource;
          });

          return {
            ...state,
            resourceData: updatedResourceData,
          };
        }
        case "delete": {
          const updatedResourceData = state.resourceData.filter(
            (resource) => resource._id !== id,
          );

          return {
            ...state,
            resourceData: updatedResourceData,
          };
        }
        default:
          return state;
      }
    }

    case displayResourceAction.setPages:
      return {
        ...state,
        pages: action.payload,
      };
    case displayResourceAction.setTotalDocuments:
      return {
        ...state,
        totalDocuments: action.payload,
      };

    case displayResourceAction.setQueryValuesArray: {
      const { kind, value } = action.payload;
      const queryValuesArray = [...state.queryValuesArray];

      switch (kind) {
        case "add": {
          queryValuesArray.push(value);
          return {
            ...state,
            queryValuesArray,
          };
        }
        case "remove": {
          const index = queryValuesArray.indexOf(value);
          if (index > -1) {
            queryValuesArray.splice(index, 1);
          }
          return {
            ...state,
            queryValuesArray,
          };
        }
        case "clear": {
          return {
            ...state,
            queryValuesArray: [],
          };
        }
        default:
          return state;
      }
    }

    case displayResourceAction.setNewQueryFlag:
      return {
        ...state,
        newQueryFlag: action.payload,
      };
    case displayResourceAction.setQueryBuilderString:
      return {
        ...state,
        queryBuilderString: action.payload,
      };
    case displayResourceAction.setPageQueryString:
      return {
        ...state,
        pageQueryString: action.payload,
      };
    case displayResourceAction.setLimitPerPage:
      return {
        ...state,
        limitPerPage: action.payload,
      };
    case displayResourceAction.setResetPage:
      return {
        ...state,
        resetPage: action.payload,
      };

    case displayResourceAction.setFileUploads:
      return {
        ...state,
        fileUploads: action.payload,
      };

    case displayResourceAction.setRequestStatus:
      return {
        ...state,
        requestStatus: action.payload,
      };
    case displayResourceAction.setDeleteResource:
      return {
        ...state,
        deleteResource: action.payload,
      };

    case displayResourceAction.setTriggerRefresh:
      return {
        ...state,
        triggerRefresh: action.payload,
      };
    case displayResourceAction.setTriggerUpdateRequestStatus:
      return {
        ...state,
        triggerUpdateRequestStatus: action.payload,
      };

    case displayResourceAction.setIsSubmitting:
      return {
        ...state,
        isSubmitting: action.payload,
      };
    case displayResourceAction.setSubmitMessage:
      return {
        ...state,
        submitMessage: action.payload,
      };
    case displayResourceAction.setIsSuccessful:
      return {
        ...state,
        isSuccessful: action.payload,
      };
    case displayResourceAction.setSuccessMessage:
      return {
        ...state,
        successMessage: action.payload,
      };
    case displayResourceAction.setIsLoading:
      return {
        ...state,
        isLoading: action.payload,
      };
    case displayResourceAction.setLoadingMessage:
      return {
        ...state,
        loadingMessage: action.payload,
      };
    default:
      return state;
  }
}

export { displayResourceAction, displayResourceReducer };
