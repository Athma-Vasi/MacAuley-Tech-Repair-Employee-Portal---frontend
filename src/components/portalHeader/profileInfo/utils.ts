import { UserDocument } from '../../../types';
import {
  formatDate,
  splitCamelCase,
  replaceLastCommaWithAnd,
} from '../../../utils';

type ProfileInfoObject = Record<
  string, // page name
  Array<{
    inputName: string;
    inputValue?: string | boolean;
  }>
>;

function returnProfileInfoObject(
  userDocument: Omit<UserDocument, '__v' | 'password'> | null
): ProfileInfoObject {
  if (!userDocument) {
    return {};
  }

  const initialFormReviewObjectAcc = {
    personal: [],
    contact: [],
    address: [],
    employment: [],
  };

  return Object.entries(userDocument).reduce(
    (formReviewObjectAcc: ProfileInfoObject, keyValTuple) => {
      const [key, value] = keyValTuple;

      const isBelongToPersonal =
        key === 'username' ||
        key === 'firstName' ||
        key === 'middleName' ||
        key === 'lastName' ||
        key === 'preferredName' ||
        key === 'preferredPronouns' ||
        key === 'dateOfBirth';

      if (isBelongToPersonal) {
        if (key === 'dateOfBirth') {
          const formattedDate = formatDate({
            date: value as string,
            formatOptions: {
              dateStyle: 'full',
              localeMatcher: 'best fit',
              formatMatcher: 'best fit',
            },
            locale: 'en-US',
          });

          formReviewObjectAcc.personal.push({
            inputName: splitCamelCase(key),
            inputValue: formattedDate,
          });

          return formReviewObjectAcc;
        }

        formReviewObjectAcc.personal.push({
          inputName: splitCamelCase(key),
          inputValue: value as string,
        });

        return formReviewObjectAcc;
      }

      const isBelongToContact =
        key === 'email' ||
        key === 'contactNumber' ||
        key === 'emergencyContact';
      if (isBelongToContact) {
        if (key === 'emergencyContact') {
          Object.entries(value as Record<string, string>).forEach(
            ([key, value]) => {
              key === 'fullName'
                ? formReviewObjectAcc.contact.push({
                    inputName: 'Emergency Contact Name',
                    inputValue: value,
                  })
                : formReviewObjectAcc.contact.push({
                    inputName: 'Emergency Contact Number',
                    inputValue: value,
                  });
            }
          );

          return formReviewObjectAcc;
        }

        formReviewObjectAcc.contact.push({
          inputName: splitCamelCase(key),
          inputValue: value as string,
        });

        return formReviewObjectAcc;
      }

      const isBelongToAddress = key === 'address';
      if (isBelongToAddress) {
        Object.entries(value as Record<string, string>).forEach(
          ([key, value]) => {
            formReviewObjectAcc.address.push({
              inputName: splitCamelCase(key),
              inputValue: value,
            });
          }
        );

        return formReviewObjectAcc;
      }

      const isBelongToEmployment =
        key === 'jobPosition' ||
        key === 'department' ||
        key === 'storeLocation' ||
        key === 'startDate' ||
        key === 'roles';
      if (isBelongToEmployment) {
        if (key === 'roles') {
          const userRoles = value as string[];
          formReviewObjectAcc.employment.push({
            inputName: splitCamelCase(key),
            inputValue: replaceLastCommaWithAnd(userRoles.join(', ')),
          });

          return formReviewObjectAcc;
        }

        if (key === 'startDate') {
          const formattedDate = formatDate({
            date: value as string,
            formatOptions: {
              dateStyle: 'full',
              localeMatcher: 'best fit',
              formatMatcher: 'best fit',
            },
            locale: 'en-US',
          });

          formReviewObjectAcc.employment.push({
            inputName: splitCamelCase(key),
            inputValue: formattedDate,
          });

          return formReviewObjectAcc;
        }

        formReviewObjectAcc.employment.push({
          inputName: splitCamelCase(key),
          inputValue: value as string,
        });

        return formReviewObjectAcc;
      }

      return formReviewObjectAcc;
    },
    initialFormReviewObjectAcc
  );
}

export { returnProfileInfoObject };
export type { ProfileInfoObject };
