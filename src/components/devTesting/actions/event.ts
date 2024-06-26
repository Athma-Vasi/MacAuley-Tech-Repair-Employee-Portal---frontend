import { replaceLastCommaWithAnd, shuffleArray } from '../../../utils';

type EventsArray = {
  eventTitle: string;
  eventKind: string;
  eventStartDate: string;
  eventEndDate: string;
  eventStartTime: string;
  eventEndTime: string;
  eventDescription: string;
  eventLocation: string;
  requiredItems: string;
  rsvpDeadline: string;
}[];

const eventsArray: EventsArray = [
  {
    eventTitle: 'Web Development Masterclass',
    eventKind: 'Workshop',
    eventStartDate: '2024-09-30',
    eventEndDate: '2024-10-01',
    eventStartTime: '10:00',
    eventEndTime: '16:30',
    eventDescription: 'Join us for an intensive web development workshop.',
    eventLocation: '123 Main Street, Cityville',
    requiredItems: 'Laptop, Notebook, Pen',
    rsvpDeadline: '2024-09-25',
  },
  {
    eventTitle: 'Tech Talk: JavaScript Trends',
    eventKind: 'Tech Talk',
    eventStartDate: '2024-10-15',
    eventEndDate: '2024-10-15',
    eventStartTime: '15:00',
    eventEndTime: '16:30',
    eventDescription: 'Discover the latest trends in JavaScript development.',
    eventLocation: 'Online',
    requiredItems: 'Computer with internet access',
    rsvpDeadline: '2024-10-10',
  },
  {
    eventTitle: 'Women in Tech Conference',
    eventKind: 'Conference',
    eventStartDate: '2024-11-05',
    eventEndDate: '2024-11-07',
    eventStartTime: '09:00',
    eventEndTime: '17:00',
    eventDescription: 'Empowering women in the tech industry.',
    eventLocation: 'Convention Center, Tech City',
    requiredItems: 'Badge, Notebook, Networking spirit',
    rsvpDeadline: '2024-10-25',
  },
  {
    eventTitle: 'Frontend Frameworks Workshop',
    eventKind: 'Workshop',
    eventStartDate: '2024-10-20',
    eventEndDate: '2024-10-21',
    eventStartTime: '10:30',
    eventEndTime: '16:00',
    eventDescription: 'Learn the latest frontend frameworks.',
    eventLocation: '789 Elm Street, Codeville',
    requiredItems: 'Laptop, Snacks, Enthusiasm',
    rsvpDeadline: '2024-10-15',
  },
  {
    eventTitle: 'Charity Gala Night',
    eventKind: 'Charity',
    eventStartDate: '2024-12-10',
    eventEndDate: '2024-12-10',
    eventStartTime: '19:00',
    eventEndTime: '23:00',
    eventDescription: 'Support a noble cause and enjoy an evening of fun.',
    eventLocation: 'Grand Ballroom, Charity Plaza',
    requiredItems: 'Donation, Formal Attire',
    rsvpDeadline: '2024-12-01',
  },
  {
    eventTitle: 'AI in Healthcare Seminar',
    eventKind: 'Seminar',
    eventStartDate: '2024-11-18',
    eventEndDate: '2024-11-18',
    eventStartTime: '14:00',
    eventEndTime: '16:00',
    eventDescription: 'Explore the impact of AI in healthcare.',
    eventLocation: 'Medical Center Auditorium',
    requiredItems: 'Badge, Notepad, Curiosity',
    rsvpDeadline: '2024-11-10',
  },
  {
    eventTitle: 'Networking Mixer',
    eventKind: 'Networking',
    eventStartDate: '2024-09-27',
    eventEndDate: '2024-09-27',
    eventStartTime: '18:30',
    eventEndTime: '20:30',
    eventDescription: 'Connect with professionals in the tech industry.',
    eventLocation: 'Rooftop Lounge, Skyline Tower',
    requiredItems: 'Business Cards, Smile',
    rsvpDeadline: '2024-09-20',
  },
  {
    eventTitle: 'Team Building Retreat',
    eventKind: 'Team Building',
    eventStartDate: '2024-10-08',
    eventEndDate: '2024-10-10',
    eventStartTime: '09:00',
    eventEndTime: '17:00',
    eventDescription: "Strengthen your team's bonds in a scenic retreat.",
    eventLocation: 'Mountain Lodge, Nature Haven',
    requiredItems: 'Comfortable Clothes, Team Spirit',
    rsvpDeadline: '2024-09-30',
  },
  {
    eventTitle: 'Awards Night: Tech Excellence',
    eventKind: 'Awards',
    eventStartDate: '2024-11-30',
    eventEndDate: '2024-11-30',
    eventStartTime: '19:30',
    eventEndTime: '22:00',
    eventDescription: 'Celebrate outstanding achievements in the tech world.',
    eventLocation: 'Elegant Banquet Hall, Tech Center',
    requiredItems: 'Invitation, Elegance',
    rsvpDeadline: '2024-11-20',
  },
  {
    eventTitle: 'Julia Programming Workshop',
    eventKind: 'Workshop',
    eventStartDate: '2024-10-05',
    eventEndDate: '2024-10-06',
    eventStartTime: '11:00',
    eventEndTime: '15:30',
    eventDescription: 'Dive into the world of Julia programming.',
    eventLocation: '456 Oak Avenue, Code City',
    requiredItems: 'Laptop, Curiosity, Julia IDE',
    rsvpDeadline: '2024-09-28',
  },
  {
    eventTitle: 'Webinar: Extending the Lifespan of Your Devices',
    eventKind: 'Webinar',
    eventStartDate: '2024-10-15',
    eventEndDate: '2024-10-15',
    eventStartTime: '14:00',
    eventEndTime: '15:30',
    eventDescription:
      'Learn tips and tricks to keep your tech devices running smoothly.',
    eventLocation: 'Online',
    requiredItems: 'Computer, Internet Connection',
    rsvpDeadline: '2024-10-10',
  },
  {
    eventTitle: 'Workshop: DIY Phone Screen Repair',
    eventKind: 'Workshop',
    eventStartDate: '2024-11-05',
    eventEndDate: '2024-11-05',
    eventStartTime: '10:30',
    eventEndTime: '12:00',
    eventDescription: 'Hands-on workshop on fixing cracked phone screens.',
    eventLocation: 'Tech Repair Shop, Main Street',
    requiredItems: 'Damaged Phone, Replacement Parts',
    rsvpDeadline: '2024-10-30',
  },
  {
    eventTitle: 'Seminar: Data Backup and Recovery Strategies',
    eventKind: 'Seminar',
    eventStartDate: '2024-12-10',
    eventEndDate: '2024-12-10',
    eventStartTime: '15:00',
    eventEndTime: '16:30',
    eventDescription:
      'Discover the importance of data backup and how to recover lost data.',
    eventLocation: 'Community Center, Tech Town',
    requiredItems: 'Laptop, Notebook',
    rsvpDeadline: '2024-12-05',
  },
  {
    eventTitle: 'Conference: Future of Tech Repair',
    eventKind: 'Conference',
    eventStartDate: '2024-10-20',
    eventEndDate: '2024-10-22',
    eventStartTime: '09:00',
    eventEndTime: '17:00',
    eventDescription:
      'Explore the latest advancements in tech repair and maintenance.',
    eventLocation: 'Tech Convention Center, Innovation Plaza',
    requiredItems: 'Badge, Networking Cards',
    rsvpDeadline: '2024-10-10',
  },
  {
    eventTitle: 'Networking Mixer: Tech Enthusiasts Unite',
    eventKind: 'Networking',
    eventStartDate: '2024-09-30',
    eventEndDate: '2024-09-30',
    eventStartTime: '18:30',
    eventEndTime: '20:30',
    eventDescription:
      'Connect with fellow tech enthusiasts and repair professionals.',
    eventLocation: 'Rooftop Lounge, RepairTech Tower',
    requiredItems: 'Business Cards, Enthusiasm',
    rsvpDeadline: '2024-09-25',
  },
  {
    eventTitle: 'Tech Talk: Solving Common Computer Issues',
    eventKind: 'Tech Talk',
    eventStartDate: '2024-11-18',
    eventEndDate: '2024-11-18',
    eventStartTime: '14:00',
    eventEndTime: '15:30',
    eventDescription:
      'Get insights into troubleshooting and fixing computer problems.',
    eventLocation: 'Tech Repair Cafe, Downtown',
    requiredItems: 'Notebook, Curiosity',
    rsvpDeadline: '2024-11-13',
  },
  {
    eventTitle: 'Charity Repairathon',
    eventKind: 'Charity',
    eventStartDate: '2024-10-08',
    eventEndDate: '2024-10-08',
    eventStartTime: '11:00',
    eventEndTime: '16:00',
    eventDescription:
      'Repair tech devices for a good cause - helping those in need.',
    eventLocation: 'Community Hall, Repairville',
    requiredItems: 'Tools, Spare Parts',
    rsvpDeadline: '2024-09-30',
  },
  {
    eventTitle: 'Team Building: Tech Repair Challenge',
    eventKind: 'Team Building',
    eventStartDate: '2024-11-30',
    eventEndDate: '2024-12-02',
    eventStartTime: '09:00',
    eventEndTime: '17:00',
    eventDescription:
      "Strengthen your tech repair team's skills in a fun challenge.",
    eventLocation: 'Adventure Retreat Center, Repair Haven',
    requiredItems: 'Team Spirit, Problem-Solving Skills',
    rsvpDeadline: '2024-11-20',
  },
  {
    eventTitle: 'Tech Excellence Awards Gala',
    eventKind: 'Awards',
    eventStartDate: '2024-12-15',
    eventEndDate: '2024-12-15',
    eventStartTime: '19:30',
    eventEndTime: '22:00',
    eventDescription: 'Celebrate excellence in the tech repair industry.',
    eventLocation: 'Grand Ballroom, RepairTech Palace',
    requiredItems: 'Invitation, Elegance',
    rsvpDeadline: '2024-12-05',
  },
  {
    eventTitle: 'Tech Repair Hackathon',
    eventKind: 'Other',
    eventStartDate: '2024-10-25',
    eventEndDate: '2024-10-26',
    eventStartTime: '10:00',
    eventEndTime: '18:00',
    eventDescription:
      'A 24-hour hackathon to innovate in the tech repair industry.',
    eventLocation: 'Innovation Hub, Tech City',
    requiredItems: 'Laptop, Creativity',
    rsvpDeadline: '2024-10-18',
  },
  {
    eventTitle: 'Tech Repair Workshop: Smartphone Screen Fixing',
    eventKind: 'Workshop',
    eventStartDate: '2024-10-10',
    eventEndDate: '2024-10-10',
    eventStartTime: '13:00',
    eventEndTime: '15:00',
    eventDescription: 'Learn to repair smartphone screens like a pro.',
    eventLocation: 'Tech Repair Shop, Main Street',
    requiredItems: 'Damaged Phone, Replacement Parts',
    rsvpDeadline: '2024-10-05',
  },
  {
    eventTitle: 'Web Development Bootcamp',
    eventKind: 'Workshop',
    eventStartDate: '2024-11-15',
    eventEndDate: '2024-11-18',
    eventStartTime: '09:00',
    eventEndTime: '17:00',
    eventDescription: 'Intensive web development training for beginners.',
    eventLocation: 'Code Academy, Tech City',
    requiredItems: 'Laptop, Enthusiasm',
    rsvpDeadline: '2024-11-10',
  },
  {
    eventTitle: 'Networking Mixer: Tech and Code Enthusiasts',
    eventKind: 'Networking',
    eventStartDate: '2024-09-30',
    eventEndDate: '2024-09-30',
    eventStartTime: '18:30',
    eventEndTime: '20:30',
    eventDescription: 'Connect with fellow tech and code enthusiasts.',
    eventLocation: 'Rooftop Lounge, Tech Hub',
    requiredItems: 'Business Cards, Curiosity',
    rsvpDeadline: '2024-09-25',
  },
  {
    eventTitle: 'AI in Healthcare Seminar',
    eventKind: 'Seminar',
    eventStartDate: '2024-10-25',
    eventEndDate: '2024-10-25',
    eventStartTime: '14:00',
    eventEndTime: '16:00',
    eventDescription: 'Exploring the role of AI in revolutionizing healthcare.',
    eventLocation: 'Medical Center Auditorium',
    requiredItems: 'Notebook, Interest',
    rsvpDeadline: '2024-10-20',
  },
  {
    eventTitle: 'Tech Repair and Maintenance Conference',
    eventKind: 'Conference',
    eventStartDate: '2024-11-05',
    eventEndDate: '2024-11-07',
    eventStartTime: '09:00',
    eventEndTime: '17:00',
    eventDescription:
      'Discover the latest trends in tech repair and maintenance.',
    eventLocation: 'Tech Convention Center, Innovation Plaza',
    requiredItems: 'Badge, Networking Cards',
    rsvpDeadline: '2024-10-25',
  },
  {
    eventTitle: 'Tech Talk: Cybersecurity Best Practices',
    eventKind: 'Tech Talk',
    eventStartDate: '2024-11-20',
    eventEndDate: '2024-11-20',
    eventStartTime: '15:30',
    eventEndTime: '17:00',
    eventDescription:
      'Learn how to protect your tech devices from cyber threats.',
    eventLocation: 'Online',
    requiredItems: 'Computer, Internet Connection',
    rsvpDeadline: '2024-11-15',
  },
  {
    eventTitle: 'Charity Tech Repair Event',
    eventKind: 'Charity',
    eventStartDate: '2024-12-10',
    eventEndDate: '2024-12-10',
    eventStartTime: '11:00',
    eventEndTime: '16:00',
    eventDescription: 'Repair tech devices for charity and make a difference.',
    eventLocation: 'Community Hall, Repairville',
    requiredItems: 'Tools, Spare Parts',
    rsvpDeadline: '2024-12-05',
  },
  {
    eventTitle: 'Julia Programming Workshop',
    eventKind: 'Workshop',
    eventStartDate: '2024-10-15',
    eventEndDate: '2024-10-16',
    eventStartTime: '10:00',
    eventEndTime: '15:00',
    eventDescription: 'Master the Julia programming language in two days.',
    eventLocation: 'Tech Learning Center, Code Town',
    requiredItems: 'Laptop, Curiosity',
    rsvpDeadline: '2024-10-10',
  },
  {
    eventTitle: 'Team Building Retreat: Tech Repair Challenge',
    eventKind: 'Team Building',
    eventStartDate: '2024-12-02',
    eventEndDate: '2024-12-04',
    eventStartTime: '09:00',
    eventEndTime: '17:00',
    eventDescription:
      'Bond with your tech repair team while tackling exciting challenges.',
    eventLocation: 'Adventure Retreat Center, Repair Haven',
    requiredItems: 'Team Spirit, Problem-Solving Skills',
    rsvpDeadline: '2024-11-20',
  },
  {
    eventTitle: 'Tech Excellence Awards Gala',
    eventKind: 'Awards',
    eventStartDate: '2024-12-15',
    eventEndDate: '2024-12-15',
    eventStartTime: '19:30',
    eventEndTime: '22:00',
    eventDescription:
      'Celebrate excellence in the tech repair and programming industries.',
    eventLocation: 'Grand Ballroom, Tech Excellence Center',
    requiredItems: 'Invitation, Elegance',
    rsvpDeadline: '2024-12-05',
  },
  {
    eventTitle: 'Webinar: Extending Device Lifespan',
    eventKind: 'Webinar',
    eventStartDate: '2024-10-15',
    eventEndDate: '2024-10-15',
    eventStartTime: '14:00',
    eventEndTime: '15:30',
    eventDescription: 'Learn how to prolong the life of your tech devices.',
    eventLocation: 'Online',
    requiredItems: 'Computer, Internet Connection',
    rsvpDeadline: '2024-10-10',
  },
  {
    eventTitle: 'Workshop: Smartphone Screen Repair',
    eventKind: 'Workshop',
    eventStartDate: '2024-11-05',
    eventEndDate: '2024-11-05',
    eventStartTime: '10:30',
    eventEndTime: '12:00',
    eventDescription: 'Hands-on training to fix cracked smartphone screens.',
    eventLocation: 'Tech Repair Center, Toronto',
    requiredItems: 'Damaged Phone, Repair Tools',
    rsvpDeadline: '2024-10-30',
  },
  {
    eventTitle: 'Seminar: Data Security in the Digital Age',
    eventKind: 'Seminar',
    eventStartDate: '2024-12-10',
    eventEndDate: '2024-12-10',
    eventStartTime: '15:00',
    eventEndTime: '16:30',
    eventDescription: 'Explore the importance of data security.',
    eventLocation: 'Conference Center, New York City',
    requiredItems: 'Notebook, Interest',
    rsvpDeadline: '2024-12-05',
  },
  {
    eventTitle: 'Conference: Tech Innovations Summit',
    eventKind: 'Conference',
    eventStartDate: '2024-11-20',
    eventEndDate: '2024-11-22',
    eventStartTime: '09:00',
    eventEndTime: '17:00',
    eventDescription:
      'Discover the latest tech innovations and repair solutions.',
    eventLocation: 'Tech Convention Center, San Francisco',
    requiredItems: 'Badge, Networking Cards',
    rsvpDeadline: '2024-11-10',
  },
  {
    eventTitle: 'Tech Talk: Artificial Intelligence Trends',
    eventKind: 'Tech Talk',
    eventStartDate: '2024-10-30',
    eventEndDate: '2024-10-30',
    eventStartTime: '16:00',
    eventEndTime: '17:30',
    eventDescription: 'Exploring the future of AI in tech and repair.',
    eventLocation: 'Tech Hub, Vancouver',
    requiredItems: 'Curiosity, Notebook',
    rsvpDeadline: '2024-10-25',
  },
  {
    eventTitle: 'Charity Tech Repair Drive',
    eventKind: 'Charity',
    eventStartDate: '2024-12-02',
    eventEndDate: '2024-12-02',
    eventStartTime: '11:00',
    eventEndTime: '15:00',
    eventDescription: 'Repair tech devices for charity and make an impact.',
    eventLocation: 'Community Hall, Ottawa',
    requiredItems: 'Tools, Spare Parts',
    rsvpDeadline: '2024-11-25',
  },
  {
    eventTitle: 'Python Programming Workshop',
    eventKind: 'Workshop',
    eventStartDate: '2024-10-15',
    eventEndDate: '2024-10-16',
    eventStartTime: '10:00',
    eventEndTime: '15:00',
    eventDescription: 'Master Python programming in two days.',
    eventLocation: 'Coding Academy, Boston',
    requiredItems: 'Laptop, Enthusiasm',
    rsvpDeadline: '2024-10-10',
  },
  {
    eventTitle: 'Team Building Retreat: Tech Repair Challenge',
    eventKind: 'Team Building',
    eventStartDate: '2024-12-05',
    eventEndDate: '2024-12-07',
    eventStartTime: '09:00',
    eventEndTime: '17:00',
    eventDescription:
      "Strengthen your tech repair team's skills while having fun.",
    eventLocation: 'Adventure Retreat Center, Seattle',
    requiredItems: 'Team Spirit, Problem-Solving Skills',
    rsvpDeadline: '2024-11-25',
  },
  {
    eventTitle: 'Tech Excellence Awards Gala',
    eventKind: 'Awards',
    eventStartDate: '2024-12-15',
    eventEndDate: '2024-12-15',
    eventStartTime: '19:30',
    eventEndTime: '22:00',
    eventDescription:
      'Celebrate excellence in the tech repair and programming industries.',
    eventLocation: 'Grand Ballroom, San Diego',
    requiredItems: 'Invitation, Elegance',
    rsvpDeadline: '2024-12-05',
  },
  {
    eventTitle: 'Hackathon: Innovate for Tech Repair',
    eventKind: 'Other',
    eventStartDate: '2024-11-10',
    eventEndDate: '2024-11-11',
    eventStartTime: '10:00',
    eventEndTime: '18:00',
    eventDescription:
      'A 24-hour hackathon to innovate in tech repair solutions.',
    eventLocation: 'Innovation Hub, Toronto',
    requiredItems: 'Laptop, Creativity',
    rsvpDeadline: '2024-11-05',
  },
  {
    eventTitle: 'Tech Repair Masterclass',
    eventKind: 'Workshop',
    eventStartDate: '2024-11-10',
    eventEndDate: '2024-11-10',
    eventStartTime: '09:30',
    eventEndTime: '12:00',
    eventDescription: 'Become a tech repair expert in this intensive workshop.',
    eventLocation: 'Tech Repair Institute, Toronto',
    requiredItems: 'Laptop, Enthusiasm',
    rsvpDeadline: '2024-11-05',
  },
  {
    eventTitle: 'Web Development Conference',
    eventKind: 'Conference',
    eventStartDate: '2024-10-25',
    eventEndDate: '2024-10-27',
    eventStartTime: '08:00',
    eventEndTime: '18:00',
    eventDescription: 'Explore the latest trends in web development.',
    eventLocation: 'Tech Center, Vancouver',
    requiredItems: 'Badge, Notebook',
    rsvpDeadline: '2024-10-15',
  },
  {
    eventTitle: 'Networking Mixer: Tech Innovators',
    eventKind: 'Networking',
    eventStartDate: '2024-09-20',
    eventEndDate: '2024-09-20',
    eventStartTime: '17:30',
    eventEndTime: '19:30',
    eventDescription: 'Connect with tech innovators and repair specialists.',
    eventLocation: 'Tech Hub, San Francisco',
    requiredItems: 'Business Cards, Curiosity',
    rsvpDeadline: '2024-09-15',
  },
  {
    eventTitle: 'Julia Programming Seminar',
    eventKind: 'Seminar',
    eventStartDate: '2024-11-18',
    eventEndDate: '2024-11-18',
    eventStartTime: '14:30',
    eventEndTime: '16:00',
    eventDescription: 'Deep dive into Julia programming language advancements.',
    eventLocation: 'Tech Community Center, Montreal',
    requiredItems: 'Notebook, Interest',
    rsvpDeadline: '2024-11-10',
  },
  {
    eventTitle: 'Tech Repair and Coding Symposium',
    eventKind: 'Conference',
    eventStartDate: '2024-12-05',
    eventEndDate: '2024-12-07',
    eventStartTime: '09:00',
    eventEndTime: '17:00',
    eventDescription:
      'An interdisciplinary event merging tech repair and coding.',
    eventLocation: 'Tech Convention Center, Toronto',
    requiredItems: 'Badge, Networking Cards',
    rsvpDeadline: '2024-11-25',
  },
  {
    eventTitle: 'Hackathon: IoT Repair Solutions',
    eventKind: 'Other',
    eventStartDate: '2024-10-30',
    eventEndDate: '2024-10-31',
    eventStartTime: '10:00',
    eventEndTime: '18:00',
    eventDescription: 'Create innovative IoT tech repair solutions in a day.',
    eventLocation: 'Innovation Hub, Ottawa',
    requiredItems: 'Laptop, Creativity',
    rsvpDeadline: '2024-10-25',
  },
  {
    eventTitle: 'Charity Tech Drive: Supporting Local Schools',
    eventKind: 'Charity',
    eventStartDate: '2024-12-15',
    eventEndDate: '2024-12-15',
    eventStartTime: '11:00',
    eventEndTime: '15:00',
    eventDescription: 'Repair tech devices to benefit local schools.',
    eventLocation: 'Community Center, New York City',
    requiredItems: 'Tools, Spare Parts',
    rsvpDeadline: '2024-12-10',
  },
  {
    eventTitle: 'Tech Talk: Quantum Computing Revolution',
    eventKind: 'Tech Talk',
    eventStartDate: '2024-11-15',
    eventEndDate: '2024-11-15',
    eventStartTime: '18:00',
    eventEndTime: '19:30',
    eventDescription: 'Explore the future of quantum computing in tech.',
    eventLocation: 'Tech Hub, Boston',
    requiredItems: 'Notebook, Curiosity',
    rsvpDeadline: '2024-11-10',
  },
  {
    eventTitle: 'Team Building Retreat: Tech Repair Challenge',
    eventKind: 'Team Building',
    eventStartDate: '2024-12-02',
    eventEndDate: '2024-12-04',
    eventStartTime: '09:00',
    eventEndTime: '17:00',
    eventDescription:
      "Strengthen your tech repair team's skills in a fun challenge.",
    eventLocation: 'Adventure Retreat Center, Seattle',
    requiredItems: 'Team Spirit, Problem-Solving Skills',
    rsvpDeadline: '2024-11-20',
  },
  {
    eventTitle: 'Tech Awards Night: Celebrating Excellence',
    eventKind: 'Awards',
    eventStartDate: '2024-12-10',
    eventEndDate: '2024-12-10',
    eventStartTime: '20:00',
    eventEndTime: '22:30',
    eventDescription: 'An evening honoring excellence in tech and repair.',
    eventLocation: 'Grand Ballroom, San Diego',
    requiredItems: 'Invitation, Elegance',
    rsvpDeadline: '2024-11-30',
  },
  {
    eventTitle: 'Webinar: Sustainable Tech Repair Practices',
    eventKind: 'Webinar',
    eventStartDate: '2024-10-20',
    eventEndDate: '2024-10-20',
    eventStartTime: '13:30',
    eventEndTime: '15:00',
    eventDescription: 'Explore eco-friendly approaches in tech repair.',
    eventLocation: 'Online',
    requiredItems: 'Computer, Internet Connection',
    rsvpDeadline: '2024-10-15',
  },
  {
    eventTitle: 'Coding Bootcamp: Full-Stack Development',
    eventKind: 'Workshop',
    eventStartDate: '2024-11-15',
    eventEndDate: '2024-11-18',
    eventStartTime: '09:00',
    eventEndTime: '17:00',
    eventDescription: 'Intensive coding bootcamp for aspiring developers.',
    eventLocation: 'Tech Academy, Toronto',
    requiredItems: 'Laptop, Enthusiasm',
    rsvpDeadline: '2024-11-10',
  },
  {
    eventTitle: 'Networking Mixer: Women in Tech',
    eventKind: 'Networking',
    eventStartDate: '2024-09-25',
    eventEndDate: '2024-09-25',
    eventStartTime: '18:00',
    eventEndTime: '20:00',
    eventDescription: 'Connect with inspiring women in the tech industry.',
    eventLocation: 'Tech Hub, San Francisco',
    requiredItems: 'Business Cards, Empowerment',
    rsvpDeadline: '2024-09-20',
  },
  {
    eventTitle: 'Python Programming Seminar',
    eventKind: 'Seminar',
    eventStartDate: '2024-11-10',
    eventEndDate: '2024-11-10',
    eventStartTime: '15:00',
    eventEndTime: '17:00',
    eventDescription: 'Deep dive into Python programming best practices.',
    eventLocation: 'Tech Community Center, Vancouver',
    requiredItems: 'Notebook, Interest',
    rsvpDeadline: '2024-11-05',
  },
  {
    eventTitle: 'Tech Expo: Innovation Showcase',
    eventKind: 'Conference',
    eventStartDate: '2024-12-01',
    eventEndDate: '2024-12-03',
    eventStartTime: '10:00',
    eventEndTime: '18:00',
    eventDescription:
      'Explore groundbreaking tech innovations in repair and more.',
    eventLocation: 'Tech Convention Center, Montreal',
    requiredItems: 'Badge, Networking Cards',
    rsvpDeadline: '2024-11-20',
  },
  {
    eventTitle: 'AI in Healthcare Tech Talk',
    eventKind: 'Tech Talk',
    eventStartDate: '2024-10-28',
    eventEndDate: '2024-10-28',
    eventStartTime: '14:00',
    eventEndTime: '15:30',
    eventDescription: 'Discussing the impact of AI on healthcare tech.',
    eventLocation: 'Tech Hub, Ottawa',
    requiredItems: 'Curiosity, Notebook',
    rsvpDeadline: '2024-10-23',
  },
  {
    eventTitle: 'Tech Repair Workshop: Laptop Upgrades',
    eventKind: 'Workshop',
    eventStartDate: '2024-12-12',
    eventEndDate: '2024-12-12',
    eventStartTime: '11:30',
    eventEndTime: '13:00',
    eventDescription: 'Learn how to upgrade and maintain laptops like a pro.',
    eventLocation: 'Tech Repair Center, New York City',
    requiredItems: 'Laptop, Upgrade Parts',
    rsvpDeadline: '2024-12-07',
  },
  {
    eventTitle: 'Charity Tech Repair Drive',
    eventKind: 'Charity',
    eventStartDate: '2024-11-20',
    eventEndDate: '2024-11-20',
    eventStartTime: '10:00',
    eventEndTime: '15:00',
    eventDescription: 'Repair tech devices for a charitable cause.',
    eventLocation: 'Community Hall, Los Angeles',
    requiredItems: 'Tools, Spare Parts',
    rsvpDeadline: '2024-11-15',
  },
  {
    eventTitle: 'Tech Awards Night: Celebrating Innovations',
    eventKind: 'Awards',
    eventStartDate: '2024-12-17',
    eventEndDate: '2024-12-17',
    eventStartTime: '19:00',
    eventEndTime: '22:30',
    eventDescription: 'Honoring tech innovations and breakthroughs.',
    eventLocation: 'Grand Ballroom, Chicago',
    requiredItems: 'Invitation, Elegance',
    rsvpDeadline: '2024-12-10',
  },
  {
    eventTitle: 'Hackathon: Future of Tech Repair',
    eventKind: 'Other',
    eventStartDate: '2024-11-15',
    eventEndDate: '2024-11-16',
    eventStartTime: '09:00',
    eventEndTime: '18:00',
    eventDescription: 'Invent the future of tech repair in this hackathon.',
    eventLocation: 'Innovation Hub, Seattle',
    requiredItems: 'Laptop, Creativity',
    rsvpDeadline: '2024-11-10',
  },
  {
    eventTitle: 'Tech Repair Summit',
    eventKind: 'Conference',
    eventStartDate: '2024-11-05',
    eventEndDate: '2024-11-07',
    eventStartTime: '09:00',
    eventEndTime: '17:00',
    eventDescription: 'Join experts to discuss the future of tech repair.',
    eventLocation: 'Tech Convention Center, Toronto',
    requiredItems: 'Badge, Networking Cards',
    rsvpDeadline: '2024-10-25',
  },
  {
    eventTitle: 'Programming Hackathon: Building the Future',
    eventKind: 'Hackathon',
    eventStartDate: '2024-10-15',
    eventEndDate: '2024-10-16',
    eventStartTime: '10:00',
    eventEndTime: '20:00',
    eventDescription: 'Develop innovative solutions in this coding marathon.',
    eventLocation: 'Tech Hub, Vancouver',
    requiredItems: 'Laptop, Creativity',
    rsvpDeadline: '2024-10-10',
  },
  {
    eventTitle: 'Networking Mixer: Tech Enthusiasts',
    eventKind: 'Networking',
    eventStartDate: '2024-09-28',
    eventEndDate: '2024-09-28',
    eventStartTime: '17:30',
    eventEndTime: '19:30',
    eventDescription: 'Connect with like-minded tech enthusiasts.',
    eventLocation: 'Tech Hub, San Francisco',
    requiredItems: 'Business Cards, Curiosity',
    rsvpDeadline: '2024-09-23',
  },
  {
    eventTitle: 'Webinar: AI in Tech Repair',
    eventKind: 'Webinar',
    eventStartDate: '2024-12-02',
    eventEndDate: '2024-12-02',
    eventStartTime: '14:00',
    eventEndTime: '15:30',
    eventDescription: 'Exploring the role of AI in tech repair processes.',
    eventLocation: 'Online',
    requiredItems: 'Computer, Internet Connection',
    rsvpDeadline: '2024-11-25',
  },
  {
    eventTitle: 'Tech Repair Workshop: Smartphone Repairs',
    eventKind: 'Workshop',
    eventStartDate: '2024-11-12',
    eventEndDate: '2024-11-12',
    eventStartTime: '11:00',
    eventEndTime: '13:00',
    eventDescription: 'Learn to fix smartphones like a pro.',
    eventLocation: 'Tech Repair Center, New York City',
    requiredItems: 'Smartphone, Repair Tools',
    rsvpDeadline: '2024-11-07',
  },
  {
    eventTitle: 'Charity Tech Drive: Supporting Local Schools',
    eventKind: 'Charity',
    eventStartDate: '2024-12-15',
    eventEndDate: '2024-12-15',
    eventStartTime: '11:00',
    eventEndTime: '15:00',
    eventDescription: 'Repair tech devices to benefit local schools.',
    eventLocation: 'Community Center, Los Angeles',
    requiredItems: 'Tools, Spare Parts',
    rsvpDeadline: '2024-12-10',
  },
  {
    eventTitle: 'Tech Talk: Quantum Computing Revolution',
    eventKind: 'Tech Talk',
    eventStartDate: '2024-10-25',
    eventEndDate: '2024-10-25',
    eventStartTime: '18:00',
    eventEndTime: '19:30',
    eventDescription: 'Explore the future of quantum computing in tech.',
    eventLocation: 'Tech Hub, Boston',
    requiredItems: 'Notebook, Curiosity',
    rsvpDeadline: '2024-10-20',
  },
  {
    eventTitle: 'Team Building Retreat: Tech Repair Challenge',
    eventKind: 'Team Building',
    eventStartDate: '2024-12-10',
    eventEndDate: '2024-12-12',
    eventStartTime: '09:00',
    eventEndTime: '17:00',
    eventDescription:
      "Strengthen your tech repair team's skills in a fun challenge.",
    eventLocation: 'Adventure Retreat Center, Seattle',
    requiredItems: 'Team Spirit, Problem-Solving Skills',
    rsvpDeadline: '2024-11-30',
  },
  {
    eventTitle: 'Tech Awards Night: Celebrating Excellence',
    eventKind: 'Awards',
    eventStartDate: '2024-12-18',
    eventEndDate: '2024-12-18',
    eventStartTime: '20:00',
    eventEndTime: '22:30',
    eventDescription: 'An evening honoring excellence in tech and repair.',
    eventLocation: 'Grand Ballroom, Chicago',
    requiredItems: 'Invitation, Elegance',
    rsvpDeadline: '2024-12-10',
  },
  {
    eventTitle: 'Tech Repair Workshop: Smartphone Repairs',
    eventKind: 'Workshop',
    eventStartDate: '2024-10-10',
    eventEndDate: '2024-10-10',
    eventStartTime: '14:00',
    eventEndTime: '16:00',
    eventDescription: 'Learn to repair common smartphone issues.',
    eventLocation: 'Tech Repair Center, Toronto, Canada',
    requiredItems: 'Smartphone, Repair Tools',
    rsvpDeadline: '2024-10-05',
  },
  {
    eventTitle: 'Web Development Bootcamp',
    eventKind: 'Workshop',
    eventStartDate: '2024-11-05',
    eventEndDate: '2024-11-07',
    eventStartTime: '09:30',
    eventEndTime: '16:30',
    eventDescription: 'Intensive bootcamp for web development enthusiasts.',
    eventLocation: 'Tech Academy, New York City, USA',
    requiredItems: 'Laptop, Enthusiasm',
    rsvpDeadline: '2024-10-25',
  },
  {
    eventTitle: 'Tech Talk: Cybersecurity Trends',
    eventKind: 'Tech Talk',
    eventStartDate: '2024-09-15',
    eventEndDate: '2024-09-15',
    eventStartTime: '18:30',
    eventEndTime: '20:00',
    eventDescription: 'Discussion on the latest cybersecurity trends.',
    eventLocation: 'Tech Hub, San Francisco, USA',
    requiredItems: 'Notebook, Curiosity',
    rsvpDeadline: '2024-09-10',
  },
  {
    eventTitle: 'Programming for Beginners: Python',
    eventKind: 'Workshop',
    eventStartDate: '2024-10-20',
    eventEndDate: '2024-10-20',
    eventStartTime: '10:00',
    eventEndTime: '12:00',
    eventDescription: 'Introductory workshop on Python programming.',
    eventLocation: 'Tech Community Center, Vancouver, Canada',
    requiredItems: 'Laptop, Interest',
    rsvpDeadline: '2024-10-15',
  },
  {
    eventTitle: 'Tech Repair Charity Drive',
    eventKind: 'Charity',
    eventStartDate: '2024-11-25',
    eventEndDate: '2024-11-25',
    eventStartTime: '11:00',
    eventEndTime: '15:00',
    eventDescription: 'Repair tech devices for a charitable cause.',
    eventLocation: 'Community Hall, Los Angeles, USA',
    requiredItems: 'Tools, Spare Parts',
    rsvpDeadline: '2024-11-15',
  },
  {
    eventTitle: 'AI in Tech: Future Possibilities',
    eventKind: 'Seminar',
    eventStartDate: '2024-12-05',
    eventEndDate: '2024-12-05',
    eventStartTime: '15:00',
    eventEndTime: '17:00',
    eventDescription: "Exploring AI's role in the future of tech.",
    eventLocation: 'Tech Convention Center, Montreal, Canada',
    requiredItems: 'Notebook, Open Mind',
    rsvpDeadline: '2024-11-25',
  },
  {
    eventTitle: 'Networking Mixer: Tech Professionals',
    eventKind: 'Networking',
    eventStartDate: '2024-09-30',
    eventEndDate: '2024-09-30',
    eventStartTime: '19:00',
    eventEndTime: '21:00',
    eventDescription: 'Connect with tech professionals in your area.',
    eventLocation: 'Tech Hub, Seattle, USA',
    requiredItems: 'Business Cards, Networking Skills',
    rsvpDeadline: '2024-09-25',
  },
  {
    eventTitle: 'Tech Awards Night: Celebrating Innovations',
    eventKind: 'Awards',
    eventStartDate: '2024-12-10',
    eventEndDate: '2024-12-10',
    eventStartTime: '19:30',
    eventEndTime: '22:00',
    eventDescription: 'Honoring tech innovations and breakthroughs.',
    eventLocation: 'Grand Ballroom, Chicago, USA',
    requiredItems: 'Invitation, Elegance',
    rsvpDeadline: '2024-12-01',
  },
  {
    eventTitle: 'Startup Pitch Competition',
    eventKind: 'Conference',
    eventStartDate: '2024-11-15',
    eventEndDate: '2024-11-16',
    eventStartTime: '10:00',
    eventEndTime: '18:00',
    eventDescription: 'Tech startups compete for recognition and investment.',
    eventLocation: 'Tech Convention Center, Toronto, Canada',
    requiredItems: 'Business Plan, Confidence',
    rsvpDeadline: '2024-11-05',
  },
  {
    eventTitle: 'Tech Talk: Blockchain Revolution',
    eventKind: 'Tech Talk',
    eventStartDate: '2024-10-10',
    eventEndDate: '2024-10-10',
    eventStartTime: '16:30',
    eventEndTime: '18:00',
    eventDescription:
      'Exploring the transformative power of blockchain in tech.',
    eventLocation: 'Tech Hub, Boston, USA',
    requiredItems: 'Notebook, Curiosity',
    rsvpDeadline: '2024-10-05',
  },
];


// function returnEventsRequestBodies({
//   eventsArray,
//   userDocs,
// }: {
//   eventsArray: EventsArray;
//   userDocs: DirectoryUserDocument[];
// }) {
//   return eventsArray.map((event) => {
//     // shuffle userDocs
//     const shuffledUserDocs = shuffleArray(userDocs);

//     // pick random number of event attendees
//     const randomAttendeesAmount = Math.floor(Math.random() * 7) + 2;

//     // pick random userDocs for event attendees
//     const randomAttendees = shuffledUserDocs.slice(0, randomAttendeesAmount);

//     // from each random attendee, pick their first, middle and last names
//     const randomAttendeesNames = randomAttendees.map((attendee) => {
//       const { firstName, middleName, lastName } = attendee;

//       return `${firstName} ${middleName} ${lastName}`;
//     });

//     const joinedAttendeeNames = replaceLastCommaWithAnd(
//       randomAttendeesNames.join(', ')
//     );

//     // create event body
//     const body = {
//       ...event,
//       userId: randomAttendees[0]._id,
//       username: randomAttendees[0].username,
//       creatorRole: randomAttendees[0].roles,
//       eventAttendees: joinedAttendeeNames,
//     };

//     return body;
//   });
// }

export { eventsArray, };
