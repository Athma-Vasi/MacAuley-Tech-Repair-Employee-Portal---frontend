import { shuffleArray } from '../../../utils';
import { DirectoryUserDocument } from '../../directory/types';

type AnnouncementsArray = {
  title: string;
  article: string[];
  bannerImageSrc: string;
  bannerImageAlt: string;
  ratingResponse: {
    ratingEmotion: {
      estatic: number;
      happy: number;
      neutral: number;
      annoyed: number;
      devastated: number;
    };
    ratingCount: number;
  };
}[];

const announcementsArray: AnnouncementsArray = [
  {
    title: 'Company Mission Statement',
    article: [
      'At MacAuley Tech Repair, our mission is to redefine the future of technology repair services. We are not just fixing devices; we are connecting people and empowering them to lead more productive lives. Our commitment to excellence goes beyond repair. We are stewards of sustainability, striving to reduce electronic waste and minimize our carbon footprint.',
      'As an employee of MacAuley Tech Repair, you are not just a part of a company; you are a part of a global community. We celebrate diversity, innovation, and creativity. Your unique perspective and ideas are what propel us forward. We foster a liberal and inclusive work culture where every voice is heard and valued.',
      'In our employee portal, you will find a wealth of resources, comprehensive training materials, and abundant opportunities for personal and professional growth. We invest in our employees because we recognize that your success is our success. Together, we will push the boundaries of technology repair and continue to provide exceptional service to our customers.',
      'Join us on this remarkable journey to keep the world connected, one device at a time. We are thrilled to have you as a member of the MacAuley Tech Repair family!',
      'Best regards,',
      'Your MacAuley Tech Repair Team',
    ],
    bannerImageSrc:
      'https://images.pexels.com/photos/5256816/pexels-photo-5256816.jpeg?auto=compress',
    bannerImageAlt: "Man and Woman Holding Each Other's Hands As A Team",
    ratingResponse: {
      ratingEmotion: {
        estatic: 25,
        happy: 45,
        neutral: 20,
        annoyed: 5,
        devastated: 5,
      },
      ratingCount: 150,
    },
  },

  {
    title: 'Office Hours',
    article: [
      'Hello MacAuley Tech Repair Team,',
      'We want to inform you about our updated office hours to ensure that everyone is aware of our availability and can plan their work effectively.',
      "Effective immediately, our office hours will be from 9:00 AM to 5:00 PM, Monday through Friday. These hours are designed to accommodate the majority of our team's working schedules and allow for efficient collaboration.",
      'During these hours, you can expect the following:',
      '1. Responsive Communication: Our teams will be available for immediate response to emails, messages, and calls during office hours.',
      '2. Scheduled Meetings: Meetings and collaborative sessions will be scheduled within these hours to maximize participation.',
      '3. Availability for Assistance: If you need assistance, guidance, or support, you can rely on team members being available to assist you promptly.',
      '4. Access to Resources: Access to company resources and systems will be optimized during these hours to ensure smooth operations.',
      'We understand that flexibility is important, and there may be occasions when you need to work outside of these hours. In such cases, please communicate with your supervisor and team to make necessary arrangements.',
      'We believe that aligning our office hours benefits the entire organization by streamlining communication and ensuring that we can collaborate effectively. Your commitment to these hours will contribute to a more productive and cohesive work environment.',
      "Thank you for your cooperation, and if you have any questions or concerns about the updated office hours, please don't hesitate to reach out to your supervisor or HR representative.",
      'Best regards,',
      'Your MacAuley Tech Repair Leadership Team',
    ],
    bannerImageSrc:
      'https://images.pexels.com/photos/8145335/pexels-photo-8145335.jpeg?auto=compress',
    bannerImageAlt: 'Professional Women Sitting at a Table Giving High Five',
    ratingResponse: {
      ratingEmotion: {
        estatic: 35,
        happy: 55,
        neutral: 8,
        annoyed: 2,
        devastated: 0,
      },
      ratingCount: 150,
    },
  },

  {
    title: 'Dogs in the Office',
    article: [
      "Introducing 'Dogs in the Office' at MacAuley Tech Repair! We believe in creating a welcoming and inclusive workplace, and that includes our furry friends. Starting today, we're excited to announce our new policy allowing dogs in the office, with some important guidelines in place.",
      "At MacAuley Tech Repair, we understand the positive impact that pets, especially dogs, can have on the workplace. They can reduce stress, boost morale, and create a more relaxed atmosphere. However, to ensure a harmonious work environment, we've established a few rules to follow:",
      '1. All dogs must be well-behaved and friendly to both humans and other dogs.',
      "2. Owners are responsible for their dogs' behavior and cleanliness. Please clean up after your pet.",
      '3. Consider your coworkers. Not everyone may be comfortable around dogs, so please be mindful of their comfort levels.',
      '4. If your dog tends to bark excessively or disrupt the work environment, it may be best to leave them at home for the day.',
      '5. We recommend bringing only fully vaccinated dogs to the office to ensure the health and safety of all pets and employees.',
      "We're excited to see the positive impact our furry companions can have on our workdays. If you're a dog owner and want to participate in 'Dogs in the Office,' please review and adhere to these guidelines. Let's create a friendly and pet-loving workplace!",
      'If you have any questions or concerns about this policy, please reach out to our HR department.',
      'Thank you for your cooperation, and we look forward to meeting our new furry coworkers!',
      'Best regards,',
      'MacAuley Tech Repair Team',
    ],
    bannerImageSrc:
      'https://images.pexels.com/photos/5904046/pexels-photo-5904046.jpeg?auto=compress',
    bannerImageAlt:
      'Woman and a Man Presenting Image on a Laptop Screen to a Dog',
    ratingResponse: {
      ratingEmotion: {
        estatic: 40,
        happy: 50,
        neutral: 8,
        annoyed: 2,
        devastated: 0,
      },
      ratingCount: 120,
    },
  },

  {
    title: 'Inclement Weather',
    article: [
      'Dear MacAuley Tech Repair Team,',
      'In light of the unpredictable weather conditions that can sometimes affect our daily routines, we wanted to share our inclement weather policy to ensure the safety and well-being of all employees.',
      'At MacAuley Tech Repair, the safety of our employees is our top priority. We understand that adverse weather conditions, such as heavy snowfall, storms, or extreme heat, can make commuting to work challenging. Therefore, we have put in place the following guidelines:',
      "1. Employee Safety First: Your safety comes first. If you believe that it's unsafe to travel to the office due to weather conditions, please communicate with your supervisor as soon as possible.",
      '2. Remote Work Options: Whenever feasible, we encourage employees to work remotely during severe weather conditions. Our IT team will provide the necessary support to ensure a smooth transition to remote work.',
      '3. Flexible Hours: If commuting to the office is possible but delayed due to weather-related issues, employees are encouraged to adjust their work hours to ensure their safety.',
      "4. Communication is Key: Stay connected with your team and supervisors. If you're working remotely, maintain open lines of communication to ensure that work continues seamlessly.",
      'Your well-being is important to us, and we want to ensure that you feel safe and supported during inclement weather. Our policy is designed to provide flexibility while maintaining productivity.',
      'If you have any questions or concerns about our inclement weather policy, please reach out to your HR representative. Together, we can navigate through challenging weather conditions and continue to excel in our work.',
      'Stay safe and warm!',
      'Best regards,',
      'Your MacAuley Tech Repair Team',
    ],
    bannerImageSrc:
      'https://images.pexels.com/photos/18347457/pexels-photo-18347457/free-photo-of-fog-over-a-grassy-area-at-the-edge-of-a-tropical-forest.jpeg?auto=compress',
    bannerImageAlt: 'Fog over a Grassy Area at the Edge of a Tropical Forest',
    ratingResponse: {
      ratingEmotion: {
        estatic: 15,
        happy: 60,
        neutral: 20,
        annoyed: 4,
        devastated: 1,
      },
      ratingCount: 150,
    },
  },

  {
    title: 'Press and Communications',
    article: [
      'Greetings MacAuley Tech Repair Team,',
      "In today's fast-paced digital world, effective press and communications play a crucial role in our organization's success. This article aims to shed light on the importance of our press and communications strategies and how they contribute to our growth and brand reputation.",
      'At MacAuley Tech Repair, we understand that clear and impactful communication is key to engaging with our audience, both internally and externally. Our press and communications team works tirelessly to ensure that our messages are not only informative but also resonate with our values and mission.',
      'Here are some key highlights of our press and communications efforts:',
      "1. Transparency: We believe in open and honest communication. Whether it's sharing updates on company achievements or addressing challenges, we strive for transparency in our messages.",
      "2. Employee Engagement: Our internal communications aim to keep our team informed and engaged. From company announcements to fun and informative newsletters, we're committed to keeping you in the loop.",
      '3. Brand Identity: Our press materials are carefully crafted to reflect our brand identity. We want our audience to recognize us for our commitment to excellence, innovation, and sustainability.',
      "4. Community Outreach: We actively engage with the community through press releases and social media. We're not just a company; we're a part of the communities we serve.",
      '5. Feedback Matters: We value your feedback and suggestions. If you have ideas or insights related to our press and communications efforts, please feel free to share them with our team.',
      'Our press and communications team is dedicated to enhancing our brand presence, strengthening relationships, and ensuring that our message reaches the right audience.',
      'If you have any questions or suggestions regarding our press and communications strategies, please reach out to our communications department. Your input is invaluable as we continue to grow and thrive in the digital age.',
      'Thank you for being part of our journey to success.',
      'Best regards,',
      'Your MacAuley Tech Repair Communications Team',
    ],
    bannerImageSrc:
      'https://images.pexels.com/photos/6953853/pexels-photo-6953853.jpeg?auto=compress',
    bannerImageAlt: 'Smiling diverse women sitting at desk with microphones',
    ratingResponse: {
      ratingEmotion: {
        estatic: 20,
        happy: 70,
        neutral: 8,
        annoyed: 1,
        devastated: 1,
      },
      ratingCount: 150,
    },
  },

  {
    title: 'Vacation Requests',
    article: [
      'Hello MacAuley Tech Repair Team,',
      'Vacation time is a valuable opportunity to relax, recharge, and spend quality time with loved ones. We understand the importance of work-life balance, and we encourage our employees to take advantage of their well-deserved vacation days.',
      "Requesting time off at MacAuley Tech Repair is a simple process designed to accommodate your needs while ensuring the continued smooth operation of our company. Here's what you need to know:",
      '1. Vacation Request Form: To request time off, please fill out the Vacation Request Form available on our employee portal. Make sure to provide the requested dates and any additional information.',
      '2. Approval Process: Once your request is submitted, it will be reviewed by your supervisor or department head. We aim to process requests promptly and fairly.',
      "3. Plan Ahead: While we strive to accommodate vacation requests, it's important to plan ahead and consider the impact on your team. Discuss your plans with your colleagues to ensure a seamless workflow during your absence.",
      '4. Balance and Flexibility: We encourage employees to use their vacation days throughout the year to maintain a healthy work-life balance. However, we also understand that emergencies and unexpected situations may arise.',
      '5. Communication: If your request is approved, please communicate your absence to your team and ensure any necessary handovers are completed. This helps maintain productivity in your absence.',
      "We believe that taking time off to rejuvenate is essential for overall well-being and productivity. Please don't hesitate to reach out to your supervisor or HR if you have any questions or need assistance with your vacation requests.",
      'Thank you for your dedication and hard work. Enjoy your well-deserved vacation!',
      'Best regards,',
      'Your MacAuley Tech Repair HR Team',
    ],
    bannerImageSrc:
      'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress',
    bannerImageAlt: 'Parked Boat near tropical beach',
    ratingResponse: {
      ratingEmotion: {
        estatic: 15,
        happy: 75,
        neutral: 8,
        annoyed: 1,
        devastated: 1,
      },
      ratingCount: 150,
    },
  },

  {
    title: 'Compensation Adjustments',
    article: [
      'Hello MacAuley Tech Repair Team,',
      'We understand that compensation is a crucial aspect of your career, and we want to keep you informed about recent developments in this area. Our commitment to providing competitive and fair compensation remains steadfast.',
      'In response to industry trends and a comprehensive review of our compensation structure, we are pleased to announce some positive adjustments:',
      '1. Salary Increases: Effective next month, all employees will receive a salary increase that reflects our commitment to recognizing your hard work and dedication.',
      "2. Performance-Based Bonuses: We are introducing performance-based bonuses that will reward exceptional contributions to our company's success.",
      '3. Benefits Enhancement: Our benefits package is being enhanced to provide you with better coverage and more comprehensive healthcare options.',
      '4. Recognition Programs: We are rolling out new recognition programs to celebrate your achievements and contributions to our organization.',
      '5. Market Analysis: Our HR team regularly conducts market analysis to ensure that our compensation remains competitive within the industry.',
      "These adjustments are a testament to our appreciation for your dedication and the integral role you play in our company's growth and success. We want to ensure that your compensation reflects your value to our organization.",
      'We encourage open and transparent communication. If you have any questions or feedback regarding these compensation adjustments, please feel free to reach out to our HR department.',
      'Thank you for your continued commitment to MacAuley Tech Repair. We look forward to a bright and prosperous future together.',
      'Best regards,',
      'Your MacAuley Tech Repair HR Team',
    ],
    bannerImageSrc:
      'https://images.pexels.com/photos/4386341/pexels-photo-4386341.jpeg?auto=compress',
    bannerImageAlt:
      'Composition of calculator with paper money and notebook with pen',
    ratingResponse: {
      ratingEmotion: {
        estatic: 25,
        happy: 65,
        neutral: 7,
        annoyed: 2,
        devastated: 1,
      },
      ratingCount: 150,
    },
  },

  {
    title: 'Meeting Requirements',
    article: [
      'Hello Team,',
      "Meetings are an integral part of our work culture at MacAuley Tech Repair. They serve as a platform for collaboration, idea sharing, and decision-making. To ensure that our meetings are productive and effective, we've outlined some key requirements and best practices:",
      '1. Agenda: Every meeting should have a clear agenda. This ensures that the purpose of the meeting is well-defined, and participants can come prepared with relevant information and ideas.',
      "2. Punctuality: Please arrive on time for meetings. Punctuality demonstrates respect for everyone's time and helps the meeting start and end on schedule.",
      '3. Active Participation: We encourage active participation from all attendees. Your insights and contributions are valued, and they play a crucial role in achieving meeting objectives.',
      '4. Respectful Environment: Maintain a respectful and inclusive environment during meetings. Listen actively to others, avoid interruptions, and be open to diverse perspectives.',
      '5. Action Items: At the end of each meeting, action items should be clearly defined, including responsible individuals and deadlines. This ensures accountability and progress tracking.',
      '6. Meeting Duration: We aim to keep meetings as concise as possible. Longer meetings can be counterproductive. If a topic requires extensive discussion, consider scheduling a separate follow-up meeting.',
      '7. Feedback: We welcome feedback on our meeting processes. If you have suggestions for improvement or concerns, please share them with your team lead or supervisor.',
      'Effective meetings are an essential part of our collaborative work environment. By following these requirements and best practices, we can make the most of our meeting time and drive our projects forward.',
      'Thank you for your commitment to productive meetings at MacAuley Tech Repair!',
      'Best regards,',
      'Your MacAuley Tech Repair Team',
    ],
    // https://images.pexels.com/photos/1684187/pexels-photo-1684187.jpeg?auto=compress
    // &cs=tinysrgb&w=1260&h=750&dpr=1
    bannerImageSrc:
      'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress',
    bannerImageAlt: 'Photo Of People Doing Handshakes',
    ratingResponse: {
      ratingEmotion: {
        estatic: 20,
        happy: 70,
        neutral: 8,
        annoyed: 1,
        devastated: 1,
      },
      ratingCount: 150,
    },
  },

  {
    title: 'Bicycles and Scooters',
    article: [
      'Hello MacAuley Tech Repair Team,',
      "We're excited to introduce a new initiative at our workplace that promotes sustainable and eco-friendly commuting - Bicycles and Scooters!",
      "At MacAuley Tech Repair, we are committed to reducing our carbon footprint and supporting green transportation alternatives. To that end, we're providing bicycles and scooters for employees to use during their commutes or for short trips during the workday.",
      'Here are some key details about this initiative:',
      '1. Convenience: Bicycles and scooters will be available at designated locations on our campus. You can use them to move around the office or for quick errands in the vicinity.',
      "2. Eco-Friendly: By choosing bicycles and scooters, you're contributing to a greener environment by reducing emissions and traffic congestion.",
      '3. Safety: Helmets and safety gear will be provided alongside the bicycles and scooters. Safety is our top priority.',
      '4. Usage Guidelines: Please familiarize yourself with the usage guidelines and safety instructions before using these transportation options. We want to ensure a safe and enjoyable experience for everyone.',
      '5. Feedback: We value your feedback and suggestions on this initiative. Your insights will help us improve and expand our sustainable commuting options.',
      "We hope that this initiative not only supports your daily commute but also encourages a healthier and more environmentally conscious lifestyle. By choosing bicycles and scooters, you're making a positive impact on both your well-being and the planet.",
      'If you have any questions or need more information about this initiative, please reach out to our Sustainability Team.',
      'Thank you for being a part of our journey towards a greener and more sustainable future!',
      'Best regards,',
      'Your MacAuley Tech Repair Sustainability Team',
    ],
    bannerImageSrc:
      'https://images.pexels.com/photos/7706671/pexels-photo-7706671.jpeg?auto=compress',
    bannerImageAlt: 'Man and Woman Riding Bicycle on Road',
    ratingResponse: {
      ratingEmotion: {
        estatic: 30,
        happy: 60,
        neutral: 8,
        annoyed: 1,
        devastated: 1,
      },
      ratingCount: 150,
    },
  },

  {
    title: 'Expenses While Traveling',
    article: [
      'Greetings MacAuley Tech Repair Team,',
      "Traveling for work can be both exciting and challenging. To make your business trips smoother and more manageable, we've put together some guidelines on managing expenses while traveling:",
      '1. Expense Tracking: Keep a record of all your expenses during the trip. This includes receipts for meals, transportation, accommodation, and any other business-related costs.',
      '2. Per Diem: Familiarize yourself with our per diem policy. This allows you to claim a daily allowance for meals and incidentals based on your travel destination and duration.',
      "3. Receipts: It's essential to collect and retain receipts for expenses exceeding the per diem limit. These receipts are required for reimbursement purposes.",
      '4. Company Card: If you have a company credit card, use it for business-related expenses whenever possible. This simplifies expense tracking and reimbursement.',
      '5. Expense Reports: Submit your expense reports promptly upon returning from your trip. Include all relevant receipts and details to ensure quick and accurate reimbursement.',
      "6. Travel Policy: Familiarize yourself with our travel policy, which outlines the company's guidelines and expectations for business travel. It's a valuable resource for understanding expense limits and procedures.",
      '7. Travel Advances: If needed, you can request a travel advance before your trip to cover anticipated expenses. Ensure you settle any advances promptly upon your return.',
      '8. Currency Conversion: When dealing with international travel, be mindful of currency conversion rates and associated fees when making transactions.',
      '9. Expense App: We have a user-friendly expense management app to simplify the process of capturing and submitting expenses. Consider using it for added convenience.',
      'We understand that managing expenses while traveling can be complex, but adhering to these guidelines and our company policy ensures a smooth and efficient process. If you have questions or need assistance with expense management, please reach out to our Finance Team.',
      'Thank you for your commitment to responsible expense management while representing MacAuley Tech Repair.',
      'Best regards,',
      'Your MacAuley Tech Repair Finance Team',
    ],
    bannerImageSrc:
      'https://images.pexels.com/photos/3954635/pexels-photo-3954635.jpeg?auto=compress',
    bannerImageAlt: 'Woman in Gray Shirt Sitting on Bed working',
    ratingResponse: {
      ratingEmotion: {
        estatic: 20,
        happy: 70,
        neutral: 7,
        annoyed: 1,
        devastated: 1,
      },
      ratingCount: 150,
    },
  },

  {
    title: 'Expected Availability for Remote Work',
    article: [
      'Hello MacAuley Tech Repair Team,',
      'We understand that the ability to work remotely is an important aspect of work-life balance and flexibility. In response to the evolving needs of our workforce, we want to clarify our expected availability guidelines for remote work:',
      '1. Core Hours: While working remotely, employees are expected to be available during our core business hours, which are from 9:00 AM to 5:00 PM. This ensures effective communication and collaboration.',
      '2. Communication: Stay connected! Respond to emails, messages, and calls promptly during your remote work hours. Effective communication is essential for team collaboration.',
      "3. Meetings: Be prepared for virtual meetings as scheduled. Ensure that your technology is functioning correctly and that you're in a distraction-free environment.",
      '4. Tasks and Deadlines: Meet your project deadlines and complete your tasks on time. Remote work should not impact the quality and timeliness of your work.',
      '5. Flexibility: We understand that unexpected situations may arise while working remotely. If you encounter a situation that affects your availability, please communicate with your supervisor and team as soon as possible.',
      '6. Workspace: Set up a dedicated workspace at home that promotes productivity and minimizes distractions. A comfortable and well-organized workspace is key to remote work success.',
      '7. Well-being: Prioritize your well-being. Take regular breaks, stay hydrated, and maintain a healthy work-life balance. Your mental and physical health are essential.',
      'We believe that remote work can enhance your work experience and enable you to achieve a better balance between professional and personal life. By adhering to these expected availability guidelines, we can maintain a high level of productivity and collaboration while working remotely.',
      "If you have any questions or need further clarification on remote work expectations, please don't hesitate to reach out to your HR representative.",
      'Thank you for your commitment to making remote work a successful and rewarding experience at MacAuley Tech Repair!',
      'Best regards,',
      'Your MacAuley Tech Repair HR Team',
    ],
    bannerImageSrc:
      'https://images.pexels.com/photos/4458564/pexels-photo-4458564.jpeg?auto=compress',
    bannerImageAlt: 'A Woman in Beige Sweater Sitting on the Bed working',
    ratingResponse: {
      ratingEmotion: {
        estatic: 25,
        happy: 65,
        neutral: 7,
        annoyed: 1,
        devastated: 2,
      },
      ratingCount: 150,
    },
  },

  {
    title: 'Diversity Training',
    article: [
      'Hello MacAuley Tech Repair Team,',
      'We believe that diversity is a source of strength and innovation. To foster an inclusive and equitable workplace, we are excited to announce the launch of our Diversity Training program.',
      'Diversity Training is designed to promote awareness, understanding, and appreciation of the diverse backgrounds, perspectives, and experiences of our employees. Here are some key highlights:',
      '1. Inclusive Culture: We aim to create an inclusive culture where every voice is valued and heard. Diversity Training helps us build a workplace where everyone feels welcome and respected.',
      '2. Unconscious Bias: We all have unconscious biases. This training helps us recognize and address these biases, promoting fair decision-making and interactions.',
      '3. Cultural Competency: Gain insights into different cultures and backgrounds. Cultural competency is essential for effective communication and collaboration in our global team.',
      '4. Empathy and Inclusion: Develop empathy and inclusion skills to create a supportive environment for all employees, regardless of their background or identity.',
      "5. Legal Compliance: Understand the legal aspects of diversity and inclusion. Compliance with diversity-related laws is not just a requirement; it's a commitment to fairness.",
      '6. Feedback and Improvement: We value your feedback on the Diversity Training program. Your insights will help us continuously improve and adapt the program to our evolving needs.',
      'We believe that embracing diversity and inclusion is not only the right thing to do but also a catalyst for innovation and growth. Our commitment to diversity is a key part of our corporate identity.',
      'The Diversity Training program is accessible to all employees, and we encourage everyone to participate actively. We are confident that by learning together, we can create a more inclusive and welcoming workplace for all.',
      'If you have any questions or would like to enroll in the program, please contact our Diversity and Inclusion Team.',
      'Thank you for your commitment to diversity and inclusion at MacAuley Tech Repair!',
      'Best regards,',
      'Your MacAuley Tech Repair Diversity and Inclusion Team',
    ],
    bannerImageSrc:
      'https://images.pexels.com/photos/8127812/pexels-photo-8127812.jpeg?auto=compress',
    bannerImageAlt: 'Group Presenting in Front of the Laptop',
    ratingResponse: {
      ratingEmotion: {
        estatic: 30,
        happy: 65,
        neutral: 4,
        annoyed: 1,
        devastated: 0,
      },
      ratingCount: 150,
    },
  },

  {
    title: 'Multicultural Events',
    article: [
      'Hello MacAuley Tech Repair Team,',
      "At MacAuley Tech Repair, we celebrate diversity and the rich tapestry of cultures represented in our workforce. We're excited to announce a series of Multicultural Events that will bring us closer together and celebrate our differences.",
      "These events are designed to promote cultural awareness, foster inclusivity, and create opportunities for meaningful interactions. Here's what you can look forward to:",
      '1. Cultural Showcases: Experience the vibrant cultures within our organization through performances, exhibitions, and presentations. Learn about traditions, art, music, and more.',
      '2. Culinary Delights: Enjoy a gastronomic journey with multicultural cuisine. Taste dishes from around the world prepared by your colleagues.',
      '3. Workshops and Discussions: Engage in workshops and discussions that explore various aspects of culture, diversity, and inclusion. These events provide opportunities for learning and dialogue.',
      '4. Cultural Exchange: Connect with colleagues from diverse backgrounds. Share stories, experiences, and traditions, and build meaningful connections.',
      '5. Celebrating Holidays: Join us in celebrating cultural holidays and festivals throughout the year. Experience the joy and significance of these special occasions.',
      '6. Community Outreach: We believe in giving back to our communities. Some events may involve charitable activities that benefit those in need.',
      "We invite you to participate actively in these Multicultural Events. Your presence and engagement are essential in making these events a success. It's a chance for us to learn from one another, appreciate our unique backgrounds, and strengthen our bonds as a team.",
      'Stay tuned for event announcements and details. We look forward to celebrating the beauty of diversity with all of you.',
      'If you have ideas for multicultural events or would like to contribute to the planning, please reach out to our Multicultural Events Committee.',
      'Thank you for being a part of our diverse and vibrant MacAuley Tech Repair family!',
      'Best regards,',
      'Your MacAuley Tech Repair Multicultural Events Committee',
    ],
    bannerImageSrc:
      'https://images.pexels.com/photos/1684187/pexels-photo-1684187.jpeg?auto=compress',
    bannerImageAlt: 'Group Of People Having Neon Party',
    ratingResponse: {
      ratingEmotion: {
        estatic: 40,
        happy: 55,
        neutral: 4,
        annoyed: 1,
        devastated: 0,
      },
      ratingCount: 150,
    },
  },
];

