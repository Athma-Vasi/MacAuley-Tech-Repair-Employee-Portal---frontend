import {
  ColorInput,
  Divider,
  Grid,
  Group,
  ScrollArea,
  Space,
  Stack,
  Switch,
  Text,
  Title,
} from '@mantine/core';
import { ResponsivePie } from '@nivo/pie';
import { ChangeEvent, useEffect, useReducer } from 'react';

import { COLORS_SWATCHES } from '../../../constants/data';
import { useGlobalState } from '../../../hooks';
import {
  AccessibleSelectedDeselectedTextElements,
  returnAccessibleSelectInputElements,
  returnAccessibleSliderInputElements,
} from '../../../jsxCreators';
import { logState, returnThemeColors } from '../../../utils';
import { PieChartData } from '../../displayStatistics/types';
import {
  AccessibleSelectInputCreatorInfo,
  AccessibleSliderInputCreatorInfo,
} from '../../wrappers';
import { ChartsAndGraphsControlsStacker } from '../utils';
import { NIVO_TRANSITION_MODE_DATA } from './constants';
import {
  initialResponsivePieChartState,
  responsivePieChartAction,
  responsivePieChartReducer,
} from './state';
import {
  FillPatternObject,
  LegendAnchor,
  LegendDirection,
  LegendItemDirection,
  LegendSymbolShape,
  NivoColorScheme,
  NivoMotionConfig,
  NivoTransitionMode,
  ResponsivePieChartProps,
} from './types';
import {
  NIVO_COLOR_SCHEME_DATA,
  NIVO_MOTION_CONFIG_DATA,
  NIVO_LEGEND_ANCHOR_DATA,
  NIVO_LEGEND_DIRECTION_DATA,
  NIVO_LEGEND_ITEM_DIRECTION_DATA,
  NIVO_LEGEND_SYMBOL_SHAPE_DATA,
  CHART_PATTERN_DEFS,
} from '../constants';

