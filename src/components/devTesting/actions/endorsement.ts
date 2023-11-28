import { groupByField, shuffleArray } from '../../../utils';
import { DirectoryUserDocument } from '../../directory/types';

const endorsementsArray = [
  {
    department: 'Store Administration',
    title: 'Efficient Inventory Management',
    summaryOfEndorsement:
      'Their meticulous approach to store inventory management has significantly reduced waste and improved cost-efficiency.',
    attributeEndorsed: ['reliability and dependability', 'technical expertise'],
    requestStatus: 'approved',
  },
  {
    department: 'Office Administration',
    title: 'Streamlined Workflow Architect',
    summaryOfEndorsement:
      'They have redefined office administration by designing workflows that minimize bottlenecks and maximize productivity.',
    attributeEndorsed: ['initiative and proactivity', 'communication'],
    requestStatus: 'approved',
  },
  {
    department: 'Accounting',
    title: 'Financial Accuracy Maestro',
    summaryOfEndorsement:
      "In the realm of accounting, their commitment to financial accuracy is unmatched, ensuring the company's financial health.",
    attributeEndorsed: ['technical expertise'],
    requestStatus: 'approved',
  },
  {
    department: 'Human Resources',
    title: 'Employee Engagement Advocate',
    summaryOfEndorsement:
      'Their passion for employee engagement has resulted in a motivated and harmonious workforce, driving our success.',
    attributeEndorsed: [
      'leadership and mentorship',
      'teamwork and collaboration',
    ],
    requestStatus: 'approved',
  },
  {
    department: 'Sales',
    title: 'Sales Strategy Visionary',
    summaryOfEndorsement:
      'They have a visionary approach to sales strategies, consistently delivering revenue growth and market expansion.',
    attributeEndorsed: ['initiative and proactivity', 'technical expertise'],
    requestStatus: 'approved',
  },
  {
    department: 'Marketing',
    title: 'Innovative Marketing Maven',
    summaryOfEndorsement:
      "Their innovative marketing campaigns have captivated audiences and elevated our brand's presence in the market.",
    attributeEndorsed: ['communication', 'initiative and proactivity'],
    requestStatus: 'approved',
  },
  {
    department: 'Information Technology',
    title: 'IT Security Sentinel',
    summaryOfEndorsement:
      'As an IT security sentinel, they have diligently safeguarded our systems against cyber threats, ensuring data integrity.',
    attributeEndorsed: ['technical expertise', 'reliability and dependability'],
    requestStatus: 'approved',
  },
  {
    department: 'Repair Technicians',
    title: 'Swift Problem Solver',
    summaryOfEndorsement:
      'Their ability to swiftly diagnose and solve technical issues has minimized downtime, keeping our operations running smoothly.',
    attributeEndorsed: ['problem solving', 'reliability and dependability'],
    requestStatus: 'approved',
  },
  {
    department: 'Field Service Technicians',
    title: 'Customer-Focused Heroes',
    summaryOfEndorsement:
      'As field service technicians, they are true customer-focused heroes, always going the extra mile to satisfy our clients.',
    attributeEndorsed: ['customer service', 'adaptibility and flexibility'],
    requestStatus: 'approved',
  },
  {
    department: 'Logistics and Inventory',
    title: 'Logistics Optimization Pro',
    summaryOfEndorsement:
      'Their expertise in logistics optimization has streamlined our supply chain, reducing costs and enhancing efficiency.',
    attributeEndorsed: [
      'initiative and proactivity',
      'reliability and dependability',
    ],
    requestStatus: 'approved',
  },
  {
    department: 'Customer Service',
    title: 'Customer Satisfaction Champion',
    summaryOfEndorsement:
      'They are the undisputed champion of customer satisfaction, consistently exceeding expectations and building loyal clientele.',
    attributeEndorsed: ['customer service', 'communication'],
    requestStatus: 'approved',
  },
  {
    department: 'Maintenance',
    title: 'Facility Care Maestro',
    summaryOfEndorsement:
      'Our facility maintenance has never been in better hands. They are true professionals in keeping our premises in top shape.',
    attributeEndorsed: ['reliability and dependability'],
    requestStatus: 'approved',
  },
  {
    department: 'Store Administration',
    title: 'Inventory Efficiency Guru',
    summaryOfEndorsement:
      'Their mastery of inventory efficiency has optimized stock levels, ensuring products are always available when customers need them.',
    attributeEndorsed: ['problem solving', 'technical expertise'],
    requestStatus: 'approved',
  },
  {
    department: 'Office Administration',
    title: 'Workflow Wizard',
    summaryOfEndorsement:
      "As a workflow wizard, they've transformed our administrative processes, making them more efficient and user-friendly.",
    attributeEndorsed: ['initiative and proactivity', 'communication'],
    requestStatus: 'approved',
  },
  {
    department: 'Accounting',
    title: 'Financial Steward',
    summaryOfEndorsement:
      'Their role as a financial steward has ensured that our accounts are managed with precision and integrity.',
    attributeEndorsed: ['reliability and dependability', 'technical expertise'],
    requestStatus: 'approved',
  },
  {
    department: 'Sales',
    title: 'Sales Growth Dynamo',
    summaryOfEndorsement:
      'Their strategic sales initiatives have consistently resulted in substantial sales growth, driving our revenue to new heights.',
    attributeEndorsed: ['initiative and proactivity', 'technical expertise'],
    requestStatus: 'approved',
  },
  {
    department: 'Marketing',
    title: 'Content Creation Prodigy',
    summaryOfEndorsement:
      'As a content creation prodigy, they have an innate ability to craft engaging and viral content that resonates with our target audience.',
    attributeEndorsed: ['communication', 'initiative and proactivity'],
    requestStatus: 'approved',
  },
  {
    department: 'Information Technology',
    title: 'Cybersecurity Guardian',
    summaryOfEndorsement:
      'Their dedication to cybersecurity has safeguarded our systems from threats, ensuring data confidentiality and trustworthiness.',
    attributeEndorsed: ['technical expertise', 'reliability and dependability'],
    requestStatus: 'approved',
  },
  {
    department: 'Repair Technicians',
    title: 'Technical Troubleshooter',
    summaryOfEndorsement:
      'They possess an exceptional ability to troubleshoot technical issues, resolving them swiftly and with precision.',
    attributeEndorsed: ['problem solving', 'reliability and dependability'],
    requestStatus: 'approved',
  },
  {
    department: 'Field Service Technicians',
    title: 'Client Relationship Builder',
    summaryOfEndorsement:
      'As field service technicians, they excel in building strong client relationships, fostering trust and loyalty.',
    attributeEndorsed: ['customer service', 'adaptibility and flexibility'],
    requestStatus: 'approved',
  },
  {
    department: 'Logistics and Inventory',
    title: 'Supply Chain Maestro',
    summaryOfEndorsement:
      'Their mastery of supply chain management has optimized our inventory turnover and reduced overhead costs.',
    attributeEndorsed: [
      'initiative and proactivity',
      'reliability and dependability',
    ],
    requestStatus: 'approved',
  },
  {
    department: 'Customer Service',
    title: 'Customer Experience Champion',
    summaryOfEndorsement:
      'They champion the customer experience, ensuring every interaction is positive, memorable, and leaves customers satisfied.',
    attributeEndorsed: ['customer service', 'communication'],
    requestStatus: 'approved',
  },
  {
    department: 'Maintenance',
    title: 'Facility Care Guru',
    summaryOfEndorsement:
      'Our facility maintenance is in the capable hands of a true guru who ensures our premises are always safe and welcoming.',
    attributeEndorsed: ['reliability and dependability'],
    requestStatus: 'approved',
  },
  {
    department: 'Store Administration',
    title: 'Inventory Optimization Expert',
    summaryOfEndorsement:
      'Their expertise in inventory optimization has reduced costs, minimized waste, and improved our bottom line significantly.',
    attributeEndorsed: ['problem solving', 'technical expertise'],
    requestStatus: 'approved',
  },
  {
    department: 'Office Administration',
    title: 'Workflow Efficiency Guru',
    summaryOfEndorsement:
      'They are a workflow efficiency guru, making our administrative tasks smoother and more efficient.',
    attributeEndorsed: ['initiative and proactivity', 'communication'],
    requestStatus: 'approved',
  },
  {
    department: 'Accounting',
    title: 'Financial Integrity Guardian',
    summaryOfEndorsement:
      'Their role as a financial integrity guardian has ensured that our financial transactions are impeccable and above reproach.',
    attributeEndorsed: ['reliability and dependability', 'technical expertise'],
    requestStatus: 'approved',
  },
  {
    department: 'Human Resources',
    title: 'Employee Development Advocate',
    summaryOfEndorsement:
      'They advocate for employee development, creating programs that empower our staff to grow and excel in their roles.',
    attributeEndorsed: [
      'leadership and mentorship',
      'teamwork and collaboration',
    ],
    requestStatus: 'approved',
  },
  {
    department: 'Marketing',
    title: 'Digital Marketing Maven',
    summaryOfEndorsement:
      'As a digital marketing maven, they have harnessed the power of digital channels to drive brand awareness and customer engagement.',
    attributeEndorsed: ['communication', 'initiative and proactivity'],
    requestStatus: 'approved',
  },
  {
    department: 'Information Technology',
    title: 'IT Problem Solver',
    summaryOfEndorsement:
      'Their exceptional problem-solving skills in IT have minimized disruptions and ensured seamless operations.',
    attributeEndorsed: ['problem solving', 'reliability and dependability'],
    requestStatus: 'approved',
  },
  {
    department: 'Maintenance',
    title: 'Facility Safety Champion',
    summaryOfEndorsement:
      "Our facility's safety is championed by them, ensuring a secure environment for our employees and visitors.",
    attributeEndorsed: [
      'reliability and dependability',
      'teamwork and collaboration',
    ],
    requestStatus: 'approved',
  },
  {
    department: 'Sales',
    title: 'Sales Strategy Innovator',
    summaryOfEndorsement:
      'They are an innovator when it comes to sales strategies, constantly devising fresh approaches that lead to increased revenue.',
    attributeEndorsed: ['initiative and proactivity', 'technical expertise'],
    requestStatus: 'approved',
  },
  {
    department: 'Marketing',
    title: 'Content Marketing Extraordinaire',
    summaryOfEndorsement:
      'Their expertise in content marketing has elevated our brand, attracting a wider audience and boosting engagement.',
    attributeEndorsed: ['communication', 'initiative and proactivity'],
    requestStatus: 'approved',
  },
  {
    department: 'Information Technology',
    title: 'IT Solutions Architect',
    summaryOfEndorsement:
      'As an IT solutions architect, they have designed and implemented solutions that have greatly improved our technological landscape.',
    attributeEndorsed: ['technical expertise', 'reliability and dependability'],
    requestStatus: 'approved',
  },
  {
    department: 'Repair Technicians',
    title: 'Technical Marvel',
    summaryOfEndorsement:
      'Their technical prowess is nothing short of marvelous. They tackle complex issues with ease, ensuring minimal downtime.',
    attributeEndorsed: ['problem solving', 'reliability and dependability'],
    requestStatus: 'approved',
  },
  {
    department: 'Field Service Technicians',
    title: 'Customer Relations Expert',
    summaryOfEndorsement:
      'They are experts at building strong customer relations, which has resulted in high customer satisfaction and loyalty.',
    attributeEndorsed: ['customer service', 'adaptibility and flexibility'],
    requestStatus: 'approved',
  },
  {
    department: 'Logistics and Inventory',
    title: 'Logistics Efficiency Mastermind',
    summaryOfEndorsement:
      'Their mastery of logistics efficiency has led to cost savings and improved product availability throughout our supply chain.',
    attributeEndorsed: [
      'initiative and proactivity',
      'reliability and dependability',
    ],
    requestStatus: 'approved',
  },
  {
    department: 'Customer Service',
    title: 'Customer Care Champion',
    summaryOfEndorsement:
      'They champion customer care, ensuring every customer interaction is exceptional and reflects positively on our brand.',
    attributeEndorsed: ['customer service', 'communication'],
    requestStatus: 'approved',
  },
  {
    department: 'Maintenance',
    title: 'Facility Maintenance Prodigy',
    summaryOfEndorsement:
      'Our facilities have never been in better hands. Their prodigious skills keep our premises in impeccable condition.',
    attributeEndorsed: ['reliability and dependability'],
    requestStatus: 'approved',
  },
  {
    department: 'Store Administration',
    title: 'Inventory Management Maestro',
    summaryOfEndorsement:
      'Their mastery of inventory management has led to more efficient stocking practices and a reduction in operational costs.',
    attributeEndorsed: ['problem solving', 'technical expertise'],
    requestStatus: 'approved',
  },
  {
    department: 'Office Administration',
    title: 'Workflow Optimization Expert',
    summaryOfEndorsement:
      "As a workflow optimization expert, they've revolutionized our office processes, making them more streamlined and effective.",
    attributeEndorsed: ['initiative and proactivity', 'communication'],
    requestStatus: 'approved',
  },
  {
    department: 'Accounting',
    title: 'Financial Accuracy Virtuoso',
    summaryOfEndorsement:
      'Their commitment to financial accuracy is virtuosic, ensuring our accounts are always impeccably maintained.',
    attributeEndorsed: ['reliability and dependability', 'technical expertise'],
    requestStatus: 'approved',
  },
  {
    department: 'Human Resources',
    title: 'Employee Engagement Specialist',
    summaryOfEndorsement:
      'They specialize in employee engagement, fostering a workplace culture where team members thrive and succeed.',
    attributeEndorsed: [
      'leadership and mentorship',
      'teamwork and collaboration',
    ],
    requestStatus: 'approved',
  },
  {
    department: 'Marketing',
    title: 'Social Media Maven',
    summaryOfEndorsement:
      "As a social media maven, they've harnessed the power of social platforms to create buzz and engage with our audience.",
    attributeEndorsed: ['communication', 'initiative and proactivity'],
    requestStatus: 'approved',
  },
  {
    department: 'Information Technology',
    title: 'IT Troubleshooting Guru',
    summaryOfEndorsement:
      'Their troubleshooting skills in IT are legendary, swiftly resolving technical issues and minimizing disruptions.',
    attributeEndorsed: ['problem solving', 'reliability and dependability'],
    requestStatus: 'approved',
  },
  {
    department: 'Maintenance',
    title: 'Safety and Efficiency Advocate',
    summaryOfEndorsement:
      'They advocate for both safety and efficiency, creating an environment where employees work safely and productively.',
    attributeEndorsed: [
      'reliability and dependability',
      'teamwork and collaboration',
    ],
    requestStatus: 'approved',
  },
  {
    department: 'Marketing',
    title: 'Digital Marketing Trailblazer',
    summaryOfEndorsement:
      'They have led the charge in digital marketing, pioneering new strategies that have significantly boosted our online presence and engagement.',
    attributeEndorsed: ['communication', 'initiative and proactivity'],
    requestStatus: 'approved',
  },
  {
    department: 'Information Technology',
    title: 'IT Innovator',
    summaryOfEndorsement:
      'Their innovative approach to IT solutions has transformed our technology landscape, making us more agile and competitive.',
    attributeEndorsed: ['technical expertise', 'reliability and dependability'],
    requestStatus: 'approved',
  },
  {
    department: 'Repair Technicians',
    title: 'Precision Technician',
    summaryOfEndorsement:
      'Their precision and attention to detail in troubleshooting and repairs have minimized downtime and kept our operations running smoothly.',
    attributeEndorsed: ['problem solving', 'reliability and dependability'],
    requestStatus: 'approved',
  },
  {
    department: 'Field Service Technicians',
    title: 'Field Excellence Ambassador',
    summaryOfEndorsement:
      'They are ambassadors of field excellence, ensuring our clients receive top-notch service that exceeds their expectations.',
    attributeEndorsed: ['customer service', 'adaptibility and flexibility'],
    requestStatus: 'approved',
  },
  {
    department: 'Logistics and Inventory',
    title: 'Logistics Visionary',
    summaryOfEndorsement:
      'Their forward-thinking logistics strategies have optimized our supply chain, resulting in significant cost savings and efficiency gains.',
    attributeEndorsed: [
      'initiative and proactivity',
      'reliability and dependability',
    ],
    requestStatus: 'approved',
  },
  {
    department: 'Customer Service',
    title: 'Customer-Centric Pro',
    summaryOfEndorsement:
      'They have mastered the art of customer-centricity, ensuring that every customer feels valued and heard, resulting in strong loyalty.',
    attributeEndorsed: ['customer service', 'communication'],
    requestStatus: 'approved',
  },
  {
    department: 'Maintenance',
    title: 'Facility Care Champion',
    summaryOfEndorsement:
      'They champion facility care, taking pride in maintaining our premises to the highest standards of safety and aesthetics.',
    attributeEndorsed: [
      'reliability and dependability',
      'teamwork and collaboration',
    ],
    requestStatus: 'approved',
  },
  {
    department: 'Store Administration',
    title: 'Inventory Wizard',
    summaryOfEndorsement:
      'Their wizardry in inventory management has resulted in optimal stocking levels, reducing costs and waste.',
    attributeEndorsed: ['problem solving', 'technical expertise'],
    requestStatus: 'approved',
  },
  {
    department: 'Office Administration',
    title: 'Efficiency Enthusiast',
    summaryOfEndorsement:
      "As an efficiency enthusiast, they've streamlined our office processes, making them more efficient and user-friendly.",
    attributeEndorsed: ['initiative and proactivity', 'communication'],
    requestStatus: 'approved',
  },
  {
    department: 'Accounting',
    title: 'Financial Integrity Guardian',
    summaryOfEndorsement:
      'Their role as a financial integrity guardian has ensured that our financial transactions are impeccable and above reproach.',
    attributeEndorsed: ['reliability and dependability', 'technical expertise'],
    requestStatus: 'approved',
  },
  {
    department: 'Human Resources',
    title: 'Talent Development Catalyst',
    summaryOfEndorsement:
      'They serve as a catalyst for talent development, creating programs that empower our staff to reach their full potential.',
    attributeEndorsed: [
      'leadership and mentorship',
      'teamwork and collaboration',
    ],
    requestStatus: 'approved',
  },
  {
    department: 'Marketing',
    title: 'Social Media Maestro',
    summaryOfEndorsement:
      "As a social media maestro, they've leveraged social platforms to drive brand awareness and customer engagement to new heights.",
    attributeEndorsed: ['communication', 'initiative and proactivity'],
    requestStatus: 'approved',
  },
  {
    department: 'Information Technology',
    title: 'IT Troubleshooting Expert',
    summaryOfEndorsement:
      'Their expertise in IT troubleshooting has minimized disruptions, ensuring smooth operations across the board.',
    attributeEndorsed: ['problem solving', 'reliability and dependability'],
    requestStatus: 'approved',
  },
  {
    department: 'Maintenance',
    title: 'Safety Advocate',
    summaryOfEndorsement:
      'They advocate for safety at every turn, ensuring our workplace is secure and conducive to productivity.',
    attributeEndorsed: [
      'reliability and dependability',
      'teamwork and collaboration',
    ],
    requestStatus: 'approved',
  },
  {
    department: 'Sales',
    title: 'Sales Growth Pioneer',
    summaryOfEndorsement:
      'Their pioneering strategies in sales have consistently driven remarkable sales growth, setting new records for our company.',
    attributeEndorsed: ['initiative and proactivity', 'technical expertise'],
    requestStatus: 'approved',
  },
  {
    department: 'Marketing',
    title: 'Content Marketing Maestro',
    summaryOfEndorsement:
      'As a content marketing maestro, they have orchestrated campaigns that have not only engaged our audience but also converted them into loyal customers.',
    attributeEndorsed: ['communication', 'initiative and proactivity'],
    requestStatus: 'approved',
  },
  {
    department: 'Information Technology',
    title: 'Tech Innovation Evangelist',
    summaryOfEndorsement:
      'They are an evangelist for tech innovation, consistently introducing cutting-edge solutions that have elevated our technology infrastructure.',
    attributeEndorsed: ['technical expertise', 'reliability and dependability'],
    requestStatus: 'approved',
  },
  {
    department: 'Repair Technicians',
    title: 'Technical Whiz',
    summaryOfEndorsement:
      'Their technical prowess is simply astonishing, ensuring that technical issues are resolved swiftly and effectively.',
    attributeEndorsed: ['problem solving', 'reliability and dependability'],
    requestStatus: 'approved',
  },
  {
    department: 'Field Service Technicians',
    title: 'Client Satisfaction Guru',
    summaryOfEndorsement:
      'They are the guru of client satisfaction, ensuring every client interaction is a memorable and positive experience.',
    attributeEndorsed: ['customer service', 'adaptibility and flexibility'],
    requestStatus: 'approved',
  },
  {
    department: 'Logistics and Inventory',
    title: 'Logistics Maestro',
    summaryOfEndorsement:
      'Their mastery of logistics has transformed our supply chain into a well-oiled machine, saving both time and money.',
    attributeEndorsed: [
      'initiative and proactivity',
      'reliability and dependability',
    ],
    requestStatus: 'approved',
  },
  {
    department: 'Customer Service',
    title: 'Customer Happiness Architect',
    summaryOfEndorsement:
      'They are the architects of customer happiness, ensuring that our customers are not just satisfied, but delighted.',
    attributeEndorsed: ['customer service', 'communication'],
    requestStatus: 'approved',
  },
  {
    department: 'Maintenance',
    title: 'Facility Care Virtuoso',
    summaryOfEndorsement:
      "Our facilities are in the virtuoso's hands, always maintained to the highest standards of safety and aesthetics.",
    attributeEndorsed: ['reliability and dependability'],
    requestStatus: 'approved',
  },
  {
    department: 'Store Administration',
    title: 'Inventory Optimization Specialist',
    summaryOfEndorsement:
      'Their specialization in inventory optimization has made sure that our products are always readily available and our costs are minimized.',
    attributeEndorsed: ['problem solving', 'technical expertise'],
    requestStatus: 'approved',
  },
  {
    department: 'Office Administration',
    title: 'Workflow Maestro',
    summaryOfEndorsement:
      "As a workflow maestro, they've orchestrated our office processes to perfection, enhancing efficiency and user satisfaction.",
    attributeEndorsed: ['initiative and proactivity', 'communication'],
    requestStatus: 'approved',
  },
  {
    department: 'Accounting',
    title: 'Financial Guardian',
    summaryOfEndorsement:
      'Their role as a financial guardian ensures that our financial transactions are handled with the utmost integrity and precision.',
    attributeEndorsed: ['reliability and dependability', 'technical expertise'],
    requestStatus: 'approved',
  },
  {
    department: 'Human Resources',
    title: 'Talent Nurturer',
    summaryOfEndorsement:
      'They nurture talent within our organization, providing opportunities for growth and development that benefit both individuals and the company.',
    attributeEndorsed: [
      'leadership and mentorship',
      'teamwork and collaboration',
    ],
    requestStatus: 'approved',
  },
  {
    department: 'Marketing',
    title: 'Social Media Guru',
    summaryOfEndorsement:
      "As a social media guru, they've harnessed the power of social platforms to boost our brand's online presence and engagement.",
    attributeEndorsed: ['communication', 'initiative and proactivity'],
    requestStatus: 'approved',
  },
  {
    department: 'Information Technology',
    title: 'IT Problem Solver Extraordinaire',
    summaryOfEndorsement:
      'Their extraordinary problem-solving skills in IT have been crucial in maintaining the stability of our technology environment.',
    attributeEndorsed: ['problem solving', 'reliability and dependability'],
    requestStatus: 'approved',
  },
  {
    department: 'Maintenance',
    title: 'Safety and Efficiency Advocate',
    summaryOfEndorsement:
      'They advocate for both safety and efficiency, creating an environment where employees work safely and productively.',
    attributeEndorsed: [
      'reliability and dependability',
      'teamwork and collaboration',
    ],
    requestStatus: 'approved',
  },
  {
    department: 'Sales',
    title: 'Sales Growth Maestro',
    summaryOfEndorsement:
      'Their exceptional ability to drive sales growth has made them a maestro in the field, consistently exceeding targets.',
    attributeEndorsed: ['initiative and proactivity', 'technical expertise'],
    requestStatus: 'approved',
  },
  {
    department: 'Marketing',
    title: 'Content Creation Virtuoso',
    summaryOfEndorsement:
      'As a content creation virtuoso, they have an innate talent for crafting captivating content that resonates with our audience.',
    attributeEndorsed: ['communication', 'initiative and proactivity'],
    requestStatus: 'approved',
  },
  {
    department: 'Information Technology',
    title: 'IT Visionary',
    summaryOfEndorsement:
      'They have a visionary approach to IT solutions, consistently implementing innovations that keep us at the forefront of technology.',
    attributeEndorsed: ['technical expertise', 'reliability and dependability'],
    requestStatus: 'approved',
  },
  {
    department: 'Repair Technicians',
    title: 'Technical Troubleshooter Extraordinaire',
    summaryOfEndorsement:
      'Their extraordinary troubleshooting skills have earned them the reputation of a technical troubleshooter extraordinaire.',
    attributeEndorsed: ['problem solving', 'reliability and dependability'],
    requestStatus: 'approved',
  },
  {
    department: 'Field Service Technicians',
    title: 'Client Satisfaction Champion',
    summaryOfEndorsement:
      'They are the champions of client satisfaction, ensuring that our clients always receive top-notch service and support.',
    attributeEndorsed: ['customer service', 'adaptibility and flexibility'],
    requestStatus: 'approved',
  },
  {
    department: 'Logistics and Inventory',
    title: 'Logistics Magician',
    summaryOfEndorsement:
      'Their magical touch in logistics management has turned complex supply chains into efficient and cost-effective operations.',
    attributeEndorsed: [
      'initiative and proactivity',
      'reliability and dependability',
    ],
    requestStatus: 'approved',
  },
  {
    department: 'Customer Service',
    title: 'Customer Care Maestro',
    summaryOfEndorsement:
      'They are maestros in customer care, orchestrating positive interactions that leave a lasting impression on our customers.',
    attributeEndorsed: ['customer service', 'communication'],
    requestStatus: 'approved',
  },
  {
    department: 'Maintenance',
    title: 'Facility Care Specialist',
    summaryOfEndorsement:
      'As specialists in facility care, they ensure our premises are always well-maintained, safe, and inviting for everyone.',
    attributeEndorsed: ['reliability and dependability'],
    requestStatus: 'approved',
  },
  {
    department: 'Store Administration',
    title: 'Inventory Optimization Expert',
    summaryOfEndorsement:
      'Their expertise in inventory optimization has resulted in streamlined stocking practices and significant cost reductions.',
    attributeEndorsed: ['problem solving', 'technical expertise'],
    requestStatus: 'approved',
  },
  {
    department: 'Office Administration',
    title: 'Efficiency Mastermind',
    summaryOfEndorsement:
      "As efficiency masterminds, they've transformed our office operations, making them more efficient and productive.",
    attributeEndorsed: ['initiative and proactivity', 'communication'],
    requestStatus: 'approved',
  },
  {
    department: 'Accounting',
    title: 'Financial Steward',
    summaryOfEndorsement:
      'They are dedicated financial stewards, ensuring the utmost integrity and accuracy in our financial transactions.',
    attributeEndorsed: ['reliability and dependability', 'technical expertise'],
    requestStatus: 'approved',
  },
  {
    department: 'Human Resources',
    title: 'Talent Development Champion',
    summaryOfEndorsement:
      'They champion talent development, fostering a culture of continuous learning and growth within our organization.',
    attributeEndorsed: [
      'leadership and mentorship',
      'teamwork and collaboration',
    ],
    requestStatus: 'approved',
  },
  {
    department: 'Marketing',
    title: 'Social Media Strategist',
    summaryOfEndorsement:
      "As social media strategists, they've devised winning social media strategies that have amplified our brand's online presence.",
    attributeEndorsed: ['communication', 'initiative and proactivity'],
    requestStatus: 'approved',
  },
  {
    department: 'Information Technology',
    title: 'IT Troubleshooting Guru',
    summaryOfEndorsement:
      'Their guru-level IT troubleshooting skills have been instrumental in maintaining smooth operations and minimizing disruptions.',
    attributeEndorsed: ['problem solving', 'reliability and dependability'],
    requestStatus: 'approved',
  },
  {
    department: 'Maintenance',
    title: 'Safety Advocate',
    summaryOfEndorsement:
      'They advocate for both safety and efficiency, ensuring our workplace is secure and conducive to productivity.',
    attributeEndorsed: [
      'reliability and dependability',
      'teamwork and collaboration',
    ],
    requestStatus: 'approved',
  },
  {
    department: 'Sales',
    title: 'Sales Dynamo',
    summaryOfEndorsement:
      'A true dynamo in sales, their tenacity and innovative approach consistently lead to outstanding results.',
    attributeEndorsed: ['initiative and proactivity', 'technical expertise'],
    requestStatus: 'approved',
  },
  {
    department: 'Marketing',
    title: 'Content Creation Guru',
    summaryOfEndorsement:
      'As a content creation guru, they have an uncanny knack for crafting content that captivates and converts audiences.',
    attributeEndorsed: ['communication', 'initiative and proactivity'],
    requestStatus: 'approved',
  },
  {
    department: 'Information Technology',
    title: 'Tech Pioneer',
    summaryOfEndorsement:
      'A pioneer in tech solutions, their forward-thinking approach keeps our technology stack cutting-edge and reliable.',
    attributeEndorsed: ['technical expertise', 'reliability and dependability'],
    requestStatus: 'approved',
  },
  {
    department: 'Repair Technicians',
    title: 'Technical Wizard',
    summaryOfEndorsement:
      'Their wizardry in troubleshooting and repairs ensures that technical issues are resolved with precision and speed.',
    attributeEndorsed: ['problem solving', 'reliability and dependability'],
    requestStatus: 'approved',
  },
  {
    department: 'Field Service Technicians',
    title: 'Client Happiness Specialist',
    summaryOfEndorsement:
      'They specialize in creating happy clients by delivering exceptional service and resolving issues with grace.',
    attributeEndorsed: ['customer service', 'adaptibility and flexibility'],
    requestStatus: 'approved',
  },
  {
    department: 'Logistics and Inventory',
    title: 'Logistics Architect',
    summaryOfEndorsement:
      'Their architectural approach to logistics has transformed our supply chain, resulting in efficiency and cost savings.',
    attributeEndorsed: [
      'initiative and proactivity',
      'reliability and dependability',
    ],
    requestStatus: 'approved',
  },
  {
    department: 'Customer Service',
    title: 'Customer Delight Specialist',
    summaryOfEndorsement:
      'They specialize in delighting customers, ensuring that each interaction is memorable and exceeds expectations.',
    attributeEndorsed: ['customer service', 'communication'],
    requestStatus: 'approved',
  },
  {
    department: 'Maintenance',
    title: 'Facility Guardian',
    summaryOfEndorsement:
      'As guardians of our facilities, they ensure that our premises are safe, well-maintained, and inviting.',
    attributeEndorsed: ['reliability and dependability'],
    requestStatus: 'approved',
  },
  {
    department: 'Store Administration',
    title: 'Inventory Management Expert',
    summaryOfEndorsement:
      'Their expertise in inventory management has streamlined our stocking processes and reduced costs significantly.',
    attributeEndorsed: ['problem solving', 'technical expertise'],
    requestStatus: 'approved',
  },
  {
    department: 'Office Administration',
    title: 'Efficiency Maven',
    summaryOfEndorsement:
      "As efficiency mavens, they've optimized our office operations, making them smoother and more productive.",
    attributeEndorsed: ['initiative and proactivity', 'communication'],
    requestStatus: 'approved',
  },
  {
    department: 'Accounting',
    title: 'Financial Sentinel',
    summaryOfEndorsement:
      'They are like financial sentinels, ensuring the utmost precision and integrity in our financial transactions.',
    attributeEndorsed: ['reliability and dependability', 'technical expertise'],
    requestStatus: 'approved',
  },
  {
    department: 'Human Resources',
    title: 'Talent Cultivator',
    summaryOfEndorsement:
      'They cultivate talent within our organization, fostering growth and collaboration among our team members.',
    attributeEndorsed: [
      'leadership and mentorship',
      'teamwork and collaboration',
    ],
    requestStatus: 'approved',
  },
  {
    department: 'Marketing',
    title: 'Social Media Maven',
    summaryOfEndorsement:
      "As social media mavens, they've elevated our brand's online presence and engagement through strategic social media campaigns.",
    attributeEndorsed: ['communication', 'initiative and proactivity'],
    requestStatus: 'approved',
  },
  {
    department: 'Information Technology',
    title: 'IT Problem Solver',
    summaryOfEndorsement:
      'Their problem-solving skills in IT have been indispensable in ensuring the stability of our technology systems.',
    attributeEndorsed: ['problem solving', 'reliability and dependability'],
    requestStatus: 'approved',
  },
  {
    department: 'Maintenance',
    title: 'Safety Advocate',
    summaryOfEndorsement:
      'They advocate for both safety and efficiency, creating a workplace that prioritizes well-being and productivity.',
    attributeEndorsed: [
      'reliability and dependability',
      'teamwork and collaboration',
    ],
    requestStatus: 'approved',
  },
];

