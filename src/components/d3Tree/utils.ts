import { EmployeeDoc } from "../directory1/data";

type D3TreeInput = {
  attributes: Record<string, string>;
  children: Array<D3TreeInput>;
  name: string;
};

function createNodeMap(employees: Array<EmployeeDoc>): Map<number, D3TreeInput> {
  return employees.reduce<Map<number, D3TreeInput>>((map, employee) => {
    const name = `${employee.firstName} ${employee.middleName} ${employee.lastName}`;

    const attributes = {
      position: employee.jobPosition,
      city: employee.city,
      country: employee.country,
      profilePictureUrl: employee.profilePictureUrl,
    };

    map.set(employee.orgId, {
      attributes,
      children: [],
      name,
    });

    return map;
  }, new Map<number, D3TreeInput>());
}

function buildD3Tree(employees: Array<EmployeeDoc>): Array<D3TreeInput> {
  const nodeMap = createNodeMap(employees);

  return employees.reduce<Array<D3TreeInput>>((result, employee) => {
    const node = nodeMap.get(employee.orgId);
    if (!node) {
      return result;
    }

    employee.parentOrgId === 0 // ceo
      ? result.push(node)
      : nodeMap.get(employee.parentOrgId)?.children.push(node);

    return result;
  }, []);
}

export { buildD3Tree };
export type { D3TreeInput };
