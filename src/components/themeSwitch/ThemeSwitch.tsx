import { Flex, Switch } from '@mantine/core';
import { useGlobalState } from '../../hooks/useGlobalState';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { globalAction } from '../../context/globalProvider/state';

function ThemeSwitch() {
  const {
    globalState: { colorScheme },
    globalDispatch,
  } = useGlobalState();
  const [checked, setChecked] = useState<boolean>(false);

  return (
    <Flex align="center" justify="center" columnGap="sm">
      <Switch
        checked={checked}
        onChange={() => {
          setChecked((check) => !check);
          globalDispatch({
            type: globalAction.setColorScheme,
            payload: colorScheme === 'light' ? 'dark' : 'light',
          });
        }}
      />
      <FontAwesomeIcon icon={colorScheme === 'light' ? faSun : faMoon} />
    </Flex>
  );
}

export { ThemeSwitch };