type GroupedEndorsementsByDepartment = Record<
  string | number | symbol,
  {
    department: string;
    title: string;
    summaryOfEndorsement: string;
    attributeEndorsed: string[];
    requestStatus: string;
  }[]
>;

function returnEndorsementsRequestBodies({
  groupedEndorsementsByDepartment,
  usersDoc,
}: {
  usersDoc: DirectoryUserDocument[];
  groupedEndorsementsByDepartment: GroupedEndorsementsByDepartment;
}) {
  return usersDoc.reduce((bodiesAcc, userDoc) => {
    const { _id, username, department } = userDoc;

    // ignore executive management
    if (department === 'Executive Management') {
      return bodiesAcc;
    }

    // find endorsements for this user's department
    const endorsementsForThisDepartment =
      groupedEndorsementsByDepartment[department];

    // randomly select number of endorsements
    const numberOfEndorsements = Math.floor(Math.random() * 5);

    // shuffle endorsements
    const shuffledEndorsements = shuffleArray(endorsementsForThisDepartment);

    // select endorsements
    const selectedEndorsements = shuffledEndorsements.slice(
      0,
      numberOfEndorsements
    );

    // create request bodies
    const bodiesArr = selectedEndorsements.map((endorsement) => {
      // filter out users that belong to same department to use for endorsement
      const usersInSameDepartment = usersDoc.filter(
        (user) => user.department === department
      );

      // cannot endorse oneself
      const usersInSameDepartmentExceptSelf = usersInSameDepartment.filter(
        (user) => user._id !== _id
      );

      // randomly select user to endorse
      const randomUserToEndorse =
        usersInSameDepartmentExceptSelf[
          Math.floor(Math.random() * usersInSameDepartmentExceptSelf.length)
        ];

      // endorser's name
      const endorserName = `${randomUserToEndorse.firstName} ${randomUserToEndorse.middleName} ${randomUserToEndorse.lastName}`;

      // do not want department to be included
      const body = {
        userId: _id,
        username,
        title: endorsement.title,
        userToBeEndorsed: endorserName,
        summaryOfEndorsement: endorsement.summaryOfEndorsement,
        attributeEndorsed: endorsement.attributeEndorsed,
        requestStatus: endorsement.requestStatus,
      };

      return body;
    });

    bodiesAcc.push(...bodiesArr);

    return bodiesAcc;
  }, [] as any[]);
}

export { endorsementsArray, returnEndorsementsRequestBodies };
