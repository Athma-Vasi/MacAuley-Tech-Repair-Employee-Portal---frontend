import {
  Group,
  MantineNumberSize,
  Stack,
  Switch,
  Text,
  Title,
} from '@mantine/core';
import { ChangeEvent, useEffect } from 'react';

import { COLORS_SWATCHES } from '../../../constants/data';
import { SERIAL_ID_REGEX } from '../../../constants/regex';
import {
  AccessibleErrorValidTextElements,
  AccessibleSelectedDeselectedTextElements,
  returnAccessibleSelectInputElements,
  returnAccessibleSliderInputElements,
  returnAccessibleTextInputElements,
} from '../../../jsxCreators';
import { returnSerialIdValidationText } from '../../../utils';
import {
  AccessibleSelectInputCreatorInfo,
  AccessibleSliderInputCreatorInfo,
  AccessibleTextInputCreatorInfo,
} from '../../wrappers';
import { BAR_CHART_AXIS_LEGEND_POSITION_SELECT_DATA } from '../responsiveBarChart/constants';
import { NivoAxisLegendPosition } from '../types';
import { ChartsAndGraphsControlsStacker } from '../utils';

type ChartAxisAction = {
  setAxisTopLegend: 'setAxisTopLegend';
  setAxisTopLegendOffset: 'setAxisTopLegendOffset';
  setAxisTopLegendPosition: 'setAxisTopLegendPosition';
  setAxisTopTickPadding: 'setAxisTopTickPadding';
  setAxisTopTickRotation: 'setAxisTopTickRotation';
  setAxisTopTickSize: 'setAxisTopTickSize';
  setEnableAxisTop: 'setEnableAxisTop';
  setIsAxisTopLegendFocused: 'setIsAxisTopLegendFocused';
  setIsAxisTopLegendValid: 'setIsAxisTopLegendValid';
};

type ChartAxisDispatch =
  | {
      type:
        | ChartAxisAction['setEnableAxisTop']
        | ChartAxisAction['setIsAxisTopLegendValid']
        | ChartAxisAction['setIsAxisTopLegendFocused'];
      payload: boolean;
    }
  | {
      type:
        | ChartAxisAction['setAxisTopTickSize']
        | ChartAxisAction['setAxisTopTickPadding']
        | ChartAxisAction['setAxisTopTickRotation']
        | ChartAxisAction['setAxisTopLegendOffset'];
      payload: number;
    }
  | {
      type: ChartAxisAction['setAxisTopLegend'];
      payload: string;
    }
  | {
      type: ChartAxisAction['setAxisTopLegendPosition'];
      payload: NivoAxisLegendPosition;
    };

type ChartAxisTopProps = {
  axisTopLegend: string; // default: ''
  axisTopLegendOffset: number; // -60px - 60px default: 0 step: 1
  axisTopLegendPosition: NivoAxisLegendPosition; // default: middle
  axisTopTickPadding: number; // 0px - 20px default: 5 step: 1
  axisTopTickRotation: number; // -90° - 90° default: 0 step: 1
  axisTopTickSize: number; // 0px - 20px default: 5 step: 1
  borderColor: string;
  enableAxisTop: boolean; // default: false ? null
  initialChartState: Record<string, any>;
  isAxisTopLegendFocused: boolean; // default: false
  isAxisTopLegendValid: boolean; // default: false
  padding: MantineNumberSize;
  parentChartAction: ChartAxisAction;
  parentChartDispatch: React.Dispatch<ChartAxisDispatch>;
  sectionHeadersBgColor: string;
  textColor: string;
  width: number;
};

