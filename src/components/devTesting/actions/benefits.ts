import { CURRENCY_DATA, REQUEST_STATUS } from "../../../constants/data";
import { Department } from "../../../types";
import { groupByField } from "../../../utils";
import { DirectoryUserDocument } from "../../directory/types";
import { USERS_DOCS } from "../constants";

const benefitsArray = [
  {
    planName: "Health Plan A",
    planKind: "Health",
    planDescription: "Comprehensive health coverage.",
    planStartDate: "2012-01-15",
    isPlanActive: true,
    monthlyPremium: "250.00",
    employerContribution: "150.00",
    employeeContribution: "100.00",
  },
  {
    planName: "Dental Plan B",
    planKind: "Dental",
    planDescription: "Basic dental coverage.",
    planStartDate: "2012-02-01",
    isPlanActive: false,
    monthlyPremium: "50.00",
    employerContribution: "30.00",
    employeeContribution: "20.00",
  },
  {
    planName: "Vision Plan X",
    planKind: "Vision",
    planDescription: "Vision care for all employees.",
    planStartDate: "2012-03-10",
    isPlanActive: true,
    monthlyPremium: "80.00",
    employerContribution: "50.00",
    employeeContribution: "30.00",
  },
  {
    planName: "Life Insurance Plus",
    planKind: "Life",
    planDescription: "Enhanced life insurance coverage.",
    planStartDate: "2012-04-05",
    isPlanActive: true,
    monthlyPremium: "150.00",
    employerContribution: "100.00",
    employeeContribution: "50.00",
  },
  {
    planName: "Disability Plan",
    planKind: "Disability",
    planDescription: "Short and long-term disability coverage.",
    planStartDate: "2012-05-20",
    isPlanActive: true,
    monthlyPremium: "100.00",
    employerContribution: "70.00",
    employeeContribution: "30.00",
  },
  {
    planName: "Retirement Plan B",
    planKind: "Retirement",
    planDescription: "401(k) plan with matching contributions.",
    planStartDate: "2012-06-08",
    isPlanActive: true,
    monthlyPremium: "180.00",
    employerContribution: "120.00",
    employeeContribution: "60.00",
  },
  {
    planName: "Education Assistance",
    planKind: "Education",
    planDescription: "Tuition reimbursement and education support.",
    planStartDate: "2012-07-14",
    isPlanActive: true,
    monthlyPremium: "60.00",
    employerContribution: "40.00",
    employeeContribution: "20.00",
  },
  {
    planName: "Other Plan",
    planKind: "Other",
    planDescription: "Customized benefits plan.",
    planStartDate: "2012-08-03",
    isPlanActive: true,
    monthlyPremium: "30.00",
    employerContribution: "15.00",
    employeeContribution: "15.00",
  },
  {
    planName: "Retirement Plan C",
    planKind: "Retirement",
    planDescription: "Additional retirement savings plan.",
    planStartDate: "2012-09-22",
    isPlanActive: false,
    monthlyPremium: "0.00",
    employerContribution: "0.00",
    employeeContribution: "0.00",
  },
  {
    planName: "Vision Plan Premium",
    planKind: "Vision",
    planDescription: "Premium vision care coverage.",
    planStartDate: "2012-10-11",
    isPlanActive: true,
    monthlyPremium: "70.00",
    employerContribution: "45.00",
    employeeContribution: "25.00",
  },
  {
    planName: "Health Plan D",
    planKind: "Health",
    planDescription: "Extended health coverage.",
    planStartDate: "2016-11-15",
    isPlanActive: true,
    monthlyPremium: "280.00",
    employerContribution: "180.00",
    employeeContribution: "100.00",
  },
  {
    planName: "Dental Plan C",
    planKind: "Dental",
    planDescription: "Advanced dental coverage.",
    planStartDate: "2016-12-01",
    isPlanActive: true,
    monthlyPremium: "75.00",
    employerContribution: "45.00",
    employeeContribution: "30.00",
  },
  {
    planName: "Vision Plan Premium Plus",
    planKind: "Vision",
    planDescription: "Premium vision care for executives.",
    planStartDate: "2017-01-10",
    isPlanActive: true,
    monthlyPremium: "90.00",
    employerContribution: "60.00",
    employeeContribution: "30.00",
  },
  {
    planName: "Life Insurance Gold",
    planKind: "Life",
    planDescription: "Gold-tier life insurance coverage.",
    planStartDate: "2017-02-05",
    isPlanActive: false,
    monthlyPremium: "0.00",
    employerContribution: "0.00",
    employeeContribution: "0.00",
  },
  {
    planName: "Disability Plan Extended",
    planKind: "Disability",
    planDescription: "Extended short and long-term disability coverage.",
    planStartDate: "2017-03-20",
    isPlanActive: true,
    monthlyPremium: "120.00",
    employerContribution: "80.00",
    employeeContribution: "40.00",
  },
  {
    planName: "Retirement Plan D",
    planKind: "Retirement",
    planDescription: "Customized retirement savings plan.",
    planStartDate: "2017-04-08",
    isPlanActive: true,
    monthlyPremium: "200.00",
    employerContribution: "140.00",
    employeeContribution: "60.00",
  },
  {
    planName: "Education Support Program",
    planKind: "Education",
    planDescription: "Support for ongoing education.",
    planStartDate: "2017-05-14",
    isPlanActive: true,
    monthlyPremium: "55.00",
    employerContribution: "35.00",
    employeeContribution: "20.00",
  },
  {
    planName: "Other Plan 1",
    planKind: "Other",
    planDescription: "Miscellaneous benefits plan.",
    planStartDate: "2017-06-03",
    isPlanActive: true,
    monthlyPremium: "40.00",
    employerContribution: "20.00",
    employeeContribution: "20.00",
  },
  {
    planName: "Retirement Plan E",
    planKind: "Retirement",
    planDescription: "Additional retirement savings plan.",
    planStartDate: "2017-07-22",
    isPlanActive: true,
    monthlyPremium: "160.00",
    employerContribution: "100.00",
    employeeContribution: "60.00",
  },
  {
    planName: "Vision Plan Premium Deluxe",
    planKind: "Vision",
    planDescription: "Deluxe vision care coverage.",
    planStartDate: "2017-08-11",
    isPlanActive: true,
    monthlyPremium: "80.00",
    employerContribution: "50.00",
    employeeContribution: "30.00",
  },
  {
    planName: "Health Plan E",
    planKind: "Health",
    planDescription: "Premium health coverage.",
    planStartDate: "2007-11-15",
    isPlanActive: true,
    monthlyPremium: "320.00",
    employerContribution: "220.00",
    employeeContribution: "100.00",
  },
  {
    planName: "Dental Plan D",
    planKind: "Dental",
    planDescription: "Advanced dental coverage.",
    planStartDate: "2007-12-01",
    isPlanActive: true,
    monthlyPremium: "85.00",
    employerContribution: "55.00",
    employeeContribution: "30.00",
  },
  {
    planName: "Vision Plan Elite",
    planKind: "Vision",
    planDescription: "Elite vision care for executives.",
    planStartDate: "2009-01-10",
    isPlanActive: true,
    monthlyPremium: "110.00",
    employerContribution: "70.00",
    employeeContribution: "40.00",
  },
  {
    planName: "Life Insurance Platinum",
    planKind: "Life",
    planDescription: "Platinum-tier life insurance coverage.",
    planStartDate: "2009-02-05",
    isPlanActive: false,
    monthlyPremium: "0.00",
    employerContribution: "0.00",
    employeeContribution: "0.00",
  },
  {
    planName: "Disability Plan Extended Plus",
    planKind: "Disability",
    planDescription: "Extended plus short and long-term disability coverage.",
    planStartDate: "2009-03-20",
    isPlanActive: true,
    monthlyPremium: "140.00",
    employerContribution: "90.00",
    employeeContribution: "50.00",
  },
  {
    planName: "Retirement Plan F",
    planKind: "Retirement",
    planDescription: "Customized retirement savings plan.",
    planStartDate: "2009-04-08",
    isPlanActive: true,
    monthlyPremium: "240.00",
    employerContribution: "160.00",
    employeeContribution: "80.00",
  },
  {
    planName: "Education Support Program Deluxe",
    planKind: "Education",
    planDescription: "Deluxe support for ongoing education.",
    planStartDate: "2009-05-14",
    isPlanActive: true,
    monthlyPremium: "75.00",
    employerContribution: "50.00",
    employeeContribution: "25.00",
  },
  {
    planName: "Other Plan 2",
    planKind: "Other",
    planDescription: "Customized miscellaneous benefits plan.",
    planStartDate: "2009-06-03",
    isPlanActive: true,
    monthlyPremium: "50.00",
    employerContribution: "30.00",
    employeeContribution: "20.00",
  },
  {
    planName: "Retirement Plan G",
    planKind: "Retirement",
    planDescription: "Additional premium retirement savings plan.",
    planStartDate: "2009-07-22",
    isPlanActive: true,
    monthlyPremium: "180.00",
    employerContribution: "120.00",
    employeeContribution: "60.00",
  },
  {
    planName: "Vision Plan Platinum Deluxe",
    planKind: "Vision",
    planDescription: "Platinum deluxe vision care coverage.",
    planStartDate: "2009-08-11",
    isPlanActive: true,
    monthlyPremium: "100.00",
    employerContribution: "70.00",
    employeeContribution: "30.00",
  },
  {
    planName: "Health Plan F",
    planKind: "Health",
    planDescription: "Premium health coverage.",
    planStartDate: "2013-11-15",
    isPlanActive: true,
    monthlyPremium: "350.00",
    employerContribution: "250.00",
    employeeContribution: "100.00",
  },
  {
    planName: "Dental Plan E",
    planKind: "Dental",
    planDescription: "Advanced dental coverage.",
    planStartDate: "2013-12-01",
    isPlanActive: true,
    monthlyPremium: "90.00",
    employerContribution: "60.00",
    employeeContribution: "30.00",
  },
  {
    planName: "Vision Plan Ultimate",
    planKind: "Vision",
    planDescription: "Ultimate vision care for executives.",
    planStartDate: "2012-01-10",
    isPlanActive: true,
    monthlyPremium: "120.00",
    employerContribution: "80.00",
    employeeContribution: "40.00",
  },
  {
    planName: "Life Insurance Diamond",
    planKind: "Life",
    planDescription: "Diamond-tier life insurance coverage.",
    planStartDate: "2012-02-05",
    isPlanActive: false,
    monthlyPremium: "0.00",
    employerContribution: "0.00",
    employeeContribution: "0.00",
  },
  {
    planName: "Disability Plan Extended Deluxe",
    planKind: "Disability",
    planDescription: "Extended deluxe short and long-term disability coverage.",
    planStartDate: "2012-03-20",
    isPlanActive: true,
    monthlyPremium: "160.00",
    employerContribution: "110.00",
    employeeContribution: "50.00",
  },
  {
    planName: "Retirement Plan H",
    planKind: "Retirement",
    planDescription: "Customized premium retirement savings plan.",
    planStartDate: "2012-04-08",
    isPlanActive: true,
    monthlyPremium: "280.00",
    employerContribution: "200.00",
    employeeContribution: "80.00",
  },
  {
    planName: "Education Support Program Elite",
    planKind: "Education",
    planDescription: "Elite support for ongoing education.",
    planStartDate: "2012-05-14",
    isPlanActive: true,
    monthlyPremium: "95.00",
    employerContribution: "65.00",
    employeeContribution: "30.00",
  },
  {
    planName: "Other Plan 3",
    planKind: "Other",
    planDescription: "Customized premium miscellaneous benefits plan.",
    planStartDate: "2012-06-03",
    isPlanActive: true,
    monthlyPremium: "70.00",
    employerContribution: "40.00",
    employeeContribution: "30.00",
  },
  {
    planName: "Retirement Plan I",
    planKind: "Retirement",
    planDescription: "Additional premium retirement savings plan.",
    planStartDate: "2012-07-22",
    isPlanActive: true,
    monthlyPremium: "200.00",
    employerContribution: "140.00",
    employeeContribution: "60.00",
  },
  {
    planName: "Vision Plan Diamond Deluxe",
    planKind: "Vision",
    planDescription: "Diamond deluxe vision care coverage.",
    planStartDate: "2012-08-11",
    isPlanActive: true,
    monthlyPremium: "120.00",
    employerContribution: "80.00",
    employeeContribution: "40.00",
  },
  {
    planName: "Health Plan G",
    planKind: "Health",
    planDescription: "Premium health coverage.",
    planStartDate: "2010-11-15",
    isPlanActive: true,
    monthlyPremium: "400.00",
    employerContribution: "300.00",
    employeeContribution: "100.00",
  },
  {
    planName: "Dental Plan F",
    planKind: "Dental",
    planDescription: "Advanced dental coverage.",
    planStartDate: "2010-12-01",
    isPlanActive: true,
    monthlyPremium: "100.00",
    employerContribution: "70.00",
    employeeContribution: "30.00",
  },
  {
    planName: "Vision Plan Premium Ultimate",
    planKind: "Vision",
    planDescription: "Premium ultimate vision care for executives.",
    planStartDate: "2011-01-10",
    isPlanActive: true,
    monthlyPremium: "150.00",
    employerContribution: "100.00",
    employeeContribution: "50.00",
  },
  {
    planName: "Life Insurance Platinum Deluxe",
    planKind: "Life",
    planDescription: "Platinum deluxe life insurance coverage.",
    planStartDate: "2011-02-05",
    isPlanActive: false,
    monthlyPremium: "0.00",
    employerContribution: "0.00",
    employeeContribution: "0.00",
  },
  {
    planName: "Disability Plan Premium Elite",
    planKind: "Disability",
    planDescription: "Premium elite short and long-term disability coverage.",
    planStartDate: "2011-03-20",
    isPlanActive: true,
    monthlyPremium: "200.00",
    employerContribution: "140.00",
    employeeContribution: "60.00",
  },
  {
    planName: "Retirement Plan J",
    planKind: "Retirement",
    planDescription: "Customized premium retirement savings plan.",
    planStartDate: "2011-04-08",
    isPlanActive: true,
    monthlyPremium: "350.00",
    employerContribution: "250.00",
    employeeContribution: "100.00",
  },
  {
    planName: "Education Support Program Diamond",
    planKind: "Education",
    planDescription: "Diamond support for ongoing education.",
    planStartDate: "2011-05-14",
    isPlanActive: true,
    monthlyPremium: "120.00",
    employerContribution: "80.00",
    employeeContribution: "40.00",
  },
  {
    planName: "Other Plan 4",
    planKind: "Other",
    planDescription: "Customized premium miscellaneous benefits plan.",
    planStartDate: "2011-06-03",
    isPlanActive: true,
    monthlyPremium: "90.00",
    employerContribution: "60.00",
    employeeContribution: "30.00",
  },
  {
    planName: "Retirement Plan K",
    planKind: "Retirement",
    planDescription: "Additional ultimate retirement savings plan.",
    planStartDate: "2011-07-22",
    isPlanActive: true,
    monthlyPremium: "280.00",
    employerContribution: "200.00",
    employeeContribution: "80.00",
  },
  {
    planName: "Vision Plan Diamond Elite",
    planKind: "Vision",
    planDescription: "Diamond elite vision care coverage.",
    planStartDate: "2011-08-11",
    isPlanActive: true,
    monthlyPremium: "160.00",
    employerContribution: "110.00",
    employeeContribution: "50.00",
  },
];

