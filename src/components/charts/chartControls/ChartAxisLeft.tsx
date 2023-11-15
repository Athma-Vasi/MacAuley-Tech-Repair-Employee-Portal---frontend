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
  setAxisLeftLegend: 'setAxisLeftLegend';
  setAxisLeftLegendOffset: 'setAxisLeftLegendOffset';
  setAxisLeftLegendPosition: 'setAxisLeftLegendPosition';
  setAxisLeftTickPadding: 'setAxisLeftTickPadding';
  setAxisLeftTickRotation: 'setAxisLeftTickRotation';
  setAxisLeftTickSize: 'setAxisLeftTickSize';
  setEnableAxisLeft: 'setEnableAxisLeft';
  setIsAxisLeftLegendFocused: 'setIsAxisLeftLegendFocused';
  setIsAxisLeftLegendValid: 'setIsAxisLeftLegendValid';
};

type ChartAxisDispatch =
  | {
      type:
        | ChartAxisAction['setEnableAxisLeft']
        | ChartAxisAction['setIsAxisLeftLegendValid']
        | ChartAxisAction['setIsAxisLeftLegendFocused'];
      payload: boolean;
    }
  | {
      type:
        | ChartAxisAction['setAxisLeftTickSize']
        | ChartAxisAction['setAxisLeftTickPadding']
        | ChartAxisAction['setAxisLeftTickRotation']
        | ChartAxisAction['setAxisLeftLegendOffset'];
      payload: number;
    }
  | {
      type: ChartAxisAction['setAxisLeftLegend'];
      payload: string;
    }
  | {
      type: ChartAxisAction['setAxisLeftLegendPosition'];
      payload: NivoAxisLegendPosition;
    };

type ChartAxisLeftProps = {
  axisLeftLegend: string; // default: ''
  axisLeftLegendOffset: number; // -60px - 60px default: 0 step: 1
  axisLeftLegendPosition: NivoAxisLegendPosition; // default: middle
  axisLeftTickPadding: number; // 0px - 20px default: 5 step: 1
  axisLeftTickRotation: number; // -90° - 90° default: 0 step: 1
  axisLeftTickSize: number; // 0px - 20px default: 5 step: 1
  borderColor: string;
  enableAxisLeft: boolean; // default: false ? null
  initialChartState: Record<string, any>;
  isAxisLeftLegendFocused: boolean; // default: false
  isAxisLeftLegendValid: boolean; // default: false
  padding: MantineNumberSize;
  parentChartAction: ChartAxisAction;
  parentChartDispatch: React.Dispatch<ChartAxisDispatch>;
  sectionHeadersBgColor: string;
  textColor: string;
  width: number;
};

