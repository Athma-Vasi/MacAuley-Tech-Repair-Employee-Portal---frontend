import {
  ColorInput,
  Group,
  MantineNumberSize,
  Stack,
  Text,
  Title,
  TitleOrder,
  Tooltip,
} from '@mantine/core';
import { ScreenshotImageType } from '../../../types';
import { NivoChartTitlePosition } from '../types';
import { ChangeEvent, useEffect, useRef } from 'react';
import { BiReset } from 'react-icons/bi';
import { TbDownload } from 'react-icons/tb';
import {
  COLORS_SWATCHES,
  SCREENSHOT_IMAGE_TYPE_DATA,
} from '../../../constants/data';
import {
  AccessibleErrorValidTextElements,
  returnAccessibleButtonElements,
  returnAccessibleSelectInputElements,
  returnAccessibleSliderInputElements,
  returnAccessibleTextInputElements,
} from '../../../jsxCreators';
import {
  returnSerialIdValidationText,
  returnFilenameValidationText,
  captureScreenshot,
} from '../../../utils';
import {
  AccessibleTextInputCreatorInfo,
  AccessibleSliderInputCreatorInfo,
  AccessibleSelectInputCreatorInfo,
  AccessibleButtonCreatorInfo,
} from '../../wrappers';
import { NIVO_CHART_TITLE_POSITION_DATA } from '../constants';
import { ChartsAndGraphsControlsStacker } from '../utils';
import { FILENAME_REGEX, SERIAL_ID_REGEX } from '../../../constants/regex';

type ChartOptionsAction = {
  setChartTitle: 'setChartTitle';
  setChartTitleColor: 'setChartTitleColor';
  setChartTitlePosition: 'setChartTitlePosition';
  setChartTitleSize: 'setChartTitleSize';
  setIsChartTitleFocused: 'setIsChartTitleFocused';
  setIsChartTitleValid: 'setIsChartTitleValid';
  setIsScreenshotFilenameFocused: 'setIsScreenshotFilenameFocused';
  setIsScreenshotFilenameValid: 'setIsScreenshotFilenameValid';
  setScreenshotFilename: 'setScreenshotFilename';
  setScreenshotImageQuality: 'setScreenshotImageQuality';
  setScreenshotImageType: 'setScreenshotImageType';
};

type ChartOptionsDispatch =
  | {
      type:
        | ChartOptionsAction['setChartTitle']
        | ChartOptionsAction['setChartTitleColor']
        | ChartOptionsAction['setScreenshotFilename'];

      payload: string;
    }
  | {
      type: ChartOptionsAction['setScreenshotImageQuality'];
      payload: number;
    }
  | {
      type: ChartOptionsAction['setScreenshotImageType'];
      payload: ScreenshotImageType;
    }
  | {
      type: ChartOptionsAction['setChartTitlePosition'];
      payload: NivoChartTitlePosition;
    }
  | {
      type: ChartOptionsAction['setChartTitleSize'];
      payload: TitleOrder;
    }
  | {
      type:
        | ChartOptionsAction['setIsChartTitleFocused']
        | ChartOptionsAction['setIsChartTitleValid']
        | ChartOptionsAction['setIsScreenshotFilenameFocused']
        | ChartOptionsAction['setIsScreenshotFilenameValid'];

      payload: boolean;
    };

type ChartOptionsProps = {
  chartRef: React.MutableRefObject<null>;
  chartTitle: string;
  chartTitleColor: string; // default: #ffffff
  chartTitlePosition: NivoChartTitlePosition; // default: center
  chartTitleSize: TitleOrder; // 1 - 6 px default: 3 step: 1
  initialChartState: Record<string, any>;
  isChartTitleFocused: boolean;
  isChartTitleValid: boolean;
  isScreenshotFilenameFocused: boolean;
  isScreenshotFilenameValid: boolean;
  padding: MantineNumberSize;
  parentChartAction: ChartOptionsAction;
  parentChartDispatch: React.Dispatch<ChartOptionsDispatch>;
  screenshotFilename: string;
  screenshotImageQuality: number; // 0 - 1 default: 1 step: 0.05
  screenshotImageType: ScreenshotImageType;
  sectionHeadersBgColor: string;
  textColor: string;
  width: number;
};

