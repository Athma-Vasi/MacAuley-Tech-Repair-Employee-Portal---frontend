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
  setAxisRightLegend: 'setAxisRightLegend';
  setAxisRightLegendOffset: 'setAxisRightLegendOffset';
  setAxisRightLegendPosition: 'setAxisRightLegendPosition';
  setAxisRightTickPadding: 'setAxisRightTickPadding';
  setAxisRightTickRotation: 'setAxisRightTickRotation';
  setAxisRightTickSize: 'setAxisRightTickSize';
  setEnableAxisRight: 'setEnableAxisRight';
  setIsAxisRightLegendFocused: 'setIsAxisRightLegendFocused';
  setIsAxisRightLegendValid: 'setIsAxisRightLegendValid';
};

type ChartAxisDispatch =
  | {
      type:
        | ChartAxisAction['setEnableAxisRight']
        | ChartAxisAction['setIsAxisRightLegendValid']
        | ChartAxisAction['setIsAxisRightLegendFocused'];
      payload: boolean;
    }
  | {
      type:
        | ChartAxisAction['setAxisRightTickSize']
        | ChartAxisAction['setAxisRightTickPadding']
        | ChartAxisAction['setAxisRightTickRotation']
        | ChartAxisAction['setAxisRightLegendOffset'];
      payload: number;
    }
  | {
      type: ChartAxisAction['setAxisRightLegend'];
      payload: string;
    }
  | {
      type: ChartAxisAction['setAxisRightLegendPosition'];
      payload: NivoAxisLegendPosition;
    };

type ChartAxisRightProps = {
  axisRightLegend: string; // default: ''
  axisRightLegendOffset: number; // -60px - 60px default: 0 step: 1
  axisRightLegendPosition: NivoAxisLegendPosition; // default: middle
  axisRightTickPadding: number; // 0px - 20px default: 5 step: 1
  axisRightTickRotation: number; // -90° - 90° default: 0 step: 1
  axisRightTickSize: number; // 0px - 20px default: 5 step: 1
  borderColor: string;
  enableAxisRight: boolean; // default: false ? null
  initialChartState: Record<string, any>;
  isAxisRightLegendFocused: boolean; // default: false
  isAxisRightLegendValid: boolean; // default: false
  padding: MantineNumberSize;
  parentChartAction: ChartAxisAction;
  parentChartDispatch: React.Dispatch<ChartAxisDispatch>;
  sectionHeadersBgColor: string;
  textColor: string;
  width: number;
};

