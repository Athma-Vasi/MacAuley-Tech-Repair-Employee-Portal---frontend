import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Flex, Switch } from '@mantine/core';
import { useState } from 'react';

import { globalAction } from '../../context/globalProvider/state';
import { useGlobalState } from '../../hooks/useGlobalState';
import { TbMoon, TbSun } from 'react-icons/tb';

function ColorSchemeSwitch() {
  const {
    globalState: {
      themeObject: { colorScheme },
    },
    globalDispatch,
  } = useGlobalState();
  const [checked, setChecked] = useState<boolean>(colorScheme === 'light');

  return (
    <Flex align="center" justify="center" columnGap="sm">
      <Switch
        checked={checked}
        onChange={() => {
          setChecked(() => (colorScheme === 'light' ? false : true));
          globalDispatch({
            type: globalAction.setColorScheme,
            payload: colorScheme === 'light' ? 'dark' : 'light',
          });
        }}
        onLabel={<TbSun size={14} />}
        offLabel={<TbMoon size={14} />}
        size="md"
      />
    </Flex>
  );
}

export { ColorSchemeSwitch };
