import { Anchor, Breadcrumbs, Flex, Space } from '@mantine/core';
import { TbArrowRight } from 'react-icons/tb';

import { splitCamelCase } from '../../utils';

function createBreadcrumbs(pathname: string) {
  const pathArray = pathname.split('/');

  const breadCrumbsItems = pathArray.reduce(
    (acc: { label: string; href: string }[], path, index) => {
      const pathName = splitCamelCase(path);
      const pathNameCapitalized =
        pathName.charAt(0).toUpperCase() + pathName.slice(1);
      const pathNameCapitalizedWithNoHyphens = pathNameCapitalized.replace(
        /-/g,
        ' '
      );
      const pathNameCapitalizedWithSpacesAndNoHyphens =
        pathNameCapitalizedWithNoHyphens.replace(/([A-Z])/g, ' $1');

      const href = pathArray.slice(0, index + 1).join('/');
      const label = pathNameCapitalizedWithSpacesAndNoHyphens;

      acc.push({
        label,
        href,
      });

      return acc;
    },
    []
  );

  const anchorsTuple = breadCrumbsItems.map((item, index) => {
    const anchor = (
      <Anchor href={item.href} key={`breadcrumb-${index}`}>
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

export { createBreadcrumbs };
