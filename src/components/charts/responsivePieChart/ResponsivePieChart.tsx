import {
  ColorInput,
  Divider,
  Flex,
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
import {
  NIVO_CHART_PATTERN_DEFS,
  NIVO_COLOR_SCHEME_DATA,
  NIVO_LEGEND_ANCHOR_DATA,
  NIVO_LEGEND_DIRECTION_DATA,
  NIVO_LEGEND_ITEM_DIRECTION_DATA,
  NIVO_LEGEND_SYMBOL_SHAPE_DATA,
  NIVO_MOTION_CONFIG_DATA,
  NIVO_TRANSITION_MODE_DATA,
} from '../constants';
import { ChartsAndGraphsControlsStacker } from '../utils';
import {
  initialResponsivePieChartState,
  responsivePieChartAction,
  responsivePieChartReducer,
} from './state';
import {
  FillPatternObject,
  NivoLegendAnchor,
  NivoLegendDirection,
  NivoLegendItemDirection,
  NivoLegendSymbolShape,
  NivoColorScheme,
  NivoMotionConfig,
  NivoTransitionMode,
  ResponsivePieChartProps,
} from './types';

function ResponsivePieChart({ pieChartData }: ResponsivePieChartProps) {
  /** ------------- begin hooks ------------- */
  const {
    globalState: { padding, width, themeObject, isPrefersReducedMotion },
  } = useGlobalState();

  const {
    tablesThemeColors: { tableHeadersBgColor: sectionHeadersBgColor },
    generalColors: { chartTextColor, textColor, grayColorShade },
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
    arcBorderColor, // default: #ffffff
    arcBorderWidth, // 0px - 20px default: 0 step: 1

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
    semanticName: 'animate',
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

  // legend justify description texts
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
      label={
        <Text weight={500} color={textColor}>
          Sort by value
        </Text>
      }
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
      color={arcBorderColor}
      onChange={(color: string) => {
        responsivePieChartDispatch({
          type: responsivePieChartAction.setArcBorderColor,
          payload: color,
        });
      }}
      value={arcBorderColor}
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
      label={
        <Text weight={500} color={textColor}>
          Fill patterns
        </Text>
      }
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
          type: responsivePieChartAction.setArcBorderWidth,
          payload: value,
        });
      },
      sliderDefaultValue: 0,
      step: 1,
      value: arcBorderWidth,
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
      label={
        <Text weight={500} color={textColor}>
          Arc labels
        </Text>
      }
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
      label={
        <Text weight={500} color={textColor}>
          Arc link labels
        </Text>
      }
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
      label={
        <Text weight={500} color={textColor}>
          Animate
        </Text>
      }
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
      label={
        <Text weight={500} color={textColor}>
          Legend
        </Text>
      }
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
        type: responsivePieChartAction.setNivoLegendAnchor,
        payload: event.currentTarget.value as NivoLegendAnchor,
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
          payload: event.currentTarget.value as NivoLegendDirection,
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
        legendJustify
          ? enableLegendJustifyAccessibleSelectedText
          : enableLegendJustifyAccessibleDeselectedText
      }
      label={
        <Text weight={500} color={enableLegend ? textColor : grayColorShade}>
          Justify
        </Text>
      }
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
          payload: event.currentTarget.value as NivoLegendItemDirection,
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
          payload: event.currentTarget.value as NivoLegendSymbolShape,
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
    createdNivoLegendAnchorSelectInput,
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
      bg={sectionHeadersBgColor}
      p={padding}
      style={{ borderRadius: 4 }}
      w="100%"
    >
      <Title order={5} color={textColor}>
        Base
      </Title>
    </Group>
  );

  const displayStartAngleSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedInitialResponsivePieChartState}
      input={createdStartAngleSliderInput}
      label="Start angle"
      symbol="°"
      value={startAngle}
    />
  );

  const displayEndAngleSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedInitialResponsivePieChartState}
      input={createdEndAngleSliderInput}
      label="End angle"
      symbol="°"
      value={endAngle}
    />
  );

  const displayInnerRadiusSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedInitialResponsivePieChartState}
      input={createdInnerRadiusSliderInput}
      label="Inner radius"
      symbol="px"
      value={innerRadius}
    />
  );

  const displayPadAngleSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedInitialResponsivePieChartState}
      input={createdPadAngleSliderInput}
      label="Pad angle"
      symbol="°"
      value={padAngle}
    />
  );

  const displayCornerRadiusSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedInitialResponsivePieChartState}
      input={createdCornerRadiusSliderInput}
      label="Corner radius"
      symbol="px"
      value={cornerRadius}
    />
  );

  const displaySortByValueSwitchInput = (
    <Group w="100%" p={padding} style={{ borderBottom: arcBorderColor }}>
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
      style={{ borderRadius: 4 }}
      p={padding}
      bg={sectionHeadersBgColor}
    >
      <Title order={5} color={textColor}>
        Style
      </Title>
    </Group>
  );

  const displayEnableFillPatternsSwitchInput = (
    <Group w="100%" p={padding} style={{ borderBottom: arcBorderColor }}>
      {createdEnableFillPatternsSwitchInput}
    </Group>
  );

  const displayColorSchemeSelectInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedInitialResponsivePieChartState}
      input={createdColorSchemeSelectInput}
      label="Chart colors"
      // prevents display of camelCased or snake_cased value
      value={
        NIVO_COLOR_SCHEME_DATA.find(({ value }) => value === chartColors)
          ?.label ?? chartColors
      }
    />
  );

  const displayBorderColorInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedInitialResponsivePieChartState}
      input={createdBorderColorInput}
      label="Arc Border color"
      value={arcBorderColor}
    />
  );

  const displayArcBorderWidthSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedInitialResponsivePieChartState}
      input={createdArcBorderWidthSliderInput}
      label="Arc border width"
      symbol="px"
      value={arcBorderWidth}
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
      bg={sectionHeadersBgColor}
      p={padding}
      style={{ borderRadius: 4 }}
      w="100%"
    >
      <Title order={5} color={textColor}>
        Arc labels
      </Title>
    </Group>
  );

  const displayEnableArcLabelsSwitchInput = (
    <Group w="100%" p={padding} style={{ borderBottom: arcBorderColor }}>
      {createdEnableArcLabelsSwitchInput}
    </Group>
  );

  const displayArcLabelsRadiusOffsetSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedInitialResponsivePieChartState}
      input={createdArcLabelsRadiusOffsetSliderInput}
      isInputDisabled={!enableArcLabels}
      label="Arc labels radius offset"
      symbol="px"
      value={arcLabelsRadiusOffset}
    />
  );

  const displayArcLabelsSkipAngleSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedInitialResponsivePieChartState}
      input={createdArcLabelsSkipAngleSliderInput}
      isInputDisabled={!enableArcLabels}
      label="Arc labels skip angle"
      symbol="°"
      value={arcLabelsSkipAngle}
    />
  );

  const displayArcLabelsHeadingColorInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedInitialResponsivePieChartState}
      input={createdArcLabelsTextColorInput}
      isInputDisabled={!enableArcLabels}
      label="Arc labels text color"
      symbol=""
      value={arcLabelsTextColor}
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
      bg={sectionHeadersBgColor}
      p={padding}
      style={{ borderRadius: 4 }}
      w="100%"
    >
      <Title order={5} color={textColor}>
        Arc link labels
      </Title>
    </Group>
  );

  const displayEnableArcLinkLabelsSwitchInput = (
    <Group w="100%" p={padding} style={{ borderBottom: arcBorderColor }}>
      {createdEnableArcLinkLabelsSwitchInput}
    </Group>
  );

  const displayArcLinkLabelsSkipAngleSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedInitialResponsivePieChartState}
      input={createdArcLinkLabelsSkipAngleSliderInput}
      isInputDisabled={!enableArcLinkLabels}
      label="Arc link labels skip angle"
      symbol="°"
      value={arcLinkLabelsSkipAngle}
    />
  );

  const displayArcLinkLabelsOffsetSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedInitialResponsivePieChartState}
      input={createdArcLinkLabelsOffsetSliderInput}
      isInputDisabled={!enableArcLinkLabels}
      label="Arc link labels offset"
      symbol="px"
      value={arcLinkLabelsOffset}
    />
  );

  const displayArcLinkLabelsDiagonalLengthSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedInitialResponsivePieChartState}
      input={createdArcLinkLabelsDiagonalLengthSliderInput}
      isInputDisabled={!enableArcLinkLabels}
      label="Arc link labels diagonal length"
      symbol="px"
      value={arcLinkLabelsDiagonalLength}
    />
  );

  const displayArcLinkLabelsStraightLengthSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedInitialResponsivePieChartState}
      input={createdArcLinkLabelsStraightLengthSliderInput}
      isInputDisabled={!enableArcLinkLabels}
      label="Arc link labels straight length"
      symbol="px"
      value={arcLinkLabelsStraightLength}
    />
  );

  const displayArcLinkLabelsHeadingOffsetSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedInitialResponsivePieChartState}
      input={createdArcLinkLabelsTextOffsetSliderInput}
      isInputDisabled={!enableArcLinkLabels}
      label="Arc link labels text offset"
      symbol="px"
      value={arcLinkLabelsTextOffset}
    />
  );

  const displayArcLinkLabelsThicknessSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedInitialResponsivePieChartState}
      input={createdArcLinkLabelsThicknessSliderInput}
      isInputDisabled={!enableArcLinkLabels}
      label="Arc link labels thickness"
      symbol="px"
      value={arcLinkLabelsThickness}
    />
  );

  const displayArcLinkLabelsHeadingColorInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedInitialResponsivePieChartState}
      input={createdArcLinkLabelsTextColorInput}
      isInputDisabled={!enableArcLinkLabels}
      label="Arc link labels text color"
      value={arcLinkLabelsTextColor}
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
      <Title order={5} color={textColor}>
        Interactivity
      </Title>
    </Group>
  );

  const displayActiveInnerRadiusOffsetSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedInitialResponsivePieChartState}
      input={createdActiveInnerRadiusOffsetSliderInput}
      label="Active inner radius offset"
      value={activeInnerRadiusOffset}
      symbol="px"
    />
  );

  const displayActiveOuterRadiusOffsetSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedInitialResponsivePieChartState}
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
      bg={sectionHeadersBgColor}
      p={padding}
      style={{ borderRadius: 4 }}
      w="100%"
    >
      <Title order={5} color={textColor}>
        Motion
      </Title>
    </Group>
  );

  const displayAnimateMotionSwitchInput = (
    <Group w="100%" p={padding} style={{ borderBottom: arcBorderColor }}>
      {createdAnimateSwitchInput}
    </Group>
  );

  const displayMotionConfigSelectInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedInitialResponsivePieChartState}
      input={createdMotionConfigSelectInput}
      isInputDisabled={!enableAnimate}
      label="Motion config"
      value={motionConfig}
    />
  );

  const displayTransitionModeSelectInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedInitialResponsivePieChartState}
      input={createdTransitionModeSelectInput}
      isInputDisabled={!enableAnimate}
      label="Transition mode"
      value={transitionMode}
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

  /** margin */
  const displayMarginHeading = (
    <Group
      bg={sectionHeadersBgColor}
      p={padding}
      style={{ borderRadius: 4 }}
      w="100%"
    >
      <Title order={5} color={textColor}>
        Margin
      </Title>
    </Group>
  );

  const displayMarginBottomSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedInitialResponsivePieChartState}
      input={createdMarginBottomSliderInput}
      label="Margin bottom"
      symbol="px"
      value={marginBottom}
    />
  );

  const displayMarginLeftSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedInitialResponsivePieChartState}
      input={createdMarginLeftSliderInput}
      label="Margin left"
      symbol="px"
      value={marginLeft}
    />
  );

  const displayMarginRightSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedInitialResponsivePieChartState}
      input={createdMarginRightSliderInput}
      label="Margin right"
      symbol="px"
      value={marginRight}
    />
  );

  const displayMarginTopSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedInitialResponsivePieChartState}
      input={createdMarginTopSliderInput}
      label="Margin top"
      symbol="px"
      value={marginTop}
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

  /** legend */
  const displayLegendHeading = (
    <Group
      bg={sectionHeadersBgColor}
      p={padding}
      style={{ borderRadius: 4 }}
      w="100%"
    >
      <Title order={5} color={textColor}>
        Legend
      </Title>
    </Group>
  );

  const displayEnableLegendSwitchInput = (
    <Group w="100%" p={padding} style={{ borderBottom: arcBorderColor }}>
      {createdEnableLegendSwitchInput}
    </Group>
  );

  const displayNivoLegendAnchorSelectInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedInitialResponsivePieChartState}
      input={createdNivoLegendAnchorSelectInput}
      isInputDisabled={!enableLegend}
      label="Legend anchor"
      // prevents display of camelCased or snake_cased value
      value={
        NIVO_LEGEND_ANCHOR_DATA.find(({ value }) => value === legendAnchor)
          ?.label ?? legendAnchor
      }
    />
  );

  const displayLegendDirectionSelectInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedInitialResponsivePieChartState}
      input={createdLegendDirectionSelectInput}
      isInputDisabled={!enableLegend}
      label="Legend direction"
      value={legendDirection}
    />
  );

  const displayEnableLegendJustifySwitchInput = (
    <Group w="100%" p={padding} style={{ borderBottom: arcBorderColor }}>
      {createdEnableLegendJustifySwitchInput}
    </Group>
  );

  const displayLegendTranslateXSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedInitialResponsivePieChartState}
      input={createdLegendTranslateXSliderInput}
      isInputDisabled={!enableLegend}
      label="Legend translate x"
      value={legendTranslateX}
      symbol="px"
    />
  );

  const displayLegendTranslateYSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedInitialResponsivePieChartState}
      input={createdLegendTranslateYSliderInput}
      isInputDisabled={!enableLegend}
      label="Legend translate y"
      symbol="px"
      value={legendTranslateY}
    />
  );

  const displayLegendItemsSpacingSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedInitialResponsivePieChartState}
      input={createdLegendItemsSpacingSliderInput}
      isInputDisabled={!enableLegend}
      label="Legend items spacing"
      symbol="px"
      value={legendItemsSpacing}
    />
  );

  const displayLegendItemWidthSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedInitialResponsivePieChartState}
      input={createdLegendItemWidthSliderInput}
      isInputDisabled={!enableLegend}
      label="Legend item width"
      symbol="px"
      value={legendItemWidth}
    />
  );

  const displayLegendItemHeightSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedInitialResponsivePieChartState}
      input={createdLegendItemHeightSliderInput}
      isInputDisabled={!enableLegend}
      label="Legend item height"
      symbol="px"
      value={legendItemHeight}
    />
  );

  const displayLegendItemDirectionSelectInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedInitialResponsivePieChartState}
      input={createdLegendItemDirectionSelectInput}
      isInputDisabled={!enableLegend}
      label="Legend item direction"
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
      initialChartState={modifiedInitialResponsivePieChartState}
      input={legendItemTextColorInput}
      isInputDisabled={!enableLegend}
      label="Legend item text color"
      symbol=""
      value={legendItemTextColor}
    />
  );

  const displayLegendItemOpacitySliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedInitialResponsivePieChartState}
      input={createdLegendItemOpacitySliderInput}
      isInputDisabled={!enableLegend}
      label="Legend item opacity"
      symbol="%"
      value={(legendItemOpacity * 100).toFixed(0)}
    />
  );

  const displayLegendSymbolSizeSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedInitialResponsivePieChartState}
      input={createdLegendSymbolSizeSliderInput}
      isInputDisabled={!enableLegend}
      label="Legend symbol size"
      symbol="px"
      value={legendSymbolSize}
    />
  );

  const displayLegendSymbolShapeSelectInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={modifiedInitialResponsivePieChartState}
      input={createdLegendSymbolShapeSelectInput}
      isInputDisabled={!enableLegend}
      label="Legend symbol shape"
      value={legendSymbolShape}
    />
  );

  const displayLegendSection = (
    <Stack w="100%">
      {displayLegendHeading}
      {displayEnableLegendSwitchInput}
      {displayNivoLegendAnchorSelectInput}
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

  const pieChartControlsStack = (
    <Flex w="100%" direction="column">
      {displayBaseSection}
      {displayStyleSection}
      {displayArcLabelsSection}
      {displayArcLinkLabelsSection}
      {displayInteractivitySection}
      {displayMotionSection}
      {displayMarginSection}
      {displayLegendSection}
    </Flex>
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
      borderColor={arcBorderColor}
      borderWidth={arcBorderWidth}
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
      defs={NIVO_CHART_PATTERN_DEFS}
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
