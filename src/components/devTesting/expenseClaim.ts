import { groupByField } from '../../utils';
import { DirectoryUserDocument } from '../directory/types';

const expenseClaimArray = [
  {
    uploadedFilesIds: [],
    expenseClaimKind: 'Travel and Accommodation',
    expenseClaimAmount: '500.25',
    expenseClaimCurrency: 'USD',
    expenseClaimDate: '2023-09-15',
    expenseClaimDescription:
      'Business trip to attend a web development conference.',
    additionalComments:
      'The conference was highly informative and beneficial for our team.',
    acknowledgement: true,
    requestStatus: 'approved',
  },
  {
    uploadedFilesIds: [],
    expenseClaimKind: 'Equipment and Supplies',
    expenseClaimAmount: '1200',
    expenseClaimCurrency: 'EUR',
    expenseClaimDate: '2023-09-10',
    expenseClaimDescription: 'Purchase of new tech repair tools and equipment.',
    additionalComments: 'These tools will improve our repair efficiency.',
    acknowledgement: true,
    requestStatus: 'pending',
  },
  {
    uploadedFilesIds: [],
    expenseClaimKind: 'Communication and Utilities',
    expenseClaimAmount: '80.75',
    expenseClaimCurrency: 'GBP',
    expenseClaimDate: '2023-08-25',
    expenseClaimDescription: 'Monthly phone and internet bills for August.',
    additionalComments:
      'We need to keep our communication lines open for clients.',
    acknowledgement: true,
    requestStatus: 'approved',
  },
  {
    uploadedFilesIds: [],
    expenseClaimKind: 'Training and Certifications',
    expenseClaimAmount: '350',
    expenseClaimCurrency: 'USD',
    expenseClaimDate: '2023-07-12',
    expenseClaimDescription: 'Enrollment in an advanced tech repair course.',
    additionalComments:
      'This course will enhance our skills in troubleshooting.',
    acknowledgement: true,
    requestStatus: 'approved',
  },
  {
    uploadedFilesIds: [],
    expenseClaimKind: 'Software and Licenses',
    expenseClaimAmount: '250',
    expenseClaimCurrency: 'CAD',
    expenseClaimDate: '2023-06-20',
    expenseClaimDescription: 'Purchase of software licenses for repair tools.',
    additionalComments: 'These licenses are essential for our work.',
    acknowledgement: true,
    requestStatus: 'approved',
  },
  {
    uploadedFilesIds: [],
    expenseClaimKind: 'Marketing and Advertising',
    expenseClaimAmount: '300',
    expenseClaimCurrency: 'AUD',
    expenseClaimDate: '2023-05-18',
    expenseClaimDescription:
      'Online advertising campaign for our tech repair services.',
    additionalComments:
      'We aim to reach a broader audience with this campaign.',
    acknowledgement: true,
    requestStatus: 'approved',
  },
  {
    uploadedFilesIds: [],
    expenseClaimKind: 'Insurance',
    expenseClaimAmount: '180.50',
    expenseClaimCurrency: 'JPY',
    expenseClaimDate: '2023-04-05',
    expenseClaimDescription: 'Annual insurance premium for our equipment.',
    additionalComments: 'Ensuring the safety of our valuable tools is crucial.',
    acknowledgement: true,
    requestStatus: 'approved',
  },
  {
    uploadedFilesIds: [],
    expenseClaimKind: 'Rent and Leasing',
    expenseClaimAmount: '2000',
    expenseClaimCurrency: 'USD',
    expenseClaimDate: '2023-03-15',
    expenseClaimDescription: 'Monthly rent for our tech repair shop.',
    additionalComments:
      'Our location is vital for serving our local customers.',
    acknowledgement: true,
    requestStatus: 'approved',
  },
  {
    uploadedFilesIds: [],
    expenseClaimKind: 'Legal and Professional Fees',
    expenseClaimAmount: '450',
    expenseClaimCurrency: 'EUR',
    expenseClaimDate: '2023-02-10',
    expenseClaimDescription: 'Legal consultation and contract review.',
    additionalComments:
      'Ensuring our contracts are legally sound is essential.',
    acknowledgement: true,
    requestStatus: 'approved',
  },
  {
    uploadedFilesIds: [],
    expenseClaimKind: 'Miscellaneous',
    expenseClaimAmount: '75.50',
    expenseClaimCurrency: 'GBP',
    expenseClaimDate: '2023-01-22',
    expenseClaimDescription: 'Office supplies for the new year.',
    additionalComments: 'Keeping our workspace organized and efficient.',
    acknowledgement: true,
    requestStatus: 'approved',
  },
  {
    uploadedFilesIds: [],
    expenseClaimKind: 'Miscellaneous',
    expenseClaimAmount: '99.99',
    expenseClaimCurrency: 'USD',
    expenseClaimDate: '2023-09-20',
    expenseClaimDescription:
      'Purchase of office decorations to boost team morale.',
    additionalComments:
      'Our office looks more vibrant now, and everyone loves it!',
    acknowledgement: true,
    requestStatus: 'approved',
  },
  {
    uploadedFilesIds: [],
    expenseClaimKind: 'Insurance',
    expenseClaimAmount: '550',
    expenseClaimCurrency: 'GBP',
    expenseClaimDate: '2023-08-15',
    expenseClaimDescription:
      'Annual insurance premium for protecting our tech repair equipment.',
    additionalComments:
      'Safety is our top priority, and this insurance ensures it.',
    acknowledgement: true,
    requestStatus: 'approved',
  },
  {
    uploadedFilesIds: [],
    expenseClaimKind: 'Equipment and Supplies',
    expenseClaimAmount: '800.75',
    expenseClaimCurrency: 'CAD',
    expenseClaimDate: '2023-07-10',
    expenseClaimDescription:
      'Purchase of specialized repair tools for handling advanced tech devices.',
    additionalComments: 'These tools will give us an edge in complex repairs.',
    acknowledgement: true,
    requestStatus: 'pending',
  },
  {
    uploadedFilesIds: [],
    expenseClaimKind: 'Communication and Utilities',
    expenseClaimAmount: '60',
    expenseClaimCurrency: 'AUD',
    expenseClaimDate: '2023-06-05',
    expenseClaimDescription:
      'Monthly phone and internet bill for seamless client communication.',
    additionalComments:
      'Staying connected with our clients is vital for our reputation.',
    acknowledgement: true,
    requestStatus: 'approved',
  },
  {
    uploadedFilesIds: [],
    expenseClaimKind: 'Training and Certifications',
    expenseClaimAmount: '350',
    expenseClaimCurrency: 'EUR',
    expenseClaimDate: '2023-05-20',
    expenseClaimDescription:
      'Enrollment in a cybersecurity certification program.',
    additionalComments:
      'Cybersecurity knowledge is essential in our tech repair business.',
    acknowledgement: true,
    requestStatus: 'approved',
  },
  {
    uploadedFilesIds: [],
    expenseClaimKind: 'Travel and Accommodation',
    expenseClaimAmount: '350.50',
    expenseClaimCurrency: 'USD',
    expenseClaimDate: '2023-04-15',
    expenseClaimDescription:
      'Business trip to attend a tech expo and network with potential partners.',
    additionalComments:
      'Expanding our network is crucial for future collaborations.',
    acknowledgement: true,
    requestStatus: 'approved',
  },
  {
    uploadedFilesIds: [],
    expenseClaimKind: 'Software and Licenses',
    expenseClaimAmount: '250',
    expenseClaimCurrency: 'JPY',
    expenseClaimDate: '2023-03-10',
    expenseClaimDescription:
      'Purchase of software licenses for data recovery tools.',
    additionalComments:
      'Data recovery is a valuable service we offer to our clients.',
    acknowledgement: true,
    requestStatus: 'approved',
  },
  {
    uploadedFilesIds: [],
    expenseClaimKind: 'Rent and Leasing',
    expenseClaimAmount: '1500',
    expenseClaimCurrency: 'CNY',
    expenseClaimDate: '2023-02-05',
    expenseClaimDescription:
      'Monthly rent for our tech repair shop in a bustling commercial area.',
    additionalComments:
      'Our prime location attracts a steady stream of customers.',
    acknowledgement: true,
    requestStatus: 'approved',
  },
  {
    uploadedFilesIds: [],
    expenseClaimKind: 'Marketing and Advertising',
    expenseClaimAmount: '300',
    expenseClaimCurrency: 'USD',
    expenseClaimDate: '2023-01-15',
    expenseClaimDescription:
      'Social media advertising campaign to promote our tech repair services.',
    additionalComments:
      'The campaign helped us reach a wider audience and gain new clients.',
    acknowledgement: true,
    requestStatus: 'approved',
  },
  {
    uploadedFilesIds: [],
    expenseClaimKind: 'Legal and Professional Fees',
    expenseClaimAmount: '420.25',
    expenseClaimCurrency: 'EUR',
    expenseClaimDate: '2022-12-20',
    expenseClaimDescription:
      'Legal consultation for reviewing client contracts and agreements.',
    additionalComments:
      'Ensuring our contracts protect our interests and those of our clients.',
    acknowledgement: true,
    requestStatus: 'approved',
  },
  {
    uploadedFilesIds: [],
    expenseClaimKind: 'Travel and Accommodation',
    expenseClaimAmount: '750',
    expenseClaimCurrency: 'USD',
    expenseClaimDate: '2023-09-10',
    expenseClaimDescription:
      'Business trip to a tech expo in [City Name] to explore new industry trends.',
    additionalComments:
      'The expo was enlightening, and I made some valuable industry contacts.',
    acknowledgement: true,
    requestStatus: 'approved',
  },
  {
    uploadedFilesIds: [],
    expenseClaimKind: 'Insurance',
    expenseClaimAmount: '420.50',
    expenseClaimCurrency: 'GBP',
    expenseClaimDate: '2023-08-20',
    expenseClaimDescription:
      'Annual insurance premium for safeguarding our tech repair equipment and tools.',
    additionalComments:
      'Protecting our assets is crucial to our long-term success.',
    acknowledgement: true,
    requestStatus: 'approved',
  },
  {
    uploadedFilesIds: [],
    expenseClaimKind: 'Equipment and Supplies',
    expenseClaimAmount: '950.25',
    expenseClaimCurrency: 'CAD',
    expenseClaimDate: '2023-07-15',
    expenseClaimDescription:
      'Procurement of high-quality tech repair equipment and essential supplies.',
    additionalComments:
      'These new tools will help us deliver top-notch services.',
    acknowledgement: true,
    requestStatus: 'approved',
  },
  {
    uploadedFilesIds: [],
    expenseClaimKind: 'Communication and Utilities',
    expenseClaimAmount: '70.30',
    expenseClaimCurrency: 'AUD',
    expenseClaimDate: '2023-06-10',
    expenseClaimDescription:
      'Monthly communication and utility expenses to keep our tech shop running smoothly.',
    additionalComments:
      'Reliable utilities are the backbone of our operations.',
    acknowledgement: true,
    requestStatus: 'approved',
  },
  {
    uploadedFilesIds: [],
    expenseClaimKind: 'Training and Certifications',
    expenseClaimAmount: '550',
    expenseClaimCurrency: 'EUR',
    expenseClaimDate: '2023-05-05',
    expenseClaimDescription:
      'Enrollment in an advanced electronics repair certification program.',
    additionalComments:
      'This certification will elevate our reputation in the field.',
    acknowledgement: true,
    requestStatus: 'approved',
  },
  {
    uploadedFilesIds: [],
    expenseClaimKind: 'Software and Licenses',
    expenseClaimAmount: '180',
    expenseClaimCurrency: 'JPY',
    expenseClaimDate: '2023-04-22',
    expenseClaimDescription:
      'Investment in essential software licenses to enhance our repair capabilities.',
    additionalComments: 'Efficient software is vital for our workflow.',
    acknowledgement: true,
    requestStatus: 'approved',
  },
  {
    uploadedFilesIds: [],
    expenseClaimKind: 'Rent and Leasing',
    expenseClaimAmount: '2200',
    expenseClaimCurrency: 'CNY',
    expenseClaimDate: '2023-03-18',
    expenseClaimDescription:
      'Monthly rent for our tech repair shop located in a bustling commercial district.',
    additionalComments: 'Our prime location draws a steady stream of clients.',
    acknowledgement: true,
    requestStatus: 'approved',
  },
  {
    uploadedFilesIds: [],
    expenseClaimKind: 'Marketing and Advertising',
    expenseClaimAmount: '350',
    expenseClaimCurrency: 'USD',
    expenseClaimDate: '2023-02-12',
    expenseClaimDescription:
      'Online marketing campaign to promote our tech repair services on social media platforms.',
    additionalComments:
      'The campaign led to an increase in customer inquiries.',
    acknowledgement: true,
    requestStatus: 'approved',
  },
  {
    uploadedFilesIds: [],
    expenseClaimKind: 'Legal and Professional Fees',
    expenseClaimAmount: '320.75',
    expenseClaimCurrency: 'EUR',
    expenseClaimDate: '2023-01-08',
    expenseClaimDescription:
      'Legal consultation for drafting a secure and client-friendly service agreement.',
    additionalComments: 'A strong agreement builds trust with our clients.',
    acknowledgement: true,
    requestStatus: 'approved',
  },
  {
    uploadedFilesIds: [],
    expenseClaimKind: 'Miscellaneous',
    expenseClaimAmount: '55.60',
    expenseClaimCurrency: 'GBP',
    expenseClaimDate: '2022-12-02',
    expenseClaimDescription:
      'Purchase of ergonomic office chairs for our team to enhance their comfort and productivity.',
    additionalComments: 'A comfortable workspace leads to better results.',
    acknowledgement: true,
    requestStatus: 'approved',
  },
  {
    uploadedFilesIds: [],
    expenseClaimKind: 'Training and Certifications',
    expenseClaimAmount: '350.75',
    expenseClaimCurrency: 'USD',
    expenseClaimDate: '2023-09-18',
    expenseClaimDescription:
      "Enrollment in an intensive cybersecurity course to protect our clients' data.",
    additionalComments:
      'Data security is non-negotiable, and this course is a step in the right direction.',
    acknowledgement: true,
    requestStatus: 'approved',
  },
  {
    uploadedFilesIds: [],
    expenseClaimKind: 'Software and Licenses',
    expenseClaimAmount: '180.50',
    expenseClaimCurrency: 'EUR',
    expenseClaimDate: '2023-08-22',
    expenseClaimDescription:
      'Acquisition of software licenses for enhancing our repair diagnostics capabilities.',
    additionalComments:
      'Advanced diagnostics software allows us to pinpoint issues more efficiently.',
    acknowledgement: true,
    requestStatus: 'approved',
  },
  {
    uploadedFilesIds: [],
    expenseClaimKind: 'Rent and Leasing',
    expenseClaimAmount: '2200',
    expenseClaimCurrency: 'CAD',
    expenseClaimDate: '2023-07-16',
    expenseClaimDescription:
      'Monthly rent payment for our strategically located tech repair shop.',
    additionalComments:
      'Our location brings us closer to both residential and business clients.',
    acknowledgement: true,
    requestStatus: 'approved',
  },
  {
    uploadedFilesIds: [],
    expenseClaimKind: 'Communication and Utilities',
    expenseClaimAmount: '75',
    expenseClaimCurrency: 'AUD',
    expenseClaimDate: '2023-06-10',
    expenseClaimDescription:
      'Monthly communication and utility expenses to keep our services running smoothly.',
    additionalComments:
      'Reliable communication and utilities are the backbone of our business.',
    acknowledgement: true,
    requestStatus: 'approved',
  },
  {
    uploadedFilesIds: [],
    expenseClaimKind: 'Equipment and Supplies',
    expenseClaimAmount: '900.25',
    expenseClaimCurrency: 'JPY',
    expenseClaimDate: '2023-05-15',
    expenseClaimDescription:
      'Procurement of cutting-edge repair tools and supplies to stay ahead of the competition.',
    additionalComments:
      'Investing in top-tier tools is an investment in our future success.',
    acknowledgement: true,
    requestStatus: 'approved',
  },
  {
    uploadedFilesIds: [],
    expenseClaimKind: 'Legal and Professional Fees',
    expenseClaimAmount: '320',
    expenseClaimCurrency: 'CNY',
    expenseClaimDate: '2023-04-20',
    expenseClaimDescription:
      'Legal consultation to review and update our service agreements.',
    additionalComments:
      'Having iron-clad agreements benefits both us and our clients.',
    acknowledgement: true,
    requestStatus: 'approved',
  },
  {
    uploadedFilesIds: [],
    expenseClaimKind: 'Marketing and Advertising',
    expenseClaimAmount: '300.50',
    expenseClaimCurrency: 'USD',
    expenseClaimDate: '2023-03-15',
    expenseClaimDescription:
      'Digital marketing campaign to increase our online presence and attract more clients.',
    additionalComments:
      "A strong online presence is essential in today's market.",
    acknowledgement: true,
    requestStatus: 'approved',
  },
  {
    uploadedFilesIds: [],
    expenseClaimKind: 'Travel and Accommodation',
    expenseClaimAmount: '600',
    expenseClaimCurrency: 'GBP',
    expenseClaimDate: '2023-02-12',
    expenseClaimDescription:
      'Business trip to attend a tech innovation summit and network with industry leaders.',
    additionalComments:
      'The summit broadened our horizons and opened up new business opportunities.',
    acknowledgement: true,
    requestStatus: 'approved',
  },
  {
    uploadedFilesIds: [],
    expenseClaimKind: 'Miscellaneous',
    expenseClaimAmount: '45.75',
    expenseClaimCurrency: 'EUR',
    expenseClaimDate: '2023-01-08',
    expenseClaimDescription:
      'Purchase of office plants to create a more vibrant and eco-friendly workspace.',
    additionalComments:
      'Greenery enhances the office atmosphere and employee well-being.',
    acknowledgement: true,
    requestStatus: 'approved',
  },
  {
    uploadedFilesIds: [],
    expenseClaimKind: 'Insurance',
    expenseClaimAmount: '480',
    expenseClaimCurrency: 'AUD',
    expenseClaimDate: '2022-12-02',
    expenseClaimDescription:
      'Annual insurance premium for safeguarding our tech repair tools and equipment.',
    additionalComments: 'Peace of mind knowing our assets are protected.',
    acknowledgement: true,
    requestStatus: 'approved',
  },
  {
    uploadedFilesIds: [],
    expenseClaimKind: 'Travel and Accommodation',
    expenseClaimAmount: '950.75',
    expenseClaimCurrency: 'USD',
    expenseClaimDate: '2023-09-18',
    expenseClaimDescription:
      'Business trip to a web development conference in [City Name].',
    additionalComments:
      'The conference was enlightening, and I learned about the latest web development trends.',
    acknowledgement: true,
    requestStatus: 'approved',
  },
  {
    uploadedFilesIds: [],
    expenseClaimKind: 'Software and Licenses',
    expenseClaimAmount: '250.50',
    expenseClaimCurrency: 'EUR',
    expenseClaimDate: '2023-08-22',
    expenseClaimDescription:
      'Purchase of software licenses to streamline our repair workflow.',
    additionalComments:
      'Efficient software tools make our work more productive.',
    acknowledgement: true,
    requestStatus: 'approved',
  },
  {
    uploadedFilesIds: [],
    expenseClaimKind: 'Rent and Leasing',
    expenseClaimAmount: '2100',
    expenseClaimCurrency: 'CAD',
    expenseClaimDate: '2023-07-16',
    expenseClaimDescription:
      'Monthly rent payment for our well-located tech repair shop.',
    additionalComments:
      'Our prime location attracts a steady flow of customers.',
    acknowledgement: true,
    requestStatus: 'approved',
  },
  {
    uploadedFilesIds: [],
    expenseClaimKind: 'Communication and Utilities',
    expenseClaimAmount: '80',
    expenseClaimCurrency: 'AUD',
    expenseClaimDate: '2023-06-10',
    expenseClaimDescription:
      'Monthly communication and utility expenses for our tech shop.',
    additionalComments:
      'Reliable communication and utilities are crucial for our operations.',
    acknowledgement: true,
    requestStatus: 'approved',
  },
  {
    uploadedFilesIds: [],
    expenseClaimKind: 'Equipment and Supplies',
    expenseClaimAmount: '890.25',
    expenseClaimCurrency: 'JPY',
    expenseClaimDate: '2023-05-15',
    expenseClaimDescription:
      'Procurement of advanced repair tools and essential supplies.',
    additionalComments:
      'These tools enhance our repair capabilities and customer satisfaction.',
    acknowledgement: true,
    requestStatus: 'approved',
  },
  {
    uploadedFilesIds: [],
    expenseClaimKind: 'Legal and Professional Fees',
    expenseClaimAmount: '320',
    expenseClaimCurrency: 'CNY',
    expenseClaimDate: '2023-04-20',
    expenseClaimDescription:
      'Legal consultation for updating our service agreements.',
    additionalComments:
      'Clear and fair agreements benefit both us and our clients.',
    acknowledgement: true,
    requestStatus: 'approved',
  },
  {
    uploadedFilesIds: [],
    expenseClaimKind: 'Marketing and Advertising',
    expenseClaimAmount: '400.50',
    expenseClaimCurrency: 'USD',
    expenseClaimDate: '2023-03-15',
    expenseClaimDescription:
      'Digital marketing campaign to expand our online presence.',
    additionalComments:
      "A strong online presence is essential in today's market.",
    acknowledgement: true,
    requestStatus: 'approved',
  },
  {
    uploadedFilesIds: [],
    expenseClaimKind: 'Travel and Accommodation',
    expenseClaimAmount: '550',
    expenseClaimCurrency: 'GBP',
    expenseClaimDate: '2023-02-12',
    expenseClaimDescription:
      'Business trip to a tech innovation summit and networking event.',
    additionalComments:
      'The summit opened doors to potential collaborations and partnerships.',
    acknowledgement: true,
    requestStatus: 'approved',
  },
  {
    uploadedFilesIds: [],
    expenseClaimKind: 'Miscellaneous',
    expenseClaimAmount: '55.75',
    expenseClaimCurrency: 'EUR',
    expenseClaimDate: '2023-01-08',
    expenseClaimDescription:
      'Purchase of eco-friendly office supplies to support sustainability.',
    additionalComments:
      'Sustainability aligns with our company values and reduces our environmental impact.',
    acknowledgement: true,
    requestStatus: 'approved',
  },
  {
    uploadedFilesIds: [],
    expenseClaimKind: 'Insurance',
    expenseClaimAmount: '500',
    expenseClaimCurrency: 'AUD',
    expenseClaimDate: '2022-12-02',
    expenseClaimDescription:
      'Annual insurance premium for safeguarding our tech repair tools.',
    additionalComments:
      'Ensuring the safety of our assets and continued business operations.',
    acknowledgement: true,
    requestStatus: 'approved',
  },
  {
    uploadedFilesIds: [],
    expenseClaimKind: 'Travel and Accommodation',
    expenseClaimAmount: '500.00',
    expenseClaimCurrency: 'USD',
    expenseClaimDate: '2023-09-15',
    expenseClaimDescription:
      'Business trip to a client meeting in [City Name].',
    additionalComments:
      'Meeting went well, and the client is satisfied with our services.',
    acknowledgement: true,
    requestStatus: 'approved',
  },
  {
    uploadedFilesIds: [],
    expenseClaimKind: 'Equipment and Supplies',
    expenseClaimAmount: '750.50',
    expenseClaimCurrency: 'EUR',
    expenseClaimDate: '2023-08-20',
    expenseClaimDescription:
      'Purchase of new computer hardware for the office.',
    additionalComments: 'This equipment upgrade will boost productivity.',
    acknowledgement: true,
    requestStatus: 'approved',
  },
  {
    uploadedFilesIds: [],
    expenseClaimKind: 'Communication and Utilities',
    expenseClaimAmount: '100.00',
    expenseClaimCurrency: 'GBP',
    expenseClaimDate: '2023-07-10',
    expenseClaimDescription: 'Monthly phone and internet bill for our office.',
    additionalComments: 'Staying connected is crucial for our work.',
    acknowledgement: true,
    requestStatus: 'approved',
  },
  {
    uploadedFilesIds: [],
    expenseClaimKind: 'Training and Certifications',
    expenseClaimAmount: '300.25',
    expenseClaimCurrency: 'CAD',
    expenseClaimDate: '2023-06-05',
    expenseClaimDescription:
      'Enrollment in a programming certification course.',
    additionalComments: 'The course will enhance my skills as a developer.',
    acknowledgement: true,
    requestStatus: 'approved',
  },
  {
    uploadedFilesIds: [],
    expenseClaimKind: 'Software and Licenses',
    expenseClaimAmount: '200.00',
    expenseClaimCurrency: 'AUD',
    expenseClaimDate: '2023-05-15',
    expenseClaimDescription:
      'Renewal of software licenses for our design tools.',
    additionalComments:
      'These tools are essential for our graphic design work.',
    acknowledgement: true,
    requestStatus: 'approved',
  },
  {
    uploadedFilesIds: [],
    expenseClaimKind: 'Marketing and Advertising',
    expenseClaimAmount: '400.75',
    expenseClaimCurrency: 'JPY',
    expenseClaimDate: '2023-04-10',
    expenseClaimDescription:
      'Online advertising campaign to promote our services.',
    additionalComments: 'The campaign led to an increase in website traffic.',
    acknowledgement: true,
    requestStatus: 'approved',
  },
  {
    uploadedFilesIds: [],
    expenseClaimKind: 'Insurance',
    expenseClaimAmount: '600.00',
    expenseClaimCurrency: 'CNY',
    expenseClaimDate: '2023-03-05',
    expenseClaimDescription:
      'Annual insurance premium for our office and equipment.',
    additionalComments:
      'Insurance provides peace of mind in case of unforeseen events.',
    acknowledgement: true,
    requestStatus: 'approved',
  },
  {
    uploadedFilesIds: [],
    expenseClaimKind: 'Rent and Leasing',
    expenseClaimAmount: '1200.50',
    expenseClaimCurrency: 'USD',
    expenseClaimDate: '2023-02-10',
    expenseClaimDescription: 'Monthly rent payment for our office space.',
    additionalComments:
      'Our office is in a convenient location for both clients and employees.',
    acknowledgement: true,
    requestStatus: 'approved',
  },
  {
    uploadedFilesIds: [],
    expenseClaimKind: 'Legal and Professional Fees',
    expenseClaimAmount: '350.25',
    expenseClaimCurrency: 'EUR',
    expenseClaimDate: '2023-01-15',
    expenseClaimDescription: 'Legal consultation for contract review.',
    additionalComments:
      'Ensuring our contracts are legally sound is essential for our business.',
    acknowledgement: true,
    requestStatus: 'approved',
  },
  {
    uploadedFilesIds: [],
    expenseClaimKind: 'Miscellaneous',
    expenseClaimAmount: '50.00',
    expenseClaimCurrency: 'GBP',
    expenseClaimDate: '2022-12-20',
    expenseClaimDescription: 'Purchase of office stationery and supplies.',
    additionalComments:
      'Well-organized workspaces lead to better productivity.',
    acknowledgement: true,
    requestStatus: 'approved',
  },
  {
    uploadedFilesIds: [],
    expenseClaimKind: 'Travel and Accommodation',
    expenseClaimAmount: '750.00',
    expenseClaimCurrency: 'USD',
    expenseClaimDate: '2023-09-15',
    expenseClaimDescription:
      'Business trip to attend a web development conference.',
    additionalComments:
      'The conference was informative, and I networked with industry experts.',
    acknowledgement: true,
    requestStatus: 'approved',
  },
  {
    uploadedFilesIds: [],
    expenseClaimKind: 'Equipment and Supplies',
    expenseClaimAmount: '850.50',
    expenseClaimCurrency: 'EUR',
    expenseClaimDate: '2023-08-20',
    expenseClaimDescription:
      'Purchase of new laptops and software licenses for the team.',
    additionalComments:
      'Upgrading our equipment boosts productivity and efficiency.',
    acknowledgement: true,
    requestStatus: 'approved',
  },
  {
    uploadedFilesIds: [],
    expenseClaimKind: 'Communication and Utilities',
    expenseClaimAmount: '110.00',
    expenseClaimCurrency: 'GBP',
    expenseClaimDate: '2023-07-10',
    expenseClaimDescription: 'Monthly phone and internet bill for our office.',
    additionalComments: 'Staying connected is vital for client communication.',
    acknowledgement: true,
    requestStatus: 'approved',
  },
  {
    uploadedFilesIds: [],
    expenseClaimKind: 'Training and Certifications',
    expenseClaimAmount: '350.25',
    expenseClaimCurrency: 'CAD',
    expenseClaimDate: '2023-06-05',
    expenseClaimDescription: 'Enrollment in an advanced coding bootcamp.',
    additionalComments: 'This program enhances my coding skills and knowledge.',
    acknowledgement: true,
    requestStatus: 'approved',
  },
  {
    uploadedFilesIds: [],
    expenseClaimKind: 'Software and Licenses',
    expenseClaimAmount: '300.00',
    expenseClaimCurrency: 'AUD',
    expenseClaimDate: '2023-05-15',
    expenseClaimDescription:
      'Renewal of software licenses for our design tools.',
    additionalComments:
      'These tools are essential for our graphic design work.',
    acknowledgement: true,
    requestStatus: 'approved',
  },
  {
    uploadedFilesIds: [],
    expenseClaimKind: 'Marketing and Advertising',
    expenseClaimAmount: '400.75',
    expenseClaimCurrency: 'JPY',
    expenseClaimDate: '2023-04-10',
    expenseClaimDescription:
      'Digital marketing campaign to increase online visibility.',
    additionalComments:
      'The campaign led to higher website traffic and client inquiries.',
    acknowledgement: true,
    requestStatus: 'approved',
  },
  {
    uploadedFilesIds: [],
    expenseClaimKind: 'Insurance',
    expenseClaimAmount: '550.00',
    expenseClaimCurrency: 'CNY',
    expenseClaimDate: '2023-03-05',
    expenseClaimDescription:
      'Annual insurance premium for office and equipment coverage.',
    additionalComments:
      'Insurance provides security in case of unexpected events.',
    acknowledgement: true,
    requestStatus: 'approved',
  },
  {
    uploadedFilesIds: [],
    expenseClaimKind: 'Rent and Leasing',
    expenseClaimAmount: '1300.50',
    expenseClaimCurrency: 'USD',
    expenseClaimDate: '2023-02-10',
    expenseClaimDescription:
      'Monthly rent payment for our prime office location.',
    additionalComments:
      'Our location attracts both clients and skilled employees.',
    acknowledgement: true,
    requestStatus: 'approved',
  },
  {
    uploadedFilesIds: [],
    expenseClaimKind: 'Legal and Professional Fees',
    expenseClaimAmount: '375.25',
    expenseClaimCurrency: 'EUR',
    expenseClaimDate: '2023-01-15',
    expenseClaimDescription: 'Legal consultation for contract revisions.',
    additionalComments: 'Clear contracts are crucial for client relationships.',
    acknowledgement: true,
    requestStatus: 'approved',
  },
  {
    uploadedFilesIds: [],
    expenseClaimKind: 'Miscellaneous',
    expenseClaimAmount: '75.00',
    expenseClaimCurrency: 'GBP',
    expenseClaimDate: '2022-12-20',
    expenseClaimDescription:
      'Purchase of ergonomic office chairs for employee comfort.',
    additionalComments: 'Comfortable chairs improve workspace productivity.',
    acknowledgement: true,
    requestStatus: 'approved',
  },
  {
    uploadedFilesIds: [],
    expenseClaimKind: 'Travel and Accommodation',
    expenseClaimAmount: '500.00',
    expenseClaimCurrency: 'USD',
    expenseClaimDate: '2023-09-15',
    expenseClaimDescription:
      'Business trip to attend a web development conference.',
    additionalComments:
      'The conference was informative, and I networked with industry experts.',
    acknowledgement: true,
    requestStatus: 'approved',
  },
  {
    uploadedFilesIds: [],
    expenseClaimKind: 'Equipment and Supplies',
    expenseClaimAmount: '750.50',
    expenseClaimCurrency: 'EUR',
    expenseClaimDate: '2023-08-20',
    expenseClaimDescription:
      'Purchase of new laptops and software licenses for the team.',
    additionalComments:
      'Upgrading our equipment boosts productivity and efficiency.',
    acknowledgement: true,
    requestStatus: 'approved',
  },
  {
    uploadedFilesIds: [],
    expenseClaimKind: 'Communication and Utilities',
    expenseClaimAmount: '110.00',
    expenseClaimCurrency: 'GBP',
    expenseClaimDate: '2023-07-10',
    expenseClaimDescription: 'Monthly phone and internet bill for our office.',
    additionalComments: 'Staying connected is vital for client communication.',
    acknowledgement: true,
    requestStatus: 'approved',
  },
  {
    uploadedFilesIds: [],
    expenseClaimKind: 'Training and Certifications',
    expenseClaimAmount: '350.25',
    expenseClaimCurrency: 'CAD',
    expenseClaimDate: '2023-06-05',
    expenseClaimDescription: 'Enrollment in an advanced coding bootcamp.',
    additionalComments: 'This program enhances my coding skills and knowledge.',
    acknowledgement: true,
    requestStatus: 'approved',
  },
  {
    uploadedFilesIds: [],
    expenseClaimKind: 'Software and Licenses',
    expenseClaimAmount: '300.00',
    expenseClaimCurrency: 'AUD',
    expenseClaimDate: '2023-05-15',
    expenseClaimDescription:
      'Renewal of software licenses for our design tools.',
    additionalComments:
      'These tools are essential for our graphic design work.',
    acknowledgement: true,
    requestStatus: 'approved',
  },
  {
    uploadedFilesIds: [],
    expenseClaimKind: 'Marketing and Advertising',
    expenseClaimAmount: '400.75',
    expenseClaimCurrency: 'JPY',
    expenseClaimDate: '2023-04-10',
    expenseClaimDescription:
      'Digital marketing campaign to increase online visibility.',
    additionalComments:
      'The campaign led to higher website traffic and client inquiries.',
    acknowledgement: true,
    requestStatus: 'approved',
  },
  {
    uploadedFilesIds: [],
    expenseClaimKind: 'Insurance',
    expenseClaimAmount: '550.00',
    expenseClaimCurrency: 'CNY',
    expenseClaimDate: '2023-03-05',
    expenseClaimDescription:
      'Annual insurance premium for office and equipment coverage.',
    additionalComments:
      'Insurance provides security in case of unexpected events.',
    acknowledgement: true,
    requestStatus: 'approved',
  },
  {
    uploadedFilesIds: [],
    expenseClaimKind: 'Rent and Leasing',
    expenseClaimAmount: '1300.50',
    expenseClaimCurrency: 'USD',
    expenseClaimDate: '2023-02-10',
    expenseClaimDescription:
      'Monthly rent payment for our prime office location.',
    additionalComments:
      'Our location attracts both clients and skilled employees.',
    acknowledgement: true,
    requestStatus: 'approved',
  },
  {
    uploadedFilesIds: [],
    expenseClaimKind: 'Legal and Professional Fees',
    expenseClaimAmount: '375.25',
    expenseClaimCurrency: 'EUR',
    expenseClaimDate: '2023-01-15',
    expenseClaimDescription: 'Legal consultation for contract revisions.',
    additionalComments: 'Clear contracts are crucial for client relationships.',
    acknowledgement: true,
    requestStatus: 'approved',
  },
  {
    uploadedFilesIds: [],
    expenseClaimKind: 'Miscellaneous',
    expenseClaimAmount: '75.00',
    expenseClaimCurrency: 'GBP',
    expenseClaimDate: '2022-12-20',
    expenseClaimDescription:
      'Purchase of ergonomic office chairs for employee comfort.',
    additionalComments: 'Comfortable chairs improve workspace productivity.',
    acknowledgement: true,
    requestStatus: 'approved',
  },
  {
    uploadedFilesIds: [],
    expenseClaimKind: 'Travel and Accommodation',
    expenseClaimAmount: '600.00',
    expenseClaimCurrency: 'USD',
    expenseClaimDate: '2023-09-15',
    expenseClaimDescription: 'Business trip to a web development conference.',
    additionalComments:
      'The conference was enlightening, and I made valuable connections.',
    acknowledgement: true,
    requestStatus: 'approved',
  },
  {
    uploadedFilesIds: [],
    expenseClaimKind: 'Equipment and Supplies',
    expenseClaimAmount: '800.50',
    expenseClaimCurrency: 'EUR',
    expenseClaimDate: '2023-08-20',
    expenseClaimDescription:
      'Purchase of new laptops and software licenses for the team.',
    additionalComments: 'The upgraded equipment will boost our productivity.',
    acknowledgement: true,
    requestStatus: 'approved',
  },
  {
    uploadedFilesIds: [],
    expenseClaimKind: 'Communication and Utilities',
    expenseClaimAmount: '120.00',
    expenseClaimCurrency: 'GBP',
    expenseClaimDate: '2023-07-10',
    expenseClaimDescription: 'Monthly phone and internet bill for our office.',
    additionalComments:
      'Reliable communication is essential for our operations.',
    acknowledgement: true,
    requestStatus: 'approved',
  },
  {
    uploadedFilesIds: [],
    expenseClaimKind: 'Training and Certifications',
    expenseClaimAmount: '400.25',
    expenseClaimCurrency: 'CAD',
    expenseClaimDate: '2023-06-05',
    expenseClaimDescription: 'Enrollment in an advanced programming course.',
    additionalComments:
      'This course will enhance my coding skills significantly.',
    acknowledgement: true,
    requestStatus: 'approved',
  },
  {
    uploadedFilesIds: [],
    expenseClaimKind: 'Software and Licenses',
    expenseClaimAmount: '350.00',
    expenseClaimCurrency: 'AUD',
    expenseClaimDate: '2023-05-15',
    expenseClaimDescription:
      'Renewal of software licenses for our design tools.',
    additionalComments: 'These tools are indispensable for our design work.',
    acknowledgement: true,
    requestStatus: 'approved',
  },
  {
    uploadedFilesIds: [],
    expenseClaimKind: 'Marketing and Advertising',
    expenseClaimAmount: '500.75',
    expenseClaimCurrency: 'JPY',
    expenseClaimDate: '2023-04-10',
    expenseClaimDescription:
      'Digital marketing campaign to increase brand awareness.',
    additionalComments:
      'The campaign led to a significant uptick in website traffic.',
    acknowledgement: true,
    requestStatus: 'approved',
  },
  {
    uploadedFilesIds: [],
    expenseClaimKind: 'Insurance',
    expenseClaimAmount: '700.00',
    expenseClaimCurrency: 'CNY',
    expenseClaimDate: '2023-03-05',
    expenseClaimDescription:
      'Annual insurance premium for office and equipment coverage.',
    additionalComments:
      'Insurance provides security against unexpected incidents.',
    acknowledgement: true,
    requestStatus: 'approved',
  },
  {
    uploadedFilesIds: [],
    expenseClaimKind: 'Rent and Leasing',
    expenseClaimAmount: '1400.50',
    expenseClaimCurrency: 'USD',
    expenseClaimDate: '2023-02-10',
    expenseClaimDescription:
      'Monthly rent payment for our prime office location.',
    additionalComments: 'Our office location attracts clients and talent.',
    acknowledgement: true,
    requestStatus: 'approved',
  },
  {
    uploadedFilesIds: [],
    expenseClaimKind: 'Legal and Professional Fees',
    expenseClaimAmount: '425.25',
    expenseClaimCurrency: 'EUR',
    expenseClaimDate: '2023-01-15',
    expenseClaimDescription: 'Legal consultation for contract revisions.',
    additionalComments:
      'Clear contracts are essential for our client relationships.',
    acknowledgement: true,
    requestStatus: 'approved',
  },
  {
    uploadedFilesIds: [],
    expenseClaimKind: 'Miscellaneous',
    expenseClaimAmount: '90.00',
    expenseClaimCurrency: 'GBP',
    expenseClaimDate: '2022-12-20',
    expenseClaimDescription:
      'Purchase of ergonomic chairs for employee comfort.',
    additionalComments: 'Comfortable chairs lead to improved productivity.',
    acknowledgement: true,
    requestStatus: 'approved',
  },
  {
    uploadedFilesIds: [],
    expenseClaimKind: 'Travel and Accommodation',
    expenseClaimAmount: '600.00',
    expenseClaimCurrency: 'USD',
    expenseClaimDate: '2023-09-15',
    expenseClaimDescription: 'Business trip to a web development conference.',
    additionalComments:
      'The conference was enlightening, and I made valuable connections.',
    acknowledgement: true,
    requestStatus: 'approved',
  },
  {
    uploadedFilesIds: [],
    expenseClaimKind: 'Equipment and Supplies',
    expenseClaimAmount: '800.50',
    expenseClaimCurrency: 'EUR',
    expenseClaimDate: '2023-08-20',
    expenseClaimDescription:
      'Purchase of new laptops and software licenses for the team.',
    additionalComments: 'The upgraded equipment will boost our productivity.',
    acknowledgement: true,
    requestStatus: 'approved',
  },
  {
    uploadedFilesIds: [],
    expenseClaimKind: 'Communication and Utilities',
    expenseClaimAmount: '120.00',
    expenseClaimCurrency: 'GBP',
    expenseClaimDate: '2023-07-10',
    expenseClaimDescription: 'Monthly phone and internet bill for our office.',
    additionalComments:
      'Reliable communication is essential for our operations.',
    acknowledgement: true,
    requestStatus: 'approved',
  },
  {
    uploadedFilesIds: [],
    expenseClaimKind: 'Training and Certifications',
    expenseClaimAmount: '400.25',
    expenseClaimCurrency: 'CAD',
    expenseClaimDate: '2023-06-05',
    expenseClaimDescription: 'Enrollment in an advanced programming course.',
    additionalComments:
      'This course will enhance my coding skills significantly.',
    acknowledgement: true,
    requestStatus: 'approved',
  },
  {
    uploadedFilesIds: [],
    expenseClaimKind: 'Software and Licenses',
    expenseClaimAmount: '350.00',
    expenseClaimCurrency: 'AUD',
    expenseClaimDate: '2023-05-15',
    expenseClaimDescription:
      'Renewal of software licenses for our design tools.',
    additionalComments: 'These tools are indispensable for our design work.',
    acknowledgement: true,
    requestStatus: 'approved',
  },
  {
    uploadedFilesIds: [],
    expenseClaimKind: 'Marketing and Advertising',
    expenseClaimAmount: '500.75',
    expenseClaimCurrency: 'JPY',
    expenseClaimDate: '2023-04-10',
    expenseClaimDescription:
      'Digital marketing campaign to increase brand awareness.',
    additionalComments:
      'The campaign led to a significant uptick in website traffic.',
    acknowledgement: true,
    requestStatus: 'approved',
  },
  {
    uploadedFilesIds: [],
    expenseClaimKind: 'Insurance',
    expenseClaimAmount: '700.00',
    expenseClaimCurrency: 'CNY',
    expenseClaimDate: '2023-03-05',
    expenseClaimDescription:
      'Annual insurance premium for office and equipment coverage.',
    additionalComments:
      'Insurance provides security against unexpected incidents.',
    acknowledgement: true,
    requestStatus: 'approved',
  },
  {
    uploadedFilesIds: [],
    expenseClaimKind: 'Rent and Leasing',
    expenseClaimAmount: '1400.50',
    expenseClaimCurrency: 'USD',
    expenseClaimDate: '2023-02-10',
    expenseClaimDescription:
      'Monthly rent payment for our prime office location.',
    additionalComments: 'Our office location attracts clients and talent.',
    acknowledgement: true,
    requestStatus: 'approved',
  },
  {
    uploadedFilesIds: [],
    expenseClaimKind: 'Legal and Professional Fees',
    expenseClaimAmount: '425.25',
    expenseClaimCurrency: 'EUR',
    expenseClaimDate: '2023-01-15',
    expenseClaimDescription: 'Legal consultation for contract revisions.',
    additionalComments:
      'Clear contracts are essential for our client relationships.',
    acknowledgement: true,
    requestStatus: 'approved',
  },
  {
    uploadedFilesIds: [],
    expenseClaimKind: 'Miscellaneous',
    expenseClaimAmount: '90.00',
    expenseClaimCurrency: 'GBP',
    expenseClaimDate: '2022-12-20',
    expenseClaimDescription:
      'Purchase of ergonomic chairs for employee comfort.',
    additionalComments: 'Comfortable chairs lead to improved productivity.',
    acknowledgement: true,
    requestStatus: 'approved',
  },
  {
    uploadedFilesIds: [],
    expenseClaimKind: 'Travel and Accommodation',
    expenseClaimAmount: '750.00',
    expenseClaimCurrency: 'USD',
    expenseClaimDate: '2023-09-15',
    expenseClaimDescription: 'Business trip to a web development conference.',
    additionalComments:
      'The conference was informative, and I networked with industry experts.',
    acknowledgement: true,
    requestStatus: 'approved',
  },
  {
    uploadedFilesIds: [],
    expenseClaimKind: 'Equipment and Supplies',
    expenseClaimAmount: '850.50',
    expenseClaimCurrency: 'EUR',
    expenseClaimDate: '2023-08-20',
    expenseClaimDescription:
      'Purchase of new laptops and software licenses for the team.',
    additionalComments:
      'Upgrading our equipment boosts productivity and efficiency.',
    acknowledgement: true,
    requestStatus: 'approved',
  },
  {
    uploadedFilesIds: [],
    expenseClaimKind: 'Communication and Utilities',
    expenseClaimAmount: '120.00',
    expenseClaimCurrency: 'GBP',
    expenseClaimDate: '2023-07-10',
    expenseClaimDescription: 'Monthly phone and internet bill for our office.',
    additionalComments: 'Staying connected is vital for client communication.',
    acknowledgement: true,
    requestStatus: 'approved',
  },
  {
    uploadedFilesIds: [],
    expenseClaimKind: 'Training and Certifications',
    expenseClaimAmount: '375.25',
    expenseClaimCurrency: 'CAD',
    expenseClaimDate: '2023-06-05',
    expenseClaimDescription: 'Enrollment in an advanced coding bootcamp.',
    additionalComments: 'This program enhances my coding skills and knowledge.',
    acknowledgement: true,
    requestStatus: 'approved',
  },
  {
    uploadedFilesIds: [],
    expenseClaimKind: 'Software and Licenses',
    expenseClaimAmount: '320.00',
    expenseClaimCurrency: 'AUD',
    expenseClaimDate: '2023-05-15',
    expenseClaimDescription:
      'Renewal of software licenses for our design tools.',
    additionalComments:
      'These tools are essential for our graphic design work.',
    acknowledgement: true,
    requestStatus: 'approved',
  },
  {
    uploadedFilesIds: [],
    expenseClaimKind: 'Marketing and Advertising',
    expenseClaimAmount: '425.75',
    expenseClaimCurrency: 'JPY',
    expenseClaimDate: '2023-04-10',
    expenseClaimDescription:
      'Digital marketing campaign to increase online visibility.',
    additionalComments:
      'The campaign led to higher website traffic and client inquiries.',
    acknowledgement: true,
    requestStatus: 'approved',
  },
  {
    uploadedFilesIds: [],
    expenseClaimKind: 'Insurance',
    expenseClaimAmount: '575.00',
    expenseClaimCurrency: 'CNY',
    expenseClaimDate: '2023-03-05',
    expenseClaimDescription:
      'Annual insurance premium for office and equipment coverage.',
    additionalComments:
      'Insurance provides security in case of unexpected events.',
    acknowledgement: true,
    requestStatus: 'approved',
  },
  {
    uploadedFilesIds: [],
    expenseClaimKind: 'Rent and Leasing',
    expenseClaimAmount: '1350.50',
    expenseClaimCurrency: 'USD',
    expenseClaimDate: '2023-02-10',
    expenseClaimDescription:
      'Monthly rent payment for our prime office location.',
    additionalComments:
      'Our location attracts both clients and skilled employees.',
    acknowledgement: true,
    requestStatus: 'approved',
  },
  {
    uploadedFilesIds: [],
    expenseClaimKind: 'Legal and Professional Fees',
    expenseClaimAmount: '400.25',
    expenseClaimCurrency: 'EUR',
    expenseClaimDate: '2023-01-15',
    expenseClaimDescription: 'Legal consultation for contract revisions.',
    additionalComments: 'Clear contracts are crucial for client relationships.',
    acknowledgement: true,
    requestStatus: 'approved',
  },
  {
    uploadedFilesIds: [],
    expenseClaimKind: 'Miscellaneous',
    expenseClaimAmount: '80.00',
    expenseClaimCurrency: 'GBP',
    expenseClaimDate: '2022-12-20',
    expenseClaimDescription:
      'Purchase of ergonomic office chairs for employee comfort.',
    additionalComments: 'Comfortable chairs improve workspace productivity.',
    acknowledgement: true,
    requestStatus: 'approved',
  },
];

