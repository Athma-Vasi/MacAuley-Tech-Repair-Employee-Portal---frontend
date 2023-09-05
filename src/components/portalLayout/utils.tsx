import { Anchor, Breadcrumbs } from '@mantine/core';
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

  const anchorsArray = breadCrumbsItems.map((item, index) => {
    const anchor = (
      <Anchor href={item.href} key={`breadcrumb-${index}`}>
        {item.label}
      </Anchor>
    );

    return anchor;
  });

  return <Breadcrumbs separator={<TbArrowRight />}>{anchorsArray}</Breadcrumbs>;
}

export { createBreadcrumbs };
