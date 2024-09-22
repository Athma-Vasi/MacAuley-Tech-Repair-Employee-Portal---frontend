import { createStyles, type CSSObject, type MantineTheme } from "@mantine/core";
import { INPUT_MAX_WIDTH, INPUT_MIN_WIDTH } from "../../constants/data";
import { useGlobalState } from "../../hooks";

interface Variations {
    variant?: string;
    size: string | number;
}

const useStyles = createStyles((
    theme: MantineTheme,
    params?: any,
    variations?: Variations,
) => {
    const { globalState: { themeObject } } = useGlobalState();
    const { primaryColor } = themeObject;

    const styleObject: Record<string, CSSObject> = {
        wrapper: {
            backgroundColor: theme.colorScheme === "dark"
                ? theme.colors.dark[7]
                : theme.colors.gray[0],
            // borderRadius: theme.radius.sm,
            // border: `1px solid ${
            //     theme.colorScheme === "dark"
            //         ? theme.colors.dark[9]
            //         : theme.colors.gray[3]
            // }`,
            boxShadow: theme.shadows.sm,
            color: theme.colorScheme === "dark"
                ? theme.colors.dark[0]
                : theme.colors.gray[9],

            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",

            fontFamily: theme.fontFamily,
            fontSize: theme.fontSizes.lg,
            // height: "100vh",
            lineHeight: theme.lineHeight,
            // margin: "0 auto",
            padding: theme.spacing.xl,
            maxWidth: INPUT_MAX_WIDTH,
            minWidth: INPUT_MIN_WIDTH,

            "&:hover": {
                backgroundColor: theme.colorScheme === "dark"
                    ? theme.colors.dark[8]
                    : theme.colors.gray[1],
            },
        },

        container: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            width: "100%",
        },
    };

    return styleObject;
});

export { useStyles };
