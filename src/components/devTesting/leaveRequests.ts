import { groupByField, shuffleArray } from '../../utils';
import { DirectoryUserDocument } from '../directory/types';

type LeaveRequestsArray = {
  startDate: string;
  endDate: string;
  reasonForLeave: string;
  delegatedResponsibilities: string;
  additionalComments: string;
  requestStatus: string;
  acknowledgement: boolean;
}[];

const leaveRequestsArray: LeaveRequestsArray = [
  {
    startDate: '2023-05-10',
    endDate: '2023-05-15',
    reasonForLeave: 'Vacation',
    delegatedResponsibilities:
      'During my absence, my colleague John will handle my tasks. Please refer to him for any questions.',
    additionalComments:
      'I plan to visit my family during this vacation and will be unreachable during this time.',
    requestStatus: 'approved',
    acknowledgement: true,
  },
  {
    startDate: '2023-07-20',
    endDate: '2023-07-22',
    reasonForLeave: 'Medical',
    delegatedResponsibilities:
      'I have a scheduled medical appointment on these dates. My supervisor, Sarah, is aware and will cover for me.',
    additionalComments:
      "This is a follow-up appointment for a previous condition. I'll provide any necessary medical documents.",
    requestStatus: 'approved',
    acknowledgement: true,
  },
  {
    startDate: '2023-09-05',
    endDate: '2023-09-06',
    reasonForLeave: 'Education',
    delegatedResponsibilities:
      "I'll be attending a two-day workshop on web development. Please contact me via email if needed.",
    additionalComments:
      'This workshop will help improve my skills as a TypeScript developer.',
    requestStatus: 'approved',
    acknowledgement: true,
  },
  {
    startDate: '2023-07-12',
    endDate: '2023-07-13',
    reasonForLeave: 'Other',
    delegatedResponsibilities:
      'I need to take a personal leave for these two days to address some family matters.',
    additionalComments:
      'I appreciate your understanding in this matter and will ensure minimal disruption to work.',
    requestStatus: 'approved',
    acknowledgement: true,
  },
  {
    startDate: '2023-10-01',
    endDate: '2023-10-02',
    reasonForLeave: 'Religious',
    delegatedResponsibilities:
      "I'll be observing a religious holiday during these dates. My tasks are handed over to Tom during my absence.",
    additionalComments:
      'This holiday is significant to my faith, and I appreciate your support.',
    requestStatus: 'approved',
    acknowledgement: true,
  },
  {
    startDate: '2023-05-25',
    endDate: '2023-05-27',
    reasonForLeave: 'Vacation',
    delegatedResponsibilities:
      "I'll be on a family vacation during these days. Please contact me via phone for any emergencies.",
    additionalComments:
      "I'm looking forward to some quality time with my family.",
    requestStatus: 'approved',
    acknowledgement: true,
  },
  {
    startDate: '2023-08-15',
    endDate: '2023-08-16',
    reasonForLeave: 'Bereavement',
    delegatedResponsibilities:
      "I'm attending a funeral for a close friend during these days. My coworker, Mark, is aware and will cover my tasks.",
    additionalComments:
      "It's a difficult time, and I appreciate your support during this period.",
    requestStatus: 'approved',
    acknowledgement: true,
  },
  {
    startDate: '2023-11-02',
    endDate: '2023-11-02',
    reasonForLeave: 'Jury Duty',
    delegatedResponsibilities:
      "I've been summoned for jury duty on this day. I'll provide any necessary documentation from the court.",
    additionalComments:
      "I'll fulfill my civic duty and return to work the next day.",
    requestStatus: 'approved',
    acknowledgement: true,
  },
  {
    startDate: '2023-06-10',
    endDate: '2023-06-10',
    reasonForLeave: 'Military',
    delegatedResponsibilities:
      "I have a mandatory military training on this day. I'll be unavailable during this time.",
    additionalComments: 'This training is part of my reserve duty commitment.',
    requestStatus: 'approved',
    acknowledgement: true,
  },
  {
    startDate: '2023-04-05',
    endDate: '2023-04-06',
    reasonForLeave: 'Other',
    delegatedResponsibilities:
      "I'm taking a short leave to focus on a personal project. My teammate, Lisa, will assist with any urgent matters.",
    additionalComments:
      "I'm excited about this project and will share updates when I return.",
    requestStatus: 'approved',
    acknowledgement: true,
  },
  {
    startDate: '2023-05-10',
    endDate: '2023-05-15',
    reasonForLeave: 'Vacation',
    delegatedResponsibilities:
      'During my absence, my colleague John will handle my tasks. Please refer to him for any questions.',
    additionalComments:
      'I plan to visit my family during this vacation and will be unreachable during this time.',
    requestStatus: 'approved',
    acknowledgement: true,
  },
  {
    startDate: '2023-07-20',
    endDate: '2023-07-22',
    reasonForLeave: 'Medical',
    delegatedResponsibilities:
      'I have a scheduled medical appointment on these dates. My supervisor, Sarah, is aware and will cover for me.',
    additionalComments:
      "This is a follow-up appointment for a previous condition. I'll provide any necessary medical documents.",
    requestStatus: 'approved',
    acknowledgement: true,
  },
  {
    startDate: '2023-09-05',
    endDate: '2023-09-06',
    reasonForLeave: 'Education',
    delegatedResponsibilities:
      "I'll be attending a two-day workshop on web development. Please contact me via email if needed.",
    additionalComments:
      'This workshop will help improve my skills as a TypeScript developer.',
    requestStatus: 'approved',
    acknowledgement: true,
  },
  {
    startDate: '2023-07-12',
    endDate: '2023-07-13',
    reasonForLeave: 'Other',
    delegatedResponsibilities:
      'I need to take a personal leave for these two days to address some family matters.',
    additionalComments:
      'I appreciate your understanding in this matter and will ensure minimal disruption to work.',
    requestStatus: 'approved',
    acknowledgement: true,
  },
  {
    startDate: '2023-10-01',
    endDate: '2023-10-02',
    reasonForLeave: 'Religious',
    delegatedResponsibilities:
      "I'll be observing a religious holiday during these dates. My tasks are handed over to Tom during my absence.",
    additionalComments:
      'This holiday is significant to my faith, and I appreciate your support.',
    requestStatus: 'approved',
    acknowledgement: true,
  },
  {
    startDate: '2023-05-25',
    endDate: '2023-05-27',
    reasonForLeave: 'Vacation',
    delegatedResponsibilities:
      "I'll be on a family vacation during these days. Please contact me via phone for any emergencies.",
    additionalComments:
      "I'm looking forward to some quality time with my family.",
    requestStatus: 'approved',
    acknowledgement: true,
  },
  {
    startDate: '2023-08-15',
    endDate: '2023-08-16',
    reasonForLeave: 'Bereavement',
    delegatedResponsibilities:
      "I'm attending a funeral for a close friend during these days. My coworker, Mark, is aware and will cover my tasks.",
    additionalComments:
      "It's a difficult time, and I appreciate your support during this period.",
    requestStatus: 'approved',
    acknowledgement: true,
  },
  {
    startDate: '2023-11-02',
    endDate: '2023-11-02',
    reasonForLeave: 'Jury Duty',
    delegatedResponsibilities:
      "I've been summoned for jury duty on this day. I'll provide any necessary documentation from the court.",
    additionalComments:
      "I'll fulfill my civic duty and return to work the next day.",
    requestStatus: 'approved',
    acknowledgement: true,
  },
  {
    startDate: '2023-06-10',
    endDate: '2023-06-10',
    reasonForLeave: 'Military',
    delegatedResponsibilities:
      "I have a mandatory military training on this day. I'll be unavailable during this time.",
    additionalComments: 'This training is part of my reserve duty commitment.',
    requestStatus: 'approved',
    acknowledgement: true,
  },
  {
    startDate: '2023-04-05',
    endDate: '2023-04-06',
    reasonForLeave: 'Other',
    delegatedResponsibilities:
      "I'm taking a short leave to focus on a personal project. My teammate, Lisa, will assist with any urgent matters.",
    additionalComments:
      "I'm excited about this project and will share updates when I return.",
    requestStatus: 'approved',
    acknowledgement: true,
  },
  {
    startDate: '2023-06-10',
    endDate: '2023-06-15',
    reasonForLeave: 'Vacation',
    delegatedResponsibilities:
      'During my absence, my colleague John will handle my tasks. Please contact him for any work-related matters.',
    additionalComments:
      "I'm planning to travel to a tropical destination for relaxation and exploration.",
    requestStatus: 'approved',
    acknowledgement: true,
  },
  {
    startDate: '2023-08-20',
    endDate: '2023-08-22',
    reasonForLeave: 'Medical',
    delegatedResponsibilities:
      "I have a scheduled medical procedure on these dates. Dr. Smith will be performing the procedure, and I'll provide medical documentation.",
    additionalComments:
      'This procedure is a routine check-up to ensure my health is in good condition.',
    requestStatus: 'approved',
    acknowledgement: true,
  },
  {
    startDate: '2023-09-05',
    endDate: '2023-09-06',
    reasonForLeave: 'Education',
    delegatedResponsibilities:
      "I'll be attending an intensive coding bootcamp to enhance my web development skills. In my absence, please reach out to my mentor, Sarah.",
    additionalComments:
      'This bootcamp is an opportunity for me to learn from industry experts and collaborate with fellow developers.',
    requestStatus: 'approved',
    acknowledgement: true,
  },
  {
    startDate: '2023-07-12',
    endDate: '2023-07-13',
    reasonForLeave: 'Other',
    delegatedResponsibilities:
      'I need to take a short leave for personal reasons. During this time, my coworker, Lisa, has agreed to assist with my tasks.',
    additionalComments:
      'I value my privacy, and I appreciate your understanding in granting this leave.',
    requestStatus: 'approved',
    acknowledgement: true,
  },
  {
    startDate: '2023-11-01',
    endDate: '2023-11-01',
    reasonForLeave: 'Religious',
    delegatedResponsibilities:
      "I'll be observing a religious holiday on this day. My tasks are covered by my colleague, David.",
    additionalComments:
      "This holiday holds significant spiritual meaning for me, and I'll spend the day in reflection and worship.",
    requestStatus: 'approved',
    acknowledgement: true,
  },
  {
    startDate: '2023-05-25',
    endDate: '2023-05-27',
    reasonForLeave: 'Vacation',
    delegatedResponsibilities:
      "I'll be traveling with my family for a short vacation. In case of emergencies, you can reach me on my mobile phone.",
    additionalComments:
      "Quality time with family is essential, and I'm excited about this trip.",
    requestStatus: 'approved',
    acknowledgement: true,
  },
  {
    startDate: '2023-08-15',
    endDate: '2023-08-16',
    reasonForLeave: 'Bereavement',
    delegatedResponsibilities:
      "I'm attending the funeral of a dear friend during these days. My coworker, Emily, will handle my work.",
    additionalComments:
      'Support from friends and colleagues is appreciated during this challenging time.',
    requestStatus: 'approved',
    acknowledgement: true,
  },
  {
    startDate: '2023-11-02',
    endDate: '2023-11-02',
    reasonForLeave: 'Jury Duty',
    delegatedResponsibilities:
      "I've been selected for jury duty on this day. I'll provide the necessary documentation from the court.",
    additionalComments:
      'I consider it my civic duty to participate in the legal process.',
    requestStatus: 'approved',
    acknowledgement: true,
  },
  {
    startDate: '2023-07-10',
    endDate: '2023-07-10',
    reasonForLeave: 'Military',
    delegatedResponsibilities:
      "I have a mandatory military training on this day. I'll be focused on my training and unavailable.",
    additionalComments:
      'This training is part of my commitment to serve in the reserve forces.',
    requestStatus: 'approved',
    acknowledgement: true,
  },
  {
    startDate: '2023-04-05',
    endDate: '2023-04-06',
    reasonForLeave: 'Other',
    delegatedResponsibilities:
      "I'm taking a short leave to work on a personal coding project. My teammate, Michael, is aware and can handle any urgent matters.",
    additionalComments:
      'This project is an exciting opportunity for me to apply and expand my programming skills.',
    requestStatus: 'approved',
    acknowledgement: true,
  },
  {
    startDate: '2023-04-10',
    endDate: '2023-04-15',
    reasonForLeave: 'Vacation',
    delegatedResponsibilities:
      'During my absence, my colleague John will handle my tasks. Please refer to him for any questions.',
    additionalComments:
      'I plan to visit my family during this vacation and will be unreachable during this time.',
    requestStatus: 'approved',
    acknowledgement: true,
  },
  {
    startDate: '2023-06-20',
    endDate: '2023-06-22',
    reasonForLeave: 'Medical',
    delegatedResponsibilities:
      'I have a scheduled medical appointment on these dates. My supervisor, Sarah, is aware and will cover for me.',
    additionalComments:
      "This is a follow-up appointment for a previous condition. I'll provide any necessary medical documents.",
    requestStatus: 'approved',
    acknowledgement: true,
  },
  {
    startDate: '2023-09-05',
    endDate: '2023-09-06',
    reasonForLeave: 'Education',
    delegatedResponsibilities:
      "I'll be attending a two-day workshop on web development. Please contact me via email if needed.",
    additionalComments:
      'This workshop will help improve my skills as a TypeScript developer.',
    requestStatus: 'approved',
    acknowledgement: true,
  },
  {
    startDate: '2023-07-12',
    endDate: '2023-07-13',
    reasonForLeave: 'Other',
    delegatedResponsibilities:
      'I need to take a personal leave for these two days to address some family matters.',
    additionalComments:
      'I appreciate your understanding in this matter and will ensure minimal disruption to work.',
    requestStatus: 'approved',
    acknowledgement: true,
  },
  {
    startDate: '2023-10-01',
    endDate: '2023-10-02',
    reasonForLeave: 'Religious',
    delegatedResponsibilities:
      "I'll be observing a religious holiday during these dates. My tasks are handed over to Tom during my absence.",
    additionalComments:
      'This holiday is significant to my faith, and I appreciate your support.',
    requestStatus: 'approved',
    acknowledgement: true,
  },
  {
    startDate: '2023-05-25',
    endDate: '2023-05-27',
    reasonForLeave: 'Vacation',
    delegatedResponsibilities:
      "I'll be on a family vacation during these days. Please contact me via phone for any emergencies.",
    additionalComments:
      "I'm looking forward to some quality time with my family.",
    requestStatus: 'approved',
    acknowledgement: true,
  },
  {
    startDate: '2023-08-15',
    endDate: '2023-08-16',
    reasonForLeave: 'Bereavement',
    delegatedResponsibilities:
      "I'm attending a funeral for a close friend during these days. My coworker, Mark, is aware and will cover my tasks.",
    additionalComments:
      "It's a difficult time, and I appreciate your support during this period.",
    requestStatus: 'approved',
    acknowledgement: true,
  },
  {
    startDate: '2023-11-02',
    endDate: '2023-11-02',
    reasonForLeave: 'Jury Duty',
    delegatedResponsibilities:
      "I've been summoned for jury duty on this day. I'll provide any necessary documentation from the court.",
    additionalComments:
      "I'll fulfill my civic duty and return to work the next day.",
    requestStatus: 'approved',
    acknowledgement: true,
  },
  {
    startDate: '2023-06-10',
    endDate: '2023-06-10',
    reasonForLeave: 'Military',
    delegatedResponsibilities:
      "I have a mandatory military training on this day. I'll be unavailable during this time.",
    additionalComments: 'This training is part of my reserve duty commitment.',
    requestStatus: 'approved',
    acknowledgement: true,
  },
  {
    startDate: '2023-04-05',
    endDate: '2023-04-06',
    reasonForLeave: 'Other',
    delegatedResponsibilities:
      "I'm taking a short leave to focus on a personal project. My teammate, Lisa, will assist with any urgent matters.",
    additionalComments:
      "I'm excited about this project and will share updates when I return.",
    requestStatus: 'approved',
    acknowledgement: true,
  },
  {
    startDate: '2023-04-15',
    endDate: '2023-04-20',
    reasonForLeave: 'Vacation',
    delegatedResponsibilities:
      'During my absence, my colleague Sarah will handle my tasks. Please contact her for any work-related matters.',
    additionalComments:
      "I'm planning to explore a new city and unwind during this vacation.",
    requestStatus: 'approved',
    acknowledgement: true,
  },
  {
    startDate: '2023-07-22',
    endDate: '2023-07-23',
    reasonForLeave: 'Medical',
    delegatedResponsibilities:
      'I have a scheduled medical checkup on these dates. My doctor, Dr. Johnson, will provide any necessary documentation.',
    additionalComments:
      'This checkup is part of my routine health maintenance.',
    requestStatus: 'approved',
    acknowledgement: true,
  },
  {
    startDate: '2023-09-05',
    endDate: '2023-09-07',
    reasonForLeave: 'Education',
    delegatedResponsibilities:
      "I'll be attending an advanced web development workshop. In my absence, please reach out to my mentor, John.",
    additionalComments:
      'This workshop is a fantastic opportunity to learn cutting-edge web development techniques.',
    requestStatus: 'approved',
    acknowledgement: true,
  },
  {
    startDate: '2023-08-10',
    endDate: '2023-08-10',
    reasonForLeave: 'Other',
    delegatedResponsibilities:
      'I need to take a personal day for self-care and relaxation. My colleague Lisa will cover for me.',
    additionalComments:
      'Mental health is essential, and I appreciate your support in granting this leave.',
    requestStatus: 'approved',
    acknowledgement: true,
  },
  {
    startDate: '2023-11-25',
    endDate: '2023-11-25',
    reasonForLeave: 'Religious',
    delegatedResponsibilities:
      "I'll be observing a religious holiday on this day. My tasks are assigned to my teammate, Michael.",
    additionalComments:
      "This day is significant in my faith, and I'll spend it in prayer and reflection.",
    requestStatus: 'approved',
    acknowledgement: true,
  },
  {
    startDate: '2023-05-10',
    endDate: '2023-05-15',
    reasonForLeave: 'Vacation',
    delegatedResponsibilities:
      "I'll be on a family vacation during these days. In case of emergencies, you can reach me on my mobile phone.",
    additionalComments:
      "Quality time with family is precious, and I'm looking forward to this trip.",
    requestStatus: 'approved',
    acknowledgement: true,
  },
  {
    startDate: '2023-08-16',
    endDate: '2023-08-17',
    reasonForLeave: 'Bereavement',
    delegatedResponsibilities:
      "I'm attending the funeral of a dear friend during these days. My coworker, Emily, is aware and will cover my tasks.",
    additionalComments:
      'Support from friends and colleagues is appreciated during this challenging time.',
    requestStatus: 'approved',
    acknowledgement: true,
  },
  {
    startDate: '2023-11-02',
    endDate: '2023-11-02',
    reasonForLeave: 'Jury Duty',
    delegatedResponsibilities:
      "I've been selected for jury duty on this day. I'll provide the necessary documentation from the court.",
    additionalComments:
      'I consider it my civic duty to participate in the legal process.',
    requestStatus: 'approved',
    acknowledgement: true,
  },
  {
    startDate: '2023-06-15',
    endDate: '2023-06-15',
    reasonForLeave: 'Military',
    delegatedResponsibilities:
      "I have a mandatory military training on this day. I'll be focused on my training and unavailable.",
    additionalComments:
      'This training is part of my commitment to serve in the reserve forces.',
    requestStatus: 'approved',
    acknowledgement: true,
  },
  {
    startDate: '2023-03-01',
    endDate: '2023-03-02',
    reasonForLeave: 'Other',
    delegatedResponsibilities:
      "I'm taking a short leave to work on a personal coding project. My teammate, David, is aware and can handle any urgent matters.",
    additionalComments:
      'This project is an exciting opportunity for me to apply and expand my programming skills.',
    requestStatus: 'approved',
    acknowledgement: true,
  },
  {
    startDate: '2023-05-10',
    endDate: '2023-05-15',
    reasonForLeave: 'Vacation',
    delegatedResponsibilities:
      'During my absence, my colleague, John, will be taking over my tasks. You can reach out to him for any work-related issues.',
    additionalComments:
      "I'm planning to visit the beautiful beaches of Hawaii and unwind during this vacation.",
    requestStatus: 'approved',
    acknowledgement: true,
  },
  {
    startDate: '2023-07-22',
    endDate: '2023-07-23',
    reasonForLeave: 'Medical',
    delegatedResponsibilities:
      "I have a scheduled medical appointment on these dates. Dr. Smith will be attending to me, and I'll provide any necessary medical documentation.",
    additionalComments:
      'This appointment is for a routine check-up to ensure my health is in good condition.',
    requestStatus: 'approved',
    acknowledgement: true,
  },
  {
    startDate: '2023-09-05',
    endDate: '2023-09-07',
    reasonForLeave: 'Education',
    delegatedResponsibilities:
      "I'll be participating in an intensive web development bootcamp. In my absence, please contact my mentor, Sarah, for assistance.",
    additionalComments:
      'This bootcamp is a fantastic opportunity for me to upgrade my skills and learn from industry experts.',
    requestStatus: 'approved',
    acknowledgement: true,
  },
  {
    startDate: '2023-08-10',
    endDate: '2023-08-10',
    reasonForLeave: 'Other',
    delegatedResponsibilities:
      'I need to take a personal day for self-care and relaxation. My colleague, Lisa, will cover my responsibilities during this time.',
    additionalComments:
      'Mental health is essential, and I appreciate your understanding and support in granting this leave.',
    requestStatus: 'approved',
    acknowledgement: true,
  },
  {
    startDate: '2023-11-25',
    endDate: '2023-11-25',
    reasonForLeave: 'Religious',
    delegatedResponsibilities:
      "I'll be observing a religious holiday on this day. My tasks are assigned to my teammate, Michael, during my absence.",
    additionalComments:
      "This holiday is significant in my faith, and I'll spend it in reflection and worship.",
    requestStatus: 'approved',
    acknowledgement: true,
  },
  {
    startDate: '2023-05-10',
    endDate: '2023-05-15',
    reasonForLeave: 'Vacation',
    delegatedResponsibilities:
      "I'll be on a family vacation during these dates. In case of emergencies, you can reach me on my mobile phone.",
    additionalComments:
      "Quality time with family is precious, and I'm looking forward to this trip.",
    requestStatus: 'approved',
    acknowledgement: true,
  },
  {
    startDate: '2023-08-16',
    endDate: '2023-08-17',
    reasonForLeave: 'Bereavement',
    delegatedResponsibilities:
      "I'm attending the funeral of a dear friend during these days. My coworker, Emily, is aware and will cover my tasks.",
    additionalComments:
      'Your support during this challenging time is greatly appreciated.',
    requestStatus: 'approved',
    acknowledgement: true,
  },
  {
    startDate: '2023-11-02',
    endDate: '2023-11-02',
    reasonForLeave: 'Jury Duty',
    delegatedResponsibilities:
      "I've been selected for jury duty on this day. I'll provide the necessary documentation from the court.",
    additionalComments:
      'I consider it my civic duty to participate in the legal process.',
    requestStatus: 'approved',
    acknowledgement: true,
  },
  {
    startDate: '2023-06-15',
    endDate: '2023-06-15',
    reasonForLeave: 'Military',
    delegatedResponsibilities:
      "I have a mandatory military training on this day. I'll be focused on my training and unavailable.",
    additionalComments:
      'This training is part of my commitment to serve in the reserve forces.',
    requestStatus: 'approved',
    acknowledgement: true,
  },
  {
    startDate: '2023-03-01',
    endDate: '2023-03-02',
    reasonForLeave: 'Other',
    delegatedResponsibilities:
      "I'm taking a short leave to work on a personal coding project. My teammate, David, is aware and can handle any urgent matters.",
    additionalComments:
      'This project is an exciting opportunity for me to apply and expand my programming skills.',
    requestStatus: 'approved',
    acknowledgement: true,
  },
  {
    startDate: '2023-04-10',
    endDate: '2023-04-12',
    reasonForLeave: 'Vacation',
    delegatedResponsibilities:
      'During my absence, my colleague, Alice, will handle my tasks. You can contact her at alice@email.com for any urgent matters.',
    additionalComments:
      "I'm excited about this vacation to explore new places and recharge.",
    requestStatus: 'approved',
    acknowledgement: true,
  },
  {
    startDate: '2023-07-22',
    endDate: '2023-07-23',
    reasonForLeave: 'Medical',
    delegatedResponsibilities:
      "I have a scheduled medical check-up on these dates. Dr. Smith will be conducting the check-up, and I'll provide medical records if required.",
    additionalComments:
      'This is a routine health check to ensure everything is in order.',
    requestStatus: 'approved',
    acknowledgement: true,
  },
  {
    startDate: '2023-09-05',
    endDate: '2023-09-07',
    reasonForLeave: 'Education',
    delegatedResponsibilities:
      "I'll be attending a web development conference. In my absence, please reach out to my colleague, John, for any assistance.",
    additionalComments:
      'This conference is a great opportunity to learn and network with fellow developers.',
    requestStatus: 'approved',
    acknowledgement: true,
  },
  {
    startDate: '2023-08-15',
    endDate: '2023-08-15',
    reasonForLeave: 'Other',
    delegatedResponsibilities:
      'I need a day off for personal reasons. My teammate, Sarah, will take over my responsibilities during this time.',
    additionalComments:
      'I appreciate your understanding of this personal matter.',
    requestStatus: 'approved',
    acknowledgement: true,
  },
  {
    startDate: '2023-11-25',
    endDate: '2023-11-25',
    reasonForLeave: 'Religious',
    delegatedResponsibilities:
      "I'll be observing a religious holiday on this day. My tasks are assigned to my coworker, Michael, during my absence.",
    additionalComments:
      'This is a special day of reflection and worship in my faith.',
    requestStatus: 'approved',
    acknowledgement: true,
  },
  {
    startDate: '2023-06-10',
    endDate: '2023-06-12',
    reasonForLeave: 'Vacation',
    delegatedResponsibilities:
      "I'll be on a family vacation during these days. In case of emergencies, you can contact me on my mobile phone.",
    additionalComments:
      "Spending quality time with family is important to me, and I'm looking forward to this trip.",
    requestStatus: 'approved',
    acknowledgement: true,
  },
  {
    startDate: '2023-08-16',
    endDate: '2023-08-17',
    reasonForLeave: 'Bereavement',
    delegatedResponsibilities:
      "I'm attending a funeral for a close friend during these days. My coworker, Emily, is aware and will cover my tasks.",
    additionalComments:
      'Support from friends and colleagues is appreciated during this difficult time.',
    requestStatus: 'approved',
    acknowledgement: true,
  },
  {
    startDate: '2023-11-02',
    endDate: '2023-11-02',
    reasonForLeave: 'Jury Duty',
    delegatedResponsibilities:
      "I've been summoned for jury duty on this day. I'll provide the necessary documentation from the court.",
    additionalComments:
      'I see this as an important civic duty and will return to work the following day.',
    requestStatus: 'approved',
    acknowledgement: true,
  },
  {
    startDate: '2023-06-15',
    endDate: '2023-06-15',
    reasonForLeave: 'Military',
    delegatedResponsibilities:
      "I have a mandatory military training on this day. I'll be focused on my training and unavailable.",
    additionalComments:
      'This training is part of my commitment to serve in the reserve forces.',
    requestStatus: 'approved',
    acknowledgement: true,
  },
  {
    startDate: '2023-04-05',
    endDate: '2023-04-06',
    reasonForLeave: 'Other',
    delegatedResponsibilities:
      "I'm taking a short leave to work on a personal coding project. My teammate, David, is aware and can handle any urgent matters.",
    additionalComments:
      'This project is an exciting opportunity for me to apply and expand my programming skills.',
    requestStatus: 'approved',
    acknowledgement: true,
  },
];

