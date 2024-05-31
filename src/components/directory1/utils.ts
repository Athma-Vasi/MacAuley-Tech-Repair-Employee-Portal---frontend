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

export { returnSearchInputData };
