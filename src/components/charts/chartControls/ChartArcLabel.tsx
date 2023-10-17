import {
  ColorInput,
  Group,
  MantineNumberSize,
  Stack,
  Switch,
  Text,
  Title,
} from '@mantine/core';
import { NivoArcLabel } from '../types';
import {
  AccessibleSelectedDeselectedTextElements,
  returnAccessibleSelectInputElements,
  returnAccessibleSliderInputElements,
} from '../../../jsxCreators';
import { ChangeEvent } from 'react';
import { COLORS_SWATCHES } from '../../../constants/data';
import {
  AccessibleSelectInputCreatorInfo,
  AccessibleSliderInputCreatorInfo,
} from '../../wrappers';
import { NIVO_SUNBURST_ARC_LABEL_DATA } from '../responsiveSunburstChart/constants';
import { ChartsAndGraphsControlsStacker } from '../utils';

type ChartArcLabelAction = {
  setArcLabel: 'setArcLabel';
  setArcLabelsRadiusOffset: 'setArcLabelsRadiusOffset';
  setArcLabelsSkipAngle: 'setArcLabelsSkipAngle';
  setArcLabelsTextColor: 'setArcLabelsTextColor';
  setEnableArcLabels: 'setEnableArcLabels';
};

type ChartArcLabelDispatch =
  | {
      type: ChartArcLabelAction['setArcLabel'];
      payload: NivoArcLabel;
    }
  | {
      type:
        | ChartArcLabelAction['setArcLabelsRadiusOffset']
        | ChartArcLabelAction['setArcLabelsSkipAngle'];

      payload: number;
    }
  | {
      type: ChartArcLabelAction['setArcLabelsTextColor'];
      payload: string;
    }
  | {
      type: ChartArcLabelAction['setEnableArcLabels'];
      payload: boolean;
    };

type ChartArcLabelProps = {
  arcLabel: NivoArcLabel; // default: 'formattedValue'
  arcLabelsRadiusOffset: number; // 0 - 2 default: 0.5 step: 0.05
  arcLabelsSkipAngle: number; // 0 - 45 default: 0 step: 1
  arcLabelsTextColor: string; // default: 'gray'
  borderColor: string;
  enableArcLabels: boolean; // default: false
  initialChartState: Record<string, any>;
  padding: MantineNumberSize;
  parentChartAction: ChartArcLabelAction;
  parentChartDispatch: React.Dispatch<ChartArcLabelDispatch>;
  sectionHeadersBgColor: string;
  textColor: string;
  width: number;
};

function ChartArcLabel(props: ChartArcLabelProps) {
  const {
    arcLabel,
    arcLabelsRadiusOffset,
    arcLabelsSkipAngle,
    arcLabelsTextColor,
    borderColor,
    enableArcLabels,
    initialChartState,
    padding,
    parentChartAction,
    parentChartDispatch,
    sectionHeadersBgColor,
    textColor,
    width,
  } = props;

  const [
    enableArcLabelsAccessibleSelectedText,
    enableArcLabelsAccessibleDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    deselectedDescription: 'Arc labels will not be displayed',
    isSelected: enableArcLabels,
    selectedDescription: 'Arc labels will be displayed',
    semanticName: 'Enable Arc Labels',
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
          Toggle Enable Arc Labels
        </Text>
      }
      onChange={(event: ChangeEvent<HTMLInputElement>) => {
        parentChartDispatch({
          type: parentChartAction.setEnableArcLabels,
          payload: event.currentTarget.checked,
        });
      }}
      w="100%"
    />
  );

  const arcLabelSelectInputCreatorInfo: AccessibleSelectInputCreatorInfo = {
    data: NIVO_SUNBURST_ARC_LABEL_DATA,
    description: 'Define arc label.',
    disabled: !enableArcLabels,
    onChange: (event: ChangeEvent<HTMLSelectElement>) => {
      parentChartDispatch({
        type: parentChartAction.setArcLabel,
        payload: event.currentTarget.value as NivoArcLabel,
      });
    },
    value: arcLabel,
    width: sliderWidth,
  };

  const arcLabelsRadiusOffsetSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo =
    {
      ariaLabel: 'arc labels radius offset',
      disabled: !enableArcLabels,
      kind: 'slider',
      label: (value) => (
        <Text style={{ color: sliderLabelColor }}>{value}</Text>
      ),
      max: 2,
      min: 0,
      onChangeSlider: (value: number) => {
        parentChartDispatch({
          type: parentChartAction.setArcLabelsRadiusOffset,
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
        parentChartDispatch({
          type: parentChartAction.setArcLabelsSkipAngle,
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
      aria-label="arc labels text color"
      color={arcLabelsTextColor}
      disabled={!enableArcLabels}
      onChange={(color: string) => {
        parentChartDispatch({
          type: parentChartAction.setArcLabelsTextColor,
          payload: color,
        });
      }}
      value={arcLabelsTextColor}
      w={sliderWidth}
    />
  );

  const [
    createdArcLabelsRadiusOffsetSliderInput,
    createdArcLabelsSkipAngleSliderInput,
  ] = returnAccessibleSliderInputElements([
    arcLabelsRadiusOffsetSliderInputCreatorInfo,
    arcLabelsSkipAngleSliderInputCreatorInfo,
  ]);

  const [createdArcLabelSelectInput] = returnAccessibleSelectInputElements([
    arcLabelSelectInputCreatorInfo,
  ]);

  const displayArcLabelsHeading = (
    <Group
      bg={sectionHeadersBgColor}
      p={padding}
      style={{ position: 'sticky', top: 0, zIndex: 4 }}
      w="100%"
    >
      <Title order={5} color={textColor}>
        Arc Labels
      </Title>
    </Group>
  );

  const displayEnableArcLabelsSwitchInput = (
    <Group w="100%" p={padding} style={{ borderBottom: borderColor }}>
      {createdEnableArcLabelsSwitchInput}
    </Group>
  );

  const displayArcLabelSelectInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={initialChartState}
      input={createdArcLabelSelectInput}
      isInputDisabled={!enableArcLabels}
      label="Arc Label"
      value={arcLabel}
    />
  );

  const displayArcLabelsRadiusOffsetSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={initialChartState}
      input={createdArcLabelsRadiusOffsetSliderInput}
      isInputDisabled={!enableArcLabels}
      label="Arc Labels Radius Offset"
      value={arcLabelsRadiusOffset}
    />
  );

  const displayArcLabelsSkipAngleSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={initialChartState}
      input={createdArcLabelsSkipAngleSliderInput}
      isInputDisabled={!enableArcLabels}
      label="Arc Labels Skip Angle"
      symbol="°"
      value={arcLabelsSkipAngle}
    />
  );

  const displayArcLabelsTextColorInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={initialChartState}
      input={createdArcLabelsTextColorInput}
      isInputDisabled={!enableArcLabels}
      label="Arc Labels Text Color"
      value={arcLabelsTextColor}
    />
  );

  const displayArcLabelsSection = (
    <Stack w="100%">
      {displayArcLabelsHeading}
      {displayEnableArcLabelsSwitchInput}
      {displayArcLabelSelectInput}
      {displayArcLabelsRadiusOffsetSliderInput}
      {displayArcLabelsSkipAngleSliderInput}
      {displayArcLabelsTextColorInput}
    </Stack>
  );

  return displayArcLabelsSection;
}

export { ChartArcLabel };
