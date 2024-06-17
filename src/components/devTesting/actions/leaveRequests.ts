import { shuffleArray } from "../../../utils";

// type LeaveRequestsArray = {
//   startDate: string;
//   endDate: string;
//   reasonForLeave: string;
//   delegatedResponsibilities: string;
//   additionalComments: string;
//   requestStatus: string;
//   acknowledgement: boolean;
// }[];

// const leaveRequestsArray: LeaveRequestsArray = [
//   {
//     startDate: '2023-05-10',
//     endDate: '2023-05-15',
//     reasonForLeave: 'Vacation',
//     delegatedResponsibilities:
//       'During my absence, my colleague John will handle my tasks. Please refer to him for any questions.',
//     additionalComments:
//       'I plan to visit my family during this vacation and will be unreachable during this time.',
//     requestStatus: 'approved',
//     acknowledgement: true,
//   },
//   {
//     startDate: '2023-07-20',
//     endDate: '2023-07-22',
//     reasonForLeave: 'Medical',
//     delegatedResponsibilities:
//       'I have a scheduled medical appointment on these dates. My supervisor, Sarah, is aware and will cover for me.',
//     additionalComments:
//       "This is a follow-up appointment for a previous condition. I'll provide any necessary medical documents.",
//     requestStatus: 'approved',
//     acknowledgement: true,
//   },
//   {
//     startDate: '2023-09-05',
//     endDate: '2023-09-06',
//     reasonForLeave: 'Education',
//     delegatedResponsibilities:
//       "I'll be attending a two-day workshop on web development. Please contact me via email if needed.",
//     additionalComments:
//       'This workshop will help improve my skills as a TypeScript developer.',
//     requestStatus: 'approved',
//     acknowledgement: true,
//   },
//   {
//     startDate: '2023-07-12',
//     endDate: '2023-07-13',
//     reasonForLeave: 'Other',
//     delegatedResponsibilities:
//       'I need to take a personal leave for these two days to address some family matters.',
//     additionalComments:
//       'I appreciate your understanding in this matter and will ensure minimal disruption to work.',
//     requestStatus: 'approved',
//     acknowledgement: true,
//   },
//   {
//     startDate: '2023-10-01',
//     endDate: '2023-10-02',
//     reasonForLeave: 'Religious',
//     delegatedResponsibilities:
//       "I'll be observing a religious holiday during these dates. My tasks are handed over to Tom during my absence.",
//     additionalComments:
//       'This holiday is significant to my faith, and I appreciate your support.',
//     requestStatus: 'approved',
//     acknowledgement: true,
//   },
//   {
//     startDate: '2023-05-25',
//     endDate: '2023-05-27',
//     reasonForLeave: 'Vacation',
//     delegatedResponsibilities:
//       "I'll be on a family vacation during these days. Please contact me via phone for any emergencies.",
//     additionalComments:
//       "I'm looking forward to some quality time with my family.",
//     requestStatus: 'approved',
//     acknowledgement: true,
//   },
//   {
//     startDate: '2023-08-15',
//     endDate: '2023-08-16',
//     reasonForLeave: 'Bereavement',
//     delegatedResponsibilities:
//       "I'm attending a funeral for a close friend during these days. My coworker, Mark, is aware and will cover my tasks.",
//     additionalComments:
//       "It's a difficult time, and I appreciate your support during this period.",
//     requestStatus: 'approved',
//     acknowledgement: true,
//   },
//   {
//     startDate: '2023-11-02',
//     endDate: '2023-11-02',
//     reasonForLeave: 'Jury Duty',
//     delegatedResponsibilities:
//       "I've been summoned for jury duty on this day. I'll provide any necessary documentation from the court.",
//     additionalComments:
//       "I'll fulfill my civic duty and return to work the next day.",
//     requestStatus: 'approved',
//     acknowledgement: true,
//   },
//   {
//     startDate: '2023-06-10',
//     endDate: '2023-06-10',
//     reasonForLeave: 'Military',
//     delegatedResponsibilities:
//       "I have a mandatory military training on this day. I'll be unavailable during this time.",
//     additionalComments: 'This training is part of my reserve duty commitment.',
//     requestStatus: 'approved',
//     acknowledgement: true,
//   },
//   {
//     startDate: '2023-04-05',
//     endDate: '2023-04-06',
//     reasonForLeave: 'Other',
//     delegatedResponsibilities:
//       "I'm taking a short leave to focus on a personal project. My teammate, Lisa, will assist with any urgent matters.",
//     additionalComments:
//       "I'm excited about this project and will share updates when I return.",
//     requestStatus: 'approved',
//     acknowledgement: true,
//   },
//   {
//     startDate: '2023-05-10',
//     endDate: '2023-05-15',
//     reasonForLeave: 'Vacation',
//     delegatedResponsibilities:
//       'During my absence, my colleague John will handle my tasks. Please refer to him for any questions.',
//     additionalComments:
//       'I plan to visit my family during this vacation and will be unreachable during this time.',
//     requestStatus: 'approved',
//     acknowledgement: true,
//   },
//   {
//     startDate: '2023-07-20',
//     endDate: '2023-07-22',
//     reasonForLeave: 'Medical',
//     delegatedResponsibilities:
//       'I have a scheduled medical appointment on these dates. My supervisor, Sarah, is aware and will cover for me.',
//     additionalComments:
//       "This is a follow-up appointment for a previous condition. I'll provide any necessary medical documents.",
//     requestStatus: 'approved',
//     acknowledgement: true,
//   },
//   {
//     startDate: '2023-09-05',
//     endDate: '2023-09-06',
//     reasonForLeave: 'Education',
//     delegatedResponsibilities:
//       "I'll be attending a two-day workshop on web development. Please contact me via email if needed.",
//     additionalComments:
//       'This workshop will help improve my skills as a TypeScript developer.',
//     requestStatus: 'approved',
//     acknowledgement: true,
//   },
//   {
//     startDate: '2023-07-12',
//     endDate: '2023-07-13',
//     reasonForLeave: 'Other',
//     delegatedResponsibilities:
//       'I need to take a personal leave for these two days to address some family matters.',
//     additionalComments:
//       'I appreciate your understanding in this matter and will ensure minimal disruption to work.',
//     requestStatus: 'approved',
//     acknowledgement: true,
//   },
//   {
//     startDate: '2023-10-01',
//     endDate: '2023-10-02',
//     reasonForLeave: 'Religious',
//     delegatedResponsibilities:
//       "I'll be observing a religious holiday during these dates. My tasks are handed over to Tom during my absence.",
//     additionalComments:
//       'This holiday is significant to my faith, and I appreciate your support.',
//     requestStatus: 'approved',
//     acknowledgement: true,
//   },
//   {
//     startDate: '2023-05-25',
//     endDate: '2023-05-27',
//     reasonForLeave: 'Vacation',
//     delegatedResponsibilities:
//       "I'll be on a family vacation during these days. Please contact me via phone for any emergencies.",
//     additionalComments:
//       "I'm looking forward to some quality time with my family.",
//     requestStatus: 'approved',
//     acknowledgement: true,
//   },
//   {
//     startDate: '2023-08-15',
//     endDate: '2023-08-16',
//     reasonForLeave: 'Bereavement',
//     delegatedResponsibilities:
//       "I'm attending a funeral for a close friend during these days. My coworker, Mark, is aware and will cover my tasks.",
//     additionalComments:
//       "It's a difficult time, and I appreciate your support during this period.",
//     requestStatus: 'approved',
//     acknowledgement: true,
//   },
//   {
//     startDate: '2023-11-02',
//     endDate: '2023-11-02',
//     reasonForLeave: 'Jury Duty',
//     delegatedResponsibilities:
//       "I've been summoned for jury duty on this day. I'll provide any necessary documentation from the court.",
//     additionalComments:
//       "I'll fulfill my civic duty and return to work the next day.",
//     requestStatus: 'approved',
//     acknowledgement: true,
//   },
//   {
//     startDate: '2023-06-10',
//     endDate: '2023-06-10',
//     reasonForLeave: 'Military',
//     delegatedResponsibilities:
//       "I have a mandatory military training on this day. I'll be unavailable during this time.",
//     additionalComments: 'This training is part of my reserve duty commitment.',
//     requestStatus: 'approved',
//     acknowledgement: true,
//   },
//   {
//     startDate: '2023-04-05',
//     endDate: '2023-04-06',
//     reasonForLeave: 'Other',
//     delegatedResponsibilities:
//       "I'm taking a short leave to focus on a personal project. My teammate, Lisa, will assist with any urgent matters.",
//     additionalComments:
//       "I'm excited about this project and will share updates when I return.",
//     requestStatus: 'approved',
//     acknowledgement: true,
//   },
//   {
//     startDate: '2023-06-10',
//     endDate: '2023-06-15',
//     reasonForLeave: 'Vacation',
//     delegatedResponsibilities:
//       'During my absence, my colleague John will handle my tasks. Please contact him for any work-related matters.',
//     additionalComments:
//       "I'm planning to travel to a tropical destination for relaxation and exploration.",
//     requestStatus: 'approved',
//     acknowledgement: true,
//   },
//   {
//     startDate: '2023-08-20',
//     endDate: '2023-08-22',
//     reasonForLeave: 'Medical',
//     delegatedResponsibilities:
//       "I have a scheduled medical procedure on these dates. Dr. Smith will be performing the procedure, and I'll provide medical documentation.",
//     additionalComments:
//       'This procedure is a routine check-up to ensure my health is in good condition.',
//     requestStatus: 'approved',
//     acknowledgement: true,
//   },
//   {
//     startDate: '2023-09-05',
//     endDate: '2023-09-06',
//     reasonForLeave: 'Education',
//     delegatedResponsibilities:
//       "I'll be attending an intensive coding bootcamp to enhance my web development skills. In my absence, please reach out to my mentor, Sarah.",
//     additionalComments:
//       'This bootcamp is an opportunity for me to learn from industry experts and collaborate with fellow developers.',
//     requestStatus: 'approved',
//     acknowledgement: true,
//   },
//   {
//     startDate: '2023-07-12',
//     endDate: '2023-07-13',
//     reasonForLeave: 'Other',
//     delegatedResponsibilities:
//       'I need to take a short leave for personal reasons. During this time, my coworker, Lisa, has agreed to assist with my tasks.',
//     additionalComments:
//       'I value my privacy, and I appreciate your understanding in granting this leave.',
//     requestStatus: 'approved',
//     acknowledgement: true,
//   },
//   {
//     startDate: '2023-11-01',
//     endDate: '2023-11-01',
//     reasonForLeave: 'Religious',
//     delegatedResponsibilities:
//       "I'll be observing a religious holiday on this day. My tasks are covered by my colleague, David.",
//     additionalComments:
//       "This holiday holds significant spiritual meaning for me, and I'll spend the day in reflection and worship.",
//     requestStatus: 'approved',
//     acknowledgement: true,
//   },
//   {
//     startDate: '2023-05-25',
//     endDate: '2023-05-27',
//     reasonForLeave: 'Vacation',
//     delegatedResponsibilities:
//       "I'll be traveling with my family for a short vacation. In case of emergencies, you can reach me on my mobile phone.",
//     additionalComments:
//       "Quality time with family is essential, and I'm excited about this trip.",
//     requestStatus: 'approved',
//     acknowledgement: true,
//   },
//   {
//     startDate: '2023-08-15',
//     endDate: '2023-08-16',
//     reasonForLeave: 'Bereavement',
//     delegatedResponsibilities:
//       "I'm attending the funeral of a dear friend during these days. My coworker, Emily, will handle my work.",
//     additionalComments:
//       'Support from friends and colleagues is appreciated during this challenging time.',
//     requestStatus: 'approved',
//     acknowledgement: true,
//   },
//   {
//     startDate: '2023-11-02',
//     endDate: '2023-11-02',
//     reasonForLeave: 'Jury Duty',
//     delegatedResponsibilities:
//       "I've been selected for jury duty on this day. I'll provide the necessary documentation from the court.",
//     additionalComments:
//       'I consider it my civic duty to participate in the legal process.',
//     requestStatus: 'approved',
//     acknowledgement: true,
//   },
//   {
//     startDate: '2023-07-10',
//     endDate: '2023-07-10',
//     reasonForLeave: 'Military',
//     delegatedResponsibilities:
//       "I have a mandatory military training on this day. I'll be focused on my training and unavailable.",
//     additionalComments:
//       'This training is part of my commitment to serve in the reserve forces.',
//     requestStatus: 'approved',
//     acknowledgement: true,
//   },
//   {
//     startDate: '2023-04-05',
//     endDate: '2023-04-06',
//     reasonForLeave: 'Other',
//     delegatedResponsibilities:
//       "I'm taking a short leave to work on a personal coding project. My teammate, Michael, is aware and can handle any urgent matters.",
//     additionalComments:
//       'This project is an exciting opportunity for me to apply and expand my programming skills.',
//     requestStatus: 'approved',
//     acknowledgement: true,
//   },
//   {
//     startDate: '2023-04-10',
//     endDate: '2023-04-15',
//     reasonForLeave: 'Vacation',
//     delegatedResponsibilities:
//       'During my absence, my colleague John will handle my tasks. Please refer to him for any questions.',
//     additionalComments:
//       'I plan to visit my family during this vacation and will be unreachable during this time.',
//     requestStatus: 'approved',
//     acknowledgement: true,
//   },
//   {
//     startDate: '2023-06-20',
//     endDate: '2023-06-22',
//     reasonForLeave: 'Medical',
//     delegatedResponsibilities:
//       'I have a scheduled medical appointment on these dates. My supervisor, Sarah, is aware and will cover for me.',
//     additionalComments:
//       "This is a follow-up appointment for a previous condition. I'll provide any necessary medical documents.",
//     requestStatus: 'approved',
//     acknowledgement: true,
//   },
//   {
//     startDate: '2023-09-05',
//     endDate: '2023-09-06',
//     reasonForLeave: 'Education',
//     delegatedResponsibilities:
//       "I'll be attending a two-day workshop on web development. Please contact me via email if needed.",
//     additionalComments:
//       'This workshop will help improve my skills as a TypeScript developer.',
//     requestStatus: 'approved',
//     acknowledgement: true,
//   },
//   {
//     startDate: '2023-07-12',
//     endDate: '2023-07-13',
//     reasonForLeave: 'Other',
//     delegatedResponsibilities:
//       'I need to take a personal leave for these two days to address some family matters.',
//     additionalComments:
//       'I appreciate your understanding in this matter and will ensure minimal disruption to work.',
//     requestStatus: 'approved',
//     acknowledgement: true,
//   },
//   {
//     startDate: '2023-10-01',
//     endDate: '2023-10-02',
//     reasonForLeave: 'Religious',
//     delegatedResponsibilities:
//       "I'll be observing a religious holiday during these dates. My tasks are handed over to Tom during my absence.",
//     additionalComments:
//       'This holiday is significant to my faith, and I appreciate your support.',
//     requestStatus: 'approved',
//     acknowledgement: true,
//   },
//   {
//     startDate: '2023-05-25',
//     endDate: '2023-05-27',
//     reasonForLeave: 'Vacation',
//     delegatedResponsibilities:
//       "I'll be on a family vacation during these days. Please contact me via phone for any emergencies.",
//     additionalComments:
//       "I'm looking forward to some quality time with my family.",
//     requestStatus: 'approved',
//     acknowledgement: true,
//   },
//   {
//     startDate: '2023-08-15',
//     endDate: '2023-08-16',
//     reasonForLeave: 'Bereavement',
//     delegatedResponsibilities:
//       "I'm attending a funeral for a close friend during these days. My coworker, Mark, is aware and will cover my tasks.",
//     additionalComments:
//       "It's a difficult time, and I appreciate your support during this period.",
//     requestStatus: 'approved',
//     acknowledgement: true,
//   },
//   {
//     startDate: '2023-11-02',
//     endDate: '2023-11-02',
//     reasonForLeave: 'Jury Duty',
//     delegatedResponsibilities:
//       "I've been summoned for jury duty on this day. I'll provide any necessary documentation from the court.",
//     additionalComments:
//       "I'll fulfill my civic duty and return to work the next day.",
//     requestStatus: 'approved',
//     acknowledgement: true,
//   },
//   {
//     startDate: '2023-06-10',
//     endDate: '2023-06-10',
//     reasonForLeave: 'Military',
//     delegatedResponsibilities:
//       "I have a mandatory military training on this day. I'll be unavailable during this time.",
//     additionalComments: 'This training is part of my reserve duty commitment.',
//     requestStatus: 'approved',
//     acknowledgement: true,
//   },
//   {
//     startDate: '2023-04-05',
//     endDate: '2023-04-06',
//     reasonForLeave: 'Other',
//     delegatedResponsibilities:
//       "I'm taking a short leave to focus on a personal project. My teammate, Lisa, will assist with any urgent matters.",
//     additionalComments:
//       "I'm excited about this project and will share updates when I return.",
//     requestStatus: 'approved',
//     acknowledgement: true,
//   },
//   {
//     startDate: '2023-04-15',
//     endDate: '2023-04-20',
//     reasonForLeave: 'Vacation',
//     delegatedResponsibilities:
//       'During my absence, my colleague Sarah will handle my tasks. Please contact her for any work-related matters.',
//     additionalComments:
//       "I'm planning to explore a new city and unwind during this vacation.",
//     requestStatus: 'approved',
//     acknowledgement: true,
//   },
//   {
//     startDate: '2023-07-22',
//     endDate: '2023-07-23',
//     reasonForLeave: 'Medical',
//     delegatedResponsibilities:
//       'I have a scheduled medical checkup on these dates. My doctor, Dr. Johnson, will provide any necessary documentation.',
//     additionalComments:
//       'This checkup is part of my routine health maintenance.',
//     requestStatus: 'approved',
//     acknowledgement: true,
//   },
//   {
//     startDate: '2023-09-05',
//     endDate: '2023-09-07',
//     reasonForLeave: 'Education',
//     delegatedResponsibilities:
//       "I'll be attending an advanced web development workshop. In my absence, please reach out to my mentor, John.",
//     additionalComments:
//       'This workshop is a fantastic opportunity to learn cutting-edge web development techniques.',
//     requestStatus: 'approved',
//     acknowledgement: true,
//   },
//   {
//     startDate: '2023-08-10',
//     endDate: '2023-08-10',
//     reasonForLeave: 'Other',
//     delegatedResponsibilities:
//       'I need to take a personal day for self-care and relaxation. My colleague Lisa will cover for me.',
//     additionalComments:
//       'Mental health is essential, and I appreciate your support in granting this leave.',
//     requestStatus: 'approved',
//     acknowledgement: true,
//   },
//   {
//     startDate: '2023-11-25',
//     endDate: '2023-11-25',
//     reasonForLeave: 'Religious',
//     delegatedResponsibilities:
//       "I'll be observing a religious holiday on this day. My tasks are assigned to my teammate, Michael.",
//     additionalComments:
//       "This day is significant in my faith, and I'll spend it in prayer and reflection.",
//     requestStatus: 'approved',
//     acknowledgement: true,
//   },
//   {
//     startDate: '2023-05-10',
//     endDate: '2023-05-15',
//     reasonForLeave: 'Vacation',
//     delegatedResponsibilities:
//       "I'll be on a family vacation during these days. In case of emergencies, you can reach me on my mobile phone.",
//     additionalComments:
//       "Quality time with family is precious, and I'm looking forward to this trip.",
//     requestStatus: 'approved',
//     acknowledgement: true,
//   },
//   {
//     startDate: '2023-08-16',
//     endDate: '2023-08-17',
//     reasonForLeave: 'Bereavement',
//     delegatedResponsibilities:
//       "I'm attending the funeral of a dear friend during these days. My coworker, Emily, is aware and will cover my tasks.",
//     additionalComments:
//       'Support from friends and colleagues is appreciated during this challenging time.',
//     requestStatus: 'approved',
//     acknowledgement: true,
//   },
//   {
//     startDate: '2023-11-02',
//     endDate: '2023-11-02',
//     reasonForLeave: 'Jury Duty',
//     delegatedResponsibilities:
//       "I've been selected for jury duty on this day. I'll provide the necessary documentation from the court.",
//     additionalComments:
//       'I consider it my civic duty to participate in the legal process.',
//     requestStatus: 'approved',
//     acknowledgement: true,
//   },
//   {
//     startDate: '2023-06-15',
//     endDate: '2023-06-15',
//     reasonForLeave: 'Military',
//     delegatedResponsibilities:
//       "I have a mandatory military training on this day. I'll be focused on my training and unavailable.",
//     additionalComments:
//       'This training is part of my commitment to serve in the reserve forces.',
//     requestStatus: 'approved',
//     acknowledgement: true,
//   },
//   {
//     startDate: '2023-03-01',
//     endDate: '2023-03-02',
//     reasonForLeave: 'Other',
//     delegatedResponsibilities:
//       "I'm taking a short leave to work on a personal coding project. My teammate, David, is aware and can handle any urgent matters.",
//     additionalComments:
//       'This project is an exciting opportunity for me to apply and expand my programming skills.',
//     requestStatus: 'approved',
//     acknowledgement: true,
//   },
//   {
//     startDate: '2023-05-10',
//     endDate: '2023-05-15',
//     reasonForLeave: 'Vacation',
//     delegatedResponsibilities:
//       'During my absence, my colleague, John, will be taking over my tasks. You can reach out to him for any work-related issues.',
//     additionalComments:
//       "I'm planning to visit the beautiful beaches of Hawaii and unwind during this vacation.",
//     requestStatus: 'approved',
//     acknowledgement: true,
//   },
//   {
//     startDate: '2023-07-22',
//     endDate: '2023-07-23',
//     reasonForLeave: 'Medical',
//     delegatedResponsibilities:
//       "I have a scheduled medical appointment on these dates. Dr. Smith will be attending to me, and I'll provide any necessary medical documentation.",
//     additionalComments:
//       'This appointment is for a routine check-up to ensure my health is in good condition.',
//     requestStatus: 'approved',
//     acknowledgement: true,
//   },
//   {
//     startDate: '2023-09-05',
//     endDate: '2023-09-07',
//     reasonForLeave: 'Education',
//     delegatedResponsibilities:
//       "I'll be participating in an intensive web development bootcamp. In my absence, please contact my mentor, Sarah, for assistance.",
//     additionalComments:
//       'This bootcamp is a fantastic opportunity for me to upgrade my skills and learn from industry experts.',
//     requestStatus: 'approved',
//     acknowledgement: true,
//   },
//   {
//     startDate: '2023-08-10',
//     endDate: '2023-08-10',
//     reasonForLeave: 'Other',
//     delegatedResponsibilities:
//       'I need to take a personal day for self-care and relaxation. My colleague, Lisa, will cover my responsibilities during this time.',
//     additionalComments:
//       'Mental health is essential, and I appreciate your understanding and support in granting this leave.',
//     requestStatus: 'approved',
//     acknowledgement: true,
//   },
//   {
//     startDate: '2023-11-25',
//     endDate: '2023-11-25',
//     reasonForLeave: 'Religious',
//     delegatedResponsibilities:
//       "I'll be observing a religious holiday on this day. My tasks are assigned to my teammate, Michael, during my absence.",
//     additionalComments:
//       "This holiday is significant in my faith, and I'll spend it in reflection and worship.",
//     requestStatus: 'approved',
//     acknowledgement: true,
//   },
//   {
//     startDate: '2023-05-10',
//     endDate: '2023-05-15',
//     reasonForLeave: 'Vacation',
//     delegatedResponsibilities:
//       "I'll be on a family vacation during these dates. In case of emergencies, you can reach me on my mobile phone.",
//     additionalComments:
//       "Quality time with family is precious, and I'm looking forward to this trip.",
//     requestStatus: 'approved',
//     acknowledgement: true,
//   },
//   {
//     startDate: '2023-08-16',
//     endDate: '2023-08-17',
//     reasonForLeave: 'Bereavement',
//     delegatedResponsibilities:
//       "I'm attending the funeral of a dear friend during these days. My coworker, Emily, is aware and will cover my tasks.",
//     additionalComments:
//       'Your support during this challenging time is greatly appreciated.',
//     requestStatus: 'approved',
//     acknowledgement: true,
//   },
//   {
//     startDate: '2023-11-02',
//     endDate: '2023-11-02',
//     reasonForLeave: 'Jury Duty',
//     delegatedResponsibilities:
//       "I've been selected for jury duty on this day. I'll provide the necessary documentation from the court.",
//     additionalComments:
//       'I consider it my civic duty to participate in the legal process.',
//     requestStatus: 'approved',
//     acknowledgement: true,
//   },
//   {
//     startDate: '2023-06-15',
//     endDate: '2023-06-15',
//     reasonForLeave: 'Military',
//     delegatedResponsibilities:
//       "I have a mandatory military training on this day. I'll be focused on my training and unavailable.",
//     additionalComments:
//       'This training is part of my commitment to serve in the reserve forces.',
//     requestStatus: 'approved',
//     acknowledgement: true,
//   },
//   {
//     startDate: '2023-03-01',
//     endDate: '2023-03-02',
//     reasonForLeave: 'Other',
//     delegatedResponsibilities:
//       "I'm taking a short leave to work on a personal coding project. My teammate, David, is aware and can handle any urgent matters.",
//     additionalComments:
//       'This project is an exciting opportunity for me to apply and expand my programming skills.',
//     requestStatus: 'approved',
//     acknowledgement: true,
//   },
//   {
//     startDate: '2023-04-10',
//     endDate: '2023-04-12',
//     reasonForLeave: 'Vacation',
//     delegatedResponsibilities:
//       'During my absence, my colleague, Alice, will handle my tasks. You can contact her at alice@email.com for any urgent matters.',
//     additionalComments:
//       "I'm excited about this vacation to explore new places and recharge.",
//     requestStatus: 'approved',
//     acknowledgement: true,
//   },
//   {
//     startDate: '2023-07-22',
//     endDate: '2023-07-23',
//     reasonForLeave: 'Medical',
//     delegatedResponsibilities:
//       "I have a scheduled medical check-up on these dates. Dr. Smith will be conducting the check-up, and I'll provide medical records if required.",
//     additionalComments:
//       'This is a routine health check to ensure everything is in order.',
//     requestStatus: 'approved',
//     acknowledgement: true,
//   },
//   {
//     startDate: '2023-09-05',
//     endDate: '2023-09-07',
//     reasonForLeave: 'Education',
//     delegatedResponsibilities:
//       "I'll be attending a web development conference. In my absence, please reach out to my colleague, John, for any assistance.",
//     additionalComments:
//       'This conference is a great opportunity to learn and network with fellow developers.',
//     requestStatus: 'approved',
//     acknowledgement: true,
//   },
//   {
//     startDate: '2023-08-15',
//     endDate: '2023-08-15',
//     reasonForLeave: 'Other',
//     delegatedResponsibilities:
//       'I need a day off for personal reasons. My teammate, Sarah, will take over my responsibilities during this time.',
//     additionalComments:
//       'I appreciate your understanding of this personal matter.',
//     requestStatus: 'approved',
//     acknowledgement: true,
//   },
//   {
//     startDate: '2023-11-25',
//     endDate: '2023-11-25',
//     reasonForLeave: 'Religious',
//     delegatedResponsibilities:
//       "I'll be observing a religious holiday on this day. My tasks are assigned to my coworker, Michael, during my absence.",
//     additionalComments:
//       'This is a special day of reflection and worship in my faith.',
//     requestStatus: 'approved',
//     acknowledgement: true,
//   },
//   {
//     startDate: '2023-06-10',
//     endDate: '2023-06-12',
//     reasonForLeave: 'Vacation',
//     delegatedResponsibilities:
//       "I'll be on a family vacation during these days. In case of emergencies, you can contact me on my mobile phone.",
//     additionalComments:
//       "Spending quality time with family is important to me, and I'm looking forward to this trip.",
//     requestStatus: 'approved',
//     acknowledgement: true,
//   },
//   {
//     startDate: '2023-08-16',
//     endDate: '2023-08-17',
//     reasonForLeave: 'Bereavement',
//     delegatedResponsibilities:
//       "I'm attending a funeral for a close friend during these days. My coworker, Emily, is aware and will cover my tasks.",
//     additionalComments:
//       'Support from friends and colleagues is appreciated during this difficult time.',
//     requestStatus: 'approved',
//     acknowledgement: true,
//   },
//   {
//     startDate: '2023-11-02',
//     endDate: '2023-11-02',
//     reasonForLeave: 'Jury Duty',
//     delegatedResponsibilities:
//       "I've been summoned for jury duty on this day. I'll provide the necessary documentation from the court.",
//     additionalComments:
//       'I see this as an important civic duty and will return to work the following day.',
//     requestStatus: 'approved',
//     acknowledgement: true,
//   },
//   {
//     startDate: '2023-06-15',
//     endDate: '2023-06-15',
//     reasonForLeave: 'Military',
//     delegatedResponsibilities:
//       "I have a mandatory military training on this day. I'll be focused on my training and unavailable.",
//     additionalComments:
//       'This training is part of my commitment to serve in the reserve forces.',
//     requestStatus: 'approved',
//     acknowledgement: true,
//   },
//   {
//     startDate: '2023-04-05',
//     endDate: '2023-04-06',
//     reasonForLeave: 'Other',
//     delegatedResponsibilities:
//       "I'm taking a short leave to work on a personal coding project. My teammate, David, is aware and can handle any urgent matters.",
//     additionalComments:
//       'This project is an exciting opportunity for me to apply and expand my programming skills.',
//     requestStatus: 'approved',
//     acknowledgement: true,
//   },
// ];

