import {
  ColorInput,
  Group,
  MantineNumberSize,
  Stack,
  Switch,
  Text,
  Title,
} from '@mantine/core';
import { ChangeEvent } from 'react';

import { COLORS_SWATCHES } from '../../../constants/data';
import {
  AccessibleSelectedDeselectedTextElements,
  returnAccessibleSelectInputElements,
  returnAccessibleSliderInputElements,
} from '../../../jsxCreators';
import {
  AccessibleSelectInputCreatorInfo,
  AccessibleSliderInputCreatorInfo,
} from '../../wrappers';
import {
  NIVO_LEGEND_ANCHOR_DATA,
  NIVO_LEGEND_DIRECTION_DATA,
  NIVO_LEGEND_ITEM_DIRECTION_DATA,
  NIVO_LEGEND_SYMBOL_SHAPE_DATA,
} from '../constants';
import {
  NivoLegendAnchor,
  NivoLegendDirection,
  NivoLegendItemDirection,
  NivoLegendSymbolShape,
} from '../types';
import { ChartsAndGraphsControlsStacker } from '../utils';

type ChartLegendAction = {
  setEnableLegend: 'setEnableLegend';
  setEnableLegendJustify: 'setEnableLegendJustify';
  setLegendAnchor: 'setLegendAnchor';
  setLegendDirection: 'setLegendDirection';
  setLegendItemBackground: 'setLegendItemBackground';
  setLegendItemDirection: 'setLegendItemDirection';
  setLegendItemHeight: 'setLegendItemHeight';
  setLegendItemOpacity: 'setLegendItemOpacity';
  setLegendItemTextColor: 'setLegendItemTextColor';
  setLegendItemWidth: 'setLegendItemWidth';
  setLegendItemsSpacing: 'setLegendItemsSpacing';
  setLegendSymbolBorderColor: 'setLegendSymbolBorderColor';
  setLegendSymbolBorderWidth: 'setLegendSymbolBorderWidth';
  setLegendSymbolShape: 'setLegendSymbolShape';
  setLegendSymbolSize: 'setLegendSymbolSize';
  setLegendSymbolSpacing: 'setLegendSymbolSpacing';
  setLegendTranslateX: 'setLegendTranslateX';
  setLegendTranslateY: 'setLegendTranslateY';
};

type ChartLegendDispatch =
  | {
      type:
        | ChartLegendAction['setEnableLegend']
        | ChartLegendAction['setEnableLegendJustify'];

      payload: boolean;
    }
  | {
      type:
        | ChartLegendAction['setLegendItemBackground']
        | ChartLegendAction['setLegendItemTextColor']
        | ChartLegendAction['setLegendSymbolBorderColor'];

      payload: string;
    }
  | {
      type:
        | ChartLegendAction['setLegendItemHeight']
        | ChartLegendAction['setLegendItemOpacity']
        | ChartLegendAction['setLegendItemWidth']
        | ChartLegendAction['setLegendItemsSpacing']
        | ChartLegendAction['setLegendSymbolBorderWidth']
        | ChartLegendAction['setLegendSymbolSize']
        | ChartLegendAction['setLegendSymbolSpacing']
        | ChartLegendAction['setLegendTranslateX']
        | ChartLegendAction['setLegendTranslateY'];

      payload: number;
    }
  | {
      type: ChartLegendAction['setLegendAnchor'];
      payload: NivoLegendAnchor;
    }
  | {
      type: ChartLegendAction['setLegendDirection'];
      payload: NivoLegendDirection;
    }
  | {
      type: ChartLegendAction['setLegendItemDirection'];
      payload: NivoLegendItemDirection;
    }
  | {
      type: ChartLegendAction['setLegendSymbolShape'];
      payload: NivoLegendSymbolShape;
    };