function ChartOptions(props: ChartOptionsProps) {
  const {
    chartRef,
    chartTitle,
    chartTitleColor,
    chartTitlePosition,
    chartTitleSize,
    initialChartState,
    isChartTitleFocused,
    isChartTitleValid,
    isScreenshotFilenameFocused,
    isScreenshotFilenameValid,
    padding,
    parentChartAction,
    parentChartDispatch,
    screenshotFilename,
    screenshotImageQuality,
    screenshotImageType,
    sectionHeadersBgColor,
    textColor,
    width,
  } = props;

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

  // validate chartTitle on every change
  useEffect(() => {
    const isValid = SERIAL_ID_REGEX.test(chartTitle);

    parentChartDispatch({
      type: parentChartAction.setIsChartTitleValid,
      payload: isValid,
    });
  }, [chartTitle, parentChartAction.setIsChartTitleValid, parentChartDispatch]);

  // validate screenshotFilename on every change
  useEffect(() => {
    const isValid = FILENAME_REGEX.test(screenshotFilename);

    parentChartDispatch({
      type: parentChartAction.setIsScreenshotFilenameValid,
      payload: isValid,
    });
  }, [
    parentChartAction.setIsScreenshotFilenameValid,
    parentChartDispatch,
    screenshotFilename,
  ]);

  const [chartTitleErrorText, chartTitleValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'chart title',
      inputText: chartTitle,
      isValidInputText: isChartTitleValid,
      isInputTextFocused: isChartTitleFocused,
      regexValidationText: returnSerialIdValidationText({
        content: chartTitle,
        contentKind: 'chart title',
      }),
    });

  const chartTitleTextInputCreatorInfo: AccessibleTextInputCreatorInfo = {
    description: {
      error: chartTitleErrorText,
      valid: chartTitleValidText,
    },
    disabled: false,
    inputText: chartTitle,
    isValidInputText: isChartTitleValid,
    label: '',
    onBlur: () => {
      parentChartDispatch({
        type: parentChartAction.setIsChartTitleFocused,
        payload: false,
      });
    },
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      parentChartDispatch({
        type: parentChartAction.setChartTitle,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      parentChartDispatch({
        type: parentChartAction.setIsChartTitleFocused,
        payload: true,
      });
    },
    placeholder: 'Enter chart title text',
    required: false,
    semanticName: 'chart title',
  };

  const createdChartTitleColorInput = (
    <ColorInput
      aria-label="Chart title color"
      color={chartTitleColor}
      onChange={(color: string) => {
        parentChartDispatch({
          type: parentChartAction.setChartTitleColor,
          payload: color,
        });
      }}
      value={chartTitleColor}
      w={sliderWidth}
    />
  );

  const chartTitleSizeSliderInputCreatorInfo: AccessibleSliderInputCreatorInfo =
    {
      ariaLabel: 'chart title size',
      kind: 'slider',
      label: (value) => (
        <Text style={{ color: sliderLabelColor }}>{value}</Text>
      ),
      max: 6,
      min: 1,
      onChangeSlider: (value: number) => {
        parentChartDispatch({
          type: parentChartAction.setChartTitleSize,
          payload: value as TitleOrder,
        });
      },
      sliderDefaultValue: 3,
      step: 1,
      value: chartTitleSize,
      width: sliderWidth,
    };

  const chartTitlePositionSelectInputCreatorInfo: AccessibleSelectInputCreatorInfo =
    {
      data: NIVO_CHART_TITLE_POSITION_DATA,
      description: 'Define chart title position.',
      disabled: false,
      onChange: (event: ChangeEvent<HTMLSelectElement>) => {
        parentChartDispatch({
          type: parentChartAction.setChartTitlePosition,
          payload: event.currentTarget.value as NivoChartTitlePosition,
        });
      },
      value: chartTitlePosition,
      width: sliderWidth,
    };

  // screenshot
  const [screenshotFilenameErrorText, screenshotFilenameValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'screenshot filename',
      inputText: screenshotFilename,
      isValidInputText: isScreenshotFilenameValid,
      isInputTextFocused: isScreenshotFilenameFocused,
      regexValidationText: returnFilenameValidationText({
        content: screenshotFilename,
        contentKind: 'screenshot filename',
      }),
    });

  const screenshotFilenameTextInputCreatorInfo: AccessibleTextInputCreatorInfo =
    {
      description: {
        error: screenshotFilenameErrorText,
        valid: screenshotFilenameValidText,
      },
      disabled: false,
      inputText: screenshotFilename,
      isValidInputText: isScreenshotFilenameValid,
      label: '',
      onBlur: () => {
        parentChartDispatch({
          type: parentChartAction.setIsScreenshotFilenameFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        parentChartDispatch({
          type: parentChartAction.setScreenshotFilename,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        parentChartDispatch({
          type: parentChartAction.setIsScreenshotFilenameFocused,
          payload: true,
        });
      },
      placeholder: 'Enter screenshot filename',
      required: false,
      semanticName: 'screenshot filename',
    };

  const screenshotImageTypeSelectInputCreatorInfo: AccessibleSelectInputCreatorInfo =
    {
      data: SCREENSHOT_IMAGE_TYPE_DATA,
      description: 'Define screenshot image type.',
      disabled: false,
      onChange: (event: ChangeEvent<HTMLSelectElement>) => {
        parentChartDispatch({
          type: parentChartAction.setScreenshotImageType,
          payload: event.currentTarget.value as ScreenshotImageType,
        });
      },
      value: screenshotImageType,
      width: sliderWidth,
    };

  const screenshotImageQualitySliderInputCreatorInfo: AccessibleSliderInputCreatorInfo =
    {
      ariaLabel: 'screenshot image quality',
      disabled: screenshotImageType === 'image/png',
      kind: 'slider',
      label: (value) => (
        <Text style={{ color: sliderLabelColor }}>{value}</Text>
      ),
      max: 1,
      min: 0,
      onChangeSlider: (value: number) => {
        parentChartDispatch({
          type: parentChartAction.setScreenshotImageQuality,
          payload: value,
        });
      },
      sliderDefaultValue: 1,
      step: 0.1,
      value: screenshotImageQuality,
      width: sliderWidth,
    };

  const screenshotDownloadButtonCreatorInfo: AccessibleButtonCreatorInfo = {
    buttonLabel: 'Download',
    leftIcon: <TbDownload />,
    semanticDescription: 'Download chart screenshot',
    semanticName: 'Download',
    buttonOnClick: async () => {
      await captureScreenshot({
        chartRef,
        screenshotFilename,
        screenshotImageQuality,
        screenshotImageType,
      });
    },
  };

  const [createdChartTitleTextInput, createdScreenshotFilenameTextInput] =
    returnAccessibleTextInputElements([
      chartTitleTextInputCreatorInfo,
      screenshotFilenameTextInputCreatorInfo,
    ]);

  const [
    createdChartTitleSizeSliderInput,
    createdScreenshotImageQualitySliderInput,
  ] = returnAccessibleSliderInputElements([
    chartTitleSizeSliderInputCreatorInfo,
    screenshotImageQualitySliderInputCreatorInfo,
  ]);

  const [
    createdChartTitlePositionSelectInput,
    createdScreenshotImageTypeSelectInput,
  ] = returnAccessibleSelectInputElements([
    chartTitlePositionSelectInputCreatorInfo,
    screenshotImageTypeSelectInputCreatorInfo,
  ]);

  const [createdScreenshotDownloadButton] = returnAccessibleButtonElements([
    screenshotDownloadButtonCreatorInfo,
  ]);

  const displayOptionsHeading = (
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
        Options
      </Title>
    </Group>
  );

  const displayChartTitleTextInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={initialChartState}
      input={createdChartTitleTextInput}
      label="Chart title"
      value={chartTitle}
    />
  );

  const displayChartTitleColorInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={initialChartState}
      input={createdChartTitleColorInput}
      label="Chart title color"
      value={chartTitleColor}
    />
  );

  const displayChartTitleSizeSliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={initialChartState}
      input={createdChartTitleSizeSliderInput}
      label="Chart title size"
      value={chartTitleSize}
    />
  );

  const displayChartTitlePositionSelectInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={initialChartState}
      input={createdChartTitlePositionSelectInput}
      label="Chart title position"
      value={chartTitlePosition}
    />
  );

  const displayScreenshotFilenameTextInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={initialChartState}
      input={createdScreenshotFilenameTextInput}
      label="Screenshot filename"
      value={screenshotFilename}
    />
  );

  const displayScreenshotImageTypeSelectInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={initialChartState}
      input={createdScreenshotImageTypeSelectInput}
      label="Screenshot image type"
      value={screenshotImageType}
    />
  );

  const displayScreenshotImageQualitySliderInput = (
    <ChartsAndGraphsControlsStacker
      initialChartState={initialChartState}
      isInputDisabled={screenshotImageType === 'image/png'}
      input={createdScreenshotImageQualitySliderInput}
      label="Screenshot image quality"
      value={screenshotImageQuality}
    />
  );

  const displayDownloadScreenshotButton = (
    <Tooltip label="Download screenshot image">
      <Group>{createdScreenshotDownloadButton}</Group>
    </Tooltip>
  );

  const displayDownloadScreenshot = (
    <ChartsAndGraphsControlsStacker
      initialChartState={initialChartState}
      input={displayDownloadScreenshotButton}
      label="Download screenshot"
      value=""
    />
  );

  const displayOptionsSection = (
    <Stack w="100%">
      {displayOptionsHeading}
      {displayChartTitleTextInput}
      {displayChartTitleColorInput}
      {displayChartTitleSizeSliderInput}
      {displayChartTitlePositionSelectInput}
      {displayScreenshotFilenameTextInput}
      {displayScreenshotImageTypeSelectInput}
      {displayScreenshotImageQualitySliderInput}
      {displayDownloadScreenshot}
    </Stack>
  );

  return displayOptionsSection;
}

export { ChartOptions };
