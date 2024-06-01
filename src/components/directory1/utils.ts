import { EmployeeData } from "./data";
import { Directory1UserDocument } from "./types";

function returnSearchInputData(usersDocs: Directory1UserDocument[]) {
  return Array.from(
    usersDocs.reduce<Set<string>>((acc, user) => {
      const { firstName, middleName, lastName } = user;
      acc.add(firstName);
      acc.add(middleName);
      acc.add(lastName);

      return acc;
    }, new Set<string>())
  );
}

type D3TreeInput = {
  attributes: Record<string, string>;
  children: D3TreeInput[];
  name: string;
};

function buildD3Tree(usersDocs: EmployeeData[]): D3TreeInput[] {
  const nodeMap = usersDocs.reduce<Map<number, D3TreeInput>>((map, employee) => {
    const name = `${employee.firstName} ${employee.middleName} ${employee.lastName}`;
    map.set(employee.orgId, { attributes: {}, children: [], name });

    return map;
  }, new Map<number, D3TreeInput>());

  const result = [] as Array<D3TreeInput>;

  usersDocs.forEach((employee) => {
    const node = nodeMap.get(employee.orgId);
    if (!node) {
      return;
    }

    if (employee.parentOrgId !== 0) {
      nodeMap.get(employee.parentOrgId)?.children.push(node);
    } else {
      result.push(node);
    }
  });

  return result;
}

export { returnSearchInputData, buildD3Tree };