type GroupedByBenefitKind = Record<
  string | number | symbol,
  {
    planName: string;
    planKind: string;
    planDescription: string;
    planStartDate: string;
    isPlanActive: boolean;
    monthlyPremium: string;
    employerContribution: string;
    employeeContribution: string;
  }[]
>;

// return benefits based on department of employee
// one branch at a time to avoid overloading server
function returnBenefitsRequestBodies({
  userDocs,
  groupedByBenefits,
}: {
  userDocs: DirectoryUserDocument[];
  groupedByBenefits: GroupedByBenefitKind;
}) {
  return userDocs.reduce((benefitsRequestBodiesAcc, userDoc) => {
    const { department } = userDoc;

    const randomCurrency =
      CURRENCY_DATA[Math.floor(Math.random() * CURRENCY_DATA.length)];

    const randomRequestStatus =
      REQUEST_STATUS[Math.floor(Math.random() * REQUEST_STATUS.length)];

    const benefit = {
      username: userDoc.username,
      currency: randomCurrency,
      requestStatus: randomRequestStatus,
    };

    // ignore all other branches
    if (department !== "Maintenance") {
      return benefitsRequestBodiesAcc;
    }
    const randomPoolBenefits = Object.entries(groupedByBenefits).reduce(
      (benefitsAcc, groupedBenefitTuple) => {
        const [benefitKind, benefitKindArray] = groupedBenefitTuple;
        if (benefitKind === "Dental" || benefitKind === "Vision") {
          return benefitsAcc;
        }

        const randomBenefit =
          benefitKindArray[Math.floor(Math.random() * benefitKindArray.length)];

        return benefitsAcc.concat(randomBenefit);
      },
      [] as Record<string, any>[]
    );

    const requestBodies = randomPoolBenefits.map((randomBenefit) => {
      const body = {
        ...benefit,
        ...randomBenefit,
      };

      return body;
    });

    benefitsRequestBodiesAcc.push(...requestBodies);

    return benefitsRequestBodiesAcc;
  }, [] as any[]);
}

export { benefitsArray, returnBenefitsRequestBodies };
export type { GroupedByBenefitKind };
