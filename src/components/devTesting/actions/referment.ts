import { DEPARTMENT_JOB_POSITION_MAP } from '../../../constants/data';
import { Department, PhoneNumber, RequestStatus } from '../../../types';
import { groupByField } from '../../../utils';
import { DirectoryUserDocument } from '../../directory/types';

const refermentsArray = [
  {
    candidateFullName: 'John Doe',
    candidateEmail: 'john.doe@example.com',
    candidateContactNumber: '+1(123) 456-7890',
    candidateCurrentJobTitle: 'Senior Software Developer',
    candidateCurrentCompany: 'Tech Solutions Inc.',
    candidateProfileUrl: 'https://www.linkedin.com/in/johndoe',
    departmentReferredFor: 'Information Technology',
    positionJobDescription:
      'We are looking for an experienced software developer to join our IT team.',
    referralReason:
      'John is a highly skilled developer with a strong track record of success.',
    additionalInformation:
      "He has worked on several projects that align with our department's goals.",
    privacyConsent: true,
    requestStatus: 'pending',
  },
  {
    candidateFullName: 'Alice Smith',
    candidateEmail: 'alice.smith@example.com',
    candidateContactNumber: '+1(234) 567-8901',
    candidateCurrentJobTitle: 'Accountant',
    candidateCurrentCompany: 'Finance Corp',
    candidateProfileUrl: 'https://www.linkedin.com/in/alicesmith',
    departmentReferredFor: 'Accounting',
    positionJobDescription:
      'We need an experienced accountant to manage our financial records.',
    referralReason:
      'Alice has a strong background in accounting and excellent attention to detail.',
    additionalInformation:
      "Her previous experience matches our accounting department's needs.",
    privacyConsent: true,
    requestStatus: 'approved',
  },
  {
    candidateFullName: 'Emily Johnson',
    candidateEmail: 'emily.johnson@example.com',
    candidateContactNumber: '+1(555) 123-4567',
    candidateCurrentJobTitle: 'Store Manager',
    candidateCurrentCompany: 'Retail Emporium',
    candidateProfileUrl: 'https://www.linkedin.com/in/emilyjohnson',
    departmentReferredFor: 'Store Administration',
    positionJobDescription:
      'We are seeking a dynamic Store Manager to lead our retail team.',
    referralReason:
      'Emily has a proven track record of driving sales and managing store operations.',
    additionalInformation:
      'Her leadership skills make her an ideal fit for our Store Administration.',
    privacyConsent: true,
    requestStatus: 'approved',
  },
  {
    candidateFullName: 'David Martinez',
    candidateEmail: 'david.martinez@example.com',
    candidateContactNumber: '+1(444) 789-0123',
    candidateCurrentJobTitle: 'HR Specialist',
    candidateCurrentCompany: 'HR Solutions Inc.',
    candidateProfileUrl: 'https://www.linkedin.com/in/davidmartinez',
    departmentReferredFor: 'Human Resources',
    positionJobDescription:
      'We are looking for an HR Specialist to support our HR department.',
    referralReason:
      'David is well-versed in HR practices and has a strong employee relations background.',
    additionalInformation:
      'His expertise aligns with our Human Resources needs.',
    privacyConsent: true,
    requestStatus: 'pending',
  },
  {
    candidateFullName: 'Sarah Brown',
    candidateEmail: 'sarah.brown@example.com',
    candidateContactNumber: '+1(123) 456-7890',
    candidateCurrentJobTitle: 'Marketing Manager',
    candidateCurrentCompany: 'Global Marketing Solutions',
    candidateProfileUrl: 'https://www.linkedin.com/in/sarahbrown',
    departmentReferredFor: 'Marketing',
    positionJobDescription:
      "We're looking for an experienced Marketing Manager to lead our marketing efforts.",
    referralReason:
      'Sarah has a proven track record of creating successful marketing campaigns.',
    additionalInformation:
      "Her skills align perfectly with our Marketing department's needs.",
    privacyConsent: true,
    requestStatus: 'pending',
  },
  {
    candidateFullName: 'Michael Clark',
    candidateEmail: 'michael.clark@example.com',
    candidateContactNumber: '+1(234) 567-8901',
    candidateCurrentJobTitle: 'Software Engineer',
    candidateCurrentCompany: 'Tech Innovators Inc.',
    candidateProfileUrl: 'https://www.linkedin.com/in/michaelclark',
    departmentReferredFor: 'Information Technology',
    positionJobDescription:
      'We require a skilled Software Engineer to develop innovative solutions.',
    referralReason:
      "Michael's expertise in software development is exceptional.",
    additionalInformation:
      'His experience makes him a valuable asset to our IT department.',
    privacyConsent: true,
    requestStatus: 'approved',
  },
  {
    candidateFullName: 'Emma White',
    candidateEmail: 'emma.white@example.com',
    candidateContactNumber: '+1(345) 678-9012',
    candidateCurrentJobTitle: 'Financial Analyst',
    candidateCurrentCompany: 'Finance Wizards Corp',
    candidateProfileUrl: 'https://www.linkedin.com/in/emmawhite',
    departmentReferredFor: 'Accounting',
    positionJobDescription:
      'We need a detail-oriented Financial Analyst to analyze our financial data.',
    referralReason: "Emma's financial expertise is unmatched.",
    additionalInformation: "She's an ideal fit for our Accounting department.",
    privacyConsent: true,
    requestStatus: 'rejected',
  },
  {
    candidateFullName: 'Laura Miller',
    candidateEmail: 'laura.miller@example.com',
    candidateContactNumber: '+1(789) 123-4567',
    candidateCurrentJobTitle: 'Office Manager',
    candidateCurrentCompany: 'Office Solutions Inc.',
    candidateProfileUrl: 'https://www.linkedin.com/in/lauramiller',
    departmentReferredFor: 'Office Administration',
    positionJobDescription:
      'We are seeking an Office Manager to oversee our administrative operations.',
    referralReason:
      "Laura's organizational skills and leadership qualities make her a perfect fit for this role.",
    additionalInformation:
      "Her experience aligns well with our Office Administration department's needs.",
    privacyConsent: true,
    requestStatus: 'pending',
  },
  {
    candidateFullName: 'Daniel Lewis',
    candidateEmail: 'daniel.lewis@example.com',
    candidateContactNumber: '+1(567) 890-1234',
    candidateCurrentJobTitle: 'Sales Representative',
    candidateCurrentCompany: 'Sales Pro Connect',
    candidateProfileUrl: 'https://www.linkedin.com/in/daniellewis',
    departmentReferredFor: 'Sales',
    positionJobDescription:
      'We need a Sales Representative to drive revenue and build client relationships.',
    referralReason:
      'Daniel has a successful track record in sales and a strong client network.',
    additionalInformation:
      "His skills perfectly align with our Sales department's objectives.",
    privacyConsent: true,
    requestStatus: 'approved',
  },
  {
    candidateFullName: 'Olivia Scott',
    candidateEmail: 'olivia.scott@example.com',
    candidateContactNumber: '+1(678) 901-2345',
    candidateCurrentJobTitle: 'IT Support Specialist',
    candidateCurrentCompany: 'Tech Support Solutions',
    candidateProfileUrl: 'https://www.linkedin.com/in/oliviascott',
    departmentReferredFor: 'Information Technology',
    positionJobDescription:
      'We are in search of an IT Support Specialist to provide technical assistance.',
    referralReason:
      'Olivia has extensive experience in IT support and troubleshooting.',
    additionalInformation:
      "Her skills align well with our Information Technology department's needs.",
    privacyConsent: true,
    requestStatus: 'rejected',
  },
  {
    candidateFullName: 'Henry Wilson',
    candidateEmail: 'henry.wilson@example.com',
    candidateContactNumber: '+1(789) 012-3456',
    candidateCurrentJobTitle: 'Maintenance Technician',
    candidateCurrentCompany: 'Maintenance Solutions LLC',
    candidateProfileUrl: 'https://www.linkedin.com/in/henrywilson',
    departmentReferredFor: 'Maintenance',
    positionJobDescription:
      'We require a Maintenance Technician to ensure the upkeep of our facilities.',
    referralReason:
      'Henry has a strong background in maintenance and facility management.',
    additionalInformation:
      "His skills align perfectly with our Maintenance department's requirements.",
    privacyConsent: true,
    requestStatus: 'pending',
  },
  {
    candidateFullName: 'Sophia Adams',
    candidateEmail: 'sophia.adams@example.com',
    candidateContactNumber: '+1(890) 123-4567',
    candidateCurrentJobTitle: 'Customer Service Representative',
    candidateCurrentCompany: 'Service Excellence Inc.',
    candidateProfileUrl: 'https://www.linkedin.com/in/sophiaadams',
    departmentReferredFor: 'Customer Service',
    positionJobDescription:
      'We need a Customer Service Representative to provide exceptional support to our clients.',
    referralReason:
      "Sophia's communication skills and dedication to customer satisfaction are commendable.",
    additionalInformation:
      "Her expertise aligns perfectly with our Customer Service department's goals.",
    privacyConsent: true,
    requestStatus: 'approved',
  },
  {
    candidateFullName: 'William Turner',
    candidateEmail: 'william.turner@example.com',
    candidateContactNumber: '+1(901) 234-5678',
    candidateCurrentJobTitle: 'Logistics Coordinator',
    candidateCurrentCompany: 'Logistics Solutions Group',
    candidateProfileUrl: 'https://www.linkedin.com/in/williamturner',
    departmentReferredFor: 'Logistics and Inventory',
    positionJobDescription:
      'We are seeking a Logistics Coordinator to manage our inventory and supply chain.',
    referralReason:
      "William's experience in logistics and supply chain management is impressive.",
    additionalInformation:
      "His skills align well with our Logistics and Inventory department's needs.",
    privacyConsent: true,
    requestStatus: 'rejected',
  },
  {
    candidateFullName: 'Ella Perez',
    candidateEmail: 'ella.perez@example.com',
    candidateContactNumber: '+1(012) 345-6789',
    candidateCurrentJobTitle: 'Field Service Technician',
    candidateCurrentCompany: 'Field Services Inc.',
    candidateProfileUrl: 'https://www.linkedin.com/in/ellaperez',
    departmentReferredFor: 'Field Service Technicians',
    positionJobDescription:
      'We require a Field Service Technician to provide on-site technical support.',
    referralReason:
      'Ella has a strong background in field service and technical troubleshooting.',
    additionalInformation:
      "Her skills align perfectly with our Field Service Technicians department's requirements.",
    privacyConsent: true,
    requestStatus: 'pending',
  },
  {
    candidateFullName: 'Liam Taylor',
    candidateEmail: 'liam.taylor@example.com',
    candidateContactNumber: '+1(123) 456-7890',
    candidateCurrentJobTitle: 'Executive Assistant',
    candidateCurrentCompany: 'Executive Support Inc.',
    candidateProfileUrl: 'https://www.linkedin.com/in/liamtaylor',
    departmentReferredFor: 'Executive Management',
    positionJobDescription:
      'We need an Executive Assistant to provide administrative support to our executives.',
    referralReason:
      "Liam's experience in executive support and organization is outstanding.",
    additionalInformation:
      "His skills align well with our Executive Management department's needs.",
    privacyConsent: true,
    requestStatus: 'approved',
  },
  {
    candidateFullName: 'Ava Roberts',
    candidateEmail: 'ava.roberts@example.com',
    candidateContactNumber: '+1(234) 567-8901',
    candidateCurrentJobTitle: 'Accounting Specialist',
    candidateCurrentCompany: 'Finance Pros LLC',
    candidateProfileUrl: 'https://www.linkedin.com/in/avaroberts',
    departmentReferredFor: 'Accounting',
    positionJobDescription:
      'We require an Accounting Specialist to manage financial transactions.',
    referralReason:
      "Ava's expertise in accounting and financial analysis is exceptional.",
    additionalInformation:
      "Her skills align perfectly with our Accounting department's requirements.",
    privacyConsent: true,
    requestStatus: 'rejected',
  },
  {
    candidateFullName: 'Sophie Anderson',
    candidateEmail: 'sophie.anderson@example.com',
    candidateContactNumber: '+1(456) 789-0123',
    candidateCurrentJobTitle: 'Marketing Coordinator',
    candidateCurrentCompany: 'Marketing Innovators Inc.',
    candidateProfileUrl: 'https://www.linkedin.com/in/sophieanderson',
    departmentReferredFor: 'Marketing',
    positionJobDescription:
      'We need a Marketing Coordinator to assist in executing marketing campaigns.',
    referralReason:
      "Sophie's creativity and attention to detail make her a great fit for this role.",
    additionalInformation:
      "Her skills align well with our Marketing department's objectives.",
    privacyConsent: true,
    requestStatus: 'approved',
  },
  {
    candidateFullName: 'Lucas Wilson',
    candidateEmail: 'lucas.wilson@example.com',
    candidateContactNumber: '+1(567) 890-1234',
    candidateCurrentJobTitle: 'Software Developer',
    candidateCurrentCompany: 'Tech Wizards Inc.',
    candidateProfileUrl: 'https://www.linkedin.com/in/lucaswilson',
    departmentReferredFor: 'Information Technology',
    positionJobDescription:
      'We require a skilled Software Developer to build cutting-edge software solutions.',
    referralReason:
      'Lucas has a proven track record in software development and innovation.',
    additionalInformation:
      "His expertise aligns perfectly with our Information Technology department's needs.",
    privacyConsent: true,
    requestStatus: 'pending',
  },
  {
    candidateFullName: 'Aiden Thompson',
    candidateEmail: 'aiden.thompson@example.com',
    candidateContactNumber: '+1(678) 901-2345',
    candidateCurrentJobTitle: 'Financial Analyst',
    candidateCurrentCompany: 'Finance Experts Corp',
    candidateProfileUrl: 'https://www.linkedin.com/in/aidenthompson',
    departmentReferredFor: 'Accounting',
    positionJobDescription:
      'We need a Financial Analyst to analyze financial data and provide insights.',
    referralReason:
      "Aiden's financial expertise and analytical skills are exceptional.",
    additionalInformation:
      "His skills align perfectly with our Accounting department's requirements.",
    privacyConsent: true,
    requestStatus: 'rejected',
  },
  {
    candidateFullName: 'Oliver Davis',
    candidateEmail: 'oliver.davis@example.com',
    candidateContactNumber: '+1(789) 012-3456',
    candidateCurrentJobTitle: 'Maintenance Supervisor',
    candidateCurrentCompany: 'Maintenance Pro Inc.',
    candidateProfileUrl: 'https://www.linkedin.com/in/oliverdavis',
    departmentReferredFor: 'Maintenance',
    positionJobDescription:
      'We require a Maintenance Supervisor to oversee facility maintenance.',
    referralReason:
      "Oliver's leadership skills in maintenance are commendable.",
    additionalInformation:
      "His experience aligns well with our Maintenance department's needs.",
    privacyConsent: true,
    requestStatus: 'pending',
  },
  {
    candidateFullName: 'Isabella Lee',
    candidateEmail: 'isabella.lee@example.com',
    candidateContactNumber: '+1(890) 123-4567',
    candidateCurrentJobTitle: 'Customer Service Specialist',
    candidateCurrentCompany: 'Customer Care Solutions',
    candidateProfileUrl: 'https://www.linkedin.com/in/isabellalee',
    departmentReferredFor: 'Customer Service',
    positionJobDescription:
      'We need a Customer Service Specialist to provide exceptional support to our clients.',
    referralReason:
      "Isabella's dedication to customer satisfaction and problem-solving skills are commendable.",
    additionalInformation:
      "Her expertise aligns perfectly with our Customer Service department's goals.",
    privacyConsent: true,
    requestStatus: 'approved',
  },
  {
    candidateFullName: 'Mason Moore',
    candidateEmail: 'mason.moore@example.com',
    candidateContactNumber: '+1(901) 234-5678',
    candidateCurrentJobTitle: 'Inventory Manager',
    candidateCurrentCompany: 'Inventory Solutions Group',
    candidateProfileUrl: 'https://www.linkedin.com/in/masonmoore',
    departmentReferredFor: 'Logistics and Inventory',
    positionJobDescription:
      'We require an Inventory Manager to optimize our inventory management processes.',
    referralReason:
      "Mason's experience in logistics and inventory management is impressive.",
    additionalInformation:
      "His skills align well with our Logistics and Inventory department's needs.",
    privacyConsent: true,
    requestStatus: 'rejected',
  },
  {
    candidateFullName: 'Elijah Baker',
    candidateEmail: 'elijah.baker@example.com',
    candidateContactNumber: '+1(012) 345-6789',
    candidateCurrentJobTitle: 'Field Service Engineer',
    candidateCurrentCompany: 'Field Services Pro',
    candidateProfileUrl: 'https://www.linkedin.com/in/elijahbaker',
    departmentReferredFor: 'Field Service Technicians',
    positionJobDescription:
      'We require a Field Service Engineer to provide technical support and on-site assistance.',
    referralReason:
      'Elijah has extensive experience in field service and technical troubleshooting.',
    additionalInformation:
      "His skills align perfectly with our Field Service Technicians department's requirements.",
    privacyConsent: true,
    requestStatus: 'pending',
  },
  {
    candidateFullName: 'Aria King',
    candidateEmail: 'aria.king@example.com',
    candidateContactNumber: '+1(123) 456-7890',
    candidateCurrentJobTitle: 'Executive Assistant',
    candidateCurrentCompany: 'Executive Support Solutions',
    candidateProfileUrl: 'https://www.linkedin.com/in/ariaking',
    departmentReferredFor: 'Executive Management',
    positionJobDescription:
      'We need an Executive Assistant to provide administrative support to our executives.',
    referralReason:
      "Aria's experience in executive support and organization is outstanding.",
    additionalInformation:
      "Her skills align well with our Executive Management department's needs.",
    privacyConsent: true,
    requestStatus: 'approved',
  },
  {
    candidateFullName: 'Logan Garcia',
    candidateEmail: 'logan.garcia@example.com',
    candidateContactNumber: '+1(234) 567-8901',
    candidateCurrentJobTitle: 'Accounting Analyst',
    candidateCurrentCompany: 'Finance Pros LLC',
    candidateProfileUrl: 'https://www.linkedin.com/in/logangarcia',
    departmentReferredFor: 'Accounting',
    positionJobDescription:
      'We require an Accounting Analyst to assist in financial analysis and reporting.',
    referralReason:
      "Logan's expertise in accounting and financial analysis is exceptional.",
    additionalInformation:
      "His skills align perfectly with our Accounting department's requirements.",
    privacyConsent: true,
    requestStatus: 'rejected',
  },
  {
    candidateFullName: 'Lily Hall',
    candidateEmail: 'lily.hall@example.com',
    candidateContactNumber: '+1(567) 890-1234',
    candidateCurrentJobTitle: 'HR Coordinator',
    candidateCurrentCompany: 'HR Solutions Group',
    candidateProfileUrl: 'https://www.linkedin.com/in/lilyhall',
    departmentReferredFor: 'Human Resources',
    positionJobDescription:
      'We are seeking an HR Coordinator to support our human resources department.',
    referralReason:
      "Lily's experience in HR practices and employee relations is commendable.",
    additionalInformation:
      "Her skills align perfectly with our Human Resources department's needs.",
    privacyConsent: true,
    requestStatus: 'approved',
  },
  {
    candidateFullName: 'Alex Taylor-Smith',
    candidateEmail: 'alex.taylor-smith@example.com',
    candidateContactNumber: '+1(123) 456-7890',
    candidateCurrentJobTitle: 'Diversity and Inclusion Specialist',
    candidateCurrentCompany: 'Inclusive Solutions Group',
    candidateProfileUrl: 'https://www.linkedin.com/in/alextaylorsmith',
    departmentReferredFor: 'Human Resources',
    positionJobDescription:
      'We are seeking a Diversity and Inclusion Specialist to champion diversity initiatives.',
    referralReason:
      "Alex's passion for diversity and their previous experience in this field make them an ideal candidate.",
    additionalInformation:
      "Their commitment to inclusivity aligns perfectly with our Human Resources department's goals.",
    privacyConsent: true,
    requestStatus: 'approved',
  },
  {
    candidateFullName: 'Mia Rodriguez',
    candidateEmail: 'mia.rodriguez@example.com',
    candidateContactNumber: '+1(234) 567-8901',
    candidateCurrentJobTitle: 'Customer Support Advocate',
    candidateCurrentCompany: 'Customer Care Connect',
    candidateProfileUrl: 'https://www.linkedin.com/in/miarodriguez',
    departmentReferredFor: 'Customer Service',
    positionJobDescription:
      'We need a Customer Support Advocate to provide exceptional service to our diverse customer base.',
    referralReason:
      "Mia's multilingual skills and customer-centric approach make her an excellent fit for this role.",
    additionalInformation:
      "Her ability to connect with customers aligns well with our Customer Service department's goals.",
    privacyConsent: true,
    requestStatus: 'approved',
  },
  {
    candidateFullName: 'Harper Chen',
    candidateEmail: 'harper.chen@example.com',
    candidateContactNumber: '+1(345) 678-9012',
    candidateCurrentJobTitle: 'Sustainability Coordinator',
    candidateCurrentCompany: 'Green Initiatives Inc.',
    candidateProfileUrl: 'https://www.linkedin.com/in/harperchen',
    departmentReferredFor: 'Executive Management',
    positionJobDescription:
      'We need a Sustainability Coordinator to lead our eco-friendly initiatives.',
    referralReason:
      "Harper's dedication to environmental sustainability and their track record in this field make them an outstanding candidate.",
    additionalInformation:
      "Their passion for a green future aligns perfectly with our Executive Management department's vision.",
    privacyConsent: true,
    requestStatus: 'approved',
  },
  {
    candidateFullName: 'Riley Johnson',
    candidateEmail: 'riley.johnson@example.com',
    candidateContactNumber: '+1(456) 789-0123',
    candidateCurrentJobTitle: 'Logistics and Supply Chain Analyst',
    candidateCurrentCompany: 'Supply Chain Solutions LLC',
    candidateProfileUrl: 'https://www.linkedin.com/in/rileyjohnson',
    departmentReferredFor: 'Logistics and Inventory',
    positionJobDescription:
      'We require a Logistics and Supply Chain Analyst to optimize our supply chain operations.',
    referralReason:
      "Riley's analytical skills and logistics expertise make them an ideal candidate for this role.",
    additionalInformation:
      "Their experience aligns well with our Logistics and Inventory department's requirements.",
    privacyConsent: true,
    requestStatus: 'approved',
  },
  {
    candidateFullName: 'Jordan Patel',
    candidateEmail: 'jordan.patel@example.com',
    candidateContactNumber: '+1(567) 890-1234',
    candidateCurrentJobTitle: 'Store Manager',
    candidateCurrentCompany: 'Retail Ventures Inc.',
    candidateProfileUrl: 'https://www.linkedin.com/in/jordanpatel',
    departmentReferredFor: 'Store Administration',
    positionJobDescription:
      'We need a Store Manager to oversee our retail operations.',
    referralReason:
      "Jordan's leadership skills and experience in store management make them an excellent fit for this role.",
    additionalInformation:
      "Their expertise aligns perfectly with our Store Administration department's objectives.",
    privacyConsent: true,
    requestStatus: 'approved',
  },
  {
    candidateFullName: 'Sasha Kim',
    candidateEmail: 'sasha.kim@example.com',
    candidateContactNumber: '+1(678) 901-2345',
    candidateCurrentJobTitle: 'IT Security Specialist',
    candidateCurrentCompany: 'Tech Secure Solutions',
    candidateProfileUrl: 'https://www.linkedin.com/in/sashakim',
    departmentReferredFor: 'Information Technology',
    positionJobDescription:
      'We require an IT Security Specialist to ensure the security of our digital assets.',
    referralReason:
      "Sasha's cybersecurity expertise and commitment to data protection make them an outstanding candidate.",
    additionalInformation:
      "Their skills align perfectly with our Information Technology department's security needs.",
    privacyConsent: true,
    requestStatus: 'approved',
  },
  {
    candidateFullName: 'Avery Smith',
    candidateEmail: 'avery.smith@example.com',
    candidateContactNumber: '+1(789) 012-3456',
    candidateCurrentJobTitle: 'Marketing Manager',
    candidateCurrentCompany: 'Marketing Pro Connect',
    candidateProfileUrl: 'https://www.linkedin.com/in/averysmith',
    departmentReferredFor: 'Marketing',
    positionJobDescription:
      'We need a Marketing Manager to lead our marketing strategies and campaigns.',
    referralReason:
      "Avery's strategic marketing skills and leadership qualities make them an excellent fit for this role.",
    additionalInformation:
      "Their experience aligns well with our Marketing department's objectives.",
    privacyConsent: true,
    requestStatus: 'approved',
  },
  {
    candidateFullName: 'Logan Wright',
    candidateEmail: 'logan.wright@example.com',
    candidateContactNumber: '+1(890) 123-4567',
    candidateCurrentJobTitle: 'Accounting Manager',
    candidateCurrentCompany: 'Finance Experts Corp',
    candidateProfileUrl: 'https://www.linkedin.com/in/loganwright',
    departmentReferredFor: 'Accounting',
    positionJobDescription:
      'We require an Accounting Manager to oversee financial operations and reporting.',
    referralReason:
      "Logan's financial management skills and experience in accounting make them an ideal candidate.",
    additionalInformation:
      "Their expertise aligns perfectly with our Accounting department's requirements.",
    privacyConsent: true,
    requestStatus: 'approved',
  },
  {
    candidateFullName: 'Peyton Miller',
    candidateEmail: 'peyton.miller@example.com',
    candidateContactNumber: '+1(012) 345-6789',
    candidateCurrentJobTitle: 'Field Service Technician',
    candidateCurrentCompany: 'Field Services Pro',
    candidateProfileUrl: 'https://www.linkedin.com/in/peytonmiller',
    departmentReferredFor: 'Field Service Technicians',
    positionJobDescription:
      'We require a Field Service Technician to provide technical support and on-site assistance.',
    referralReason:
      "Peyton's technical expertise and dedication to customer service make them an ideal candidate.",
    additionalInformation:
      "Their skills align perfectly with our Field Service Technicians department's requirements.",
    privacyConsent: true,
    requestStatus: 'approved',
  },
  {
    candidateFullName: 'Samira Johnson',
    candidateEmail: 'samira.j@example.com',
    candidateContactNumber: '+1(123) 456-7890',
    candidateCurrentJobTitle: 'Sales Associate',
    candidateCurrentCompany: 'Retail Giant Inc.',
    candidateProfileUrl: 'https://www.linkedin.com/in/samiraj',
    departmentReferredFor: 'Sales',
    positionJobDescription:
      'We are looking for a Sales Associate to drive revenue and provide exceptional customer service.',
    referralReason:
      "Samira's outstanding sales record and customer-oriented approach make her a perfect fit for this role.",
    additionalInformation:
      "Her experience aligns seamlessly with our Sales department's objectives.",
    privacyConsent: true,
    requestStatus: 'approved',
  },
  {
    candidateFullName: 'Akio Tanaka',
    candidateEmail: 'akio.tanaka@example.com',
    candidateContactNumber: '+1(234) 567-8901',
    candidateCurrentJobTitle: 'IT Support Specialist',
    candidateCurrentCompany: 'Tech Innovators LLC',
    candidateProfileUrl: 'https://www.linkedin.com/in/akiotanaka',
    departmentReferredFor: 'Information Technology',
    positionJobDescription:
      'We need an IT Support Specialist to provide technical assistance and maintain our systems.',
    referralReason:
      "Akio's IT expertise and problem-solving skills make him an excellent candidate for this role.",
    additionalInformation:
      "His experience aligns well with our Information Technology department's needs.",
    privacyConsent: true,
    requestStatus: 'approved',
  },
  {
    candidateFullName: 'Ella Smith',
    candidateEmail: 'ella.smith@example.com',
    candidateContactNumber: '+1(345) 678-9012',
    candidateCurrentJobTitle: 'Office Manager',
    candidateCurrentCompany: 'Efficient Office Solutions',
    candidateProfileUrl: 'https://www.linkedin.com/in/ellasmith',
    departmentReferredFor: 'Office Administration',
    positionJobDescription:
      'We require an Office Manager to oversee administrative operations and ensure efficiency.',
    referralReason:
      "Ella's strong organizational skills and leadership abilities make her an ideal candidate.",
    additionalInformation:
      "Her expertise aligns perfectly with our Office Administration department's objectives.",
    privacyConsent: true,
    requestStatus: 'approved',
  },
  {
    candidateFullName: 'Ravi Patel',
    candidateEmail: 'ravi.p@example.com',
    candidateContactNumber: '+1(456) 789-0123',
    candidateCurrentJobTitle: 'Maintenance Technician',
    candidateCurrentCompany: 'Facility Care Services',
    candidateProfileUrl: 'https://www.linkedin.com/in/ravipatel',
    departmentReferredFor: 'Maintenance',
    positionJobDescription:
      'We need a Maintenance Technician to ensure the upkeep of our facilities and equipment.',
    referralReason:
      "Ravi's technical skills and dedication to maintenance make him an excellent fit for this role.",
    additionalInformation:
      "His experience aligns well with our Maintenance department's requirements.",
    privacyConsent: true,
    requestStatus: 'approved',
  },
  {
    candidateFullName: 'Mariana López',
    candidateEmail: 'mariana.lopez@example.com',
    candidateContactNumber: '+1(567) 890-1234',
    candidateCurrentJobTitle: 'Marketing Coordinator',
    candidateCurrentCompany: 'Digital Marketing Pros',
    candidateProfileUrl: 'https://www.linkedin.com/in/marianalopez',
    departmentReferredFor: 'Marketing',
    positionJobDescription:
      'We need a Marketing Coordinator to support our marketing campaigns and initiatives.',
    referralReason:
      "Mariana's marketing skills and creative approach make her an ideal candidate for this role.",
    additionalInformation:
      "Her experience aligns perfectly with our Marketing department's goals.",
    privacyConsent: true,
    requestStatus: 'approved',
  },
  {
    candidateFullName: 'Nina Chang',
    candidateEmail: 'nina.chang@example.com',
    candidateContactNumber: '+1(678) 901-2345',
    candidateCurrentJobTitle: 'Logistics Manager',
    candidateCurrentCompany: 'Global Logistics Solutions',
    candidateProfileUrl: 'https://www.linkedin.com/in/ninachang',
    departmentReferredFor: 'Logistics and Inventory',
    positionJobDescription:
      'We require a Logistics Manager to oversee our global logistics operations.',
    referralReason:
      "Nina's logistics expertise and leadership skills make her an outstanding candidate.",
    additionalInformation:
      "Her skills align perfectly with our Logistics and Inventory department's needs.",
    privacyConsent: true,
    requestStatus: 'approved',
  },
  {
    candidateFullName: 'Oliver Davis',
    candidateEmail: 'oliver.d@example.com',
    candidateContactNumber: '+1(789) 012-3456',
    candidateCurrentJobTitle: 'Repair Technician',
    candidateCurrentCompany: 'Tech Repair Experts',
    candidateProfileUrl: 'https://www.linkedin.com/in/oliverdavis',
    departmentReferredFor: 'Repair Technicians',
    positionJobDescription:
      'We need a Repair Technician to diagnose and fix technical issues for our clients.',
    referralReason:
      "Oliver's technical expertise and problem-solving abilities make him an ideal candidate.",
    additionalInformation:
      "His skills align perfectly with our Repair Technicians department's requirements.",
    privacyConsent: true,
    requestStatus: 'approved',
  },
  {
    candidateFullName: 'Aisha Khan',
    candidateEmail: 'aisha.k@example.com',
    candidateContactNumber: '+1(012) 345-6789',
    candidateCurrentJobTitle: 'Accountant',
    candidateCurrentCompany: 'Financial Wizards Inc.',
    candidateProfileUrl: 'https://www.linkedin.com/in/aishakhan',
    departmentReferredFor: 'Accounting',
    positionJobDescription:
      'We require an Accountant to manage financial records and ensure compliance.',
    referralReason:
      "Aisha's accounting skills and attention to detail make her an excellent fit for this role.",
    additionalInformation:
      "Her expertise aligns well with our Accounting department's objectives.",
    privacyConsent: true,
    requestStatus: 'approved',
  },
  {
    candidateFullName: 'Kai Miller',
    candidateEmail: 'kai.m@example.com',
    candidateContactNumber: '+1(123) 456-7890',
    candidateCurrentJobTitle: 'Customer Service Representative',
    candidateCurrentCompany: 'Customer Care Solutions',
    candidateProfileUrl: 'https://www.linkedin.com/in/kaimiller',
    departmentReferredFor: 'Customer Service',
    positionJobDescription:
      'We need a Customer Service Representative to provide exceptional support to our customers.',
    referralReason:
      "Kai's customer-centric approach and communication skills make them an ideal candidate.",
    additionalInformation:
      "Their experience aligns perfectly with our Customer Service department's goals.",
    privacyConsent: true,
    requestStatus: 'approved',
  },
  {
    candidateFullName: "Samantha O'Connor",
    candidateEmail: 'samantha.o@example.com',
    candidateContactNumber: '+1(123) 456-7890',
    candidateCurrentJobTitle: 'Assistant Store Manager',
    candidateCurrentCompany: 'Retail Emporium Inc.',
    candidateProfileUrl: 'https://www.linkedin.com/in/samanthaoconnor',
    departmentReferredFor: 'Store Administration',
    positionJobDescription:
      'We need an Assistant Store Manager to assist in managing store operations and staff.',
    referralReason:
      "Samantha's experience in retail management and leadership skills make her an ideal candidate.",
    additionalInformation:
      "Her expertise aligns well with our Store Administration department's goals.",
    privacyConsent: true,
    requestStatus: 'approved',
  },
  {
    candidateFullName: 'Ahmed Ibrahim',
    candidateEmail: 'ahmed.i@example.com',
    candidateContactNumber: '+1(234) 567-8901',
    candidateCurrentJobTitle: 'HR Specialist',
    candidateCurrentCompany: 'Workplace Solutions LLC',
    candidateProfileUrl: 'https://www.linkedin.com/in/ahmedibrahim',
    departmentReferredFor: 'Human Resources',
    positionJobDescription:
      'We require an HR Specialist to manage HR operations and employee relations.',
    referralReason:
      "Ahmed's HR expertise and dedication to employee well-being make him an ideal candidate.",
    additionalInformation:
      "His experience aligns perfectly with our Human Resources department's objectives.",
    privacyConsent: true,
    requestStatus: 'approved',
  },
  {
    candidateFullName: 'Grace Thompson',
    candidateEmail: 'grace.t@example.com',
    candidateContactNumber: '+1(345) 678-9012',
    candidateCurrentJobTitle: 'Executive Assistant',
    candidateCurrentCompany: 'Executive Solutions Group',
    candidateProfileUrl: 'https://www.linkedin.com/in/gracethompson',
    departmentReferredFor: 'Executive Management',
    positionJobDescription:
      'We need an Executive Assistant to provide administrative support to our executives.',
    referralReason:
      "Grace's organizational skills and professionalism make her an ideal candidate for this role.",
    additionalInformation:
      "Her experience aligns seamlessly with our Executive Management department's needs.",
    privacyConsent: true,
    requestStatus: 'approved',
  },
  {
    candidateFullName: 'Eduardo Gonzalez',
    candidateEmail: 'eduardo.g@example.com',
    candidateContactNumber: '+1(456) 789-0123',
    candidateCurrentJobTitle: 'Marketing Manager',
    candidateCurrentCompany: 'Marketing Masters Inc.',
    candidateProfileUrl: 'https://www.linkedin.com/in/eduardogonzalez',
    departmentReferredFor: 'Marketing',
    positionJobDescription:
      'We require a Marketing Manager to lead our marketing campaigns and strategies.',
    referralReason:
      "Eduardo's marketing expertise and strategic thinking make him an ideal candidate for this role.",
    additionalInformation:
      "His skills align perfectly with our Marketing department's goals.",
    privacyConsent: true,
    requestStatus: 'approved',
  },
  {
    candidateFullName: 'Lina Kim',
    candidateEmail: 'lina.k@example.com',
    candidateContactNumber: '+1(567) 890-1234',
    candidateCurrentJobTitle: 'IT Project Manager',
    candidateCurrentCompany: 'Tech Innovators Inc.',
    candidateProfileUrl: 'https://www.linkedin.com/in/linakim',
    departmentReferredFor: 'Information Technology',
    positionJobDescription:
      'We need an IT Project Manager to oversee our IT projects and initiatives.',
    referralReason:
      "Lina's project management skills and IT expertise make her an outstanding candidate.",
    additionalInformation:
      "Her experience aligns well with our Information Technology department's needs.",
    privacyConsent: true,
    requestStatus: 'approved',
  },
  {
    candidateFullName: 'Aiden Campbell',
    candidateEmail: 'aiden.c@example.com',
    candidateContactNumber: '+1(678) 901-2345',
    candidateCurrentJobTitle: 'Field Service Engineer',
    candidateCurrentCompany: 'Field Services Pro',
    candidateProfileUrl: 'https://www.linkedin.com/in/aidencampbell',
    departmentReferredFor: 'Field Service Technicians',
    positionJobDescription:
      'We need a Field Service Engineer to provide technical support and on-site solutions.',
    referralReason:
      "Aiden's technical expertise and customer-centric approach make him an ideal candidate.",
    additionalInformation:
      "His skills align perfectly with our Field Service Technicians department's requirements.",
    privacyConsent: true,
    requestStatus: 'approved',
  },
  {
    candidateFullName: 'Mila Petrova',
    candidateEmail: 'mila.p@example.com',
    candidateContactNumber: '+1(789) 012-3456',
    candidateCurrentJobTitle: 'Logistics Coordinator',
    candidateCurrentCompany: 'Global Logistics Solutions',
    candidateProfileUrl: 'https://www.linkedin.com/in/milapetrova',
    departmentReferredFor: 'Logistics and Inventory',
    positionJobDescription:
      'We require a Logistics Coordinator to manage logistics operations and optimize supply chains.',
    referralReason:
      "Mila's logistics expertise and problem-solving skills make her an ideal candidate.",
    additionalInformation:
      "Her skills align perfectly with our Logistics and Inventory department's goals.",
    privacyConsent: true,
    requestStatus: 'approved',
  },
  {
    candidateFullName: 'Isabella Vega',
    candidateEmail: 'isabella.v@example.com',
    candidateContactNumber: '+1(012) 345-6789',
    candidateCurrentJobTitle: 'Accounting Manager',
    candidateCurrentCompany: 'Financial Wizards Inc.',
    candidateProfileUrl: 'https://www.linkedin.com/in/isabellavega',
    departmentReferredFor: 'Accounting',
    positionJobDescription:
      'We need an Accounting Manager to oversee financial operations and reporting.',
    referralReason:
      "Isabella's financial management skills and experience in accounting make her an ideal candidate.",
    additionalInformation:
      "Her expertise aligns perfectly with our Accounting department's requirements.",
    privacyConsent: true,
    requestStatus: 'approved',
  },
  {
    candidateFullName: 'Zane Roberts',
    candidateEmail: 'zane.r@example.com',
    candidateContactNumber: '+1(123) 456-7890',
    candidateCurrentJobTitle: 'Customer Support Specialist',
    candidateCurrentCompany: 'Support Solutions Inc.',
    candidateProfileUrl: 'https://www.linkedin.com/in/zaneroberts',
    departmentReferredFor: 'Customer Service',
    positionJobDescription:
      'We need a Customer Support Specialist to provide top-notch support to our customers.',
    referralReason:
      "Zane's customer-centric approach and problem-solving skills make him an ideal candidate.",
    additionalInformation:
      "His experience aligns perfectly with our Customer Service department's goals.",
    privacyConsent: true,
    requestStatus: 'approved',
  },
  {
    candidateFullName: 'Olivia Martinez',
    candidateEmail: 'olivia.m@example.com',
    candidateContactNumber: '+1(234) 567-8901',
    candidateCurrentJobTitle: 'Maintenance Technician',
    candidateCurrentCompany: 'Maintenance Pros',
    candidateProfileUrl: 'https://www.linkedin.com/in/oliviamartinez',
    departmentReferredFor: 'Maintenance',
    positionJobDescription:
      'We require a Maintenance Technician to ensure the upkeep of our facilities and equipment.',
    referralReason:
      "Olivia's maintenance skills and attention to detail make her an ideal candidate.",
    additionalInformation:
      "Her expertise aligns well with our Maintenance department's requirements.",
    privacyConsent: true,
    requestStatus: 'approved',
  },
  {
    candidateFullName: 'Jennifer Smith',
    candidateEmail: 'jennifer.smith@example.com',
    candidateContactNumber: '+1(123) 456-7890',
    candidateCurrentJobTitle: 'Office Manager',
    candidateCurrentCompany: 'Pro Office Solutions Inc.',
    candidateProfileUrl: 'https://www.linkedin.com/in/jennifersmith',
    departmentReferredFor: 'Office Administration',
    positionJobDescription:
      'We need an Office Manager to oversee daily office operations and administrative staff.',
    referralReason:
      "Jennifer's organizational skills and leadership experience make her an ideal candidate.",
    additionalInformation:
      "Her expertise aligns perfectly with our Office Administration department's goals.",
    privacyConsent: true,
    requestStatus: 'approved',
  },
  {
    candidateFullName: 'David Brown',
    candidateEmail: 'david.brown@example.com',
    candidateContactNumber: '+1(234) 567-8901',
    candidateCurrentJobTitle: 'Accountant',
    candidateCurrentCompany: 'Financial Experts LLC',
    candidateProfileUrl: 'https://www.linkedin.com/in/davidbrown',
    departmentReferredFor: 'Accounting',
    positionJobDescription:
      'We require an Accountant to manage financial records and reporting.',
    referralReason:
      "David's accounting expertise and attention to detail make him an ideal candidate.",
    additionalInformation:
      "His skills align seamlessly with our Accounting department's requirements.",
    privacyConsent: true,
    requestStatus: 'approved',
  },
  {
    candidateFullName: 'Nina White',
    candidateEmail: 'nina.white@example.com',
    candidateContactNumber: '+1(345) 678-9012',
    candidateCurrentJobTitle: 'Logistics Coordinator',
    candidateCurrentCompany: 'Swift Logistics Solutions',
    candidateProfileUrl: 'https://www.linkedin.com/in/ninawhite',
    departmentReferredFor: 'Logistics and Inventory',
    positionJobDescription:
      'We require a Logistics Coordinator to optimize our supply chain and inventory management.',
    referralReason:
      "Nina's logistics expertise and problem-solving skills make her an ideal candidate.",
    additionalInformation:
      "Her skills align perfectly with our Logistics and Inventory department's goals.",
    privacyConsent: true,
    requestStatus: 'approved',
  },
  {
    candidateFullName: 'Mark Johnson',
    candidateEmail: 'mark.j@example.com',
    candidateContactNumber: '+1(456) 789-0123',
    candidateCurrentJobTitle: 'Sales Manager',
    candidateCurrentCompany: 'Sales Dynamics Inc.',
    candidateProfileUrl: 'https://www.linkedin.com/in/markjohnson',
    departmentReferredFor: 'Sales',
    positionJobDescription:
      'We need a Sales Manager to lead our sales team and drive revenue growth.',
    referralReason:
      "Mark's sales expertise and leadership skills make him an ideal candidate for this role.",
    additionalInformation:
      "His experience aligns well with our Sales department's objectives.",
    privacyConsent: true,
    requestStatus: 'approved',
  },
  {
    candidateFullName: 'Sophia Lee',
    candidateEmail: 'sophia.lee@example.com',
    candidateContactNumber: '+1(567) 890-1234',
    candidateCurrentJobTitle: 'Marketing Specialist',
    candidateCurrentCompany: 'Market Innovators Group',
    candidateProfileUrl: 'https://www.linkedin.com/in/sophialee',
    departmentReferredFor: 'Marketing',
    positionJobDescription:
      'We require a Marketing Specialist to execute marketing campaigns and strategies.',
    referralReason:
      "Sophia's marketing skills and creativity make her an ideal candidate for this role.",
    additionalInformation:
      "Her skills align perfectly with our Marketing department's goals.",
    privacyConsent: true,
    requestStatus: 'approved',
  },
  {
    candidateFullName: 'Lucas Taylor',
    candidateEmail: 'lucas.t@example.com',
    candidateContactNumber: '+1(678) 901-2345',
    candidateCurrentJobTitle: 'IT Support Specialist',
    candidateCurrentCompany: 'Tech Assistants Inc.',
    candidateProfileUrl: 'https://www.linkedin.com/in/lucastaylor',
    departmentReferredFor: 'Information Technology',
    positionJobDescription:
      'We need an IT Support Specialist to provide technical support to our employees.',
    referralReason:
      "Lucas's IT expertise and problem-solving skills make him an ideal candidate.",
    additionalInformation:
      "His experience aligns perfectly with our Information Technology department's needs.",
    privacyConsent: true,
    requestStatus: 'approved',
  },
  {
    candidateFullName: 'Ella Carter',
    candidateEmail: 'ella.c@example.com',
    candidateContactNumber: '+1(789) 012-3456',
    candidateCurrentJobTitle: 'Repair Technician',
    candidateCurrentCompany: 'Fix-It Pros',
    candidateProfileUrl: 'https://www.linkedin.com/in/ellacarter',
    departmentReferredFor: 'Repair Technicians',
    positionJobDescription:
      'We need a Repair Technician to diagnose and repair equipment.',
    referralReason:
      "Ella's repair skills and attention to detail make her an ideal candidate for this role.",
    additionalInformation:
      "Her expertise aligns well with our Repair Technicians department's requirements.",
    privacyConsent: true,
    requestStatus: 'approved',
  },
  {
    candidateFullName: 'Isaac Adams',
    candidateEmail: 'isaac.a@example.com',
    candidateContactNumber: '+1(890) 123-4567',
    candidateCurrentJobTitle: 'Field Service Engineer',
    candidateCurrentCompany: 'Field Services Inc.',
    candidateProfileUrl: 'https://www.linkedin.com/in/isaacadams',
    departmentReferredFor: 'Field Service Technicians',
    positionJobDescription:
      'We need a Field Service Engineer to provide on-site technical support to our clients.',
    referralReason:
      "Isaac's field service skills and customer-centric approach make him an ideal candidate.",
    additionalInformation:
      "His experience aligns perfectly with our Field Service Technicians department's goals.",
    privacyConsent: true,
    requestStatus: 'approved',
  },
  {
    candidateFullName: 'Emma Garcia',
    candidateEmail: 'emma.g@example.com',
    candidateContactNumber: '+1(901) 234-5678',
    candidateCurrentJobTitle: 'HR Specialist',
    candidateCurrentCompany: 'HR Solutions Ltd.',
    candidateProfileUrl: 'https://www.linkedin.com/in/emmagarcia',
    departmentReferredFor: 'Human Resources',
    positionJobDescription:
      'We need an HR Specialist to manage human resources functions and employee relations.',
    referralReason:
      "Emma's HR expertise and interpersonal skills make her an ideal candidate.",
    additionalInformation:
      "Her experience aligns well with our Human Resources department's requirements.",
    privacyConsent: true,
    requestStatus: 'approved',
  },
  {
    candidateFullName: 'Liam Wilson',
    candidateEmail: 'liam.w@example.com',
    candidateContactNumber: '+1(012) 345-6789',
    candidateCurrentJobTitle: 'Customer Support Specialist',
    candidateCurrentCompany: 'Support Solutions Inc.',
    candidateProfileUrl: 'https://www.linkedin.com/in/liamwilson',
    departmentReferredFor: 'Customer Service',
    positionJobDescription:
      'We need a Customer Support Specialist to provide top-notch support to our customers.',
    referralReason:
      "Liam's customer-centric approach and problem-solving skills make him an ideal candidate.",
    additionalInformation:
      "His experience aligns perfectly with our Customer Service department's goals.",
    privacyConsent: true,
    requestStatus: 'approved',
  },
];

