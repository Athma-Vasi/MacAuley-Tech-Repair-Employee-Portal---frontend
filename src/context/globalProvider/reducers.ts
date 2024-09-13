import type { GlobalDispatch, GlobalState } from "./types";

function globalReducer(
    state: GlobalState,
    dispatch: GlobalDispatch,
): GlobalState {
    const reducer = globalReducersMap.get(dispatch.action);
    return reducer ? reducer(state, dispatch) : state;
}

const globalReducersMap = new Map<
    GlobalAction[keyof GlobalAction],
    (state: GlobalState, dispatch: GlobalDispatch) => GlobalState
>([
    [
        globalAction.setAnnouncementDocument,
        globalReducer_setAnnouncementDocument,
    ],
    [globalAction.setColorScheme, globalReducer_setColorScheme],
    [globalAction.setComponents, globalReducer_setComponents],
    [
        globalAction.setCustomizeChartsPageData,
        globalReducer_setCustomizeChartsPageData,
    ],
    [
        globalAction.setCustomizeChartsPageDataSelectedYYYYMMDD,
        globalReducer_setCustomizeChartsPageDataSelectedYYYYMMDD,
    ],
    [globalAction.setDefaultGradient, globalReducer_setDefaultGradient],
    [globalAction.setFontFamily, globalReducer_setFontFamily],
    [globalAction.setHeight, globalReducer_setHeight],
    [
        globalAction.setPrefersReducedMotion,
        globalReducer_setPrefersReducedMotion,
    ],
    [globalAction.setPrimaryColor, globalReducer_setPrimaryColor],
    [globalAction.setPrimaryShade, globalReducer_setPrimaryShade],
    [
        globalAction.setRespectReducedMotion,
        globalReducer_setRespectReducedMotion,
    ],
    [globalAction.setWidth, globalReducer_setWidth],
    [globalAction.setWindowSize, globalReducer_setWindowSize],
]);

function globalReducer_setAnnouncementDocument(
    state: GlobalState,
    dispatch: GlobalDispatch,
): GlobalState {
    return {
        ...state,
        announcementDocument: dispatch.payload,
    };
}

function globalReducer_setColorScheme(
    state: GlobalState,
    dispatch: GlobalDispatch,
): GlobalState {
    const colorScheme = dispatch.payload;
    const { components } = state.themeObject;
    const { Button, Text, Title } = components;

    // set button variant
    const { defaultProps } = Button;
    const newButtonDefaultProps = {
        ...defaultProps,
        variant: colorScheme === "dark" ? "outline" : "light",
    };

    // set text color
    const { defaultProps: textDefaultProps } = Text;
    const newTextDefaultProps = {
        ...textDefaultProps,
        color: colorScheme === "dark" ? "gray.5" : "gray.8",
    };

    // set title color
    const { defaultProps: titleDefaultProps } = Title;
    const newTitleDefaultProps = {
        ...titleDefaultProps,
        color: colorScheme === "dark" ? "dark.1" : "dark.4",
    };

    return {
        ...state,
        themeObject: {
            ...state.themeObject,
            colorScheme,
            components: {
                ...components,
                Button: {
                    ...Button,
                    defaultProps: newButtonDefaultProps,
                },
                Text: {
                    ...Text,
                    defaultProps: newTextDefaultProps,
                },
                Title: {
                    ...Title,
                    defaultProps: newTitleDefaultProps,
                },
            },
        },
    };
}

function globalReducer_setComponents(
    state: GlobalState,
    dispatch: GlobalDispatch,
): GlobalState {
    return {
        ...state,
        themeObject: {
            ...state.themeObject,
            components: dispatch.payload,
        },
    };
}

function globalReducer_setCustomizeChartsPageData(
    state: GlobalState,
    dispatch: GlobalDispatch,
): GlobalState {
    const customizeChartsPageData = dispatch.payload;
    const existingYYYYMMDD = state.customizeChartsPageData?.selectedYYYYMMDD ??
        new Date().toISOString().slice(0, 10);

    let [existingYYYY, existingMM, existingDD] = existingYYYYMMDD.split("-");
    existingMM = existingMM.padStart(2, "0");
    existingDD = existingDD.padStart(2, "0");

    return {
        ...state,
        customizeChartsPageData: {
            ...customizeChartsPageData,
            selectedYYYYMMDD: `${existingYYYY}-${existingMM}-${existingDD}`,
        },
    };
}

function globalReducer_setCustomizeChartsPageDataSelectedYYYYMMDD(
    state: GlobalState,
    dispatch: GlobalDispatch,
): GlobalState {
    const { customizeChartsPageData } = state;
    if (!customizeChartsPageData) return state;

    const clonedCustomizeChartsPageData = structuredClone(
        customizeChartsPageData,
    );
    clonedCustomizeChartsPageData.selectedYYYYMMDD = dispatch.payload;

    return {
        ...state,
        customizeChartsPageData: clonedCustomizeChartsPageData,
    };
}

function globalReducer_setDefaultGradient(
    state: GlobalState,
    dispatch: GlobalDispatch,
): GlobalState {
    return {
        ...state,
        themeObject: {
            ...state.themeObject,
            defaultGradient: dispatch.payload,
        },
    };
}

function globalReducer_setFontFamily(
    state: GlobalState,
    dispatch: GlobalDispatch,
): GlobalState {
    return {
        ...state,
        themeObject: {
            ...state.themeObject,
            fontFamily: dispatch.payload,
        },
    };
}

function globalReducer_setHeight(
    state: GlobalState,
    dispatch: GlobalDispatch,
): GlobalState {
    return {
        ...state,
        height: dispatch.payload,
    };
}

function globalReducer_setPrefersReducedMotion(
    state: GlobalState,
    dispatch: GlobalDispatch,
): GlobalState {
    return {
        ...state,
        isPrefersReducedMotion: dispatch.payload,
    };
}

function globalReducer_setPrimaryColor(
    state: GlobalState,
    dispatch: GlobalDispatch,
): GlobalState {
    return {
        ...state,
        themeObject: {
            ...state.themeObject,
            primaryColor: dispatch.payload,
        },
    };
}

function globalReducer_setPrimaryShade(
    state: GlobalState,
    dispatch: GlobalDispatch,
): GlobalState {
    return {
        ...state,
        themeObject: {
            ...state.themeObject,
            primaryShade: dispatch.payload,
        },
    };
}

function globalReducer_setRespectReducedMotion(
    state: GlobalState,
    dispatch: GlobalDispatch,
): GlobalState {
    return {
        ...state,
        themeObject: {
            ...state.themeObject,
            respectReducedMotion: dispatch.payload,
        },
    };
}

function globalReducer_setWidth(
    state: GlobalState,
    dispatch: GlobalDispatch,
): GlobalState {
    return {
        ...state,
        width: dispatch.payload,
    };
}

function globalReducer_setWindowSize(
    state: GlobalState,
    dispatch: GlobalDispatch,
): GlobalState {
    const { width, height } = dispatch.payload;
    return {
        ...state,
        width,
        height,
    };
}

export { globalReducer };
