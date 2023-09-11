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

import { useGlobalState } from '../../../hooks';
import {
  AccessibleSelectedDeselectedTextElements,
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
  NIVO_LEGEND_ANCHOR_DATA,
  NIVO_LEGEND_DIRECTION_DATA,
  NIVO_LEGEND_ITEM_DIRECTION_DATA,
  NIVO_LEGEND_SYMBOL_SHAPE_DATA,
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
  LegendAnchor,
  LegendDirection,
  LegendItemDirection,
  LegendSymbolShape,
  NivoColorScheme,
  NivoMotionConfig,
  NivoTransitionMode,
  ResponsivePieChartProps,
} from './types';
import { ChartsGraphsControlsStacker } from './utils';
import { COLORS_SWATCHES } from '../../../constants/data';

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

    marginBottom, // 0px - 60px default: 60 step: 1
    marginLeft, // 0px - 60px default: 60 step: 1
    marginRight, // 0px - 60px default: 60 step: 1
    marginTop, // 0px - 60px default: 60 step: 1

    enableLegend, // default: true
    anchor, // default: bottom
    direction, // default: row
    justify, // default: false
    translateX, // -200px - 200px default: 0 step: 1
    translateY, // -200px - 200px default: 0 step: 1
    itemsSpacing, // 0px - 60px default: 0 step: 1
    itemWidth, // 10px - 200px default: 60 step: 1
    itemHeight, // 10px - 200px default: 20 step: 1
    itemDirection, // default: left-to-right
    itemTextColor, // default: #000000
    itemOpacity, // 0 - 1 default: 1 step: 0.05
    symbolSize, // 2px - 60px default: 12 step: 1
    symbolShape, // default: circle
  } = responsivePieChartState;

  const {
    globalState: {
      padding,
      width,
      themeObject: { colorScheme: appColorScheme, primaryColor, primaryShade },
    },
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
  ] = AccessibleSelectedDeselectedTextElements({
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
  ] = AccessibleSelectedDeselectedTextElements({
    isSelected: enableFillPatterns,
    semanticName: 'fill patterns',
    deselectedDescription: 'Fill patterns will not be displayed.',
    selectedDescription: 'Fill patterns will be displayed.',
    theme: 'muted',
  });

  const [
    enableArcLabelsAccessibleSelectedText,
    enableArcLabelsAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    isSelected: enableArcLabels,
    semanticName: 'arc labels',
    deselectedDescription: 'Arc labels will not be displayed.',
    selectedDescription: 'Arc labels will be displayed.',
    theme: 'muted',
  });

  const [
    enableArcLinkLabelsAccessibleSelectedText,
    enableArcLinkLabelsAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    isSelected: enableArcLinkLabels,
    semanticName: 'arc link labels',
    deselectedDescription: 'Arc link labels will not be displayed..',
    selectedDescription: 'Arc link labels will be displayed.',
    theme: 'muted',
  });

  const [animateAccessibleSelectedText, animateAccessibleDeselectedText] =
    AccessibleSelectedDeselectedTextElements({
      isSelected: animate,
      semanticName: 'animate',
      deselectedDescription: 'Transitions will be disabled.',
      selectedDescription: 'Transitions will be enabled.',
      theme: 'muted',
    });

  const [
    enableLegendAccessibleSelectedText,
    enableLegendAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    isSelected: enableLegend,
    semanticName: 'legend',
    deselectedDescription: 'Legend will not be displayed.',
    selectedDescription: 'Legend will be displayed.',
    theme: 'muted',
  });

  // legend justify description texts
  const [
    enableLegendJustifyAccessibleSelectedText,
    enableLegendJustifyAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    isSelected: justify,
    semanticName: 'justify',
    deselectedDescription: 'Legend symbol and label will not be justified.',
    selectedDescription: 'Legend symbol and label will be justified.',
    theme: 'muted',
  });
  /** ------------- end accessible description texts ------------- */

  /** ------------- begin input objects ------------- */
  const { dark, gray } = COLORS_SWATCHES;

  /** ------------- begin base ------------- */
  const sliderWidth =
    width < 480
      ? '217px'
      : width < 768
      ? `${width * 0.38}px`
      : width < 1192
      ? '500px'
      : `${width * 0.15}px`;
  const sliderLabelColor = gray[2];

  const startAngleSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo = {
    kind: 'slider',
    ariaLabel: 'start angle',
    label: (value) => (
      <Text style={{ color: sliderLabelColor }}>{value} °</Text>
    ),
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
    width: sliderWidth,
  };

  const endAngleSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo = {
    kind: 'slider',
    label: (value) => (
      <Text style={{ color: sliderLabelColor }}>{value} °</Text>
    ),
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
    width: sliderWidth,
  };

  const innerRadiusSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo = {
    kind: 'slider',
    label: (value) => (
      <Text style={{ color: sliderLabelColor }}>{value} px</Text>
    ),
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
    width: sliderWidth,
  };

  const padAngleSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo = {
    kind: 'slider',
    label: (value) => (
      <Text style={{ color: sliderLabelColor }}>{value} °</Text>
    ),
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
    width: sliderWidth,
  };

  const cornerRadiusSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo = {
    kind: 'slider',
    label: (value) => (
      <Text style={{ color: sliderLabelColor }}>{value} px</Text>
    ),
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
    width: sliderWidth,
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
      label={
        <TextWrapper creatorInfoObj={{ size: 'md' }}>Sort by value</TextWrapper>
      }
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
    onChange: (event: ChangeEvent<HTMLSelectElement>) => {
      responsivePieChartDispatch({
        type: responsivePieChartAction.setColorScheme,
        payload: event.currentTarget.value as NivoColorScheme,
      });
    },
    value: colorScheme,
    width: sliderWidth,
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
      w={sliderWidth}
      value={borderColor}
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
        <TextWrapper creatorInfoObj={{ size: 'md' }}>Fill patterns</TextWrapper>
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
    label: (value) => (
      <Text style={{ color: sliderLabelColor }}>{value} px</Text>
    ),
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
    width: sliderWidth,
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
      label={
        <TextWrapper creatorInfoObj={{ size: 'md' }}>Arc labels</TextWrapper>
      }
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
      ariaLabel: 'arc labels radius offset',
      disabled: !enableArcLabels,
      kind: 'slider',
      label: (value) => (
        <Text style={{ color: sliderLabelColor }}>{value} px</Text>
      ),
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
      step: 1,
      value: arcLabelsSkipAngle,
      onChangeSlider: (value: number) => {
        responsivePieChartDispatch({
          type: responsivePieChartAction.setArcLabelsSkipAngle,
          payload: value,
        });
      },
      sliderDefaultValue: 0,
      width: sliderWidth,
    };

  const createdArcLabelsTextColorInput = (
    <ColorInput
      aria-label="Arc labels text color"
      disabled={!enableArcLabels}
      value={arcLabelsTextColor}
      onChange={(color: string) => {
        responsivePieChartDispatch({
          type: responsivePieChartAction.setArcLabelsTextColor,
          payload: color,
        });
      }}
      w={sliderWidth}
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
        <TextWrapper creatorInfoObj={{ size: 'md' }}>
          Arc link labels
        </TextWrapper>
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
      ariaLabel: 'arc link labels skip angle',
      disabled: !enableArcLinkLabels,
      kind: 'slider',
      label: (value) => (
        <Text style={{ color: sliderLabelColor }}>{value} °</Text>
      ),
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
      step: 1,
      value: arcLinkLabelsOffset,
      onChangeSlider: (value: number) => {
        responsivePieChartDispatch({
          type: responsivePieChartAction.setArcLinkLabelsOffset,
          payload: value,
        });
      },
      sliderDefaultValue: 0,
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
      step: 1,
      value: arcLinkLabelsDiagonalLength,
      onChangeSlider: (value: number) => {
        responsivePieChartDispatch({
          type: responsivePieChartAction.setArcLinkLabelsDiagonalLength,
          payload: value,
        });
      },
      sliderDefaultValue: 16,
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
      step: 1,
      value: arcLinkLabelsStraightLength,
      onChangeSlider: (value: number) => {
        responsivePieChartDispatch({
          type: responsivePieChartAction.setArcLinkLabelsStraightLength,
          payload: value,
        });
      },
      sliderDefaultValue: 24,
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
      step: 1,
      value: arcLinkLabelsTextOffset,
      onChangeSlider: (value: number) => {
        responsivePieChartDispatch({
          type: responsivePieChartAction.setArcLinkLabelsTextOffset,
          payload: value,
        });
      },
      sliderDefaultValue: 6,
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
      step: 1,
      value: arcLinkLabelsThickness,
      onChangeSlider: (value: number) => {
        responsivePieChartDispatch({
          type: responsivePieChartAction.setArcLinkLabelsThickness,
          payload: value,
        });
      },
      sliderDefaultValue: 1,
      width: sliderWidth,
    };

  const createdArcLinkLabelsTextColorInput = (
    <ColorInput
      aria-label="arc link labels text color"
      disabled={!enableArcLinkLabels}
      value={arcLinkLabelsTextColor}
      onChange={(color: string) => {
        responsivePieChartDispatch({
          type: responsivePieChartAction.setArcLinkLabelsTextColor,
          payload: color,
        });
      }}
      w={sliderWidth}
    />
  );
  /** ------------- end arc link labels ------------- */

  /** ------------- begin interactivity ------------- */
  const activeInnerRadiusOffsetSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo =
    {
      kind: 'slider',
      label: (value) => (
        <Text style={{ color: sliderLabelColor }}>{value} px</Text>
      ),
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
      width: sliderWidth,
    };

  const activeOuterRadiusOffsetSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo =
    {
      kind: 'slider',
      label: (value) => (
        <Text style={{ color: sliderLabelColor }}>{value} px</Text>
      ),
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
      width: sliderWidth,
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
      label={<TextWrapper creatorInfoObj={{ size: 'md' }}>Animate</TextWrapper>}
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
    disabled: !animate,
    value: motionConfig,
    onChange: (event: ChangeEvent<HTMLSelectElement>) => {
      responsivePieChartDispatch({
        type: responsivePieChartAction.setMotionConfig,
        payload: event.currentTarget.value as NivoMotionConfig,
      });
    },
    width: sliderWidth,
  };

  const transitionModeSelectInputCreatorInfo: AccessibleSelectInputCreatorInfo =
    {
      data: NIVO_TRANSITION_MODE_DATA,
      description: 'Define how transitions behave.',
      disabled: !animate,
      value: transitionMode,
      onChange: (event: ChangeEvent<HTMLSelectElement>) => {
        responsivePieChartDispatch({
          type: responsivePieChartAction.setTransitionMode,
          payload: event.currentTarget.value as NivoTransitionMode,
        });
      },
      width: sliderWidth,
    };
  /** ------------- end motion ------------- */

  /** ------------- begin margin ------------- */
  const marginBottomSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo = {
    kind: 'slider',
    label: (value) => (
      <Text style={{ color: sliderLabelColor }}>{value} px</Text>
    ),
    ariaLabel: 'margin bottom',
    max: 300,
    min: 0,
    step: 1,
    value: marginBottom,
    onChangeSlider: (value: number) => {
      responsivePieChartDispatch({
        type: responsivePieChartAction.setMarginBottom,
        payload: value,
      });
    },
    sliderDefaultValue: 80,
    width: sliderWidth,
  };

  const marginLeftSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo = {
    kind: 'slider',
    label: (value) => (
      <Text style={{ color: sliderLabelColor }}>{value} px</Text>
    ),
    ariaLabel: 'margin left',
    max: 300,
    min: 0,
    step: 1,
    value: marginLeft,
    onChangeSlider: (value: number) => {
      responsivePieChartDispatch({
        type: responsivePieChartAction.setMarginLeft,
        payload: value,
      });
    },
    sliderDefaultValue: 150,
    width: sliderWidth,
  };

  const marginRightSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo = {
    kind: 'slider',
    label: (value) => (
      <Text style={{ color: sliderLabelColor }}>{value} px</Text>
    ),
    ariaLabel: 'margin right',
    max: 300,
    min: 0,
    step: 1,
    value: marginRight,
    onChangeSlider: (value: number) => {
      responsivePieChartDispatch({
        type: responsivePieChartAction.setMarginRight,
        payload: value,
      });
    },
    sliderDefaultValue: 150,
    width: sliderWidth,
  };

  const marginTopSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo = {
    kind: 'slider',
    label: (value) => (
      <Text style={{ color: sliderLabelColor }}>{value} px</Text>
    ),
    ariaLabel: 'margin top',
    max: 300,
    min: 0,
    step: 1,
    value: marginTop,
    onChangeSlider: (value: number) => {
      responsivePieChartDispatch({
        type: responsivePieChartAction.setMarginTop,
        payload: value,
      });
    },
    sliderDefaultValue: 80,
    width: sliderWidth,
  };
  /** ------------- end margin ------------- */

  /** ------------- begin legend ------------- */
  const createdEnableLegendSwitchInput = (
    <Switch
      description={
        enableLegend
          ? enableLegendAccessibleSelectedText
          : enableLegendAccessibleDeselectedText
      }
      aria-describedby={
        enableLegend
          ? enableLegendAccessibleSelectedText.props.id
          : enableLegendAccessibleDeselectedText.props.id
      }
      label={<TextWrapper creatorInfoObj={{ size: 'md' }}>Legend</TextWrapper>}
      checked={enableLegend}
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
    description: "Defines legend anchor relative to chart's viewport.",
    disabled: !enableLegend,
    onChange: (event: ChangeEvent<HTMLSelectElement>) => {
      responsivePieChartDispatch({
        type: responsivePieChartAction.setAnchor,
        payload: event.currentTarget.value as LegendAnchor,
      });
    },
    value: anchor,
    width: sliderWidth,
  };

  const legendDirectionSelectInputCreatorInfo: AccessibleSelectInputCreatorInfo =
    {
      data: NIVO_LEGEND_DIRECTION_DATA,
      description: 'Defines legend direction.',
      disabled: !enableLegend,
      onChange: (event: ChangeEvent<HTMLSelectElement>) => {
        responsivePieChartDispatch({
          type: responsivePieChartAction.setDirection,
          payload: event.currentTarget.value as LegendDirection,
        });
      },
      value: direction,
      width: sliderWidth,
    };

  const createdEnableLegendJustifySwitchInput = (
    <Switch
      disabled={!enableLegend}
      description={
        enableLegend ? (
          justify ? (
            enableLegendJustifyAccessibleSelectedText
          ) : (
            enableLegendJustifyAccessibleDeselectedText
          )
        ) : (
          <Text>Enable legend to modify justify.</Text>
        )
      }
      aria-describedby={
        justify
          ? enableLegendJustifyAccessibleSelectedText.props.id
          : enableLegendJustifyAccessibleDeselectedText.props.id
      }
      label={<TextWrapper creatorInfoObj={{ size: 'md' }}>Justify</TextWrapper>}
      checked={justify}
      onChange={(event: ChangeEvent<HTMLInputElement>) => {
        responsivePieChartDispatch({
          type: responsivePieChartAction.setJustify,
          payload: event.currentTarget.checked,
        });
      }}
      w="100%"
    />
  );

  const legendTranslateXSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo =
    {
      ariaLabel: 'Translate legend in x-axis: horizontal direction',
      disabled: !enableLegend,
      kind: 'slider',
      label: (value) => (
        <Text style={{ color: sliderLabelColor }}>{value} px</Text>
      ),
      max: 200,
      min: -200,
      step: 1,
      value: translateX,
      onChangeSlider: (value: number) => {
        responsivePieChartDispatch({
          type: responsivePieChartAction.setTranslateX,
          payload: value,
        });
      },
      sliderDefaultValue: 0,
      width: sliderWidth,
    };

  const legendTranslateYSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo =
    {
      ariaLabel: 'Translate legend in y-axis: vertical direction',
      disabled: !enableLegend,
      kind: 'slider',
      label: (value) => (
        <Text style={{ color: sliderLabelColor }}>{value} px</Text>
      ),
      max: 200,
      min: -200,
      step: 1,
      value: translateY,
      onChangeSlider: (value: number) => {
        responsivePieChartDispatch({
          type: responsivePieChartAction.setTranslateY,
          payload: value,
        });
      },
      sliderDefaultValue: 0,
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
      step: 1,
      value: itemsSpacing,
      onChangeSlider: (value: number) => {
        responsivePieChartDispatch({
          type: responsivePieChartAction.setItemsSpacing,
          payload: value,
        });
      },
      sliderDefaultValue: 0,
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
      step: 1,
      value: itemWidth,
      onChangeSlider: (value: number) => {
        responsivePieChartDispatch({
          type: responsivePieChartAction.setItemWidth,
          payload: value,
        });
      },
      sliderDefaultValue: 60,
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
      step: 1,
      value: itemHeight,
      onChangeSlider: (value: number) => {
        responsivePieChartDispatch({
          type: responsivePieChartAction.setItemHeight,
          payload: value,
        });
      },
      sliderDefaultValue: 20,
      width: sliderWidth,
    };

  const legendItemDirectionSelectInputCreatorInfo: AccessibleSelectInputCreatorInfo =
    {
      data: NIVO_LEGEND_ITEM_DIRECTION_DATA,
      description: 'Defines legend item direction.',
      disabled: !enableLegend,
      onChange: (event: ChangeEvent<HTMLSelectElement>) => {
        responsivePieChartDispatch({
          type: responsivePieChartAction.setItemDirection,
          payload: event.currentTarget.value as LegendItemDirection,
        });
      },
      value: itemDirection,
      width: sliderWidth,
    };

  const legendItemTextColorInput = (
    <ColorInput
      aria-label="Legend item text color"
      disabled={!enableLegend}
      value={itemTextColor}
      onChange={(color: string) => {
        responsivePieChartDispatch({
          type: responsivePieChartAction.setItemTextColor,
          payload: color,
        });
      }}
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
      step: 0.05,
      value: itemOpacity,
      onChangeSlider: (value: number) => {
        responsivePieChartDispatch({
          type: responsivePieChartAction.setItemOpacity,
          payload: value,
        });
      },
      sliderDefaultValue: 1,
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
      step: 1,
      value: symbolSize,
      onChangeSlider: (value: number) => {
        responsivePieChartDispatch({
          type: responsivePieChartAction.setSymbolSize,
          payload: value,
        });
      },
      sliderDefaultValue: 12,
      width: sliderWidth,
    };

  const legendSymbolShapeSelectInputCreatorInfo: AccessibleSelectInputCreatorInfo =
    {
      data: NIVO_LEGEND_SYMBOL_SHAPE_DATA,
      description: 'Defines legend symbol shape.',
      disabled: !enableLegend,
      onChange: (event: ChangeEvent<HTMLSelectElement>) => {
        responsivePieChartDispatch({
          type: responsivePieChartAction.setSymbolShape,
          payload: event.currentTarget.value as LegendSymbolShape,
        });
      },
      value: symbolShape,
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
  const colorShade =
    appColorScheme === 'light' ? primaryShade.light : primaryShade.dark;
  const themeColor = Object.entries(COLORS_SWATCHES).find(
    ([color, _shades]) => color === primaryColor
  )?.[1];
  const scrollBarColor = themeColor ? themeColor[colorShade] : gray[5];
  const sectionHeadersBgColor = appColorScheme === 'light' ? gray[4] : gray[8];

  const headerBorderColor =
    appColorScheme === 'light'
      ? `2px solid ${gray[3]}`
      : `2px solid ${gray[7]}`;
  const rowsBorderColor =
    appColorScheme === 'light'
      ? `1px solid ${gray[3]}`
      : `1px solid ${gray[7]}`;
  const backgroundColor =
    appColorScheme === 'light'
      ? 'radial-gradient(circle, #f9f9f9 50%, #f5f5f5 100%)'
      : dark[6];

  const scrollBarStyle = {
    scrollbar: {
      '&, &:hover': {
        background: appColorScheme === 'dark' ? dark[6] : gray[0],
      },

      '&[data-orientation="vertical"] .mantine-ScrollArea-thumb': {
        backgroundColor: scrollBarColor,
      },

      '&[data-orientation="horizontal"] .mantine-ScrollArea-thumb': {
        backgroundColor: scrollBarColor,
      },
    },

    corner: {
      opacity: 1,
      background: appColorScheme === 'dark' ? dark[6] : gray[0],
    },
  };
  /** base */

  /**
 * <Group
      w="100%"
      bg={sectionHeadersBgColor}
      p={padding}
      style={{ borderRadius: 4 }}
    >
      <Title order={5}>Graph Filters</Title>
    </Group>
 */

  const displayBaseText = (
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
    <ChartsGraphsControlsStacker
      input={createdStartAngleSliderInput}
      label="Start angle"
      value={startAngle}
      symbol="°"
    />
  );

  const displayEndAngleSliderInput = (
    <ChartsGraphsControlsStacker
      input={createdEndAngleSliderInput}
      label="End angle"
      value={endAngle}
      symbol="°"
    />
  );

  const displayInnerRadiusSliderInput = (
    <ChartsGraphsControlsStacker
      input={createdInnerRadiusSliderInput}
      label="Inner radius"
      value={innerRadius}
      symbol="px"
    />
  );

  const displayPadAngleSliderInput = (
    <ChartsGraphsControlsStacker
      input={createdPadAngleSliderInput}
      label="Pad angle"
      value={padAngle}
      symbol="°"
    />
  );

  const displayCornerRadiusSliderInput = (
    <ChartsGraphsControlsStacker
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
    <Group w="100%" p={padding} style={{ borderBottom: '1px solid #e0e0e0' }}>
      {createdEnableFillPatternsSwitchInput}
    </Group>
  );

  const displayColorSchemeSelectInput = (
    <ChartsGraphsControlsStacker
      input={createdColorSchemeSelectInput}
      label="Color scheme"
      // prevents display of camelCased or snake_cased value
      value={
        NIVO_COLOR_SCHEME_DATA.find(({ value }) => value === colorScheme)
          ?.label ?? colorScheme
      }
    />
  );

  const displayBorderColorInput = (
    <ChartsGraphsControlsStacker
      input={createdBorderColorInput}
      label="Border color"
      value={borderColor}
    />
  );

  const displayArcBorderWidthSliderInput = (
    <ChartsGraphsControlsStacker
      input={createdArcBorderWidthSliderInput}
      label="Arc border width"
      value={borderWidth}
      symbol="px"
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
    <Group w="100%" p={padding} style={{ borderBottom: '1px solid #e0e0e0' }}>
      {createdEnableArcLabelsSwitchInput}
    </Group>
  );

  const displayArcLabelsRadiusOffsetSliderInput = (
    <ChartsGraphsControlsStacker
      input={createdArcLabelsRadiusOffsetSliderInput}
      label="Radius offset"
      value={arcLabelsRadiusOffset}
      symbol="px"
    />
  );

  const displayArcLabelsSkipAngleSliderInput = (
    <ChartsGraphsControlsStacker
      input={createdArcLabelsSkipAngleSliderInput}
      label="Skip angle"
      value={arcLabelsSkipAngle}
      symbol="°"
    />
  );

  const displayArcLabelsTextColorInput = (
    <ChartsGraphsControlsStacker
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
    <Group w="100%" p={padding} style={{ borderBottom: '1px solid #e0e0e0' }}>
      {createdEnableArcLinkLabelsSwitchInput}
    </Group>
  );

  const displayArcLinkLabelsSkipAngleSliderInput = (
    <ChartsGraphsControlsStacker
      input={createdArcLinkLabelsSkipAngleSliderInput}
      label="Skip angle"
      value={arcLinkLabelsSkipAngle}
      symbol="°"
    />
  );

  const displayArcLinkLabelsOffsetSliderInput = (
    <ChartsGraphsControlsStacker
      input={createdArcLinkLabelsOffsetSliderInput}
      label="Offset"
      value={arcLinkLabelsOffset}
      symbol="px"
    />
  );

  const displayArcLinkLabelsDiagonalLengthSliderInput = (
    <ChartsGraphsControlsStacker
      input={createdArcLinkLabelsDiagonalLengthSliderInput}
      label="Diagonal length"
      value={arcLinkLabelsDiagonalLength}
      symbol="px"
    />
  );

  const displayArcLinkLabelsStraightLengthSliderInput = (
    <ChartsGraphsControlsStacker
      input={createdArcLinkLabelsStraightLengthSliderInput}
      label="Straight length"
      value={arcLinkLabelsStraightLength}
      symbol="px"
    />
  );

  const displayArcLinkLabelsTextOffsetSliderInput = (
    <ChartsGraphsControlsStacker
      input={createdArcLinkLabelsTextOffsetSliderInput}
      label="Text offset"
      value={arcLinkLabelsTextOffset}
      symbol="px"
    />
  );

  const displayArcLinkLabelsThicknessSliderInput = (
    <ChartsGraphsControlsStacker
      input={createdArcLinkLabelsThicknessSliderInput}
      label="Thickness"
      value={arcLinkLabelsThickness}
      symbol="px"
    />
  );

  const displayArcLinkLabelsTextColorInput = (
    <ChartsGraphsControlsStacker
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
    <ChartsGraphsControlsStacker
      input={createdActiveInnerRadiusOffsetSliderInput}
      label="Active inner radius offset"
      value={activeInnerRadiusOffset}
      symbol="px"
    />
  );

  const displayActiveOuterRadiusOffsetSliderInput = (
    <ChartsGraphsControlsStacker
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
    <Group w="100%" p={padding} style={{ borderBottom: '1px solid #e0e0e0' }}>
      {createdAnimateSwitchInput}
    </Group>
  );

  const displayMotionConfigSelectInput = (
    <ChartsGraphsControlsStacker
      input={createdMotionConfigSelectInput}
      label="Motion configuration"
      value={motionConfig}
    />
  );

  const displayTransitionModeSelectInput = (
    <ChartsGraphsControlsStacker
      input={createdTransitionModeSelectInput}
      label="Transition mode"
      value={transitionMode}
    />
  );

  const displayMotionSection = (
    <Stack w="100%">
      {displayMotionText}
      {displayAnimateMotionSwitchInput}
      {displayMotionConfigSelectInput}
      {displayTransitionModeSelectInput}
    </Stack>
  );

  /** legend */
  const displayLegendText = (
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
    <Group w="100%" p={padding} style={{ borderBottom: '1px solid #e0e0e0' }}>
      {createdEnableLegendSwitchInput}
    </Group>
  );

  const displayLegendAnchorSelectInput = (
    <ChartsGraphsControlsStacker
      input={createdLegendAnchorSelectInput}
      label="Anchor"
      // prevents display of camelCased or snake_cased value
      value={
        NIVO_LEGEND_ANCHOR_DATA.find(({ value }) => value === anchor)?.label ??
        anchor
      }
    />
  );

  const displayLegendDirectionSelectInput = (
    <ChartsGraphsControlsStacker
      input={createdLegendDirectionSelectInput}
      label="Direction"
      value={direction}
    />
  );

  const displayEnableLegendJustifySwitchInput = (
    <Group w="100%" p={padding} style={{ borderBottom: '1px solid #e0e0e0' }}>
      {createdEnableLegendJustifySwitchInput}
    </Group>
  );

  const displayLegendTranslateXSliderInput = (
    <ChartsGraphsControlsStacker
      input={createdLegendTranslateXSliderInput}
      label="Translate in x-axis"
      value={translateX}
      symbol="px"
    />
  );

  const displayLegendTranslateYSliderInput = (
    <ChartsGraphsControlsStacker
      input={createdLegendTranslateYSliderInput}
      label="Translate in y-axis"
      value={translateY}
      symbol="px"
    />
  );

  const displayLegendItemsSpacingSliderInput = (
    <ChartsGraphsControlsStacker
      input={createdLegendItemsSpacingSliderInput}
      label="Items spacing"
      value={itemsSpacing}
      symbol="px"
    />
  );

  const displayLegendItemWidthSliderInput = (
    <ChartsGraphsControlsStacker
      input={createdLegendItemWidthSliderInput}
      label="Item width"
      value={itemWidth}
      symbol="px"
    />
  );

  const displayLegendItemHeightSliderInput = (
    <ChartsGraphsControlsStacker
      input={createdLegendItemHeightSliderInput}
      label="Item height"
      value={itemHeight}
      symbol="px"
    />
  );

  const displayLegendItemDirectionSelectInput = (
    <ChartsGraphsControlsStacker
      input={createdLegendItemDirectionSelectInput}
      label="Item direction"
      // prevents display of camelCased or snake_cased value
      value={
        NIVO_LEGEND_ITEM_DIRECTION_DATA.find(
          ({ value }) => value === itemDirection
        )?.label ?? itemDirection
      }
    />
  );

  const displayLegendItemTextColorInput = (
    <ChartsGraphsControlsStacker
      input={legendItemTextColorInput}
      label="Item text color"
      value={itemTextColor}
      symbol=""
    />
  );

  const displayLegendItemOpacitySliderInput = (
    <ChartsGraphsControlsStacker
      input={createdLegendItemOpacitySliderInput}
      label="Item opacity"
      value={(itemOpacity * 100).toFixed(0)}
      symbol="%"
    />
  );

  const displayLegendSymbolSizeSliderInput = (
    <ChartsGraphsControlsStacker
      input={createdLegendSymbolSizeSliderInput}
      label="Symbol size"
      value={symbolSize}
      symbol="px"
    />
  );

  const displayLegendSymbolShapeSelectInput = (
    <ChartsGraphsControlsStacker
      input={createdLegendSymbolShapeSelectInput}
      label="Symbol shape"
      value={symbolShape}
    />
  );

  const displayLegendSection = (
    <Stack w="100%">
      {displayLegendText}
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
  const displayMarginText = (
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
    <ChartsGraphsControlsStacker
      input={createdMarginBottomSliderInput}
      label="Bottom"
      value={marginBottom}
      symbol="px"
    />
  );

  const displayMarginLeftSliderInput = (
    <ChartsGraphsControlsStacker
      input={createdMarginLeftSliderInput}
      label="Left"
      value={marginLeft}
      symbol="px"
    />
  );

  const displayMarginRightSliderInput = (
    <ChartsGraphsControlsStacker
      input={createdMarginRightSliderInput}
      label="Right"
      value={marginRight}
      symbol="px"
    />
  );

  const displayMarginTopSliderInput = (
    <ChartsGraphsControlsStacker
      input={createdMarginTopSliderInput}
      label="Top"
      value={marginTop}
      symbol="px"
    />
  );

  const displayMarginSection = (
    <Stack w="100%">
      {displayMarginText}
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

  const chartPatternDefs = [
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
  ];

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
      defs={chartPatternDefs}
      fill={enableFillPatterns ? fillPatterns : []}
      legends={
        enableLegend
          ? [
              {
                anchor,
                direction,
                justify,
                translateX,
                translateY,
                itemsSpacing,
                itemWidth,
                itemHeight,
                itemTextColor,
                itemDirection,
                itemOpacity,
                symbolSize,
                symbolShape,
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
