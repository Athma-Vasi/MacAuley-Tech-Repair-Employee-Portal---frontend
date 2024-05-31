import { PROPERTY_DESCRIPTOR } from "../../constants/data";
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

function addOrgIdsToUsers(usersDocs: EmployeeData) {
  const maxOrgId = usersDocs.reduce((acc, user) => {
    const orgId = user.orgId as number;
    return orgId > acc ? orgId : acc;
  }, 0);
}

function createNewMaintenanceSupervisors(usersDocs: EmployeeData) {}

function addOrgIds(usersDocs: EmployeeData) {
  return usersDocs.reduce<EmployeeData>((acc, user, idx) => {
    const newUser = Object.entries(user).reduce((userAcc, [key, value]) => {
      if (key === "orgId") {
        if (value > 44) {
          Object.defineProperty(userAcc, key, {
            value: Number.MIN_SAFE_INTEGER,
            ...PROPERTY_DESCRIPTOR,
          });
        }
      }

      if (key === "parentOrgId") {
        if (value > 44) {
          Object.defineProperty(userAcc, key, {
            value: Number.MIN_SAFE_INTEGER,
            ...PROPERTY_DESCRIPTOR,
          });
        }
      }

      userAcc[key] = value;

      return userAcc;
    }, Object.create(null));

    acc[idx] = newUser;

    return acc;
  }, Array.from({ length: usersDocs.length }));
}

export {
  addOrgIdsToUsers,
  returnSearchInputData,
  createNewMaintenanceSupervisors,
  addOrgIds,
};
