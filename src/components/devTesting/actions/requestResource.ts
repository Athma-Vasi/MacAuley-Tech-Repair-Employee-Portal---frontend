import { groupByField, shuffleArray } from '../../../utils';
import { DirectoryUserDocument } from '../../directory/types';

const requestResourcesArray = [
  {
    department: 'Executive Management',
    resourceType: 'Hardware',
    resourceQuantity: '5',
    resourceDescription:
      'This request is for the procurement of 5 laptops needed by the Executive Management team for their daily operations. The laptops should meet the specified hardware requirements.',
    reasonForRequest: 'Upgrade',
    urgency: 'high',
    dateNeededBy: '2023-09-30',
    additionalInformation:
      'The current laptops are outdated and slow, hindering productivity. This upgrade is critical.',
    requestStatus: 'pending',
  },
  {
    department: 'Sales',
    resourceType: 'Software',
    resourceQuantity: '1',
    resourceDescription:
      'This request pertains to the acquisition of a specialized sales analytics software package. This software is crucial for the Sales team to analyze market trends and make data-driven decisions. The software should meet the specified requirements.',
    reasonForRequest: 'New tool',
    urgency: 'medium',
    dateNeededBy: '2023-10-15',
    additionalInformation:
      'The Sales team has upcoming presentations that require the use of this software for accurate data representation.',
    requestStatus: 'approved',
  },
  {
    department: 'Information Technology',
    resourceType: 'Access',
    resourceQuantity: '10',
    resourceDescription:
      'This request is for 10 access cards required for new hires in the IT department. These access cards will grant access to secure areas and systems within the company premises.',
    reasonForRequest: 'Onboarding',
    urgency: 'low',
    dateNeededBy: '2023-09-25',
    additionalInformation:
      'Several new IT employees are scheduled to join the team next week, and access cards are essential for their onboarding process.',
    requestStatus: 'approved',
  },
  {
    department: 'Customer Service',
    resourceType: 'Other',
    resourceQuantity: '2',
    resourceDescription:
      'This request is for the replacement of two malfunctioning headsets used by the Customer Service team. The new headsets should meet the specified quality standards.',
    reasonForRequest: 'Replacement',
    urgency: 'medium',
    dateNeededBy: '2023-10-10',
    additionalInformation:
      'The current headsets are causing audio issues during customer interactions, negatively impacting the customer service quality.',
    requestStatus: 'pending',
  },
  {
    department: 'Marketing',
    resourceType: 'Software',
    resourceQuantity: '1',
    resourceDescription:
      "This request is for the procurement of graphic design software, which is essential for the Marketing team's upcoming advertising campaign. The software should be capable of meeting the team's creative needs.",
    reasonForRequest: 'Design projects',
    urgency: 'high',
    dateNeededBy: '2023-09-28',
    additionalInformation:
      'The marketing campaign launch date is approaching, and this software is crucial for designing promotional materials.',
    requestStatus: 'approved',
  },
  {
    department: 'Accounting',
    resourceType: 'Hardware',
    resourceQuantity: '3',
    resourceDescription:
      'This request is for the purchase of three high-performance desktop computers required by the Accounting department. The computers should meet the specified hardware specifications.',
    reasonForRequest: 'Upgrade',
    urgency: 'medium',
    dateNeededBy: '2023-10-05',
    additionalInformation:
      'The current desktops are outdated and frequently experience performance issues, impacting the efficiency of financial tasks.',
    requestStatus: 'pending',
  },
  {
    department: 'Store Administration',
    resourceType: 'Access',
    resourceQuantity: '8',
    resourceDescription:
      'This request involves acquiring 8 access cards for the Store Administration team. These cards will be used to access secured inventory storage areas and administrative sections within the store.',
    reasonForRequest: 'Access control',
    urgency: 'low',
    dateNeededBy: '2023-09-29',
    additionalInformation:
      'The Store Administration team needs additional access cards to improve security and streamline operations.',
    requestStatus: 'approved',
  },
  {
    department: 'Maintenance',
    resourceType: 'Hardware',
    resourceQuantity: '4',
    resourceDescription:
      'This request is for the purchase of 4 industrial-grade power tools for the Maintenance department. These tools are essential for performing routine equipment maintenance tasks.',
    reasonForRequest: 'Equipment maintenance',
    urgency: 'medium',
    dateNeededBy: '2023-10-08',
    additionalInformation:
      'The current tools are showing signs of wear and tear, and timely maintenance is critical to prevent equipment breakdowns.',
    requestStatus: 'pending',
  },
  {
    department: 'Logistics and Inventory',
    resourceType: 'Other',
    resourceQuantity: '1',
    resourceDescription:
      'This request pertains to the acquisition of a specialized inventory management software system for the Logistics and Inventory department. The software should meet the specified requirements.',
    reasonForRequest: 'Process optimization',
    urgency: 'high',
    dateNeededBy: '2023-09-27',
    additionalInformation:
      'Efficient inventory management is essential to ensure timely product deliveries, and this software will streamline our logistics operations.',
    requestStatus: 'approved',
  },
  {
    department: 'Human Resources',
    resourceType: 'Software',
    resourceQuantity: '1',
    resourceDescription:
      'This request is for a human resources management software solution required by the HR department to streamline recruitment, employee records, and payroll management processes.',
    reasonForRequest: 'Process enhancement',
    urgency: 'medium',
    dateNeededBy: '2023-10-12',
    additionalInformation:
      'Efficient HR management is crucial for a growing workforce, and this software will enhance our HR operations.',
    requestStatus: 'pending',
  },
  {
    department: 'Store Administration',
    resourceType: 'Hardware',
    resourceQuantity: '10',
    resourceDescription:
      'This request is for 10 barcode scanners to improve inventory management efficiency within the Store Administration department. The scanners should be capable of scanning various types of barcodes and integrating with our inventory software.',
    reasonForRequest: 'Inventory optimization',
    urgency: 'medium',
    dateNeededBy: '2023-10-15',
    additionalInformation:
      'Efficient inventory tracking is essential for minimizing stockouts and overstock situations.',
    requestStatus: 'pending',
  },
  {
    department: 'Repair Technicians',
    resourceType: 'Hardware',
    resourceQuantity: '6',
    resourceDescription:
      'This request is for the purchase of six specialized diagnostic tools required by the Repair Technicians. These tools should be compatible with our equipment and assist in identifying and repairing faults.',
    reasonForRequest: 'Tool upgrade',
    urgency: 'high',
    dateNeededBy: '2023-09-28',
    additionalInformation:
      'The current diagnostic tools are outdated, leading to prolonged equipment downtime.',
    requestStatus: 'approved',
  },
  {
    department: 'Marketing',
    resourceType: 'Software',
    resourceQuantity: '1',
    resourceDescription:
      'This request involves acquiring advanced video editing software for the Marketing team. The software should support high-definition video editing capabilities to enhance our multimedia marketing materials.',
    reasonForRequest: 'Video production',
    urgency: 'medium',
    dateNeededBy: '2023-10-10',
    additionalInformation:
      'Video content plays a vital role in our marketing campaigns, and this software will elevate our video production quality.',
    requestStatus: 'pending',
  },
  {
    department: 'Customer Service',
    resourceType: 'Access',
    resourceQuantity: '15',
    resourceDescription:
      'This request is for 15 additional user licenses for our customer service software. These licenses are needed to accommodate the growing customer support team and ensure smooth customer interactions.',
    reasonForRequest: 'Team expansion',
    urgency: 'low',
    dateNeededBy: '2023-09-27',
    additionalInformation:
      'We are hiring new customer support representatives to meet increasing customer demands, and additional licenses are necessary for their access.',
    requestStatus: 'approved',
  },
  {
    department: 'Information Technology',
    resourceType: 'Other',
    resourceQuantity: '1',
    resourceDescription:
      "This request is for cybersecurity training for the IT team. The training program should cover the latest threats and best practices to enhance our organization's security posture.",
    reasonForRequest: 'Security enhancement',
    urgency: 'high',
    dateNeededBy: '2023-09-30',
    additionalInformation:
      "As cyber threats evolve, it's crucial to keep our IT team well-informed and equipped to protect our systems and data.",
    requestStatus: 'approved',
  },
  {
    department: 'Logistics and Inventory',
    resourceType: 'Hardware',
    resourceQuantity: '3',
    resourceDescription:
      'This request is for three heavy-duty forklifts for the Logistics and Inventory department. These forklifts should have the capacity to handle large loads efficiently and safely.',
    reasonForRequest: 'Equipment upgrade',
    urgency: 'medium',
    dateNeededBy: '2023-10-05',
    additionalInformation:
      'Our current forklifts are aging and experiencing frequent breakdowns, disrupting warehouse operations.',
    requestStatus: 'pending',
  },
  {
    department: 'Accounting',
    resourceType: 'Software',
    resourceQuantity: '1',
    resourceDescription:
      'This request is for specialized accounting software to streamline complex financial calculations and reporting. The software should integrate with our existing accounting systems.',
    reasonForRequest: 'Financial analysis',
    urgency: 'high',
    dateNeededBy: '2023-09-25',
    additionalInformation:
      'Accurate financial analysis is crucial for making informed business decisions, and this software will enhance our capabilities in this regard.',
    requestStatus: 'approved',
  },
  {
    department: 'Human Resources',
    resourceType: 'Access',
    resourceQuantity: '5',
    resourceDescription:
      'This request involves obtaining five additional access badges for secure areas within the HR department. These badges will be assigned to HR personnel responsible for confidential employee records.',
    reasonForRequest: 'Security access',
    urgency: 'low',
    dateNeededBy: '2023-09-29',
    additionalInformation:
      'Enhanced security measures are essential to safeguard sensitive HR data and maintain compliance.',
    requestStatus: 'approved',
  },
  {
    department: 'Sales',
    resourceType: 'Other',
    resourceQuantity: '4',
    resourceDescription:
      'This request is for ergonomic office chairs for the Sales team. Comfortable seating is vital for productivity and well-being during long sales calls and meetings.',
    reasonForRequest: 'Employee well-being',
    urgency: 'medium',
    dateNeededBy: '2023-10-08',
    additionalInformation:
      'Providing ergonomic chairs will contribute to the overall health and happiness of our sales team, ultimately boosting their performance.',
    requestStatus: 'pending',
  },
  {
    department: 'Maintenance',
    resourceType: 'Access',
    resourceQuantity: '5',
    resourceDescription:
      'This request is for RFID access cards to secure equipment storage areas within the Maintenance department. These cards will enhance equipment security and prevent unauthorized access.',
    reasonForRequest: 'Security enhancement',
    urgency: 'medium',
    dateNeededBy: '2023-09-28',
    additionalInformation:
      'Ensuring the security of valuable maintenance equipment is critical to prevent theft and damage.',
    requestStatus: 'approved',
  },
  {
    department: 'Executive Management',
    resourceType: 'Other',
    resourceQuantity: '1',
    resourceDescription:
      'This request is for a specialized leadership development training program for the Executive Management team. The program should focus on strategic leadership and decision-making.',
    reasonForRequest: 'Leadership development',
    urgency: 'high',
    dateNeededBy: '2023-10-12',
    additionalInformation:
      'Effective leadership is crucial for guiding our organization to success, and this training program will empower our executives with the necessary skills.',
    requestStatus: 'pending',
  },
  {
    department: 'Marketing',
    resourceType: 'Access',
    resourceQuantity: '2',
    resourceDescription:
      'This request is for two additional user licenses for social media management tools used by the Marketing department. These licenses will enable more team members to collaborate on social media campaigns.',
    reasonForRequest: 'Team expansion',
    urgency: 'low',
    dateNeededBy: '2023-09-27',
    additionalInformation:
      'We are expanding our social media marketing efforts, and additional licenses are required to accommodate the growing team.',
    requestStatus: 'approved',
  },
  {
    department: 'Office Administration',
    resourceType: 'Software',
    resourceQuantity: '1',
    resourceDescription:
      'This request is for office productivity software to streamline administrative tasks in the Office Administration department. The software should include document management and workflow automation features.',
    reasonForRequest: 'Efficiency improvement',
    urgency: 'medium',
    dateNeededBy: '2023-10-15',
    additionalInformation:
      'Efficient administrative processes are essential to ensure smooth office operations, and this software will help achieve that.',
    requestStatus: 'pending',
  },
  {
    department: 'Field Service Technicians',
    resourceType: 'Hardware',
    resourceQuantity: '8',
    resourceDescription:
      'This request is for the purchase of eight rugged tablets for Field Service Technicians. These tablets should be durable and capable of running specialized field service software.',
    reasonForRequest: 'Field mobility',
    urgency: 'high',
    dateNeededBy: '2023-09-30',
    additionalInformation:
      'Our technicians frequently work in challenging environments, and rugged tablets will improve their productivity and data collection in the field.',
    requestStatus: 'approved',
  },
  {
    department: 'Maintenance',
    resourceType: 'Hardware',
    resourceQuantity: '7',
    resourceDescription:
      'This request is for 7 industrial-grade welding machines needed by the Maintenance department. These machines should meet safety standards and enable our technicians to perform precision welding tasks.',
    reasonForRequest: 'Equipment upgrade',
    urgency: 'high',
    dateNeededBy: '2023-09-28',
    additionalInformation:
      'Our current welding machines are outdated and do not provide the required precision, leading to suboptimal repairs.',
    requestStatus: 'approved',
  },
  {
    department: 'Logistics and Inventory',
    resourceType: 'Access',
    resourceQuantity: '20',
    resourceDescription:
      'This request involves acquiring 20 additional RFID access cards for warehouse access within the Logistics and Inventory department. These cards will improve security and traceability of inventory movements.',
    reasonForRequest: 'Security enhancement',
    urgency: 'low',
    dateNeededBy: '2023-09-25',
    additionalInformation:
      'Enhanced security measures are essential to prevent inventory shrinkage and unauthorized access.',
    requestStatus: 'approved',
  },
  {
    department: 'Field Service Technicians',
    resourceType: 'Other',
    resourceQuantity: '2',
    resourceDescription:
      'This request is for advanced training programs for 2 Field Service Technicians specializing in new equipment. The training should cover the operation and troubleshooting of complex machinery.',
    reasonForRequest: 'Skill development',
    urgency: 'medium',
    dateNeededBy: '2023-10-10',
    additionalInformation:
      'Our technicians need specialized skills to handle the latest equipment models effectively and minimize downtime.',
    requestStatus: 'pending',
  },
  {
    department: 'Sales',
    resourceType: 'Hardware',
    resourceQuantity: '5',
    resourceDescription:
      'This request is for 5 high-resolution monitors for the Sales team. These monitors will improve the quality of presentations and data analysis during client meetings.',
    reasonForRequest: 'Equipment upgrade',
    urgency: 'medium',
    dateNeededBy: '2023-10-15',
    additionalInformation:
      'Our current monitors do not provide the required clarity for presentations, affecting our ability to impress clients.',
    requestStatus: 'approved',
  },
  {
    department: 'Office Administration',
    resourceType: 'Software',
    resourceQuantity: '1',
    resourceDescription:
      'This request is for comprehensive office management software to streamline administrative tasks in the Office Administration department. The software should include document management, scheduling, and task tracking features.',
    reasonForRequest: 'Efficiency improvement',
    urgency: 'high',
    dateNeededBy: '2023-09-30',
    additionalInformation:
      'Efficient administrative processes are essential to ensure smooth office operations, and this software will help achieve that.',
    requestStatus: 'pending',
  },
  {
    department: 'Information Technology',
    resourceType: 'Hardware',
    resourceQuantity: '12',
    resourceDescription:
      'This request is for a dozen high-performance laptops for the IT department. These laptops should meet the latest hardware specifications to support our IT professionals in their tasks.',
    reasonForRequest: 'Equipment upgrade',
    urgency: 'high',
    dateNeededBy: '2023-10-05',
    additionalInformation:
      'Our current laptops are outdated and struggle to handle modern software, hampering the productivity of our IT team.',
    requestStatus: 'approved',
  },
  {
    department: 'Human Resources',
    resourceType: 'Other',
    resourceQuantity: '1',
    resourceDescription:
      'This request is for a specialized HR analytics tool to enhance decision-making within the Human Resources department. The tool should provide insights into workforce trends and employee engagement.',
    reasonForRequest: 'Data-driven HR',
    urgency: 'medium',
    dateNeededBy: '2023-09-29',
    additionalInformation:
      'Data-driven HR strategies are becoming increasingly important, and this tool will empower our HR team to make informed decisions.',
    requestStatus: 'approved',
  },
  {
    department: 'Marketing',
    resourceType: 'Other',
    resourceQuantity: '3',
    resourceDescription:
      'This request is for marketing automation software for the Marketing team. The software should assist in automating email campaigns, lead nurturing, and social media management.',
    reasonForRequest: 'Marketing efficiency',
    urgency: 'low',
    dateNeededBy: '2023-10-08',
    additionalInformation:
      'Efficient marketing automation is essential to reach our audience effectively and drive lead conversions.',
    requestStatus: 'pending',
  },
  {
    department: 'Customer Service',
    resourceType: 'Access',
    resourceQuantity: '5',
    resourceDescription:
      "This request is for 5 additional access keys for the Customer Service department's customer database. These keys will enable more agents to access and assist customers promptly.",
    reasonForRequest: 'Improved customer service',
    urgency: 'medium',
    dateNeededBy: '2023-09-27',
    additionalInformation:
      'As our customer base grows, we need more agents to provide timely assistance, and these keys are essential for that.',
    requestStatus: 'approved',
  },
  {
    department: 'Store Administration',
    resourceType: 'Software',
    resourceQuantity: '1',
    resourceDescription:
      'This request is for inventory management software tailored to the unique needs of the Store Administration department. The software should provide real-time tracking and reporting capabilities.',
    reasonForRequest: 'Inventory optimization',
    urgency: 'high',
    dateNeededBy: '2023-10-12',
    additionalInformation:
      'Efficient inventory management is vital to prevent overstocking and stockouts, and this software will streamline our processes.',
    requestStatus: 'pending',
  },
  {
    department: 'Accounting',
    resourceType: 'Access',
    resourceQuantity: '2',
    resourceDescription:
      'This request is for 2 additional user licenses for our accounting software. These licenses are required to accommodate new accounting team members and ensure accurate financial record-keeping.',
    reasonForRequest: 'Team expansion',
    urgency: 'low',
    dateNeededBy: '2023-09-24',
    additionalInformation:
      'As our company grows, we are adding new members to the accounting team, and additional licenses are necessary for them to access the system.',
    requestStatus: 'approved',
  },
  {
    department: 'Executive Management',
    resourceType: 'Hardware',
    resourceQuantity: '4',
    resourceDescription:
      'This request is for 4 high-quality projectors needed by the Executive Management team for presentations and strategic planning sessions. These projectors should offer crisp visuals and connectivity options.',
    reasonForRequest: 'Presentation equipment',
    urgency: 'medium',
    dateNeededBy: '2023-09-29',
    additionalInformation:
      'Effective presentations are crucial for conveying strategic initiatives, and these projectors will enhance our capability to do so.',
    requestStatus: 'approved',
  },
  {
    department: 'Sales',
    resourceType: 'Software',
    resourceQuantity: '1',
    resourceDescription:
      'This request is for a cutting-edge CRM software solution for the Sales team. The software should provide robust customer relationship management capabilities and integration with our existing systems.',
    reasonForRequest: 'Sales optimization',
    urgency: 'high',
    dateNeededBy: '2023-10-15',
    additionalInformation:
      'Efficient sales processes and customer relationship management are essential for achieving sales targets, and this software will empower our sales team to excel.',
    requestStatus: 'pending',
  },
  {
    department: 'Repair Technicians',
    resourceType: 'Hardware',
    resourceQuantity: '3',
    resourceDescription:
      'This request is for 3 specialized diagnostic devices required by the Repair Technicians. These devices should enable precise fault identification and faster equipment repairs.',
    reasonForRequest: 'Diagnostic tools upgrade',
    urgency: 'medium',
    dateNeededBy: '2023-10-10',
    additionalInformation:
      'Our current diagnostic devices lack the required precision, resulting in longer equipment downtime and customer dissatisfaction.',
    requestStatus: 'approved',
  },
  {
    department: 'Human Resources',
    resourceType: 'Hardware',
    resourceQuantity: '10',
    resourceDescription:
      'This request is for 10 new ergonomic chairs for the Human Resources department. Comfortable seating is essential for HR professionals who often spend long hours at their desks.',
    reasonForRequest: 'Employee well-being',
    urgency: 'low',
    dateNeededBy: '2023-09-30',
    additionalInformation:
      'Providing ergonomic chairs will enhance the comfort and productivity of our HR team, contributing to a positive work environment.',
    requestStatus: 'approved',
  },
  {
    department: 'Executive Management',
    resourceType: 'Other',
    resourceQuantity: '1',
    resourceDescription:
      'This request is for a leadership seminar for the Executive Management team. The seminar should focus on strategic decision-making and effective leadership in a dynamic business environment.',
    reasonForRequest: 'Leadership development',
    urgency: 'high',
    dateNeededBy: '2023-10-10',
    additionalInformation:
      'Effective leadership at the executive level is crucial for guiding our organization through rapid changes and achieving our strategic goals.',
    requestStatus: 'pending',
  },
  {
    department: 'Sales',
    resourceType: 'Access',
    resourceQuantity: '5',
    resourceDescription:
      'This request is for 5 additional sales software licenses for the Sales department. These licenses are needed to onboard new sales representatives and expand our sales team.',
    reasonForRequest: 'Team expansion',
    urgency: 'medium',
    dateNeededBy: '2023-09-28',
    additionalInformation:
      "As we grow our sales force, it's crucial to ensure that each team member has access to the tools they need to drive revenue.",
    requestStatus: 'approved',
  },
  {
    department: 'Human Resources',
    resourceType: 'Hardware',
    resourceQuantity: '8',
    resourceDescription:
      'This request is for 8 ergonomic standing desks for the Human Resources department. These desks will promote a healthier work environment and reduce sedentary behavior among HR professionals.',
    reasonForRequest: 'Employee well-being',
    urgency: 'low',
    dateNeededBy: '2023-10-05',
    additionalInformation:
      'Encouraging movement and providing ergonomic workstations can improve the physical and mental health of our HR team.',
    requestStatus: 'approved',
  },
  {
    department: 'Information Technology',
    resourceType: 'Hardware',
    resourceQuantity: '10',
    resourceDescription:
      'This request is for 10 high-performance laptops for the IT department. These laptops should meet the latest specifications to support the demanding tasks of our IT professionals.',
    reasonForRequest: 'Equipment upgrade',
    urgency: 'high',
    dateNeededBy: '2023-10-12',
    additionalInformation:
      "Outdated laptops can slow down our IT team's productivity, and upgrading their equipment is essential for efficiency.",
    requestStatus: 'pending',
  },
  {
    department: 'Marketing',
    resourceType: 'Software',
    resourceQuantity: '1',
    resourceDescription:
      'This request is for advanced data analytics software for the Marketing department. The software should provide in-depth insights into customer behavior and campaign performance.',
    reasonForRequest: 'Data-driven marketing',
    urgency: 'medium',
    dateNeededBy: '2023-09-30',
    additionalInformation:
      'Data-driven marketing strategies are becoming increasingly important, and this software will empower our marketing team to make informed decisions.',
    requestStatus: 'approved',
  },
  {
    department: 'Customer Service',
    resourceType: 'Access',
    resourceQuantity: '5',
    resourceDescription:
      'This request is for 5 additional customer service portal licenses. These licenses are required to accommodate the growing number of customers using our online support platform.',
    reasonForRequest: 'Customer support expansion',
    urgency: 'low',
    dateNeededBy: '2023-09-29',
    additionalInformation:
      'As more customers turn to our online support, we need additional licenses to ensure everyone receives timely assistance.',
    requestStatus: 'approved',
  },
  {
    department: 'Repair Technicians',
    resourceType: 'Hardware',
    resourceQuantity: '3',
    resourceDescription:
      'This request is for 3 specialized diagnostic tools for the Repair Technicians. These tools should assist in quickly identifying and repairing equipment faults.',
    reasonForRequest: 'Diagnostic tools upgrade',
    urgency: 'medium',
    dateNeededBy: '2023-10-08',
    additionalInformation:
      'Efficient diagnostics are crucial for minimizing equipment downtime and meeting customer service commitments.',
    requestStatus: 'approved',
  },
  {
    department: 'Logistics and Inventory',
    resourceType: 'Other',
    resourceQuantity: '1',
    resourceDescription:
      'This request is for a comprehensive inventory management software solution tailored to the unique needs of the Logistics and Inventory department. The software should provide real-time tracking, demand forecasting, and reporting capabilities.',
    reasonForRequest: 'Inventory optimization',
    urgency: 'high',
    dateNeededBy: '2023-09-27',
    additionalInformation:
      'Efficient inventory management is essential for minimizing costs and ensuring products are available when needed.',
    requestStatus: 'pending',
  },
  {
    department: 'Office Administration',
    resourceType: 'Hardware',
    resourceQuantity: '4',
    resourceDescription:
      'This request is for 4 high-quality multifunction printers for the Office Administration department. These printers should offer advanced document management and scanning capabilities.',
    reasonForRequest: 'Equipment upgrade',
    urgency: 'medium',
    dateNeededBy: '2023-09-24',
    additionalInformation:
      'Efficient document handling is crucial for our administrative processes, and these printers will improve our capabilities in this regard.',
    requestStatus: 'approved',
  },
  {
    department: 'Executive Management',
    resourceType: 'Other',
    resourceQuantity: '1',
    resourceDescription:
      'This request is for a strategic planning workshop for the Executive Management team. The workshop should focus on setting long-term goals and aligning our business strategies.',
    reasonForRequest: 'Strategic planning',
    urgency: 'high',
    dateNeededBy: '2023-09-25',
    additionalInformation:
      'Effective strategic planning is vital for guiding our organization toward sustained success, and this workshop will facilitate that process.',
    requestStatus: 'pending',
  },
  {
    department: 'Accounting',
    resourceType: 'Access',
    resourceQuantity: '2',
    resourceDescription:
      'This request is for 2 additional user licenses for our financial analysis software. These licenses are needed to accommodate new members of the accounting team and ensure accurate financial reporting.',
    reasonForRequest: 'Team expansion',
    urgency: 'low',
    dateNeededBy: '2023-09-29',
    additionalInformation:
      'As our company grows, we are adding new members to the accounting team, and additional licenses are necessary for them to access the system.',
    requestStatus: 'approved',
  },
  {
    department: 'Store Administration',
    resourceType: 'Hardware',
    resourceQuantity: '6',
    resourceDescription:
      'This request is for 6 high-capacity storage servers for the Store Administration department. These servers will enhance data storage and retrieval capabilities, ensuring efficient store operations.',
    reasonForRequest: 'Data management',
    urgency: 'medium',
    dateNeededBy: '2023-10-10',
    additionalInformation:
      'Efficient data management is critical for store administration, and these servers will provide the necessary storage capacity.',
    requestStatus: 'pending',
  },
  {
    department: 'Field Service Technicians',
    resourceType: 'Hardware',
    resourceQuantity: '7',
    resourceDescription:
      'This request is for 7 rugged tablets for Field Service Technicians. These tablets should be durable and equipped with specialized field service software to support technicians in remote locations.',
    reasonForRequest: 'Field mobility',
    urgency: 'high',
    dateNeededBy: '2023-10-12',
    additionalInformation:
      'Our technicians frequently work in challenging environments, and rugged tablets will improve their productivity and data collection in the field.',
    requestStatus: 'pending',
  },
  {
    department: 'Marketing',
    resourceType: 'Software',
    resourceQuantity: '1',
    resourceDescription:
      'This request is for social media analytics software for the Marketing department. The software should provide insights into social media performance and audience engagement.',
    reasonForRequest: 'Social media optimization',
    urgency: 'low',
    dateNeededBy: '2023-09-28',
    additionalInformation:
      'Our social media presence is crucial for brand visibility, and this software will help us refine our social media strategy.',
    requestStatus: 'approved',
  },
  {
    department: 'Maintenance',
    resourceType: 'Other',
    resourceQuantity: '1',
    resourceDescription:
      'This request is for advanced predictive maintenance software for the Maintenance department. The software should analyze equipment data to predict maintenance needs and prevent unexpected breakdowns.',
    reasonForRequest: 'Equipment reliability',
    urgency: 'medium',
    dateNeededBy: '2023-10-08',
    additionalInformation:
      'Minimizing equipment downtime is critical for our maintenance team, and predictive maintenance software will help achieve that.',
    requestStatus: 'pending',
  },
  {
    department: 'Accounting',
    resourceType: 'Software',
    resourceQuantity: '1',
    resourceDescription:
      'This request is for accounting software that will assist the Accounting department in automating financial calculations and generating accurate reports. The software should include modules for payroll, expense tracking, and financial analysis.',
    reasonForRequest: 'Efficiency improvement',
    urgency: 'medium',
    dateNeededBy: '2023-10-10',
    additionalInformation:
      'Streamlining our accounting processes is essential for accurate financial reporting and compliance with regulatory requirements.',
    requestStatus: 'pending',
  },
  {
    department: 'Human Resources',
    resourceType: 'Access',
    resourceQuantity: '5',
    resourceDescription:
      'This request is for 5 additional access licenses for our HR management system. These licenses are needed to accommodate new HR team members and ensure they can effectively manage employee data and workflows.',
    reasonForRequest: 'Team expansion',
    urgency: 'low',
    dateNeededBy: '2023-09-28',
    additionalInformation:
      "As our organization grows, it's crucial to ensure that our HR team can efficiently handle the needs of our expanding workforce.",
    requestStatus: 'approved',
  },
  {
    department: 'Sales',
    resourceType: 'Hardware',
    resourceQuantity: '10',
    resourceDescription:
      'This request is for 10 high-performance laptops for the Sales department. These laptops should be equipped with powerful processors and ample memory to support our sales representatives in running demanding sales software and conducting virtual meetings.',
    reasonForRequest: 'Equipment upgrade',
    urgency: 'high',
    dateNeededBy: '2023-10-05',
    additionalInformation:
      'Modern laptops are crucial for our sales team to stay competitive and efficiently serve our clients.',
    requestStatus: 'approved',
  },
  {
    department: 'Marketing',
    resourceType: 'Software',
    resourceQuantity: '1',
    resourceDescription:
      'This request is for marketing automation software that will enable the Marketing department to streamline email campaigns, track website engagement, and analyze customer behavior. The software should provide robust analytics and integration capabilities.',
    reasonForRequest: 'Marketing efficiency',
    urgency: 'medium',
    dateNeededBy: '2023-10-15',
    additionalInformation:
      'Efficient marketing automation is vital for reaching our audience effectively and achieving our marketing goals.',
    requestStatus: 'approved',
  },
  {
    department: 'Maintenance',
    resourceType: 'Hardware',
    resourceQuantity: '4',
    resourceDescription:
      'This request is for four industrial-grade welding machines needed by the Maintenance department. These machines should meet safety standards and be capable of performing precision welding tasks.',
    reasonForRequest: 'Equipment upgrade',
    urgency: 'high',
    dateNeededBy: '2023-09-30',
    additionalInformation:
      'Our current welding machines are outdated and do not provide the required precision, leading to suboptimal repairs.',
    requestStatus: 'pending',
  },
  {
    department: 'Logistics and Inventory',
    resourceType: 'Access',
    resourceQuantity: '15',
    resourceDescription:
      'This request involves acquiring 15 additional RFID access cards for secure warehouse access within the Logistics and Inventory department. These cards will enhance security and improve traceability of inventory movements.',
    reasonForRequest: 'Security enhancement',
    urgency: 'low',
    dateNeededBy: '2023-10-12',
    additionalInformation:
      'Enhanced security measures are essential to prevent inventory shrinkage and unauthorized access in our warehouses.',
    requestStatus: 'approved',
  },
  {
    department: 'Field Service Technicians',
    resourceType: 'Hardware',
    resourceQuantity: '6',
    resourceDescription:
      'This request is for the purchase of six rugged tablets for Field Service Technicians. These tablets should be durable and capable of running specialized field service software.',
    reasonForRequest: 'Field mobility',
    urgency: 'high',
    dateNeededBy: '2023-09-27',
    additionalInformation:
      'Our technicians frequently work in challenging environments, and rugged tablets will improve their productivity and data collection in the field.',
    requestStatus: 'approved',
  },
  {
    department: 'Executive Management',
    resourceType: 'Other',
    resourceQuantity: '1',
    resourceDescription:
      'This request is for executive leadership coaching sessions for the Executive Management team. The coaching should focus on enhancing leadership skills, decision-making, and strategic planning.',
    reasonForRequest: 'Leadership development',
    urgency: 'medium',
    dateNeededBy: '2023-10-08',
    additionalInformation:
      'Effective leadership at the executive level is crucial for guiding our organization through growth and change.',
    requestStatus: 'pending',
  },
  {
    department: 'Customer Service',
    resourceType: 'Software',
    resourceQuantity: '1',
    resourceDescription:
      'This request is for customer service chatbot software for the Customer Service department. The software should enable automated responses to common customer queries and improve response times.',
    reasonForRequest: 'Customer support enhancement',
    urgency: 'medium',
    dateNeededBy: '2023-09-25',
    additionalInformation:
      'Efficient customer support is essential for maintaining high customer satisfaction, and chatbot software will assist in achieving that.',
    requestStatus: 'approved',
  },
  {
    department: 'Office Administration',
    resourceType: 'Hardware',
    resourceQuantity: '3',
    resourceDescription:
      'This request is for three high-capacity network printers for the Office Administration department. These printers should offer advanced printing capabilities and network connectivity.',
    reasonForRequest: 'Office efficiency',
    urgency: 'low',
    dateNeededBy: '2023-10-10',
    additionalInformation:
      'Efficient document handling and printing are essential for our administrative processes, and these network printers will improve our capabilities.',
    requestStatus: 'approved',
  },
  {
    department: 'Executive Management',
    resourceType: 'Hardware',
    resourceQuantity: '3',
    resourceDescription:
      'This request is for three high-end laptops needed by the Executive Management team. These laptops should have powerful processors and large displays to handle complex strategic planning and analysis tasks.',
    reasonForRequest: 'Executive productivity',
    urgency: 'high',
    dateNeededBy: '2023-10-15',
    additionalInformation:
      'Efficient laptops are essential for the Executive Management team to make informed decisions and lead the organization effectively.',
    requestStatus: 'approved',
  },
  {
    department: 'Store Administration',
    resourceType: 'Software',
    resourceQuantity: '1',
    resourceDescription:
      'This request is for inventory management software specialized for Store Administration. The software should provide real-time stock tracking, reorder alerts, and inventory analytics.',
    reasonForRequest: 'Inventory optimization',
    urgency: 'medium',
    dateNeededBy: '2023-10-10',
    additionalInformation:
      'Effective inventory management is crucial for ensuring products are available for our customers while minimizing holding costs.',
    requestStatus: 'approved',
  },
  {
    department: 'Information Technology',
    resourceType: 'Hardware',
    resourceQuantity: '5',
    resourceDescription:
      'This request is for five high-capacity network switches for the Information Technology department. These switches should provide reliable and fast network connectivity for our growing IT infrastructure.',
    reasonForRequest: 'Network upgrade',
    urgency: 'high',
    dateNeededBy: '2023-09-30',
    additionalInformation:
      "A robust and scalable network infrastructure is essential for supporting our organization's digital operations.",
    requestStatus: 'approved',
  },
  {
    department: 'Human Resources',
    resourceType: 'Other',
    resourceQuantity: '1',
    resourceDescription:
      'This request is for a comprehensive employee wellness program for the Human Resources department. The program should include fitness classes, mental health resources, and wellness workshops.',
    reasonForRequest: 'Employee well-being',
    urgency: 'low',
    dateNeededBy: '2023-10-05',
    additionalInformation:
      'Promoting employee well-being contributes to a positive work environment and increases overall job satisfaction.',
    requestStatus: 'approved',
  },
  {
    department: 'Sales',
    resourceType: 'Access',
    resourceQuantity: '10',
    resourceDescription:
      'This request is for 10 additional user licenses for our CRM software. These licenses are needed to accommodate new sales team members and ensure they have access to customer data.',
    reasonForRequest: 'Team expansion',
    urgency: 'medium',
    dateNeededBy: '2023-10-12',
    additionalInformation:
      "As our sales team grows, it's crucial to provide the necessary tools for them to effectively manage customer relationships and sales opportunities.",
    requestStatus: 'approved',
  },
  {
    department: 'Customer Service',
    resourceType: 'Software',
    resourceQuantity: '1',
    resourceDescription:
      'This request is for customer service chatbot software for the Customer Service department. The chatbot should be able to handle common customer inquiries and escalate complex issues to human agents.',
    reasonForRequest: 'Customer support enhancement',
    urgency: 'high',
    dateNeededBy: '2023-09-28',
    additionalInformation:
      'Efficient customer support is vital for maintaining high customer satisfaction, and chatbot software will assist in achieving that.',
    requestStatus: 'approved',
  },
  {
    department: 'Maintenance',
    resourceType: 'Hardware',
    resourceQuantity: '5',
    resourceDescription:
      'This request is for five specialized maintenance tools needed by the Maintenance department. These tools should be of high quality and assist in equipment repairs and maintenance.',
    reasonForRequest: 'Maintenance efficiency',
    urgency: 'medium',
    dateNeededBy: '2023-09-25',
    additionalInformation:
      'Efficient maintenance tools are essential for minimizing equipment downtime and ensuring operational reliability.',
    requestStatus: 'approved',
  },
  {
    department: 'Marketing',
    resourceType: 'Other',
    resourceQuantity: '1',
    resourceDescription:
      'This request is for a marketing analytics workshop for the Marketing department. The workshop should cover advanced analytics techniques and marketing strategy optimization.',
    reasonForRequest: 'Marketing skill enhancement',
    urgency: 'medium',
    dateNeededBy: '2023-10-08',
    additionalInformation:
      'Enhancing the analytical skills of our marketing team is vital for making data-driven marketing decisions and improving campaign performance.',
    requestStatus: 'pending',
  },
  {
    department: 'Field Service Technicians',
    resourceType: 'Hardware',
    resourceQuantity: '3',
    resourceDescription:
      'This request is for three portable diagnostic devices for Field Service Technicians. These devices should assist in quickly identifying equipment faults during on-site visits.',
    reasonForRequest: 'Diagnostic tools upgrade',
    urgency: 'high',
    dateNeededBy: '2023-09-29',
    additionalInformation:
      'Efficient diagnostics are critical for minimizing equipment downtime and meeting customer service commitments.',
    requestStatus: 'approved',
  },
  {
    department: 'Logistics and Inventory',
    resourceType: 'Hardware',
    resourceQuantity: '7',
    resourceDescription:
      'This request is for seven rugged handheld barcode scanners for the Logistics and Inventory department. These scanners should be durable and enable efficient tracking of inventory in warehouses.',
    reasonForRequest: 'Inventory management',
    urgency: 'medium',
    dateNeededBy: '2023-10-10',
    additionalInformation:
      'Accurate inventory management is essential for timely order fulfillment and minimizing errors in our supply chain.',
    requestStatus: 'approved',
  },
  {
    department: 'Office Administration',
    resourceType: 'Hardware',
    resourceQuantity: '4',
    resourceDescription:
      'This request is for four ergonomic office chairs for the Office Administration department. Ergonomic chairs are essential for maintaining the comfort and well-being of administrative staff who spend long hours at their desks.',
    reasonForRequest: 'Employee comfort',
    urgency: 'low',
    dateNeededBy: '2023-09-27',
    additionalInformation:
      'Providing ergonomic chairs will enhance the productivity and overall job satisfaction of our administrative team.',
    requestStatus: 'approved',
  },
  {
    department: 'Repair Technicians',
    resourceType: 'Software',
    resourceQuantity: '1',
    resourceDescription:
      'This request is for specialized diagnostic software for Repair Technicians. The software should assist in diagnosing equipment faults and generating repair recommendations.',
    reasonForRequest: 'Diagnostic tools upgrade',
    urgency: 'high',
    dateNeededBy: '2023-09-30',
    additionalInformation:
      'Efficient diagnostic tools are critical for quickly identifying and resolving equipment issues.',
    requestStatus: 'approved',
  },
  {
    department: 'Marketing',
    resourceType: 'Access',
    resourceQuantity: '5',
    resourceDescription:
      'This request is for five additional user licenses for our marketing automation platform. These licenses are needed to accommodate new marketing team members and enhance campaign management.',
    reasonForRequest: 'Team expansion',
    urgency: 'medium',
    dateNeededBy: '2023-10-05',
    additionalInformation:
      "As our marketing team grows, it's important to provide access to the marketing automation tools that streamline our campaigns.",
    requestStatus: 'approved',
  },
  {
    department: 'Customer Service',
    resourceType: 'Hardware',
    resourceQuantity: '2',
    resourceDescription:
      'This request is for two high-quality noise-canceling headsets for the Customer Service department. These headsets will help customer service agents maintain clear and uninterrupted communication with customers.',
    reasonForRequest: 'Improved communication',
    urgency: 'low',
    dateNeededBy: '2023-10-12',
    additionalInformation:
      'Clear and uninterrupted communication is essential for providing exceptional customer service and resolving inquiries effectively.',
    requestStatus: 'approved',
  },
  {
    department: 'Store Administration',
    resourceType: 'Access',
    resourceQuantity: '20',
    resourceDescription:
      'This request is for 20 additional access badges for secure entry to the administrative areas within the Store Administration department. These badges will enhance security and restrict unauthorized access.',
    reasonForRequest: 'Security enhancement',
    urgency: 'medium',
    dateNeededBy: '2023-10-15',
    additionalInformation:
      'Enhanced security measures are crucial to protect sensitive administrative areas and data.',
    requestStatus: 'approved',
  },
  {
    department: 'Executive Management',
    resourceType: 'Hardware',
    resourceQuantity: '5',
    resourceDescription:
      'Requesting 5 high-performance laptops for the Executive Management team. These laptops should have the latest processors, ample memory, and large displays to facilitate strategic planning and data analysis tasks.',
    reasonForRequest: 'Enhancing executive productivity',
    urgency: 'high',
    dateNeededBy: '2023-10-15',
    additionalInformation:
      'Efficient laptops are crucial for the Executive Management team to make data-driven decisions and lead the organization effectively.',
    requestStatus: 'approved',
  },
  {
    department: 'Store Administration',
    resourceType: 'Software',
    resourceQuantity: '1',
    resourceDescription:
      'Requesting inventory management software for the Store Administration department. The software should provide real-time stock tracking, automatic reordering, and detailed inventory analytics.',
    reasonForRequest: 'Optimizing inventory control',
    urgency: 'medium',
    dateNeededBy: '2023-10-10',
    additionalInformation:
      'Effective inventory management is vital to ensure products are available for customers while minimizing holding costs.',
    requestStatus: 'approved',
  },
  {
    department: 'Information Technology',
    resourceType: 'Hardware',
    resourceQuantity: '10',
    resourceDescription:
      'Requesting 10 high-capacity network switches for the Information Technology department. These switches should provide reliable and fast network connectivity to support our growing IT infrastructure.',
    reasonForRequest: 'Upgrading network infrastructure',
    urgency: 'high',
    dateNeededBy: '2023-09-30',
    additionalInformation:
      'A robust network infrastructure is essential for supporting our digital operations effectively.',
    requestStatus: 'approved',
  },
  {
    department: 'Human Resources',
    resourceType: 'Other',
    resourceQuantity: '1',
    resourceDescription:
      'Requesting a comprehensive employee wellness program for the Human Resources department. The program should include fitness classes, mental health resources, and wellness workshops.',
    reasonForRequest: 'Promoting employee well-being',
    urgency: 'low',
    dateNeededBy: '2023-10-05',
    additionalInformation:
      'Fostering employee well-being creates a positive work environment and increases overall job satisfaction.',
    requestStatus: 'approved',
  },
  {
    department: 'Sales',
    resourceType: 'Access',
    resourceQuantity: '15',
    resourceDescription:
      'Requesting 15 additional user licenses for our CRM software. These licenses are needed to accommodate new sales team members and ensure they have access to customer data and sales pipelines.',
    reasonForRequest: 'Scaling the sales team',
    urgency: 'medium',
    dateNeededBy: '2023-10-12',
    additionalInformation:
      "As our sales team grows, it's essential to provide the necessary tools for them to manage customer relationships effectively.",
    requestStatus: 'approved',
  },
  {
    department: 'Customer Service',
    resourceType: 'Software',
    resourceQuantity: '1',
    resourceDescription:
      'Requesting customer service chatbot software for the Customer Service department. The chatbot should handle routine customer inquiries, allowing human agents to focus on more complex issues.',
    reasonForRequest: 'Improving customer support efficiency',
    urgency: 'high',
    dateNeededBy: '2023-09-28',
    additionalInformation:
      'Efficient customer support is vital for maintaining high customer satisfaction, and a chatbot can assist in achieving that.',
    requestStatus: 'approved',
  },
  {
    department: 'Maintenance',
    resourceType: 'Hardware',
    resourceQuantity: '5',
    resourceDescription:
      'Requesting five specialized maintenance tools for the Maintenance department. These tools should be of high quality and aid in equipment repairs and preventive maintenance.',
    reasonForRequest: 'Enhancing maintenance efficiency',
    urgency: 'medium',
    dateNeededBy: '2023-09-25',
    additionalInformation:
      'Efficient maintenance tools are critical for minimizing equipment downtime and ensuring operational reliability.',
    requestStatus: 'approved',
  },
  {
    department: 'Marketing',
    resourceType: 'Other',
    resourceQuantity: '1',
    resourceDescription:
      'Requesting a marketing analytics workshop for the Marketing department. The workshop should cover advanced analytics techniques and strategies for optimizing marketing campaigns.',
    reasonForRequest: 'Improving marketing analytics skills',
    urgency: 'medium',
    dateNeededBy: '2023-10-08',
    additionalInformation:
      'Enhancing the analytical skills of our marketing team is essential for making data-driven marketing decisions and improving campaign performance.',
    requestStatus: 'pending',
  },
  {
    department: 'Field Service Technicians',
    resourceType: 'Hardware',
    resourceQuantity: '3',
    resourceDescription:
      'Requesting three portable diagnostic devices for Field Service Technicians. These devices should assist in quickly identifying equipment faults during on-site visits.',
    reasonForRequest: 'Upgrading diagnostic tools',
    urgency: 'high',
    dateNeededBy: '2023-09-29',
    additionalInformation:
      'Efficient diagnostics are critical for minimizing equipment downtime and meeting customer service commitments.',
    requestStatus: 'approved',
  },
  {
    department: 'Logistics and Inventory',
    resourceType: 'Hardware',
    resourceQuantity: '7',
    resourceDescription:
      'Requesting seven rugged handheld barcode scanners for the Logistics and Inventory department. These scanners should be durable and enable efficient tracking of inventory in warehouses.',
    reasonForRequest: 'Improving inventory management',
    urgency: 'medium',
    dateNeededBy: '2023-10-10',
    additionalInformation:
      'Accurate inventory management is essential for timely order fulfillment and minimizing errors in our supply chain.',
    requestStatus: 'approved',
  },
  {
    department: 'Office Administration',
    resourceType: 'Hardware',
    resourceQuantity: '4',
    resourceDescription:
      'Requesting four ergonomic office chairs for the Office Administration department. Ergonomic chairs are essential for maintaining the comfort and well-being of administrative staff who spend long hours at their desks.',
    reasonForRequest: 'Enhancing employee comfort',
    urgency: 'low',
    dateNeededBy: '2023-09-27',
    additionalInformation:
      'Providing ergonomic chairs will enhance the productivity and overall job satisfaction of our administrative team.',
    requestStatus: 'approved',
  },
  {
    department: 'Repair Technicians',
    resourceType: 'Software',
    resourceQuantity: '1',
    resourceDescription:
      'Requesting specialized diagnostic software for Repair Technicians. The software should assist in diagnosing equipment faults and generating repair recommendations.',
    reasonForRequest: 'Upgrading diagnostic tools',
    urgency: 'high',
    dateNeededBy: '2023-09-30',
    additionalInformation:
      'Efficient diagnostic tools are critical for quickly identifying and resolving equipment issues.',
    requestStatus: 'approved',
  },
  {
    department: 'Marketing',
    resourceType: 'Access',
    resourceQuantity: '5',
    resourceDescription:
      'Requesting five additional user licenses for our marketing automation platform. These licenses are needed to accommodate new marketing team members and enhance campaign management.',
    reasonForRequest: 'Expanding the marketing team',
    urgency: 'medium',
    dateNeededBy: '2023-10-05',
    additionalInformation:
      "As our marketing team grows, it's important to provide access to marketing automation tools that streamline our campaigns.",
    requestStatus: 'approved',
  },
  {
    department: 'Customer Service',
    resourceType: 'Hardware',
    resourceQuantity: '2',
    resourceDescription:
      'Requesting two high-quality noise-canceling headsets for the Customer Service department. These headsets will help customer service agents maintain clear and uninterrupted communication with customers.',
    reasonForRequest: 'Improving communication quality',
    urgency: 'low',
    dateNeededBy: '2023-10-12',
    additionalInformation:
      'Clear and uninterrupted communication is essential for providing exceptional customer service and resolving inquiries effectively.',
    requestStatus: 'approved',
  },
  {
    department: 'Store Administration',
    resourceType: 'Access',
    resourceQuantity: '20',
    resourceDescription:
      'Requesting 20 additional access badges for secure entry to the administrative areas within the Store Administration department. These badges will enhance security and restrict unauthorized access.',
    reasonForRequest: 'Enhancing security measures',
    urgency: 'medium',
    dateNeededBy: '2023-10-15',
    additionalInformation:
      'Enhanced security measures are crucial to protect sensitive administrative areas and data.',
    requestStatus: 'approved',
  },
];