type ChartLegendProps = {
  borderColor: string;
  enableLegend: boolean; // default: false
  enableLegendJustify: boolean; // default: false
  grayColorShade: string;
  initialChartState: Record<string, any>;
  legendAnchor: NivoLegendAnchor; // default: bottom-right
  legendDirection: NivoLegendDirection; // default: column
  legendItemBackground: string; // default: 'rgba(255, 255, 255, 0)'
  legendItemDirection: NivoLegendItemDirection; // default: left-to-right
  legendItemHeight: number; // 10px - 200px default: 20 step: 1
  legendItemOpacity: number; // 0 - 1 default: 1 step: 0.05
  legendItemTextColor: string; // default: '#FFF'
  legendItemWidth: number; // 10px - 200px default: 60 step: 1
  legendItemsSpacing: number; // 0px - 60px default: 2 step: 1
  legendSymbolBorderColor: string; // default: '#FFF'
  legendSymbolBorderWidth: number; // 0px - 10px default: 1 step: 1
  legendSymbolShape: NivoLegendSymbolShape; // default: circle
  legendSymbolSize: number; // 2px - 60px default: 12 step: 1
  legendSymbolSpacing: number; // 0px - 60px default: 8 step: 1
  legendTranslateX: number; // -200px - 200px default: 0 step: 1
  legendTranslateY: number; // -200px - 200px default: 0 step: 1
  padding: MantineNumberSize;
  parentChartAction: ChartLegendAction;
  parentChartDispatch: React.Dispatch<ChartLegendDispatch>;
  sectionHeadersBgColor: string;
  textColor: string;
  width: number;
};

