import './style.css';

import { faCheck, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Flex,
  Group,
  Stepper,
  Text,
  Title,
  Tooltip,
  useMantineTheme,
} from '@mantine/core';
import { useEffect, useRef } from 'react';
import { TbCheck, TbX } from 'react-icons/tb';
import { TiArrowLeftThick, TiArrowRightThick } from 'react-icons/ti';

import { useGlobalState } from '../../../hooks';
import { returnAccessibleButtonElements } from '../../../jsxCreators';
import { replaceLastCommaWithAnd, returnThemeColors } from '../../../utils';
import { AccessibleButtonCreatorInfo } from '../ButtonWrapper';
import { TextWrapper } from '../TextWrapper';
import { numberSpellingMap } from './constants';
import type { StepperWrapperProps } from './types';
import { COLORS_SWATCHES } from '../../../constants/data';
function StepperWrapper({
  allowNextStepsSelect = false,
  children,
  childrenTitle = '',
  currentStepperPosition,
  descriptionObjectsArray,
  maxStepperPosition,
  parentComponentDispatch,
  dynamicStepperProps,
  setCurrentStepperPosition,
  stepsInError,
  customWidth,
}: StepperWrapperProps) {
  const {
    globalState: { width, themeObject, rowGap, padding },
  } = useGlobalState();
  const stepperRef = useRef<HTMLButtonElement>(null);

  // sets focus on current step on each form page, for screen reader accessibility
  useEffect(() => {
    stepperRef.current?.focus();
  }, [currentStepperPosition]);

  const prevButtonCreatorInfo: AccessibleButtonCreatorInfo = {
    buttonLabel: 'Back',
    semanticDescription: 'Back button to navigate to previous step',
    semanticName: 'back button',
    buttonOnClick: (_event: React.MouseEvent<HTMLButtonElement>) => {
      if (parentComponentDispatch) {
        parentComponentDispatch({
          type: setCurrentStepperPosition,
          payload:
            currentStepperPosition > 0
              ? currentStepperPosition - 1
              : currentStepperPosition + 1,
        });
      }

      if (dynamicStepperProps) {
        dynamicStepperProps.dynamicSetStepperDispatch({
          type: 'setCurrentStepperPosition',
          payload: {
            id: dynamicStepperProps.id,
            currentStepperPosition:
              currentStepperPosition > 0
                ? currentStepperPosition - 1
                : currentStepperPosition + 1,
          },
        });
      }
    },
    leftIcon: <TiArrowLeftThick />,
    buttonDisabled: currentStepperPosition === 0,
  };

  const nextButtonCreatorInfo: AccessibleButtonCreatorInfo = {
    buttonLabel: 'Next',
    semanticDescription: 'Next button to navigate to next step',
    semanticName: 'next button',
    buttonOnClick: (_event: React.MouseEvent<HTMLButtonElement>) => {
      if (parentComponentDispatch) {
        parentComponentDispatch({
          type: setCurrentStepperPosition,
          payload:
            currentStepperPosition < maxStepperPosition
              ? currentStepperPosition + 1
              : currentStepperPosition - 1,
        });
      }

      if (dynamicStepperProps) {
        dynamicStepperProps.dynamicSetStepperDispatch({
          type: 'setCurrentStepperPosition',
          payload: {
            id: dynamicStepperProps.id,
            currentStepperPosition:
              currentStepperPosition < maxStepperPosition
                ? currentStepperPosition + 1
                : currentStepperPosition - 1,
          },
        });
      }
    },
    rightIcon: <TiArrowRightThick />,
    buttonDisabled: currentStepperPosition === maxStepperPosition,
  };

  const [createdPrevButton, createdNextButton] = returnAccessibleButtonElements(
    [prevButtonCreatorInfo, nextButtonCreatorInfo]
  );

  const successMessage = '˖ ࣪‧₊˚⋆✩٩(ˊᗜˋ*)و ✩  Looks great! You are good to go!';
  const errorMessage = `(｡•́︿•̀｡)  Oh dear! Looks like there ${
    stepsInError.size > 1 ? 'are' : 'is'
  } ${stepsInError.size > 1 ? 'some' : 'an'} error${
    stepsInError.size > 1 ? 's' : ''
  } on step${stepsInError.size > 1 ? 's' : ''}: ${
    Array.from(stepsInError)
      .sort((a, z) => (a < z ? -1 : a > z ? 1 : 0))
      .map((step) => {
        const numberSpelling = numberSpellingMap.get(step);
        return `${numberSpelling
          ?.charAt(0)
          .toUpperCase()}${numberSpelling?.slice(1)}`;
      })
      .join(', ') ?? ''
  }. Please fix the error${stepsInError.size > 1 ? 's' : ''} to proceed!`;
  const errorMessageWithAnd = replaceLastCommaWithAnd(errorMessage);

  const descObjLen = descriptionObjectsArray.length;

  const prevButtonTooltipLabelTruncated =
    currentStepperPosition === 0
      ? 'You are at the first page'
      : `Go to ${
          descriptionObjectsArray[currentStepperPosition - 1]?.description
            .length > 19
            ? `${descriptionObjectsArray[
                currentStepperPosition - 1
              ]?.description.slice(0, 19)}...`
            : descriptionObjectsArray[currentStepperPosition - 1]?.description
        }`;

  const nextButtonTooltipLabelTruncated =
    currentStepperPosition === descriptionObjectsArray.length - 1
      ? 'Go to submit page'
      : currentStepperPosition === descriptionObjectsArray.length
      ? 'You are at the last page'
      : `Go to ${
          descriptionObjectsArray[currentStepperPosition + 1]?.description
            .length > 19
            ? `${descriptionObjectsArray[
                currentStepperPosition + 1
              ]?.description.slice(0, 19)}...`
            : descriptionObjectsArray[currentStepperPosition + 1]?.description
        }`;

  const stepperWidth = customWidth
    ? customWidth
    : width < 480 // for iPhone 5/SE
    ? 375 - 20
    : width < 768 // for iPhone 6/7/8
    ? width * 0.8
    : // at 768vw the navbar appears at width of 225px
    width < 1024
    ? (width - 225) * 0.8
    : // at >= 1200vw the navbar width is 300px
    width < 1200
    ? (width - 300) * 0.8
    : 900 - 40;

  const {
    appThemeColors: { backgroundColor, borderColor },
    generalColors: { greenColorShade, redColorShade },
  } = returnThemeColors({
    themeObject,
    colorsSwatches: COLORS_SWATCHES,
  });

  return (
    <Flex
      direction="column"
      align="center"
      justify="flex-start"
      rowGap={rowGap}
      w="100%"
      bg={backgroundColor}
      p={padding}
      h="100%"
    >
      <Title order={4}>{childrenTitle}</Title>
      <Stepper
        active={currentStepperPosition}
        onStepClick={(step) => {
          if (parentComponentDispatch) {
            parentComponentDispatch({
              type: setCurrentStepperPosition,
              payload: step,
            });
          }

          if (dynamicStepperProps) {
            dynamicStepperProps.dynamicSetStepperDispatch({
              type: 'setCurrentStepperPosition',
              payload: {
                id: dynamicStepperProps.id,
                currentStepperPosition: step,
              },
            });
          }
        }}
        breakpoint={descObjLen < 4 ? 640 : 1440}
        allowNextStepsSelect={allowNextStepsSelect}
        w={stepperWidth}
        p={padding}
        size="sm"
        style={{
          borderRadius: '4px',
          border: borderColor,
        }}
      >
        {descriptionObjectsArray.map((value, index) => {
          const { ariaLabel, description } = value;

          const capsLabel = (
            <TextWrapper creatorInfoObj={{}}>
              {`Step ${numberSpellingMap
                .get(index)?.[0]
                .toUpperCase()}${numberSpellingMap.get(index)?.slice(1)}`}
            </TextWrapper>
          );

          const completedIcon = stepsInError.has(index) ? (
            <TbX size={26} />
          ) : (
            <TbCheck size={26} />
          );

          return (
            <Stepper.Step
              key={`step-${index}`}
              label={capsLabel}
              description={description}
              aria-label={ariaLabel}
              aria-current={
                currentStepperPosition === index ? 'step' : undefined
              }
              //the mantine stepper uses 0-based indexing
              ref={currentStepperPosition === index ? stepperRef : undefined}
              className="hide-outline"
              color={stepsInError.has(index) ? 'red' : undefined}
              completedIcon={completedIcon}
            />
          );
        })}

        {/* final page */}
        <Stepper.Completed>
          <Flex
            direction="column"
            align="center"
            justify="center"
            rowGap={rowGap}
            w="100%"
            style={{
              borderRadius: 4,
              border: borderColor,
            }}
            bg={backgroundColor}
            p={padding}
          >
            <Text
              color={stepsInError.size === 0 ? greenColorShade : redColorShade}
            >
              {stepsInError.size === 0 ? successMessage : errorMessageWithAnd}
            </Text>
          </Flex>
        </Stepper.Completed>
      </Stepper>

      <Flex
        direction="column"
        align="flex-start"
        justify="space-between"
        w={stepperWidth}
        rowGap={rowGap}
      >
        {children ?? null}

        {/* stepper nav buttons */}
        <Flex
          align="center"
          justify="space-between"
          p={padding}
          w="100%"
          style={{
            borderRadius: 4,
            border: borderColor,
          }}
        >
          {/* prev button */}
          <Tooltip label={prevButtonTooltipLabelTruncated}>
            <Group>{createdPrevButton}</Group>
          </Tooltip>

          {/* next button */}
          <Tooltip label={nextButtonTooltipLabelTruncated}>
            <Group>{createdNextButton}</Group>
          </Tooltip>
        </Flex>
      </Flex>
    </Flex>
  );
}

export { StepperWrapper };