type RefermentsGroupedByDepartments = Record<
  Department,
  {
    candidateFullName: string;
    candidateEmail: string;
    candidateContactNumber: PhoneNumber;
    candidateCurrentJobTitle: string;
    candidateCurrentCompany: string;
    candidateProfileUrl: string;
    departmentReferredFor: Department;
    positionJobDescription: string;
    referralReason: string;
    additionalInformation: string;
    privacyConsent: boolean;
    requestStatus: RequestStatus;
  }[]
>;

function returnRefermentsRequestBodies({
  refermentsGroupedByDepartments,
  userDocs,
}: {
  userDocs: DirectoryUserDocument[];
  refermentsGroupedByDepartments: RefermentsGroupedByDepartments;
}) {
  return userDocs.reduce((bodiesAcc, userDoc) => {
    const { _id, username, department } = userDoc;

    // ignore userDoc if department is Executive Management
    if (department === 'Executive Management') {
      return bodiesAcc;
    }

    // find job positions that match userDoc's department
    const departmentJobPositions = DEPARTMENT_JOB_POSITION_MAP.get(department);
    if (!departmentJobPositions?.length) {
      return bodiesAcc;
    }

    // pick a random job position
    const randomJobPosition =
      departmentJobPositions[
        Math.floor(Math.random() * departmentJobPositions.length)
      ];

    // filter out referments that are same as userDoc's departments
    const referments = refermentsGroupedByDepartments[department];

    // pick a random referment
    const randomReferment =
      referments[Math.floor(Math.random() * referments.length)];

    const body = {
      ...randomReferment,
      userId: _id,
      username: username,
      positionReferredFor: randomJobPosition,
    };

    bodiesAcc.push(body);

    return bodiesAcc;
  }, [] as any[]);
}

export { refermentsArray, returnRefermentsRequestBodies };
export type { RefermentsGroupedByDepartments };