function ChartLegend(props: ChartLegendProps) {
  const {
    borderColor,
    enableLegend,
    enableLegendJustify,
    grayColorShade,
    initialChartState,
    legendAnchor,
    legendDirection,
    legendItemBackground,
    legendItemDirection,
    legendItemHeight,
    legendItemOpacity,
    legendItemTextColor,
    legendItemWidth,
    legendItemsSpacing,
    legendSymbolBorderColor,
    legendSymbolBorderWidth,
    legendSymbolShape,
    legendSymbolSize,
    legendSymbolSpacing,
    legendTranslateX,
    legendTranslateY,
    padding,
    parentChartAction,
    parentChartDispatch,
    sectionHeadersBgColor,
    textColor,
    width,
  } = props;

  const [
    enableLegendAccessibleSelectedText,
    enableLegendAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    deselectedDescription: 'Chart will not have legend.',
    isSelected: enableLegend,
    selectedDescription: 'Chart will have legend.',
    semanticName: 'legend',
    theme: 'muted',
  });

  const [
    enableLegendJustifyAccessibleSelectedText,
    enableLegendJustifyAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    deselectedDescription: 'Legend will not be justified.',
    isSelected: enableLegendJustify,
    selectedDescription: 'Legend will be justified.',
    semanticName: 'legend justify',
    theme: 'muted',
  });

  //
  const { gray } = COLORS_SWATCHES;
  const sliderWidth =
    width < 480
      ? '217px'
      : width < 768
      ? `${width * 0.38}px`
      : width < 1192
      ? '500px'
      : `${width * 0.15}px`;
  const sliderLabelColor = gray[3];

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
        parentChartDispatch({
          type: parentChartAction.setEnableLegend,
          payload: event.currentTarget.checked,
        });
      }}
      w="100%"
    />
  );

  const legendAnchorSelectInputCreatorInfo: AccessibleSelectInputCreatorInfo = {
    data: NIVO_LEGEND_ANCHOR_DATA,
    disabled: !enableLegend,
    description: 'Define legend anchor.',
    onChange: (event: ChangeEvent<HTMLSelectElement>) => {
      parentChartDispatch({
        type: parentChartAction.setLegendAnchor,
        payload: event.currentTarget.value as NivoLegendAnchor,
      });
    },
    value: legendAnchor,
    width: sliderWidth,
  };

  const legendDirectionSelectInputCreatorInfo: AccessibleSelectInputCreatorInfo =
    {
      data: NIVO_LEGEND_DIRECTION_DATA,
      disabled: !enableLegend,
      description: 'Define legend direction.',
      onChange: (event: ChangeEvent<HTMLSelectElement>) => {
        parentChartDispatch({
          type: parentChartAction.setLegendDirection,
          payload: event.currentTarget.value as NivoLegendDirection,
        });
      },
      value: legendDirection,
      width: sliderWidth,
    };

  const createdLegendItemBackgroundColorInput = (
    <ColorInput
      aria-label="Legend item background color"
      color={legendItemBackground}
      disabled={!enableLegend}
      onChange={(color: string) => {
        parentChartDispatch({
          type: parentChartAction.setLegendItemBackground,
          payload: color,
        });
      }}
      value={legendItemBackground}
      w={sliderWidth}
    />
  );

  const createdLegendItemTextColorInput = (
    <ColorInput
      aria-label="Legend item text color"
      color={legendItemTextColor}
      disabled={!enableLegend}
      onChange={(color: string) => {
        parentChartDispatch({
          type: parentChartAction.setLegendItemTextColor,
          payload: color,
        });
      }}
      value={legendItemTextColor}
      w={sliderWidth}
    />
  );

  const createdEnableLegendJustifySwitchInput = (
    <Switch
      aria-describedby={
        enableLegendJustify
          ? enableLegendJustifyAccessibleSelectedText.props.id
          : enableLegendJustifyAccessibleDeselectedText.props.id
      }
      checked={enableLegendJustify}
      description={
        enableLegendJustify
          ? enableLegendJustifyAccessibleSelectedText
          : enableLegendJustifyAccessibleDeselectedText
      }
      disabled={!enableLegend}
      label={
        <Text weight={500} color={enableLegend ? textColor : grayColorShade}>
          Legend justify
        </Text>
      }
      onChange={(event: ChangeEvent<HTMLInputElement>) => {
        parentChartDispatch({
          type: parentChartAction.setEnableLegendJustify,
          payload: event.currentTarget.checked,
        });
      }}
      w="100%"
    />
  );

  const legendTranslateXSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo =
    {
      ariaLabel: 'legend translate x',
      disabled: !enableLegend,
      kind: 'slider',
      label: (value) => (
        <Text style={{ color: sliderLabelColor }}>{value} px</Text>
      ),
      max: 200,
      min: -200,
      onChangeSlider: (value: number) => {
        parentChartDispatch({
          type: parentChartAction.setLegendTranslateX,
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
      ariaLabel: 'legend translate y',
      disabled: !enableLegend,
      kind: 'slider',
      label: (value) => (
        <Text style={{ color: sliderLabelColor }}>{value} px</Text>
      ),
      max: 200,
      min: -200,
      onChangeSlider: (value: number) => {
        parentChartDispatch({
          type: parentChartAction.setLegendTranslateY,
          payload: value,
        });
      },
      sliderDefaultValue: 0,
      step: 1,
      value: legendTranslateY,
      width: sliderWidth,
    };

  const legendItemWidthSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo =
    {
      ariaLabel: 'legend item width',
      disabled: !enableLegend,
      kind: 'slider',
      label: (value) => (
        <Text style={{ color: sliderLabelColor }}>{value} px</Text>
      ),
      max: 200,
      min: 0,
      onChangeSlider: (value: number) => {
        parentChartDispatch({
          type: parentChartAction.setLegendItemWidth,
          payload: value,
        });
      },
      sliderDefaultValue: 100,
      step: 1,
      value: legendItemWidth,
      width: sliderWidth,
    };

  const legendItemHeightSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo =
    {
      ariaLabel: 'legend item height',
      disabled: !enableLegend,
      kind: 'slider',
      label: (value) => (
        <Text style={{ color: sliderLabelColor }}>{value} px</Text>
      ),
      max: 200,
      min: 0,
      onChangeSlider: (value: number) => {
        parentChartDispatch({
          type: parentChartAction.setLegendItemHeight,
          payload: value,
        });
      },
      sliderDefaultValue: 12,
      step: 1,
      value: legendItemHeight,
      width: sliderWidth,
    };

  const legendItemsSpacingSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo =
    {
      ariaLabel: 'legend items spacing',
      disabled: !enableLegend,
      kind: 'slider',
      label: (value) => (
        <Text style={{ color: sliderLabelColor }}>{value} px</Text>
      ),
      max: 200,
      min: 0,
      onChangeSlider: (value: number) => {
        parentChartDispatch({
          type: parentChartAction.setLegendItemsSpacing,
          payload: value,
        });
      },
      sliderDefaultValue: 10,
      step: 1,
      value: legendItemsSpacing,
      width: sliderWidth,
    };

  const legendItemDirectionSelectInputCreatorInfo: AccessibleSelectInputCreatorInfo =
    {
      data: NIVO_LEGEND_ITEM_DIRECTION_DATA,
      disabled: !enableLegend,
      description: 'Define legend item direction.',
      onChange: (event: ChangeEvent<HTMLSelectElement>) => {
        parentChartDispatch({
          type: parentChartAction.setLegendItemDirection,
          payload: event.currentTarget.value as NivoLegendItemDirection,
        });
      },
      value: legendItemDirection,
      width: sliderWidth,
    };

  const legendItemOpacitySliderInputCreatorInfo: AccessibleSliderInputCreatorInfo =
    {
      ariaLabel: 'legend item opacity',
      disabled: !enableLegend,
      kind: 'slider',
      label: (value) => (
        <Text style={{ color: sliderLabelColor }}>{value}</Text>
      ),
      max: 1,
      min: 0,
      onChangeSlider: (value: number) => {
        parentChartDispatch({
          type: parentChartAction.setLegendItemOpacity,
          payload: value,
        });
      },
      sliderDefaultValue: 1,
      step: 0.1,
      value: legendItemOpacity,
      width: sliderWidth,
    };

  const legendSymbolSizeSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo =
    {
      ariaLabel: 'legend symbol size',
      disabled: !enableLegend,
      kind: 'slider',
      label: (value) => (
        <Text style={{ color: sliderLabelColor }}>{value} px</Text>
      ),
      max: 100,
      min: 0,
      onChangeSlider: (value: number) => {
        parentChartDispatch({
          type: parentChartAction.setLegendSymbolSize,
          payload: value,
        });
      },
      sliderDefaultValue: 16,
      step: 1,
      value: legendSymbolSize,
      width: sliderWidth,
    };

  const createdLegendSymbolBorderColorInput = (
    <ColorInput
      aria-label="Legend symbol border color"
      color={legendSymbolBorderColor}
      disabled={!enableLegend}
      onChange={(color: string) => {
        parentChartDispatch({
          type: parentChartAction.setLegendSymbolBorderColor,
          payload: color,
        });
      }}
      value={legendSymbolBorderColor}
      w={sliderWidth}
    />
  );

  const legendSymbolBorderWidthSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo =
    {
      ariaLabel: 'legend symbol border width',
      disabled: !enableLegend,
      kind: 'slider',
      label: (value) => (
        <Text style={{ color: sliderLabelColor }}>{value} px</Text>
      ),
      max: 10,
      min: 0,
      onChangeSlider: (value: number) => {
        parentChartDispatch({
          type: parentChartAction.setLegendSymbolBorderWidth,
          payload: value,
        });
      },
      sliderDefaultValue: 1,
      step: 1,
      value: legendSymbolBorderWidth,
      width: sliderWidth,
    };

  const legendSymbolShapeSelectInputCreatorInfo: AccessibleSelectInputCreatorInfo =
    {
      data: NIVO_LEGEND_SYMBOL_SHAPE_DATA,
      disabled: !enableLegend,
      description: 'Define legend symbol shape.',
      onChange: (event: ChangeEvent<HTMLSelectElement>) => {
        parentChartDispatch({
          type: parentChartAction.setLegendSymbolShape,
          payload: event.currentTarget.value as NivoLegendSymbolShape,
        });
      },
      value: legendSymbolShape,
      width: sliderWidth,
    };

  const legendSymbolSpacingSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo =
    {
      ariaLabel: 'legend symbol spacing',
      disabled: !enableLegend,
      kind: 'slider',
      label: (value) => (
        <Text style={{ color: sliderLabelColor }}>{value} px</Text>
      ),
      max: 60,
      min: 0,
      onChangeSlider: (value: number) => {
        parentChartDispatch({
          type: parentChartAction.setLegendSymbolSpacing,
          payload: value,
        });
      },
      sliderDefaultValue: 8,
      step: 1,
      value: legendSymbolSpacing,
      width: sliderWidth,
    };

  // select input creation
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

  // slider input creation
  const [
    createdLegendItemHeightSliderInput,
    createdLegendItemOpacitySliderInput,
    createdLegendItemWidthSliderInput,
    createdLegendItemsSpacingSliderInput,
    createdLegendSymbolBorderWidthSliderInput,
    createdLegendSymbolSizeSliderInput,
    createdLegendSymbolSpacingSliderInput,
    createdLegendTranslateXSliderInput,
    createdLegendTranslateYSliderInput,
  ] = returnAccessibleSliderInputElements([
    legendItemHeightSliderInputCreatorInfo,
    legendItemOpacitySliderInputCreatorInfo,
    legendItemWidthSliderInputCreatorInfo,
    legendItemsSpacingSliderInputCreatorInfo,
    legendSymbolBorderWidthSliderInputCreatorInfo,
    legendSymbolSizeSliderInputCreatorInfo,
    legendSymbolSpacingSliderInputCreatorInfo,
    legendTranslateXSliderInputCreatorInfo,
    legendTranslateYSliderInputCreatorInfo,
  ]);

  const displayLegendHeading = (
    <Group
      bg={sectionHeadersBgColor}
      p={padding}
      style={{
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
        position: 'sticky',
        top: 0,
        zIndex: 4,
      }}
      w="100%"
    >
      <Title order={5} color={textColor}>
        Legend
      </Title>
    </Group>
  );

  const displayToggleLegendSwitchInput = (
    <Group w="100%" p={padding} style={{ borderBottom: borderColor }}>
      {createdEnableLegendSwitchInput}
    </Group>
  );

  const displayLegendAnchorSelectInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={initialChartState}
      input={createdLegendAnchorSelectInput}
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
      initialChartState={initialChartState}
      input={createdLegendDirectionSelectInput}
      isInputDisabled={!enableLegend}
      label="Legend direction"
      value={legendDirection}
    />
  );

  const displayToggleLegendJustifySwitchInput = (
    <Group w="100%" p={padding} style={{ borderBottom: borderColor }}>
      {createdEnableLegendJustifySwitchInput}
    </Group>
  );

  const displayLegendTranslateXSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={initialChartState}
      input={createdLegendTranslateXSliderInput}
      isInputDisabled={!enableLegend}
      label="Legend translate X"
      symbol="px"
      value={legendTranslateX}
    />
  );

  const displayLegendTranslateYSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={initialChartState}
      input={createdLegendTranslateYSliderInput}
      isInputDisabled={!enableLegend}
      label="Legend translate Y"
      symbol="px"
      value={legendTranslateY}
    />
  );

  const displayLegendItemWidthSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={initialChartState}
      input={createdLegendItemWidthSliderInput}
      isInputDisabled={!enableLegend}
      label="Legend item width"
      symbol="px"
      value={legendItemWidth}
    />
  );

  const displayLegendItemHeightSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={initialChartState}
      input={createdLegendItemHeightSliderInput}
      isInputDisabled={!enableLegend}
      label="Legend item height"
      symbol="px"
      value={legendItemHeight}
    />
  );

  const displayLegendItemsSpacingSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={initialChartState}
      input={createdLegendItemsSpacingSliderInput}
      isInputDisabled={!enableLegend}
      label="Legend items spacing"
      symbol="px"
      value={legendItemsSpacing}
    />
  );

  const displayLegendItemDirectionSelectInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={initialChartState}
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

  const displayLegendItemOpacitySliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={initialChartState}
      input={createdLegendItemOpacitySliderInput}
      isInputDisabled={!enableLegend}
      label="Legend item opacity"
      value={legendItemOpacity}
    />
  );

  const displayLegendItemBackgroundColorInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={initialChartState}
      input={createdLegendItemBackgroundColorInput}
      isInputDisabled={!enableLegend}
      label="Legend item background"
      value={legendItemBackground}
    />
  );

  const displayLegendItemTextColorInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={initialChartState}
      input={createdLegendItemTextColorInput}
      isInputDisabled={!enableLegend}
      label="Legend item text color"
      value={legendItemTextColor}
    />
  );

  const displayLegendSymbolSizeSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={initialChartState}
      input={createdLegendSymbolSizeSliderInput}
      isInputDisabled={!enableLegend}
      label="Legend symbol size"
      symbol="px"
      value={legendSymbolSize}
    />
  );

  const displayLegendSymbolBorderColorInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={initialChartState}
      input={createdLegendSymbolBorderColorInput}
      isInputDisabled={!enableLegend}
      label="Legend symbol border color"
      value={legendSymbolBorderColor}
    />
  );

  const displayLegendSymbolBorderWidthSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={initialChartState}
      input={createdLegendSymbolBorderWidthSliderInput}
      isInputDisabled={!enableLegend}
      label="Legend symbol border width"
      symbol="px"
      value={legendSymbolBorderWidth}
    />
  );

  const displayLegendSymbolShapeSelectInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={initialChartState}
      input={createdLegendSymbolShapeSelectInput}
      isInputDisabled={!enableLegend}
      label="Legend symbol shape"
      // prevents display of camelCased or snake_cased value
      value={
        NIVO_LEGEND_SYMBOL_SHAPE_DATA.find(
          ({ value }) => value === legendSymbolShape
        )?.label ?? legendSymbolShape
      }
    />
  );

  const displayLegendSymbolSpacingSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={initialChartState}
      input={createdLegendSymbolSpacingSliderInput}
      isInputDisabled={!enableLegend}
      label="Legend symbol spacing"
      symbol="px"
      value={legendSymbolSpacing}
    />
  );

  const displayLegendSection = (
    <Stack w="100%">
      {displayLegendHeading}
      {displayToggleLegendSwitchInput}
      {displayLegendAnchorSelectInput}
      {displayLegendDirectionSelectInput}
      {displayToggleLegendJustifySwitchInput}
      {displayLegendTranslateXSliderInput}
      {displayLegendTranslateYSliderInput}
      {displayLegendItemWidthSliderInput}
      {displayLegendItemHeightSliderInput}
      {displayLegendItemsSpacingSliderInput}
      {displayLegendItemBackgroundColorInput}
      {displayLegendItemTextColorInput}
      {displayLegendItemDirectionSelectInput}
      {displayLegendItemOpacitySliderInput}
      {displayLegendSymbolSizeSliderInput}
      {displayLegendSymbolBorderColorInput}
      {displayLegendSymbolBorderWidthSliderInput}
      {displayLegendSymbolShapeSelectInput}
      {displayLegendSymbolSpacingSliderInput}
    </Stack>
  );

  return displayLegendSection;
}

export { ChartLegend };