function returnLeaveRequestsBodies({
  userDocs,
  leaveRequestsArray,
}: {
  userDocs: DirectoryUserDocument[];
  leaveRequestsArray: LeaveRequestsArray;
}) {
  return userDocs.flatMap((userDoc) => {
    const { _id, username, department } = userDoc;

    // Randomly select a number of leave requests to return
    const numberOfLeaveRequestsToReturn = Math.floor(Math.random() * 7);

    // shuffle the leave requests
    const shuffledLeaveRequests = shuffleArray(leaveRequestsArray);

    // return the first n leave requests
    const leaveRequestsToReturn = shuffledLeaveRequests.slice(
      0,
      numberOfLeaveRequestsToReturn
    );

    const leaveRequestsBodies = leaveRequestsToReturn.map((leaveRequest) => {
      // filter the user docs by same department as current user's department
      // because the delegated user should be from the same department as leave requesting user
      const filteredUsersDocsByDepartment = userDocs.filter(
        (userDoc) => userDoc.department === department
      );

      // pick a random user doc from the filtered user docs
      const randomUserDoc =
        filteredUsersDocsByDepartment[
          Math.floor(Math.random() * filteredUsersDocsByDepartment.length)
        ];

      // assign the random user doc's name to the current user's delegatedToEmployee field
      const { firstName, middleName, lastName } = randomUserDoc;
      const delegatedToEmployee = `${firstName} ${middleName} ${lastName}`;

      const leaveRequestBody = {
        ...leaveRequest,
        userId: _id,
        username,
        delegatedToEmployee,
      };

      return leaveRequestBody;
    });

    return leaveRequestsBodies;
  });
}

export { leaveRequestsArray, returnLeaveRequestsBodies };
export type { LeaveRequestsArray };
