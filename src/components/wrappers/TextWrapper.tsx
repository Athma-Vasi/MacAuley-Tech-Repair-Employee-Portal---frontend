import {
  DefaultProps,
  MantineColor,
  MantineGradient,
  MantineNumberSize,
  Text,
  Variants,
} from '@mantine/core';
import { ReactNode } from 'react';

import { useGlobalState } from '../../hooks';

interface TextWrapperCreatorInfoObject extends DefaultProps {
  /** Key of theme.fontSizes or any valid CSS value to set font-size */
  size?: MantineNumberSize;

  /** Key of theme.colors or any valid CSS color */
  color?: 'dimmed' | MantineColor;

  /** Sets font-weight css property */
  weight?: React.CSSProperties['fontWeight'];

  /** Sets text-transform css property */
  transform?: React.CSSProperties['textTransform'];

  /** Sets text-align css property */
  align?: React.CSSProperties['textAlign'];

  /** Link or text variant */
  variant?: Variants<'text' | 'gradient'>;

  /** CSS -webkit-line-clamp property */
  lineClamp?: number;

  /** CSS truncate overflowing text with an ellipsis */
  truncate?: 'end' | 'start' | true;

  /** Sets line-height to 1 for centering */
  inline?: boolean;

  /** Underline the text */
  underline?: boolean;

  /** Add strikethrough styles */
  strikethrough?: boolean;

  /** Adds font-style: italic style */
  italic?: boolean;

  /** Inherit font properties from parent element */
  inherit?: boolean;

  /** Controls gradient settings in gradient variant only */
  gradient?: MantineGradient;

  /** Shorthand for component="span" */
  span?: boolean;
}

type TextWrapperProps = {
  children?: ReactNode;
  creatorInfoObj: TextWrapperCreatorInfoObject;
};

function TextWrapper({
  children,
  creatorInfoObj,
}: TextWrapperProps): JSX.Element {
  const {
    globalState: { width },
  } = useGlobalState();

  const {
    size,
    align = 'start',
    color = 'dark',
    weight = 500,
    variant = 'text',
    lineClamp = 1,
    truncate = true,
    inline = false,
    underline = false,
    strikethrough = false,
    italic = false,
    inherit = false,
    gradient = {
      from: 'teal',
      to: 'cyan',
      deg: 45,
    },
    span = false,
  } = creatorInfoObj;

  const textSize = size
    ? size
    : width < 480
    ? 'xs'
    : width < 1024
    ? 'sm'
    : 'md';

  return (
    <Text
      size={textSize}
      align={align}
      color={color}
      weight={weight}
      variant={variant}
      lineClamp={lineClamp}
      truncate={truncate}
      inline={inline}
      underline={underline}
      strikethrough={strikethrough}
      italic={italic}
      inherit={inherit}
      gradient={gradient}
      span={span}
    >
      {children}
    </Text>
  );
}

export { TextWrapper };

export type { TextWrapperCreatorInfoObject };
