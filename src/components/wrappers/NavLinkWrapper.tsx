import {
  DefaultProps,
  NavLinkStylesNames,
  NavLinkStylesParams,
  MantineColor,
  Variants,
  MantineNumberSize,
  NavLink,
  Text,
} from '@mantine/core';
import { Dispatch, ReactNode, useState } from 'react';
import { useGlobalState } from '../../hooks';
import { returnThemeColors } from '../../utils';
import { COLORS_SWATCHES } from '../../constants/data';

interface NavLinkProps
  extends DefaultProps<NavLinkStylesNames, NavLinkStylesParams> {
  /** Main link content */
  label?: ReactNode;
  /** Secondary link description */
  description?: ReactNode;
  /** Icon displayed on the left side of the label */
  icon?: ReactNode;
  /** Section displayed on the right side of the label */
  rightSection?: ReactNode;
  /** Determines whether link should have active styles */
  active?: boolean;
  /** Key of theme.colors, active link color */
  color?: MantineColor;
  /** Active link variant */
  variant?: Variants<'filled' | 'light' | 'subtle'>;
  /** If prop is set then label and description will not wrap on the next line */
  noWrap?: boolean;
  /** Child links */
  children?: ReactNode;
  /** Controlled nested items collapse state */
  opened?: boolean;
  /** Uncontrolled nested items collapse initial state */
  defaultOpened?: boolean;
  /** Called when open state changes */
  onChange?(opened: boolean): void;
  /** If set to true, right section will not rotate when collapse is opened */
  disableRightSectionRotation?: boolean;
  /** Key of theme.spacing or any valid CSS value to set collapsed links padding-left */
  childrenOffset?: MantineNumberSize;
  /** Adds disabled styles to root element */
  disabled?: boolean;
}

interface AccessibleNavLinkCreatorInfo extends NavLinkProps {
  label: string;
  ariaLabel: string;
  onClick?: () => void;
}

type NavLinkWrapperProps = {
  creatorInfoObject: AccessibleNavLinkCreatorInfo;
};

function NavLinkWrapper({ creatorInfoObject }: NavLinkWrapperProps) {
  const {
    globalState: { themeObject },
  } = useGlobalState();
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const {
    generalColors: { navLinkHoverShade, navLinkActiveShade, themeColorShade },
  } = returnThemeColors({
    colorsSwatches: COLORS_SWATCHES,
    themeObject,
  });

  const { colorScheme, primaryColor } = themeObject;

  const {
    active,
    ariaLabel,
    children,
    childrenOffset = 'md',
    color,
    defaultOpened = false,
    description,
    disabled = false,
    disableRightSectionRotation = false,
    icon,
    label,
    noWrap,
    onChange,
    onClick = () => {},
    opened = false,
    rightSection,
    variant = 'subtle',
  } = creatorInfoObject;

  return (
    <NavLink
      active={active}
      aria-label={ariaLabel}
      children={children}
      childrenOffset={childrenOffset}
      color={color}
      defaultOpened={defaultOpened}
      description={description}
      disabled={disabled}
      disableRightSectionRotation={disableRightSectionRotation}
      icon={icon}
      label={<Text color={active ? themeColorShade : void 0}>{label}</Text>}
      noWrap={noWrap}
      onChange={onChange}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      opened={opened}
      rightSection={rightSection}
      style={{
        backgroundColor: active
          ? navLinkActiveShade
          : isHovered && active
          ? ''
          : isHovered
          ? navLinkHoverShade
          : '',
        borderRadius: 4,
        // border:
        //   colorScheme === 'dark' && active
        //     ? `1px solid ${themeColorShade}`
        //     : '',
      }}
      variant={variant}
    />
  );
}

export { NavLinkWrapper };
export type { AccessibleNavLinkCreatorInfo };
