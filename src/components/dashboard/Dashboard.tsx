import { Flex, Title } from '@mantine/core';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loading } from '../loading';
import { Success } from '../success';
import { CustomError } from '../customError';

function Dashboard() {
  const cb = () => {};
  const ref = useRef<HTMLParagraphElement>(null);
  return (
    <Flex direction="column" rowGap="xl">
      <Title>Dashboard</Title>
      <Loading dataDirection="submit" />
      <Success
        ref={ref}
        closeSuccessCallback={cb}
        link={{ address: '/portal/notes', text: 'Go to notes' }}
        isSuccessful
        message="Action was successfull!!"
      />
      <CustomError
        ref={ref}
        closeErrorCallback={cb}
        isError={true}
        message="Subspace anomaly detected!"
      />
    </Flex>
  );
}

export { Dashboard };
