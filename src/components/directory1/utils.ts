import { Directory1UserDocument } from "./types";

function returnSearchInputData(usersDocs: Directory1UserDocument[]) {
  return usersDocs.reduce<string[]>((acc, user) => {
    const { firstName, middleName, lastName } = user;
    acc.push(firstName);
    acc.push(middleName);
    acc.push(lastName);

    return acc;
  }, []);
}

export { returnSearchInputData };