function ChartAxisRight(props: ChartAxisRightProps) {
  const {
    axisRightLegend,
    axisRightLegendOffset,
    axisRightLegendPosition,
    axisRightTickPadding,
    axisRightTickRotation,
    axisRightTickSize,
    borderColor,
    enableAxisRight,
    initialChartState,
    isAxisRightLegendFocused,
    isAxisRightLegendValid,
    padding,
    parentChartAction,
    parentChartDispatch,
    sectionHeadersBgColor,
    textColor,
    width,
  } = props;

  // validate axisRightLegend on every change
  useEffect(() => {
    const isValid = SERIAL_ID_REGEX.test(axisRightLegend);

    parentChartDispatch({
      type: parentChartAction.setIsAxisRightLegendValid,
      payload: isValid,
    });
  }, [
    axisRightLegend,
    parentChartAction.setIsAxisRightLegendValid,
    parentChartDispatch,
  ]);

  const [
    enableAxisRightAccessibleSelectedText,
    enableAxisRightAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    deselectedDescription: 'Chart will not have an axis on the right.',
    isSelected: enableAxisRight,
    selectedDescription: 'Chart will have an axis on the right.',
    semanticName: 'axis right',
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

  const createdEnableAxisRightSwitchInput = (
    <Switch
      aria-describedby={
        enableAxisRight
          ? enableAxisRightAccessibleSelectedText.props.id
          : enableAxisRightAccessibleDeselectedText.props.id
      }
      checked={enableAxisRight}
      description={
        enableAxisRight
          ? enableAxisRightAccessibleSelectedText
          : enableAxisRightAccessibleDeselectedText
      }
      label={
        <Text weight={500} color={textColor}>
          Axis right
        </Text>
      }
      onChange={(event: ChangeEvent<HTMLInputElement>) => {
        parentChartDispatch({
          type: parentChartAction.setEnableAxisRight,
          payload: event.currentTarget.checked,
        });
      }}
      w="100%"
    />
  );

  const axisRightTickSizeSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo =
    {
      ariaLabel: 'axis right tick size',
      disabled: !enableAxisRight,
      kind: 'slider',
      label: (value) => (
        <Text style={{ color: sliderLabelColor }}>{value} px</Text>
      ),
      max: 20,
      min: 0,
      onChangeSlider: (value: number) => {
        parentChartDispatch({
          type: parentChartAction.setAxisRightTickSize,
          payload: value,
        });
      },
      sliderDefaultValue: 5,
      step: 1,
      value: axisRightTickSize,
      width: sliderWidth,
    };

  const axisRightTickPaddingSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo =
    {
      ariaLabel: 'axis right tick padding',
      disabled: !enableAxisRight,
      kind: 'slider',
      label: (value) => (
        <Text style={{ color: sliderLabelColor }}>{value} px</Text>
      ),
      max: 20,
      min: 0,
      onChangeSlider: (value: number) => {
        parentChartDispatch({
          type: parentChartAction.setAxisRightTickPadding,
          payload: value,
        });
      },
      sliderDefaultValue: 5,
      step: 1,
      value: axisRightTickPadding,
      width: sliderWidth,
    };

  const axisRightTickRotationSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo =
    {
      ariaLabel: 'axis right tick rotation',
      disabled: !enableAxisRight,
      kind: 'slider',
      label: (value) => (
        <Text style={{ color: sliderLabelColor }}>{value} °</Text>
      ),
      max: 90,
      min: -90,
      onChangeSlider: (value: number) => {
        parentChartDispatch({
          type: parentChartAction.setAxisRightTickRotation,
          payload: value,
        });
      },
      sliderDefaultValue: 0,
      step: 1,
      value: axisRightTickRotation,
      width: sliderWidth,
    };

  const [axisRightLegendErrorText, axisRightLegendValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'axis right legend',
      inputText: axisRightLegend,
      isValidInputText: isAxisRightLegendValid,
      isInputTextFocused: isAxisRightLegendFocused,
      regexValidationText: returnSerialIdValidationText({
        content: axisRightLegend,
        contentKind: 'axis right legend',
      }),
    });

  const axisRightLegendTextInputCreatorInfo: AccessibleTextInputCreatorInfo = {
    description: {
      error: axisRightLegendErrorText,
      valid: axisRightLegendValidText,
    },
    disabled: !enableAxisRight,
    inputText: axisRightLegend,
    isValidInputText: isAxisRightLegendValid,
    label: '',
    onBlur: () => {
      parentChartDispatch({
        type: parentChartAction.setIsAxisRightLegendFocused,
        payload: false,
      });
    },
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      parentChartDispatch({
        type: parentChartAction.setAxisRightLegend,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      parentChartDispatch({
        type: parentChartAction.setIsAxisRightLegendFocused,
        payload: true,
      });
    },
    placeholder: 'Enter axis right legend text',
    required: false,
    semanticName: 'axis right legend',
  };

  const axisRightLegendOffsetSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo =
    {
      ariaLabel: 'axis right legend offset',
      disabled: !enableAxisRight || !axisRightLegend,
      kind: 'slider',
      label: (value) => (
        <Text style={{ color: sliderLabelColor }}>{value} px</Text>
      ),
      max: 60,
      min: -60,
      onChangeSlider: (value: number) => {
        parentChartDispatch({
          type: parentChartAction.setAxisRightLegendOffset,
          payload: value,
        });
      },
      sliderDefaultValue: 0,
      step: 1,
      value: axisRightLegendOffset,
      width: sliderWidth,
    };

  const axisRightLegendPositionSelectInputCreatorInfo: AccessibleSelectInputCreatorInfo =
    {
      data: BAR_CHART_AXIS_LEGEND_POSITION_SELECT_DATA,
      description: 'Define the position of the right axis legend.',
      disabled: !enableAxisRight || !axisRightLegend,
      onChange: (event: ChangeEvent<HTMLSelectElement>) => {
        parentChartDispatch({
          type: parentChartAction.setAxisRightLegendPosition,
          payload: event.currentTarget.value as NivoAxisLegendPosition,
        });
      },
      value: axisRightLegendPosition,
      width: sliderWidth,
    };

  const [
    createdAxisRightTickSizeSliderInput,
    createdAxisRightTickPaddingSliderInput,
    createdAxisRightTickRotationSliderInput,
    createdAxisRightLegendOffsetSliderInput,
  ] = returnAccessibleSliderInputElements([
    axisRightTickSizeSliderInputCreatorInfo,
    axisRightTickPaddingSliderInputCreatorInfo,
    axisRightTickRotationSliderInputCreatorInfo,
    axisRightLegendOffsetSliderInputCreatorInfo,
  ]);

  const [createdAxisRightLegendTextInput] = returnAccessibleTextInputElements([
    axisRightLegendTextInputCreatorInfo,
  ]);

  const [createdAxisRightLegendPositionSelectInput] =
    returnAccessibleSelectInputElements([
      axisRightLegendPositionSelectInputCreatorInfo,
    ]);

  const displayAxisRightHeading = (
    <Group
      bg={sectionHeadersBgColor}
      p={padding}
      style={{ position: 'sticky', top: 0, zIndex: 4 }}
      w="100%"
    >
      <Title order={5} color={textColor}>
        Axis Right
      </Title>
    </Group>
  );

  const displayToggleAxisRightSwitchInput = (
    <Group w="100%" p={padding} style={{ borderBottom: borderColor }}>
      {createdEnableAxisRightSwitchInput}
    </Group>
  );

  const displayAxisRightTickSizeSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={initialChartState}
      input={createdAxisRightTickSizeSliderInput}
      isInputDisabled={!enableAxisRight}
      label="Axis right tick size"
      symbol="px"
      value={axisRightTickSize}
    />
  );

  const displayAxisRightTickPaddingSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={initialChartState}
      input={createdAxisRightTickPaddingSliderInput}
      isInputDisabled={!enableAxisRight}
      label="Axis right tick padding"
      symbol="px"
      value={axisRightTickPadding}
    />
  );

  const displayAxisRightTickRotationSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={initialChartState}
      input={createdAxisRightTickRotationSliderInput}
      isInputDisabled={!enableAxisRight}
      label="Axis right tick rotation"
      symbol="°"
      value={axisRightTickRotation}
    />
  );

  const displayAxisRightLegendTextInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={initialChartState}
      input={createdAxisRightLegendTextInput}
      isInputDisabled={!enableAxisRight}
      label="Axis right legend"
      value={axisRightLegend}
    />
  );

  const displayAxisRightLegendOffsetSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={initialChartState}
      input={createdAxisRightLegendOffsetSliderInput}
      isInputDisabled={!enableAxisRight || !axisRightLegend}
      label="Axis right legend offset"
      symbol="px"
      value={axisRightLegendOffset}
    />
  );

  const displayAxisRightLegendPositionSelectInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={initialChartState}
      input={createdAxisRightLegendPositionSelectInput}
      isInputDisabled={!enableAxisRight || !axisRightLegend}
      label="Axis right legend position"
      value={axisRightLegendPosition}
    />
  );

  const displayAxisRightSection = (
    <Stack w="100%">
      {displayAxisRightHeading}
      {displayToggleAxisRightSwitchInput}
      {displayAxisRightTickSizeSliderInput}
      {displayAxisRightTickPaddingSliderInput}
      {displayAxisRightTickRotationSliderInput}
      {displayAxisRightLegendTextInput}
      {displayAxisRightLegendOffsetSliderInput}
      {displayAxisRightLegendPositionSelectInput}
    </Stack>
  );

  return displayAxisRightSection;
}

export { ChartAxisRight };