function ResponsivePieChart({ pieChartData }: ResponsivePieChartProps) {
  /** ------------- begin hooks ------------- */
  const {
    globalState: { padding, width, themeObject, isPrefersReducedMotion },
  } = useGlobalState();

  const {
    tablesThemeColors: { tableHeadersBgColor: sectionHeadersBgColor },
    generalColors: { chartTextColor, textColor },
    scrollBarStyle,
  } = returnThemeColors({
    themeObject,
    colorsSwatches: COLORS_SWATCHES,
  });

  // ensures appropriate colors based on color scheme
  const modifiedInitialResponsivePieChartState = {
    ...initialResponsivePieChartState,
    arcLabelsTextColor: chartTextColor,
    arcLinkLabelsTextColor: textColor,
  };

  const [responsivePieChartState, responsivePieChartDispatch] = useReducer(
    responsivePieChartReducer,
    modifiedInitialResponsivePieChartState
  );
  const {
    startAngle, // -180 - 360 default: 0 step: 1
    endAngle, // -360 - 360 default: 360 step: 1
    innerRadius, // 0 - 1 default: 0 step: 0.05
    padAngle, // 0 - 45 default: 0 step: 1
    cornerRadius, // 0px - 45px default: 0 step: 1
    sortByValue, // default: false

    chartColors,
    fillPatterns,
    enableFillPatterns, // default: false
    chartBorderColor, // default: #ffffff
    chartBorderWidth, // 0px - 20px default: 0 step: 1

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

    enableAnimate, // default: true
    motionConfig,
    transitionMode,

    marginBottom, // 0px - 60px default: 60 step: 1
    marginLeft, // 0px - 60px default: 60 step: 1
    marginRight, // 0px - 60px default: 60 step: 1
    marginTop, // 0px - 60px default: 60 step: 1

    enableLegend, // default: true
    legendAnchor, // default: bottom
    legendDirection, // default: row
    legendJustify, // default: false
    legendTranslateX, // -200px - 200px default: 0 step: 1
    legendTranslateY, // -200px - 200px default: 0 step: 1
    legendItemsSpacing, // 0px - 60px default: 0 step: 1
    legendItemWidth, // 10px - 200px default: 60 step: 1
    legendItemHeight, // 10px - 200px default: 20 step: 1
    legendItemDirection, // default: left-to-right
    legendItemTextColor, // default: #000000
    legendItemOpacity, // 0 - 1 default: 1 step: 0.05
    legendSymbolSize, // 2px - 60px default: 12 step: 1
    legendSymbolShape, // default: circle
  } = responsivePieChartState;

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

  // set motion config on enable
  useEffect(() => {
    if (!isPrefersReducedMotion) {
      return;
    }

    responsivePieChartDispatch({
      type: responsivePieChartAction.setEnableAnimate,
      payload: false,
    });
  }, [isPrefersReducedMotion]);

  /** ------------- end useEffects ------------- */

  /** ------------- begin accessible description texts ------------- */

  const [
    sortByValueAccessibleSelectedText,
    sortByValueAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    isSelected: sortByValue,
    deselectedDescription:
      'Arcs will not be ordered according to their associated value.',
    selectedDescription:
      'Arcs will be ordered according to their associated value.',
    semanticName: 'sort by value',
    theme: 'muted',
  });

  const [
    enableFillPatternsAccessibleSelectedText,
    enableFillPatternsAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    deselectedDescription: 'Fill patterns will not be displayed.',
    isSelected: enableFillPatterns,
    selectedDescription: 'Fill patterns will be displayed.',
    semanticName: 'fill patterns',
    theme: 'muted',
  });

  const [
    enableArcLabelsAccessibleSelectedText,
    enableArcLabelsAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    deselectedDescription: 'Arc labels will not be displayed.',
    isSelected: enableArcLabels,
    selectedDescription: 'Arc labels will be displayed.',
    semanticName: 'arc labels',
    theme: 'muted',
  });

  const [
    enableArcLinkLabelsAccessibleSelectedText,
    enableArcLinkLabelsAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    deselectedDescription: 'Arc link labels will not be displayed..',
    isSelected: enableArcLinkLabels,
    selectedDescription: 'Arc link labels will be displayed.',
    semanticName: 'arc link labels',
    theme: 'muted',
  });

  const [
    enableAnimateAccessibleSelectedText,
    enableAnimateAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    deselectedDescription: 'Transitions will be disabled.',
    isSelected: enableAnimate,
    selectedDescription: 'Transitions will be enabled.',
    semanticName: 'enableAnimate',
    theme: 'muted',
  });

  const [
    enableLegendAccessibleSelectedText,
    enableLegendAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    deselectedDescription: 'Legend will not be displayed.',
    isSelected: enableLegend,
    selectedDescription: 'Legend will be displayed.',
    semanticName: 'legend',
    theme: 'muted',
  });

  // legend legendJustify description texts
  const [
    enableLegendJustifyAccessibleSelectedText,
    enableLegendJustifyAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    deselectedDescription: 'Legend symbol and label will not be justified.',
    isSelected: legendJustify,
    selectedDescription: 'Legend symbol and label will be justified.',
    semanticName: 'legendJustify',
    theme: 'muted',
  });
  /** ------------- end accessible description texts ------------- */

  /** ------------- begin input objects ------------- */
  const { gray } = COLORS_SWATCHES;

  /** ------------- begin base ------------- */
  const sliderWidth =
    width < 480
      ? '217px'
      : width < 768
      ? `${width * 0.38}px`
      : width < 1192
      ? '500px'
      : `${width * 0.15}px`;
  const sliderLabelColor = gray[3];

  const startAngleSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo = {
    ariaLabel: 'start angle',
    kind: 'slider',
    label: (value) => (
      <Text style={{ color: sliderLabelColor }}>{value} °</Text>
    ),
    max: 360,
    min: -180,
    onChangeSlider: (value: number) => {
      responsivePieChartDispatch({
        type: responsivePieChartAction.setStartAngle,
        payload: value,
      });
    },
    sliderDefaultValue: 0,
    step: 1,
    value: startAngle,
    width: sliderWidth,
  };

  const endAngleSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo = {
    ariaLabel: 'end angle',
    kind: 'slider',
    label: (value) => (
      <Text style={{ color: sliderLabelColor }}>{value} °</Text>
    ),
    max: 360,
    min: -360,
    onChangeSlider: (value: number) => {
      responsivePieChartDispatch({
        type: responsivePieChartAction.setEndAngle,
        payload: value,
      });
    },
    sliderDefaultValue: 360,
    step: 1,
    value: endAngle,
    width: sliderWidth,
  };

  const innerRadiusSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo = {
    ariaLabel: 'inner radius',
    kind: 'slider',
    label: (value) => (
      <Text style={{ color: sliderLabelColor }}>{value} px</Text>
    ),
    max: 0.95,
    min: 0,
    precision: 2,
    onChangeSlider: (value: number) => {
      responsivePieChartDispatch({
        type: responsivePieChartAction.setInnerRadius,
        payload: value,
      });
    },
    sliderDefaultValue: 0,
    step: 0.05,
    value: innerRadius,
    width: sliderWidth,
  };

  const padAngleSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo = {
    ariaLabel: 'pad angle',
    kind: 'slider',
    label: (value) => (
      <Text style={{ color: sliderLabelColor }}>{value} °</Text>
    ),
    max: 45,
    min: 0,
    onChangeSlider: (value: number) => {
      responsivePieChartDispatch({
        type: responsivePieChartAction.setPadAngle,
        payload: value,
      });
    },
    sliderDefaultValue: 0,
    step: 1,
    value: padAngle,
    width: sliderWidth,
  };

  const cornerRadiusSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo = {
    ariaLabel: 'corner radius',
    kind: 'slider',
    label: (value) => (
      <Text style={{ color: sliderLabelColor }}>{value} px</Text>
    ),
    max: 45,
    min: 0,
    onChangeSlider: (value: number) => {
      responsivePieChartDispatch({
        type: responsivePieChartAction.setCornerRadius,
        payload: value,
      });
    },
    sliderDefaultValue: 0,
    step: 1,
    value: cornerRadius,
    width: sliderWidth,
  };

  const createdSortByValueSwitchInput = (
    <Switch
      aria-describedby={
        sortByValue
          ? sortByValueAccessibleSelectedText.props.id
          : sortByValueAccessibleDeselectedText.props.id
      }
      checked={sortByValue}
      description={
        sortByValue
          ? sortByValueAccessibleSelectedText
          : sortByValueAccessibleDeselectedText
      }
      label={<Text size="md">Sort by value</Text>}
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
  const chartColorsSelectInputCreatorInfo: AccessibleSelectInputCreatorInfo = {
    data: NIVO_COLOR_SCHEME_DATA,
    description: "Define chart's colors",
    onChange: (event: ChangeEvent<HTMLSelectElement>) => {
      responsivePieChartDispatch({
        type: responsivePieChartAction.setColorScheme,
        payload: event.currentTarget.value as NivoColorScheme,
      });
    },
    value: chartColors,
    width: sliderWidth,
  };

  const createdBorderColorInput = (
    <ColorInput
      aria-label="Border color"
      color={chartBorderColor}
      onChange={(color: string) => {
        responsivePieChartDispatch({
          type: responsivePieChartAction.setChartBorderColor,
          payload: color,
        });
      }}
      value={chartBorderColor}
      w={sliderWidth}
    />
  );

  const createdEnableFillPatternsSwitchInput = (
    <Switch
      aria-describedby={
        enableFillPatterns
          ? enableFillPatternsAccessibleSelectedText.props.id
          : enableFillPatternsAccessibleDeselectedText.props.id
      }
      checked={enableFillPatterns}
      description={
        enableFillPatterns
          ? enableFillPatternsAccessibleSelectedText
          : enableFillPatternsAccessibleDeselectedText
      }
      label={<Text size="md">Fill patterns</Text>}
      onChange={(event: ChangeEvent<HTMLInputElement>) => {
        responsivePieChartDispatch({
          type: responsivePieChartAction.setEnableFillPatterns,
          payload: event.currentTarget.checked,
        });
      }}
      w="100%"
    />
  );

  const chartBorderWidthSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo =
    {
      ariaLabel: 'border width',
      kind: 'slider',
      label: (value) => (
        <Text style={{ color: sliderLabelColor }}>{value} px</Text>
      ),
      max: 20,
      min: 0,
      onChangeSlider: (value: number) => {
        responsivePieChartDispatch({
          type: responsivePieChartAction.setChartBorderWidth,
          payload: value,
        });
      },
      sliderDefaultValue: 0,
      step: 1,
      value: chartBorderWidth,
      width: sliderWidth,
    };
  /** ------------- end style ------------- */

  /** ------------- begin arc labels ------------- */
  const createdEnableArcLabelsSwitchInput = (
    <Switch
      aria-describedby={
        enableArcLabels
          ? enableArcLabelsAccessibleSelectedText.props.id
          : enableArcLabelsAccessibleDeselectedText.props.id
      }
      checked={enableArcLabels}
      description={
        enableArcLabels
          ? enableArcLabelsAccessibleSelectedText
          : enableArcLabelsAccessibleDeselectedText
      }
      label={<Text size="md">Arc labels</Text>}
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
      ariaLabel: 'arc labels radius offset',
      disabled: !enableArcLabels,
      kind: 'slider',
      label: (value) => (
        <Text style={{ color: sliderLabelColor }}>{value} px</Text>
      ),
      max: 2,
      min: 0,
      precision: 2,
      onChangeSlider: (value: number) => {
        responsivePieChartDispatch({
          type: responsivePieChartAction.setArcLabelsRadiusOffset,
          payload: value,
        });
      },
      sliderDefaultValue: 0.5,
      step: 0.05,
      value: arcLabelsRadiusOffset,
      width: sliderWidth,
    };

  const arcLabelsSkipAngleSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo =
    {
      ariaLabel: 'arc labels skip angle',
      disabled: !enableArcLabels,
      kind: 'slider',
      label: (value) => (
        <Text style={{ color: sliderLabelColor }}>{value} °</Text>
      ),
      max: 45,
      min: 0,
      onChangeSlider: (value: number) => {
        responsivePieChartDispatch({
          type: responsivePieChartAction.setArcLabelsSkipAngle,
          payload: value,
        });
      },
      sliderDefaultValue: 0,
      step: 1,
      value: arcLabelsSkipAngle,
      width: sliderWidth,
    };

  const createdArcLabelsTextColorInput = (
    <ColorInput
      aria-label="Arc labels text color"
      disabled={!enableArcLabels}
      onChange={(color: string) => {
        responsivePieChartDispatch({
          type: responsivePieChartAction.setArcLabelsTextColor,
          payload: color,
        });
      }}
      value={arcLabelsTextColor}
      w={sliderWidth}
    />
  );
  /** ------------- end arc labels ------------- */

  /** ------------- begin arc link labels ------------- */
  const createdEnableArcLinkLabelsSwitchInput = (
    <Switch
      aria-describedby={
        enableArcLinkLabels
          ? enableArcLinkLabelsAccessibleSelectedText.props.id
          : enableArcLinkLabelsAccessibleDeselectedText.props.id
      }
      checked={enableArcLinkLabels}
      description={
        enableArcLinkLabels
          ? enableArcLinkLabelsAccessibleSelectedText
          : enableArcLinkLabelsAccessibleDeselectedText
      }
      label={<Text size="md">Arc link labels</Text>}
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
      ariaLabel: 'arc link labels skip angle',
      disabled: !enableArcLinkLabels,
      kind: 'slider',
      label: (value) => (
        <Text style={{ color: sliderLabelColor }}>{value} °</Text>
      ),
      max: 45,
      min: 0,
      onChangeSlider: (value: number) => {
        responsivePieChartDispatch({
          type: responsivePieChartAction.setArcLinkLabelsSkipAngle,
          payload: value,
        });
      },
      sliderDefaultValue: 0,
      step: 1,
      value: arcLinkLabelsSkipAngle,
      width: sliderWidth,
    };

  const arcLinkLabelsOffsetSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo =
    {
      ariaLabel: 'arc link labels offset',
      disabled: !enableArcLinkLabels,
      kind: 'slider',
      label: (value) => (
        <Text style={{ color: sliderLabelColor }}>{value} px</Text>
      ),
      max: 24,
      min: -24,
      onChangeSlider: (value: number) => {
        responsivePieChartDispatch({
          type: responsivePieChartAction.setArcLinkLabelsOffset,
          payload: value,
        });
      },
      sliderDefaultValue: 0,
      step: 1,
      value: arcLinkLabelsOffset,
      width: sliderWidth,
    };

  const arcLinkLabelsDiagonalLengthSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo =
    {
      ariaLabel: 'arc link labels diagonal length',
      disabled: !enableArcLinkLabels,
      kind: 'slider',
      label: (value) => (
        <Text style={{ color: sliderLabelColor }}>{value} px</Text>
      ),
      max: 36,
      min: 0,
      onChangeSlider: (value: number) => {
        responsivePieChartDispatch({
          type: responsivePieChartAction.setArcLinkLabelsDiagonalLength,
          payload: value,
        });
      },
      sliderDefaultValue: 16,
      step: 1,
      value: arcLinkLabelsDiagonalLength,
      width: sliderWidth,
    };

  const arcLinkLabelsStraightLengthSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo =
    {
      ariaLabel: 'arc link labels straight length',
      disabled: !enableArcLinkLabels,
      kind: 'slider',
      label: (value) => (
        <Text style={{ color: sliderLabelColor }}>{value} px</Text>
      ),
      max: 36,
      min: 0,
      onChangeSlider: (value: number) => {
        responsivePieChartDispatch({
          type: responsivePieChartAction.setArcLinkLabelsStraightLength,
          payload: value,
        });
      },
      sliderDefaultValue: 24,
      step: 1,
      value: arcLinkLabelsStraightLength,
      width: sliderWidth,
    };

  const arcLinkLabelsTextOffsetSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo =
    {
      ariaLabel: 'arc link labels text offset',
      disabled: !enableArcLinkLabels,
      kind: 'slider',
      label: (value) => (
        <Text style={{ color: sliderLabelColor }}>{value} px</Text>
      ),
      max: 36,
      min: 0,
      onChangeSlider: (value: number) => {
        responsivePieChartDispatch({
          type: responsivePieChartAction.setArcLinkLabelsTextOffset,
          payload: value,
        });
      },
      sliderDefaultValue: 6,
      step: 1,
      value: arcLinkLabelsTextOffset,
      width: sliderWidth,
    };

  const arcLinkLabelsThicknessSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo =
    {
      ariaLabel: 'arc link labels thickness',
      disabled: !enableArcLinkLabels,
      kind: 'slider',
      label: (value) => (
        <Text style={{ color: sliderLabelColor }}>{value} px</Text>
      ),
      max: 20,
      min: 0,
      onChangeSlider: (value: number) => {
        responsivePieChartDispatch({
          type: responsivePieChartAction.setArcLinkLabelsThickness,
          payload: value,
        });
      },
      sliderDefaultValue: 1,
      step: 1,
      value: arcLinkLabelsThickness,
      width: sliderWidth,
    };

  const createdArcLinkLabelsTextColorInput = (
    <ColorInput
      aria-label="arc link labels text color"
      disabled={!enableArcLinkLabels}
      onChange={(color: string) => {
        responsivePieChartDispatch({
          type: responsivePieChartAction.setArcLinkLabelsTextColor,
          payload: color,
        });
      }}
      value={arcLinkLabelsTextColor}
      w={sliderWidth}
    />
  );
  /** ------------- end arc link labels ------------- */

  /** ------------- begin interactivity ------------- */
  const activeInnerRadiusOffsetSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo =
    {
      ariaLabel: 'active inner radius offset',
      kind: 'slider',
      label: (value) => (
        <Text style={{ color: sliderLabelColor }}>{value} px</Text>
      ),
      max: 50,
      min: 0,
      onChangeSlider: (value: number) => {
        responsivePieChartDispatch({
          type: responsivePieChartAction.setActiveInnerRadiusOffset,
          payload: value,
        });
      },
      sliderDefaultValue: 0,
      step: 1,
      value: activeInnerRadiusOffset,
      width: sliderWidth,
    };

  const activeOuterRadiusOffsetSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo =
    {
      ariaLabel: 'active outer radius offset',
      kind: 'slider',
      label: (value) => (
        <Text style={{ color: sliderLabelColor }}>{value} px</Text>
      ),
      max: 50,
      min: 0,
      onChangeSlider: (value: number) => {
        responsivePieChartDispatch({
          type: responsivePieChartAction.setActiveOuterRadiusOffset,
          payload: value,
        });
      },
      sliderDefaultValue: 0,
      step: 1,
      value: activeOuterRadiusOffset,
      width: sliderWidth,
    };
  /** ------------- end interactivity ------------- */

  /** ------------- begin motion ------------- */
  const createdAnimateSwitchInput = (
    <Switch
      aria-describedby={
        enableAnimate
          ? enableAnimateAccessibleSelectedText.props.id
          : enableAnimateAccessibleDeselectedText.props.id
      }
      checked={enableAnimate}
      description={
        enableAnimate
          ? enableAnimateAccessibleSelectedText
          : enableAnimateAccessibleDeselectedText
      }
      label={<Text size="md">Animate</Text>}
      disabled={isPrefersReducedMotion}
      onChange={(event: ChangeEvent<HTMLInputElement>) => {
        responsivePieChartDispatch({
          type: responsivePieChartAction.setEnableAnimate,
          payload: event.currentTarget.checked,
        });
      }}
      w="100%"
    />
  );

  const motionConfigSelectInputCreatorInfo: AccessibleSelectInputCreatorInfo = {
    data: NIVO_MOTION_CONFIG_DATA,
    description: 'Configure react-spring.',
    disabled: !enableAnimate,
    onChange: (event: ChangeEvent<HTMLSelectElement>) => {
      responsivePieChartDispatch({
        type: responsivePieChartAction.setMotionConfig,
        payload: event.currentTarget.value as NivoMotionConfig,
      });
    },
    value: motionConfig,
    width: sliderWidth,
  };

  const transitionModeSelectInputCreatorInfo: AccessibleSelectInputCreatorInfo =
    {
      data: NIVO_TRANSITION_MODE_DATA,
      description: 'Define how transitions behave.',
      disabled: !enableAnimate,
      onChange: (event: ChangeEvent<HTMLSelectElement>) => {
        responsivePieChartDispatch({
          type: responsivePieChartAction.setTransitionMode,
          payload: event.currentTarget.value as NivoTransitionMode,
        });
      },
      value: transitionMode,
      width: sliderWidth,
    };
  /** ------------- end motion ------------- */

  /** ------------- begin margin ------------- */
  const marginBottomSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo = {
    ariaLabel: 'margin bottom',
    kind: 'slider',
    label: (value) => (
      <Text style={{ color: sliderLabelColor }}>{value} px</Text>
    ),
    max: 300,
    min: 0,
    onChangeSlider: (value: number) => {
      responsivePieChartDispatch({
        type: responsivePieChartAction.setMarginBottom,
        payload: value,
      });
    },
    sliderDefaultValue: 80,
    step: 1,
    value: marginBottom,
    width: sliderWidth,
  };

  const marginLeftSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo = {
    ariaLabel: 'margin left',
    kind: 'slider',
    label: (value) => (
      <Text style={{ color: sliderLabelColor }}>{value} px</Text>
    ),
    max: 300,
    min: 0,
    onChangeSlider: (value: number) => {
      responsivePieChartDispatch({
        type: responsivePieChartAction.setMarginLeft,
        payload: value,
      });
    },
    sliderDefaultValue: 150,
    step: 1,
    value: marginLeft,
    width: sliderWidth,
  };

  const marginRightSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo = {
    ariaLabel: 'margin right',
    kind: 'slider',
    label: (value) => (
      <Text style={{ color: sliderLabelColor }}>{value} px</Text>
    ),
    max: 300,
    min: 0,
    onChangeSlider: (value: number) => {
      responsivePieChartDispatch({
        type: responsivePieChartAction.setMarginRight,
        payload: value,
      });
    },
    sliderDefaultValue: 150,
    step: 1,
    value: marginRight,
    width: sliderWidth,
  };

  const marginTopSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo = {
    ariaLabel: 'margin top',
    kind: 'slider',
    label: (value) => (
      <Text style={{ color: sliderLabelColor }}>{value} px</Text>
    ),
    max: 300,
    min: 0,
    onChangeSlider: (value: number) => {
      responsivePieChartDispatch({
        type: responsivePieChartAction.setMarginTop,
        payload: value,
      });
    },
    sliderDefaultValue: 80,
    step: 1,
    value: marginTop,
    width: sliderWidth,
  };
  /** ------------- end margin ------------- */

  /** ------------- begin legend ------------- */
  const createdEnableLegendSwitchInput = (
    <Switch
      aria-describedby={
        enableLegend
          ? enableLegendAccessibleSelectedText.props.id
          : enableLegendAccessibleDeselectedText.props.id
      }
      checked={enableLegend}
      description={
        enableLegend
          ? enableLegendAccessibleSelectedText
          : enableLegendAccessibleDeselectedText
      }
      label={<Text size="md">Legend</Text>}
      onChange={(event: ChangeEvent<HTMLInputElement>) => {
        responsivePieChartDispatch({
          type: responsivePieChartAction.setEnableLegend,
          payload: event.currentTarget.checked,
        });
      }}
      w="100%"
    />
  );

  const legendAnchorSelectInputCreatorInfo: AccessibleSelectInputCreatorInfo = {
    data: NIVO_LEGEND_ANCHOR_DATA,
    description: "Defines legend legendAnchor relative to chart's viewport.",
    disabled: !enableLegend,
    onChange: (event: ChangeEvent<HTMLSelectElement>) => {
      responsivePieChartDispatch({
        type: responsivePieChartAction.setLegendAnchor,
        payload: event.currentTarget.value as LegendAnchor,
      });
    },
    value: legendAnchor,
    width: sliderWidth,
  };

  const legendDirectionSelectInputCreatorInfo: AccessibleSelectInputCreatorInfo =
    {
      data: NIVO_LEGEND_DIRECTION_DATA,
      description: 'Defines legend legendDirection.',
      disabled: !enableLegend,
      onChange: (event: ChangeEvent<HTMLSelectElement>) => {
        responsivePieChartDispatch({
          type: responsivePieChartAction.setLegendDirection,
          payload: event.currentTarget.value as LegendDirection,
        });
      },
      value: legendDirection,
      width: sliderWidth,
    };

  const createdEnableLegendJustifySwitchInput = (
    <Switch
      aria-describedby={
        legendJustify
          ? enableLegendJustifyAccessibleSelectedText.props.id
          : enableLegendJustifyAccessibleDeselectedText.props.id
      }
      checked={legendJustify}
      disabled={!enableLegend}
      description={
        enableLegend ? (
          legendJustify ? (
            enableLegendJustifyAccessibleSelectedText
          ) : (
            enableLegendJustifyAccessibleDeselectedText
          )
        ) : (
          <Text>Enable legend to modify legendJustify.</Text>
        )
      }
      label={<Text size="md">Justify</Text>}
      onChange={(event: ChangeEvent<HTMLInputElement>) => {
        responsivePieChartDispatch({
          type: responsivePieChartAction.setLegendJustify,
          payload: event.currentTarget.checked,
        });
      }}
      w="100%"
    />
  );

  const legendTranslateXSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo =
    {
      ariaLabel: 'Translate legend in x-axis: horizontal legendDirection',
      disabled: !enableLegend,
      kind: 'slider',
      label: (value) => (
        <Text style={{ color: sliderLabelColor }}>{value} px</Text>
      ),
      max: 200,
      min: -200,
      onChangeSlider: (value: number) => {
        responsivePieChartDispatch({
          type: responsivePieChartAction.setLegendTranslateX,
          payload: value,
        });
      },
      sliderDefaultValue: 0,
      step: 1,
      value: legendTranslateX,
      width: sliderWidth,
    };

  const legendTranslateYSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo =
    {
      ariaLabel: 'Translate legend in y-axis: vertical legendDirection',
      disabled: !enableLegend,
      kind: 'slider',
      label: (value) => (
        <Text style={{ color: sliderLabelColor }}>{value} px</Text>
      ),
      max: 200,
      min: -200,
      onChangeSlider: (value: number) => {
        responsivePieChartDispatch({
          type: responsivePieChartAction.setLegendTranslateY,
          payload: value,
        });
      },
      sliderDefaultValue: 0,
      step: 1,
      value: legendTranslateY,
      width: sliderWidth,
    };

  const legendItemsSpacingSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo =
    {
      ariaLabel: 'Legend items spacing',
      disabled: !enableLegend,
      kind: 'slider',
      label: (value) => (
        <Text style={{ color: sliderLabelColor }}>{value} px</Text>
      ),
      max: 60,
      min: 0,
      onChangeSlider: (value: number) => {
        responsivePieChartDispatch({
          type: responsivePieChartAction.setLegendItemsSpacing,
          payload: value,
        });
      },
      sliderDefaultValue: 0,
      step: 1,
      value: legendItemsSpacing,
      width: sliderWidth,
    };

  const legendItemWidthSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo =
    {
      ariaLabel: 'Legend item width',
      disabled: !enableLegend,
      kind: 'slider',
      label: (value) => (
        <Text style={{ color: sliderLabelColor }}>{value} px</Text>
      ),
      max: 200,
      min: 10,
      onChangeSlider: (value: number) => {
        responsivePieChartDispatch({
          type: responsivePieChartAction.setLegendItemWidth,
          payload: value,
        });
      },
      sliderDefaultValue: 60,
      step: 1,
      value: legendItemWidth,
      width: sliderWidth,
    };

  const legendItemHeightSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo =
    {
      ariaLabel: 'Legend item height',
      disabled: !enableLegend,
      kind: 'slider',
      label: (value) => (
        <Text style={{ color: sliderLabelColor }}>{value} px</Text>
      ),
      max: 200,
      min: 10,
      onChangeSlider: (value: number) => {
        responsivePieChartDispatch({
          type: responsivePieChartAction.setLegendItemHeight,
          payload: value,
        });
      },
      sliderDefaultValue: 20,
      step: 1,
      value: legendItemHeight,
      width: sliderWidth,
    };

  const legendItemDirectionSelectInputCreatorInfo: AccessibleSelectInputCreatorInfo =
    {
      data: NIVO_LEGEND_ITEM_DIRECTION_DATA,
      description: 'Defines legend item legendDirection.',
      disabled: !enableLegend,
      onChange: (event: ChangeEvent<HTMLSelectElement>) => {
        responsivePieChartDispatch({
          type: responsivePieChartAction.setLegendItemDirection,
          payload: event.currentTarget.value as LegendItemDirection,
        });
      },
      value: legendItemDirection,
      width: sliderWidth,
    };

  const legendItemTextColorInput = (
    <ColorInput
      aria-label="Legend item text color"
      disabled={!enableLegend}
      onChange={(color: string) => {
        responsivePieChartDispatch({
          type: responsivePieChartAction.setLegendItemTextColor,
          payload: color,
        });
      }}
      value={legendItemTextColor}
      w={sliderWidth}
    />
  );

  const legendItemOpacitySliderInputCreatorInfo: AccessibleSliderInputCreatorInfo =
    {
      ariaLabel: 'Legend item opacity',
      disabled: !enableLegend,
      kind: 'slider',
      label: (value) => (
        <Text style={{ color: sliderLabelColor }}>
          {(value * 100).toFixed(0)} %
        </Text>
      ),
      max: 1,
      min: 0,
      precision: 2,
      onChangeSlider: (value: number) => {
        responsivePieChartDispatch({
          type: responsivePieChartAction.setLegendItemOpacity,
          payload: value,
        });
      },
      sliderDefaultValue: 1,
      step: 0.05,
      value: legendItemOpacity,
      width: sliderWidth,
    };

  const legendSymbolSizeSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo =
    {
      ariaLabel: 'Legend symbol size',
      disabled: !enableLegend,
      kind: 'slider',
      label: (value) => (
        <Text style={{ color: sliderLabelColor }}>{value} px</Text>
      ),
      max: 60,
      min: 2,
      onChangeSlider: (value: number) => {
        responsivePieChartDispatch({
          type: responsivePieChartAction.setLegendSymbolSize,
          payload: value,
        });
      },
      sliderDefaultValue: 12,
      step: 1,
      value: legendSymbolSize,
      width: sliderWidth,
    };

  const legendSymbolShapeSelectInputCreatorInfo: AccessibleSelectInputCreatorInfo =
    {
      data: NIVO_LEGEND_SYMBOL_SHAPE_DATA,
      description: 'Defines legend symbol shape.',
      disabled: !enableLegend,
      onChange: (event: ChangeEvent<HTMLSelectElement>) => {
        responsivePieChartDispatch({
          type: responsivePieChartAction.setLegendSymbolShape,
          payload: event.currentTarget.value as LegendSymbolShape,
        });
      },
      value: legendSymbolShape,
      width: sliderWidth,
    };

  /** ------------- end legend ------------- */
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
    chartColorsSelectInputCreatorInfo,
  ]);

  const [createdArcBorderWidthSliderInput] =
    returnAccessibleSliderInputElements([
      chartBorderWidthSliderInputCreatorInfo,
    ]);

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

  /** margin */
  const [
    createdMarginBottomSliderInput,
    createdMarginLeftSliderInput,
    createdMarginRightSliderInput,
    createdMarginTopSliderInput,
  ] = returnAccessibleSliderInputElements([
    marginBottomSliderInputCreatorInfo,
    marginLeftSliderInputCreatorInfo,
    marginRightSliderInputCreatorInfo,
    marginTopSliderInputCreatorInfo,
  ]);

  /** legend */
  const [
    createdLegendTranslateXSliderInput,
    createdLegendTranslateYSliderInput,
    createdLegendItemsSpacingSliderInput,
    createdLegendItemWidthSliderInput,
    createdLegendItemHeightSliderInput,
    createdLegendItemOpacitySliderInput,
    createdLegendSymbolSizeSliderInput,
  ] = returnAccessibleSliderInputElements([
    legendTranslateXSliderInputCreatorInfo,
    legendTranslateYSliderInputCreatorInfo,
    legendItemsSpacingSliderInputCreatorInfo,
    legendItemWidthSliderInputCreatorInfo,
    legendItemHeightSliderInputCreatorInfo,
    legendItemOpacitySliderInputCreatorInfo,
    legendSymbolSizeSliderInputCreatorInfo,
  ]);

  const [
    createdLegendAnchorSelectInput,
    createdLegendDirectionSelectInput,
    createdLegendItemDirectionSelectInput,
    createdLegendSymbolShapeSelectInput,
  ] = returnAccessibleSelectInputElements([
    legendAnchorSelectInputCreatorInfo,
    legendDirectionSelectInputCreatorInfo,
    legendItemDirectionSelectInputCreatorInfo,
    legendSymbolShapeSelectInputCreatorInfo,
  ]);
  /** ------------- end input creation ------------- */

  /** ------------- begin display ------------- */

  /** base */

  const displayBaseHeading = (
    <Group
      w="100%"
      bg={sectionHeadersBgColor}
      p={padding}
      style={{ borderRadius: 4 }}
    >
      <Title order={5}>Base</Title>
    </Group>
  );

  const displayStartAngleSliderInput = (
    <ChartsAndGraphsControlsStacker
      input={createdStartAngleSliderInput}
      label="Start angle"
      value={startAngle}
      symbol="°"
    />
  );

  const displayEndAngleSliderInput = (
    <ChartsAndGraphsControlsStacker
      input={createdEndAngleSliderInput}
      label="End angle"
      value={endAngle}
      symbol="°"
    />
  );

  const displayInnerRadiusSliderInput = (
    <ChartsAndGraphsControlsStacker
      input={createdInnerRadiusSliderInput}
      label="Inner radius"
      value={innerRadius}
      symbol="px"
    />
  );

  const displayPadAngleSliderInput = (
    <ChartsAndGraphsControlsStacker
      input={createdPadAngleSliderInput}
      label="Pad angle"
      value={padAngle}
      symbol="°"
    />
  );

  const displayCornerRadiusSliderInput = (
    <ChartsAndGraphsControlsStacker
      input={createdCornerRadiusSliderInput}
      label="Corner radius"
      value={cornerRadius}
      symbol="px"
    />
  );

  const displaySortByValueSwitchInput = (
    <Group w="100%" p={padding} style={{ borderBottom: chartBorderColor }}>
      {createdSortByValueSwitchInput}
    </Group>
  );

  const displayBaseSection = (
    <Stack w="100%">
      {displayBaseHeading}
      {displayStartAngleSliderInput}
      {displayEndAngleSliderInput}
      {displayInnerRadiusSliderInput}
      {displayPadAngleSliderInput}
      {displayCornerRadiusSliderInput}
      {displaySortByValueSwitchInput}
    </Stack>
  );

  /** style */
  const displayStyleHeading = (
    <Group
      w="100%"
      bg={sectionHeadersBgColor}
      p={padding}
      style={{ borderRadius: 4 }}
    >
      <Title order={5}>Style</Title>
    </Group>
  );

  const displayEnableFillPatternsSwitchInput = (
    <Group w="100%" p={padding} style={{ borderBottom: chartBorderColor }}>
      {createdEnableFillPatternsSwitchInput}
    </Group>
  );

  const displayColorSchemeSelectInput = (
    <ChartsAndGraphsControlsStacker
      input={createdColorSchemeSelectInput}
      label="Color scheme"
      // prevents display of camelCased or snake_cased value
      value={
        NIVO_COLOR_SCHEME_DATA.find(({ value }) => value === chartColors)
          ?.label ?? chartColors
      }
    />
  );

  const displayBorderColorInput = (
    <ChartsAndGraphsControlsStacker
      input={createdBorderColorInput}
      label="Border color"
      value={chartBorderColor}
    />
  );

  const displayArcBorderWidthSliderInput = (
    <ChartsAndGraphsControlsStacker
      input={createdArcBorderWidthSliderInput}
      label="Arc border width"
      value={chartBorderWidth}
      symbol="px"
    />
  );

  const displayStyleSection = (
    <Stack w="100%">
      {displayStyleHeading}
      {displayEnableFillPatternsSwitchInput}
      {displayColorSchemeSelectInput}
      {displayBorderColorInput}
      {displayArcBorderWidthSliderInput}
    </Stack>
  );

  /** arc labels */
  const displayArcLabelsHeading = (
    <Group
      w="100%"
      bg={sectionHeadersBgColor}
      p={padding}
      style={{ borderRadius: 4 }}
    >
      <Title order={5}>Arc labels</Title>
    </Group>
  );

  const displayEnableArcLabelsSwitchInput = (
    <Group w="100%" p={padding} style={{ borderBottom: chartBorderColor }}>
      {createdEnableArcLabelsSwitchInput}
    </Group>
  );

  const displayArcLabelsRadiusOffsetSliderInput = (
    <ChartsAndGraphsControlsStacker
      input={createdArcLabelsRadiusOffsetSliderInput}
      label="Radius offset"
      value={arcLabelsRadiusOffset}
      symbol="px"
    />
  );

  const displayArcLabelsSkipAngleSliderInput = (
    <ChartsAndGraphsControlsStacker
      input={createdArcLabelsSkipAngleSliderInput}
      label="Skip angle"
      value={arcLabelsSkipAngle}
      symbol="°"
    />
  );

  const displayArcLabelsHeadingColorInput = (
    <ChartsAndGraphsControlsStacker
      input={createdArcLabelsTextColorInput}
      label="Arc labels text color"
      value={arcLabelsTextColor}
      symbol=""
    />
  );

  const displayArcLabelsSection = (
    <Stack w="100%">
      {displayArcLabelsHeading}
      {displayEnableArcLabelsSwitchInput}
      {displayArcLabelsRadiusOffsetSliderInput}
      {displayArcLabelsSkipAngleSliderInput}
      {displayArcLabelsHeadingColorInput}
    </Stack>
  );

  /** arc link labels */
  const displayArcLinkLabelsHeading = (
    <Group
      w="100%"
      bg={sectionHeadersBgColor}
      p={padding}
      style={{ borderRadius: 4 }}
    >
      <Title order={5}>Arc link labels</Title>
    </Group>
  );

  const displayEnableArcLinkLabelsSwitchInput = (
    <Group w="100%" p={padding} style={{ borderBottom: chartBorderColor }}>
      {createdEnableArcLinkLabelsSwitchInput}
    </Group>
  );

  const displayArcLinkLabelsSkipAngleSliderInput = (
    <ChartsAndGraphsControlsStacker
      input={createdArcLinkLabelsSkipAngleSliderInput}
      label="Skip angle"
      value={arcLinkLabelsSkipAngle}
      symbol="°"
    />
  );

  const displayArcLinkLabelsOffsetSliderInput = (
    <ChartsAndGraphsControlsStacker
      input={createdArcLinkLabelsOffsetSliderInput}
      label="Offset"
      value={arcLinkLabelsOffset}
      symbol="px"
    />
  );

  const displayArcLinkLabelsDiagonalLengthSliderInput = (
    <ChartsAndGraphsControlsStacker
      input={createdArcLinkLabelsDiagonalLengthSliderInput}
      label="Diagonal length"
      value={arcLinkLabelsDiagonalLength}
      symbol="px"
    />
  );

  const displayArcLinkLabelsStraightLengthSliderInput = (
    <ChartsAndGraphsControlsStacker
      input={createdArcLinkLabelsStraightLengthSliderInput}
      label="Straight length"
      value={arcLinkLabelsStraightLength}
      symbol="px"
    />
  );

  const displayArcLinkLabelsHeadingOffsetSliderInput = (
    <ChartsAndGraphsControlsStacker
      input={createdArcLinkLabelsTextOffsetSliderInput}
      label="Text offset"
      value={arcLinkLabelsTextOffset}
      symbol="px"
    />
  );

  const displayArcLinkLabelsThicknessSliderInput = (
    <ChartsAndGraphsControlsStacker
      input={createdArcLinkLabelsThicknessSliderInput}
      label="Thickness"
      value={arcLinkLabelsThickness}
      symbol="px"
    />
  );

  const displayArcLinkLabelsHeadingColorInput = (
    <ChartsAndGraphsControlsStacker
      input={createdArcLinkLabelsTextColorInput}
      label="Arc link labels text color"
      value={arcLinkLabelsTextColor}
      symbol=""
    />
  );

  const displayArcLinkLabelsSection = (
    <Stack w="100%">
      {displayArcLinkLabelsHeading}
      {displayEnableArcLinkLabelsSwitchInput}
      {displayArcLinkLabelsSkipAngleSliderInput}
      {displayArcLinkLabelsOffsetSliderInput}
      {displayArcLinkLabelsDiagonalLengthSliderInput}
      {displayArcLinkLabelsStraightLengthSliderInput}
      {displayArcLinkLabelsHeadingOffsetSliderInput}
      {displayArcLinkLabelsThicknessSliderInput}
      {displayArcLinkLabelsHeadingColorInput}
    </Stack>
  );

  /** interactivity */
  const displayInteractivityHeading = (
    <Group
      w="100%"
      bg={sectionHeadersBgColor}
      p={padding}
      style={{ borderRadius: 4 }}
    >
      <Title order={5}>Interactivity</Title>
    </Group>
  );

  const displayActiveInnerRadiusOffsetSliderInput = (
    <ChartsAndGraphsControlsStacker
      input={createdActiveInnerRadiusOffsetSliderInput}
      label="Active inner radius offset"
      value={activeInnerRadiusOffset}
      symbol="px"
    />
  );

  const displayActiveOuterRadiusOffsetSliderInput = (
    <ChartsAndGraphsControlsStacker
      input={createdActiveOuterRadiusOffsetSliderInput}
      label="Active outer radius offset"
      value={activeOuterRadiusOffset}
      symbol="px"
    />
  );

  const displayInteractivitySection = (
    <Stack w="100%">
      {displayInteractivityHeading}
      {displayActiveInnerRadiusOffsetSliderInput}
      {displayActiveOuterRadiusOffsetSliderInput}
    </Stack>
  );

  /** motion */
  const displayMotionHeading = (
    <Group
      w="100%"
      bg={sectionHeadersBgColor}
      p={padding}
      style={{ borderRadius: 4 }}
    >
      <Title order={5}>Motion</Title>
    </Group>
  );

  const displayAnimateMotionSwitchInput = (
    <Group w="100%" p={padding} style={{ borderBottom: chartBorderColor }}>
      {createdAnimateSwitchInput}
    </Group>
  );

  const displayMotionConfigSelectInput = (
    <ChartsAndGraphsControlsStacker
      input={createdMotionConfigSelectInput}
      label="Motion configuration"
      value={enableAnimate ? motionConfig : 'N/A'}
    />
  );

  const displayTransitionModeSelectInput = (
    <ChartsAndGraphsControlsStacker
      input={createdTransitionModeSelectInput}
      label="Transition mode"
      value={enableAnimate ? transitionMode : 'N/A'}
    />
  );

  const displayMotionSection = (
    <Stack w="100%">
      {displayMotionHeading}
      {displayAnimateMotionSwitchInput}
      {displayMotionConfigSelectInput}
      {displayTransitionModeSelectInput}
    </Stack>
  );

  /** legend */
  const displayLegendHeading = (
    <Group
      w="100%"
      bg={sectionHeadersBgColor}
      p={padding}
      style={{ borderRadius: 4 }}
    >
      <Title order={5}>Legend</Title>
    </Group>
  );

  const displayEnableLegendSwitchInput = (
    <Group w="100%" p={padding} style={{ borderBottom: chartBorderColor }}>
      {createdEnableLegendSwitchInput}
    </Group>
  );

  const displayLegendAnchorSelectInput = (
    <ChartsAndGraphsControlsStacker
      input={createdLegendAnchorSelectInput}
      label="Anchor"
      // prevents display of camelCased or snake_cased value
      value={
        NIVO_LEGEND_ANCHOR_DATA.find(({ value }) => value === legendAnchor)
          ?.label ?? legendAnchor
      }
    />
  );

  const displayLegendDirectionSelectInput = (
    <ChartsAndGraphsControlsStacker
      input={createdLegendDirectionSelectInput}
      label="Direction"
      value={legendDirection}
    />
  );

  const displayEnableLegendJustifySwitchInput = (
    <Group w="100%" p={padding} style={{ borderBottom: chartBorderColor }}>
      {createdEnableLegendJustifySwitchInput}
    </Group>
  );

  const displayLegendTranslateXSliderInput = (
    <ChartsAndGraphsControlsStacker
      input={createdLegendTranslateXSliderInput}
      label="Translate in x-axis"
      value={legendTranslateX}
      symbol="px"
    />
  );

  const displayLegendTranslateYSliderInput = (
    <ChartsAndGraphsControlsStacker
      input={createdLegendTranslateYSliderInput}
      label="Translate in y-axis"
      value={legendTranslateY}
      symbol="px"
    />
  );

  const displayLegendItemsSpacingSliderInput = (
    <ChartsAndGraphsControlsStacker
      input={createdLegendItemsSpacingSliderInput}
      label="Items spacing"
      value={legendItemsSpacing}
      symbol="px"
    />
  );

  const displayLegendItemWidthSliderInput = (
    <ChartsAndGraphsControlsStacker
      input={createdLegendItemWidthSliderInput}
      label="Item width"
      value={legendItemWidth}
      symbol="px"
    />
  );

  const displayLegendItemHeightSliderInput = (
    <ChartsAndGraphsControlsStacker
      input={createdLegendItemHeightSliderInput}
      label="Item height"
      value={legendItemHeight}
      symbol="px"
    />
  );

  const displayLegendItemDirectionSelectInput = (
    <ChartsAndGraphsControlsStacker
      input={createdLegendItemDirectionSelectInput}
      label="Item legendDirection"
      // prevents display of camelCased or snake_cased value
      value={
        NIVO_LEGEND_ITEM_DIRECTION_DATA.find(
          ({ value }) => value === legendItemDirection
        )?.label ?? legendItemDirection
      }
    />
  );

  const displayLegendItemTextColorInput = (
    <ChartsAndGraphsControlsStacker
      input={legendItemTextColorInput}
      label="Item text color"
      value={legendItemTextColor}
      symbol=""
    />
  );

  const displayLegendItemOpacitySliderInput = (
    <ChartsAndGraphsControlsStacker
      input={createdLegendItemOpacitySliderInput}
      label="Item opacity"
      value={(legendItemOpacity * 100).toFixed(0)}
      symbol="%"
    />
  );

  const displayLegendSymbolSizeSliderInput = (
    <ChartsAndGraphsControlsStacker
      input={createdLegendSymbolSizeSliderInput}
      label="Symbol size"
      value={legendSymbolSize}
      symbol="px"
    />
  );

  const displayLegendSymbolShapeSelectInput = (
    <ChartsAndGraphsControlsStacker
      input={createdLegendSymbolShapeSelectInput}
      label="Symbol shape"
      value={legendSymbolShape}
    />
  );

  const displayLegendSection = (
    <Stack w="100%">
      {displayLegendHeading}
      {displayEnableLegendSwitchInput}
      {displayLegendAnchorSelectInput}
      {displayLegendDirectionSelectInput}
      {displayEnableLegendJustifySwitchInput}
      {displayLegendTranslateXSliderInput}
      {displayLegendTranslateYSliderInput}
      {displayLegendItemsSpacingSliderInput}
      {displayLegendItemWidthSliderInput}
      {displayLegendItemHeightSliderInput}
      {displayLegendItemDirectionSelectInput}
      {displayLegendItemTextColorInput}
      {displayLegendItemOpacitySliderInput}
      {displayLegendSymbolSizeSliderInput}
      {displayLegendSymbolShapeSelectInput}
    </Stack>
  );

  /** margin */
  const displayMarginHeading = (
    <Group
      w="100%"
      bg={sectionHeadersBgColor}
      p={padding}
      style={{ borderRadius: 4 }}
    >
      <Title order={5}>Margin</Title>
    </Group>
  );

  const displayMarginBottomSliderInput = (
    <ChartsAndGraphsControlsStacker
      input={createdMarginBottomSliderInput}
      label="Bottom"
      value={marginBottom}
      symbol="px"
    />
  );

  const displayMarginLeftSliderInput = (
    <ChartsAndGraphsControlsStacker
      input={createdMarginLeftSliderInput}
      label="Left"
      value={marginLeft}
      symbol="px"
    />
  );

  const displayMarginRightSliderInput = (
    <ChartsAndGraphsControlsStacker
      input={createdMarginRightSliderInput}
      label="Right"
      value={marginRight}
      symbol="px"
    />
  );

  const displayMarginTopSliderInput = (
    <ChartsAndGraphsControlsStacker
      input={createdMarginTopSliderInput}
      label="Top"
      value={marginTop}
      symbol="px"
    />
  );

  const displayMarginSection = (
    <Stack w="100%">
      {displayMarginHeading}
      {displayMarginRightSliderInput}
      {displayMarginTopSliderInput}
      {displayMarginLeftSliderInput}
      {displayMarginBottomSliderInput}
    </Stack>
  );

  const pieChartControlsStack = (
    <Stack w="100%">
      {displayBaseSection}
      {displayStyleSection}
      {displayArcLabelsSection}
      {displayArcLinkLabelsSection}
      {displayInteractivitySection}
      {displayMotionSection}
      {displayMarginSection}
      {displayLegendSection}
    </Stack>
  );

  /** pie chart controls */
  const displayPieChartControls = (
    <ScrollArea styles={() => scrollBarStyle} offsetScrollbars>
      <Grid columns={1} h={width < 1192 ? '38vh' : '70vh'} py={padding}>
        <Grid.Col span={1}>{pieChartControlsStack}</Grid.Col>
      </Grid>
    </ScrollArea>
  );

  const displayResponsivePie = (
    <ResponsivePie
      data={pieChartData}
      // base
      margin={{
        top: marginTop,
        right: marginRight,
        bottom: marginBottom,
        left: marginLeft,
      }}
      startAngle={startAngle}
      endAngle={endAngle}
      innerRadius={innerRadius}
      padAngle={padAngle}
      cornerRadius={cornerRadius}
      sortByValue={sortByValue}
      // style
      colors={{ scheme: chartColors }}
      borderColor={chartBorderColor}
      borderWidth={chartBorderWidth}
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
      animate={enableAnimate}
      motionConfig={motionConfig}
      transitionMode={transitionMode}
      defs={CHART_PATTERN_DEFS}
      fill={enableFillPatterns ? fillPatterns : []}
      legends={
        enableLegend
          ? [
              {
                anchor: legendAnchor,
                direction: legendDirection,
                justify: legendJustify,
                translateX: legendTranslateX,
                translateY: legendTranslateY,
                itemsSpacing: legendItemsSpacing,
                itemWidth: legendItemWidth,
                itemHeight: legendItemHeight,
                itemTextColor: legendItemTextColor,
                itemDirection: legendItemDirection,
                itemOpacity: legendItemOpacity,
                symbolSize: legendSymbolSize,
                symbolShape: legendSymbolShape,
                effects: [
                  {
                    on: 'hover',
                    style: {
                      itemTextColor: '#000',
                    },
                  },
                ],
              },
            ]
          : []
      }
    />
  );

  const displayResponsivePieChartComponent = (
    <Grid columns={width < 1192 ? 1 : 15} w="100%" h="70vh">
      <Grid.Col span={width < 1192 ? 1 : 5} h={width < 1192 ? '38vh' : '70vh'}>
        {displayPieChartControls}
      </Grid.Col>

      {/* because only column spacing is allowed in grid */}
      <Grid.Col span={1}>
        {width < 1192 ? <Space h="md" /> : <Space w="md" />}
        <Divider
          orientation={width < 1192 ? 'horizontal' : 'vertical'}
          size="sm"
          w="100%"
          h="100%"
        />
      </Grid.Col>

      <Grid.Col span={width < 1192 ? 1 : 9} h="100%">
        {displayResponsivePie}
      </Grid.Col>
    </Grid>
  );

  /** ------------- end display ------------- */

  return displayResponsivePieChartComponent;
}

export { ResponsivePieChart };