type LeaveRequestsArray = {
  department: string;
  startDate: string;
  endDate: string;
  reasonForLeave: string;
  delegatedResponsibilities: string;
  additionalComments: string;
  requestStatus: string;
  acknowledgement: boolean;
}[];

const leaveRequestsArray = [
  {
    department: "Executive Management",
    startDate: "2023-04-10",
    endDate: "2023-04-12",
    reasonForLeave: "Vacation",
    delegatedResponsibilities:
      "During my absence, executive management will collectively oversee strategic decision-making, financial planning, and team leadership. Specific tasks will be divided among department heads.",
    additionalComments:
      "This vacation will provide me with the opportunity to recharge and return with fresh ideas for the company's growth.",
    requestStatus: "approved",
    acknowledgement: true,
  },
  {
    department: "Information Technology",
    startDate: "2023-07-22",
    endDate: "2023-07-23",
    reasonForLeave: "Medical",
    delegatedResponsibilities:
      "The IT team will handle my technical responsibilities, including system maintenance, software updates, and user support. Our senior developer will lead the team in my absence.",
    additionalComments:
      "My medical leave is for a necessary procedure, and I trust my team to maintain our IT infrastructure efficiently.",
    requestStatus: "approved",
    acknowledgement: true,
  },
  {
    department: "Marketing",
    startDate: "2023-09-05",
    endDate: "2023-09-07",
    reasonForLeave: "Education",
    delegatedResponsibilities:
      "The marketing department will continue campaigns, market research, and content creation. Our marketing manager will coordinate the team and maintain our brand presence.",
    additionalComments:
      "I'm attending an advanced marketing course to bring fresh insights and strategies to our campaigns.",
    requestStatus: "approved",
    acknowledgement: true,
  },
  {
    department: "Sales",
    startDate: "2023-08-15",
    endDate: "2023-08-15",
    reasonForLeave: "Other",
    delegatedResponsibilities:
      "The sales team will manage client interactions, negotiations, and sales presentations. Our sales manager will oversee the team's performance and goals for the day.",
    additionalComments:
      "This personal day will allow me to refocus and return with a renewed enthusiasm for achieving our sales targets.",
    requestStatus: "approved",
    acknowledgement: true,
  },
  {
    department: "Logistics and Inventory",
    startDate: "2023-11-25",
    endDate: "2023-11-25",
    reasonForLeave: "Religious",
    delegatedResponsibilities:
      "Logistics and inventory control will be handled by our logistics team. They will manage inventory levels, shipments, and distribution routes in accordance with standard procedures.",
    additionalComments:
      "This religious observance day is essential for me, and I trust our team to maintain smooth operations.",
    requestStatus: "approved",
    acknowledgement: true,
  },
  {
    department: "Customer Service",
    startDate: "2023-06-10",
    endDate: "2023-06-12",
    reasonForLeave: "Vacation",
    delegatedResponsibilities:
      "Customer service representatives will handle inquiries, resolve issues, and provide support to clients. The customer service manager will coordinate and ensure high-quality service delivery.",
    additionalComments:
      "This vacation will allow me to relax, and I'm confident in our team's ability to provide excellent customer support.",
    requestStatus: "approved",
    acknowledgement: true,
  },
  {
    department: "Field Service Technicians",
    startDate: "2023-08-16",
    endDate: "2023-08-17",
    reasonForLeave: "Bereavement",
    delegatedResponsibilities:
      "Field service technicians will take over equipment installations, repairs, and maintenance tasks. The field service manager will ensure timely service delivery and customer satisfaction.",
    additionalComments:
      "I appreciate the support as I attend a funeral, and I trust our team to uphold our service standards.",
    requestStatus: "approved",
    acknowledgement: true,
  },
  {
    department: "Accounting",
    startDate: "2023-11-02",
    endDate: "2023-11-02",
    reasonForLeave: "Jury Duty",
    delegatedResponsibilities:
      "The accounting team will manage financial transactions, budgeting, and financial reporting for the day. Our chief accountant will lead the team and ensure compliance with accounting standards.",
    additionalComments:
      "I consider serving on a jury as part of my civic duty, and I trust our team to maintain financial integrity in my absence.",
    requestStatus: "approved",
    acknowledgement: true,
  },
  {
    department: "Maintenance",
    startDate: "2023-06-15",
    endDate: "2023-06-15",
    reasonForLeave: "Military",
    delegatedResponsibilities:
      "Maintenance tasks, including equipment inspections and repairs, will be managed by our maintenance team. Our maintenance supervisor will coordinate and ensure the smooth functioning of our facilities.",
    additionalComments:
      "This military training is essential for my reserve service commitment, and I'm confident in our team's ability to maintain our infrastructure.",
    requestStatus: "approved",
    acknowledgement: true,
  },
  {
    department: "Office Administration",
    startDate: "2023-04-05",
    endDate: "2023-04-06",
    reasonForLeave: "Other",
    delegatedResponsibilities:
      "Office administrative tasks, such as document management, scheduling, and communication, will be handled by our administrative team. Our administrative lead will ensure smooth operations during my brief absence.",
    additionalComments:
      "I'm looking forward to working on a personal coding project during this time off to enhance our department's processes and efficiency.",
    requestStatus: "approved",
    acknowledgement: true,
  },
  {
    department: "Sales",
    startDate: "2023-07-15",
    endDate: "2023-07-20",
    reasonForLeave: "Vacation",
    delegatedResponsibilities:
      "The sales team will manage client meetings, negotiations, and sales presentations. Our sales manager will oversee the team's performance and maintain sales targets.",
    additionalComments:
      "I will be on vacation to recharge and spend quality time with my family. I trust the team to handle client relationships effectively.",
    requestStatus: "approved",
    acknowledgement: true,
  },
  {
    department: "Marketing",
    startDate: "2023-08-05",
    endDate: "2023-08-05",
    reasonForLeave: "Other",
    delegatedResponsibilities:
      "Marketing campaigns and social media management will continue as usual. Our marketing manager will lead the team and ensure campaign success.",
    additionalComments:
      "I have a personal commitment that requires my presence. The marketing team is well-prepared to maintain our online presence.",
    requestStatus: "approved",
    acknowledgement: true,
  },
  {
    department: "Information Technology",
    startDate: "2023-09-10",
    endDate: "2023-09-10",
    reasonForLeave: "Religious",
    delegatedResponsibilities:
      "The IT team will handle system maintenance, software updates, and user support. Our senior developer will lead the team during my absence.",
    additionalComments:
      "I'll be observing an important religious holiday and trust my team to keep our systems running smoothly.",
    requestStatus: "approved",
    acknowledgement: true,
  },
  {
    department: "Human Resources",
    startDate: "2023-10-15",
    endDate: "2023-10-18",
    reasonForLeave: "Medical",
    delegatedResponsibilities:
      "HR operations will be managed by our HR specialists. They will handle employee inquiries, recruitment, and onboarding processes.",
    additionalComments:
      "I have a scheduled medical procedure that requires my attention. Our HR team is well-equipped to manage daily operations.",
    requestStatus: "approved",
    acknowledgement: true,
  },
  {
    department: "Accounting",
    startDate: "2023-11-20",
    endDate: "2023-11-21",
    reasonForLeave: "Education",
    delegatedResponsibilities:
      "Financial transactions and budgeting will be overseen by our chief accountant. The accounting team will ensure compliance with financial regulations.",
    additionalComments:
      "I'll be attending a specialized financial training program to enhance our financial strategies and processes.",
    requestStatus: "approved",
    acknowledgement: true,
  },
  {
    department: "Maintenance",
    startDate: "2023-12-05",
    endDate: "2023-12-05",
    reasonForLeave: "Military",
    delegatedResponsibilities:
      "Maintenance tasks, including equipment inspections and repairs, will be managed by our skilled technicians. Our maintenance supervisor will ensure uninterrupted facility operations.",
    additionalComments:
      "I have a military training obligation to fulfill, and I'm confident in our maintenance team's capabilities.",
    requestStatus: "approved",
    acknowledgement: true,
  },
  {
    department: "Customer Service",
    startDate: "2023-07-01",
    endDate: "2023-07-02",
    reasonForLeave: "Vacation",
    delegatedResponsibilities:
      "Customer service representatives will handle customer inquiries, resolve issues, and provide support. Our team lead will oversee operations.",
    additionalComments:
      "I'm taking a short vacation to relax and return with a refreshed mindset to provide excellent customer service.",
    requestStatus: "approved",
    acknowledgement: true,
  },
  {
    department: "Repair Technicians",
    startDate: "2023-10-01",
    endDate: "2023-10-01",
    reasonForLeave: "Other",
    delegatedResponsibilities:
      "Repair technicians will handle equipment repair and maintenance tasks. Our lead technician will ensure prompt service delivery.",
    additionalComments:
      "I have a personal commitment, and I'm confident in our team's ability to maintain our equipment.",
    requestStatus: "approved",
    acknowledgement: true,
  },
  {
    department: "Logistics and Inventory",
    startDate: "2023-05-15",
    endDate: "2023-05-18",
    reasonForLeave: "Other",
    delegatedResponsibilities:
      "Logistics and inventory management will be handled by our logistics team. They will manage shipments, inventory levels, and distribution routes.",
    additionalComments:
      "I'll be working on a special project during this time to optimize our logistics operations. The team is well-prepared to manage day-to-day tasks.",
    requestStatus: "approved",
    acknowledgement: true,
  },
  {
    department: "Office Administration",
    startDate: "2023-09-01",
    endDate: "2023-09-05",
    reasonForLeave: "Vacation",
    delegatedResponsibilities:
      "Administrative tasks such as document management, scheduling, and communication will be managed by our administrative team. Our lead administrator will ensure smooth operations.",
    additionalComments:
      "I'm taking a well-deserved vacation to recharge and return with renewed energy to support the office's administrative needs.",
    requestStatus: "approved",
    acknowledgement: true,
  },
  {
    department: "Marketing",
    startDate: "2023-07-15",
    endDate: "2023-07-20",
    reasonForLeave: "Vacation",
    delegatedResponsibilities:
      "During my absence, the marketing team will be responsible for executing our ongoing marketing campaigns, managing our social media accounts, and analyzing campaign performance data. The team lead will oversee day-to-day operations.",
    additionalComments:
      "I am taking a well-deserved vacation to recharge and spend quality time with family. I trust the marketing team to maintain our brand's presence effectively.",
    requestStatus: "approved",
    acknowledgement: true,
  },
  {
    department: "Information Technology",
    startDate: "2023-08-05",
    endDate: "2023-08-12",
    reasonForLeave: "Education",
    delegatedResponsibilities:
      "While I'm away, the IT department will handle routine system maintenance tasks, provide technical support to employees, and monitor the network infrastructure. Our senior IT specialist will lead the team and ensure system reliability.",
    additionalComments:
      "I'm attending an advanced training program to enhance our IT infrastructure. I'm confident that our IT team can maintain our systems efficiently during my absence.",
    requestStatus: "approved",
    acknowledgement: true,
  },
  {
    department: "Customer Service",
    startDate: "2023-09-10",
    endDate: "2023-09-15",
    reasonForLeave: "Vacation",
    delegatedResponsibilities:
      "During my vacation, the customer service team will handle customer inquiries, resolve issues, and provide top-notch support. The team lead will oversee daily operations and ensure customer satisfaction.",
    additionalComments:
      "I'm taking a short break to recharge and come back with a fresh perspective to serve our valued customers better. Our team is well-prepared to maintain our service quality.",
    requestStatus: "approved",
    acknowledgement: true,
  },
  {
    department: "Sales",
    startDate: "2023-10-15",
    endDate: "2023-10-16",
    reasonForLeave: "Medical",
    delegatedResponsibilities:
      "In my absence, the sales team will continue client meetings, negotiations, and sales presentations. The sales manager will lead the team, ensuring that targets are met.",
    additionalComments:
      "I have a medical appointment that I need to attend to. I trust the sales team to maintain our client relationships and achieve our sales goals.",
    requestStatus: "approved",
    acknowledgement: true,
  },
  {
    department: "Maintenance",
    startDate: "2023-11-20",
    endDate: "2023-11-25",
    reasonForLeave: "Vacation",
    delegatedResponsibilities:
      "During my vacation, the maintenance team will handle equipment inspections, repairs, and facility maintenance. Our maintenance supervisor will ensure that everything runs smoothly.",
    additionalComments:
      "I'll be on vacation to recharge and return with renewed energy to oversee our maintenance operations. I have full confidence in our maintenance team's capabilities.",
    requestStatus: "approved",
    acknowledgement: true,
  },
  {
    department: "Accounting",
    startDate: "2023-12-05",
    endDate: "2023-12-12",
    reasonForLeave: "Education",
    delegatedResponsibilities:
      "While I'm attending a financial training program, the accounting team will manage financial transactions, budgeting, and ensure compliance with financial regulations. Our chief accountant will lead the team.",
    additionalComments:
      "I'm participating in an educational program to enhance our financial strategies. I'm confident that our accounting team will maintain our financial integrity.",
    requestStatus: "approved",
    acknowledgement: true,
  },
  {
    department: "Logistics and Inventory",
    startDate: "2023-07-01",
    endDate: "2023-07-05",
    reasonForLeave: "Vacation",
    delegatedResponsibilities:
      "During my vacation, the logistics and inventory team will manage shipments, inventory levels, and distribution routes. Our logistics manager will ensure that operations run smoothly.",
    additionalComments:
      "I'm taking a short vacation to recharge and come back with fresh ideas to optimize our logistics and inventory processes. I trust the team to handle day-to-day tasks effectively.",
    requestStatus: "approved",
    acknowledgement: true,
  },
  {
    department: "Human Resources",
    startDate: "2023-10-01",
    endDate: "2023-10-02",
    reasonForLeave: "Other",
    delegatedResponsibilities:
      "In my absence, the HR team will handle employee inquiries, recruitment, and onboarding processes. Our HR specialists will ensure a seamless HR operation.",
    additionalComments:
      "I have personal commitments to attend to, but I'm confident in our HR team's capabilities to maintain our HR processes effectively.",
    requestStatus: "approved",
    acknowledgement: true,
  },
  {
    department: "Office Administration",
    startDate: "2023-05-15",
    endDate: "2023-05-18",
    reasonForLeave: "Other",
    delegatedResponsibilities:
      "Administrative tasks such as document management, scheduling, and communication will be managed by our administrative team. Our lead administrator will ensure smooth operations.",
    additionalComments:
      "I'll be working on a special project during this time to optimize our administrative processes. The team is well-prepared to manage day-to-day tasks.",
    requestStatus: "approved",
    acknowledgement: true,
  },
  {
    department: "Executive Management",
    startDate: "2023-10-01",
    endDate: "2023-10-10",
    reasonForLeave: "Vacation",
    delegatedResponsibilities:
      "During my vacation, the executive management team will oversee strategic decision-making, budget planning, and leadership of the organization. Each member will take on additional responsibilities.",
    additionalComments:
      "I'm taking a well-deserved vacation to recharge and trust my capable team to continue driving our organization's success.",
    requestStatus: "approved",
    acknowledgement: true,
  },
  {
    department: "Information Technology",
    startDate: "2023-11-15",
    endDate: "2023-11-20",
    reasonForLeave: "Education",
    delegatedResponsibilities:
      "While I attend an advanced IT training program, the IT department will manage daily operations, troubleshoot technical issues, and ensure data security. The team lead will lead efforts.",
    additionalComments:
      "I'm investing in our IT team's growth and development. I'm confident they will excel in maintaining our IT infrastructure.",
    requestStatus: "approved",
    acknowledgement: true,
  },
  {
    department: "Sales",
    startDate: "2023-12-01",
    endDate: "2023-12-05",
    reasonForLeave: "Vacation",
    delegatedResponsibilities:
      "During my vacation, the sales team will handle client meetings, negotiations, and sales targets. The sales manager will provide guidance and leadership.",
    additionalComments:
      "I'm taking a break to recharge and trust the sales team to maintain strong client relationships and achieve our sales goals.",
    requestStatus: "approved",
    acknowledgement: true,
  },
  {
    department: "Customer Service",
    startDate: "2023-08-15",
    endDate: "2023-08-20",
    reasonForLeave: "Medical",
    delegatedResponsibilities:
      "In my absence, the customer service team will manage customer inquiries, issue resolution, and maintain service quality. The team lead will oversee daily operations.",
    additionalComments:
      "I have a medical condition to attend to, but I'm confident in our customer service team's ability to provide excellent support.",
    requestStatus: "approved",
    acknowledgement: true,
  },
  {
    department: "Marketing",
    startDate: "2023-09-01",
    endDate: "2023-09-10",
    reasonForLeave: "Vacation",
    delegatedResponsibilities:
      "During my vacation, the marketing team will handle campaign planning, social media management, and market analysis. The marketing manager will lead the team.",
    additionalComments:
      "I'm taking a break to recharge creatively and trust our marketing team to continue promoting our brand effectively.",
    requestStatus: "approved",
    acknowledgement: true,
  },
  {
    department: "Maintenance",
    startDate: "2023-07-15",
    endDate: "2023-07-20",
    reasonForLeave: "Vacation",
    delegatedResponsibilities:
      "During my vacation, the maintenance team will conduct equipment inspections, repairs, and facility maintenance. The lead technician will oversee daily tasks.",
    additionalComments:
      "I'm taking a vacation to return with a fresh perspective on optimizing our maintenance processes. I trust our maintenance team to ensure everything runs smoothly.",
    requestStatus: "approved",
    acknowledgement: true,
  },
  {
    department: "Office Administration",
    startDate: "2023-05-01",
    endDate: "2023-05-05",
    reasonForLeave: "Education",
    delegatedResponsibilities:
      "While I attend an administrative efficiency workshop, the office administration team will manage document organization, scheduling, and communication. Our lead administrator will coordinate.",
    additionalComments:
      "I'm focused on improving our administrative processes and trust our team to maintain efficiency during my absence.",
    requestStatus: "approved",
    acknowledgement: true,
  },
  {
    department: "Repair Technicians",
    startDate: "2023-06-10",
    endDate: "2023-06-15",
    reasonForLeave: "Vacation",
    delegatedResponsibilities:
      "During my vacation, the repair technicians will handle equipment repairs, maintenance, and technical support. The senior technician will lead the team.",
    additionalComments:
      "I'm taking a break to recharge, and I have full confidence in our repair technicians' expertise to ensure our equipment runs smoothly.",
    requestStatus: "approved",
    acknowledgement: true,
  },
  {
    department: "Human Resources",
    startDate: "2023-04-20",
    endDate: "2023-04-25",
    reasonForLeave: "Vacation",
    delegatedResponsibilities:
      "During my vacation, the HR team will handle recruitment, onboarding, and employee relations. The HR manager will lead HR operations.",
    additionalComments:
      "I'm taking a well-deserved break, and I trust our HR team to continue nurturing our talented workforce.",
    requestStatus: "approved",
    acknowledgement: true,
  },
  {
    department: "Executive Management",
    startDate: "2023-10-01",
    endDate: "2023-10-10",
    reasonForLeave: "Vacation",
    delegatedResponsibilities:
      "During my vacation, the executive management team will oversee strategic decision-making, budget planning, and leadership of the organization. Each member will take on additional responsibilities to ensure a smooth workflow.",
    additionalComments:
      "I'm taking a well-deserved vacation to recharge and trust my capable team to continue driving our organization's success during my absence. I have full confidence in their abilities.",
    requestStatus: "approved",
    acknowledgement: true,
  },
  {
    department: "Information Technology",
    startDate: "2023-11-15",
    endDate: "2023-11-20",
    reasonForLeave: "Education",
    delegatedResponsibilities:
      "While I attend an advanced IT training program, the IT department will manage daily operations, troubleshoot technical issues, and ensure data security. The team lead will lead efforts to maintain system integrity and support our colleagues.",
    additionalComments:
      "I'm investing in our IT team's growth and development. I'm confident they will excel in maintaining our IT infrastructure and providing top-notch support to our colleagues.",
    requestStatus: "approved",
    acknowledgement: true,
  },
  {
    department: "Sales",
    startDate: "2023-12-01",
    endDate: "2023-12-05",
    reasonForLeave: "Vacation",
    delegatedResponsibilities:
      "During my vacation, the sales team will handle client meetings, negotiations, and sales targets. The sales manager will provide guidance and leadership to ensure our clients' needs are met effectively.",
    additionalComments:
      "I'm taking a break to recharge and trust the sales team to maintain strong client relationships and achieve our sales goals. They have a solid plan in place.",
    requestStatus: "approved",
    acknowledgement: true,
  },
  {
    department: "Customer Service",
    startDate: "2023-08-15",
    endDate: "2023-08-20",
    reasonForLeave: "Medical",
    delegatedResponsibilities:
      "In my absence, the customer service team will manage customer inquiries, issue resolution, and maintain service quality. The team lead will oversee daily operations and ensure that our customers receive excellent support.",
    additionalComments:
      "I have a medical condition to attend to, but I'm confident in our customer service team's ability to provide excellent support. Our customers are in good hands.",
    requestStatus: "approved",
    acknowledgement: true,
  },
  {
    department: "Marketing",
    startDate: "2023-09-01",
    endDate: "2023-09-10",
    reasonForLeave: "Vacation",
    delegatedResponsibilities:
      "During my vacation, the marketing team will handle campaign planning, social media management, and market analysis. The marketing manager will lead the team in crafting compelling strategies to promote our brand.",
    additionalComments:
      "I'm taking a break to recharge creatively and trust our marketing team to continue promoting our brand effectively. They have innovative ideas ready to go.",
    requestStatus: "approved",
    acknowledgement: true,
  },
  {
    department: "Maintenance",
    startDate: "2023-07-15",
    endDate: "2023-07-20",
    reasonForLeave: "Vacation",
    delegatedResponsibilities:
      "During my vacation, the maintenance team will conduct equipment inspections, repairs, and facility maintenance. The lead technician will oversee daily tasks to ensure that our facilities and equipment are in top condition.",
    additionalComments:
      "I'm taking a vacation to return with a fresh perspective on optimizing our maintenance processes. I trust our maintenance team to ensure everything runs smoothly and safely.",
    requestStatus: "approved",
    acknowledgement: true,
  },
  {
    department: "Office Administration",
    startDate: "2023-05-01",
    endDate: "2023-05-05",
    reasonForLeave: "Education",
    delegatedResponsibilities:
      "While I attend an administrative efficiency workshop, the office administration team will manage document organization, scheduling, and communication. Our lead administrator will coordinate efforts to maintain efficiency.",
    additionalComments:
      "I'm focused on improving our administrative processes and trust our team to maintain efficiency during my absence. They are well-prepared for this temporary transition.",
    requestStatus: "approved",
    acknowledgement: true,
  },
  {
    department: "Repair Technicians",
    startDate: "2023-06-10",
    endDate: "2023-06-15",
    reasonForLeave: "Vacation",
    delegatedResponsibilities:
      "During my vacation, the repair technicians will handle equipment repairs, maintenance, and technical support. The senior technician will lead the team in ensuring that all equipment functions optimally.",
    additionalComments:
      "I'm taking a break to recharge, and I have full confidence in our repair technicians' expertise to ensure our equipment runs smoothly. They are well-versed in equipment maintenance.",
    requestStatus: "approved",
    acknowledgement: true,
  },
  {
    department: "Human Resources",
    startDate: "2023-04-20",
    endDate: "2023-04-25",
    reasonForLeave: "Vacation",
    delegatedResponsibilities:
      "During my vacation, the HR team will handle recruitment, onboarding, and employee relations. The HR manager will lead HR operations to ensure a seamless experience for our employees.",
    additionalComments:
      "I'm taking a well-deserved break, and I trust our HR team to continue nurturing our talented workforce. They are experts in talent management.",
    requestStatus: "approved",
    acknowledgement: true,
  },
  {
    department: "Logistics and Inventory",
    startDate: "2023-03-15",
    endDate: "2023-03-20",
    reasonForLeave: "Vacation",
    delegatedResponsibilities:
      "During my vacation, the logistics and inventory team will manage inventory control, shipments, and warehouse operations. The logistics manager will lead the team in optimizing our supply chain processes.",
    additionalComments:
      "I'm taking a break to recharge, and I trust our logistics and inventory team to keep our supply chain running smoothly. They have a keen eye for efficiency.",
    requestStatus: "approved",
    acknowledgement: true,
  },
  {
    department: "Executive Management",
    startDate: "2023-10-01",
    endDate: "2023-10-10",
    reasonForLeave: "Vacation",
    delegatedResponsibilities:
      "During my vacation, the executive management team will oversee strategic decision-making, budget planning, and leadership of the organization. Each member will take on additional responsibilities to ensure a smooth workflow.",
    additionalComments:
      "I'm taking a well-deserved vacation to recharge and trust my capable team to continue driving our organization's success during my absence. I have full confidence in their abilities.",
    requestStatus: "approved",
    acknowledgement: true,
  },
  {
    department: "Information Technology",
    startDate: "2023-11-15",
    endDate: "2023-11-20",
    reasonForLeave: "Education",
    delegatedResponsibilities:
      "While I attend an advanced IT training program, the IT department will manage daily operations, troubleshoot technical issues, and ensure data security. The team lead will lead efforts to maintain system integrity and support our colleagues.",
    additionalComments:
      "I'm investing in our IT team's growth and development. I'm confident they will excel in maintaining our IT infrastructure and providing top-notch support to our colleagues.",
    requestStatus: "approved",
    acknowledgement: true,
  },
  {
    department: "Sales",
    startDate: "2023-12-01",
    endDate: "2023-12-05",
    reasonForLeave: "Vacation",
    delegatedResponsibilities:
      "During my vacation, the sales team will handle client meetings, negotiations, and sales targets. The sales manager will provide guidance and leadership to ensure our clients' needs are met effectively.",
    additionalComments:
      "I'm taking a break to recharge and trust the sales team to maintain strong client relationships and achieve our sales goals. They have a solid plan in place.",
    requestStatus: "approved",
    acknowledgement: true,
  },
  {
    department: "Customer Service",
    startDate: "2023-08-15",
    endDate: "2023-08-20",
    reasonForLeave: "Medical",
    delegatedResponsibilities:
      "In my absence, the customer service team will manage customer inquiries, issue resolution, and maintain service quality. The team lead will oversee daily operations and ensure that our customers receive excellent support.",
    additionalComments:
      "I have a medical condition to attend to, but I'm confident in our customer service team's ability to provide excellent support. Our customers are in good hands.",
    requestStatus: "approved",
    acknowledgement: true,
  },
  {
    department: "Marketing",
    startDate: "2023-09-01",
    endDate: "2023-09-10",
    reasonForLeave: "Vacation",
    delegatedResponsibilities:
      "During my vacation, the marketing team will handle campaign planning, social media management, and market analysis. The marketing manager will lead the team in crafting compelling strategies to promote our brand.",
    additionalComments:
      "I'm taking a break to recharge creatively and trust our marketing team to continue promoting our brand effectively. They have innovative ideas ready to go.",
    requestStatus: "approved",
    acknowledgement: true,
  },
  {
    department: "Maintenance",
    startDate: "2023-07-15",
    endDate: "2023-07-20",
    reasonForLeave: "Vacation",
    delegatedResponsibilities:
      "During my vacation, the maintenance team will conduct equipment inspections, repairs, and facility maintenance. The lead technician will oversee daily tasks to ensure that our facilities and equipment are in top condition.",
    additionalComments:
      "I'm taking a vacation to return with a fresh perspective on optimizing our maintenance processes. I trust our maintenance team to ensure everything runs smoothly and safely.",
    requestStatus: "approved",
    acknowledgement: true,
  },
  {
    department: "Office Administration",
    startDate: "2023-05-01",
    endDate: "2023-05-05",
    reasonForLeave: "Education",
    delegatedResponsibilities:
      "While I attend an administrative efficiency workshop, the office administration team will manage document organization, scheduling, and communication. Our lead administrator will coordinate efforts to maintain efficiency.",
    additionalComments:
      "I'm focused on improving our administrative processes and trust our team to maintain efficiency during my absence. They are well-prepared for this temporary transition.",
    requestStatus: "approved",
    acknowledgement: true,
  },
  {
    department: "Repair Technicians",
    startDate: "2023-06-10",
    endDate: "2023-06-15",
    reasonForLeave: "Vacation",
    delegatedResponsibilities:
      "During my vacation, the repair technicians will handle equipment repairs, maintenance, and technical support. The senior technician will lead the team in ensuring that all equipment functions optimally.",
    additionalComments:
      "I'm taking a break to recharge, and I have full confidence in our repair technicians' expertise to ensure our equipment runs smoothly. They are well-versed in equipment maintenance.",
    requestStatus: "approved",
    acknowledgement: true,
  },
  {
    department: "Human Resources",
    startDate: "2023-04-20",
    endDate: "2023-04-25",
    reasonForLeave: "Vacation",
    delegatedResponsibilities:
      "During my vacation, the HR team will handle recruitment, onboarding, and employee engagement. The HR manager will lead efforts to ensure our workforce remains motivated and supported.",
    additionalComments:
      "I'm taking a well-deserved break, and I trust our HR team to continue nurturing our talented workforce. They are experts in talent management.",
    requestStatus: "approved",
    acknowledgement: true,
  },
  {
    department: "Logistics and Inventory",
    startDate: "2023-03-15",
    endDate: "2023-03-20",
    reasonForLeave: "Vacation",
    delegatedResponsibilities:
      "During my vacation, the logistics and inventory team will manage inventory control, shipments, and warehouse operations. The logistics manager will lead the team in optimizing our supply chain processes.",
    additionalComments:
      "I'm taking a break to recharge, and I trust our logistics and inventory team to keep our supply chain running smoothly. They have a keen eye for efficiency.",
    requestStatus: "approved",
    acknowledgement: true,
  },
  {
    department: "Accounting",
    startDate: "2023-02-05",
    endDate: "2023-02-10",
    reasonForLeave: "Vacation",
    delegatedResponsibilities:
      "During my vacation, the accounting team will handle financial reporting, budgeting, and auditing. The senior accountant will lead the team in maintaining accurate financial records.",
    additionalComments:
      "I'm taking a break to recharge, and I have full confidence in our accounting team's ability to ensure the financial stability of our organization. They are meticulous in their work.",
    requestStatus: "approved",
    acknowledgement: true,
  },
  {
    department: "Field Service Technicians",
    startDate: "2023-01-15",
    endDate: "2023-01-20",
    reasonForLeave: "Vacation",
    delegatedResponsibilities:
      "During my vacation, the field service technicians will handle on-site equipment repairs and technical support. The lead technician will ensure our clients receive prompt and efficient service.",
    additionalComments:
      "I'm taking a break to recharge, and I trust our field service technicians to provide excellent on-site support to our clients. They are skilled problem solvers.",
    requestStatus: "approved",
    acknowledgement: true,
  },
  {
    department: "Religious",
    startDate: "2023-03-01",
    endDate: "2023-03-10",
    reasonForLeave: "Religious",
    delegatedResponsibilities:
      "During my religious retreat, I have arranged for a colleague from another department to cover my responsibilities. They are familiar with my tasks and will ensure a smooth workflow in my absence.",
    additionalComments:
      "My religious beliefs require this time for spiritual reflection and renewal. I appreciate the understanding and support of my colleagues during this period.",
    requestStatus: "approved",
    acknowledgement: true,
  },
  {
    department: "Executive Management",
    startDate: "2023-10-01",
    endDate: "2023-10-10",
    reasonForLeave: "Vacation",
    delegatedResponsibilities:
      "During my vacation, the executive management team will oversee strategic decision-making, budget planning, and leadership of the organization. Each member will take on additional responsibilities to ensure a smooth workflow.",
    additionalComments:
      "I'm taking a well-deserved vacation to recharge and trust my capable team to continue driving our organization's success during my absence. I have full confidence in their abilities.",
    requestStatus: "approved",
    acknowledgement: true,
  },
  {
    department: "Information Technology",
    startDate: "2023-11-15",
    endDate: "2023-11-20",
    reasonForLeave: "Education",
    delegatedResponsibilities:
      "While I attend an advanced IT training program, the IT department will manage daily operations, troubleshoot technical issues, and ensure data security. The team lead will lead efforts to maintain system integrity and support our colleagues.",
    additionalComments:
      "I'm investing in our IT team's growth and development. I'm confident they will excel in maintaining our IT infrastructure and providing top-notch support to our colleagues.",
    requestStatus: "approved",
    acknowledgement: true,
  },
  {
    department: "Sales",
    startDate: "2023-12-01",
    endDate: "2023-12-05",
    reasonForLeave: "Vacation",
    delegatedResponsibilities:
      "During my vacation, the sales team will handle client meetings, negotiations, and sales targets. The sales manager will provide guidance and leadership to ensure our clients' needs are met effectively.",
    additionalComments:
      "I'm taking a break to recharge and trust the sales team to maintain strong client relationships and achieve our sales goals. They have a solid plan in place.",
    requestStatus: "approved",
    acknowledgement: true,
  },
  {
    department: "Customer Service",
    startDate: "2023-08-15",
    endDate: "2023-08-20",
    reasonForLeave: "Medical",
    delegatedResponsibilities:
      "In my absence, the customer service team will manage customer inquiries, issue resolution, and maintain service quality. The team lead will oversee daily operations and ensure that our customers receive excellent support.",
    additionalComments:
      "I have a medical condition to attend to, but I'm confident in our customer service team's ability to provide excellent support. Our customers are in good hands.",
    requestStatus: "approved",
    acknowledgement: true,
  },
  {
    department: "Marketing",
    startDate: "2023-09-01",
    endDate: "2023-09-10",
    reasonForLeave: "Vacation",
    delegatedResponsibilities:
      "During my vacation, the marketing team will handle campaign planning, social media management, and market analysis. The marketing manager will lead the team in crafting compelling strategies to promote our brand.",
    additionalComments:
      "I'm taking a break to recharge creatively and trust our marketing team to continue promoting our brand effectively. They have innovative ideas ready to go.",
    requestStatus: "approved",
    acknowledgement: true,
  },
  {
    department: "Maintenance",
    startDate: "2023-07-15",
    endDate: "2023-07-20",
    reasonForLeave: "Vacation",
    delegatedResponsibilities:
      "During my vacation, the maintenance team will conduct equipment inspections, repairs, and facility maintenance. The lead technician will oversee daily tasks to ensure that our facilities and equipment are in top condition.",
    additionalComments:
      "I'm taking a vacation to return with a fresh perspective on optimizing our maintenance processes. I trust our maintenance team to ensure everything runs smoothly and safely.",
    requestStatus: "approved",
    acknowledgement: true,
  },
  {
    department: "Office Administration",
    startDate: "2023-05-01",
    endDate: "2023-05-05",
    reasonForLeave: "Education",
    delegatedResponsibilities:
      "While I attend an administrative efficiency workshop, the office administration team will manage document organization, scheduling, and communication. Our lead administrator will coordinate efforts to maintain efficiency.",
    additionalComments:
      "I'm focused on improving our administrative processes, and I trust our office administration team to keep everything running smoothly in my absence. They are organized and efficient.",
    requestStatus: "approved",
    acknowledgement: true,
  },
  {
    department: "Repair Technicians",
    startDate: "2023-06-01",
    endDate: "2023-06-10",
    reasonForLeave: "Vacation",
    delegatedResponsibilities:
      "During my vacation, the repair technicians will handle equipment diagnostics, repairs, and testing. The lead technician will ensure our clients receive prompt and efficient service.",
    additionalComments:
      "I'm taking a break to recharge, and I trust our repair technicians to provide excellent service to our clients. They are skilled problem solvers.",
    requestStatus: "approved",
    acknowledgement: true,
  },
  {
    department: "Field Service Technicians",
    startDate: "2023-04-15",
    endDate: "2023-04-20",
    reasonForLeave: "Vacation",
    delegatedResponsibilities:
      "During my vacation, the field service technicians will handle on-site equipment repairs and technical support. The lead technician will ensure our clients receive prompt and efficient service.",
    additionalComments:
      "I'm taking a break to recharge, and I trust our field service technicians to provide excellent on-site support to our clients. They are skilled problem solvers.",
    requestStatus: "approved",
    acknowledgement: true,
  },
  {
    department: "Bereavement",
    startDate: "2023-03-15",
    endDate: "2023-03-20",
    reasonForLeave: "Bereavement",
    delegatedResponsibilities:
      "During this difficult time, my colleagues in various departments have come together to support me. They will handle my responsibilities collectively with empathy and understanding.",
    additionalComments:
      "I appreciate the support and understanding of my colleagues during this challenging period. Their compassion has made it easier to navigate this loss.",
    requestStatus: "approved",
    acknowledgement: true,
  },
  {
    department: "Marketing",
    startDate: "2023-02-01",
    endDate: "2023-02-10",
    reasonForLeave: "Vacation",
    delegatedResponsibilities:
      "During my vacation, the marketing team will handle campaign planning, social media management, and market analysis. The marketing manager will lead the team in crafting compelling strategies to promote our brand.",
    additionalComments:
      "I'm taking a break to recharge creatively and trust our marketing team to continue promoting our brand effectively. They have innovative ideas ready to go.",
    requestStatus: "approved",
    acknowledgement: true,
  },
  {
    department: "Sales",
    startDate: "2023-01-15",
    endDate: "2023-01-20",
    reasonForLeave: "Vacation",
    delegatedResponsibilities:
      "During my vacation, the sales team will handle client meetings, negotiations, and sales targets. The sales manager will provide guidance and leadership to ensure our clients' needs are met effectively.",
    additionalComments:
      "I'm taking a break to recharge and trust the sales team to maintain strong client relationships and achieve our sales goals. They have a solid plan in place.",
    requestStatus: "approved",
    acknowledgement: true,
  },
  {
    department: "Customer Service",
    startDate: "2023-04-01",
    endDate: "2023-04-10",
    reasonForLeave: "Vacation",
    delegatedResponsibilities:
      "During my vacation, the customer service team will manage customer inquiries, issue resolution, and maintain service quality. The team lead will oversee daily operations and ensure that our customers receive excellent support.",
    additionalComments:
      "I'm taking a break to recharge, and I trust the customer service team to provide outstanding support to our valued customers. They are dedicated to excellence.",
    requestStatus: "approved",
    acknowledgement: true,
  },
  {
    department: "Repair Technicians",
    startDate: "2023-03-01",
    endDate: "2023-03-10",
    reasonForLeave: "Medical",
    delegatedResponsibilities:
      "In my absence, the repair technicians will handle equipment diagnostics, repairs, and testing. The lead technician will ensure that our clients receive prompt and efficient service.",
    additionalComments:
      "I have a medical condition to attend to, but I'm confident in our repair technicians' ability to provide excellent service to our clients. They are experts in their field.",
    requestStatus: "approved",
    acknowledgement: true,
  },
  {
    department: "Maintenance",
    startDate: "2023-02-15",
    endDate: "2023-02-20",
    reasonForLeave: "Vacation",
    delegatedResponsibilities:
      "During my vacation, the maintenance team will conduct equipment inspections, repairs, and facility maintenance. The lead technician will oversee daily tasks to ensure that our facilities and equipment are in top condition.",
    additionalComments:
      "I'm taking a vacation to return with a fresh perspective on optimizing our maintenance processes. I trust our maintenance team to ensure everything runs smoothly and safely.",
    requestStatus: "approved",
    acknowledgement: true,
  },
  {
    department: "Logistics and Inventory",
    startDate: "2023-01-01",
    endDate: "2023-01-10",
    reasonForLeave: "Vacation",
    delegatedResponsibilities:
      "During my vacation, the logistics and inventory team will manage inventory control, shipments, and warehouse operations. The logistics manager will lead efforts to maintain efficient logistics processes.",
    additionalComments:
      "I'm taking a well-deserved break, and I trust our logistics and inventory team to ensure that our supply chain continues to operate smoothly. They are experts in managing our inventory.",
    requestStatus: "approved",
    acknowledgement: true,
  },
  {
    department: "Education",
    startDate: "2023-05-15",
    endDate: "2023-05-20",
    reasonForLeave: "Education",
    delegatedResponsibilities:
      "While I attend an educational seminar, the education department will continue planning and delivering high-quality training programs. Our lead educator will ensure that our educational initiatives run smoothly.",
    additionalComments:
      "I'm committed to enhancing our education programs, and I trust our education department to maintain the high standards of our training during my absence. They are dedicated educators.",
    requestStatus: "approved",
    acknowledgement: true,
  },
];

