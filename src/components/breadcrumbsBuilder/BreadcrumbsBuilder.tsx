import { Anchor, Flex, Space } from '@mantine/core';
import { TbArrowRight } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';

import { splitCamelCase } from '../../utils';

function BreadcrumbsBuilder(pathname: string) {
  const navigate = useNavigate();

  const pathArray = pathname.split('/');

  const breadCrumbsItems = pathArray.reduce(
    (acc: { label: string; location: string }[], path, index) => {
      const pathName = splitCamelCase(path);
      const pathNameCapitalized =
        pathName.charAt(0).toUpperCase() + pathName.slice(1);
      const pathNameCapitalizedWithNoHyphens = pathNameCapitalized.replace(
        /-/g,
        ' '
      );
      const pathNameCapitalizedWithSpacesAndNoHyphens =
        pathNameCapitalizedWithNoHyphens.replace(/([A-Z])/g, ' $1');

      const location = pathArray.slice(0, index + 1).join('/');
      const label = pathNameCapitalizedWithSpacesAndNoHyphens;

      acc.push({
        label,
        location,
      });

      return acc;
    },
    []
  );

  const anchorsTuple = breadCrumbsItems.map((item, index) => {
    const anchor = (
      <Anchor
        key={`breadcrumb-${index}`}
        onClick={() => {
          navigate(item.location);
        }}
      >
        {item.label}
      </Anchor>
    );

    const spacing =
      index === breadCrumbsItems.length - 1 ? null : index === 0 ? null : (
        <Space w="xs" />
      );

    const separator =
      index === breadCrumbsItems.length - 1 ? null : index === 0 ? null : (
        <TbArrowRight size={14} />
      );

    return [anchor, spacing, separator, spacing];
  });

  return (
    <Flex w="100%" align="center" justify="flex-start">
      {anchorsTuple}
    </Flex>
  );
}

export { BreadcrumbsBuilder };