function returnAnnouncementsRequestBodies({
  announcementsArray,
  userDocs,
}: {
  userDocs: DirectoryUserDocument[];
  announcementsArray: AnnouncementsArray;
}) {
  return announcementsArray.map((announcement, index) => {
    const { article, bannerImageAlt, bannerImageSrc, title, ratingResponse } =
      announcement;

    // pick a random user from human resources dept
    const humanResourcesDocs = userDocs.filter(
      (userDoc) => userDoc.department === 'Human Resources'
    );

    const randomHumanResourcesDoc =
      humanResourcesDocs[Math.floor(Math.random() * humanResourcesDocs.length)];

    // random author from human resources
    const { firstName, middleName, lastName } = randomHumanResourcesDoc;
    const author = middleName
      ? `${firstName} ${middleName} ${lastName}`
      : `${firstName} ${lastName}`;

    // time to read
    const wordsPerMinute = 200;
    // join article array into a string, split on whitespace, and count the length of the array
    const numberOfWords = article.join(' ').split(/\s/g).length;
    // round up to the nearest minute
    const timeToRead = Math.ceil(numberOfWords / wordsPerMinute);

    // rated user ids
    // shuffle users docs
    const shuffledUserDocs = shuffleArray(userDocs);

    // slice the array from 0 to the rating count
    const { ratingCount } = ratingResponse;
    const randomUserDocs = shuffledUserDocs.slice(0, ratingCount);

    // map the array to return the user ids
    const ratedUserIds = randomUserDocs.map((userDoc) => userDoc._id);

    // grab the user id of random human resources doc
    const { _id, username } = randomHumanResourcesDoc;

    const requestBody = {
      userId: _id,
      username,
      title,
      author,
      article,
      bannerImageSrc,
      bannerImageAlt,
      timeToRead,
      ratingResponse,
      ratedUserIds,
    };

    return requestBody;
  });
}

export { announcementsArray, returnAnnouncementsRequestBodies };
