import { Flex, Rating, rem, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import {
  TbMoodAnnoyed2,
  TbMoodCry,
  TbMoodSmileBeam,
  TbNumber0,
  TbNumber1,
  TbNumber2,
  TbNumber3,
  TbNumber4,
  TbNumber5,
  TbStar,
  TbStarFilled,
} from "react-icons/tb";
import { TbMoodHappy } from "react-icons/tb";
import { TbMoodCrazyHappy } from "react-icons/tb";
import { TbMoodEmpty } from "react-icons/tb";

import { COLORS_SWATCHES } from "../../constants/data";
import { useGlobalState } from "../../hooks";
import { returnThemeColors } from "../../utils";
import { SurveySubmissionPayload } from "../survey/display/types";

type CustomRatingProps = {
  key?: string;
  question: string;
  ratingKind: "emotion" | "stars" | "scale";
  setRatingDispatch?: React.Dispatch<{
    type: "setRating";
    payload: number;
  }>;
  /** components that are created dynamically need to pass in unique identifier props to the component
   * for parent component to identify which component, or part of component among components, is being updated
   */
  dynamicComponentProps?: {
    //a generic set up to be used with any dynamic component
    genericProps?: Record<string, any>;
    genericDispatch?: React.Dispatch<{
      type: "setGenericProps";
      payload: any;
    }>;
    // currently only used for survey response dispatch
    responsePayload?: SurveySubmissionPayload;
    setResponseDispatch?: React.Dispatch<{
      type: "setSurveySubmissions";
      payload: SurveySubmissionPayload;
    }>;
  };
  controlledValue?: number;
};

function CustomRating({
  controlledValue,
  question,
  key = question,
  ratingKind,
  setRatingDispatch,
  dynamicComponentProps,
}: CustomRatingProps): React.JSX.Element {
  const {
    globalState: { themeObject, rowGap },
  } = useGlobalState();

  const {
    generalColors: {
      grayColorShade,
      greenColorShade,
      redColorShade,
      blueColorShade,
      yellowColorShade,
      orangeColorShade,
    },
  } = returnThemeColors({
    colorsSwatches: COLORS_SWATCHES,
    themeObject,
  });

  const [value, setValue] = useState<number>(controlledValue ?? 0);

  useEffect(() => {
    if (dynamicComponentProps) {
      if (
        dynamicComponentProps.setResponseDispatch &&
        dynamicComponentProps.responsePayload
      ) {
        const {
          setResponseDispatch,
          responsePayload: { surveyId, surveyTitle, surveyResponse },
        } = dynamicComponentProps;

        setResponseDispatch({
          type: "setSurveySubmissions",
          payload: {
            surveyId: surveyId,
            surveyTitle: surveyTitle,
            surveyResponse: {
              ...surveyResponse,
              response: value,
            },
          },
        });
      }

      if (dynamicComponentProps.genericDispatch && dynamicComponentProps.genericProps) {
        const { genericDispatch, genericProps } = dynamicComponentProps;
        genericDispatch({
          type: "setGenericProps",
          payload: {
            ...genericProps,
            rating: value,
          },
        });
      }
    }

    if (setRatingDispatch) {
      setRatingDispatch({
        type: "setRating",
        payload: value,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  function getEmptyIcon(value: number): React.JSX.Element {
    const defaultProps = { size: rem(24), color: "gray" };
    if (ratingKind === "stars") {
      return <TbStar {...defaultProps} />;
    }

    switch (value) {
      case 1:
        return ratingKind === "emotion" ? (
          <TbMoodCry {...defaultProps} />
        ) : (
          <TbNumber1 {...defaultProps} />
        );
      case 2:
        return ratingKind === "emotion" ? (
          <TbMoodAnnoyed2 {...defaultProps} />
        ) : (
          <TbNumber2 {...defaultProps} />
        );
      case 3:
        return ratingKind === "emotion" ? (
          <TbMoodSmileBeam {...defaultProps} />
        ) : (
          <TbNumber3 {...defaultProps} />
        );
      case 4:
        return ratingKind === "emotion" ? (
          <TbMoodHappy {...defaultProps} />
        ) : (
          <TbNumber4 {...defaultProps} />
        );
      case 5:
        return ratingKind === "emotion" ? (
          <TbMoodCrazyHappy {...defaultProps} />
        ) : (
          <TbNumber5 {...defaultProps} />
        );
      default:
        return <TbMoodEmpty {...defaultProps} />;
    }
  }

  function getFullIcon(value: number): React.JSX.Element {
    const defaultProps = { size: rem(24) };

    if (ratingKind === "stars") {
      return <TbStarFilled {...defaultProps} color={yellowColorShade} />;
    }

    switch (value) {
      case 1:
        return ratingKind === "emotion" ? (
          <TbMoodCry {...defaultProps} color={redColorShade} />
        ) : (
          <TbNumber1 {...defaultProps} color={redColorShade} />
        );
      case 2:
        return ratingKind === "emotion" ? (
          <TbMoodAnnoyed2 {...defaultProps} color={orangeColorShade} />
        ) : (
          <TbNumber2 {...defaultProps} color={orangeColorShade} />
        );
      case 3:
        return ratingKind === "emotion" ? (
          <TbMoodSmileBeam {...defaultProps} color={yellowColorShade} />
        ) : (
          <TbNumber3 {...defaultProps} color={yellowColorShade} />
        );
      case 4:
        return ratingKind === "emotion" ? (
          <TbMoodHappy {...defaultProps} color={greenColorShade} />
        ) : (
          <TbNumber4 {...defaultProps} color={greenColorShade} />
        );
      case 5:
        return ratingKind === "emotion" ? (
          <TbMoodCrazyHappy {...defaultProps} color={blueColorShade} />
        ) : (
          <TbNumber5 {...defaultProps} color={blueColorShade} />
        );
      default:
        return ratingKind === "emotion" ? (
          <TbMoodEmpty {...defaultProps} color={grayColorShade} />
        ) : (
          <TbNumber0 {...defaultProps} color={grayColorShade} />
        );
    }
  }

  return (
    <Flex
      rowGap={rowGap}
      columnGap={rowGap}
      align="center"
      justify="space-between"
      wrap="wrap"
    >
      <Text>{question}</Text>
      <Rating
        key={key}
        value={value}
        onChange={(value) => setValue(value)}
        emptySymbol={getEmptyIcon}
        fullSymbol={getFullIcon}
        highlightSelectedOnly
      />
    </Flex>
  );
}

export { CustomRating };
