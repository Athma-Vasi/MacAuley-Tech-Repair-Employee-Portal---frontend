import {
  Group,
  MantineNumberSize,
  Stack,
  Switch,
  Text,
  Title,
} from '@mantine/core';
import { NivoAxisLegendPosition } from '../types';
import {
  AccessibleErrorValidTextElements,
  AccessibleSelectedDeselectedTextElements,
  returnAccessibleSelectInputElements,
  returnAccessibleSliderInputElements,
  returnAccessibleTextInputElements,
} from '../../../jsxCreators';
import { ChangeEvent, useEffect } from 'react';
import { SERIAL_ID_REGEX } from '../../../constants/regex';
import { COLORS_SWATCHES } from '../../../constants/data';
import { returnSerialIdValidationText } from '../../../utils';
import {
  AccessibleSliderInputCreatorInfo,
  AccessibleTextInputCreatorInfo,
  AccessibleSelectInputCreatorInfo,
} from '../../wrappers';
import { BAR_CHART_AXIS_LEGEND_POSITION_SELECT_DATA } from '../responsiveBarChart/constants';
import { ChartsAndGraphsControlsStacker } from '../utils';

type ChartAxisAction = {
  setAxisBottomLegend: 'setAxisBottomLegend';
  setAxisBottomLegendOffset: 'setAxisBottomLegendOffset';
  setAxisBottomLegendPosition: 'setAxisBottomLegendPosition';
  setAxisBottomTickPadding: 'setAxisBottomTickPadding';
  setAxisBottomTickRotation: 'setAxisBottomTickRotation';
  setAxisBottomTickSize: 'setAxisBottomTickSize';
  setEnableAxisBottom: 'setEnableAxisBottom';
  setIsAxisBottomLegendFocused: 'setIsAxisBottomLegendFocused';
  setIsAxisBottomLegendValid: 'setIsAxisBottomLegendValid';
};

type ChartAxisDispatch =
  | {
      type:
        | ChartAxisAction['setEnableAxisBottom']
        | ChartAxisAction['setIsAxisBottomLegendValid']
        | ChartAxisAction['setIsAxisBottomLegendFocused'];
      payload: boolean;
    }
  | {
      type:
        | ChartAxisAction['setAxisBottomTickSize']
        | ChartAxisAction['setAxisBottomTickPadding']
        | ChartAxisAction['setAxisBottomTickRotation']
        | ChartAxisAction['setAxisBottomLegendOffset'];
      payload: number;
    }
  | {
      type: ChartAxisAction['setAxisBottomLegend'];
      payload: string;
    }
  | {
      type: ChartAxisAction['setAxisBottomLegendPosition'];
      payload: NivoAxisLegendPosition;
    };

type ChartAxisBottomProps = {
  axisBottomLegend: string; // default: ''
  axisBottomLegendOffset: number; // -60px - 60px default: 0 step: 1
  axisBottomLegendPosition: NivoAxisLegendPosition; // default: middle
  axisBottomTickPadding: number; // 0px - 20px default: 5 step: 1
  axisBottomTickRotation: number; // -90° - 90° default: 0 step: 1
  axisBottomTickSize: number; // 0px - 20px default: 5 step: 1
  borderColor: string;
  enableAxisBottom: boolean; // default: false ? null
  initialChartState: Record<string, any>;
  isAxisBottomLegendFocused: boolean; // default: false
  isAxisBottomLegendValid: boolean; // default: false
  padding: MantineNumberSize;
  parentChartAction: ChartAxisAction;
  parentChartDispatch: React.Dispatch<ChartAxisDispatch>;
  sectionHeadersBgColor: string;
  textColor: string;
  width: number;
};

