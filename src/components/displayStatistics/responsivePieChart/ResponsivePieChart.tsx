import {
  Center,
  ColorInput,
  Flex,
  Grid,
  Group,
  Stack,
  Switch,
  Text,
} from '@mantine/core';
import { ResponsivePie } from '@nivo/pie';
import { ChangeEvent, useEffect, useReducer } from 'react';

import { useGlobalState } from '../../../hooks';
import {
  returnAccessibleSelectedDeselectedTextElements,
  returnAccessibleSelectInputElements,
  returnAccessibleSliderInputElements,
} from '../../../jsxCreators';
import { logState } from '../../../utils';
import {
  AccessibleSelectInputCreatorInfo,
  AccessibleSliderInputCreatorInfo,
  TextWrapper,
} from '../../wrappers';
import { PieChartData } from '../types';
import {
  NIVO_COLOR_SCHEME_DATA,
  NIVO_MOTION_CONFIG_DATA,
  NIVO_TRANSITION_MODE_DATA,
} from './constants';
import {
  initialResponsivePieChartState,
  responsivePieChartAction,
  responsivePieChartReducer,
} from './state';
import {
  FillPatternObject,
  NivoColorScheme,
  NivoMotionConfig,
  NivoTransitionMode,
  ResponsivePieChartProps,
} from './types';
import { PieChartControlsStack } from './utils';

