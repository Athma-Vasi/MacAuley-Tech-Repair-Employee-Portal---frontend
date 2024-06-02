import { DepartmentsWithDefaultKey, Directory1UserDocument } from "./types";

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

function returnIsStoreLocationDisabled(department: DepartmentsWithDefaultKey) {
  const disabledSet = new Set<DepartmentsWithDefaultKey>([
    "All Departments",
    "Executive Management",
    "Accounting",
    "Human Resources",
    "Marketing",
    "Sales",
    "Information Technology",
  ]);

  return disabledSet.has(department);
}

export { returnIsStoreLocationDisabled, returnSearchInputData };
