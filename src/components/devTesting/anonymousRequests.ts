import { DirectoryUserDocument } from '../directory/types';

const anonymousRequestsArray = [
  {
    title: 'Urgent Safety Concern',
    secureContactNumber: '+(1)(123) 456-7890',
    secureContactEmail: 'safety@company.com',
    requestKind: 'Workplace safety',
    requestDescription:
      "I've noticed a hazardous spill in the storage room. It requires immediate attention.",
    additionalInformation:
      'The spill is near the chemical storage area. We need safety measures in place.',
    urgency: 'high',
    requestStatus: 'pending',
  },
  {
    title: 'Harassment Report',
    secureContactNumber: '+(1)(987) 654-3210',
    secureContactEmail: 'harassment@company.com',
    requestKind: 'Workplace harassment',
    requestDescription:
      "I've been subjected to inappropriate comments by a colleague, Jane Doe.",
    additionalInformation:
      'This has been happening for weeks and is affecting my work. I need assistance.',
    urgency: 'medium',
    requestStatus: 'pending',
  },
  {
    title: 'Compensation Inquiry',
    secureContactNumber: '+(1)(555) 123-4567',
    secureContactEmail: 'hr@company.com',
    requestKind: 'Benefits and compensation',
    requestDescription:
      "I'd like to discuss my current compensation package and explore potential adjustments.",
    additionalInformation:
      "I've been with the company for five years and have taken on additional responsibilities.",
    urgency: 'low',
    requestStatus: 'pending',
  },
  {
    title: 'Ethical Concern',
    secureContactNumber: '+(1)(333) 999-8888',
    secureContactEmail: 'ethics@company.com',
    requestKind: 'Ethical concerns',
    requestDescription:
      'I suspect unethical behavior in a project. I have evidence to support my claim.',
    additionalInformation:
      "This could harm the company's reputation. I need this addressed promptly.",
    urgency: 'high',
    requestStatus: 'pending',
  },
  {
    title: 'Diversity and Inclusion Proposal',
    secureContactNumber: '+(1)(777) 666-5555',
    secureContactEmail: 'diversity@company.com',
    requestKind: 'Diversity and inclusion',
    requestDescription:
      "I'd like to propose a diversity and inclusion training program for our employees.",
    additionalInformation:
      'This program will enhance our workplace culture and inclusivity.',
    urgency: 'medium',
    requestStatus: 'pending',
  },
  {
    title: 'Managerial Issues',
    secureContactNumber: '+(1)(222) 333-4444',
    secureContactEmail: 'manager@company.com',
    requestKind: 'Managerial issues',
    requestDescription:
      "I've had difficulties communicating with my current manager, John Smith.",
    additionalInformation:
      'This has led to misunderstandings in our team. I need assistance resolving this.',
    urgency: 'medium',
    requestStatus: 'pending',
  },
  {
    title: 'Environmental Concern',
    secureContactNumber: '+(1)(888) 777-9999',
    secureContactEmail: 'environment@company.com',
    requestKind: 'Environmental concerns',
    requestDescription:
      "I've noticed improper disposal of electronic waste in our office. It's harming the environment.",
    additionalInformation:
      "We should have a recycling program in place. I'd like to discuss this.",
    urgency: 'high',
    requestStatus: 'pending',
  },
  {
    title: 'Discrimination Issue',
    secureContactNumber: '+(1)(444) 555-6666',
    secureContactEmail: 'discrimination@company.com',
    requestKind: 'Discrimination',
    requestDescription:
      "I believe I've been unfairly treated due to my gender. It's affecting my morale.",
    additionalInformation:
      'I have documented incidents to support my claim. I need this resolved.',
    urgency: 'high',
    requestStatus: 'pending',
  },
  {
    title: 'Bullying Report',
    secureContactNumber: '+(1)(666) 777-8888',
    secureContactEmail: 'bullying@company.com',
    requestKind: 'Bullying and intimidation',
    requestDescription:
      "I've been a victim of bullying by a coworker, Mark Johnson.",
    additionalInformation:
      'This behavior is causing distress. I need it to stop.',
    urgency: 'medium',
    requestStatus: 'pending',
  },
  {
    title: 'Customer Service Feedback',
    secureContactNumber: '+(1)(777) 888-9999',
    secureContactEmail: 'feedback@company.com',
    requestKind: 'Customer service',
    requestDescription:
      "I'd like to provide feedback on my recent customer service experience.",
    additionalInformation:
      "The representative was polite but didn't resolve my issue. I want to share my thoughts.",
    urgency: 'low',
    requestStatus: 'pending',
  },
  {
    title: 'Conflict Resolution',
    secureContactNumber: '+(1)(555) 444-3333',
    secureContactEmail: 'conflict@company.com',
    requestKind: 'Employee conflict',
    requestDescription:
      'My team is experiencing conflicts that are affecting our productivity.',
    additionalInformation:
      'We need a mediator to help us resolve these issues.',
    urgency: 'medium',
    requestStatus: 'pending',
  },
  {
    title: 'LGBTQIA+ Support',
    secureContactNumber: '+(1)(123) 456-7890',
    secureContactEmail: 'lgbtqia@company.com',
    requestKind: 'LGBTQIA+',
    requestDescription:
      "I'd like to propose a support group for LGBTQIA+ employees to foster inclusivity.",
    additionalInformation:
      'This will create a more welcoming environment for all employees.',
    urgency: 'low',
    requestStatus: 'pending',
  },
  {
    title: 'Company Security Concern',
    secureContactNumber: '+(1)(999) 888-7777',
    secureContactEmail: 'security@company.com',
    requestKind: 'Company security',
    requestDescription:
      "I've noticed a security breach in our system. It needs immediate attention.",
    additionalInformation:
      'This breach could compromise sensitive data. We must address it urgently.',
    urgency: 'high',
    requestStatus: 'pending',
  },
  {
    title: 'Workload and Stress Issue',
    secureContactNumber: '+(1)(444) 555-6666',
    secureContactEmail: 'stress@company.com',
    requestKind: 'Workload and stress',
    requestDescription:
      'The workload in our department is overwhelming, leading to high stress levels among employees.',
    additionalInformation:
      'We need a strategy to distribute tasks more efficiently and reduce stress.',
    urgency: 'medium',
    requestStatus: 'pending',
  },
  {
    title: 'Approved Vacation Request',
    secureContactNumber: '+(1)(777) 888-9999',
    secureContactEmail: 'hr@company.com',
    requestKind: 'Benefits and compensation',
    requestDescription:
      "I'm pleased to inform you that my vacation request for next month has been approved.",
    additionalInformation:
      'I appreciate the support in maintaining a work-life balance.',
    urgency: 'low',
    requestStatus: 'approved',
  },
  {
    title: 'Request for Gender-Neutral Restrooms',
    secureContactNumber: '+(1)(123) 456-7890',
    secureContactEmail: 'genderinclusion@company.com',
    requestKind: 'Diversity and inclusion',
    requestDescription:
      'I would like to propose the establishment of gender-neutral restrooms in our workplace to create an inclusive environment for all employees, including those who identify as non-binary or transgender.',
    additionalInformation:
      'Many of our colleagues have expressed discomfort with the current restroom setup, and this change would be a significant step towards a more inclusive workplace.',
    urgency: 'medium',
    requestStatus: 'pending',
  },
  {
    title: 'Support for Neurodiverse Employees',
    secureContactNumber: '+(1)(987) 654-3210',
    secureContactEmail: 'neurodiversity@company.com',
    requestKind: 'Diversity and inclusion',
    requestDescription:
      'I propose that our company introduces a neurodiversity support program to better accommodate and assist employees on the autism spectrum and with other neurodivergent traits. This program could include training, mentorship, and workspace adjustments.',
    additionalInformation:
      "By embracing neurodiversity, we can tap into a pool of unique talents and perspectives that will benefit our organization. Let's create an inclusive workplace for everyone.",
    urgency: 'high',
    requestStatus: 'pending',
  },
  {
    title: 'Inclusive Language Training',
    secureContactNumber: '+(1)(555) 123-4567',
    secureContactEmail: 'inclusivelanguage@company.com',
    requestKind: 'Diversity and inclusion',
    requestDescription:
      'I suggest providing inclusive language training for our employees to promote respectful and equitable communication. This will help us avoid unintentional biases and foster a more welcoming environment.',
    additionalInformation:
      'Incorporating inclusive language is a vital step in making everyone feel valued and respected, regardless of their background or identity.',
    urgency: 'low',
    requestStatus: 'pending',
  },
  {
    title: 'Request for Mental Health Resources',
    secureContactNumber: '+(1)(123) 456-7890',
    secureContactEmail: 'mentalhealth@company.com',
    requestKind: 'Diversity and inclusion',
    requestDescription:
      "I'm requesting the implementation of a mental health support program within our organization. It's crucial to address the mental well-being of our employees, especially given the challenges of the modern workplace.",
    additionalInformation:
      'This program could include counseling services, stress management workshops, and resources to help employees cope with work-related stressors.',
    urgency: 'high',
    requestStatus: 'pending',
  },
  {
    title: 'Accessible Workspace Request',
    secureContactNumber: '+(1)(987) 654-3210',
    secureContactEmail: 'accessibility@company.com',
    requestKind: 'Diversity and inclusion',
    requestDescription:
      "I'm advocating for a more accessible workspace for employees with disabilities. This includes wheelchair ramps, tactile signage, and adjustable workstations.",
    additionalInformation:
      'Creating an inclusive environment means removing physical barriers that prevent individuals with disabilities from fully participating in our workplace.',
    urgency: 'medium',
    requestStatus: 'pending',
  },
  {
    title: 'Ethical Concerns Regarding Supply Chain',
    secureContactNumber: '+(1)(555) 123-4567',
    secureContactEmail: 'ethics@company.com',
    requestKind: 'Ethical concerns',
    requestDescription:
      "I've uncovered ethical issues within our supply chain that need immediate attention. Our suppliers are engaging in exploitative labor practices.",
    additionalInformation:
      "Addressing these concerns is not only the right thing to do but also essential for our company's reputation and brand integrity.",
    urgency: 'high',
    requestStatus: 'pending',
  },
  {
    title: 'Support for Remote Workers',
    secureContactNumber: '+(1)(333) 999-8888',
    secureContactEmail: 'remotework@company.com',
    requestKind: 'Diversity and inclusion',
    requestDescription:
      'As remote work becomes more common, I suggest implementing policies and resources to support our remote employees. This includes equitable access to training, communication tools, and opportunities for career growth.',
    additionalInformation:
      'Ensuring that remote workers feel valued and included will help us retain top talent in a competitive job market.',
    urgency: 'medium',
    requestStatus: 'pending',
  },
  {
    title: 'Safety Concern: Faulty Equipment',
    secureContactNumber: '+(1)(777) 666-5555',
    secureContactEmail: 'safety@company.com',
    requestKind: 'Workplace safety',
    requestDescription:
      "I've identified a safety hazard in the form of faulty machinery in our production area. It poses a risk to our employees.",
    additionalInformation:
      'Immediate action is required to ensure the well-being of our workforce and compliance with safety regulations.',
    urgency: 'high',
    requestStatus: 'pending',
  },
  {
    title: 'Request for Anti-Bias Training',
    secureContactNumber: '+(1)(222) 333-4444',
    secureContactEmail: 'inclusivetraining@company.com',
    requestKind: 'Diversity and inclusion',
    requestDescription:
      'I propose that our company invests in anti-bias training for all employees. This training will raise awareness of unconscious biases and promote fair treatment for everyone.',
    additionalInformation:
      'Creating a workplace free from bias is essential for fostering a sense of belonging among our diverse workforce.',
    urgency: 'low',
    requestStatus: 'pending',
  },
  {
    title: 'Request for Flexible Work Hours',
    secureContactNumber: '+(1)(888) 777-9999',
    secureContactEmail: 'flexibility@company.com',
    requestKind: 'Workload and stress',
    requestDescription:
      "I'm requesting the option of flexible work hours to better balance my professional and personal life. This flexibility will help reduce stress and improve my productivity.",
    additionalInformation:
      'Many employees face challenges like childcare and long commutes. Offering flexibility can make us a more attractive employer.',
    urgency: 'medium',
    requestStatus: 'pending',
  },
  {
    title: 'Concerns About Environmental Impact',
    secureContactNumber: '+(1)(444) 555-6666',
    secureContactEmail: 'environment@company.com',
    requestKind: 'Environmental concerns',
    requestDescription:
      "I've observed practices within our company that are harming the environment, such as excessive waste generation and energy consumption. It's crucial that we take immediate steps to reduce our environmental impact.",
    additionalInformation:
      'Addressing these concerns is not just responsible but can also lead to cost savings and improved corporate sustainability.',
    urgency: 'high',
    requestStatus: 'pending',
  },
  {
    title: 'Request for Workplace Safety Training',
    secureContactNumber: '+(1)(777) 888-9999',
    secureContactEmail: 'safetytraining@company.com',
    requestKind: 'Workplace safety',
    requestDescription:
      "I'm requesting comprehensive workplace safety training for all employees to ensure that everyone is aware of safety protocols and measures.",
    additionalInformation:
      'Prioritizing safety through training is essential for preventing accidents and injuries in the workplace.',
    urgency: 'medium',
    requestStatus: 'pending',
  },
  {
    title: 'Request for Conflict Resolution Mediation',
    secureContactNumber: '+(1)(555) 444-3333',
    secureContactEmail: 'conflict@company.com',
    requestKind: 'Employee conflict',
    requestDescription:
      "There's a growing conflict within our team that's affecting our collaboration and productivity. I request professional mediation to address and resolve these issues amicably.",
    additionalInformation:
      'Resolving conflicts promptly will improve our team dynamics and overall work environment.',
    urgency: 'medium',
    requestStatus: 'pending',
  },
  {
    title: 'Request for Flexible Work Hours',
    secureContactNumber: '+(1)(123) 456-7890',
    secureContactEmail: 'flexiblework@company.com',
    requestKind: 'Workload and stress',
    requestDescription:
      "I'm requesting the option of flexible work hours to better balance my professional and personal life. This flexibility will help reduce stress and improve my productivity.",
    additionalInformation:
      'Many employees face challenges like childcare and long commutes. Offering flexibility can make us a more attractive employer.',
    urgency: 'medium',
    requestStatus: 'pending',
  },
  {
    title: 'Mental Health Support Request',
    secureContactNumber: '+(1)(987) 654-3210',
    secureContactEmail: 'mentalhealth@company.com',
    requestKind: 'Diversity and inclusion',
    requestDescription:
      "I'm requesting the implementation of a mental health support program within our organization. It's crucial to address the mental well-being of our employees, especially given the challenges of the modern workplace.",
    additionalInformation:
      'This program could include counseling services, stress management workshops, and resources to help employees cope with work-related stressors.',
    urgency: 'high',
    requestStatus: 'pending',
  },
  {
    title: 'Request for Environmental Sustainability Initiatives',
    secureContactNumber: '+(1)(555) 123-4567',
    secureContactEmail: 'sustainability@company.com',
    requestKind: 'Environmental concerns',
    requestDescription:
      "I'm advocating for the implementation of environmental sustainability initiatives within our company. This includes reducing waste, conserving energy, and promoting eco-friendly practices.",
    additionalInformation:
      'Addressing these concerns not only benefits the planet but also aligns with the values of our socially responsible customers.',
    urgency: 'medium',
    requestStatus: 'pending',
  },
  {
    title: 'Support for LGBTQIA+ Employees',
    secureContactNumber: '+(1)(333) 999-8888',
    secureContactEmail: 'lgbtqia@company.com',
    requestKind: 'LGBTQIA+',
    requestDescription:
      "I'd like to propose initiatives that support our LGBTQIA+ employees, including awareness campaigns, allyship training, and inclusive policies.",
    additionalInformation:
      'Creating a welcoming and inclusive environment for all sexual orientations and gender identities is essential for our workplace.',
    urgency: 'high',
    requestStatus: 'pending',
  },
  {
    title: 'Ethical Sourcing Concerns',
    secureContactNumber: '+(1)(777) 666-5555',
    secureContactEmail: 'ethicalsourcing@company.com',
    requestKind: 'Ethical concerns',
    requestDescription:
      "I've identified ethical sourcing concerns in our supply chain. It's essential that we ensure our products are sourced responsibly and ethically.",
    additionalInformation:
      "Addressing these concerns is not only the right thing to do but also crucial for maintaining our brand's integrity and reputation.",
    urgency: 'high',
    requestStatus: 'pending',
  },
  {
    title: 'Request for Workplace Safety Training',
    secureContactNumber: '+(1)(222) 333-4444',
    secureContactEmail: 'safetytraining@company.com',
    requestKind: 'Workplace safety',
    requestDescription:
      "I'm requesting comprehensive workplace safety training for all employees to ensure that everyone is aware of safety protocols and measures.",
    additionalInformation:
      'Prioritizing safety through training is essential for preventing accidents and injuries in the workplace.',
    urgency: 'medium',
    requestStatus: 'pending',
  },
  {
    title: 'Employee Conflict Mediation',
    secureContactNumber: '+(1)(888) 777-9999',
    secureContactEmail: 'conflict@company.com',
    requestKind: 'Employee conflict',
    requestDescription:
      "There's an ongoing conflict between two teams that's affecting our productivity and teamwork. I request professional mediation to resolve these issues and foster better collaboration.",
    additionalInformation:
      'Resolving these conflicts is essential for a harmonious work environment and achieving our project goals.',
    urgency: 'medium',
    requestStatus: 'pending',
  },
  {
    title: 'Request for Anti-Bullying Campaign',
    secureContactNumber: '+(1)(444) 555-6666',
    secureContactEmail: 'antibullying@company.com',
    requestKind: 'Bullying and intimidation',
    requestDescription:
      "I'd like to propose an anti-bullying campaign within our organization. It's essential to create a safe and respectful workplace for all employees.",
    additionalInformation:
      'Addressing bullying behavior not only boosts morale but also prevents psychological harm to employees.',
    urgency: 'medium',
    requestStatus: 'pending',
  },
  {
    title: 'Request for Equal Pay Assessment',
    secureContactNumber: '+(1)(777) 888-9999',
    secureContactEmail: 'equalpay@company.com',
    requestKind: 'Benefits and compensation',
    requestDescription:
      "I'm requesting a thorough assessment of our company's pay structure to ensure equal pay for equal work. Gender and race disparities must be eliminated.",
    additionalInformation:
      "Achieving pay equity is not just fair but also important for our company's reputation and legal compliance.",
    urgency: 'high',
    requestStatus: 'pending',
  },
  {
    title: 'Request for Anti-Discrimination Training',
    secureContactNumber: '+(1)(555) 444-3333',
    secureContactEmail: 'nodiscrimination@company.com',
    requestKind: 'Discrimination',
    requestDescription:
      'I propose that our company invests in anti-discrimination training for all employees. This training will raise awareness and promote a fair and respectful work environment.',
    additionalInformation:
      'Eliminating discrimination is essential for attracting and retaining a diverse and talented workforce.',
    urgency: 'low',
    requestStatus: 'pending',
  },
  {
    title: 'Request for Parental Leave Policy',
    secureContactNumber: '+(1)(123) 456-7890',
    secureContactEmail: 'parentalleave@company.com',
    requestKind: 'Benefits and compensation',
    requestDescription:
      'I request the implementation of a parental leave policy that supports new parents in our organization. This policy should provide equitable and paid leave for both mothers and fathers.',
    additionalInformation:
      'Supporting new parents is not only essential for work-life balance but also for gender equality in our workplace.',
    urgency: 'medium',
    requestStatus: 'pending',
  },
  {
    title: 'Request for Anti-Bias Training',
    secureContactNumber: '+(1)(987) 654-3210',
    secureContactEmail: 'antibias@company.com',
    requestKind: 'Diversity and inclusion',
    requestDescription:
      'I propose that our company invests in anti-bias training for all employees. This training will raise awareness of unconscious biases and promote fair treatment for everyone.',
    additionalInformation:
      'Creating a workplace free from bias is essential for fostering a sense of belonging among our diverse workforce.',
    urgency: 'high',
    requestStatus: 'pending',
  },
  {
    title: 'Security Enhancement Request',
    secureContactNumber: '+(1)(555) 123-4567',
    secureContactEmail: 'security@company.com',
    requestKind: 'Company security',
    requestDescription:
      "I'm requesting enhancements to our company's security measures, including access control and cybersecurity. It's crucial to protect our sensitive data and assets.",
    additionalInformation:
      "Investing in security measures is essential for maintaining our clients' trust and compliance with regulations.",
    urgency: 'high',
    requestStatus: 'pending',
  },
  {
    title: 'Support for Neurodiverse Employees',
    secureContactNumber: '+(1)(333) 999-8888',
    secureContactEmail: 'neurodiversity@company.com',
    requestKind: 'Diversity and inclusion',
    requestDescription:
      'I propose that our company introduces a neurodiversity support program to better accommodate and assist employees on the autism spectrum and with other neurodivergent traits. This program could include training, mentorship, and workspace adjustments.',
    additionalInformation:
      "By embracing neurodiversity, we can tap into a pool of unique talents and perspectives that will benefit our organization. Let's create an inclusive workplace for everyone.",
    urgency: 'high',
    requestStatus: 'pending',
  },
  {
    title: 'Ethical Supply Chain Request',
    secureContactNumber: '+(1)(777) 666-5555',
    secureContactEmail: 'ethics@company.com',
    requestKind: 'Ethical concerns',
    requestDescription:
      "I've identified ethical issues within our supply chain that need immediate attention. Our suppliers are engaging in exploitative labor practices.",
    additionalInformation:
      "Addressing these concerns is not only the right thing to do but also essential for our company's reputation and brand integrity.",
    urgency: 'high',
    requestStatus: 'pending',
  },
  {
    title: 'Request for Employee Wellness Program',
    secureContactNumber: '+(1)(222) 333-4444',
    secureContactEmail: 'wellness@company.com',
    requestKind: 'Diversity and inclusion',
    requestDescription:
      'I propose the implementation of an employee wellness program that promotes physical and mental health. This program could include gym access, mindfulness workshops, and stress management resources.',
    additionalInformation:
      'Prioritizing employee well-being leads to higher morale, productivity, and retention rates.',
    urgency: 'medium',
    requestStatus: 'pending',
  },
  {
    title: 'Workload Distribution Concerns',
    secureContactNumber: '+(1)(888) 777-9999',
    secureContactEmail: 'workload@company.com',
    requestKind: 'Workload and stress',
    requestDescription:
      'The workload in our department is overwhelming, leading to high stress levels among employees.',
    additionalInformation:
      'We need a strategy to distribute tasks more efficiently and reduce stress.',
    urgency: 'medium',
    requestStatus: 'pending',
  },
  {
    title: 'Request for Workplace Safety Assessment',
    secureContactNumber: '+(1)(444) 555-6666',
    secureContactEmail: 'safetyassessment@company.com',
    requestKind: 'Workplace safety',
    requestDescription:
      "I'm requesting a comprehensive workplace safety assessment to identify potential hazards and improve safety protocols.",
    additionalInformation:
      'Ensuring a safe workplace is essential for the well-being of our employees and legal compliance.',
    urgency: 'high',
    requestStatus: 'pending',
  },
  {
    title: 'Request for Remote Work Policy',
    secureContactNumber: '+(1)(777) 888-9999',
    secureContactEmail: 'remotework@company.com',
    requestKind: 'Workload and stress',
    requestDescription:
      "I'm requesting the establishment of a remote work policy to provide flexibility for employees. Remote work can reduce stress and improve work-life balance.",
    additionalInformation:
      'Incorporating remote work options can make us a more attractive employer and improve overall job satisfaction.',
    urgency: 'medium',
    requestStatus: 'pending',
  },
  {
    title: 'Concerns About Workplace Harassment',
    secureContactNumber: '+(1)(555) 444-3333',
    secureContactEmail: 'harassment@company.com',
    requestKind: 'Workplace harassment',
    requestDescription:
      "I've observed instances of workplace harassment within our company. It's crucial that we address this issue promptly to maintain a safe and respectful work environment.",
    additionalInformation:
      "Taking action against harassment not only protects employees but also preserves our company's reputation.",
    urgency: 'medium',
    requestStatus: 'pending',
  },
  {
    title: 'Request for Remote Work Policy',
    secureContactNumber: '+(1)(123) 456-7890',
    secureContactEmail: 'remote@company.com',
    requestKind: 'Workload and stress',
    requestDescription:
      "I'm requesting the implementation of a remote work policy to provide flexibility for employees. Remote work can significantly reduce stress levels and improve work-life balance.",
    additionalInformation:
      'Incorporating remote work options can make our company a more attractive employer and improve overall job satisfaction.',
    urgency: 'medium',
    requestStatus: 'pending',
  },
  {
    title: 'Diversity and Inclusion Training Request',
    secureContactNumber: '+(1)(987) 654-3210',
    secureContactEmail: 'diversity@company.com',
    requestKind: 'Diversity and inclusion',
    requestDescription:
      'I propose that our company invests in diversity and inclusion training for all employees. This training will foster a more inclusive and equitable workplace.',
    additionalInformation:
      'Promoting diversity and inclusion is not only the right thing to do but also critical for attracting and retaining top talent.',
    urgency: 'high',
    requestStatus: 'pending',
  },
  {
    title: 'Security Enhancement Request',
    secureContactNumber: '+(1)(555) 123-4567',
    secureContactEmail: 'security@company.com',
    requestKind: 'Company security',
    requestDescription:
      "I'm requesting enhancements to our company's security measures, including access control, cybersecurity, and surveillance systems. It's crucial to protect our sensitive data and assets.",
    additionalInformation:
      "Investing in security measures is essential for maintaining our clients' trust and compliance with stringent regulations.",
    urgency: 'high',
    requestStatus: 'pending',
  },
  {
    title: 'Support for Neurodiverse Employees',
    secureContactNumber: '+(1)(333) 999-8888',
    secureContactEmail: 'neurodiversity@company.com',
    requestKind: 'Diversity and inclusion',
    requestDescription:
      'I propose that our company introduces a neurodiversity support program to better accommodate and assist employees on the autism spectrum and with other neurodivergent traits. This program could include training, mentorship, and workspace adjustments.',
    additionalInformation:
      "By embracing neurodiversity, we can tap into a pool of unique talents and perspectives that will benefit our organization. Let's create an inclusive workplace for everyone.",
    urgency: 'high',
    requestStatus: 'pending',
  },
  {
    title: 'Ethical Sourcing Concerns',
    secureContactNumber: '+(1)(777) 666-5555',
    secureContactEmail: 'ethics@company.com',
    requestKind: 'Ethical concerns',
    requestDescription:
      "I've identified ethical issues within our supply chain that need immediate attention. Our suppliers are engaging in exploitative labor practices, and we need to ensure our products are sourced responsibly and ethically.",
    additionalInformation:
      "Addressing these concerns is not only the right thing to do but also essential for our company's reputation and brand integrity.",
    urgency: 'high',
    requestStatus: 'pending',
  },
  {
    title: 'Employee Wellness Program Request',
    secureContactNumber: '+(1)(222) 333-4444',
    secureContactEmail: 'wellness@company.com',
    requestKind: 'Diversity and inclusion',
    requestDescription:
      'I propose the implementation of an employee wellness program that promotes physical and mental health. This program could include gym access, mindfulness workshops, and stress management resources.',
    additionalInformation:
      'Prioritizing employee well-being leads to higher morale, productivity, and retention rates.',
    urgency: 'medium',
    requestStatus: 'pending',
  },
  {
    title: 'Workload Distribution Concerns',
    secureContactNumber: '+(1)(888) 777-9999',
    secureContactEmail: 'workload@company.com',
    requestKind: 'Workload and stress',
    requestDescription:
      'The workload in our department is overwhelming, leading to high stress levels among employees. We need a strategy to distribute tasks more efficiently and reduce stress.',
    additionalInformation:
      "We believe that finding a solution to workload distribution will significantly improve our team's productivity and overall job satisfaction.",
    urgency: 'medium',
    requestStatus: 'pending',
  },
  {
    title: 'Request for Workplace Safety Assessment',
    secureContactNumber: '+(1)(444) 555-6666',
    secureContactEmail: 'safety@company.com',
    requestKind: 'Workplace safety',
    requestDescription:
      "I'm requesting a comprehensive workplace safety assessment to identify potential hazards and improve safety protocols.",
    additionalInformation:
      'Ensuring a safe workplace is essential for the well-being of our employees and legal compliance. We want to prevent accidents and injuries.',
    urgency: 'high',
    requestStatus: 'pending',
  },
  {
    title: 'Anti-Bullying Policy Request',
    secureContactNumber: '+(1)(777) 888-9999',
    secureContactEmail: 'antibullying@company.com',
    requestKind: 'Bullying and intimidation',
    requestDescription:
      "I'd like to propose the implementation of an anti-bullying policy within our organization. It's essential to create a safe and respectful workplace for all employees.",
    additionalInformation:
      'Addressing bullying behavior not only boosts morale but also prevents psychological harm to employees and enhances our company culture.',
    urgency: 'medium',
    requestStatus: 'pending',
  },
  {
    title: 'Request for Equal Pay Assessment',
    secureContactNumber: '+(1)(555) 444-3333',
    secureContactEmail: 'equalpay@company.com',
    requestKind: 'Benefits and compensation',
    requestDescription:
      "I'm requesting a thorough assessment of our company's pay structure to ensure equal pay for equal work. Gender and race disparities must be eliminated.",
    additionalInformation:
      "Achieving pay equity is not just fair but also important for our company's reputation and legal compliance.",
    urgency: 'high',
    requestStatus: 'pending',
  },
];

export { anonymousRequestsArray };