function ResponsivePieChart({ pieChartData }: ResponsivePieChartProps) {
  /** ------------- begin hooks ------------- */
  const [responsivePieChartState, responsivePieChartDispatch] = useReducer(
    responsivePieChartReducer,
    initialResponsivePieChartState
  );
  const {
    startAngle, // -180 - 360 default: 0 step: 1
    endAngle, // -360 - 360 default: 360 step: 1
    innerRadius, // 0 - 1 default: 0 step: 0.05
    padAngle, // 0 - 45 default: 0 step: 1
    cornerRadius, // 0px - 45px default: 0 step: 1
    sortByValue, // default: false

    colorScheme,
    fillPatterns,
    enableFillPatterns, // default: false
    borderColor, // default: #ffffff
    borderWidth, // 0px - 20px default: 0 step: 1

    enableArcLabels, // default: true
    arcLabelsRadiusOffset, // 0 - 2 default: 0.5 step: 0.05
    arcLabelsSkipAngle, // 0 - 45 default: 0 step: 1
    arcLabelsTextColor, // default: #333333

    enableArcLinkLabels, // default: true
    arcLinkLabelsSkipAngle, // 0 - 45 default: 0 step: 1
    arcLinkLabelsOffset, // -24px - 24px default: 0 step: 1
    arcLinkLabelsDiagonalLength, // 0px - 36px default: 16 step: 1
    arcLinkLabelsStraightLength, // 0px - 36px default: 24 step: 1
    arcLinkLabelsTextOffset, // 0px - 36px default: 6 step: 1
    arcLinkLabelsThickness, // 0px - 20px default: 1 step: 1
    arcLinkLabelsTextColor, // default: #333333

    activeInnerRadiusOffset, // 0px - 50px default: 0 step: 1
    activeOuterRadiusOffset, // 0px - 50px default: 0 step: 1

    animate, // default: true
    motionConfig,
    transitionMode,
  } = responsivePieChartState;

  const {
    globalState: { padding, rowGap, width, height },
  } = useGlobalState();
  /** ------------- end hooks ------------- */

  /** ------------- begin useEffects ------------- */
  useEffect(() => {
    logState({
      state: responsivePieChartState,
      groupLabel: 'ResponsivePieChart',
    });
  }, [responsivePieChartState]);

  // set fill patterns on enable
  useEffect(() => {
    if (!pieChartData) {
      return;
    }

    const fillPatterns = pieChartData.map(
      (pieChartData: PieChartData, chartIdx) => {
        const { id } = pieChartData;
        const fillPattern: FillPatternObject = {
          match: {
            id,
          },
          id: chartIdx % 2 === 0 ? 'dots' : 'lines',
        };

        return fillPattern;
      }
    );

    responsivePieChartDispatch({
      type: responsivePieChartAction.setFillPatterns,
      payload: fillPatterns,
    });
  }, [enableFillPatterns, pieChartData]);

  /** ------------- end useEffects ------------- */

  /** ------------- begin accessible description texts ------------- */

  const [
    sortByValueAccessibleSelectedText,
    sortByValueAccessibleDeselectedText,
  ] = returnAccessibleSelectedDeselectedTextElements({
    isSelected: sortByValue,
    semanticName: 'sort by value',
    deselectedDescription:
      'Arcs will not be ordered according to their associated value.',
    selectedDescription:
      'Arcs will be ordered according to their associated value.',
    theme: 'muted',
  });

  const [
    enableFillPatternsAccessibleSelectedText,
    enableFillPatternsAccessibleDeselectedText,
  ] = returnAccessibleSelectedDeselectedTextElements({
    isSelected: enableFillPatterns,
    semanticName: 'enable fill patterns',
    deselectedDescription: 'Fill patterns will not be displayed.',
    selectedDescription: 'Fill patterns will be displayed.',
    theme: 'muted',
  });

  const [
    enableArcLabelsAccessibleSelectedText,
    enableArcLabelsAccessibleDeselectedText,
  ] = returnAccessibleSelectedDeselectedTextElements({
    isSelected: enableArcLabels,
    semanticName: 'enable arc labels',
    deselectedDescription: 'Arc labels will not be displayed.',
    selectedDescription: 'Arc labels will be displayed.',
    theme: 'muted',
  });

  const [
    enableArcLinkLabelsAccessibleSelectedText,
    enableArcLinkLabelsAccessibleDeselectedText,
  ] = returnAccessibleSelectedDeselectedTextElements({
    isSelected: enableArcLinkLabels,
    semanticName: 'enable arc link labels',
    deselectedDescription: 'Arc link labels will not be displayed..',
    selectedDescription: 'Arc link labels will be displayed.',
    theme: 'muted',
  });

  const [animateAccessibleSelectedText, animateAccessibleDeselectedText] =
    returnAccessibleSelectedDeselectedTextElements({
      isSelected: animate,
      semanticName: 'animate',
      deselectedDescription: 'Transitions will be disabled.',
      selectedDescription: 'Transitions will be enabled.',
      theme: 'muted',
    });
  /** ------------- end accessible description texts ------------- */

  /** ------------- begin input objects ------------- */

  /** ------------- begin base ------------- */
  const startAngleSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo = {
    kind: 'slider',
    ariaLabel: 'start angle',
    label: (value) => <Text>{value}</Text>,
    max: 360,
    min: -180,
    step: 1,
    value: startAngle,
    onChangeSlider: (value: number) => {
      responsivePieChartDispatch({
        type: responsivePieChartAction.setStartAngle,
        payload: value,
      });
    },
    sliderDefaultValue: 0,
    width: 217,
  };

  const endAngleSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo = {
    kind: 'slider',
    label: (value) => <Text>{value}</Text>,
    ariaLabel: 'end angle',
    max: 360,
    min: -360,
    step: 1,
    value: endAngle,
    onChangeSlider: (value: number) => {
      responsivePieChartDispatch({
        type: responsivePieChartAction.setEndAngle,
        payload: value,
      });
    },
    sliderDefaultValue: 360,
    width: 217,
  };

  const innerRadiusSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo = {
    kind: 'slider',
    label: (value) => <Text>{value}</Text>,
    ariaLabel: 'inner radius',
    max: 0.95,
    min: 0,
    precision: 2,
    step: 0.05,
    value: innerRadius,
    onChangeSlider: (value: number) => {
      responsivePieChartDispatch({
        type: responsivePieChartAction.setInnerRadius,
        payload: value,
      });
    },
    sliderDefaultValue: 0,
    width: 217,
  };

  const padAngleSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo = {
    kind: 'slider',
    label: (value) => <Text>{value}</Text>,
    ariaLabel: 'pad angle',
    max: 45,
    min: 0,
    step: 1,
    value: padAngle,
    onChangeSlider: (value: number) => {
      responsivePieChartDispatch({
        type: responsivePieChartAction.setPadAngle,
        payload: value,
      });
    },
    sliderDefaultValue: 0,
    width: 217,
  };

  const cornerRadiusSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo = {
    kind: 'slider',
    label: (value) => <Text>{value}</Text>,
    ariaLabel: 'corner radius',
    max: 45,
    min: 0,
    step: 1,
    value: cornerRadius,
    onChangeSlider: (value: number) => {
      responsivePieChartDispatch({
        type: responsivePieChartAction.setCornerRadius,
        payload: value,
      });
    },
    sliderDefaultValue: 0,
    width: 217,
  };

  const createdSortByValueSwitchInput = (
    <Switch
      description={
        sortByValue
          ? sortByValueAccessibleSelectedText
          : sortByValueAccessibleDeselectedText
      }
      aria-describedby={
        sortByValue
          ? sortByValueAccessibleSelectedText.props.id
          : sortByValueAccessibleDeselectedText.props.id
      }
      label={<TextWrapper creatorInfoObj={{}}>Sort by value</TextWrapper>}
      checked={sortByValue}
      onChange={(event: ChangeEvent<HTMLInputElement>) => {
        responsivePieChartDispatch({
          type: responsivePieChartAction.setSortByValue,
          payload: event.currentTarget.checked,
        });
      }}
      w="100%"
    />
  );
  /** ------------- end base ------------- */

  /** ------------- begin style ------------- */
  const colorSchemeSelectInputCreatorInfo: AccessibleSelectInputCreatorInfo = {
    data: NIVO_COLOR_SCHEME_DATA,
    description: "Define chart's colors",
    label: 'Color scheme',
    onChange: (event: ChangeEvent<HTMLSelectElement>) => {
      responsivePieChartDispatch({
        type: responsivePieChartAction.setColorScheme,
        payload: event.currentTarget.value as NivoColorScheme,
      });
    },
    value: colorScheme,
  };

  const createdBorderColorInput = (
    <ColorInput
      aria-label="Border color"
      color={borderColor}
      onChange={(color: string) => {
        responsivePieChartDispatch({
          type: responsivePieChartAction.setBorderColor,
          payload: color,
        });
      }}
      w={217}
    />
  );

  const createdEnableFillPatternsSwitchInput = (
    <Switch
      description={
        enableFillPatterns
          ? enableFillPatternsAccessibleSelectedText
          : enableFillPatternsAccessibleDeselectedText
      }
      aria-describedby={
        enableFillPatterns
          ? enableFillPatternsAccessibleSelectedText.props.id
          : enableFillPatternsAccessibleDeselectedText.props.id
      }
      label={
        <TextWrapper creatorInfoObj={{}}>Enable fill patterns</TextWrapper>
      }
      checked={enableFillPatterns}
      onChange={(event: ChangeEvent<HTMLInputElement>) => {
        responsivePieChartDispatch({
          type: responsivePieChartAction.setEnableFillPatterns,
          payload: event.currentTarget.checked,
        });
      }}
      w="100%"
    />
  );

  const borderWidthSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo = {
    kind: 'slider',
    label: (value) => <Text>{value}</Text>,
    ariaLabel: 'border width',
    max: 20,
    min: 0,
    step: 1,
    value: borderWidth,
    onChangeSlider: (value: number) => {
      responsivePieChartDispatch({
        type: responsivePieChartAction.setBorderWidth,
        payload: value,
      });
    },
    sliderDefaultValue: 0,
    width: 217,
  };
  /** ------------- end style ------------- */

  /** ------------- begin arc labels ------------- */
  const createdEnableArcLabelsSwitchInput = (
    <Switch
      description={
        enableArcLabels
          ? enableArcLabelsAccessibleSelectedText
          : enableArcLabelsAccessibleDeselectedText
      }
      aria-describedby={
        enableArcLabels
          ? enableArcLabelsAccessibleSelectedText.props.id
          : enableArcLabelsAccessibleDeselectedText.props.id
      }
      label={<TextWrapper creatorInfoObj={{}}>Enable arc labels</TextWrapper>}
      checked={enableArcLabels}
      onChange={(event: ChangeEvent<HTMLInputElement>) => {
        responsivePieChartDispatch({
          type: responsivePieChartAction.setEnableArcLabels,
          payload: event.currentTarget.checked,
        });
      }}
      w="100%"
    />
  );

  const arcLabelsRadiusOffsetSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo =
    {
      kind: 'slider',
      label: (value) => <Text>{value}</Text>,
      ariaLabel: 'arc labels radius offset',
      max: 2,
      min: 0,
      precision: 2,
      step: 0.05,
      value: arcLabelsRadiusOffset,
      onChangeSlider: (value: number) => {
        responsivePieChartDispatch({
          type: responsivePieChartAction.setArcLabelsRadiusOffset,
          payload: value,
        });
      },
      sliderDefaultValue: 0.5,
      width: 217,
    };

  const arcLabelsSkipAngleSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo =
    {
      kind: 'slider',
      label: (value) => <Text>{value}</Text>,
      ariaLabel: 'arc labels skip angle',
      max: 45,
      min: 0,
      step: 1,
      value: arcLabelsSkipAngle,
      onChangeSlider: (value: number) => {
        responsivePieChartDispatch({
          type: responsivePieChartAction.setArcLabelsSkipAngle,
          payload: value,
        });
      },
      sliderDefaultValue: 0,
      width: 217,
    };

  const createdArcLabelsTextColorInput = (
    <ColorInput
      aria-label="Arc labels text color"
      value={arcLabelsTextColor}
      onChange={(color: string) => {
        responsivePieChartDispatch({
          type: responsivePieChartAction.setArcLabelsTextColor,
          payload: color,
        });
      }}
      w={217}
    />
  );
  /** ------------- end arc labels ------------- */

  /** ------------- begin arc link labels ------------- */
  const createdEnableArcLinkLabelsSwitchInput = (
    <Switch
      description={
        enableArcLinkLabels
          ? enableArcLinkLabelsAccessibleSelectedText
          : enableArcLinkLabelsAccessibleDeselectedText
      }
      aria-describedby={
        enableArcLinkLabels
          ? enableArcLinkLabelsAccessibleSelectedText.props.id
          : enableArcLinkLabelsAccessibleDeselectedText.props.id
      }
      label={
        <TextWrapper creatorInfoObj={{}}>Enable arc link labels</TextWrapper>
      }
      checked={enableArcLinkLabels}
      onChange={(event: ChangeEvent<HTMLInputElement>) => {
        responsivePieChartDispatch({
          type: responsivePieChartAction.setEnableArcLinkLabels,
          payload: event.currentTarget.checked,
        });
      }}
      w="100%"
    />
  );

  const arcLinkLabelsSkipAngleSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo =
    {
      kind: 'slider',
      label: (value) => <Text>{value}</Text>,
      ariaLabel: 'arc link labels skip angle',
      max: 45,
      min: 0,
      step: 1,
      value: arcLinkLabelsSkipAngle,
      onChangeSlider: (value: number) => {
        responsivePieChartDispatch({
          type: responsivePieChartAction.setArcLinkLabelsSkipAngle,
          payload: value,
        });
      },
      sliderDefaultValue: 0,
      width: 217,
    };

  const arcLinkLabelsOffsetSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo =
    {
      kind: 'slider',
      label: (value) => <Text>{value}</Text>,
      ariaLabel: 'arc link labels offset',
      max: 24,
      min: -24,
      step: 1,
      value: arcLinkLabelsOffset,
      onChangeSlider: (value: number) => {
        responsivePieChartDispatch({
          type: responsivePieChartAction.setArcLinkLabelsOffset,
          payload: value,
        });
      },
      sliderDefaultValue: 0,
      width: 217,
    };

  const arcLinkLabelsDiagonalLengthSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo =
    {
      kind: 'slider',
      label: (value) => <Text>{value}</Text>,
      ariaLabel: 'arc link labels diagonal length',
      max: 36,
      min: 0,
      step: 1,
      value: arcLinkLabelsDiagonalLength,
      onChangeSlider: (value: number) => {
        responsivePieChartDispatch({
          type: responsivePieChartAction.setArcLinkLabelsDiagonalLength,
          payload: value,
        });
      },
      sliderDefaultValue: 16,
      width: 217,
    };

  const arcLinkLabelsStraightLengthSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo =
    {
      kind: 'slider',
      label: (value) => <Text>{value}</Text>,
      ariaLabel: 'arc link labels straight length',
      max: 36,
      min: 0,
      step: 1,
      value: arcLinkLabelsStraightLength,
      onChangeSlider: (value: number) => {
        responsivePieChartDispatch({
          type: responsivePieChartAction.setArcLinkLabelsStraightLength,
          payload: value,
        });
      },
      sliderDefaultValue: 24,
      width: 217,
    };

  const arcLinkLabelsTextOffsetSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo =
    {
      kind: 'slider',
      label: (value) => <Text>{value}</Text>,
      ariaLabel: 'arc link labels text offset',
      max: 36,
      min: 0,
      step: 1,
      value: arcLinkLabelsTextOffset,
      onChangeSlider: (value: number) => {
        responsivePieChartDispatch({
          type: responsivePieChartAction.setArcLinkLabelsTextOffset,
          payload: value,
        });
      },
      sliderDefaultValue: 6,
      width: 217,
    };

  const arcLinkLabelsThicknessSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo =
    {
      kind: 'slider',
      label: (value) => <Text>{value}</Text>,
      ariaLabel: 'arc link labels thickness',
      max: 20,
      min: 0,
      step: 1,
      value: arcLinkLabelsThickness,
      onChangeSlider: (value: number) => {
        responsivePieChartDispatch({
          type: responsivePieChartAction.setArcLinkLabelsThickness,
          payload: value,
        });
      },
      sliderDefaultValue: 1,
      width: 217,
    };

  const createdArcLinkLabelsTextColorInput = (
    <ColorInput
      aria-label="arc link labels text color"
      value={arcLinkLabelsTextColor}
      onChange={(color: string) => {
        responsivePieChartDispatch({
          type: responsivePieChartAction.setArcLinkLabelsTextColor,
          payload: color,
        });
      }}
      w={217}
    />
  );
  /** ------------- end arc link labels ------------- */

  /** ------------- begin interactivity ------------- */
  const activeInnerRadiusOffsetSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo =
    {
      kind: 'slider',
      label: (value) => <Text>{value}</Text>,
      ariaLabel: 'active inner radius offset',
      max: 50,
      min: 0,
      step: 1,
      value: activeInnerRadiusOffset,
      onChangeSlider: (value: number) => {
        responsivePieChartDispatch({
          type: responsivePieChartAction.setActiveInnerRadiusOffset,
          payload: value,
        });
      },
      sliderDefaultValue: 0,
      width: 217,
    };

  const activeOuterRadiusOffsetSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo =
    {
      kind: 'slider',
      label: (value) => <Text>{value}</Text>,
      ariaLabel: 'active outer radius offset',
      max: 50,
      min: 0,
      step: 1,
      value: activeOuterRadiusOffset,
      onChangeSlider: (value: number) => {
        responsivePieChartDispatch({
          type: responsivePieChartAction.setActiveOuterRadiusOffset,
          payload: value,
        });
      },
      sliderDefaultValue: 0,
      width: 217,
    };
  /** ------------- end interactivity ------------- */

  /** ------------- begin motion ------------- */

  const createdAnimateSwitchInput = (
    <Switch
      description={
        animate
          ? animateAccessibleSelectedText
          : animateAccessibleDeselectedText
      }
      aria-describedby={
        animate
          ? animateAccessibleSelectedText.props.id
          : animateAccessibleDeselectedText.props.id
      }
      label={<TextWrapper creatorInfoObj={{}}>Animate</TextWrapper>}
      checked={animate}
      onChange={(event: ChangeEvent<HTMLInputElement>) => {
        responsivePieChartDispatch({
          type: responsivePieChartAction.setAnimate,
          payload: event.currentTarget.checked,
        });
      }}
      w="100%"
    />
  );

  const motionConfigSelectInputCreatorInfo: AccessibleSelectInputCreatorInfo = {
    data: NIVO_MOTION_CONFIG_DATA,
    description: 'Configure react-spring.',
    label: 'motion configuration',
    value: motionConfig,
    onChange: (event: ChangeEvent<HTMLSelectElement>) => {
      responsivePieChartDispatch({
        type: responsivePieChartAction.setMotionConfig,
        payload: event.currentTarget.value as NivoMotionConfig,
      });
    },
  };

  const transitionModeSelectInputCreatorInfo: AccessibleSelectInputCreatorInfo =
    {
      data: NIVO_TRANSITION_MODE_DATA,
      description: 'Define how transitions behave.',
      label: 'transition mode',
      value: transitionMode,
      onChange: (event: ChangeEvent<HTMLSelectElement>) => {
        responsivePieChartDispatch({
          type: responsivePieChartAction.setTransitionMode,
          payload: event.currentTarget.value as NivoTransitionMode,
        });
      },
    };
  /** ------------- end motion ------------- */

  /** ------------- end input objects ------------- */

  /** ------------- begin input creation ------------- */

  /** base */
  const [
    createdStartAngleSliderInput,
    createdEndAngleSliderInput,
    createdInnerRadiusSliderInput,
    createdPadAngleSliderInput,
    createdCornerRadiusSliderInput,
  ] = returnAccessibleSliderInputElements([
    startAngleSliderInputCreatorInfo,
    endAngleSliderInputCreatorInfo,
    innerRadiusSliderInputCreatorInfo,
    padAngleSliderInputCreatorInfo,
    cornerRadiusSliderInputCreatorInfo,
  ]);

  /** style */
  const [createdColorSchemeSelectInput] = returnAccessibleSelectInputElements([
    colorSchemeSelectInputCreatorInfo,
  ]);

  const [createdArcBorderWidthSliderInput] =
    returnAccessibleSliderInputElements([borderWidthSliderInputCreatorInfo]);

  /** arc labels */
  const [
    createdArcLabelsRadiusOffsetSliderInput,
    createdArcLabelsSkipAngleSliderInput,
  ] = returnAccessibleSliderInputElements([
    arcLabelsRadiusOffsetSliderInputCreatorInfo,
    arcLabelsSkipAngleSliderInputCreatorInfo,
  ]);

  /** arc link labels */
  const [
    createdArcLinkLabelsSkipAngleSliderInput,
    createdArcLinkLabelsOffsetSliderInput,
    createdArcLinkLabelsDiagonalLengthSliderInput,
    createdArcLinkLabelsStraightLengthSliderInput,
    createdArcLinkLabelsTextOffsetSliderInput,
    createdArcLinkLabelsThicknessSliderInput,
  ] = returnAccessibleSliderInputElements([
    arcLinkLabelsSkipAngleSliderInputCreatorInfo,
    arcLinkLabelsOffsetSliderInputCreatorInfo,
    arcLinkLabelsDiagonalLengthSliderInputCreatorInfo,
    arcLinkLabelsStraightLengthSliderInputCreatorInfo,
    arcLinkLabelsTextOffsetSliderInputCreatorInfo,
    arcLinkLabelsThicknessSliderInputCreatorInfo,
  ]);

  /** interactivity */
  const [
    createdActiveInnerRadiusOffsetSliderInput,
    createdActiveOuterRadiusOffsetSliderInput,
  ] = returnAccessibleSliderInputElements([
    activeInnerRadiusOffsetSliderInputCreatorInfo,
    activeOuterRadiusOffsetSliderInputCreatorInfo,
  ]);

  /** motion */
  const [createdMotionConfigSelectInput, createdTransitionModeSelectInput] =
    returnAccessibleSelectInputElements([
      motionConfigSelectInputCreatorInfo,
      transitionModeSelectInputCreatorInfo,
    ]);
  /** ------------- end input creation ------------- */

  /** ------------- begin display ------------- */

  /** base */
  const displayBaseText = (
    <TextWrapper
      creatorInfoObj={{
        size: 'md',
        style: {
          background: 'skyblue',
          padding: '0.75rem',
          borderRadius: '4px',
        },
      }}
    >
      Base
    </TextWrapper>
  );

  const displayStartAngleSliderInput = (
    <PieChartControlsStack
      input={createdStartAngleSliderInput}
      label="Start angle"
      value={startAngle}
      symbol="°"
    />
  );

  const displayEndAngleSliderInput = (
    <PieChartControlsStack
      input={createdEndAngleSliderInput}
      label="End angle"
      value={endAngle}
      symbol="°"
    />
  );

  const displayInnerRadiusSliderInput = (
    <PieChartControlsStack
      input={createdInnerRadiusSliderInput}
      label="Inner radius"
      value={innerRadius}
      symbol="px"
    />
  );

  const displayPadAngleSliderInput = (
    <PieChartControlsStack
      input={createdPadAngleSliderInput}
      label="Pad angle"
      value={padAngle}
      symbol="°"
    />
  );

  const displayCornerRadiusSliderInput = (
    <PieChartControlsStack
      input={createdCornerRadiusSliderInput}
      label="Corner radius"
      value={cornerRadius}
      symbol="px"
    />
  );

  const displaySortByValueSwitchInput = (
    <Group w="100%" p={padding}>
      {createdSortByValueSwitchInput}
    </Group>
  );

  const displayBaseSection = (
    <Stack w="100%">
      {displayBaseText}
      {displayStartAngleSliderInput}
      {displayEndAngleSliderInput}
      {displayInnerRadiusSliderInput}
      {displayPadAngleSliderInput}
      {displayCornerRadiusSliderInput}
      {displaySortByValueSwitchInput}
    </Stack>
  );

  /** style */
  const displayStyleText = (
    <TextWrapper
      creatorInfoObj={{
        size: 'md',
        style: {
          background: 'skyblue',
          padding: '0.75rem',
          borderRadius: '4px',
        },
      }}
    >
      Style
    </TextWrapper>
  );

  const displayEnableFillPatternsSwitchInput = (
    <Group w="100%" p={padding} style={{ borderBottom: '1px solid #e0e0e0' }}>
      {createdEnableFillPatternsSwitchInput}
    </Group>
  );

  const displayColorSchemeSelectInput = (
    <Group w="100%" p={padding} style={{ borderBottom: '1px solid #e0e0e0' }}>
      {createdColorSchemeSelectInput}
    </Group>
  );

  const displayBorderColorInput = (
    <PieChartControlsStack
      input={createdBorderColorInput}
      label="Border color"
      value={borderColor}
    />
  );

  const displayArcBorderWidthSliderInput = (
    <PieChartControlsStack
      input={createdArcBorderWidthSliderInput}
      label="Arc border width"
      value={borderWidth}
      symbol=""
    />
  );

  const displayStyleSection = (
    <Stack w="100%">
      {displayStyleText}
      {displayEnableFillPatternsSwitchInput}
      {displayColorSchemeSelectInput}
      {displayBorderColorInput}
      {displayArcBorderWidthSliderInput}
    </Stack>
  );

  /** arc labels */
  const displayArcLabelsText = (
    <TextWrapper
      creatorInfoObj={{
        size: 'md',
        style: {
          background: 'skyblue',
          padding: '0.75rem',
          borderRadius: '4px',
        },
      }}
    >
      Arc labels
    </TextWrapper>
  );

  const displayEnableArcLabelsSwitchInput = (
    <Group w="100%" p={padding} style={{ borderBottom: '1px solid #e0e0e0' }}>
      {createdEnableArcLabelsSwitchInput}
    </Group>
  );

  const displayArcLabelsRadiusOffsetSliderInput = (
    <PieChartControlsStack
      input={createdArcLabelsRadiusOffsetSliderInput}
      label="Radius offset"
      value={arcLabelsRadiusOffset}
      symbol=""
    />
  );

  const displayArcLabelsSkipAngleSliderInput = (
    <PieChartControlsStack
      input={createdArcLabelsSkipAngleSliderInput}
      label="Skip angle"
      value={arcLabelsSkipAngle}
      symbol="°"
    />
  );

  const displayArcLabelsTextColorInput = (
    <PieChartControlsStack
      input={createdArcLabelsTextColorInput}
      label="Arc labels text color"
      value={arcLabelsTextColor}
      symbol=""
    />
  );

  const displayArcLabelsSection = (
    <Stack w="100%">
      {displayArcLabelsText}
      {displayEnableArcLabelsSwitchInput}
      {displayArcLabelsRadiusOffsetSliderInput}
      {displayArcLabelsSkipAngleSliderInput}
      {displayArcLabelsTextColorInput}
    </Stack>
  );

  /** arc link labels */
  const displayArcLinkLabelsText = (
    <TextWrapper
      creatorInfoObj={{
        size: 'md',
        style: {
          background: 'skyblue',
          padding: '0.75rem',
          borderRadius: '4px',
        },
      }}
    >
      Arc link labels
    </TextWrapper>
  );

  const displayEnableArcLinkLabelsSwitchInput = (
    <Group w="100%" p={padding} style={{ borderBottom: '1px solid #e0e0e0' }}>
      {createdEnableArcLinkLabelsSwitchInput}
    </Group>
  );

  const displayArcLinkLabelsSkipAngleSliderInput = (
    <PieChartControlsStack
      input={createdArcLinkLabelsSkipAngleSliderInput}
      label="Skip angle"
      value={arcLinkLabelsSkipAngle}
      symbol="°"
    />
  );

  const displayArcLinkLabelsOffsetSliderInput = (
    <PieChartControlsStack
      input={createdArcLinkLabelsOffsetSliderInput}
      label="Offset"
      value={arcLinkLabelsOffset}
      symbol="px"
    />
  );

  const displayArcLinkLabelsDiagonalLengthSliderInput = (
    <PieChartControlsStack
      input={createdArcLinkLabelsDiagonalLengthSliderInput}
      label="Diagonal length"
      value={arcLinkLabelsDiagonalLength}
      symbol="px"
    />
  );

  const displayArcLinkLabelsStraightLengthSliderInput = (
    <PieChartControlsStack
      input={createdArcLinkLabelsStraightLengthSliderInput}
      label="Straight length"
      value={arcLinkLabelsStraightLength}
      symbol="px"
    />
  );

  const displayArcLinkLabelsTextOffsetSliderInput = (
    <PieChartControlsStack
      input={createdArcLinkLabelsTextOffsetSliderInput}
      label="Text offset"
      value={arcLinkLabelsTextOffset}
      symbol="px"
    />
  );

  const displayArcLinkLabelsThicknessSliderInput = (
    <PieChartControlsStack
      input={createdArcLinkLabelsThicknessSliderInput}
      label="Thickness"
      value={arcLinkLabelsThickness}
      symbol="px"
    />
  );

  const displayArcLinkLabelsTextColorInput = (
    <PieChartControlsStack
      input={createdArcLinkLabelsTextColorInput}
      label="Arc link labels text color"
      value={arcLinkLabelsTextColor}
      symbol=""
    />
  );

  const displayArcLinkLabelsSection = (
    <Stack w="100%">
      {displayArcLinkLabelsText}
      {displayEnableArcLinkLabelsSwitchInput}
      {displayArcLinkLabelsSkipAngleSliderInput}
      {displayArcLinkLabelsOffsetSliderInput}
      {displayArcLinkLabelsDiagonalLengthSliderInput}
      {displayArcLinkLabelsStraightLengthSliderInput}
      {displayArcLinkLabelsTextOffsetSliderInput}
      {displayArcLinkLabelsThicknessSliderInput}
      {displayArcLinkLabelsTextColorInput}
    </Stack>
  );

  /** interactivity */
  const displayInteractivityText = (
    <TextWrapper
      creatorInfoObj={{
        size: 'md',
        style: {
          background: 'skyblue',
          padding: '0.75rem',
          borderRadius: '4px',
        },
      }}
    >
      Interactivity
    </TextWrapper>
  );

  const displayActiveInnerRadiusOffsetSliderInput = (
    <PieChartControlsStack
      input={createdActiveInnerRadiusOffsetSliderInput}
      label="Active inner radius offset"
      value={activeInnerRadiusOffset}
      symbol="px"
    />
  );

  const displayActiveOuterRadiusOffsetSliderInput = (
    <PieChartControlsStack
      input={createdActiveOuterRadiusOffsetSliderInput}
      label="Active outer radius offset"
      value={activeOuterRadiusOffset}
      symbol="px"
    />
  );

  const displayInteractivitySection = (
    <Stack w="100%">
      {displayInteractivityText}
      {displayActiveInnerRadiusOffsetSliderInput}
      {displayActiveOuterRadiusOffsetSliderInput}
    </Stack>
  );

  /** motion */
  const displayMotionText = (
    <TextWrapper
      creatorInfoObj={{
        size: 'md',
        style: {
          background: 'skyblue',
          padding: '0.75rem',
          borderRadius: '4px',
        },
      }}
    >
      Motion
    </TextWrapper>
  );

  const displayAnimateMotionSwitchInput = (
    <Group w="100%" p={padding} style={{ borderBottom: '1px solid #e0e0e0' }}>
      {createdAnimateSwitchInput}
    </Group>
  );

  const displayMotionConfigSelectInput = (
    <Group w="100%" p={padding} style={{ borderBottom: '1px solid #e0e0e0' }}>
      {createdMotionConfigSelectInput}
    </Group>
  );

  const displayTransitionModeSelectInput = (
    <Group w="100%" p={padding} style={{ borderBottom: '1px solid #e0e0e0' }}>
      {createdTransitionModeSelectInput}
    </Group>
  );

  const displayMotionSection = (
    <Stack w="100%">
      {displayMotionText}
      {displayAnimateMotionSwitchInput}
      {displayMotionConfigSelectInput}
      {displayTransitionModeSelectInput}
    </Stack>
  );

  const displayPieChartControls = (
    <Grid
      columns={1}
      h={width < 1192 ? '38vh' : '70vh'}
      style={{
        overflowY: 'scroll',
        borderRight: '1px solid #e0e0e0',
        // boxShadow: '0 0 10px #e0e0e0',
      }}
      py={padding}
    >
      <Grid.Col span={1}>{displayBaseSection}</Grid.Col>
      <Grid.Col span={1}>{displayStyleSection}</Grid.Col>
      <Grid.Col span={1}>{displayArcLabelsSection}</Grid.Col>
      <Grid.Col span={1}>{displayArcLinkLabelsSection}</Grid.Col>
      <Grid.Col span={1}>{displayInteractivitySection}</Grid.Col>
      <Grid.Col span={1}>{displayMotionSection}</Grid.Col>
    </Grid>
  );

  const displayResponsivePie = (
    <ResponsivePie
      data={pieChartData}
      // base
      margin={{ top: 20, right: 100, bottom: 20, left: 100 }}
      startAngle={startAngle}
      endAngle={endAngle}
      innerRadius={innerRadius}
      padAngle={padAngle}
      cornerRadius={cornerRadius}
      sortByValue={sortByValue}
      // style
      colors={{ scheme: colorScheme }}
      borderColor={borderColor}
      borderWidth={borderWidth}
      // arc labels
      enableArcLabels={enableArcLabels}
      arcLabelsRadiusOffset={arcLabelsRadiusOffset}
      arcLabelsSkipAngle={arcLabelsSkipAngle}
      arcLabelsTextColor={arcLabelsTextColor}
      // arc link labels
      enableArcLinkLabels={enableArcLinkLabels}
      arcLinkLabelsSkipAngle={arcLinkLabelsSkipAngle}
      arcLinkLabelsOffset={arcLinkLabelsOffset}
      arcLinkLabelsDiagonalLength={arcLinkLabelsDiagonalLength}
      arcLinkLabelsStraightLength={arcLinkLabelsStraightLength}
      arcLinkLabelsTextOffset={arcLinkLabelsTextOffset}
      arcLinkLabelsThickness={arcLinkLabelsThickness}
      arcLinkLabelsTextColor={arcLinkLabelsTextColor}
      // interactivity
      activeInnerRadiusOffset={activeInnerRadiusOffset}
      activeOuterRadiusOffset={activeOuterRadiusOffset}
      // motion
      animate={animate}
      motionConfig={motionConfig}
      transitionMode={transitionMode}
      defs={[
        {
          id: 'dots',
          type: 'patternDots',
          background: 'inherit',
          color: 'rgba(255, 255, 255, 0.3)',
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: 'lines',
          type: 'patternLines',
          background: 'inherit',
          color: 'rgba(255, 255, 255, 0.3)',
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      fill={enableFillPatterns ? fillPatterns : []}
    />
  );

  const displayResponsivePieChartComponent = (
    <Grid columns={width < 1192 ? 1 : 11} w="100%" h="70vh">
      <Grid.Col span={width < 1192 ? 1 : 4} h={width < 1192 ? '38vh' : '70vh'}>
        {displayPieChartControls}
      </Grid.Col>
      <Grid.Col span={width < 1192 ? 1 : 7} h="100%">
        {displayResponsivePie}
      </Grid.Col>
    </Grid>
  );

  /** ------------- end display ------------- */

  return displayResponsivePieChartComponent;
}

export { ResponsivePieChart };

/**
 * legends={[
        {
          anchor: `${width < 1440 ? 'bottom' : 'right'}`,
          direction: `${width < 768 ? 'row' : 'column'}`,
          justify: false,
          translateX: 0,
          translateY: 56,
          itemsSpacing: width < 768 ? 50 : 10,
          itemWidth: 100,
          itemHeight: 18,
          itemTextColor: '#999',
          itemDirection: 'left-to-right',
          itemOpacity: 1,
          symbolSize: 18,
          symbolShape: 'circle',
          effects: [
            {
              on: 'hover',
              style: {
                itemTextColor: '#000',
              },
            },
          ],
        },
      ]}
 */

/**
 * const displayResponsivePieChartComponent =
    width < 1024 ? (
      <Stack w="100%" h="100vh" p={padding}>
        <Group h="38%">{displayPieChartControls}</Group>
        <Group h="62%">{displayResponsivePie}</Group>
      </Stack>
    ) : (
      <Flex w="100%" h="100%" p={padding} align="center" justify="flex-start">
        <Group h="62%" w='100%' style={{ outline: '1px solid violet' }}>
          {displayPieChartControls}
        </Group>
        <Group h="62%" w={600} style={{ outline: '1px solid teal' }}>
          {displayResponsivePie}
        </Group>
      </Flex>
    );
 */