type GroupedByExpenseClaimKind = Record<
  string | number | symbol,
  {
    uploadedFilesIds: never[];
    expenseClaimKind: string;
    expenseClaimAmount: string;
    expenseClaimCurrency: string;
    expenseClaimDate: string;
    expenseClaimDescription: string;
    additionalComments: string;
    acknowledgement: boolean;
    requestStatus: string;
  }[]
>;

function returnExpenseClaimRequestBodies({
  userDocs,
  groupedByExpenseClaimKind,
}: {
  userDocs: DirectoryUserDocument[];
  groupedByExpenseClaimKind: GroupedByExpenseClaimKind;
}) {
  return userDocs.reduce((expenseClaimReqBodiesAcc, userDoc) => {
    const { department, _id, username } = userDoc;

    const bodiesArr = Object.entries(groupedByExpenseClaimKind).reduce(
      (
        bodiesAcc: Record<string, any>[],
        [expenseClaimKind, expenseClaimKindArr]
      ) => {
        if (
          department === 'Repair Technicians' ||
          department === 'Field Service Technicians' ||
          department === 'Logistics and Inventory' ||
          department === 'Customer Service' ||
          department === 'Maintenance'
        ) {
          if (
            expenseClaimKind === 'Equipment and Supplies' ||
            expenseClaimKind === 'Communication and Utilities' ||
            expenseClaimKind === 'Miscellaneous' ||
            expenseClaimKind === 'Training and Certifications'
          ) {
            const randomExpenseClaim =
              expenseClaimKindArr[
                Math.floor(Math.random() * expenseClaimKindArr.length)
              ];

            const body = {
              userId: _id,
              username,
              ...randomExpenseClaim,
            };

            bodiesAcc.push(body);
          }
        } else {
          const randomExpenseClaim =
            expenseClaimKindArr[
              Math.floor(Math.random() * expenseClaimKindArr.length)
            ];

          const body = {
            userId: _id,
            username,
            ...randomExpenseClaim,
          };

          bodiesAcc.push(body);
        }

        return bodiesAcc;
      },
      [] as any[]
    );

    expenseClaimReqBodiesAcc.push(...bodiesArr);

    return expenseClaimReqBodiesAcc;
  }, [] as any[]);
}

export { expenseClaimArray, returnExpenseClaimRequestBodies };
export type { GroupedByExpenseClaimKind };
