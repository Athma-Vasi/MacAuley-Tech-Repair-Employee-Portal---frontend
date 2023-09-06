import { useMantineTheme } from '@mantine/core';
import { useGlobalState } from '../../hooks';
import { COLORS_SWATCHES } from '../../constants/data';

type FormReviewPageProps<
  FormState extends Record<string, any> = Record<string, any>
> = { formState: Partial<FormState> };

function FormReviewPage<
  FormState extends Record<string, any> = Record<string, any>
>({ formState }: FormReviewPageProps<FormState>) {
  const {
    globalState: {
      themeObject: { colorScheme },
    },
  } = useGlobalState();

  return <></>;
}

export default FormReviewPage;
