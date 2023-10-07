import { DirectoryUserDocument } from '../directory/types';

// adds a field to userDocs returning the request body for each user
function returnUsersRequestBodies({
  field,
  value,
  userDocs,
}: {
  field: string;
  value: any;
  userDocs: DirectoryUserDocument[];
}) {
  return userDocs
    .filter(
      (user) => user.firstName !== 'Miles' || user.lastName !== 'Vorkosigan'
    )
    .map((userDoc) => {
      const { _id } = userDoc;
      const requestBody = {
        userId: _id,
        field,
        value,
      };

      return requestBody;
    });
}

export { returnUsersRequestBodies };