function ChartAxisTop(props: ChartAxisTopProps) {
  const {
    axisTopLegend,
    axisTopLegendOffset,
    axisTopLegendPosition,
    axisTopTickPadding,
    axisTopTickRotation,
    axisTopTickSize,
    borderColor,
    enableAxisTop,
    initialChartState,
    isAxisTopLegendFocused,
    isAxisTopLegendValid,
    padding,
    parentChartAction,
    parentChartDispatch,
    sectionHeadersBgColor,
    textColor,
    width,
  } = props;

  // validate axisTopLegend on every change
  useEffect(() => {
    const isValid = SERIAL_ID_REGEX.test(axisTopLegend);

    parentChartDispatch({
      type: parentChartAction.setIsAxisTopLegendValid,
      payload: isValid,
    });
  }, [
    axisTopLegend,
    parentChartAction.setIsAxisTopLegendValid,
    parentChartDispatch,
  ]);

  const [
    enableAxisTopAccessibleSelectedText,
    enableAxisTopAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    deselectedDescription: 'Chart will not have an axis on top.',
    isSelected: enableAxisTop,
    selectedDescription: 'Chart will have an axis on top.',
    semanticName: 'axis top',
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

  const createdEnableAxisTopSwitchInput = (
    <Switch
      aria-describedby={
        enableAxisTop
          ? enableAxisTopAccessibleSelectedText.props.id
          : enableAxisTopAccessibleDeselectedText.props.id
      }
      checked={enableAxisTop}
      description={
        enableAxisTop
          ? enableAxisTopAccessibleSelectedText
          : enableAxisTopAccessibleDeselectedText
      }
      label={
        <Text weight={500} color={textColor}>
          Axis top
        </Text>
      }
      onChange={(event: ChangeEvent<HTMLInputElement>) => {
        parentChartDispatch({
          type: parentChartAction.setEnableAxisTop,
          payload: event.currentTarget.checked,
        });
      }}
      w="100%"
    />
  );

  const axisTopTickSizeSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo =
    {
      ariaLabel: 'axis top tick size',
      disabled: !enableAxisTop,
      kind: 'slider',
      label: (value) => (
        <Text style={{ color: sliderLabelColor }}>{value} px</Text>
      ),
      max: 20,
      min: 0,
      onChangeSlider: (value: number) => {
        parentChartDispatch({
          type: parentChartAction.setAxisTopTickSize,
          payload: value,
        });
      },
      sliderDefaultValue: 5,
      step: 1,
      value: axisTopTickSize,
      width: sliderWidth,
    };

  const axisTopTickPaddingSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo =
    {
      ariaLabel: 'axis top tick padding',
      disabled: !enableAxisTop,
      kind: 'slider',
      label: (value) => (
        <Text style={{ color: sliderLabelColor }}>{value} px</Text>
      ),
      max: 20,
      min: 0,
      onChangeSlider: (value: number) => {
        parentChartDispatch({
          type: parentChartAction.setAxisTopTickPadding,
          payload: value,
        });
      },
      sliderDefaultValue: 5,
      step: 1,
      value: axisTopTickPadding,
      width: sliderWidth,
    };

  const axisTopTickRotationSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo =
    {
      ariaLabel: 'axis top tick rotation',
      disabled: !enableAxisTop,
      kind: 'slider',
      label: (value) => (
        <Text style={{ color: sliderLabelColor }}>{value} °</Text>
      ),
      max: 90,
      min: -90,
      onChangeSlider: (value: number) => {
        parentChartDispatch({
          type: parentChartAction.setAxisTopTickRotation,
          payload: value,
        });
      },
      sliderDefaultValue: 0,
      step: 1,
      value: axisTopTickRotation,
      width: sliderWidth,
    };

  const [axisTopLegendErrorText, axisTopLegendValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'axis top legend',
      inputText: axisTopLegend,
      isInputTextFocused: isAxisTopLegendFocused,
      isValidInputText: isAxisTopLegendValid,
      regexValidationText: returnSerialIdValidationText({
        content: axisTopLegend,
        contentKind: 'axis top legend',
      }),
    });

  const axisTopLegendTextInputCreatorInfo: AccessibleTextInputCreatorInfo = {
    description: {
      error: axisTopLegendErrorText,
      valid: axisTopLegendValidText,
    },
    disabled: !enableAxisTop,
    inputText: axisTopLegend,
    isValidInputText: isAxisTopLegendValid,
    label: '',
    onBlur: () => {
      parentChartDispatch({
        type: parentChartAction.setIsAxisTopLegendFocused,
        payload: false,
      });
    },
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      parentChartDispatch({
        type: parentChartAction.setAxisTopLegend,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      parentChartDispatch({
        type: parentChartAction.setIsAxisTopLegendFocused,
        payload: true,
      });
    },
    placeholder: 'Enter axis top legend text',
    required: false,
    semanticName: 'axis top legend',
  };

  const axisTopLegendOffsetSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo =
    {
      ariaLabel: 'axis top legend offset',
      disabled: !enableAxisTop || !axisTopLegend,
      kind: 'slider',
      label: (value) => (
        <Text style={{ color: sliderLabelColor }}>{value} px</Text>
      ),
      max: 60,
      min: -60,
      onChangeSlider: (value: number) => {
        parentChartDispatch({
          type: parentChartAction.setAxisTopLegendOffset,
          payload: value,
        });
      },
      sliderDefaultValue: 0,
      step: 1,
      value: axisTopLegendOffset,
      width: sliderWidth,
    };

  const axisTopLegendPositionSelectInputCreatorInfo: AccessibleSelectInputCreatorInfo =
    {
      data: BAR_CHART_AXIS_LEGEND_POSITION_SELECT_DATA,
      description: 'Define the position of the top axis legend.',
      disabled: !enableAxisTop || !axisTopLegend,
      onChange: (event: ChangeEvent<HTMLSelectElement>) => {
        parentChartDispatch({
          type: parentChartAction.setAxisTopLegendPosition,
          payload: event.currentTarget.value as NivoAxisLegendPosition,
        });
      },
      value: axisTopLegendPosition,
      width: sliderWidth,
    };

  const [
    // axis top
    createdAxisTopTickSizeSliderInput,
    createdAxisTopTickPaddingSliderInput,
    createdAxisTopTickRotationSliderInput,
    createdAxisTopLegendOffsetSliderInput,
  ] = returnAccessibleSliderInputElements([
    axisTopTickSizeSliderInputCreatorInfo,
    axisTopTickPaddingSliderInputCreatorInfo,
    axisTopTickRotationSliderInputCreatorInfo,
    axisTopLegendOffsetSliderInputCreatorInfo,
  ]);

  const [createdAxisTopLegendTextInput] = returnAccessibleTextInputElements([
    axisTopLegendTextInputCreatorInfo,
  ]);

  const [createdAxisTopLegendPositionSelectInput] =
    returnAccessibleSelectInputElements([
      axisTopLegendPositionSelectInputCreatorInfo,
    ]);

  // axis top
  const displayAxisTopHeading = (
    <Group
      bg={sectionHeadersBgColor}
      p={padding}
      style={{ position: 'sticky', top: 0, zIndex: 4 }}
      w="100%"
    >
      <Title order={5} color={textColor}>
        Axis Top
      </Title>
    </Group>
  );

  const displayToggleAxisTopSwitchInput = (
    <Group w="100%" p={padding} style={{ borderBottom: borderColor }}>
      {createdEnableAxisTopSwitchInput}
    </Group>
  );

  const displayAxisTopTickSizeSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={initialChartState}
      input={createdAxisTopTickSizeSliderInput}
      isInputDisabled={!enableAxisTop}
      label="Axis top tick size"
      symbol="px"
      value={axisTopTickSize}
    />
  );

  const displayAxisTopTickPaddingSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={initialChartState}
      input={createdAxisTopTickPaddingSliderInput}
      isInputDisabled={!enableAxisTop}
      label="Axis top tick padding"
      symbol="px"
      value={axisTopTickPadding}
    />
  );

  const displayAxisTopTickRotationSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={initialChartState}
      input={createdAxisTopTickRotationSliderInput}
      isInputDisabled={!enableAxisTop}
      label="Axis top tick rotation"
      symbol="°"
      value={axisTopTickRotation}
    />
  );

  const displayAxisTopLegendTextInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={initialChartState}
      input={createdAxisTopLegendTextInput}
      isInputDisabled={!enableAxisTop}
      label="Axis top legend"
      value={axisTopLegend}
    />
  );

  const displayAxisTopLegendOffsetSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={initialChartState}
      input={createdAxisTopLegendOffsetSliderInput}
      isInputDisabled={!enableAxisTop || !axisTopLegend}
      label="Axis top legend offset"
      symbol="px"
      value={axisTopLegendOffset}
    />
  );

  const displayAxisTopLegendPositionSelectInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={initialChartState}
      input={createdAxisTopLegendPositionSelectInput}
      isInputDisabled={!enableAxisTop || !axisTopLegend}
      label="Axis top legend position"
      value={axisTopLegendPosition}
    />
  );

  const displayAxisTopSection = (
    <Stack w="100%">
      {displayAxisTopHeading}
      {displayToggleAxisTopSwitchInput}
      {displayAxisTopTickSizeSliderInput}
      {displayAxisTopTickPaddingSliderInput}
      {displayAxisTopTickRotationSliderInput}
      {displayAxisTopLegendTextInput}
      {displayAxisTopLegendOffsetSliderInput}
      {displayAxisTopLegendPositionSelectInput}
    </Stack>
  );

  return displayAxisTopSection;
}

export { ChartAxisTop };