function ChartAxisBottom(props: ChartAxisBottomProps) {
  const {
    axisBottomLegend,
    axisBottomLegendOffset,
    axisBottomLegendPosition,
    axisBottomTickPadding,
    axisBottomTickRotation,
    axisBottomTickSize,
    borderColor,
    enableAxisBottom,
    initialChartState,
    isAxisBottomLegendFocused,
    isAxisBottomLegendValid,
    padding,
    parentChartAction,
    parentChartDispatch,
    sectionHeadersBgColor,
    textColor,
    width,
  } = props;

  // validate axisBottomLegend on every change
  useEffect(() => {
    const isValid = SERIAL_ID_REGEX.test(axisBottomLegend);

    parentChartDispatch({
      type: parentChartAction.setIsAxisBottomLegendValid,
      payload: isValid,
    });
  }, [
    axisBottomLegend,
    parentChartAction.setIsAxisBottomLegendValid,
    parentChartDispatch,
  ]);

  const [
    enableAxisBottomAccessibleSelectedText,
    enableAxisBottomAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    deselectedDescription: 'Chart will not have an axis on the bottom.',
    isSelected: enableAxisBottom,
    selectedDescription: 'Chart will have an axis on the bottom.',
    semanticName: 'axis bottom',
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

  const createdEnableAxisBottomSwitchInput = (
    <Switch
      aria-describedby={
        enableAxisBottom
          ? enableAxisBottomAccessibleSelectedText.props.id
          : enableAxisBottomAccessibleDeselectedText.props.id
      }
      checked={enableAxisBottom}
      description={
        enableAxisBottom
          ? enableAxisBottomAccessibleSelectedText
          : enableAxisBottomAccessibleDeselectedText
      }
      label={
        <Text weight={500} color={textColor}>
          Axis bottom
        </Text>
      }
      onChange={(event: ChangeEvent<HTMLInputElement>) => {
        parentChartDispatch({
          type: parentChartAction.setEnableAxisBottom,
          payload: event.currentTarget.checked,
        });
      }}
      w="100%"
    />
  );

  const axisBottomTickSizeSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo =
    {
      ariaLabel: 'axis bottom tick size',
      disabled: !enableAxisBottom,
      kind: 'slider',
      label: (value) => (
        <Text style={{ color: sliderLabelColor }}>{value} px</Text>
      ),
      max: 20,
      min: 0,
      onChangeSlider: (value: number) => {
        parentChartDispatch({
          type: parentChartAction.setAxisBottomTickSize,
          payload: value,
        });
      },
      sliderDefaultValue: 5,
      step: 1,
      value: axisBottomTickSize,
      width: sliderWidth,
    };

  const axisBottomTickPaddingSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo =
    {
      ariaLabel: 'axis bottom tick padding',
      disabled: !enableAxisBottom,
      kind: 'slider',
      label: (value) => (
        <Text style={{ color: sliderLabelColor }}>{value} px</Text>
      ),
      max: 20,
      min: 0,
      onChangeSlider: (value: number) => {
        parentChartDispatch({
          type: parentChartAction.setAxisBottomTickPadding,
          payload: value,
        });
      },
      sliderDefaultValue: 5,
      step: 1,
      value: axisBottomTickPadding,
      width: sliderWidth,
    };

  const axisBottomTickRotationSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo =
    {
      ariaLabel: 'axis bottom tick rotation',
      disabled: !enableAxisBottom,
      kind: 'slider',
      label: (value) => (
        <Text style={{ color: sliderLabelColor }}>{value} °</Text>
      ),
      max: 90,
      min: -90,
      onChangeSlider: (value: number) => {
        parentChartDispatch({
          type: parentChartAction.setAxisBottomTickRotation,
          payload: value,
        });
      },
      sliderDefaultValue: 0,
      step: 1,
      value: axisBottomTickRotation,
      width: sliderWidth,
    };

  const [axisBottomLegendErrorText, axisBottomLegendValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'axis bottom legend',
      inputText: axisBottomLegend,
      isValidInputText: isAxisBottomLegendValid,
      isInputTextFocused: isAxisBottomLegendFocused,
      regexValidationText: returnSerialIdValidationText({
        content: axisBottomLegend,
        contentKind: 'axis bottom legend',
      }),
    });

  const axisBottomLegendTextInputCreatorInfo: AccessibleTextInputCreatorInfo = {
    description: {
      error: axisBottomLegendErrorText,
      valid: axisBottomLegendValidText,
    },
    disabled: !enableAxisBottom,
    inputText: axisBottomLegend,
    isValidInputText: isAxisBottomLegendValid,
    label: '',
    onBlur: () => {
      parentChartDispatch({
        type: parentChartAction.setIsAxisBottomLegendFocused,
        payload: false,
      });
    },
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      parentChartDispatch({
        type: parentChartAction.setAxisBottomLegend,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      parentChartDispatch({
        type: parentChartAction.setIsAxisBottomLegendFocused,
        payload: true,
      });
    },
    placeholder: 'Enter axis bottom legend text',
    required: false,
    semanticName: 'axis bottom legend',
  };

  const axisBottomLegendOffsetSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo =
    {
      ariaLabel: 'axis bottom legend offset',
      disabled: !enableAxisBottom || !axisBottomLegend,
      kind: 'slider',
      label: (value) => (
        <Text style={{ color: sliderLabelColor }}>{value} px</Text>
      ),
      max: 60,
      min: -60,
      onChangeSlider: (value: number) => {
        parentChartDispatch({
          type: parentChartAction.setAxisBottomLegendOffset,
          payload: value,
        });
      },
      sliderDefaultValue: 0,
      step: 1,
      value: axisBottomLegendOffset,
      width: sliderWidth,
    };

  const axisBottomLegendPositionSelectInputCreatorInfo: AccessibleSelectInputCreatorInfo =
    {
      data: BAR_CHART_AXIS_LEGEND_POSITION_SELECT_DATA,
      description: 'Define the position of the bottom axis legend.',
      disabled: !enableAxisBottom || !axisBottomLegend,
      onChange: (event: ChangeEvent<HTMLSelectElement>) => {
        parentChartDispatch({
          type: parentChartAction.setAxisBottomLegendPosition,
          payload: event.currentTarget.value as NivoAxisLegendPosition,
        });
      },
      value: axisBottomLegendPosition,
      width: sliderWidth,
    };

  const [
    createdAxisBottomTickSizeSliderInput,
    createdAxisBottomTickPaddingSliderInput,
    createdAxisBottomTickRotationSliderInput,
    createdAxisBottomLegendOffsetSliderInput,
  ] = returnAccessibleSliderInputElements([
    axisBottomTickSizeSliderInputCreatorInfo,
    axisBottomTickPaddingSliderInputCreatorInfo,
    axisBottomTickRotationSliderInputCreatorInfo,
    axisBottomLegendOffsetSliderInputCreatorInfo,
  ]);

  const [createdAxisBottomLegendTextInput] = returnAccessibleTextInputElements([
    axisBottomLegendTextInputCreatorInfo,
  ]);

  const [createdAxisBottomLegendPositionSelectInput] =
    returnAccessibleSelectInputElements([
      axisBottomLegendPositionSelectInputCreatorInfo,
    ]);

  const displayAxisBottomHeading = (
    <Group
      bg={sectionHeadersBgColor}
      p={padding}
      style={{ position: 'sticky', top: 0, zIndex: 4 }}
      w="100%"
    >
      <Title order={5} color={textColor}>
        Axis Bottom
      </Title>
    </Group>
  );

  const displayToggleAxisBottomSwitchInput = (
    <Group w="100%" p={padding} style={{ borderBottom: borderColor }}>
      {createdEnableAxisBottomSwitchInput}
    </Group>
  );

  const displayAxisBottomTickSizeSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={initialChartState}
      input={createdAxisBottomTickSizeSliderInput}
      isInputDisabled={!enableAxisBottom}
      label="Axis bottom tick size"
      symbol="px"
      value={axisBottomTickSize}
    />
  );

  const displayAxisBottomTickPaddingSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={initialChartState}
      input={createdAxisBottomTickPaddingSliderInput}
      isInputDisabled={!enableAxisBottom}
      label="Axis bottom tick padding"
      symbol="px"
      value={axisBottomTickPadding}
    />
  );

  const displayAxisBottomTickRotationSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={initialChartState}
      input={createdAxisBottomTickRotationSliderInput}
      isInputDisabled={!enableAxisBottom}
      label="Axis bottom tick rotation"
      symbol="°"
      value={axisBottomTickRotation}
    />
  );

  const displayAxisBottomLegendTextInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={initialChartState}
      input={createdAxisBottomLegendTextInput}
      isInputDisabled={!enableAxisBottom}
      label="Axis bottom legend"
      value={axisBottomLegend}
    />
  );

  const displayAxisBottomLegendOffsetSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={initialChartState}
      input={createdAxisBottomLegendOffsetSliderInput}
      isInputDisabled={!enableAxisBottom || !axisBottomLegend}
      label="Axis bottom legend offset"
      symbol="px"
      value={axisBottomLegendOffset}
    />
  );

  const displayAxisBottomLegendPositionSelectInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={initialChartState}
      input={createdAxisBottomLegendPositionSelectInput}
      isInputDisabled={!enableAxisBottom || !axisBottomLegend}
      label="Axis bottom legend position"
      value={axisBottomLegendPosition}
    />
  );

  const displayAxisBottomSection = (
    <Stack w="100%">
      {displayAxisBottomHeading}
      {displayToggleAxisBottomSwitchInput}
      {displayAxisBottomTickSizeSliderInput}
      {displayAxisBottomTickPaddingSliderInput}
      {displayAxisBottomTickRotationSliderInput}
      {displayAxisBottomLegendTextInput}
      {displayAxisBottomLegendOffsetSliderInput}
      {displayAxisBottomLegendPositionSelectInput}
    </Stack>
  );

  return displayAxisBottomSection;
}

export { ChartAxisBottom };