function ChartAxisLeft(props: ChartAxisLeftProps) {
  const {
    axisLeftLegend,
    axisLeftLegendOffset,
    axisLeftLegendPosition,
    axisLeftTickPadding,
    axisLeftTickRotation,
    axisLeftTickSize,
    borderColor,
    enableAxisLeft,
    initialChartState,
    isAxisLeftLegendFocused,
    isAxisLeftLegendValid,
    padding,
    parentChartAction,
    parentChartDispatch,
    sectionHeadersBgColor,
    textColor,
    width,
  } = props;

  // validate axisLeftLegend on every change
  useEffect(() => {
    const isValid = SERIAL_ID_REGEX.test(axisLeftLegend);

    parentChartDispatch({
      type: parentChartAction.setIsAxisLeftLegendValid,
      payload: isValid,
    });
  }, [
    axisLeftLegend,
    parentChartAction.setIsAxisLeftLegendValid,
    parentChartDispatch,
  ]);

  const [
    enableAxisLeftAccessibleSelectedText,
    enableAxisLeftAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    deselectedDescription: 'Chart will not have an axis on the left.',
    isSelected: enableAxisLeft,
    selectedDescription: 'Chart will have an axis on the left.',
    semanticName: 'axis left',
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

  const createdEnableAxisLeftSwitchInput = (
    <Switch
      aria-describedby={
        enableAxisLeft
          ? enableAxisLeftAccessibleSelectedText.props.id
          : enableAxisLeftAccessibleDeselectedText.props.id
      }
      checked={enableAxisLeft}
      description={
        enableAxisLeft
          ? enableAxisLeftAccessibleSelectedText
          : enableAxisLeftAccessibleDeselectedText
      }
      label={
        <Text weight={500} color={textColor}>
          Axis left
        </Text>
      }
      onChange={(event: ChangeEvent<HTMLInputElement>) => {
        parentChartDispatch({
          type: parentChartAction.setEnableAxisLeft,
          payload: event.currentTarget.checked,
        });
      }}
      w="100%"
    />
  );

  const axisLeftTickSizeSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo =
    {
      ariaLabel: 'axis left tick size',
      disabled: !enableAxisLeft,
      kind: 'slider',
      label: (value) => (
        <Text style={{ color: sliderLabelColor }}>{value} px</Text>
      ),
      max: 20,
      min: 0,
      onChangeSlider: (value: number) => {
        parentChartDispatch({
          type: parentChartAction.setAxisLeftTickSize,
          payload: value,
        });
      },
      sliderDefaultValue: 5,
      step: 1,
      value: axisLeftTickSize,
      width: sliderWidth,
    };

  const axisLeftTickPaddingSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo =
    {
      ariaLabel: 'axis left tick padding',
      disabled: !enableAxisLeft,
      kind: 'slider',
      label: (value) => (
        <Text style={{ color: sliderLabelColor }}>{value} px</Text>
      ),
      max: 20,
      min: 0,
      onChangeSlider: (value: number) => {
        parentChartDispatch({
          type: parentChartAction.setAxisLeftTickPadding,
          payload: value,
        });
      },
      sliderDefaultValue: 5,
      step: 1,
      value: axisLeftTickPadding,
      width: sliderWidth,
    };

  const axisLeftTickRotationSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo =
    {
      ariaLabel: 'axis left tick rotation',
      disabled: !enableAxisLeft,
      kind: 'slider',
      label: (value) => (
        <Text style={{ color: sliderLabelColor }}>{value} °</Text>
      ),
      max: 90,
      min: -90,
      onChangeSlider: (value: number) => {
        parentChartDispatch({
          type: parentChartAction.setAxisLeftTickRotation,
          payload: value,
        });
      },
      sliderDefaultValue: 0,
      step: 1,
      value: axisLeftTickRotation,
      width: sliderWidth,
    };

  const [axisLeftLegendErrorText, axisLeftLegendValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'axis left legend',
      inputText: axisLeftLegend,
      isValidInputText: isAxisLeftLegendValid,
      isInputTextFocused: isAxisLeftLegendFocused,
      regexValidationText: returnSerialIdValidationText({
        content: axisLeftLegend,
        contentKind: 'axis left legend',
      }),
    });

  const axisLeftLegendTextInputCreatorInfo: AccessibleTextInputCreatorInfo = {
    description: {
      error: axisLeftLegendErrorText,
      valid: axisLeftLegendValidText,
    },
    disabled: !enableAxisLeft,
    inputText: axisLeftLegend,
    isValidInputText: isAxisLeftLegendValid,
    label: '',
    onBlur: () => {
      parentChartDispatch({
        type: parentChartAction.setIsAxisLeftLegendFocused,
        payload: false,
      });
    },
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      parentChartDispatch({
        type: parentChartAction.setAxisLeftLegend,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      parentChartDispatch({
        type: parentChartAction.setIsAxisLeftLegendFocused,
        payload: true,
      });
    },
    placeholder: 'Enter axis left legend text',
    required: false,
    semanticName: 'axis left legend',
  };

  const axisLeftLegendOffsetSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo =
    {
      ariaLabel: 'axis left legend offset',
      disabled: !enableAxisLeft || !axisLeftLegend,
      kind: 'slider',
      label: (value) => (
        <Text style={{ color: sliderLabelColor }}>{value} px</Text>
      ),
      max: 90,
      min: -90,
      onChangeSlider: (value: number) => {
        parentChartDispatch({
          type: parentChartAction.setAxisLeftLegendOffset,
          payload: value,
        });
      },
      sliderDefaultValue: 0,
      step: 1,
      value: axisLeftLegendOffset,
      width: sliderWidth,
    };

  const axisLeftLegendPositionSelectInputCreatorInfo: AccessibleSelectInputCreatorInfo =
    {
      data: BAR_CHART_AXIS_LEGEND_POSITION_SELECT_DATA,
      description: 'Define the position of the left axis legend.',
      disabled: !enableAxisLeft || !axisLeftLegend,
      onChange: (event: ChangeEvent<HTMLSelectElement>) => {
        parentChartDispatch({
          type: parentChartAction.setAxisLeftLegendPosition,
          payload: event.currentTarget.value as NivoAxisLegendPosition,
        });
      },
      value: axisLeftLegendPosition,
      width: sliderWidth,
    };

  const [
    createdAxisLeftTickSizeSliderInput,
    createdAxisLeftTickPaddingSliderInput,
    createdAxisLeftTickRotationSliderInput,
    createdAxisLeftLegendOffsetSliderInput,
  ] = returnAccessibleSliderInputElements([
    axisLeftTickSizeSliderInputCreatorInfo,
    axisLeftTickPaddingSliderInputCreatorInfo,
    axisLeftTickRotationSliderInputCreatorInfo,
    axisLeftLegendOffsetSliderInputCreatorInfo,
  ]);

  const [createdAxisLeftLegendTextInput] = returnAccessibleTextInputElements([
    axisLeftLegendTextInputCreatorInfo,
  ]);

  const [createdAxisLeftLegendPositionSelectInput] =
    returnAccessibleSelectInputElements([
      axisLeftLegendPositionSelectInputCreatorInfo,
    ]);

  const displayAxisLeftHeading = (
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
        Axis Left
      </Title>
    </Group>
  );

  const displayToggleAxisLeftSwitchInput = (
    <Group w="100%" p={padding} style={{ borderBottom: borderColor }}>
      {createdEnableAxisLeftSwitchInput}
    </Group>
  );

  const displayAxisLeftTickSizeSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={initialChartState}
      input={createdAxisLeftTickSizeSliderInput}
      isInputDisabled={!enableAxisLeft}
      label="Axis left tick size"
      symbol="px"
      value={axisLeftTickSize}
    />
  );

  const displayAxisLeftTickPaddingSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={initialChartState}
      input={createdAxisLeftTickPaddingSliderInput}
      isInputDisabled={!enableAxisLeft}
      label="Axis left tick padding"
      symbol="px"
      value={axisLeftTickPadding}
    />
  );

  const displayAxisLeftTickRotationSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={initialChartState}
      input={createdAxisLeftTickRotationSliderInput}
      isInputDisabled={!enableAxisLeft}
      label="Axis left tick rotation"
      symbol="°"
      value={axisLeftTickRotation}
    />
  );

  const displayAxisLeftLegendTextInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={initialChartState}
      input={createdAxisLeftLegendTextInput}
      isInputDisabled={!enableAxisLeft}
      label="Axis left legend"
      value={axisLeftLegend}
    />
  );

  const displayAxisLeftLegendOffsetSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={initialChartState}
      input={createdAxisLeftLegendOffsetSliderInput}
      isInputDisabled={!enableAxisLeft || !axisLeftLegend}
      label="Axis left legend offset"
      symbol="px"
      value={axisLeftLegendOffset}
    />
  );

  const displayAxisLeftLegendPositionSelectInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={initialChartState}
      input={createdAxisLeftLegendPositionSelectInput}
      isInputDisabled={!enableAxisLeft || !axisLeftLegend}
      label="Axis left legend position"
      value={axisLeftLegendPosition}
    />
  );

  const displayAxisLeftSection = (
    <Stack w="100%">
      {displayAxisLeftHeading}
      {displayToggleAxisLeftSwitchInput}
      {displayAxisLeftTickSizeSliderInput}
      {displayAxisLeftTickPaddingSliderInput}
      {displayAxisLeftTickRotationSliderInput}
      {displayAxisLeftLegendTextInput}
      {displayAxisLeftLegendOffsetSliderInput}
      {displayAxisLeftLegendPositionSelectInput}
    </Stack>
  );

  return displayAxisLeftSection;
}

export { ChartAxisLeft };