// function returnLeaveRequestsBodies({
//   userDocs,
//   leaveRequestsArray,
// }: {
//   userDocs: DirectoryUserDocument[];
//   leaveRequestsArray: LeaveRequestsArray;
// }) {
//   return userDocs.flatMap((userDoc) => {
//     const { _id, username, department } = userDoc;

//     // Randomly select a number of leave requests to return (except for execs)
//     const numberOfLeaveRequestsToReturn =
//       department === 'Executive Management' ? 5 : Math.floor(Math.random() * 7);

//     // grab the leaveRequests with the same department as the current user's department
//     // because the delegatedResponsibilities should reflect the current user's department
//     const leaveRequestsArrayWithSameDepartment = leaveRequestsArray.filter(
//       (leaveRequest) => leaveRequest.department === department
//     );

//     // shuffle the leave requests
//     const shuffledLeaveRequests = shuffleArray(
//       leaveRequestsArrayWithSameDepartment
//     );

//     // return the first n leave requests
//     const leaveRequestsToReturn = shuffledLeaveRequests.slice(
//       0,
//       numberOfLeaveRequestsToReturn
//     );

//     const leaveRequestsBodies = leaveRequestsToReturn.map((leaveRequest) => {
//       // filter the user docs by same department as current user's department
//       // because the delegated user should be from the same department as leave requesting user
//       const filteredUsersDocsByDepartment = userDocs.filter(
//         (userDoc) => userDoc.department === department
//       );

//       // pick a random user doc from the filtered user docs
//       const randomUserDoc =
//         filteredUsersDocsByDepartment[
//           Math.floor(Math.random() * filteredUsersDocsByDepartment.length)
//         ];

//       // assign the random user doc's name to the current user's delegatedToEmployee field
//       const { firstName, middleName, lastName } = randomUserDoc;
//       const delegatedToEmployee = `${firstName} ${middleName} ${lastName}`;

//       //  do not want department field in the leave request body
//       const leaveRequestBody = {
//         userId: _id,
//         username,
//         delegatedToEmployee,
//         startDate: leaveRequest.startDate,
//         endDate: leaveRequest.endDate,
//         reasonForLeave: leaveRequest.reasonForLeave,
//         delegatedResponsibilities: leaveRequest.delegatedResponsibilities,
//         additionalComments: leaveRequest.additionalComments,
//         requestStatus: leaveRequest.requestStatus,
//         acknowledgement: leaveRequest.acknowledgement,
//       };

//       return leaveRequestBody;
//     });

//     return leaveRequestsBodies;
//   });
// }

export { leaveRequestsArray };
export type { LeaveRequestsArray };
