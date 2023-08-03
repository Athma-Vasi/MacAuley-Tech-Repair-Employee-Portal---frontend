import { Flex, Rating, rem, useMantineTheme } from '@mantine/core';
import { useEffect, useState } from 'react';
import {
  TbMoodAnnoyed2,
  TbMoodCry,
  TbMoodSmileBeam,
  TbNumber0,
  TbNumber1,
  TbNumber2,
  TbNumber3,
  TbNumber4,
  TbNumber5,
  TbStar,
  TbStarFilled,
} from 'react-icons/tb';
import { TbMoodHappy } from 'react-icons/tb';
import { TbMoodCrazyHappy } from 'react-icons/tb';
import { TbMoodEmpty } from 'react-icons/tb';

import { TextWrapper } from '../wrappers';

type CustomRatingProps = {
  ratingKind: 'scale' | 'emotion' | 'stars';
};

function CustomRating({ ratingKind }: CustomRatingProps) {
  const theme = useMantineTheme();
  const [value, setValue] = useState<number>(0);

  function getEmptyIcon(value: number): JSX.Element {
    const defaultProps = { size: rem(28), color: 'gray' };
    if (ratingKind === 'stars') {
      return <TbStar {...defaultProps} />;
    }

    switch (value) {
      case 1:
        return ratingKind === 'emotion' ? (
          <TbMoodCry {...defaultProps} />
        ) : (
          <TbNumber1 {...defaultProps} />
        );
      case 2:
        return ratingKind === 'emotion' ? (
          <TbMoodAnnoyed2 {...defaultProps} />
        ) : (
          <TbNumber2 {...defaultProps} />
        );
      case 3:
        return ratingKind === 'emotion' ? (
          <TbMoodSmileBeam {...defaultProps} />
        ) : (
          <TbNumber3 {...defaultProps} />
        );
      case 4:
        return ratingKind === 'emotion' ? (
          <TbMoodHappy {...defaultProps} />
        ) : (
          <TbNumber4 {...defaultProps} />
        );
      case 5:
        return ratingKind === 'emotion' ? (
          <TbMoodCrazyHappy {...defaultProps} />
        ) : (
          <TbNumber5 {...defaultProps} />
        );
      default:
        return <TbMoodEmpty {...defaultProps} />;
    }
  }

  function getFullIcon(value: number): JSX.Element {
    const defaultProps = { size: rem(28) };

    if (ratingKind === 'stars') {
      return <TbStarFilled {...defaultProps} color={theme.colors.yellow[7]} />;
    }

    switch (value) {
      case 1:
        return ratingKind === 'emotion' ? (
          <TbMoodCry {...defaultProps} color={theme.colors.red[7]} />
        ) : (
          <TbNumber1 {...defaultProps} color={theme.colors.red[7]} />
        );
      case 2:
        return ratingKind === 'emotion' ? (
          <TbMoodAnnoyed2 {...defaultProps} color={theme.colors.orange[7]} />
        ) : (
          <TbNumber2 {...defaultProps} color={theme.colors.orange[7]} />
        );
      case 3:
        return ratingKind === 'emotion' ? (
          <TbMoodSmileBeam {...defaultProps} color={theme.colors.yellow[7]} />
        ) : (
          <TbNumber3 {...defaultProps} color={theme.colors.yellow[7]} />
        );
      case 4:
        return ratingKind === 'emotion' ? (
          <TbMoodHappy {...defaultProps} color={theme.colors.green[7]} />
        ) : (
          <TbNumber4 {...defaultProps} color={theme.colors.green[7]} />
        );
      case 5:
        return ratingKind === 'emotion' ? (
          <TbMoodCrazyHappy {...defaultProps} color={theme.colors.blue[7]} />
        ) : (
          <TbNumber5 {...defaultProps} color={theme.colors.blue[7]} />
        );
      default:
        return ratingKind === 'emotion' ? (
          <TbMoodEmpty {...defaultProps} color={theme.colors.gray[7]} />
        ) : (
          <TbNumber0 {...defaultProps} color={theme.colors.gray[7]} />
        );
    }
  }

  useEffect(() => {
    console.log('rating value', value);
  }, [value]);

  return (
    <Flex
      //   w={350}
      p="xl"
      align="center"
      justify="center"
      style={{
        border: '1px solid #e0e0e0',
        borderRadius: '4px',
      }}
    >
      <Rating
        value={value}
        onChange={(value) => setValue(value)}
        emptySymbol={getEmptyIcon}
        fullSymbol={getFullIcon}
        highlightSelectedOnly
      />
    </Flex>
  );
}

export { CustomRating };