const groupedByRequestResources = groupByField({
  objectArray: requestResourcesArray,
  field: 'department',
});

type GroupedByRequestResources = Record<
  string | number | symbol,
  {
    department: string;
    resourceType: string;
    resourceQuantity: string;
    resourceDescription: string;
    reasonForRequest: string;
    urgency: string;
    dateNeededBy: string;
    additionalInformation: string;
    requestStatus: string;
  }[]
>;

console.log({ groupedByRequestResources });

function returnRequestResourcesBodies({
  groupedByRequestResources,
  userDocs,
}: {
  userDocs: DirectoryUserDocument[];
  groupedByRequestResources: GroupedByRequestResources;
}) {
  return userDocs.reduce((bodiesAcc, userDoc) => {
    const { _id, username, department } = userDoc;

    // find request resources for this user's department
    const requestResourcesForThisUser = groupedByRequestResources[department];

    // randomly select number of request resources for this user
    const numberOfRequestResourcesForThisUser = Math.floor(Math.random() * 7);

    // shuffle request resources for this user
    const shuffledRequestResourcesForThisUser = shuffleArray(
      requestResourcesForThisUser
    );

    // select request resources for this user
    const selectedRequestResourcesForThisUser =
      shuffledRequestResourcesForThisUser.slice(
        0,
        numberOfRequestResourcesForThisUser
      );

    const bodiesArr = selectedRequestResourcesForThisUser.map(
      (requestResource) => {
        const body = {
          ...requestResource,
          userId: _id,
          username,
        };

        return body;
      }
    );

    bodiesAcc.push(...bodiesArr);

    return bodiesAcc;
  }, [] as any[]);
}

export { requestResourcesArray, returnRequestResourcesBodies };
export type { GroupedByRequestResources };
