import { shuffleArray } from "../../../utils";

type CommentsArray = {
  parentResourceId: string;
  comment: string;
  quotedComment: string;
  likesCount: number;
  dislikesCount: number;
  reportsCount: number;
  isFeatured: boolean;
  isDeleted: boolean;
}[];

const commentsArray: CommentsArray = [
  //
  //// title: 'Welcome to the MacAuley family!'
  //
  // {
  //   parentResourceId: '64d7f616dc23e0f96d8dda92',
  //   comment:
  //     "A hearty welcome to our new colleagues! It's wonderful to see our MacAuley family grow. You've joined a team that's committed to excellence in tech repair. If you ever have questions or need assistance, don't hesitate to reach out. We're here to support each other!",
  //   quotedComment: '',
  //   likesCount: 42,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7f616dc23e0f96d8dda92',
  //   comment:
  //     "Welcome aboard! I remember my first day here, and it feels like I've been part of this fantastic team forever. You'll find that our culture is all about collaboration and innovation. Let's work together to keep pushing the boundaries of tech repair!",
  //   quotedComment: '',
  //   likesCount: 37,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7f616dc23e0f96d8dda92',
  //   comment:
  //     "To the newcomers, you're in for an amazing journey at MacAuley! Our team's passion for technology and customer satisfaction is infectious. Feel free to introduce yourselves, and let's start this exciting chapter together!",
  //   quotedComment: '',
  //   likesCount: 31,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7f616dc23e0f96d8dda92',
  //   comment:
  //     "A warm welcome to all our new colleagues! It's great to have fresh perspectives and talents joining our team. You'll find that MacAuley is more than just a workplace; it's a community where everyone's contributions are valued.",
  //   quotedComment: '',
  //   likesCount: 29,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7f616dc23e0f96d8dda92',
  //   comment:
  //     "New beginnings are always exciting! At MacAuley, you're not just starting a job; you're becoming part of a dynamic team that thrives on innovation and customer satisfaction. Let's make the most of this journey together!",
  //   quotedComment: '',
  //   likesCount: 35,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7f616dc23e0f96d8dda92',
  //   comment:
  //     "Welcome, welcome! MacAuley is a place where you'll have the chance to learn and grow every day. Our dedication to excellence sets us apart, and your contributions will make us even stronger.",
  //   quotedComment: '',
  //   likesCount: 27,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7f616dc23e0f96d8dda92',
  //   comment:
  //     "A warm greeting to our new team members! You've joined a family that values innovation, teamwork, and customer satisfaction. Feel free to connect with any of us; we're here to support your journey.",
  //   quotedComment: '',
  //   likesCount: 33,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7f616dc23e0f96d8dda92',
  //   comment:
  //     "New faces, fresh ideas! Your unique perspectives will help us continue to excel in the tech repair industry. Let's embark on this exciting journey together and make MacAuley even better!",
  //   quotedComment: '',
  //   likesCount: 30,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7f616dc23e0f96d8dda92',
  //   comment:
  //     "A warm MacAuley welcome to our newcomers! Our team is like a well-oiled machine, and your addition will make us even more efficient. Don't hesitate to ask questions or share your ideas; we're all ears!",
  //   quotedComment: '',
  //   likesCount: 32,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7f616dc23e0f96d8dda92',
  //   comment:
  //     "Welcome to the MacAuley family! Together, we'll continue to provide exceptional tech repair services. Feel free to dive right in, and if you ever need guidance, just ask. We're here to help you succeed!",
  //   quotedComment: '',
  //   likesCount: 28,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // // Additional comments with quotes
  // {
  //   parentResourceId: '64d7f616dc23e0f96d8dda92',
  //   comment:
  //     "I completely agree with the sentiments expressed above. Our team is incredibly welcoming and supportive. You're in great company!",
  //   quotedComment:
  //     "A hearty welcome to our new colleagues! It's wonderful to see our MacAuley family grow. You've joined a team that's committed to excellence in tech repair. If you ever have questions or need assistance, don't hesitate to reach out. We're here to support each other!",
  //   likesCount: 25,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7f616dc23e0f96d8dda92',
  //   comment:
  //     "Absolutely, the warmth and camaraderie here make all the difference. Let's create amazing experiences together!",
  //   quotedComment:
  //     "To the newcomers, you're in for an amazing journey at MacAuley! Our team's passion for technology and customer satisfaction is infectious. Feel free to introduce yourselves, and let's start this exciting chapter together!",
  //   likesCount: 26,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7f616dc23e0f96d8dda92',
  //   comment:
  //     "A big welcome to our newcomers! You've just stepped into a team that values diversity and inclusivity. Feel free to share your unique perspectives; it's what makes us stronger!",
  //   quotedComment: '',
  //   likesCount: 40,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7f616dc23e0f96d8dda92',
  //   comment:
  //     "Welcome to MacAuley! Here, every day is a chance to learn and grow. If you ever feel lost or have questions, don't hesitate to ask any of us. We're all here to help.",
  //   quotedComment: '',
  //   likesCount: 38,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7f616dc23e0f96d8dda92',
  //   comment:
  //     "New faces bring fresh energy! We're excited to have you on board. Remember, our success is a collective effort. Let's collaborate and innovate together!",
  //   quotedComment: '',
  //   likesCount: 35,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7f616dc23e0f96d8dda92',
  //   comment:
  //     'Welcome to the MacAuley family! As a team, we strive for excellence in all we do. Your contributions will play a vital role in our continued success.',
  //   quotedComment: '',
  //   likesCount: 32,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7f616dc23e0f96d8dda92',
  //   comment:
  //     "To our new colleagues, you've joined a team where respect and collaboration are core values. Let's foster an environment where everyone's voice is heard and valued.",
  //   quotedComment: '',
  //   likesCount: 36,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7f616dc23e0f96d8dda92',
  //   comment:
  //     "A warm MacAuley welcome! Your journey here will be filled with opportunities for growth and personal development. Embrace each challenge; they're stepping stones to success.",
  //   quotedComment: '',
  //   likesCount: 33,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7f616dc23e0f96d8dda92',
  //   comment:
  //     "New horizons await you at MacAuley! This is where innovation meets teamwork. Let's exceed expectations together and continue delivering top-notch repair services.",
  //   quotedComment: '',
  //   likesCount: 39,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7f616dc23e0f96d8dda92',
  //   comment:
  //     "A warm MacAuley welcome to all! You're now part of a team that believes in making technology accessible and reliable for everyone. Your passion will drive our success.",
  //   quotedComment: '',
  //   likesCount: 37,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // // Additional comments with quotes
  // {
  //   parentResourceId: '64d7f616dc23e0f96d8dda92',
  //   comment:
  //     "I fully agree with the sentiments expressed earlier. Our team's culture of inclusivity and support sets us apart. You've made a great choice by joining us!",
  //   quotedComment:
  //     "A big welcome to our newcomers! You've just stepped into a team that values diversity and inclusivity. Feel free to share your unique perspectives; it's what makes us stronger!",
  //   likesCount: 27,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7f616dc23e0f96d8dda92',
  //   comment:
  //     "Absolutely, our collective success relies on our ability to learn and adapt. Let's make the most of this exciting journey!",
  //   quotedComment:
  //     "Welcome to MacAuley! Here, every day is a chance to learn and grow. If you ever feel lost or have questions, don't hesitate to ask any of us. We're all here to help.",
  //   likesCount: 29,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7f616dc23e0f96d8dda92',
  //   comment:
  //     "A warm MacAuley welcome to our newest members! You're stepping into a team that values collaboration and encourages innovation. Your unique skills and perspectives will help us reach new heights.",
  //   quotedComment: '',
  //   likesCount: 45,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7f616dc23e0f96d8dda92',
  //   comment:
  //     "Welcome, welcome! It's fantastic to see our MacAuley family growing stronger. If you ever have questions or need guidance, don't hesitate to reach out. We're here to support you in your journey.",
  //   quotedComment: '',
  //   likesCount: 40,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7f616dc23e0f96d8dda92',
  //   comment:
  //     "To our new colleagues, you've joined a team that thrives on challenges and celebrates success together. Let's make every day here an opportunity for growth and achievement.",
  //   quotedComment: '',
  //   likesCount: 38,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7f616dc23e0f96d8dda92',
  //   comment:
  //     "A hearty welcome to all newcomers! Our team's dedication to excellence is unwavering, and your contributions will play a crucial role in our continued success.",
  //   quotedComment: '',
  //   likesCount: 42,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7f616dc23e0f96d8dda92',
  //   comment:
  //     "New beginnings are always exciting! At MacAuley, you're not just joining a company; you're becoming part of a supportive family. Feel free to introduce yourself and let's create amazing experiences together!",
  //   quotedComment: '',
  //   likesCount: 37,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7f616dc23e0f96d8dda92',
  //   comment:
  //     "Welcome to MacAuley! Here, every day is an opportunity to learn and innovate. Your ideas and contributions matter, and we can't wait to see what you'll bring to our team.",
  //   quotedComment: '',
  //   likesCount: 39,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7f616dc23e0f96d8dda92',
  //   comment:
  //     "A warm MacAuley welcome to our new members! We're passionate about providing top-notch tech repair services, and your dedication will help us achieve that goal. Let's excel together!",
  //   quotedComment: '',
  //   likesCount: 41,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // // Additional comments with quotes
  // {
  //   parentResourceId: '64d7f616dc23e0f96d8dda92',
  //   comment:
  //     "I completely resonate with the warm welcome expressed above. This is a team that truly values collaboration and continuous improvement. You're in good hands!",
  //   quotedComment:
  //     "A warm MacAuley welcome to our newest members! You're stepping into a team that values collaboration and encourages innovation. Your unique skills and perspectives will help us reach new heights.",
  //   likesCount: 35,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7f616dc23e0f96d8dda92',
  //   comment:
  //     "Absolutely, we're all here to support each other. Your success is our success, and we're excited to see you shine!",
  //   quotedComment:
  //     "Welcome, welcome! It's fantastic to see our MacAuley family growing stronger. If you ever have questions or need guidance, don't hesitate to reach out. We're here to support you in your journey.",
  //   likesCount: 36,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7f616dc23e0f96d8dda92',
  //   comment:
  //     "A heartfelt welcome to our newest team members! At MacAuley, we're like a family, and your unique talents and experiences will enrich our collective journey. Don't hesitate to share your ideas and insights; they're invaluable to us.",
  //   quotedComment: '',
  //   likesCount: 50,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7f616dc23e0f96d8dda92',
  //   comment:
  //     "Welcome aboard! You've joined a dynamic team that's dedicated to delivering excellence. Each day here is an opportunity to learn, innovate, and make a difference. We're excited to see what you'll bring to the table!",
  //   quotedComment: '',
  //   likesCount: 48,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7f616dc23e0f96d8dda92',
  //   comment:
  //     "To our newcomers, MacAuley is more than a workplace; it's a community of passionate individuals. As you embark on this journey, remember that your growth is our success. Let's achieve greatness together!",
  //   quotedComment: '',
  //   likesCount: 46,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7f616dc23e0f96d8dda92',
  //   comment:
  //     "A warm MacAuley welcome to all! We're here to support and uplift each other. If you ever have questions or need assistance, just ask. Together, we can overcome any challenge!",
  //   quotedComment: '',
  //   likesCount: 52,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7f616dc23e0f96d8dda92',
  //   comment:
  //     "New beginnings are a chance to redefine success, and at MacAuley, we redefine it every day. Your arrival adds another layer of diversity to our team, and we're excited to learn from you.",
  //   quotedComment: '',
  //   likesCount: 49,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7f616dc23e0f96d8dda92',
  //   comment:
  //     "Welcome to MacAuley! This is where your skills will shine, and your ideas will take flight. We're a community of problem solvers, and together, there's no challenge too big.",
  //   quotedComment: '',
  //   likesCount: 47,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7f616dc23e0f96d8dda92',
  //   comment:
  //     "A hearty MacAuley welcome to all new employees! We're committed to excellence, and your dedication will help us reach new heights. Let's make every day count!",
  //   quotedComment: '',
  //   likesCount: 51,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7f616dc23e0f96d8dda92',
  //   comment:
  //     "I resonate with the warm welcome expressed earlier. This is a place where we grow together and celebrate our collective achievements. You're in for an incredible journey!",
  //   quotedComment:
  //     "A heartfelt welcome to our newest team members! At MacAuley, we're like a family, and your unique talents and experiences will enrich our collective journey. Don't hesitate to share your ideas and insights; they're invaluable to us.",
  //   likesCount: 42,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7f616dc23e0f96d8dda92',
  //   comment:
  //     "Absolutely, we're a community that thrives on innovation and problem-solving. Your contributions will undoubtedly shape our future success. Welcome to the team!",
  //   quotedComment:
  //     "Welcome aboard! You've joined a dynamic team that's dedicated to delivering excellence. Each day here is an opportunity to learn, innovate, and make a difference. We're excited to see what you'll bring to the table!",
  //   likesCount: 44,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7f616dc23e0f96d8dda92',
  //   comment:
  //     "Let's embrace every challenge as an opportunity for growth. Together, we'll achieve greatness beyond our wildest dreams. Welcome to MacAuley!",
  //   quotedComment:
  //     "To our newcomers, MacAuley is more than a workplace; it's a community of passionate individuals. As you embark on this journey, remember that your growth is our success. Let's achieve greatness together!",
  //   likesCount: 43,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7f616dc23e0f96d8dda92',
  //   comment:
  //     "A warm MacAuley welcome to all our new colleagues! You've joined a team that values diversity and collaboration. Together, we'll create a thriving and inclusive workplace.",
  //   quotedComment: '',
  //   likesCount: 55,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7f616dc23e0f96d8dda92',
  //   comment:
  //     "Welcome aboard! MacAuley is more than a workplace; it's a community of passionate individuals. Your journey here is an opportunity for growth and meaningful contributions.",
  //   quotedComment: '',
  //   likesCount: 60,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7f616dc23e0f96d8dda92',
  //   comment:
  //     "To our new colleagues, your skills and perspectives are invaluable to our success. Let's work together to innovate and make a difference in the tech repair industry.",
  //   quotedComment: '',
  //   likesCount: 65,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7f616dc23e0f96d8dda92',
  //   comment:
  //     'A hearty welcome! MacAuley is a place where we embrace challenges as opportunities. Your dedication will play a vital role in our journey to excellence.',
  //   quotedComment: '',
  //   likesCount: 70,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7f616dc23e0f96d8dda92',
  //   comment:
  //     "New beginnings are filled with promise. At MacAuley, you're not just joining a company; you're becoming part of a family dedicated to making a difference.",
  //   quotedComment: '',
  //   likesCount: 75,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7f616dc23e0f96d8dda92',
  //   comment:
  //     'Welcome to MacAuley! Every day here is an opportunity for learning and growth. Your contributions will shape our shared success story.',
  //   quotedComment: '',
  //   likesCount: 80,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7f616dc23e0f96d8dda92',
  //   comment:
  //     'A warm MacAuley welcome to our newest team members! Your fresh perspectives will add a new layer of innovation to our tech repair solutions.',
  //   quotedComment: '',
  //   likesCount: 85,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7f616dc23e0f96d8dda92',
  //   comment:
  //     "I completely resonate with the sentiments expressed earlier. This is a team that embraces diversity and fosters a culture of continuous improvement. You're in great company!",
  //   quotedComment:
  //     "A warm MacAuley welcome to all our new colleagues! You've joined a team that values diversity and collaboration. Together, we'll create a thriving and inclusive workplace.",
  //   likesCount: 90,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7f616dc23e0f96d8dda92',
  //   comment:
  //     'Absolutely, our success is built on collaboration and innovation. Your contributions will undoubtedly shape our future achievements. Welcome to the team!',
  //   quotedComment:
  //     "Welcome aboard! MacAuley is more than a workplace; it's a community of passionate individuals. Your journey here is an opportunity for growth and meaningful contributions.",
  //   likesCount: 95,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  //
  //// title: 'Company Expansion'
  //
  // {
  //   parentResourceId: '64d7f992dc23e0f96d8dda9c',
  //   comment:
  //     "This is incredibly exciting news! Company expansion means new opportunities for growth, both personally and for our business. I can't wait to see where this journey takes us.",
  //   quotedComment: '',
  //   likesCount: 20,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7f992dc23e0f96d8dda9c',
  //   comment:
  //     "Expanding our horizons is a testament to our team's hard work and dedication. Let's embrace this expansion with enthusiasm and continue to excel.",
  //   quotedComment: '',
  //   likesCount: 15,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7f992dc23e0f96d8dda9c',
  //   comment:
  //     "Congratulations to the entire MacAuley team! Our journey of expansion reflects our commitment to innovation and excellence. Together, we'll achieve remarkable milestones.",
  //   quotedComment: '',
  //   likesCount: 18,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7f992dc23e0f96d8dda9c',
  //   comment:
  //     "I'm thrilled to be part of a company that's constantly pushing boundaries. Our expansion plans are a testament to our determination and vision.",
  //   quotedComment: '',
  //   likesCount: 22,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7f992dc23e0f96d8dda9c',
  //   comment:
  //     "This is a pivotal moment for MacAuley. Our expansion is a chance to make a bigger impact and redefine the tech repair industry. Let's seize this opportunity!",
  //   quotedComment: '',
  //   likesCount: 25,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7f992dc23e0f96d8dda9c',
  //   comment:
  //     "The expansion news is spreading excitement throughout our team. Together, we'll write a new chapter in MacAuley's success story.",
  //   quotedComment: '',
  //   likesCount: 17,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7f992dc23e0f96d8dda9c',
  //   comment:
  //     "I echo the sentiments of my colleagues. MacAuley's expansion is a testament to our dedication to providing top-notch tech repair solutions. Let's keep the momentum going!",
  //   quotedComment: '',
  //   likesCount: 19,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7f992dc23e0f96d8dda9c',
  //   comment:
  //     "Expanding our business means expanding our impact. I'm excited to be part of this journey as we reach new heights in the tech repair industry.",
  //   quotedComment: '',
  //   likesCount: 23,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7f992dc23e0f96d8dda9c',
  //   comment:
  //     "Our company's expansion plans are a testament to our commitment to innovation and growth. This journey will open up new avenues for us to excel and make a significant impact in the tech repair industry.",
  //   quotedComment: '',
  //   likesCount: 30,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7f992dc23e0f96d8dda9c',
  //   comment:
  //     "I'm thrilled to be part of a team that constantly pushes boundaries. Our expansion reflects our determination to stay at the forefront of the industry. Together, we'll achieve remarkable milestones.",
  //   quotedComment: '',
  //   likesCount: 35,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7f992dc23e0f96d8dda9c',
  //   comment:
  //     "This announcement is a game-changer. As we expand, we're not just growing in size; we're growing in impact. Let's embrace this opportunity with enthusiasm and dedication.",
  //   quotedComment: '',
  //   likesCount: 40,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7f992dc23e0f96d8dda9c',
  //   comment:
  //     "Expanding our business is a reflection of our team's relentless pursuit of excellence. I'm excited to see how this journey unfolds and the positive changes it brings to our industry.",
  //   quotedComment: '',
  //   likesCount: 45,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7f992dc23e0f96d8dda9c',
  //   comment:
  //     "The expansion announcement has ignited a wave of excitement within our team. This is an opportunity to redefine what's possible in tech repair, and I'm proud to be a part of it.",
  //   quotedComment: '',
  //   likesCount: 50,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7f992dc23e0f96d8dda9c',
  //   comment:
  //     "Our journey of expansion represents the culmination of our collective efforts and unwavering commitment to our mission. Together, we'll write a new chapter of success.",
  //   quotedComment: '',
  //   likesCount: 55,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7f992dc23e0f96d8dda9c',
  //   comment:
  //     "I echo the sentiments of my colleagues. This expansion is a chance to make a bigger impact and redefine the tech repair industry. Let's seize this opportunity!",
  //   quotedComment: '',
  //   likesCount: 60,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7f992dc23e0f96d8dda9c',
  //   comment:
  //     "Expanding our business means expanding our influence. I'm excited to be part of this journey as we reach new heights in the tech repair industry.",
  //   quotedComment: '',
  //   likesCount: 65,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // // Add more comments as needed
  // {
  //   parentResourceId: '64d7f992dc23e0f96d8dda9c',
  //   comment:
  //     "This is a significant milestone for our company. Our expansion plans represent our commitment to delivering top-tier tech repair solutions and growing our reach. Together, we'll achieve remarkable feats.",
  //   quotedComment: '',
  //   likesCount: 70,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7f992dc23e0f96d8dda9c',
  //   comment:
  //     "I couldn't agree more. Our expansion is a testament to our dedication and forward-thinking approach. I'm excited to see the positive impact we'll make in the tech repair industry.",
  //   quotedComment: '',
  //   likesCount: 75,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7f992dc23e0f96d8dda9c',
  //   comment:
  //     "I'm thrilled to hear about our company's expansion plans. This is a significant step towards achieving our goals and making a greater impact in the tech repair industry. Let's embrace the opportunities that come with growth.",
  //   quotedComment: '',
  //   likesCount: 20,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7f992dc23e0f96d8dda9c',
  //   comment:
  //     "Our journey of expansion is a testament to our team's hard work and dedication. We've come a long way, and I believe this is just the beginning of even greater achievements.",
  //   quotedComment: '',
  //   likesCount: 15,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7f992dc23e0f96d8dda9c',
  //   comment:
  //     "As we embark on this exciting journey of expansion, I'm reminded of the incredible potential within our team. Together, we can shape the future of tech repair.",
  //   quotedComment: '',
  //   likesCount: 10,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7f992dc23e0f96d8dda9c',
  //   comment:
  //     'Expanding our company is a bold move that demonstrates our confidence in our abilities. I look forward to seeing our impact grow in the industry.',
  //   quotedComment: '',
  //   likesCount: 25,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7f992dc23e0f96d8dda9c',
  //   comment:
  //     "The expansion announcement has generated a sense of excitement and unity among our team. It's a reminder that together, we can achieve remarkable success.",
  //   quotedComment: '',
  //   likesCount: 18,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7f992dc23e0f96d8dda9c',
  //   comment:
  //     "Our company's expansion plans signify our commitment to excellence. I'm eager to contribute to this journey and see where it takes us.",
  //   quotedComment: '',
  //   likesCount: 22,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7f992dc23e0f96d8dda9c',
  //   comment:
  //     "This expansion is an opportunity for personal and professional growth. I'm grateful to be part of a team that constantly pushes boundaries.",
  //   quotedComment: '',
  //   likesCount: 17,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7f992dc23e0f96d8dda9c',
  //   comment:
  //     "As we set sail on this new phase of our journey, I want to express my excitement and optimism. Together, we'll achieve great things.",
  //   quotedComment: '',
  //   likesCount: 21,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7f992dc23e0f96d8dda9c',
  //   comment:
  //     "Our company's expansion is a testament to our resilience and adaptability. I'm confident that we'll thrive in the face of new challenges.",
  //   quotedComment: '',
  //   likesCount: 19,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7f992dc23e0f96d8dda9c',
  //   comment:
  //     "I've always believed in our team's potential, and this expansion validates that belief. Let's write a new chapter of success together.",
  //   quotedComment: '',
  //   likesCount: 23,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // // Add more comments as needed
  // {
  //   parentResourceId: '64d7f992dc23e0f96d8dda9c',
  //   comment:
  //     "This expansion marks a significant milestone in our company's history. I'm excited to contribute to our growth and success in the tech repair industry.",
  //   quotedComment: '',
  //   likesCount: 16,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7f992dc23e0f96d8dda9c',
  //   comment:
  //     "I couldn't be prouder to be part of this team as we expand our horizons. Together, we'll achieve greatness in the tech repair industry.",
  //   quotedComment: '',
  //   likesCount: 24,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7f992dc23e0f96d8dda9c',
  //   comment:
  //     "This is an exciting time for our company. I believe that our expansion plans will open up new opportunities for us in the tech repair industry. Let's work together to make this journey a success.",
  //   quotedComment: '',
  //   likesCount: 10,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7f992dc23e0f96d8dda9c',
  //   comment:
  //     "I've always admired our company's commitment to innovation and growth. The expansion announcement reaffirms my belief in our potential to thrive in a competitive market.",
  //   quotedComment: '',
  //   likesCount: 12,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7f992dc23e0f96d8dda9c',
  //   comment:
  //     "As a long-time employee, I'm proud to witness this milestone. Our company's expansion is a testament to our team's dedication and vision for the future.",
  //   quotedComment: '',
  //   likesCount: 15,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7f992dc23e0f96d8dda9c',
  //   comment:
  //     "The tech repair industry is evolving rapidly, and our expansion is a strategic move to stay ahead of the curve. I'm excited to be part of this transformation.",
  //   quotedComment: '',
  //   likesCount: 11,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7f992dc23e0f96d8dda9c',
  //   comment:
  //     "I see our company's expansion as an opportunity for personal growth and development. Let's embrace the challenges and successes that come with it.",
  //   quotedComment: '',
  //   likesCount: 9,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7f992dc23e0f96d8dda9c',
  //   comment:
  //     "The expansion plans reflect the dedication and hard work of our team. I'm looking forward to contributing to our continued success.",
  //   quotedComment: '',
  //   likesCount: 14,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // // Add more comments as needed
  // {
  //   parentResourceId: '64d7f992dc23e0f96d8dda9c',
  //   comment:
  //     "Our company's expansion is a bold move that sets us on a path of growth and innovation. Together, we'll achieve greatness.",
  //   quotedComment: '',
  //   likesCount: 13,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  //
  //// title: 'Updated Company Repair Policy'
  //
  // {
  //   parentResourceId: '64d7fa56dc23e0f96d8ddaa5',
  //   comment:
  //     "These policy updates are a step in the right direction. It's essential that we stay aligned with industry standards to provide the best service to our customers. I appreciate the clarity and detail in these changes, which will help us excel in our roles.",
  //   quotedComment: '',
  //   likesCount: 38,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fa56dc23e0f96d8ddaa5',
  //   comment:
  //     "I agree with the sentiment expressed earlier. Our customers rely on our expertise, and these updated policies show that we're committed to maintaining high standards. Let's make sure we all understand and implement these changes effectively.",
  //   quotedComment: '',
  //   likesCount: 33,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fa56dc23e0f96d8ddaa5',
  //   comment:
  //     "It's evident that our leadership is dedicated to ensuring the best for our customers and our team. These updates reflect that commitment. I'm confident that with these policies in place, we'll continue to provide top-notch service.",
  //   quotedComment: '',
  //   likesCount: 29,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fa56dc23e0f96d8ddaa5',
  //   comment:
  //     "Clarity is key in any policy, and these updates deliver just that. They provide a solid foundation for us to perform our roles effectively and consistently. Let's make sure we're all on the same page and adhere to these guidelines.",
  //   quotedComment: '',
  //   likesCount: 27,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fa56dc23e0f96d8ddaa5',
  //   comment:
  //     "I appreciate the effort put into communicating these changes clearly. Our success depends on our ability to adapt, and these updated policies help us do just that. Let's continue to uphold our reputation for excellence in tech repair.",
  //   quotedComment: '',
  //   likesCount: 34,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fa56dc23e0f96d8ddaa5',
  //   comment:
  //     "Our customers deserve nothing but the best, and these policy updates ensure that we maintain high-quality service. Let's embrace these changes and continue to grow as a team.",
  //   quotedComment: '',
  //   likesCount: 28,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fa56dc23e0f96d8ddaa5',
  //   comment:
  //     "The leadership's dedication to our growth is evident in these policy updates. I'm confident that our team will excel under these guidelines. Let's keep the momentum going!",
  //   quotedComment: '',
  //   likesCount: 35,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fa56dc23e0f96d8ddaa5',
  //   comment:
  //     "These updates make our roles clearer, and I believe they'll contribute to our success as a team. Let's stay committed to excellence and implement these changes effectively.",
  //   quotedComment: '',
  //   likesCount: 30,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fa56dc23e0f96d8ddaa5',
  //   comment:
  //     "Change can be challenging, but these updates are necessary for our growth. Let's adapt and ensure that we provide the best repair services to our customers.",
  //   quotedComment: '',
  //   likesCount: 32,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fa56dc23e0f96d8ddaa5',
  //   comment:
  //     "I appreciate the transparency in communicating these changes. It helps us understand our roles better. Let's work together to implement these policies effectively.",
  //   quotedComment: '',
  //   likesCount: 26,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // // Additional comments with quotes
  // {
  //   parentResourceId: '64d7fa56dc23e0f96d8ddaa5',
  //   comment:
  //     'I wholeheartedly agree with the comments above. These policy updates are a testament to our commitment to excellence.',
  //   quotedComment:
  //     "These policy updates are a step in the right direction. It's essential that we stay aligned with industry standards to provide the best service to our customers. I appreciate the clarity and detail in these changes, which will help us excel in our roles.",
  //   likesCount: 24,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fa56dc23e0f96d8ddaa5',
  //   comment:
  //     "Absolutely, clear policies ensure a smoother workflow. Let's put these into practice effectively.",
  //   quotedComment:
  //     "Clarity is key in any policy, and these updates deliver just that. They provide a solid foundation for us to perform our roles effectively and consistently. Let's make sure we're all on the same page and adhere to these guidelines.",
  //   likesCount: 25,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fa56dc23e0f96d8ddaa5',
  //   comment:
  //     "These policy updates are a welcome step forward for our team. It's essential that we adapt to changing industry standards to continue providing top-notch repair services. I particularly appreciate the detailed explanations, which make it easier for us to implement these changes effectively.",
  //   quotedComment: '',
  //   likesCount: 38,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fa56dc23e0f96d8ddaa5',
  //   comment:
  //     "I fully support the sentiments expressed earlier. Our customers rely on us, and these updated policies show our commitment to their satisfaction. It's crucial that we all take the time to understand and apply these changes accurately.",
  //   quotedComment: '',
  //   likesCount: 33,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fa56dc23e0f96d8ddaa5',
  //   comment:
  //     "Our leadership's dedication to keeping us aligned with industry best practices is evident in these updates. I'm confident that with these policies in place, we'll continue to excel in providing reliable repair services.",
  //   quotedComment: '',
  //   likesCount: 29,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fa56dc23e0f96d8ddaa5',
  //   comment:
  //     "Clarity is paramount in any policy, and these updates deliver exactly that. They provide a solid foundation for us to carry out our responsibilities consistently and efficiently. Let's ensure we all grasp these guidelines and follow them diligently.",
  //   quotedComment: '',
  //   likesCount: 27,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fa56dc23e0f96d8ddaa5',
  //   comment:
  //     "I'm impressed by the effort to communicate these changes clearly. Our success hinges on our ability to adapt, and these updated policies facilitate that. Let's continue to uphold our reputation for excellence in tech repair.",
  //   quotedComment: '',
  //   likesCount: 34,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fa56dc23e0f96d8ddaa5',
  //   comment:
  //     "Our customers deserve nothing but the best, and these policy updates ensure that we maintain high-quality service. Let's embrace these changes and continue to grow as a team.",
  //   quotedComment: '',
  //   likesCount: 28,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fa56dc23e0f96d8ddaa5',
  //   comment:
  //     "The leadership's dedication to our growth is evident in these policy updates. I'm confident that our team will excel under these guidelines. Let's keep the momentum going!",
  //   quotedComment: '',
  //   likesCount: 35,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fa56dc23e0f96d8ddaa5',
  //   comment:
  //     "These updates make our roles clearer, and I believe they'll contribute to our success as a team. Let's stay committed to excellence and implement these changes effectively.",
  //   quotedComment: '',
  //   likesCount: 30,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fa56dc23e0f96d8ddaa5',
  //   comment:
  //     "Change can be challenging, but these updates are necessary for our growth. Let's adapt and ensure that we provide the best repair services to our customers.",
  //   quotedComment: '',
  //   likesCount: 32,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fa56dc23e0f96d8ddaa5',
  //   comment:
  //     "I appreciate the transparency in communicating these changes. It helps us understand our roles better. Let's work together to implement these policies effectively.",
  //   quotedComment: '',
  //   likesCount: 26,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // // Additional comments with quotes
  // {
  //   parentResourceId: '64d7fa56dc23e0f96d8ddaa5',
  //   comment:
  //     'I wholeheartedly agree with the comments above. These policy updates are a testament to our commitment to excellence.',
  //   quotedComment:
  //     "These policy updates are a welcome step forward for our team. It's essential that we adapt to changing industry standards to continue providing top-notch repair services. I particularly appreciate the detailed explanations, which make it easier for us to implement these changes effectively.",
  //   likesCount: 24,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fa56dc23e0f96d8ddaa5',
  //   comment:
  //     "Absolutely, clear policies ensure a smoother workflow. Let's put these into practice effectively.",
  //   quotedComment:
  //     "Clarity is paramount in any policy, and these updates deliver exactly that. They provide a solid foundation for us to carry out our responsibilities consistently and efficiently. Let's ensure we all grasp these guidelines and follow them diligently.",
  //   likesCount: 25,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fa56dc23e0f96d8ddaa5',
  //   comment:
  //     "These policy updates are a welcome step forward for our team. It's essential that we adapt to changing industry standards to continue providing top-notch repair services. I particularly appreciate the detailed explanations, which make it easier for us to implement these changes effectively.",
  //   quotedComment: '',
  //   likesCount: 38,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fa56dc23e0f96d8ddaa5',
  //   comment:
  //     "I fully support the sentiments expressed earlier. Our customers rely on us, and these updated policies show our commitment to their satisfaction. It's crucial that we all take the time to understand and apply these changes accurately.",
  //   quotedComment: '',
  //   likesCount: 33,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fa56dc23e0f96d8ddaa5',
  //   comment:
  //     "Our leadership's dedication to keeping us aligned with industry best practices is evident in these updates. I'm confident that with these policies in place, we'll continue to excel in providing reliable repair services.",
  //   quotedComment: '',
  //   likesCount: 29,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fa56dc23e0f96d8ddaa5',
  //   comment:
  //     "Clarity is paramount in any policy, and these updates deliver exactly that. They provide a solid foundation for us to carry out our responsibilities consistently and efficiently. Let's ensure we all grasp these guidelines and follow them diligently.",
  //   quotedComment: '',
  //   likesCount: 27,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fa56dc23e0f96d8ddaa5',
  //   comment:
  //     "I'm impressed by the effort to communicate these changes clearly. Our success hinges on our ability to adapt, and these updated policies facilitate that. Let's continue to uphold our reputation for excellence in tech repair.",
  //   quotedComment: '',
  //   likesCount: 34,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fa56dc23e0f96d8ddaa5',
  //   comment:
  //     "Our customers deserve nothing but the best, and these policy updates ensure that we maintain high-quality service. Let's embrace these changes and continue to grow as a team.",
  //   quotedComment: '',
  //   likesCount: 28,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fa56dc23e0f96d8ddaa5',
  //   comment:
  //     "The leadership's dedication to our growth is evident in these policy updates. I'm confident that our team will excel under these guidelines. Let's keep the momentum going!",
  //   quotedComment: '',
  //   likesCount: 35,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fa56dc23e0f96d8ddaa5',
  //   comment:
  //     "These updates make our roles clearer, and I believe they'll contribute to our success as a team. Let's stay committed to excellence and implement these changes effectively.",
  //   quotedComment: '',
  //   likesCount: 30,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fa56dc23e0f96d8ddaa5',
  //   comment:
  //     "Change can be challenging, but these updates are necessary for our growth. Let's adapt and ensure that we provide the best repair services to our customers.",
  //   quotedComment: '',
  //   likesCount: 32,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fa56dc23e0f96d8ddaa5',
  //   comment:
  //     "I appreciate the transparency in communicating these changes. It helps us understand our roles better. Let's work together to implement these policies effectively.",
  //   quotedComment: '',
  //   likesCount: 26,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // // Additional comments with quotes
  // {
  //   parentResourceId: '64d7fa56dc23e0f96d8ddaa5',
  //   comment:
  //     'I wholeheartedly agree with the comments above. These policy updates are a testament to our commitment to excellence.',
  //   quotedComment:
  //     "These policy updates are a welcome step forward for our team. It's essential that we adapt to changing industry standards to continue providing top-notch repair services. I particularly appreciate the detailed explanations, which make it easier for us to implement these changes effectively.",
  //   likesCount: 24,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fa56dc23e0f96d8ddaa5',
  //   comment:
  //     "Absolutely, clear policies ensure a smoother workflow. Let's put these into practice effectively.",
  //   quotedComment:
  //     "Clarity is paramount in any policy, and these updates deliver exactly that. They provide a solid foundation for us to carry out our responsibilities consistently and efficiently. Let's ensure we all grasp these guidelines and follow them diligently.",
  //   likesCount: 25,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fa56dc23e0f96d8ddaa5',
  //   comment:
  //     "These policy updates are a welcome step forward for our team. It's essential that we adapt to changing industry standards to continue providing top-notch repair services. I particularly appreciate the detailed explanations, which make it easier for us to implement these changes effectively.",
  //   quotedComment: '',
  //   likesCount: 38,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fa56dc23e0f96d8ddaa5',
  //   comment:
  //     "I fully support the sentiments expressed earlier. Our customers rely on us, and these updated policies show our commitment to their satisfaction. It's crucial that we all take the time to understand and apply these changes accurately.",
  //   quotedComment: '',
  //   likesCount: 33,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fa56dc23e0f96d8ddaa5',
  //   comment:
  //     "Our leadership's dedication to keeping us aligned with industry best practices is evident in these updates. I'm confident that with these policies in place, we'll continue to excel in providing reliable repair services.",
  //   quotedComment: '',
  //   likesCount: 29,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fa56dc23e0f96d8ddaa5',
  //   comment:
  //     "Clarity is paramount in any policy, and these updates deliver exactly that. They provide a solid foundation for us to carry out our responsibilities consistently and efficiently. Let's ensure we all grasp these guidelines and follow them diligently.",
  //   quotedComment: '',
  //   likesCount: 27,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fa56dc23e0f96d8ddaa5',
  //   comment:
  //     "I'm impressed by the effort to communicate these changes clearly. Our success hinges on our ability to adapt, and these updated policies facilitate that. Let's continue to uphold our reputation for excellence in tech repair.",
  //   quotedComment: '',
  //   likesCount: 34,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fa56dc23e0f96d8ddaa5',
  //   comment:
  //     "Our customers deserve nothing but the best, and these policy updates ensure that we maintain high-quality service. Let's embrace these changes and continue to grow as a team.",
  //   quotedComment: '',
  //   likesCount: 28,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fa56dc23e0f96d8ddaa5',
  //   comment:
  //     "The leadership's dedication to our growth is evident in these policy updates. I'm confident that our team will excel under these guidelines. Let's keep the momentum going!",
  //   quotedComment: '',
  //   likesCount: 35,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fa56dc23e0f96d8ddaa5',
  //   comment:
  //     "These updates make our roles clearer, and I believe they'll contribute to our success as a team. Let's stay committed to excellence and implement these changes effectively.",
  //   quotedComment: '',
  //   likesCount: 30,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fa56dc23e0f96d8ddaa5',
  //   comment:
  //     "Change can be challenging, but these updates are necessary for our growth. Let's adapt and ensure that we provide the best repair services to our customers.",
  //   quotedComment: '',
  //   likesCount: 32,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fa56dc23e0f96d8ddaa5',
  //   comment:
  //     "I appreciate the transparency in communicating these changes. It helps us understand our roles better. Let's work together to implement these policies effectively.",
  //   quotedComment: '',
  //   likesCount: 26,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // // Additional comments with quotes
  // {
  //   parentResourceId: '64d7fa56dc23e0f96d8ddaa5',
  //   comment:
  //     'I wholeheartedly agree with the comments above. These policy updates are a testament to our commitment to excellence.',
  //   quotedComment:
  //     "These policy updates are a welcome step forward for our team. It's essential that we adapt to changing industry standards to continue providing top-notch repair services. I particularly appreciate the detailed explanations, which make it easier for us to implement these changes effectively.",
  //   likesCount: 24,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fa56dc23e0f96d8ddaa5',
  //   comment:
  //     "Absolutely, clear policies ensure a smoother workflow. Let's put these into practice effectively.",
  //   quotedComment:
  //     "Clarity is paramount in any policy, and these updates deliver exactly that. They provide a solid foundation for us to carry out our responsibilities consistently and efficiently. Let's ensure we all grasp these guidelines and follow them diligently.",
  //   likesCount: 25,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  //
  // title: 'Employee Appreciation Event'
  //
  // {
  //   parentResourceId: '64d7fb31dc23e0f96d8ddaa8',
  //   comment:
  //     "I'm thrilled to hear about the Employee Appreciation Event! It's a great opportunity to connect with colleagues and celebrate our hard work. Looking forward to it!",
  //   quotedComment: '',
  //   likesCount: 15,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fb31dc23e0f96d8ddaa8',
  //   comment:
  //     'Events like these make our workplace feel like a family. Kudos to the organizers for recognizing and appreciating our efforts!',
  //   quotedComment: '',
  //   likesCount: 12,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fb31dc23e0f96d8ddaa8',
  //   comment:
  //     "The Employee Appreciation Event is a testament to our company's commitment to its employees. It's a chance to unwind and create lasting memories.",
  //   quotedComment: '',
  //   likesCount: 14,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fb31dc23e0f96d8ddaa8',
  //   comment:
  //     "I'm grateful to be part of a company that values its employees. Let's make this event a memorable one filled with laughter and camaraderie.",
  //   quotedComment: '',
  //   likesCount: 11,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fb31dc23e0f96d8ddaa8',
  //   comment:
  //     "Employee Appreciation Events like this one enhance our workplace culture. It's a chance to appreciate each other's contributions.",
  //   quotedComment: '',
  //   likesCount: 13,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fb31dc23e0f96d8ddaa8',
  //   comment:
  //     "Our company knows how to throw a great event! I can't wait to attend the Employee Appreciation Event and connect with colleagues.",
  //   quotedComment: '',
  //   likesCount: 10,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fb31dc23e0f96d8ddaa8',
  //   comment:
  //     "The Employee Appreciation Event is a fantastic way to unwind and celebrate our hard work. Let's make it memorable!",
  //   quotedComment: '',
  //   likesCount: 9,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fb31dc23e0f96d8ddaa8',
  //   comment:
  //     'I appreciate the effort our company puts into recognizing its employees. Looking forward to the Employee Appreciation Event!',
  //   quotedComment: '',
  //   likesCount: 8,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fb31dc23e0f96d8ddaa8',
  //   comment:
  //     "It's moments like these that make our workplace special. Let's make the most of the Employee Appreciation Event!",
  //   quotedComment: '',
  //   likesCount: 7,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fb31dc23e0f96d8ddaa8',
  //   comment:
  //     "I'm looking forward to celebrating with my colleagues at the Employee Appreciation Event. It's a great way to relax and unwind.",
  //   quotedComment: '',
  //   likesCount: 6,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fb31dc23e0f96d8ddaa8',
  //   comment:
  //     "I'm thrilled to hear about the Employee Appreciation Event! It's a great opportunity to connect with colleagues and celebrate our hard work. Looking forward to it!",
  //   quotedComment: '',
  //   likesCount: 15,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fb31dc23e0f96d8ddaa8',
  //   comment:
  //     'Events like these make our workplace feel like a family. Kudos to the organizers for recognizing and appreciating our efforts!',
  //   quotedComment: '',
  //   likesCount: 12,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fb31dc23e0f96d8ddaa8',
  //   comment:
  //     "The Employee Appreciation Event is a testament to our company's commitment to its employees. It's a chance to unwind and create lasting memories.",
  //   quotedComment: '',
  //   likesCount: 14,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fb31dc23e0f96d8ddaa8',
  //   comment:
  //     "I'm grateful to be part of a company that values its employees. Let's make this event a memorable one filled with laughter and camaraderie.",
  //   quotedComment: '',
  //   likesCount: 11,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fb31dc23e0f96d8ddaa8',
  //   comment:
  //     "Employee Appreciation Events like this one enhance our workplace culture. It's a chance to appreciate each other's contributions.",
  //   quotedComment: '',
  //   likesCount: 13,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fb31dc23e0f96d8ddaa8',
  //   comment:
  //     "I'm really looking forward to the Employee Appreciation Event! It's a great opportunity to relax and connect with colleagues outside of work.",
  //   quotedComment: '',
  //   likesCount: 15,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fb31dc23e0f96d8ddaa8',
  //   comment:
  //     "Events like these help us build strong relationships and strengthen our teamwork. Let's make this event unforgettable!",
  //   quotedComment: '',
  //   likesCount: 12,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fb31dc23e0f96d8ddaa8',
  //   comment:
  //     "I heard there might be some surprise activities at the event. Can't wait to see what the organizers have in store for us!",
  //   quotedComment: '',
  //   likesCount: 14,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fb31dc23e0f96d8ddaa8',
  //   comment:
  //     'Count me in! Employee Appreciation Events like this one make our workplace feel like a big family reunion.',
  //   quotedComment: '',
  //   likesCount: 11,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fb31dc23e0f96d8ddaa8',
  //   comment:
  //     "I appreciate the company's efforts to organize events like these. Let's cherish these moments together!",
  //   quotedComment: '',
  //   likesCount: 13,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fb31dc23e0f96d8ddaa8',
  //   comment:
  //     'The Employee Appreciation Event is a highlight of the year. Looking forward to the fun and camaraderie!',
  //   quotedComment: '',
  //   likesCount: 17,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fb31dc23e0f96d8ddaa8',
  //   comment:
  //     'I heard there might be a talent show at the event. Time to dust off those hidden talents and shine!',
  //   quotedComment: '',
  //   likesCount: 16,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fb31dc23e0f96d8ddaa8',
  //   comment:
  //     "Employee Appreciation Events are a fantastic way to unwind and celebrate our achievements. Let's make it memorable!",
  //   quotedComment: '',
  //   likesCount: 18,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fb31dc23e0f96d8ddaa8',
  //   comment:
  //     "I'm thrilled to hear about the Employee Appreciation Event! It's a fantastic opportunity to relax and bond with colleagues.",
  //   quotedComment: '',
  //   likesCount: 15,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fb31dc23e0f96d8ddaa8',
  //   comment:
  //     "Events like these add a special touch to our work-life balance. Can't wait to be part of it!",
  //   quotedComment: '',
  //   likesCount: 12,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fb31dc23e0f96d8ddaa8',
  //   comment:
  //     "I heard there might be a surprise guest at the event. That's intriguing! Count me in!",
  //   quotedComment: '',
  //   likesCount: 14,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fb31dc23e0f96d8ddaa8',
  //   comment:
  //     'Employee Appreciation Events make our workplace feel like a big family. Looking forward to it!',
  //   quotedComment: '',
  //   likesCount: 11,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fb31dc23e0f96d8ddaa8',
  //   comment:
  //     "It's great to see the company's commitment to our well-being. Let's make this event memorable!",
  //   quotedComment: '',
  //   likesCount: 13,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fb31dc23e0f96d8ddaa8',
  //   comment:
  //     "The Employee Appreciation Event is a highlight of the year. Let's celebrate together!",
  //   quotedComment: '',
  //   likesCount: 17,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fb31dc23e0f96d8ddaa8',
  //   comment:
  //     'I heard there might be a karaoke session. Time to showcase our hidden talents!',
  //   quotedComment: '',
  //   likesCount: 16,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fb31dc23e0f96d8ddaa8',
  //   comment:
  //     'These events are a great way to relax and enjoy ourselves. Looking forward to it!',
  //   quotedComment: '',
  //   likesCount: 18,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  //
  // title: 'Team Building Workshop'
  //
  // {
  //   parentResourceId: '64d7fbdddc23e0f96d8ddaab',
  //   comment:
  //     "This sounds like an exciting event! Team building workshops are a great way to foster collaboration and boost morale within the company. I can't wait to participate and learn new skills that will benefit our team.",
  //   quotedComment: '',
  //   likesCount: 15,
  //   dislikesCount: 2,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fbdddc23e0f96d8ddaab',
  //   comment:
  //     "I completely agree with the previous comment. Team building workshops have always been a positive experience in my past workplaces. It's an excellent opportunity to connect with colleagues from different departments and strengthen our teamwork.",
  //   quotedComment: '',
  //   likesCount: 10,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fbdddc23e0f96d8ddaab',
  //   comment:
  //     "The announcement of this team building workshop couldn't have come at a better time. As we grow as a company, it's important to nurture a sense of unity and understanding among employees. I appreciate the initiative!",
  //   quotedComment: '',
  //   likesCount: 12,
  //   dislikesCount: 1,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fbdddc23e0f96d8ddaab',
  //   comment:
  //     "I'm looking forward to this workshop. It's going to be a great opportunity to learn more about my colleagues and develop stronger relationships with them. Kudos to the organizers!",
  //   quotedComment: '',
  //   likesCount: 8,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fbdddc23e0f96d8ddaab',
  //   comment:
  //     "This workshop seems like a fantastic way to promote a positive work environment. It's essential to invest in team building to ensure a successful and harmonious workplace. Looking forward to it!",
  //   quotedComment: '',
  //   likesCount: 14,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fbdddc23e0f96d8ddaab',
  //   comment:
  //     "I've heard great things about team building workshops. It's exciting to have one here at MacAuley Tech Repair. Let's make the most of this opportunity to connect and grow together!",
  //   quotedComment: '',
  //   likesCount: 7,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fbdddc23e0f96d8ddaab',
  //   comment:
  //     'Count me in! I believe that a strong team is the backbone of any successful organization. This workshop will undoubtedly contribute to our growth and camaraderie.',
  //   quotedComment: '',
  //   likesCount: 9,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fbdddc23e0f96d8ddaab',
  //   comment:
  //     "Team building workshops are not just about having fun; they also enhance our problem-solving and communication skills. Let's make the most of this opportunity!",
  //   quotedComment: '',
  //   likesCount: 6,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fbdddc23e0f96d8ddaab',
  //   comment:
  //     "I'm thrilled about this workshop! It's a chance for all of us to come together, share experiences, and become a stronger, more unified team. Let's make it a memorable event!",
  //   quotedComment: '',
  //   likesCount: 11,
  //   dislikesCount: 1,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fbdddc23e0f96d8ddaab',
  //   comment:
  //     'I appreciate the effort put into organizing events like these. They not only promote team spirit but also make the workplace more enjoyable. Looking forward to it!',
  //   quotedComment: '',
  //   likesCount: 10,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fbdddc23e0f96d8ddaab',
  //   comment:
  //     "This sounds like a fantastic opportunity to bond with our colleagues and build a stronger team. I'm really looking forward to it!",
  //   quotedComment: '',
  //   likesCount: 15,
  //   dislikesCount: 2,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fbdddc23e0f96d8ddaab',
  //   comment:
  //     'I agree, team building is essential for a healthy work environment. Count me in!',
  //   quotedComment: '',
  //   likesCount: 12,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fbdddc23e0f96d8ddaab',
  //   comment:
  //     "What kind of activities are we going to have during the workshop? I hope it's something fun and engaging!",
  //   quotedComment: '',
  //   likesCount: 9,
  //   dislikesCount: 1,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fbdddc23e0f96d8ddaab',
  //   comment:
  //     'I heard there might be a team-building scavenger hunt. That would be awesome!',
  //   quotedComment:
  //     "What kind of activities are we going to have during the workshop? I hope it's something fun and engaging!",
  //   likesCount: 5,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fbdddc23e0f96d8ddaab',
  //   comment:
  //     "I'm hoping this workshop helps us improve communication within the team. Communication is key!",
  //   quotedComment: '',
  //   likesCount: 8,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fbdddc23e0f96d8ddaab',
  //   comment:
  //     "Absolutely! Effective communication can solve a lot of issues. Let's make it count!",
  //   quotedComment:
  //     "I'm hoping this workshop helps us improve communication within the team. Communication is key!",
  //   likesCount: 7,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fbdddc23e0f96d8ddaab',
  //   comment:
  //     "This workshop is a great initiative to bring the team together. I'm excited to see how it will strengthen our bonds and improve teamwork!",
  //   quotedComment: '',
  //   likesCount: 13,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fbdddc23e0f96d8ddaab',
  //   comment:
  //     "Team building events like these can have a positive impact on workplace morale. It's an opportunity to learn more about our colleagues and build trust.",
  //   quotedComment: '',
  //   likesCount: 9,
  //   dislikesCount: 1,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fbdddc23e0f96d8ddaab',
  //   comment:
  //     "I'm curious to know if there will be any team-building games or challenges. Those can be really fun and effective!",
  //   quotedComment: '',
  //   likesCount: 7,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fbdddc23e0f96d8ddaab',
  //   comment:
  //     "Absolutely, I've attended similar workshops in the past, and they've always been enjoyable and educational. Looking forward to it!",
  //   quotedComment:
  //     "I'm curious to know if there will be any team-building games or challenges. Those can be really fun and effective!",
  //   likesCount: 6,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fbdddc23e0f96d8ddaab',
  //   comment:
  //     'This event is a great way to foster a sense of belonging in our team. Kudos to the organizers for putting this together!',
  //   quotedComment: '',
  //   likesCount: 10,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fbdddc23e0f96d8ddaab',
  //   comment:
  //     'I hope we get the chance to share some interesting stories and experiences during the workshop. It can help us understand each other better!',
  //   quotedComment: '',
  //   likesCount: 8,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fbdddc23e0f96d8ddaab',
  //   comment:
  //     "Team building is not just about work; it's about building relationships too. Looking forward to this event!",
  //   quotedComment: '',
  //   likesCount: 11,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fbdddc23e0f96d8ddaab',
  //   comment:
  //     "I'm hoping this workshop encourages us to collaborate more effectively. Let's make it a memorable experience!",
  //   quotedComment: '',
  //   likesCount: 8,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fbdddc23e0f96d8ddaab',
  //   comment:
  //     "I've heard team building can lead to increased productivity and innovation. Excited to see the positive impact!",
  //   quotedComment: '',
  //   likesCount: 9,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fbdddc23e0f96d8ddaab',
  //   comment:
  //     "Team building is an investment in our collective success. Let's embrace this opportunity to grow as a team!",
  //   quotedComment: '',
  //   likesCount: 12,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fbdddc23e0f96d8ddaab',
  //   comment:
  //     "I'm thrilled to hear about the Team Building Workshop. These events can really boost team cohesion and enhance our collective performance. Count me in for the fun and learning!",
  //   quotedComment: '',
  //   likesCount: 14,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fbdddc23e0f96d8ddaab',
  //   comment:
  //     "It's great to see the company investing in our well-being and teamwork. Let's embrace this opportunity to grow together and create lasting memories!",
  //   quotedComment: '',
  //   likesCount: 11,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fbdddc23e0f96d8ddaab',
  //   comment:
  //     "I wonder if we'll have any team-building challenges that require problem-solving skills. Those can be so engaging and bring out our creativity!",
  //   quotedComment: '',
  //   likesCount: 7,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fbdddc23e0f96d8ddaab',
  //   comment:
  //     "Team Building Workshops are not just about work; they're about building friendships too. Let's make this event unforgettable!",
  //   quotedComment: '',
  //   likesCount: 9,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fbdddc23e0f96d8ddaab',
  //   comment:
  //     "I've heard that these workshops often lead to improved communication within the team. Exciting times ahead!",
  //   quotedComment: '',
  //   likesCount: 10,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fbdddc23e0f96d8ddaab',
  //   comment:
  //     'Count me in for any trust-building exercises! Trust is the foundation of a strong team, after all.',
  //   quotedComment: '',
  //   likesCount: 8,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fbdddc23e0f96d8ddaab',
  //   comment:
  //     "I'm looking forward to learning more about my colleagues and their unique strengths during the workshop. It's an opportunity for personal growth as well!",
  //   quotedComment: '',
  //   likesCount: 12,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fbdddc23e0f96d8ddaab',
  //   comment:
  //     "Let's make this workshop a reflection of our dedication to excellence. Together, we can achieve great things!",
  //   quotedComment: '',
  //   likesCount: 13,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fbdddc23e0f96d8ddaab',
  //   comment:
  //     "I've read that team building can lead to increased job satisfaction. Here's to a happier and more productive workplace!",
  //   quotedComment: '',
  //   likesCount: 9,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fbdddc23e0f96d8ddaab',
  //   comment:
  //     "This workshop is a testament to our commitment to growth and collaboration. Let's make it an event to remember!",
  //   quotedComment: '',
  //   likesCount: 14,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  //
  // title: 'Employee Survey'
  //
  // {
  //   parentResourceId: '64d7fc5cdc23e0f96d8ddaae',
  //   comment:
  //     "I'm glad to see that the company values our input through this Employee Survey. It's an excellent opportunity for us to provide feedback on various aspects of our work environment, which can ultimately lead to positive changes. I appreciate the effort put into making our workplace better.",
  //   quotedComment: '',
  //   likesCount: 20,
  //   dislikesCount: 1,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fc5cdc23e0f96d8ddaae',
  //   comment:
  //     "Absolutely, this survey is a crucial step towards improving employee satisfaction and engagement. Let's all take the time to share our thoughts and contribute to a better workplace for everyone.",
  //   quotedComment: '',
  //   likesCount: 18,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fc5cdc23e0f96d8ddaae',
  //   comment:
  //     'I hope the survey covers a wide range of topics, from work-life balance to career development opportunities. Our input can shape the future of our careers here.',
  //   quotedComment: '',
  //   likesCount: 15,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fc5cdc23e0f96d8ddaae',
  //   comment:
  //     "I heard that the company is also planning to provide actionable insights based on the survey results. That's a fantastic initiative that shows our voices are heard and acted upon.",
  //   quotedComment: '',
  //   likesCount: 14,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fc5cdc23e0f96d8ddaae',
  //   comment:
  //     "The Employee Survey is an opportunity for us to express our thoughts and concerns openly. Let's use it wisely to ensure our work environment becomes even better.",
  //   quotedComment: '',
  //   likesCount: 16,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fc5cdc23e0f96d8ddaae',
  //   comment:
  //     'I hope the company takes into account the feedback provided and works towards implementing positive changes. It would make a significant difference in our daily work lives.',
  //   quotedComment: '',
  //   likesCount: 17,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fc5cdc23e0f96d8ddaae',
  //   comment:
  //     "This Employee Survey is a testament to our company's commitment to employee well-being. Let's all participate actively and make our voices heard for a brighter future.",
  //   quotedComment: '',
  //   likesCount: 19,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fc5cdc23e0f96d8ddaae',
  //   comment:
  //     "I'm looking forward to sharing my thoughts in the survey. It's a positive step towards making our workplace even better, and I appreciate the opportunity.",
  //   quotedComment: '',
  //   likesCount: 14,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fc5cdc23e0f96d8ddaae',
  //   comment:
  //     "Our feedback in this survey can shape the direction of our company. Let's all contribute to the positive growth of our workplace!",
  //   quotedComment: '',
  //   likesCount: 17,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fc5cdc23e0f96d8ddaae',
  //   comment:
  //     "The Employee Survey is an excellent way to foster communication between employees and management. Let's make the most of it by sharing our thoughts constructively.",
  //   quotedComment: '',
  //   likesCount: 15,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fc5cdc23e0f96d8ddaae',
  //   comment:
  //     "I appreciate the company's initiative in conducting this Employee Survey. It's an excellent opportunity for us to voice our opinions and contribute to the betterment of our workplace. I'm looking forward to sharing my thoughts and ideas.",
  //   quotedComment: '',
  //   likesCount: 10,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fc5cdc23e0f96d8ddaae',
  //   comment:
  //     'I hope this survey addresses various aspects of our work environment, including work-life balance, professional growth, and collaboration. Our input can drive positive changes.',
  //   quotedComment: '',
  //   likesCount: 8,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fc5cdc23e0f96d8ddaae',
  //   comment:
  //     "The Employee Survey reflects the company's commitment to employee well-being. It's a step in the right direction towards creating a positive and productive work atmosphere.",
  //   quotedComment: '',
  //   likesCount: 7,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fc5cdc23e0f96d8ddaae',
  //   comment:
  //     "I'm curious to see the survey questions and the topics it covers. Our feedback can help shape the future of our workplace and enhance our overall experience.",
  //   quotedComment: '',
  //   likesCount: 6,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fc5cdc23e0f96d8ddaae',
  //   comment:
  //     "I've heard that the survey results will be used to make data-driven decisions. That's a promising approach that demonstrates the value placed on our feedback.",
  //   quotedComment: '',
  //   likesCount: 9,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fc5cdc23e0f96d8ddaae',
  //   comment:
  //     "Our input in this survey can contribute to a more inclusive and diverse workplace. Let's ensure our voices are heard and appreciated.",
  //   quotedComment: '',
  //   likesCount: 12,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fc5cdc23e0f96d8ddaae',
  //   comment:
  //     "I hope the company will share the survey results and action plans transparently. It will reinforce our trust in the organization's commitment to improvement.",
  //   quotedComment: '',
  //   likesCount: 11,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fc5cdc23e0f96d8ddaae',
  //   comment:
  //     "This Employee Survey is an opportunity for us to make a positive impact on our workplace culture. Let's seize it and contribute constructively.",
  //   quotedComment: '',
  //   likesCount: 13,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fc5cdc23e0f96d8ddaae',
  //   comment:
  //     "I believe that by participating in this survey, we are actively shaping our work environment. Let's ensure our feedback reflects our aspirations for a better workplace.",
  //   quotedComment: '',
  //   likesCount: 14,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fc5cdc23e0f96d8ddaae',
  //   comment:
  //     "The Employee Survey shows that our company values our voices. Let's make sure our feedback is insightful and contributes to the growth of our organization.",
  //   quotedComment: '',
  //   likesCount: 15,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  //
  // title: 'Customer Satisfaction Award'
  //
  // {
  //   parentResourceId: '64d7fda1dc23e0f96d8ddab1',
  //   comment:
  //     "Congratulations to the entire team on receiving the Customer Satisfaction Award! It's a testament to our dedication and commitment to providing top-notch service. Let's continue to excel and keep our customers happy!",
  //   quotedComment: '',
  //   likesCount: 15,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fda1dc23e0f96d8ddab1',
  //   comment:
  //     "I'm proud to be a part of a team that consistently goes above and beyond to satisfy our customers. This award is well-deserved, and I'm excited about what we can achieve in the future.",
  //   quotedComment: '',
  //   likesCount: 12,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fda1dc23e0f96d8ddab1',
  //   comment:
  //     "The Customer Satisfaction Award reflects our dedication to delivering exceptional service. It's a recognition of the hard work we put into ensuring our customers are delighted with our solutions.",
  //   quotedComment: '',
  //   likesCount: 14,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fda1dc23e0f96d8ddab1',
  //   comment:
  //     "I've seen firsthand the effort our team puts into making customers happy. This award is a well-earned acknowledgment of our commitment to excellence.",
  //   quotedComment: '',
  //   likesCount: 10,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fda1dc23e0f96d8ddab1',
  //   comment:
  //     "The Customer Satisfaction Award is not just a trophy; it's a symbol of our dedication to our clients. Let's use it as a source of inspiration to continue our outstanding work.",
  //   quotedComment: '',
  //   likesCount: 11,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fda1dc23e0f96d8ddab1',
  //   comment:
  //     "I believe this award is a reflection of our commitment to providing value to our customers. It's a proud moment for us all!",
  //   quotedComment: '',
  //   likesCount: 13,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fda1dc23e0f96d8ddab1',
  //   comment:
  //     "Receiving the Customer Satisfaction Award shows that we are on the right track in exceeding our customers' expectations. Let's keep up the fantastic work!",
  //   quotedComment: '',
  //   likesCount: 9,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fda1dc23e0f96d8ddab1',
  //   comment:
  //     "I'm thrilled to be part of a team that values customer satisfaction so highly. This award is a reflection of our dedication to delivering excellence.",
  //   quotedComment: '',
  //   likesCount: 10,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fda1dc23e0f96d8ddab1',
  //   comment:
  //     "The Customer Satisfaction Award is a reminder that our hard work and customer-centric approach are paying off. Let's continue to make our customers smile!",
  //   quotedComment: '',
  //   likesCount: 12,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fda1dc23e0f96d8ddab1',
  //   comment:
  //     "This award is not just recognition; it's a motivation to consistently deliver outstanding service. Let's celebrate our achievement and aim even higher!",
  //   quotedComment: '',
  //   likesCount: 14,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fda1dc23e0f96d8ddab1',
  //   comment:
  //     "Congratulations to the entire team on receiving the Customer Satisfaction Award! It's a testament to our dedication and commitment to providing top-notch service. Let's continue to excel and keep our customers happy!",
  //   quotedComment: '',
  //   likesCount: 15,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fda1dc23e0f96d8ddab1',
  //   comment:
  //     "I'm proud to be a part of a team that consistently goes above and beyond to satisfy our customers. This award is well-deserved, and I'm excited about what we can achieve in the future.",
  //   quotedComment:
  //     "Congratulations to the entire team on receiving the Customer Satisfaction Award! It's a testament to our dedication and commitment to providing top-notch service. Let's continue to excel and keep our customers happy!",
  //   likesCount: 12,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fda1dc23e0f96d8ddab1',
  //   comment:
  //     "The Customer Satisfaction Award reflects our dedication to delivering exceptional service. It's a recognition of the hard work we put into ensuring our customers are delighted with our solutions.",
  //   quotedComment:
  //     "I'm proud to be a part of a team that consistently goes above and beyond to satisfy our customers. This award is well-deserved, and I'm excited about what we can achieve in the future.",
  //   likesCount: 14,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fda1dc23e0f96d8ddab1',
  //   comment:
  //     "I'm incredibly proud of our team for earning the Customer Satisfaction Award. It's a reflection of our collective dedication to making our customers happy. Let's cherish this achievement and aim even higher in the future.",
  //   quotedComment: '',
  //   likesCount: 18,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fda1dc23e0f96d8ddab1',
  //   comment:
  //     "This award is a symbol of our commitment to customer satisfaction. I believe it's a result of our team's consistent effort to go the extra mile for our customers. Let's keep up the fantastic work!",
  //   quotedComment:
  //     "I'm incredibly proud of our team for earning the Customer Satisfaction Award. It's a reflection of our collective dedication to making our customers happy. Let's cherish this achievement and aim even higher in the future.",
  //   likesCount: 17,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fda1dc23e0f96d8ddab1',
  //   comment:
  //     "I couldn't agree more. This award signifies our unwavering commitment to customer delight. It's a proud moment for us all, and I'm excited about the journey ahead.",
  //   quotedComment:
  //     "This award is a symbol of our commitment to customer satisfaction. I believe it's a result of our team's consistent effort to go the extra mile for our customers. Let's keep up the fantastic work!",
  //   likesCount: 16,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fda1dc23e0f96d8ddab1',
  //   comment:
  //     "Indeed, this award represents the dedication and hard work we put into ensuring our customers are happy. It's an acknowledgment of our excellence, and I'm proud to be a part of this team.",
  //   quotedComment:
  //     "I couldn't agree more. This award signifies our unwavering commitment to customer delight. It's a proud moment for us all, and I'm excited about the journey ahead.",
  //   likesCount: 15,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fda1dc23e0f96d8ddab1',
  //   comment:
  //     "I share your sentiments. Let's view this award as a reminder of our mission to exceed customer expectations. Our journey towards excellence continues!",
  //   quotedComment:
  //     "Indeed, this award represents the dedication and hard work we put into ensuring our customers are happy. It's an acknowledgment of our excellence, and I'm proud to be a part of this team.",
  //   likesCount: 14,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fda1dc23e0f96d8ddab1',
  //   comment:
  //     "Absolutely, let's use this award as motivation to keep providing exceptional service. Our customers deserve nothing but the best, and we're here to deliver it.",
  //   quotedComment:
  //     "I share your sentiments. Let's view this award as a reminder of our mission to exceed customer expectations. Our journey towards excellence continues!",
  //   likesCount: 13,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fda1dc23e0f96d8ddab1',
  //   comment:
  //     "Well said! This award is a testament to our commitment to customer satisfaction. Let's keep up the great work and make our customers smile even brighter.",
  //   quotedComment:
  //     "Absolutely, let's use this award as motivation to keep providing exceptional service. Our customers deserve nothing but the best, and we're here to deliver it.",
  //   likesCount: 12,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fda1dc23e0f96d8ddab1',
  //   comment:
  //     "I couldn't agree more with your sentiments. Let's use this award as a stepping stone to achieve even higher levels of customer satisfaction in the future.",
  //   quotedComment:
  //     "Well said! This award is a testament to our commitment to customer satisfaction. Let's keep up the great work and make our customers smile even brighter.",
  //   likesCount: 11,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fda1dc23e0f96d8ddab1',
  //   comment:
  //     "Absolutely, our journey towards excellence never stops. Let's continue to strive for perfection and maintain our commitment to customer happiness.",
  //   quotedComment:
  //     "I couldn't agree more with your sentiments. Let's use this award as a stepping stone to achieve even higher levels of customer satisfaction in the future.",
  //   likesCount: 10,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  //
  // title: 'Updated Training Modules' 64d7fe2bdc23e0f96d8ddab4
  //
  // {
  //   parentResourceId: '64d7fe2bdc23e0f96d8ddab4',
  //   comment:
  //     "I'm excited to see the updated training modules! Continuous learning is vital, and I'm sure these enhancements will further empower us in our roles. Kudos to the team for their hard work!",
  //   quotedComment: '',
  //   likesCount: 18,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fe2bdc23e0f96d8ddab4',
  //   comment:
  //     "Absolutely! Our commitment to ongoing learning sets us apart. I'm looking forward to exploring the new modules and expanding my knowledge.",
  //   quotedComment:
  //     "I'm excited to see the updated training modules! Continuous learning is vital, and I'm sure these enhancements will further empower us in our roles. Kudos to the team for their hard work!",
  //   likesCount: 17,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fe2bdc23e0f96d8ddab4',
  //   comment:
  //     "Learning never stops, and it's great to know our organization invests in our growth. These updated modules will undoubtedly help us stay at the forefront of our field.",
  //   quotedComment:
  //     "Absolutely! Our commitment to ongoing learning sets us apart. I'm looking forward to exploring the new modules and expanding my knowledge.",
  //   likesCount: 16,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fe2bdc23e0f96d8ddab4',
  //   comment:
  //     "I couldn't agree more. The effort put into keeping our training materials up-to-date is commendable. It ensures we are well-equipped to face any challenge.",
  //   quotedComment:
  //     "Learning never stops, and it's great to know our organization invests in our growth. These updated modules will undoubtedly help us stay at the forefront of our field.",
  //   likesCount: 15,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fe2bdc23e0f96d8ddab4',
  //   comment:
  //     'Absolutely, our training is a cornerstone of our success. The updates show our commitment to excellence and ensuring we have the best resources available.',
  //   quotedComment:
  //     "I couldn't agree more. The effort put into keeping our training materials up-to-date is commendable. It ensures we are well-equipped to face any challenge.",
  //   likesCount: 14,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fe2bdc23e0f96d8ddab4',
  //   comment:
  //     "Well said! These updates reflect our company's dedication to our professional growth. Let's embrace these modules and continue to excel in our roles.",
  //   quotedComment:
  //     'Absolutely, our training is a cornerstone of our success. The updates show our commitment to excellence and ensuring we have the best resources available.',
  //   likesCount: 13,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fe2bdc23e0f96d8ddab4',
  //   comment:
  //     "I couldn't agree more with your sentiments. These modules are a testament to our organization's commitment to staying at the forefront of innovation.",
  //   quotedComment:
  //     "Well said! These updates reflect our company's dedication to our professional growth. Let's embrace these modules and continue to excel in our roles.",
  //   likesCount: 12,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fe2bdc23e0f96d8ddab4',
  //   comment:
  //     'Absolutely, our continuous learning culture keeps us competitive. These updated modules will enhance our skills and benefit our clients.',
  //   quotedComment:
  //     "I couldn't agree more with your sentiments. These modules are a testament to our organization's commitment to staying at the forefront of innovation.",
  //   likesCount: 11,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fe2bdc23e0f96d8ddab4',
  //   comment:
  //     "Well put! Let's dive into these modules with enthusiasm and dedication, knowing that they are designed to help us excel in our roles.",
  //   quotedComment:
  //     'Absolutely, our continuous learning culture keeps us competitive. These updated modules will enhance our skills and benefit our clients.',
  //   likesCount: 10,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fe2bdc23e0f96d8ddab4',
  //   comment:
  //     "These updated training modules look fantastic! It's evident that our organization values our growth and development. I can't wait to explore them and enhance my skills.",
  //   quotedComment: '',
  //   likesCount: 18,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fe2bdc23e0f96d8ddab4',
  //   comment:
  //     "I completely agree! It's refreshing to see our commitment to professional development. These modules will undoubtedly help us excel in our roles and better serve our clients.",
  //   quotedComment:
  //     "These updated training modules look fantastic! It's evident that our organization values our growth and development. I can't wait to explore them and enhance my skills.",
  //   likesCount: 17,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fe2bdc23e0f96d8ddab4',
  //   comment:
  //     "I couldn't agree more. The effort our team puts into these modules is commendable. Let's make the most of this opportunity for personal and professional growth.",
  //   quotedComment:
  //     "I completely agree! It's refreshing to see our commitment to professional development. These modules will undoubtedly help us excel in our roles and better serve our clients.",
  //   likesCount: 16,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fe2bdc23e0f96d8ddab4',
  //   comment:
  //     "Absolutely, these modules are a valuable resource. Let's engage with them wholeheartedly and embrace the learning journey.",
  //   quotedComment:
  //     "I couldn't agree more. The effort our team puts into these modules is commendable. Let's make the most of this opportunity for personal and professional growth.",
  //   likesCount: 15,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fe2bdc23e0f96d8ddab4',
  //   comment:
  //     'Indeed, continuous learning is key to our success. These updated modules are a testament to our commitment to excellence.',
  //   quotedComment:
  //     "Absolutely, these modules are a valuable resource. Let's engage with them wholeheartedly and embrace the learning journey.",
  //   likesCount: 14,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fe2bdc23e0f96d8ddab4',
  //   comment:
  //     "Well said! Let's seize this opportunity to develop new skills and deepen our knowledge. These modules are a step forward in our professional growth.",
  //   quotedComment:
  //     'Indeed, continuous learning is key to our success. These updated modules are a testament to our commitment to excellence.',
  //   likesCount: 13,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fe2bdc23e0f96d8ddab4',
  //   comment:
  //     "Absolutely, I'm eager to embark on this learning journey. Kudos to the team behind these modules for their dedication to our development.",
  //   quotedComment:
  //     "Well said! Let's seize this opportunity to develop new skills and deepen our knowledge. These modules are a step forward in our professional growth.",
  //   likesCount: 12,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fe2bdc23e0f96d8ddab4',
  //   comment:
  //     "Well put! Learning is an ongoing process, and these modules reflect our organization's commitment to staying at the forefront of our industry.",
  //   quotedComment:
  //     "Absolutely, I'm eager to embark on this learning journey. Kudos to the team behind these modules for their dedication to our development.",
  //   likesCount: 11,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fe2bdc23e0f96d8ddab4',
  //   comment:
  //     "Indeed, let's make the most of these resources. Our professional growth benefits both us and the company as a whole.",
  //   quotedComment:
  //     "Well put! Learning is an ongoing process, and these modules reflect our organization's commitment to staying at the forefront of our industry.",
  //   likesCount: 10,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fe2bdc23e0f96d8ddab4',
  //   comment:
  //     "I'm thrilled to see the updated training modules! It's a clear sign that our organization is invested in our professional growth. These modules are an excellent opportunity to expand our knowledge and skills.",
  //   quotedComment: '',
  //   likesCount: 20,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fe2bdc23e0f96d8ddab4',
  //   comment:
  //     "Absolutely! Learning is a lifelong journey, and these modules will help us stay at the forefront of our field. I can't wait to dive in and explore the new content.",
  //   quotedComment:
  //     "I'm thrilled to see the updated training modules! It's a clear sign that our organization is invested in our professional growth. These modules are an excellent opportunity to expand our knowledge and skills.",
  //   likesCount: 18,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fe2bdc23e0f96d8ddab4',
  //   comment:
  //     "I couldn't agree more. These modules are a testament to our company's commitment to excellence. Let's make the most of this opportunity to learn and grow.",
  //   quotedComment:
  //     "Absolutely! Learning is a lifelong journey, and these modules will help us stay at the forefront of our field. I can't wait to dive in and explore the new content.",
  //   likesCount: 17,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fe2bdc23e0f96d8ddab4',
  //   comment:
  //     "Indeed, these modules are a valuable resource for our professional development. Let's engage with them enthusiastically and continue to elevate our skills.",
  //   quotedComment:
  //     "I couldn't agree more. These modules are a testament to our company's commitment to excellence. Let's make the most of this opportunity to learn and grow.",
  //   likesCount: 16,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fe2bdc23e0f96d8ddab4',
  //   comment:
  //     'Absolutely, lifelong learning is a cornerstone of personal and professional growth. These updated modules are a step forward in our journey towards excellence.',
  //   quotedComment:
  //     "Indeed, these modules are a valuable resource for our professional development. Let's engage with them enthusiastically and continue to elevate our skills.",
  //   likesCount: 15,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fe2bdc23e0f96d8ddab4',
  //   comment:
  //     "Well said! Let's embrace these modules with dedication and a thirst for knowledge. Our organization's commitment to our development is commendable.",
  //   quotedComment:
  //     'Absolutely, lifelong learning is a cornerstone of personal and professional growth. These updated modules are a step forward in our journey towards excellence.',
  //   likesCount: 14,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fe2bdc23e0f96d8ddab4',
  //   comment:
  //     "I couldn't agree more with your sentiments. Let's leverage these modules to acquire new skills and deepen our expertise.",
  //   quotedComment:
  //     "Well said! Let's embrace these modules with dedication and a thirst for knowledge. Our organization's commitment to our development is commendable.",
  //   likesCount: 13,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fe2bdc23e0f96d8ddab4',
  //   comment:
  //     "Absolutely, these modules are an investment in our future success. Let's seize this opportunity to learn and grow together.",
  //   quotedComment:
  //     "I couldn't agree more with your sentiments. Let's leverage these modules to acquire new skills and deepen our expertise.",
  //   likesCount: 12,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fe2bdc23e0f96d8ddab4',
  //   comment:
  //     "Well put! These modules are a reflection of our organization's commitment to continuous improvement. Let's embrace them wholeheartedly.",
  //   quotedComment:
  //     "Absolutely, these modules are an investment in our future success. Let's seize this opportunity to learn and grow together.",
  //   likesCount: 11,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7fe2bdc23e0f96d8ddab4',
  //   comment:
  //     "Indeed, our growth as professionals is intertwined with our organization's commitment to providing the best resources for our development.",
  //   quotedComment:
  //     "Well put! These modules are a reflection of our organization's commitment to continuous improvement. Let's embrace them wholeheartedly.",
  //   likesCount: 10,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  //
  // title : 'Employee of the Month' 64d7ff05dc23e0f96d8ddab7
  //
  // {
  //   parentResourceId: '64d7ff05dc23e0f96d8ddab7',
  //   comment:
  //     "Congratulations to Jamie Nguyen, our Maintenance Worker of the Month! Jamie's dedication to ensuring our workplace runs smoothly is truly commendable. They consistently go above and beyond to maintain a safe and efficient environment.",
  //   quotedComment: '',
  //   likesCount: 25,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7ff05dc23e0f96d8ddab7',
  //   comment:
  //     "Well deserved, Jamie! Your hard work doesn't go unnoticed. You're a crucial part of our Maintenance team, and your contributions make a significant difference.",
  //   quotedComment:
  //     "Congratulations to Jamie Nguyen, our Maintenance Worker of the Month! Jamie's dedication to ensuring our workplace runs smoothly is truly commendable. They consistently go above and beyond to maintain a safe and efficient environment.",
  //   likesCount: 22,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7ff05dc23e0f96d8ddab7',
  //   comment:
  //     'Jamie, you set a high standard for dedication and excellence. Your meticulous approach to maintenance is an inspiration to us all. Keep up the fantastic work!',
  //   quotedComment:
  //     "Well deserved, Jamie! Your hard work doesn't go unnoticed. You're a crucial part of our Maintenance team, and your contributions make a significant difference.",
  //   likesCount: 20,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7ff05dc23e0f96d8ddab7',
  //   comment:
  //     "Absolutely, Jamie's attention to detail ensures our workplace operates seamlessly. We appreciate your dedication and commitment to excellence.",
  //   quotedComment:
  //     'Jamie, you set a high standard for dedication and excellence. Your meticulous approach to maintenance is an inspiration to us all. Keep up the fantastic work!',
  //   likesCount: 19,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7ff05dc23e0f96d8ddab7',
  //   comment:
  //     "Jamie, you make our workplace a better place with your hard work and dedication. Your contributions are invaluable, and we're lucky to have you on our team.",
  //   quotedComment:
  //     "Absolutely, Jamie's attention to detail ensures our workplace operates seamlessly. We appreciate your dedication and commitment to excellence.",
  //   likesCount: 18,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7ff05dc23e0f96d8ddab7',
  //   comment:
  //     "Well said! Jamie's commitment to excellence sets a positive example for all of us. Let's continue to learn from their dedication.",
  //   quotedComment:
  //     "Jamie, you make our workplace a better place with your hard work and dedication. Your contributions are invaluable, and we're lucky to have you on our team.",
  //   likesCount: 17,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7ff05dc23e0f96d8ddab7',
  //   comment:
  //     "Absolutely, Jamie's work ethic is truly inspiring. We should all strive to bring the same level of dedication to our roles.",
  //   quotedComment:
  //     "Well said! Jamie's commitment to excellence sets a positive example for all of us. Let's continue to learn from their dedication.",
  //   likesCount: 16,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7ff05dc23e0f96d8ddab7',
  //   comment:
  //     "Jamie, you're a role model for our Maintenance department. Your exceptional work makes a significant impact on our daily operations.",
  //   quotedComment:
  //     "Absolutely, Jamie's work ethic is truly inspiring. We should all strive to bring the same level of dedication to our roles.",
  //   likesCount: 15,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7ff05dc23e0f96d8ddab7',
  //   comment:
  //     "Well put! Jamie's dedication to their work sets the bar high, and it's a pleasure to have them on our team. Congratulations once again!",
  //   quotedComment:
  //     "Jamie, you're a role model for our Maintenance department. Your exceptional work makes a significant impact on our daily operations.",
  //   likesCount: 14,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7ff05dc23e0f96d8ddab7',
  //   comment:
  //     "Indeed, Jamie's commitment and contributions are truly outstanding. Let's all learn from their example and continue to excel in our roles.",
  //   quotedComment:
  //     "Well put! Jamie's dedication to their work sets the bar high, and it's a pleasure to have them on our team. Congratulations once again!",
  //   likesCount: 13,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7ff05dc23e0f96d8ddab7',
  //   comment:
  //     "Jamie Nguyen, our Maintenance Worker of the Month, deserves every bit of this recognition! Their dedication to keeping our workplace safe and well-maintained is exceptional. Jamie's attention to detail and tireless efforts have made a significant impact on our daily operations. Congratulations!",
  //   quotedComment: '',
  //   likesCount: 28,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7ff05dc23e0f96d8ddab7',
  //   comment:
  //     "Absolutely! Jamie's commitment to excellence sets a high standard for all of us. Their willingness to go the extra mile ensures that our workplace is not only functional but also a safe and pleasant environment for everyone.",
  //   quotedComment:
  //     "Jamie Nguyen, our Maintenance Worker of the Month, deserves every bit of this recognition! Their dedication to keeping our workplace safe and well-maintained is exceptional. Jamie's attention to detail and tireless efforts have made a significant impact on our daily operations. Congratulations!",
  //   likesCount: 24,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7ff05dc23e0f96d8ddab7',
  //   comment:
  //     "Jamie, your meticulous approach to maintenance is truly inspiring. You've shown us that even the smallest details matter. Thanks for making our workplace better every day!",
  //   quotedComment:
  //     "Absolutely! Jamie's commitment to excellence sets a high standard for all of us. Their willingness to go the extra mile ensures that our workplace is not only functional but also a safe and pleasant environment for everyone.",
  //   likesCount: 23,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7ff05dc23e0f96d8ddab7',
  //   comment:
  //     "Indeed, Jamie's work ethic is exceptional. Their dedication to maintaining our workplace reflects the values we hold dear as a company. Thank you for your hard work and congratulations!",
  //   quotedComment:
  //     "Jamie, your meticulous approach to maintenance is truly inspiring. You've shown us that even the smallest details matter. Thanks for making our workplace better every day!",
  //   likesCount: 21,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7ff05dc23e0f96d8ddab7',
  //   comment:
  //     "Jamie, your dedication to ensuring our workplace runs smoothly is truly admirable. Your contributions haven't gone unnoticed, and this recognition is well-deserved. Congratulations on being the Employee of the Month!",
  //   quotedComment:
  //     "Indeed, Jamie's work ethic is exceptional. Their dedication to maintaining our workplace reflects the values we hold dear as a company. Thank you for your hard work and congratulations!",
  //   likesCount: 20,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7ff05dc23e0f96d8ddab7',
  //   comment:
  //     "Well said! Jamie's commitment to their role is evident in every task they undertake. Let's all strive to follow Jamie's example and contribute to the success of our Maintenance department.",
  //   quotedComment:
  //     "Jamie, your dedication to ensuring our workplace runs smoothly is truly admirable. Your contributions haven't gone unnoticed, and this recognition is well-deserved. Congratulations on being the Employee of the Month!",
  //   likesCount: 19,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7ff05dc23e0f96d8ddab7',
  //   comment:
  //     "Absolutely, Jamie's work ethic is an example for all of us. Their contributions improve our daily work experience, and we're fortunate to have them on our team. Congratulations, Jamie!",
  //   quotedComment:
  //     "Well said! Jamie's commitment to their role is evident in every task they undertake. Let's all strive to follow Jamie's example and contribute to the success of our Maintenance department.",
  //   likesCount: 18,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7ff05dc23e0f96d8ddab7',
  //   comment:
  //     'Jamie, your dedication to your work sets an outstanding example. Your contributions make our workplace better for everyone, and this recognition is well-deserved. Congratulations!',
  //   quotedComment:
  //     "Absolutely, Jamie's work ethic is an example for all of us. Their contributions improve our daily work experience, and we're fortunate to have them on our team. Congratulations, Jamie!",
  //   likesCount: 17,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7ff05dc23e0f96d8ddab7',
  //   comment:
  //     "Well put! Jamie's dedication and hard work inspire us all. Let's continue to support and recognize the outstanding contributions of our team members.",
  //   quotedComment:
  //     'Jamie, your dedication to your work sets an outstanding example. Your contributions make our workplace better for everyone, and this recognition is well-deserved. Congratulations!',
  //   likesCount: 16,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7ff05dc23e0f96d8ddab7',
  //   comment:
  //     "Indeed, Jamie's dedication is a shining example. This recognition highlights the exceptional work they do, and we're fortunate to have such a dedicated team member.",
  //   quotedComment:
  //     "Well put! Jamie's dedication and hard work inspire us all. Let's continue to support and recognize the outstanding contributions of our team members.",
  //   likesCount: 15,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7ff05dc23e0f96d8ddab7',
  //   comment:
  //     "Congratulations to our outstanding Employee of the Month, Jamie Nguyen! Jamie's dedication and hard work in the Maintenance department have not only kept our workplace running smoothly but have also raised the bar for excellence. This recognition is well-deserved!",
  //   quotedComment: '',
  //   likesCount: 32,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7ff05dc23e0f96d8ddab7',
  //   comment:
  //     "Well done, Jamie! Your commitment to maintaining our workplace's efficiency and safety is truly remarkable. You've set a standard that we can all aspire to achieve. Keep up the fantastic work!",
  //   quotedComment:
  //     "Congratulations to our outstanding Employee of the Month, Jamie Nguyen! Jamie's dedication and hard work in the Maintenance department have not only kept our workplace running smoothly but have also raised the bar for excellence. This recognition is well-deserved!",
  //   likesCount: 28,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7ff05dc23e0f96d8ddab7',
  //   comment:
  //     "Jamie, your attention to detail is exceptional, and it's evident in the quality of your work. We appreciate your contributions to our Maintenance team, and this Employee of the Month award is a testament to your excellence.",
  //   quotedComment:
  //     "Well done, Jamie! Your commitment to maintaining our workplace's efficiency and safety is truly remarkable. You've set a standard that we can all aspire to achieve. Keep up the fantastic work!",
  //   likesCount: 26,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7ff05dc23e0f96d8ddab7',
  //   comment:
  //     "Absolutely, Jamie's dedication to their role is exemplary. They've played a crucial part in creating a safe and efficient workplace for us all. Congratulations on this well-deserved recognition!",
  //   quotedComment:
  //     "Jamie, your attention to detail is exceptional, and it's evident in the quality of your work. We appreciate your contributions to our Maintenance team, and this Employee of the Month award is a testament to your excellence.",
  //   likesCount: 25,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7ff05dc23e0f96d8ddab7',
  //   comment:
  //     "Jamie, your commitment to excellence is inspiring. You've shown us what dedication means in the Maintenance department. Keep up the great work and continue being a role model for us all.",
  //   quotedComment:
  //     "Absolutely, Jamie's dedication to their role is exemplary. They've played a crucial part in creating a safe and efficient workplace for us all. Congratulations on this well-deserved recognition!",
  //   likesCount: 24,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7ff05dc23e0f96d8ddab7',
  //   comment:
  //     "Well said! Jamie's dedication and commitment have made a significant impact on our daily operations. Let's all learn from their example and continue to excel in our roles.",
  //   quotedComment:
  //     "Jamie, your commitment to excellence is inspiring. You've shown us what dedication means in the Maintenance department. Keep up the great work and continue being a role model for us all.",
  //   likesCount: 23,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7ff05dc23e0f96d8ddab7',
  //   comment:
  //     "Indeed, Jamie's dedication is a shining example. This recognition highlights the exceptional work they do, and we're fortunate to have such a dedicated team member.",
  //   quotedComment:
  //     "Well said! Jamie's dedication and commitment have made a significant impact on our daily operations. Let's all learn from their example and continue to excel in our roles.",
  //   likesCount: 22,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7ff05dc23e0f96d8ddab7',
  //   comment:
  //     'Jamie, your contributions have enhanced the quality of our workplace. This recognition is a testament to your hard work and dedication. Congratulations on being the Employee of the Month!',
  //   quotedComment:
  //     "Indeed, Jamie's dedication is a shining example. This recognition highlights the exceptional work they do, and we're fortunate to have such a dedicated team member.",
  //   likesCount: 21,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7ff05dc23e0f96d8ddab7',
  //   comment:
  //     "Absolutely, Jamie's contributions have made our Maintenance department even more efficient. We're proud to have them as part of our team. Congratulations, Jamie!",
  //   quotedComment:
  //     'Jamie, your contributions have enhanced the quality of our workplace. This recognition is a testament to your hard work and dedication. Congratulations on being the Employee of the Month!',
  //   likesCount: 20,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '64d7ff05dc23e0f96d8ddab7',
  //   comment:
  //     "Jamie, your work ethic and dedication have not only benefited the Maintenance department but the entire organization. This recognition is well-deserved, and we're proud of your achievements!",
  //   quotedComment:
  //     "Absolutely, Jamie's contributions have made our Maintenance department even more efficient. We're proud to have them as part of our team. Congratulations, Jamie!",
  //   likesCount: 19,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  //
  // title: 'Company Mission Statement' 65139981878c0a62f4b644af
  //
  // {
  //   parentResourceId: '65139981878c0a62f4b644af',
  //   comment:
  //     "I'm thrilled to see our company defining its mission! A clear mission statement provides us with a shared purpose and direction. It will guide our decisions and actions, helping us achieve our goals together.",
  //   quotedComment: '',
  //   likesCount: 42,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644af',
  //   comment:
  //     "Absolutely! A well-defined mission statement reflects our values and objectives. It's not just a statement; it's a compass that will guide us through challenges and opportunities.",
  //   quotedComment:
  //     "I'm thrilled to see our company defining its mission! A clear mission statement provides us with a shared purpose and direction. It will guide our decisions and actions, helping us achieve our goals together.",
  //   likesCount: 38,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644af',
  //   comment:
  //     "This is a significant step for our organization. A well-crafted mission statement defines our identity and inspires us to work towards a common vision. I'm looking forward to seeing it!",
  //   quotedComment:
  //     "Absolutely! A well-defined mission statement reflects our values and objectives. It's not just a statement; it's a compass that will guide us through challenges and opportunities.",
  //   likesCount: 35,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644af',
  //   comment:
  //     'Indeed, our mission statement will be a cornerstone of our success. It will provide clarity and purpose to our work, helping us stay aligned and focused on our goals.',
  //   quotedComment:
  //     "This is a significant step for our organization. A well-crafted mission statement defines our identity and inspires us to work towards a common vision. I'm looking forward to seeing it!",
  //   likesCount: 33,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644af',
  //   comment:
  //     "I couldn't agree more. Our mission statement will serve as a guiding light, ensuring that we remain true to our values and objectives as we move forward.",
  //   quotedComment:
  //     'Indeed, our mission statement will be a cornerstone of our success. It will provide clarity and purpose to our work, helping us stay aligned and focused on our goals.',
  //   likesCount: 31,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644af',
  //   comment:
  //     "It's exciting to think about the impact our mission statement will have on our daily work. It will unite us in our shared purpose and inspire us to achieve great things together.",
  //   quotedComment:
  //     "I couldn't agree more. Our mission statement will serve as a guiding light, ensuring that we remain true to our values and objectives as we move forward.",
  //   likesCount: 29,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644af',
  //   comment:
  //     "I'm eager to see how our mission statement captures the essence of who we are as a company. It's an exciting time for all of us!",
  //   quotedComment:
  //     "It's exciting to think about the impact our mission statement will have on our daily work. It will unite us in our shared purpose and inspire us to achieve great things together.",
  //   likesCount: 27,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644af',
  //   comment:
  //     "Our mission statement will define our path and set the tone for our future endeavors. I'm optimistic about the positive changes it will bring to our organization.",
  //   quotedComment:
  //     "I'm eager to see how our mission statement captures the essence of who we are as a company. It's an exciting time for all of us!",
  //   likesCount: 25,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644af',
  //   comment:
  //     "Our mission statement represents our shared values and aspirations. I believe it will motivate us to excel in our roles and contribute to the company's growth.",
  //   quotedComment:
  //     "Our mission statement will define our path and set the tone for our future endeavors. I'm optimistic about the positive changes it will bring to our organization.",
  //   likesCount: 23,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644af',
  //   comment:
  //     "I'm looking forward to embracing our mission statement and working together towards a brighter future. It's a testament to our shared values and goals.",
  //   quotedComment:
  //     "Our mission statement represents our shared values and aspirations. I believe it will motivate us to excel in our roles and contribute to the company's growth.",
  //   likesCount: 21,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644af',
  //   comment:
  //     "I'm excited to see our company embracing its values and setting a clear direction with the mission statement. This statement will guide us in making decisions that align with our core principles, ultimately leading to success.",
  //   quotedComment: '',
  //   likesCount: 36,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644af',
  //   comment:
  //     "Absolutely! A well-defined mission statement provides a sense of purpose and unity among employees. It's a vital tool in achieving our long-term goals and staying true to our company's identity.",
  //   quotedComment:
  //     "I'm excited to see our company embracing its values and setting a clear direction with the mission statement. This statement will guide us in making decisions that align with our core principles, ultimately leading to success.",
  //   likesCount: 34,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644af',
  //   comment:
  //     "This is a significant moment for our organization. A well-crafted mission statement defines our purpose and helps us navigate through both challenges and opportunities. I'm eager to see it!",
  //   quotedComment:
  //     "Absolutely! A well-defined mission statement provides a sense of purpose and unity among employees. It's a vital tool in achieving our long-term goals and staying true to our company's identity.",
  //   likesCount: 32,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644af',
  //   comment:
  //     'Indeed, our mission statement will be the foundation of our success. It will guide our actions and decisions, ensuring that we all work toward a common goal.',
  //   quotedComment:
  //     "This is a significant moment for our organization. A well-crafted mission statement defines our purpose and helps us navigate through both challenges and opportunities. I'm eager to see it!",
  //   likesCount: 30,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644af',
  //   comment:
  //     'I completely agree. Our mission statement will serve as a constant reminder of our values and objectives, helping us make informed decisions that benefit both our team and our customers.',
  //   quotedComment:
  //     'Indeed, our mission statement will be the foundation of our success. It will guide our actions and decisions, ensuring that we all work toward a common goal.',
  //   likesCount: 28,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644af',
  //   comment:
  //     'The impact of our mission statement will be felt across the entire organization. It will provide us with a clear path forward and inspire us to work together toward a brighter future.',
  //   quotedComment:
  //     'I completely agree. Our mission statement will serve as a constant reminder of our values and objectives, helping us make informed decisions that benefit both our team and our customers.',
  //   likesCount: 26,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644af',
  //   comment:
  //     "I'm looking forward to how our mission statement captures the essence of our company's identity. It's a defining moment for us, and it will shape our future endeavors.",
  //   quotedComment:
  //     'The impact of our mission statement will be felt across the entire organization. It will provide us with a clear path forward and inspire us to work together toward a brighter future.',
  //   likesCount: 24,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644af',
  //   comment:
  //     "Our mission statement will guide us, not just in our work but in our shared commitment to success. It's a statement of our collective values and purpose as a company.",
  //   quotedComment:
  //     "I'm looking forward to how our mission statement captures the essence of our company's identity. It's a defining moment for us, and it will shape our future endeavors.",
  //   likesCount: 22,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644af',
  //   comment:
  //     "Count me in on the excitement! Our mission statement will motivate us to excel and grow, individually and as a team. It's a symbol of our shared vision for the future.",
  //   quotedComment:
  //     "Our mission statement will guide us, not just in our work but in our shared commitment to success. It's a statement of our collective values and purpose as a company.",
  //   likesCount: 20,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644af',
  //   comment:
  //     "I'm thrilled to see our company embracing its values and setting a clear direction with the mission statement. This statement will guide us in making decisions that align with our core principles, ultimately leading to success.",
  //   quotedComment: '',
  //   likesCount: 36,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644af',
  //   comment:
  //     "Absolutely! A well-defined mission statement provides a sense of purpose and unity among employees. It's a vital tool in achieving our long-term goals and staying true to our company's identity.",
  //   quotedComment:
  //     "I'm thrilled to see our company embracing its values and setting a clear direction with the mission statement. This statement will guide us in making decisions that align with our core principles, ultimately leading to success.",
  //   likesCount: 34,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644af',
  //   comment:
  //     "This is a significant moment for our organization. A well-crafted mission statement defines our purpose and helps us navigate through both challenges and opportunities. I'm eager to see it!",
  //   quotedComment:
  //     "Absolutely! A well-defined mission statement provides a sense of purpose and unity among employees. It's a vital tool in achieving our long-term goals and staying true to our company's identity.",
  //   likesCount: 32,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644af',
  //   comment:
  //     'Indeed, our mission statement will be the foundation of our success. It will guide our actions and decisions, ensuring that we all work toward a common goal.',
  //   quotedComment:
  //     "This is a significant moment for our organization. A well-crafted mission statement defines our purpose and helps us navigate through both challenges and opportunities. I'm eager to see it!",
  //   likesCount: 30,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644af',
  //   comment:
  //     'I completely agree. Our mission statement will serve as a constant reminder of our values and objectives, helping us make informed decisions that benefit both our team and our customers.',
  //   quotedComment:
  //     'Indeed, our mission statement will be the foundation of our success. It will guide our actions and decisions, ensuring that we all work toward a common goal.',
  //   likesCount: 28,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644af',
  //   comment:
  //     'The impact of our mission statement will be felt across the entire organization. It will provide us with a clear path forward and inspire us to work together toward a brighter future.',
  //   quotedComment:
  //     'I completely agree. Our mission statement will serve as a constant reminder of our values and objectives, helping us make informed decisions that benefit both our team and our customers.',
  //   likesCount: 26,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644af',
  //   comment:
  //     "I'm looking forward to how our mission statement captures the essence of our company's identity. It's a defining moment for us, and it will shape our future endeavors.",
  //   quotedComment:
  //     'The impact of our mission statement will be felt across the entire organization. It will provide us with a clear path forward and inspire us to work together toward a brighter future.',
  //   likesCount: 24,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644af',
  //   comment:
  //     "Our mission statement will guide us, not just in our work but in our shared commitment to success. It's a statement of our collective values and purpose as a company.",
  //   quotedComment:
  //     "I'm looking forward to how our mission statement captures the essence of our company's identity. It's a defining moment for us, and it will shape our future endeavors.",
  //   likesCount: 22,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644af',
  //   comment:
  //     "Count me in on the excitement! Our mission statement will motivate us to excel and grow, individually and as a team. It's a symbol of our shared vision for the future.",
  //   quotedComment:
  //     "Our mission statement will guide us, not just in our work but in our shared commitment to success. It's a statement of our collective values and purpose as a company.",
  //   likesCount: 20,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  //
  // title: 'Office Hours' 65139981878c0a62f4b644b0
  //
  // {
  //   parentResourceId: '65139981878c0a62f4b644b0',
  //   comment:
  //     'These new office hours are great news! Starting at 9am gives us a fresh start to the day, and ending at 5pm allows for a balanced work-life schedule. I appreciate this positive change.',
  //   quotedComment: '',
  //   likesCount: 45,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b0',
  //   comment:
  //     'I completely agree! The new office hours are more aligned with a typical workday, and it will make coordinating with other departments and clients easier. Thank you for this adjustment.',
  //   quotedComment:
  //     'These new office hours are great news! Starting at 9am gives us a fresh start to the day, and ending at 5pm allows for a balanced work-life schedule. I appreciate this positive change.',
  //   likesCount: 42,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b0',
  //   comment:
  //     "This change will also benefit our clients as they can reach us during standard business hours. It's a win-win for everyone. Kudos to the team for making this decision!",
  //   quotedComment:
  //     'I completely agree! The new office hours are more aligned with a typical workday, and it will make coordinating with other departments and clients easier. Thank you for this adjustment.',
  //   likesCount: 39,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b0',
  //   comment:
  //     "I'm excited about these new hours. It means we'll have more time for focused work and collaboration during the day. It's a positive step for productivity.",
  //   quotedComment: '',
  //   likesCount: 37,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b0',
  //   comment:
  //     "The 9am - 5pm hours will make it easier for me to balance work and personal commitments. It's a welcome change that promotes a healthier work-life balance.",
  //   quotedComment: '',
  //   likesCount: 35,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b0',
  //   comment:
  //     'These new hours will also help us accommodate employees with varying schedules and commitments outside of work. Flexibility is key to a happy and productive team.',
  //   quotedComment: '',
  //   likesCount: 33,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b0',
  //   comment:
  //     'I appreciate the thoughtfulness in this decision. It shows that our company values the well-being of its employees. Looking forward to a productive workday!',
  //   quotedComment: '',
  //   likesCount: 31,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b0',
  //   comment:
  //     "These hours will also help us better align with our international clients' schedules, making communication and collaboration smoother. It's a strategic move for our team.",
  //   quotedComment: '',
  //   likesCount: 29,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b0',
  //   comment:
  //     "I'm looking forward to a more structured workday. It will improve our overall efficiency and effectiveness as a team. Great decision!",
  //   quotedComment: '',
  //   likesCount: 27,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b0',
  //   comment:
  //     "These hours will definitely make it easier for everyone to plan meetings and collaborate effectively. It's a positive change that benefits our entire organization.",
  //   quotedComment: '',
  //   likesCount: 25,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b0',
  //   comment:
  //     "I'm delighted to hear about the new office hours from 9am to 5pm. This change will provide us with a more consistent work schedule, making it easier to plan our tasks and collaborate with colleagues. It's a positive step towards improving our productivity and work-life balance.",
  //   quotedComment: '',
  //   likesCount: 38,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b0',
  //   comment:
  //     "Absolutely! The 9am - 5pm hours align perfectly with the standard workday, which will facilitate better communication and coordination among teams. I'm looking forward to a more structured work routine.",
  //   quotedComment:
  //     "I'm delighted to hear about the new office hours from 9am to 5pm. This change will provide us with a more consistent work schedule, making it easier to plan our tasks and collaborate with colleagues. It's a positive step towards improving our productivity and work-life balance.",
  //   likesCount: 36,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b0',
  //   comment:
  //     "This adjustment also ensures that we are available during core business hours for our clients, which is crucial for maintaining strong relationships. It's a win-win situation for both our team and our customers.",
  //   quotedComment:
  //     "Absolutely! The 9am - 5pm hours align perfectly with the standard workday, which will facilitate better communication and coordination among teams. I'm looking forward to a more structured work routine.",
  //   likesCount: 34,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b0',
  //   comment:
  //     "The new office hours will allow us to be more in sync with other departments and external partners. It's a positive change that promotes greater efficiency in our day-to-day operations.",
  //   quotedComment: '',
  //   likesCount: 32,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b0',
  //   comment:
  //     "I appreciate the flexibility these hours offer. It means we can better accommodate the diverse needs and schedules of our team members. It's a step towards fostering a more inclusive work environment.",
  //   quotedComment: '',
  //   likesCount: 30,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b0',
  //   comment:
  //     'The 9am - 5pm hours are a positive change for our entire team. It will make it easier to plan meetings, collaborate effectively, and ensure that everyone has a chance to contribute their best during core work hours.',
  //   quotedComment: '',
  //   likesCount: 28,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b0',
  //   comment:
  //     'I see this change as a way to enhance our overall work experience. A well-defined work schedule promotes better work-life balance and helps us achieve our goals with greater focus.',
  //   quotedComment: '',
  //   likesCount: 26,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b0',
  //   comment:
  //     "These hours will also enable us to align more effectively with international colleagues and clients, ensuring smoother collaboration across different time zones. It's a strategic move for our organization.",
  //   quotedComment: '',
  //   likesCount: 24,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b0',
  //   comment:
  //     "I'm optimistic about the positive impact these new hours will have on our team's efficiency and well-being. It's a step towards a brighter and more productive future.",
  //   quotedComment: '',
  //   likesCount: 22,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b0',
  //   comment:
  //     "These new office hours will benefit us all. It's a change that reflects our commitment to providing a supportive and conducive work environment for our employees.",
  //   quotedComment: '',
  //   likesCount: 20,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  //
  // title: 'Meeting Requirements' 65139981878c0a62f4b644b6
  //
  // {
  //   parentResourceId: '65139981878c0a62f4b644b6',
  //   comment:
  //     'These updated meeting requirements are a positive step towards ensuring that our meetings are productive and well-organized. By having clear agendas and defined goals, we can make the most of our valuable time during meetings.',
  //   quotedComment: '',
  //   likesCount: 37,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b6',
  //   comment:
  //     'I appreciate the emphasis on inclusivity in these requirements. Ensuring that all team members have an opportunity to contribute and voice their ideas will lead to more innovative and effective meetings.',
  //   quotedComment: '',
  //   likesCount: 34,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b6',
  //   comment:
  //     "I'm glad to see that we are addressing meeting etiquette. It's important to be respectful of each other's time and ideas. These requirements will help create a more respectful and productive meeting culture.",
  //   quotedComment: '',
  //   likesCount: 32,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b6',
  //   comment:
  //     'The focus on setting clear action items and follow-ups is essential. It ensures that the decisions made during meetings are effectively implemented, contributing to our overall success as a team.',
  //   quotedComment: '',
  //   likesCount: 30,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b6',
  //   comment:
  //     'I completely agree with these requirements. They promote transparency and accountability in our meetings, which are key to achieving our collective goals.',
  //   quotedComment: '',
  //   likesCount: 28,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b6',
  //   comment:
  //     "These requirements will also help new team members integrate more smoothly into our meetings. It's essential to have a consistent and clear structure for everyone to follow.",
  //   quotedComment: '',
  //   likesCount: 26,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b6',
  //   comment:
  //     'I see these requirements as a valuable tool for improving our communication and collaboration. Well-organized meetings are a cornerstone of our success as a team.',
  //   quotedComment: '',
  //   likesCount: 24,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b6',
  //   comment:
  //     "The focus on documentation and follow-up ensures that we don't lose sight of our goals between meetings. It's a great way to keep our projects on track.",
  //   quotedComment: '',
  //   likesCount: 22,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b6',
  //   comment:
  //     "I appreciate the effort to continually improve our meeting practices. It's a testament to our commitment to excellence in all that we do.",
  //   quotedComment: '',
  //   likesCount: 20,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b6',
  //   comment:
  //     "These requirements will undoubtedly help us achieve better outcomes in our meetings. It's a positive change that will benefit the entire team.",
  //   quotedComment: '',
  //   likesCount: 18,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b6',
  //   comment:
  //     "I'm thrilled to see these new meeting requirements in place. They demonstrate our commitment to efficiency and collaboration. By setting clear expectations for meetings, we can ensure that our time is used productively and that everyone's voice is heard.",
  //   quotedComment: '',
  //   likesCount: 37,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b6',
  //   comment:
  //     'These requirements not only streamline our meetings but also help us maintain a respectful and professional environment. They reflect our dedication to fostering a positive workplace culture.',
  //   quotedComment: '',
  //   likesCount: 34,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b6',
  //   comment:
  //     "I believe that adherence to these guidelines will lead to more productive discussions and better decision-making. It's a step forward in ensuring that our meetings have a meaningful impact.",
  //   quotedComment: '',
  //   likesCount: 32,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b6',
  //   comment:
  //     "I appreciate the focus on inclusivity. It's essential that everyone feels comfortable contributing their ideas, and these requirements will help achieve that goal.",
  //   quotedComment: '',
  //   likesCount: 30,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b6',
  //   comment:
  //     "These requirements encourage us to be more organized in our meetings, which will ultimately save us time and ensure that we make the most of each session. I'm fully on board with this initiative.",
  //   quotedComment: '',
  //   likesCount: 28,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b6',
  //   comment:
  //     "I see this as a positive shift towards a more structured approach to our meetings. It's a clear sign of our dedication to continuous improvement.",
  //   quotedComment: '',
  //   likesCount: 26,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b6',
  //   comment:
  //     'The requirement to document action items and follow-ups is excellent. It ensures that our discussions translate into action and results.',
  //   quotedComment: '',
  //   likesCount: 24,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b6',
  //   comment:
  //     "I'm confident that these requirements will lead to more effective meetings and better outcomes. It's a positive step towards achieving our team's goals.",
  //   quotedComment: '',
  //   likesCount: 22,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b6',
  //   comment:
  //     'I appreciate the effort to continuously refine our meeting practices. It shows our commitment to excellence and growth as a team.',
  //   quotedComment: '',
  //   likesCount: 20,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b6',
  //   comment:
  //     "These requirements will undoubtedly lead to more fruitful meetings and enhance our overall efficiency. It's a positive change we can all benefit from.",
  //   quotedComment: '',
  //   likesCount: 18,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b6',
  //   comment:
  //     "I'm excited to see these changes in place. It's a testament to our commitment to continuous improvement and excellence.",
  //   quotedComment: '',
  //   likesCount: 16,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b6',
  //   comment:
  //     'These new meeting requirements are a welcome change. They provide a structured framework for our discussions, which can lead to more productive outcomes. I believe this will help us make better decisions and stay focused on our goals.',
  //   quotedComment: '',
  //   likesCount: 25,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b6',
  //   comment:
  //     "I'm excited about these changes! It's a great initiative to enhance the quality of our meetings. The focus on inclusivity and ensuring everyone's voice is heard is especially important. Let's embrace these requirements for more effective collaboration.",
  //   quotedComment: '',
  //   likesCount: 23,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b6',
  //   comment:
  //     "These requirements align with our commitment to professionalism and excellence. It's reassuring to know that our meetings will be more structured and that we'll have clear action items to follow up on. This is a positive step forward.",
  //   quotedComment: '',
  //   likesCount: 21,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b6',
  //   comment:
  //     "I'm optimistic that these requirements will reduce the time we spend in unproductive meetings. The emphasis on documenting decisions and action items will help us stay accountable and track our progress effectively.",
  //   quotedComment: '',
  //   likesCount: 19,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b6',
  //   comment:
  //     "These changes encourage a culture of transparency and efficiency. By adhering to these requirements, we demonstrate our commitment to making the most of our time and resources. I'm looking forward to more productive meetings!",
  //   quotedComment: '',
  //   likesCount: 17,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b6',
  //   comment:
  //     'I appreciate the thought and effort put into these requirements. They reflect our dedication to continuous improvement. These guidelines will help us work more cohesively as a team and achieve our objectives efficiently.',
  //   quotedComment: '',
  //   likesCount: 15,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b6',
  //   comment:
  //     "I believe these requirements will foster better communication and collaboration among us. It's an exciting step towards achieving our team's goals more effectively. Let's embrace these changes wholeheartedly!",
  //   quotedComment: '',
  //   likesCount: 13,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b6',
  //   comment:
  //     'I see these requirements as a positive transformation in the way we conduct meetings. They will not only save time but also enhance the quality of our discussions. Kudos to the team for implementing these improvements!',
  //   quotedComment: '',
  //   likesCount: 11,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b6',
  //   comment:
  //     "It's great to see that we're taking steps to make our meetings more efficient and purposeful. These requirements reflect our dedication to continuous learning and growth as a team. Let's embrace this change and make the most of it!",
  //   quotedComment: '',
  //   likesCount: 9,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b6',
  //   comment:
  //     "I'm confident that these requirements will lead to more fruitful meetings and enhance our overall efficiency. It's a positive change we can all benefit from.",
  //   quotedComment: '',
  //   likesCount: 7,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b6',
  //   comment:
  //     "These changes are a testament to our commitment to continuous improvement. It's inspiring to see our team taking proactive steps to optimize our meetings and work more effectively together.",
  //   quotedComment: '',
  //   likesCount: 5,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b6',
  //   comment:
  //     "I'm excited about the opportunities these changes bring. They signal our intention to work smarter and achieve better results. Let's embrace these requirements for a more successful team!",
  //   quotedComment: '',
  //   likesCount: 3,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b6',
  //   comment:
  //     "These requirements align with our core values as a team. They emphasize the importance of clear communication, collaboration, and accountability. I'm looking forward to more productive and effective meetings ahead!",
  //   quotedComment: '',
  //   likesCount: 1,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  //
  // title: 'Compensation Adjustments' 65139981878c0a62f4b644b5
  //
  // {
  //   parentResourceId: '65139981878c0a62f4b644b5',
  //   comment:
  //     "I appreciate the transparency in communicating these compensation adjustments. It's important for us to understand the rationale behind these changes. I look forward to continued growth and success as a team.",
  //   quotedComment: '',
  //   likesCount: 25,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b5',
  //   comment:
  //     "These adjustments reflect our commitment to recognizing and rewarding talent within our organization. I'm confident that this move will motivate and inspire us to perform at our best.",
  //   quotedComment: '',
  //   likesCount: 23,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b5',
  //   comment:
  //     "I believe these compensation adjustments will strengthen our team's morale and commitment. It's reassuring to see our company's dedication to fair and competitive compensation for all employees.",
  //   quotedComment: '',
  //   likesCount: 21,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b5',
  //   comment:
  //     "This announcement demonstrates that our organization values the contributions of every employee. I'm grateful for the opportunity to be part of a company that invests in its people.",
  //   quotedComment: '',
  //   likesCount: 19,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b5',
  //   comment:
  //     "These adjustments are a testament to our company's dedication to employee satisfaction and retention. I'm optimistic that this will lead to increased motivation and commitment across the board.",
  //   quotedComment: '',
  //   likesCount: 17,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b5',
  //   comment:
  //     "I see these compensation adjustments as an investment in our team's future. It's a clear indication that our company values talent and is willing to reward it appropriately.",
  //   quotedComment: '',
  //   likesCount: 15,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b5',
  //   comment:
  //     "I'm excited to see these changes in place. It's a testament to our commitment to employee satisfaction and retention. I believe this will lead to greater engagement and productivity.",
  //   quotedComment: '',
  //   likesCount: 13,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b5',
  //   comment:
  //     "These compensation adjustments show that our company values talent and is willing to invest in it. It's a positive step toward building a more motivated and engaged team.",
  //   quotedComment: '',
  //   likesCount: 11,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b5',
  //   comment:
  //     "I'm confident that these adjustments will have a positive impact on employee morale and job satisfaction. It's a sign of our company's commitment to fair compensation.",
  //   quotedComment: '',
  //   likesCount: 9,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b5',
  //   comment:
  //     "These changes are a reflection of our company's dedication to recognizing and rewarding excellence. It's an exciting time to be part of our organization.",
  //   quotedComment: '',
  //   likesCount: 7,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b5',
  //   comment:
  //     "I'm optimistic that these adjustments will enhance employee satisfaction and motivation. It's a positive move that shows our company's commitment to its workforce.",
  //   quotedComment: '',
  //   likesCount: 5,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b5',
  //   comment:
  //     "These compensation adjustments are a clear sign of our company's dedication to its employees' well-being. It's a positive step that will undoubtedly lead to increased job satisfaction.",
  //   quotedComment: '',
  //   likesCount: 3,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b5',
  //   comment:
  //     "I'm excited to see our company investing in its employees. These adjustments will motivate us to perform at our best and contribute to our organization's success.",
  //   quotedComment: '',
  //   likesCount: 1,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b5',
  //   comment:
  //     "These compensation adjustments are a clear sign of our company's dedication to its employees' well-being. It's a positive step that will undoubtedly lead to increased job satisfaction.",
  //   quotedComment: '',
  //   likesCount: 10,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b5',
  //   comment:
  //     "I'm excited to see our company investing in its employees. These adjustments will motivate us to perform at our best and contribute to our organization's success.",
  //   quotedComment: '',
  //   likesCount: 7,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b5',
  //   comment:
  //     "The announcement of these compensation adjustments fills me with optimism. It's a clear demonstration of our company's commitment to employee welfare and satisfaction.",
  //   quotedComment: '',
  //   likesCount: 5,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b5',
  //   comment:
  //     "These changes show that our organization values its employees and their contributions. I'm confident this will lead to a more motivated and engaged workforce.",
  //   quotedComment: '',
  //   likesCount: 4,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b5',
  //   comment:
  //     "I'm impressed by our company's proactive approach to compensation adjustments. This will not only boost morale but also attract top talent to our team.",
  //   quotedComment: '',
  //   likesCount: 3,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b5',
  //   comment:
  //     "These adjustments are a clear indication of our company's commitment to fair and competitive compensation. I believe this will enhance job satisfaction and productivity.",
  //   quotedComment: '',
  //   likesCount: 2,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b5',
  //   comment:
  //     "I'm excited about these compensation adjustments! It's great to see our company taking steps to ensure that our employees are well taken care of.",
  //   quotedComment: '',
  //   likesCount: 1,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b5',
  //   comment:
  //     "These adjustments reflect our company's dedication to recognizing and rewarding excellence. I'm confident that this move will motivate and inspire us to perform at our best.",
  //   quotedComment: '',
  //   likesCount: 0,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b5',
  //   comment:
  //     "These compensation adjustments are a welcome change that reflects the company's commitment to employee well-being. It's a positive step towards ensuring our hard work is recognized and rewarded fairly. Kudos to the team for making this happen!",
  //   quotedComment: '',
  //   likesCount: 10,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b5',
  //   comment:
  //     "I'm thrilled to hear about the compensation adjustments. It shows that the company values its employees and their contributions. These changes will undoubtedly boost employee morale and motivation.",
  //   quotedComment: '',
  //   likesCount: 7,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b5',
  //   comment:
  //     "The announcement of compensation adjustments is music to my ears. It's a clear indication that our company is progressive and dedicated to providing a rewarding work environment. This news has made my day!",
  //   quotedComment: '',
  //   likesCount: 5,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b5',
  //   comment:
  //     "These changes in compensation are a win-win for everyone. They will motivate employees to give their best and contribute to the company's continued success. It's an exciting time to be part of this organization.",
  //   quotedComment: '',
  //   likesCount: 4,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b5',
  //   comment:
  //     "I'm impressed by the company's proactive approach to compensation adjustments. It's a testament to our commitment to fair and competitive compensation practices. I believe this will lead to increased job satisfaction and productivity.",
  //   quotedComment: '',
  //   likesCount: 3,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b5',
  //   comment:
  //     "The news of compensation adjustments couldn't have come at a better time. It's reassuring to see our company invest in its employees, which will undoubtedly attract top talent and retain our valuable team members.",
  //   quotedComment: '',
  //   likesCount: 2,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b5',
  //   comment:
  //     "These adjustments represent a bright future for all of us. It's a testament to our company's dedication to recognizing and rewarding excellence. I'm looking forward to the positive impact it will have on our team.",
  //   quotedComment: '',
  //   likesCount: 1,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  //
  // title: 'Inclement Weather' 65139981878c0a62f4b644b2
  //
  // {
  //   parentResourceId: '65139981878c0a62f4b644b2',
  //   comment:
  //     "The announcement about inclement weather is a timely reminder to prioritize safety. Let's all ensure we stay informed and take necessary precautions when needed. Safety first!",
  //   quotedComment: '',
  //   likesCount: 5,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b2',
  //   comment:
  //     "Inclement weather can be unpredictable, but our commitment to safety is unwavering. Stay vigilant, stay safe, and don't hesitate to reach out to your team if you need assistance during challenging weather conditions.",
  //   quotedComment: '',
  //   likesCount: 7,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b2',
  //   comment:
  //     "Thank you for the heads-up regarding inclement weather. It's a reminder of the importance of preparedness and looking out for one another. Stay safe, everyone!",
  //   quotedComment: '',
  //   likesCount: 4,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b2',
  //   comment:
  //     "During inclement weather, communication is key. Let's make sure to keep each other informed and prioritize safety above all else. Together, we can weather any storm.",
  //   quotedComment: '',
  //   likesCount: 3,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b2',
  //   comment:
  //     "Inclement weather reminds us of the importance of adaptability and resilience. Let's take care of ourselves and our colleagues, and we'll get through any weather challenge that comes our way.",
  //   quotedComment: '',
  //   likesCount: 2,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b2',
  //   comment:
  //     "When it comes to inclement weather, safety should be our top priority. Let's stay informed, help one another, and ensure that our team members are safe and well during adverse conditions.",
  //   quotedComment: '',
  //   likesCount: 1,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b2',
  //   comment:
  //     "Thank you for the update. Safety should always be our top priority, especially during adverse weather conditions. I appreciate the company's concern for its employees' well-being.",
  //   quotedComment: '',
  //   likesCount: 12,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b2',
  //   comment:
  //     "I completely agree! It's crucial that we take necessary precautions and stay informed about any changes in our work schedule due to inclement weather. Safety first!",
  //   quotedComment: '',
  //   likesCount: 9,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: false,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b2',
  //   comment:
  //     "Does anyone have information about the specific weather conditions? It would be helpful to know what we're dealing with.",
  //   quotedComment: '',
  //   likesCount: 5,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: false,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b2',
  //   comment:
  //     "I heard that there's a heavy snowfall warning in our area. It's essential to plan accordingly and ensure everyone's safety during the commute.",
  //   quotedComment: '',
  //   likesCount: 7,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: false,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b2',
  //   comment:
  //     "I hope we have contingency plans in place for remote work if needed. It's always good to be prepared for unexpected disruptions.",
  //   quotedComment: '',
  //   likesCount: 6,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: false,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b2',
  //   comment:
  //     "Let's all stay safe and look out for each other during these weather challenges. Teamwork and communication are key!",
  //   quotedComment: '',
  //   likesCount: 8,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: false,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b2',
  //   comment:
  //     "I appreciate the company's consideration for our safety. It shows they care about their employees' well-being.",
  //   quotedComment: '',
  //   likesCount: 10,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: false,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b2',
  //   comment:
  //     "It's good to see that we're proactive about safety. Let's all keep an eye on the weather updates and follow company guidelines.",
  //   quotedComment: '',
  //   likesCount: 6,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: false,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b2',
  //   comment:
  //     'In case of heavy snow, I suggest everyone check their remote work setup and internet connection. Being prepared can save us a lot of trouble.',
  //   quotedComment: '',
  //   likesCount: 4,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: false,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b2',
  //   comment:
  //     "Safety reminders like these are always welcome. It's better to be informed and prepared in advance.",
  //   quotedComment: '',
  //   likesCount: 3,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: false,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b2',
  //   comment:
  //     "Let's hope for the best but prepare for the worst. Stay safe, everyone!",
  //   quotedComment: '',
  //   likesCount: 5,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: false,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b2',
  //   comment:
  //     "I've heard that public transportation might be affected. Make sure to check for any service updates if you rely on it for your commute.",
  //   quotedComment: '',
  //   likesCount: 4,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: false,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b2',
  //   comment:
  //     "Safety should always come first. Let's all keep an eye on the weather forecasts and be prepared for any changes.",
  //   quotedComment: '',
  //   likesCount: 3,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: false,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b2',
  //   comment:
  //     "Thank you for the update. It's important that we stay informed about any weather-related changes to our work schedule. Safety should always be a priority, especially during inclement weather conditions.",
  //   quotedComment: '',
  //   likesCount: 12,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b2',
  //   comment:
  //     "I completely agree with the previous comment. Our safety is paramount. Let's make sure we follow any guidelines provided by the company to ensure everyone's well-being.",
  //   quotedComment: '',
  //   likesCount: 9,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: false,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b2',
  //   comment:
  //     'Does anyone have more information about the weather conditions? It would be helpful to know what challenges we might face.',
  //   quotedComment: '',
  //   likesCount: 5,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: false,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b2',
  //   comment:
  //     "I heard there's a possibility of heavy snowfall. We should all take precautions and plan our commute accordingly to avoid any issues.",
  //   quotedComment: '',
  //   likesCount: 7,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: false,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b2',
  //   comment:
  //     "In case we need to work remotely due to the weather, it's a good idea to check our equipment and internet connection to ensure a smooth transition.",
  //   quotedComment: '',
  //   likesCount: 6,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: false,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b2',
  //   comment:
  //     "Let's all stay safe and support each other during these challenging weather conditions. Communication and teamwork are vital.",
  //   quotedComment: '',
  //   likesCount: 8,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: false,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b2',
  //   comment:
  //     "I appreciate the company's concern for our safety. It demonstrates that they value their employees' well-being.",
  //   quotedComment: '',
  //   likesCount: 10,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: false,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b2',
  //   comment:
  //     "It's reassuring to see that we prioritize safety. Let's all stay informed and follow any instructions provided by the company.",
  //   quotedComment: '',
  //   likesCount: 6,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: false,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b2',
  //   comment:
  //     'In the event of heavy snowfall, it might be wise to review our remote work setup. Being prepared can save us from potential disruptions.',
  //   quotedComment: '',
  //   likesCount: 4,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: false,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b2',
  //   comment:
  //     'Safety reminders like these are always appreciated. Being proactive and informed is key to handling unexpected situations.',
  //   quotedComment: '',
  //   likesCount: 3,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: false,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b2',
  //   comment:
  //     "Let's hope for the best but prepare for the worst. Stay safe, everyone!",
  //   quotedComment: '',
  //   likesCount: 5,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: false,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b2',
  //   comment:
  //     "I've heard that public transportation might be affected. If you rely on it for your commute, make sure to check for service updates.",
  //   quotedComment: '',
  //   likesCount: 4,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: false,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b2',
  //   comment:
  //     "Safety should always be our top priority. Let's stay informed about the weather forecasts and be prepared for any changes.",
  //   quotedComment: '',
  //   likesCount: 3,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: false,
  //   isDeleted: false,
  // },
  //
  // title: 'Bicycles and Scooters' 65139981878c0a62f4b644b7
  //
  // {
  //   parentResourceId: '65139981878c0a62f4b644b7',
  //   comment:
  //     "This is exciting news! Bicycles and scooters can be a convenient and eco-friendly way to commute to work. It's great to see the company promoting sustainable transportation options.",
  //   quotedComment: '',
  //   likesCount: 12,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b7',
  //   comment:
  //     "I couldn't agree more. This initiative aligns with our commitment to reducing our carbon footprint. I'm looking forward to trying out the bicycles and scooters.",
  //   quotedComment: '',
  //   likesCount: 9,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: false,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b7',
  //   comment:
  //     "I have some experience with electric scooters, and they are not only fun but also practical for short commutes. It's a great addition to our transportation options.",
  //   quotedComment: '',
  //   likesCount: 7,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: false,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b7',
  //   comment:
  //     "It's nice to see the company investing in alternative transportation methods. This can make our daily commutes more enjoyable and reduce traffic congestion.",
  //   quotedComment: '',
  //   likesCount: 6,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: false,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b7',
  //   comment:
  //     'I hope there will be proper training and safety guidelines for using these bicycles and scooters. Safety should always be a priority.',
  //   quotedComment: '',
  //   likesCount: 8,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: false,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b7',
  //   comment:
  //     'Absolutely, safety is crucial. Perhaps we can also organize group rides or events to encourage employees to use these new transportation options.',
  //   quotedComment: '',
  //   likesCount: 10,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: false,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b7',
  //   comment:
  //     "I'm curious about the availability and locations of these bicycles and scooters. It would be helpful to have that information to plan our commutes.",
  //   quotedComment: '',
  //   likesCount: 6,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: false,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b7',
  //   comment:
  //     'I second that. Knowing where we can access them will make it easier for us to incorporate them into our daily routines.',
  //   quotedComment: '',
  //   likesCount: 4,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: false,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b7',
  //   comment:
  //     'This initiative also promotes a healthier lifestyle. Biking or scootering to work can be a great way to stay active and reduce stress.',
  //   quotedComment: '',
  //   likesCount: 3,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: false,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b7',
  //   comment:
  //     "I'm looking forward to exploring this new transportation option. It's a step in the right direction for a more sustainable and employee-friendly workplace.",
  //   quotedComment: '',
  //   likesCount: 5,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: false,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b7',
  //   comment:
  //     "I've heard that some other companies have had great success with bike and scooter programs. It will be interesting to see how it works out for us.",
  //   quotedComment: '',
  //   likesCount: 4,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: false,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b7',
  //   comment:
  //     "Sustainability is a key aspect of our company culture, and this move aligns perfectly with that. Let's embrace these new options and make a positive impact on our environment.",
  //   quotedComment: '',
  //   likesCount: 3,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: false,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b7',
  //   comment:
  //     "This is an exciting development! Bicycles and scooters can offer a convenient and eco-friendly way to commute to work. It's wonderful to see the company embracing sustainable transportation options.",
  //   quotedComment: '',
  //   likesCount: 12,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b7',
  //   comment:
  //     "I couldn't agree more. This initiative reflects our commitment to reducing our carbon footprint. I'm looking forward to trying out the bicycles and scooters.",
  //   quotedComment: '',
  //   likesCount: 9,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: false,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b7',
  //   comment:
  //     "As someone who has used electric scooters before, I can attest to their practicality for short commutes. It's a great addition to our transportation choices.",
  //   quotedComment: '',
  //   likesCount: 7,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: false,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b7',
  //   comment:
  //     "It's excellent to see the company investing in alternative transportation methods. This can make our daily commutes more enjoyable and help reduce traffic congestion.",
  //   quotedComment: '',
  //   likesCount: 6,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: false,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b7',
  //   comment:
  //     'I hope there will be proper training and safety guidelines for using these bicycles and scooters. Safety should always be our top priority.',
  //   quotedComment: '',
  //   likesCount: 8,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: false,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b7',
  //   comment:
  //     'Absolutely, safety is paramount. Perhaps we could organize group rides or events to encourage employees to use these new transportation options.',
  //   quotedComment: '',
  //   likesCount: 10,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: false,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b7',
  //   comment:
  //     "I'm curious about the availability and locations of these bicycles and scooters. It would be helpful to have that information to plan our commutes.",
  //   quotedComment: '',
  //   likesCount: 6,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: false,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b7',
  //   comment:
  //     'I second that. Knowing where we can access them will make it easier for us to incorporate them into our daily routines.',
  //   quotedComment: '',
  //   likesCount: 4,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: false,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b7',
  //   comment:
  //     'This initiative also promotes a healthier lifestyle. Biking or scootering to work can be a great way to stay active and reduce stress.',
  //   quotedComment: '',
  //   likesCount: 3,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: false,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b7',
  //   comment:
  //     "I'm looking forward to exploring this new transportation option. It's a step in the right direction for a more sustainable and employee-friendly workplace.",
  //   quotedComment: '',
  //   likesCount: 5,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: false,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b7',
  //   comment:
  //     "I've heard that some other companies have had great success with bike and scooter programs. It will be interesting to see how it works out for us.",
  //   quotedComment: '',
  //   likesCount: 4,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: false,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b7',
  //   comment:
  //     "Sustainability is a key aspect of our company culture, and this move aligns perfectly with that. Let's embrace these new options and make a positive impact on our environment.",
  //   quotedComment: '',
  //   likesCount: 3,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: false,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b7',
  //   comment:
  //     "This is indeed an exciting development! Bicycles and scooters provide a sustainable and efficient mode of transportation, which aligns perfectly with our company's commitment to environmental responsibility. I can't wait to give them a try.",
  //   quotedComment: '',
  //   likesCount: 12,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b7',
  //   comment:
  //     "I wholeheartedly agree! It's refreshing to see our company taking steps towards sustainability. These new transportation options not only benefit the environment but also promote a healthier lifestyle. Count me in!",
  //   quotedComment: '',
  //   likesCount: 9,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: false,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b7',
  //   comment:
  //     'As someone who enjoys cycling, this announcement brings a smile to my face. I look forward to pedaling my way to work, reducing my carbon footprint, and staying fit all at once.',
  //   quotedComment: '',
  //   likesCount: 7,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: false,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b7',
  //   comment:
  //     'This is a fantastic initiative! Bicycles and scooters can ease traffic congestion and make our daily commutes more enjoyable. I hope we receive safety training and guidelines to ensure a smooth ride.',
  //   quotedComment: '',
  //   likesCount: 6,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: false,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b7',
  //   comment:
  //     'Safety should be our top priority, indeed. Additionally, organizing group rides and events could build a sense of community among employees who choose these new transportation options.',
  //   quotedComment: '',
  //   likesCount: 8,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: false,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b7',
  //   comment:
  //     "I'm curious about the availability and locations of these bicycles and scooters. Having this information will help us incorporate them into our daily routines effectively.",
  //   quotedComment: '',
  //   likesCount: 10,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: false,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b7',
  //   comment:
  //     'I agree, knowing where we can access these transportation options is crucial. It would also be great to have a designated parking area for them at the office.',
  //   quotedComment: '',
  //   likesCount: 6,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: false,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b7',
  //   comment:
  //     'I believe this initiative not only benefits our environment but also promotes a healthier work-life balance. I look forward to incorporating biking into my daily commute!',
  //   quotedComment: '',
  //   likesCount: 4,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: false,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b7',
  //   comment:
  //     "Our company's commitment to sustainability is commendable. By embracing these transportation options, we can set an example for other organizations to follow.",
  //   quotedComment: '',
  //   likesCount: 3,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: false,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b7',
  //   comment:
  //     "I've heard that some other companies have had great success with bike and scooter programs. It will be interesting to see how this enhances our workplace experience.",
  //   quotedComment: '',
  //   likesCount: 5,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: false,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b7',
  //   comment:
  //     "Promoting sustainability is the way forward, and I'm thrilled that our company is taking these steps. Let's make the most of these new transportation options and reduce our carbon footprint together.",
  //   quotedComment: '',
  //   likesCount: 4,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: false,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b7',
  //   comment:
  //     "I'm excited about this announcement! Bicycles and scooters not only help the environment but can also make our commutes more enjoyable. Kudos to our company for embracing sustainability.",
  //   quotedComment: '',
  //   likesCount: 3,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: false,
  //   isDeleted: false,
  // },
  //
  // title: 'Press and Communications' 65139981878c0a62f4b644b3
  //
  // {
  //   parentResourceId: '65139981878c0a62f4b644b3',
  //   comment:
  //     "I'm thrilled to see our Press and Communications department thriving. Their dedication to keeping us informed and connected is truly remarkable. Keep up the excellent work!",
  //   quotedComment: '',
  //   likesCount: 12,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b3',
  //   comment:
  //     "Absolutely, our Press and Communications team plays a vital role in fostering transparency and ensuring we're all on the same page. Kudos to them!",
  //   quotedComment: '',
  //   likesCount: 9,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: false,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b3',
  //   comment:
  //     "I agree, the information they provide is invaluable. It's like having a reliable compass guiding us through the company's journey.",
  //   quotedComment: '',
  //   likesCount: 7,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: false,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b3',
  //   comment:
  //     "It's not just about communication; it's about effective communication, and our Press and Communications department excels in that regard.",
  //   quotedComment: '',
  //   likesCount: 6,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: false,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b3',
  //   comment:
  //     'Their ability to convey complex information in a clear and understandable way is commendable. It makes our work smoother and more efficient.',
  //   quotedComment: '',
  //   likesCount: 8,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: false,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b3',
  //   comment:
  //     "I hope the Press and Communications team continues to receive the recognition they deserve. Their efforts contribute significantly to our company's success.",
  //   quotedComment: '',
  //   likesCount: 10,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: false,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b3',
  //   comment:
  //     "I'm curious about their upcoming projects. Their creativity and innovation are always something to look forward to.",
  //   quotedComment: '',
  //   likesCount: 6,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: false,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b3',
  //   comment:
  //     'Their ability to adapt to changing trends and technologies is impressive. It ensures that our communications remain relevant and engaging.',
  //   quotedComment: '',
  //   likesCount: 4,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: false,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b3',
  //   comment:
  //     "I hope they continue to foster open channels of communication. It's one of the pillars of a healthy work environment.",
  //   quotedComment: '',
  //   likesCount: 3,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: false,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b3',
  //   comment:
  //     "Their work not only keeps us informed but also creates a sense of unity and belonging within the company. It's a job well done!",
  //   quotedComment: '',
  //   likesCount: 5,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: false,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b3',
  //   comment:
  //     "I've heard that our Press and Communications team is planning some exciting initiatives. It's going to be an interesting journey ahead.",
  //   quotedComment: '',
  //   likesCount: 4,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: false,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b3',
  //   comment:
  //     "In an era where communication is key, our Press and Communications department is the guardian of our company's voice. Let's appreciate their dedication.",
  //   quotedComment: '',
  //   likesCount: 3,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: false,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b3',
  //   comment:
  //     'This is fantastic news! The Press and Communications team does an exceptional job of keeping us informed and connected. Their dedication and hard work are truly commendable. Kudos to the team!',
  //   quotedComment: '',
  //   likesCount: 12,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b3',
  //   comment:
  //     "I couldn't agree more. The transparency and clarity in our communication owe much to this team's efforts. Keep up the excellent work!",
  //   quotedComment: '',
  //   likesCount: 9,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: false,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b3',
  //   comment:
  //     "Their ability to convey complex information in a simple and understandable manner is impressive. It ensures that we're all on the same page and can work effectively.",
  //   quotedComment: '',
  //   likesCount: 7,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: false,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b3',
  //   comment:
  //     "Indeed, the Press and Communications team plays a pivotal role in maintaining our company's image and reputation. Their contributions are invaluable.",
  //   quotedComment: '',
  //   likesCount: 6,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: false,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b3',
  //   comment:
  //     "Their work not only keeps us informed but also fosters a sense of unity and belonging within the company. It's a job well done!",
  //   quotedComment: '',
  //   likesCount: 8,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: false,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b3',
  //   comment:
  //     'I hope the Press and Communications team continues to innovate in their communication strategies. Their creativity is always refreshing.',
  //   quotedComment: '',
  //   likesCount: 10,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: false,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b3',
  //   comment:
  //     'Their adaptability to changing trends and technologies is remarkable. It ensures that our communications remain relevant and engaging.',
  //   quotedComment: '',
  //   likesCount: 6,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: false,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b3',
  //   comment:
  //     "Let's continue to encourage open and transparent communication within our company. It's the foundation of a healthy work environment.",
  //   quotedComment: '',
  //   likesCount: 4,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: false,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b3',
  //   comment:
  //     "Our Press and Communications team's work not only informs but also inspires. Their efforts contribute significantly to our company's success.",
  //   quotedComment: '',
  //   likesCount: 3,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: false,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b3',
  //   comment:
  //     "I've heard they have some exciting projects in the pipeline. It's going to be an interesting journey ahead for our communications.",
  //   quotedComment: '',
  //   likesCount: 5,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: false,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b3',
  //   comment:
  //     "In an era where communication is key, our Press and Communications team is the guardian of our company's voice. Let's appreciate their dedication.",
  //   quotedComment: '',
  //   likesCount: 3,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: false,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b3',
  //   comment:
  //     "I'm truly impressed by the dedication of our Press and Communications team. They consistently provide us with clear and concise information, making it easier for us to stay informed and connected as a company. Their work is invaluable!",
  //   quotedComment: '',
  //   likesCount: 12,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b3',
  //   comment:
  //     "Absolutely, their efforts contribute significantly to our company's success. Effective communication is the backbone of any organization, and they excel in it.",
  //   quotedComment: '',
  //   likesCount: 9,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: false,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b3',
  //   comment:
  //     "Their ability to simplify complex information is commendable. It ensures that we all have a clear understanding of our company's goals and initiatives.",
  //   quotedComment: '',
  //   likesCount: 7,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: false,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b3',
  //   comment:
  //     "I've had the pleasure of collaborating with the Press and Communications team, and I must say, their professionalism and dedication to their craft are truly inspiring.",
  //   quotedComment: '',
  //   likesCount: 6,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: false,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b3',
  //   comment:
  //     "Their work not only keeps us informed but also builds a sense of unity within the company. It's like they're the glue that holds us all together.",
  //   quotedComment: '',
  //   likesCount: 8,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: false,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b3',
  //   comment:
  //     "I'm excited to see what innovative communication strategies they'll come up with next. Their creativity always keeps us engaged and informed.",
  //   quotedComment: '',
  //   likesCount: 10,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: false,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b3',
  //   comment:
  //     'In a rapidly changing world, their adaptability to new technologies and trends is impressive. It ensures our communications remain relevant.',
  //   quotedComment: '',
  //   likesCount: 6,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: false,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b3',
  //   comment:
  //     "Let's continue to encourage open and transparent communication within our company. It's the key to our growth and success.",
  //   quotedComment: '',
  //   likesCount: 4,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: false,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b3',
  //   comment:
  //     "Their work not only informs but also inspires us to do better. It's a privilege to have such a dedicated team at our company.",
  //   quotedComment: '',
  //   likesCount: 3,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: false,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b3',
  //   comment:
  //     "I've heard rumors of exciting projects in the pipeline from the Press and Communications team. It's going to be a thrilling journey ahead for us all.",
  //   quotedComment: '',
  //   likesCount: 5,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: false,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b3',
  //   comment:
  //     "In an age where communication is vital, our Press and Communications team is our guiding light. Let's acknowledge and appreciate their dedication to our company's voice.",
  //   quotedComment: '',
  //   likesCount: 3,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: false,
  //   isDeleted: false,
  // },
  //
  // title: 'Vacation Requests' 65139981878c0a62f4b644b4
  //
  // {
  //   parentResourceId: '65139981878c0a62f4b644b4',
  //   comment:
  //     "I'm thrilled about the upcoming vacation season! It's a great opportunity for us all to recharge our batteries and come back even more productive and motivated than ever. Count me in for some well-deserved rest.",
  //   quotedComment: '',
  //   likesCount: 25,
  //   dislikesCount: 2,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b4',
  //   comment:
  //     "I couldn't agree more! Vacations are essential for maintaining a healthy work-life balance. I hope everyone gets the chance to relax and enjoy their time off.",
  //   quotedComment: '',
  //   likesCount: 30,
  //   dislikesCount: 1,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b4',
  //   comment:
  //     "Absolutely, vacations are a time to disconnect from work and focus on our well-being. I've already planned a camping trip with my family, and I can't wait!",
  //   quotedComment: '',
  //   likesCount: 22,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b4',
  //   comment:
  //     "I've been waiting for this announcement! I'll be heading to the beach for some relaxation and sunshine. It's essential to take a break and recharge.",
  //   quotedComment: '',
  //   likesCount: 18,
  //   dislikesCount: 3,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b4',
  //   comment:
  //     "I hope everyone has a fantastic vacation! It's a great time to explore new hobbies or spend quality time with loved ones. Can't wait to hear about everyone's adventures!",
  //   quotedComment: '',
  //   likesCount: 28,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b4',
  //   comment:
  //     "I'll be using this time to catch up on some reading. If anyone has book recommendations, please share them! Let's make the most of our vacation.",
  //   quotedComment: '',
  //   likesCount: 12,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b4',
  //   comment:
  //     "Vacation mode: ON! I'm looking forward to some peaceful moments in the countryside. Nature and tranquility – the perfect combo for a break.",
  //   quotedComment: '',
  //   likesCount: 20,
  //   dislikesCount: 1,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b4',
  //   comment:
  //     "Count me in for some adventure! I'll be hiking in the mountains, exploring the unknown, and making memories. Let's embrace the thrill of the outdoors.",
  //   quotedComment: '',
  //   likesCount: 19,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b4',
  //   comment:
  //     "I'm planning to visit family and friends I haven't seen in a while. It's heartwarming to reconnect with loved ones and create lasting memories together.",
  //   quotedComment: '',
  //   likesCount: 23,
  //   dislikesCount: 2,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b4',
  //   comment:
  //     "Vacation requests? More like vacation demands! 😄 Let's make sure we all enjoy this well-deserved break and come back refreshed and ready to tackle challenges.",
  //   quotedComment: '',
  //   likesCount: 32,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b4',
  //   comment:
  //     "I've prepared a checklist of things to do during my vacation, from trying new recipes to exploring local art galleries. Let's make every day count!",
  //   quotedComment: '',
  //   likesCount: 14,
  //   dislikesCount: 1,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b4',
  //   comment:
  //     "Vacation mode: Activated! Whether it's a staycation or an exotic getaway, let's embrace the freedom to do what makes us happy. Cheers to relaxation!",
  //   quotedComment: '',
  //   likesCount: 16,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b4',
  //   comment:
  //     "I've always wanted to learn a new language. This vacation, I'm starting with French! Bonjour to new beginnings and cultural exploration.",
  //   quotedComment: '',
  //   likesCount: 15,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b4',
  //   comment:
  //     "I'm really looking forward to the upcoming vacation season. It's a chance for all of us to take a break, relax, and spend quality time with our loved ones. I hope everyone gets to do something they enjoy during their time off.",
  //   quotedComment: '',
  //   likesCount: 20,
  //   dislikesCount: 1,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b4',
  //   comment:
  //     "I agree completely! Vacations are essential for recharging and coming back to work with renewed energy. Whether it's a tropical getaway or a staycation, I hope everyone makes the most of it.",
  //   quotedComment: '',
  //   likesCount: 18,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b4',
  //   comment:
  //     "Absolutely, taking time off is crucial for our well-being. I'm planning to explore some hiking trails I've never been to before. Nature and fresh air, here I come!",
  //   quotedComment: '',
  //   likesCount: 25,
  //   dislikesCount: 2,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b4',
  //   comment:
  //     "I've been dreaming about this vacation for months! I'm heading to the coast for some relaxation by the beach. It's the perfect time to unwind and enjoy the sun and surf.",
  //   quotedComment: '',
  //   likesCount: 22,
  //   dislikesCount: 1,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b4',
  //   comment:
  //     "I hope everyone has a fantastic vacation! Whether you're traveling or staying home, make sure to do what makes you happy. Can't wait to hear everyone's stories when we're back.",
  //   quotedComment: '',
  //   likesCount: 30,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b4',
  //   comment:
  //     "Vacation mode: ON! I'll be catching up on my reading list and trying out some new recipes. If anyone has book or food recommendations, please share!",
  //   quotedComment: '',
  //   likesCount: 15,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b4',
  //   comment:
  //     "Time to relax and recharge! I'm planning a road trip with my family, exploring new places and creating lasting memories. Let's make the most of this break.",
  //   quotedComment: '',
  //   likesCount: 28,
  //   dislikesCount: 3,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b4',
  //   comment:
  //     "Adventure awaits! I'm going camping in the wilderness, disconnecting from technology, and reconnecting with nature. It's a great way to clear your mind.",
  //   quotedComment: '',
  //   likesCount: 19,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b4',
  //   comment:
  //     "During my vacation, I plan to visit old friends and spend quality time with family. It's heartwarming to catch up and create new memories together.",
  //   quotedComment: '',
  //   likesCount: 23,
  //   dislikesCount: 2,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b4',
  //   comment:
  //     "Vacation time is here, and I'm ready to relax and recharge. Let's all make the most of it, whether it's a staycation or an adventure abroad. Here's to a great break!",
  //   quotedComment: '',
  //   likesCount: 24,
  //   dislikesCount: 1,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b4',
  //   comment:
  //     "I've got my vacation checklist ready, from trying new hobbies to exploring local attractions. Let's make our time off memorable and enjoyable!",
  //   quotedComment: '',
  //   likesCount: 16,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b4',
  //   comment:
  //     "Vacation mode: Activated! Whether it's a quiet staycation or an adventure abroad, let's embrace the freedom to do what makes us happy. Here's to a well-deserved break!",
  //   quotedComment: '',
  //   likesCount: 21,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b4',
  //   comment:
  //     "I've always wanted to learn a new language, and this vacation, I'm starting with French! Bonjour to new beginnings and cultural exploration.",
  //   quotedComment: '',
  //   likesCount: 17,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  //
  // title: 'Dogs in the Office' 65139981878c0a62f4b644b1
  //
  // {
  //   parentResourceId: '65139981878c0a62f4b644b1',
  //   comment:
  //     "I'm absolutely thrilled about the idea of having dogs in the office! It's going to create such a positive and relaxing atmosphere. I can't wait to see all the furry coworkers brightening our days.",
  //   quotedComment: '',
  //   likesCount: 25,
  //   dislikesCount: 2,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b1',
  //   comment:
  //     "This is such a fantastic initiative! Dogs have a way of reducing stress and bringing smiles to everyone's faces. I'm sure our canine companions will be a hit in the office.",
  //   quotedComment: '',
  //   likesCount: 30,
  //   dislikesCount: 1,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b1',
  //   comment:
  //     "I couldn't agree more! Dogs have a unique way of fostering a sense of community and relaxation. I'm excited to have them as part of our workplace.",
  //   quotedComment: '',
  //   likesCount: 22,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b1',
  //   comment:
  //     "What a pawsome idea! I'm already thinking about bringing in my furry friend. Dogs in the office will surely make our workdays brighter and more enjoyable.",
  //   quotedComment: '',
  //   likesCount: 18,
  //   dislikesCount: 3,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b1',
  //   comment:
  //     "I'm looking forward to this new 'pupportunity'! Dogs have a way of creating a relaxed and friendly work environment. Let's embrace this positive change.",
  //   quotedComment: '',
  //   likesCount: 28,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b1',
  //   comment:
  //     "Count me in as a dog enthusiast! I can't wait to see tails wagging and hear happy barks in the office. Dogs truly make every day better.",
  //   quotedComment: '',
  //   likesCount: 12,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b1',
  //   comment:
  //     "This announcement has made my day! I'll be sure to bring in my furry friend as well. Let's create a welcoming space for our four-legged colleagues.",
  //   quotedComment: '',
  //   likesCount: 20,
  //   dislikesCount: 1,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b1',
  //   comment:
  //     "I'm all for dogs in the office! It's a wonderful way to promote a positive work-life balance. I can already imagine the happiness they'll bring.",
  //   quotedComment: '',
  //   likesCount: 19,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b1',
  //   comment:
  //     "During breaks, I'm excited to take a stroll with our office dogs. Fresh air and canine companionship - the perfect way to recharge during the workday.",
  //   quotedComment: '',
  //   likesCount: 23,
  //   dislikesCount: 2,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b1',
  //   comment:
  //     "This announcement is 'pawsitively' wonderful! I'm sure our office dogs will become the unofficial mascots of our workplace. Can't wait to meet them!",
  //   quotedComment: '',
  //   likesCount: 32,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b1',
  //   comment:
  //     "I've got some dog treats ready for our new colleagues! Dogs bring joy and a sense of camaraderie. Let's make them feel at home in the office.",
  //   quotedComment: '',
  //   likesCount: 14,
  //   dislikesCount: 1,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b1',
  //   comment:
  //     "Dogs in the office? Count me in for the 'pawsitive' change! It's going to be a tail-wagging good time, and I'm all for it.",
  //   quotedComment: '',
  //   likesCount: 16,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b1',
  //   comment:
  //     "I've always believed that dogs bring a sense of joy and relaxation. This is a fantastic initiative, and I can't wait to see our canine coworkers around the office.",
  //   quotedComment: '',
  //   likesCount: 15,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b1',
  //   comment:
  //     'This is such exciting news! Having dogs in the office will undoubtedly create a more relaxed and enjoyable work environment. I can already picture their wagging tails and friendly greetings in the morning.',
  //   quotedComment: '',
  //   likesCount: 32,
  //   dislikesCount: 1,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b1',
  //   comment:
  //     "I completely agree! Dogs have a magical way of bringing joy to our lives. I'm looking forward to sharing my workspace with these wonderful four-legged coworkers.",
  //   quotedComment: '',
  //   likesCount: 28,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b1',
  //   comment:
  //     "It's going to be a 'paw-sitive' change for sure! I've always believed that dogs can brighten even the gloomiest of days. Let's welcome them with open arms and treats!",
  //   quotedComment: '',
  //   likesCount: 24,
  //   dislikesCount: 1,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b1',
  //   comment:
  //     "I couldn't be happier about this announcement! Dogs have an incredible ability to reduce stress and boost morale. I'm sure our productivity will soar with them around.",
  //   quotedComment: '',
  //   likesCount: 29,
  //   dislikesCount: 2,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b1',
  //   comment:
  //     "I'm already thinking of bringing in my furry friend to join the office pack. Dogs in the office will create a warm and welcoming atmosphere that everyone will love.",
  //   quotedComment: '',
  //   likesCount: 27,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b1',
  //   comment:
  //     "Count me in for the 'Dog Days' at the office! I've heard that dogs can increase creativity and reduce stress, so I'm excited for the positive changes ahead.",
  //   quotedComment: '',
  //   likesCount: 26,
  //   dislikesCount: 1,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b1',
  //   comment:
  //     "This news just made my day! Dogs are incredible companions, and I can't wait to have them around during work. I'll be sure to bring in some dog treats!",
  //   quotedComment: '',
  //   likesCount: 25,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b1',
  //   comment:
  //     "I'm already planning to create a 'Dogs of the Office' Instagram account to document our furry coworkers' adventures. Get ready for some adorable posts!",
  //   quotedComment: '',
  //   likesCount: 30,
  //   dislikesCount: 2,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b1',
  //   comment:
  //     "What a wonderful initiative! Dogs are known for their unconditional love, and I'm sure they'll bring even more positivity to our workplace. Let's make them feel at home.",
  //   quotedComment: '',
  //   likesCount: 22,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b1',
  //   comment:
  //     "I'm already imagining our office meetings with dogs happily wagging their tails. This is going to be a game-changer for our office culture.",
  //   quotedComment: '',
  //   likesCount: 31,
  //   dislikesCount: 1,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b1',
  //   comment:
  //     "I've been looking forward to this for a long time! Dogs can create a sense of belonging, and I'm excited to see how they'll become part of our work family.",
  //   quotedComment: '',
  //   likesCount: 23,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b1',
  //   comment:
  //     "Dogs in the office? That's 'pawsitively' awesome! I'm sure they'll inspire us to work even harder and bring smiles to our faces every day.",
  //   quotedComment: '',
  //   likesCount: 33,
  //   dislikesCount: 2,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b1',
  //   comment:
  //     "I've always believed that dogs have a special way of making us happier. This decision is 'barking' good, and I'm excited to share our workspace with these furry companions.",
  //   quotedComment: '',
  //   likesCount: 27,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b1',
  //   comment:
  //     "This is fantastic news! Having dogs in the office is a brilliant idea. They bring so much joy and positivity. I can't wait to see their wagging tails around the workplace.",
  //   quotedComment: '',
  //   likesCount: 28,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b1',
  //   comment:
  //     "I couldn't agree more! Dogs have an incredible way of making everyone feel happier. I'm already thinking about bringing my pup to work.",
  //   quotedComment: '',
  //   likesCount: 26,
  //   dislikesCount: 1,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b1',
  //   comment:
  //     "This announcement just made my day! Dogs have a unique ability to reduce stress and create a friendly atmosphere. I'm excited for the 'Dog Days' at the office.",
  //   quotedComment: '',
  //   likesCount: 29,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b1',
  //   comment:
  //     "I'm already planning to create a 'Paws and Productivity' club at the office. Dogs can bring inspiration and a sense of community to our workplace.",
  //   quotedComment: '',
  //   likesCount: 30,
  //   dislikesCount: 2,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b1',
  //   comment:
  //     "I've always believed that dogs make the best coworkers! This is going to be a game-changer for our office culture. I can't wait to meet our new furry colleagues.",
  //   quotedComment: '',
  //   likesCount: 27,
  //   dislikesCount: 1,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b1',
  //   comment:
  //     "Count me in for the 'Doggy Desk' program! I'm sure dogs in the office will enhance creativity and create a more relaxed atmosphere for everyone.",
  //   quotedComment: '',
  //   likesCount: 31,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b1',
  //   comment:
  //     "I've already started preparing a 'Doggie Delights' treat jar for our furry coworkers. Dogs in the office will make every day a little brighter.",
  //   quotedComment: '',
  //   likesCount: 25,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b1',
  //   comment:
  //     "This announcement is 'pawsitively' wonderful! I'm sure our office will become even more of a welcoming and inclusive place with dogs around.",
  //   quotedComment: '',
  //   likesCount: 33,
  //   dislikesCount: 2,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b1',
  //   comment:
  //     "I'm already planning 'Yappy Hours' for our office. Dogs in the office will create a sense of unity and make our workplace even better.",
  //   quotedComment: '',
  //   likesCount: 24,
  //   dislikesCount: 1,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b1',
  //   comment:
  //     "I've heard that dogs can increase productivity and reduce stress levels. This decision is 'barking' good, and I'm excited to have our four-legged friends at work.",
  //   quotedComment: '',
  //   likesCount: 32,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b1',
  //   comment:
  //     "I'm already brainstorming ideas for 'Doggy Dress-up Fridays.' Dogs in the office will surely add a touch of fun and creativity to our workdays.",
  //   quotedComment: '',
  //   likesCount: 22,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b1',
  //   comment:
  //     "Dogs in the office? That's 'pawsitively' awesome! I'm sure they'll inspire us to work even harder and bring smiles to our faces every day.",
  //   quotedComment: '',
  //   likesCount: 34,
  //   dislikesCount: 2,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b1',
  //   comment:
  //     "I've always believed that dogs have a special way of making us happier. This decision is 'barking' good, and I'm excited to share our workspace with these furry companions.",
  //   quotedComment: '',
  //   likesCount: 27,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  //
  // title: 'Expenses While Traveling' 65139981878c0a62f4b644b8
  //
  // {
  //   parentResourceId: '65139981878c0a62f4b644b8',
  //   comment:
  //     "Traveling for work can be both exciting and challenging. It's essential to keep track of your expenses to ensure a smooth reimbursement process. I recommend using digital expense tracking apps for convenience.",
  //   quotedComment: '',
  //   likesCount: 25,
  //   dislikesCount: 2,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b8',
  //   comment:
  //     'I totally agree! Expense tracking apps have been a lifesaver for me during work trips. They make it so much easier to log expenses and generate reports for reimbursement.',
  //   quotedComment: '',
  //   likesCount: 30,
  //   dislikesCount: 1,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b8',
  //   comment:
  //     "Another tip I'd like to add is to keep all your receipts organized. It's a good practice to use a dedicated envelope or folder for receipts. This helps in case there are any questions about your expenses later.",
  //   quotedComment: '',
  //   likesCount: 22,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b8',
  //   comment:
  //     "Absolutely, receipt organization is key! I'd also suggest taking photos of your receipts as a backup. Sometimes receipts fade, and having digital copies can be a lifesaver.",
  //   quotedComment: '',
  //   likesCount: 28,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b8',
  //   comment:
  //     'When it comes to meals, I recommend finding local places to eat. Not only do you get to experience the local culture, but it can also be more cost-effective than dining at hotels or international chains.',
  //   quotedComment: '',
  //   likesCount: 18,
  //   dislikesCount: 3,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b8',
  //   comment:
  //     "Great suggestion! Exploring local cuisine can be a delightful part of business trips. It's a win-win – you save on expenses and get to savor authentic flavors.",
  //   quotedComment: '',
  //   likesCount: 26,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b8',
  //   comment:
  //     "I always make a checklist before traveling to ensure I don't forget any essentials. This includes chargers, adapters, and all necessary documents. Being organized helps reduce stress during trips.",
  //   quotedComment: '',
  //   likesCount: 23,
  //   dislikesCount: 2,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b8',
  //   comment:
  //     "That's a great practice! A well-prepared traveler is a confident traveler. And when you're confident, you can focus on the work at hand rather than worrying about missing items.",
  //   quotedComment: '',
  //   likesCount: 29,
  //   dislikesCount: 1,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b8',
  //   comment:
  //     "One more piece of advice: if you're traveling internationally, make sure to notify your bank and credit card companies about your travel plans. This prevents any unexpected card issues while abroad.",
  //   quotedComment: '',
  //   likesCount: 24,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b8',
  //   comment:
  //     "Absolutely, financial preparation is crucial. Nobody wants to deal with payment issues while traveling. It's all about ensuring a smooth and stress-free journey.",
  //   quotedComment: '',
  //   likesCount: 27,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b8',
  //   comment:
  //     'I appreciate these tips! Traveling for work can be a bit overwhelming, but with the right strategies, it becomes a rewarding experience. Thank you all for sharing your insights.',
  //   quotedComment: '',
  //   likesCount: 32,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b8',
  //   comment:
  //     "You're welcome! We're all in this together, and sharing knowledge is what makes our workplace a supportive community. Safe travels to everyone!",
  //   quotedComment: '',
  //   likesCount: 34,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b8',
  //   comment:
  //     "Traveling for work can be both exciting and challenging. It's essential to keep track of your expenses to ensure a smooth reimbursement process. I recommend using digital expense tracking apps for convenience.",
  //   quotedComment: '',
  //   likesCount: 25,
  //   dislikesCount: 2,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b8',
  //   comment:
  //     'I totally agree! Expense tracking apps have been a lifesaver for me during work trips. They make it so much easier to log expenses and generate reports for reimbursement.',
  //   quotedComment:
  //     "Traveling for work can be both exciting and challenging. It's essential to keep track of your expenses to ensure a smooth reimbursement process. I recommend using digital expense tracking apps for convenience.",
  //   likesCount: 30,
  //   dislikesCount: 1,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b8',
  //   comment:
  //     "Another tip I'd like to add is to keep all your receipts organized. It's a good practice to use a dedicated envelope or folder for receipts. This helps in case there are any questions about your expenses later.",
  //   quotedComment: '',
  //   likesCount: 22,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b8',
  //   comment:
  //     "Absolutely, receipt organization is key! I'd also suggest taking photos of your receipts as a backup. Sometimes receipts fade, and having digital copies can be a lifesaver.",
  //   quotedComment:
  //     "Another tip I'd like to add is to keep all your receipts organized. It's a good practice to use a dedicated envelope or folder for receipts. This helps in case there are any questions about your expenses later.",
  //   likesCount: 28,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b8',
  //   comment:
  //     'When it comes to meals, I recommend finding local places to eat. Not only do you get to experience the local culture, but it can also be more cost-effective than dining at hotels or international chains.',
  //   quotedComment: '',
  //   likesCount: 18,
  //   dislikesCount: 3,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b8',
  //   comment:
  //     "Great suggestion! Exploring local cuisine can be a delightful part of business trips. It's a win-win – you save on expenses and get to savor authentic flavors.",
  //   quotedComment:
  //     'When it comes to meals, I recommend finding local places to eat. Not only do you get to experience the local culture, but it can also be more cost-effective than dining at hotels or international chains.',
  //   likesCount: 26,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b8',
  //   comment:
  //     "I always make a checklist before traveling to ensure I don't forget any essentials. This includes chargers, adapters, and all necessary documents. Being organized helps reduce stress during trips.",
  //   quotedComment: '',
  //   likesCount: 23,
  //   dislikesCount: 2,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b8',
  //   comment:
  //     "That's a great practice! A well-prepared traveler is a confident traveler. And when you're confident, you can focus on the work at hand rather than worrying about missing items.",
  //   quotedComment:
  //     "I always make a checklist before traveling to ensure I don't forget any essentials. This includes chargers, adapters, and all necessary documents. Being organized helps reduce stress during trips.",
  //   likesCount: 29,
  //   dislikesCount: 1,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b8',
  //   comment:
  //     "One more piece of advice: if you're traveling internationally, make sure to notify your bank and credit card companies about your travel plans. This prevents any unexpected card issues while abroad.",
  //   quotedComment: '',
  //   likesCount: 24,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b8',
  //   comment:
  //     "Absolutely, financial preparation is crucial. Nobody wants to deal with payment issues while traveling. It's all about ensuring a smooth and stress-free journey.",
  //   quotedComment:
  //     "One more piece of advice: if you're traveling internationally, make sure to notify your bank and credit card companies about your travel plans. This prevents any unexpected card issues while abroad.",
  //   likesCount: 27,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b8',
  //   comment:
  //     'I appreciate these tips! Traveling for work can be a bit overwhelming, but with the right strategies, it becomes a rewarding experience. Thank you all for sharing your insights.',
  //   quotedComment: '',
  //   likesCount: 32,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b8',
  //   comment:
  //     "You're welcome! We're all in this together, and sharing knowledge is what makes our workplace a supportive community. Safe travels to everyone!",
  //   quotedComment: '',
  //   likesCount: 34,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  //
  // title: 'Multicultural Events' 65139981878c0a62f4b644bb
  //
  // {
  //   parentResourceId: '65139981878c0a62f4b644bb',
  //   comment:
  //     "I'm thrilled to hear about these multicultural events! Diversity and inclusion are what make our workplace so special. Can't wait to celebrate different cultures together.",
  //   quotedComment: '',
  //   likesCount: 28,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644bb',
  //   comment:
  //     "Absolutely! These events allow us to learn from one another and appreciate the rich tapestry of cultures we have in our organization. It's a wonderful opportunity for unity.",
  //   quotedComment:
  //     "I'm thrilled to hear about these multicultural events! Diversity and inclusion are what make our workplace so special. Can't wait to celebrate different cultures together.",
  //   likesCount: 30,
  //   dislikesCount: 1,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644bb',
  //   comment:
  //     "I'm particularly excited about the food festivals! Food is a universal language, and it's a delicious way to explore different cultures. Count me in for the taste adventures!",
  //   quotedComment: '',
  //   likesCount: 22,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644bb',
  //   comment:
  //     "That's true! Food festivals bring people together like nothing else. I hope to see dishes from around the world, and maybe even some secret family recipes shared.",
  //   quotedComment:
  //     "I'm particularly excited about the food festivals! Food is a universal language, and it's a delicious way to explore different cultures. Count me in for the taste adventures!",
  //   likesCount: 28,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644bb',
  //   comment:
  //     "In addition to the food festivals, I hope we have cultural exhibitions too. It would be fascinating to learn about traditions, art, and history from our colleagues' backgrounds.",
  //   quotedComment: '',
  //   likesCount: 18,
  //   dislikesCount: 3,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644bb',
  //   comment:
  //     "That's a fantastic idea! Cultural exhibitions can be enlightening and help us connect on a deeper level. It's about celebrating our differences and finding common ground.",
  //   quotedComment:
  //     "In addition to the food festivals, I hope we have cultural exhibitions too. It would be fascinating to learn about traditions, art, and history from our colleagues' backgrounds.",
  //   likesCount: 26,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644bb',
  //   comment:
  //     "I'd love to participate in a language exchange program if that's on the agenda. Learning a few phrases from different languages would be a fun way to connect with coworkers.",
  //   quotedComment: '',
  //   likesCount: 23,
  //   dislikesCount: 2,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644bb',
  //   comment:
  //     "A language exchange program sounds fantastic! It's a great way to promote cross-cultural communication and understanding. Count me in for that too!",
  //   quotedComment:
  //     "I'd love to participate in a language exchange program if that's on the agenda. Learning a few phrases from different languages would be a fun way to connect with coworkers.",
  //   likesCount: 29,
  //   dislikesCount: 1,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644bb',
  //   comment:
  //     "I'm looking forward to these events as well! Our workplace is like a microcosm of the world, and these multicultural events will help us appreciate the global diversity we have.",
  //   quotedComment: '',
  //   likesCount: 24,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644bb',
  //   comment:
  //     "Absolutely! It's a reminder that we're part of a global community, and celebrating different cultures brings us closer together. Let's make these events memorable!",
  //   quotedComment:
  //     "I'm looking forward to these events as well! Our workplace is like a microcosm of the world, and these multicultural events will help us appreciate the global diversity we have.",
  //   likesCount: 27,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644bb',
  //   comment:
  //     "I appreciate the enthusiasm! It's heartwarming to see everyone excited about celebrating diversity. Let's make these events a reflection of our inclusive and supportive workplace.",
  //   quotedComment: '',
  //   likesCount: 32,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644bb',
  //   comment:
  //     "Indeed, we're fortunate to work in such a diverse and welcoming environment. These events will be a testament to the unity and camaraderie that define our workplace.",
  //   quotedComment: '',
  //   likesCount: 34,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644bb',
  //   comment:
  //     "I'm thrilled to hear about these multicultural events! Diversity and inclusion are what make our workplace so special. Can't wait to celebrate different cultures together.",
  //   quotedComment: '',
  //   likesCount: 28,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644bb',
  //   comment:
  //     "Absolutely! These events allow us to learn from one another and appreciate the rich tapestry of cultures we have in our organization. It's a wonderful opportunity for unity.",
  //   quotedComment:
  //     "I'm thrilled to hear about these multicultural events! Diversity and inclusion are what make our workplace so special. Can't wait to celebrate different cultures together.",
  //   likesCount: 30,
  //   dislikesCount: 1,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644bb',
  //   comment:
  //     "I'm particularly excited about the food festivals! Food is a universal language, and it's a delicious way to explore different cultures. Count me in for the taste adventures!",
  //   quotedComment: '',
  //   likesCount: 22,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644bb',
  //   comment:
  //     "That's true! Food festivals bring people together like nothing else. I hope to see dishes from around the world, and maybe even some secret family recipes shared.",
  //   quotedComment:
  //     "I'm particularly excited about the food festivals! Food is a universal language, and it's a delicious way to explore different cultures. Count me in for the taste adventures!",
  //   likesCount: 28,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644bb',
  //   comment:
  //     "In addition to the food festivals, I hope we have cultural exhibitions too. It would be fascinating to learn about traditions, art, and history from our colleagues' backgrounds.",
  //   quotedComment: '',
  //   likesCount: 18,
  //   dislikesCount: 3,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644bb',
  //   comment:
  //     "That's a fantastic idea! Cultural exhibitions can be enlightening and help us connect on a deeper level. It's about celebrating our differences and finding common ground.",
  //   quotedComment:
  //     "In addition to the food festivals, I hope we have cultural exhibitions too. It would be fascinating to learn about traditions, art, and history from our colleagues' backgrounds.",
  //   likesCount: 26,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644bb',
  //   comment:
  //     "I'd love to participate in a language exchange program if that's on the agenda. Learning a few phrases from different languages would be a fun way to connect with coworkers.",
  //   quotedComment: '',
  //   likesCount: 23,
  //   dislikesCount: 2,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644bb',
  //   comment:
  //     "A language exchange program sounds fantastic! It's a great way to promote cross-cultural communication and understanding. Count me in for that too!",
  //   quotedComment:
  //     "I'd love to participate in a language exchange program if that's on the agenda. Learning a few phrases from different languages would be a fun way to connect with coworkers.",
  //   likesCount: 29,
  //   dislikesCount: 1,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644bb',
  //   comment:
  //     "I'm looking forward to these events as well! Our workplace is like a microcosm of the world, and these multicultural events will help us appreciate the global diversity we have.",
  //   quotedComment: '',
  //   likesCount: 24,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644bb',
  //   comment:
  //     "Absolutely! It's a reminder that we're part of a global community, and celebrating different cultures brings us closer together. Let's make these events memorable!",
  //   quotedComment:
  //     "I'm looking forward to these events as well! Our workplace is like a microcosm of the world, and these multicultural events will help us appreciate the global diversity we have.",
  //   likesCount: 27,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644bb',
  //   comment:
  //     "I appreciate the enthusiasm! It's heartwarming to see everyone excited about celebrating diversity. Let's make these events a reflection of our inclusive and supportive workplace.",
  //   quotedComment: '',
  //   likesCount: 32,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644bb',
  //   comment:
  //     "Indeed, we're fortunate to work in such a diverse and welcoming environment. These events will be a testament to the unity and camaraderie that define our workplace.",
  //   quotedComment: '',
  //   likesCount: 34,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644bb',
  //   comment:
  //     "I'm delighted to hear about these upcoming multicultural events! Our workplace is a diverse and vibrant community, and these events will allow us to share our cultures and traditions. Count me in for the festivities!",
  //   quotedComment: '',
  //   likesCount: 32,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644bb',
  //   comment:
  //     "Absolutely! It's a great opportunity to foster cultural understanding and unity among our colleagues. These events will make our workplace even more special.",
  //   quotedComment:
  //     "I'm delighted to hear about these upcoming multicultural events! Our workplace is a diverse and vibrant community, and these events will allow us to share our cultures and traditions. Count me in for the festivities!",
  //   likesCount: 35,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644bb',
  //   comment:
  //     "I'm particularly excited about the cultural exhibitions! It's a chance to showcase the beauty and richness of our different heritages. I hope to see art, music, and more!",
  //   quotedComment: '',
  //   likesCount: 25,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644bb',
  //   comment:
  //     "I share your excitement! Cultural exhibitions can be enlightening and inspiring. Let's not forget to celebrate our shared humanity through these events.",
  //   quotedComment:
  //     "I'm particularly excited about the cultural exhibitions! It's a chance to showcase the beauty and richness of our different heritages. I hope to see art, music, and more!",
  //   likesCount: 27,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644bb',
  //   comment:
  //     "I'd love to contribute by organizing a traditional dance performance from my culture. It's a great way to share a piece of my heritage with everyone.",
  //   quotedComment: '',
  //   likesCount: 22,
  //   dislikesCount: 2,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644bb',
  //   comment:
  //     "That's a fantastic idea! Your dance performance will add a vibrant and joyful touch to our multicultural events. I can't wait to see it!",
  //   quotedComment:
  //     "I'd love to contribute by organizing a traditional dance performance from my culture. It's a great way to share a piece of my heritage with everyone.",
  //   likesCount: 28,
  //   dislikesCount: 1,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644bb',
  //   comment:
  //     "Let's not forget the power of food to bring people together! I hope there will be a potluck where we can all share dishes from our cultures. Food unites us in the most delicious way.",
  //   quotedComment: '',
  //   likesCount: 30,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644bb',
  //   comment:
  //     "I'm definitely on board with the potluck idea! It's a wonderful way to bond over homemade dishes and learn about each other's culinary traditions.",
  //   quotedComment:
  //     "Let's not forget the power of food to bring people together! I hope there will be a potluck where we can all share dishes from our cultures. Food unites us in the most delicious way.",
  //   likesCount: 29,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644bb',
  //   comment:
  //     "I'm also looking forward to a language exchange program if that's in the works. Learning a few phrases in different languages would be a fantastic way to connect.",
  //   quotedComment: '',
  //   likesCount: 24,
  //   dislikesCount: 1,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644bb',
  //   comment:
  //     "A language exchange program is a brilliant idea! It can help break down language barriers and foster a deeper sense of community. I'm in for that as well!",
  //   quotedComment:
  //     "I'm also looking forward to a language exchange program if that's in the works. Learning a few phrases in different languages would be a fantastic way to connect.",
  //   likesCount: 26,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644bb',
  //   comment:
  //     "These events are a testament to the inclusive and welcoming environment we have here. I'm proud to be a part of such a diverse and supportive team.",
  //   quotedComment: '',
  //   likesCount: 31,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644bb',
  //   comment:
  //     "Absolutely! Our multicultural events reflect the true spirit of our organization, where every voice is heard, and every culture is celebrated. Let's make them unforgettable!",
  //   quotedComment:
  //     "These events are a testament to the inclusive and welcoming environment we have here. I'm proud to be a part of such a diverse and supportive team.",
  //   likesCount: 34,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  //
  // title: 'Expected Availability for Remote Work' 65139981878c0a62f4b644b9
  //
  // {
  //   parentResourceId: '65139981878c0a62f4b644b9',
  //   comment:
  //     "Thank you for the update! It's great to have clarity on the expected availability for remote work. This information helps us plan our work schedules more efficiently.",
  //   quotedComment: '',
  //   likesCount: 42,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b9',
  //   comment:
  //     'Absolutely! Knowing when our colleagues are available remotely allows for better collaboration and ensures we can coordinate effectively across different time zones.',
  //   quotedComment:
  //     "Thank you for the update! It's great to have clarity on the expected availability for remote work. This information helps us plan our work schedules more efficiently.",
  //   likesCount: 39,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b9',
  //   comment:
  //     'I appreciate the flexibility offered by remote work. It allows us to balance our professional and personal lives more effectively. Clear guidelines on availability are a big help!',
  //   quotedComment: '',
  //   likesCount: 36,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b9',
  //   comment:
  //     "You're absolutely right! Remote work flexibility is a game-changer, especially in today's world. It's wonderful to see our organization adapting and supporting us in this way.",
  //   quotedComment:
  //     'I appreciate the flexibility offered by remote work. It allows us to balance our professional and personal lives more effectively. Clear guidelines on availability are a big help!',
  //   likesCount: 38,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b9',
  //   comment:
  //     "It's important that we maintain open communication during remote work periods. This way, we can stay connected and support each other effectively, even when we're not in the office.",
  //   quotedComment: '',
  //   likesCount: 34,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b9',
  //   comment:
  //     "Absolutely! Effective communication is the key to success in remote work. Let's make sure we stay in touch and collaborate seamlessly, no matter where we are.",
  //   quotedComment:
  //     "It's important that we maintain open communication during remote work periods. This way, we can stay connected and support each other effectively, even when we're not in the office.",
  //   likesCount: 35,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b9',
  //   comment:
  //     "I'm glad our company values work-life balance. It's a sign of a forward-thinking organization. These guidelines ensure that we can enjoy the benefits of remote work without burning out.",
  //   quotedComment: '',
  //   likesCount: 41,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b9',
  //   comment:
  //     "Absolutely! Work-life balance is crucial for our well-being and productivity. Let's use these guidelines as a foundation for a successful and balanced remote work experience.",
  //   quotedComment:
  //     "I'm glad our company values work-life balance. It's a sign of a forward-thinking organization. These guidelines ensure that we can enjoy the benefits of remote work without burning out.",
  //   likesCount: 37,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b9',
  //   comment:
  //     "This update demonstrates our company's adaptability and commitment to its employees. It's reassuring to know that our needs are being considered and addressed.",
  //   quotedComment: '',
  //   likesCount: 40,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b9',
  //   comment:
  //     "Indeed, our company's flexibility and responsiveness are commendable. Let's continue to work together to make remote work a smooth and productive experience for all.",
  //   quotedComment:
  //     "This update demonstrates our company's adaptability and commitment to its employees. It's reassuring to know that our needs are being considered and addressed.",
  //   likesCount: 33,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b9',
  //   comment:
  //     "Thank you for sharing this information with us. It's crucial for us to have clear guidelines on expected availability for remote work. This helps us maintain productivity and coordinate effectively with our colleagues.",
  //   quotedComment: '',
  //   likesCount: 42,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b9',
  //   comment:
  //     "Absolutely, communication is key in remote work. Knowing when our team members are available ensures we can collaborate smoothly and deliver results, no matter where we're working from.",
  //   quotedComment:
  //     "Thank you for sharing this information with us. It's crucial for us to have clear guidelines on expected availability for remote work. This helps us maintain productivity and coordinate effectively with our colleagues.",
  //   likesCount: 38,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b9',
  //   comment:
  //     "I appreciate the flexibility of remote work, but it's equally important to strike a balance. These guidelines ensure we maintain a healthy work-life equilibrium while reaping the benefits of remote work.",
  //   quotedComment: '',
  //   likesCount: 35,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b9',
  //   comment:
  //     "You're absolutely right. Remote work can be a double-edged sword, and having clear expectations helps us avoid overworking and maintain our well-being.",
  //   quotedComment:
  //     "I appreciate the flexibility of remote work, but it's equally important to strike a balance. These guidelines ensure we maintain a healthy work-life equilibrium while reaping the benefits of remote work.",
  //   likesCount: 39,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b9',
  //   comment:
  //     "It's reassuring to see the company taking remote work seriously and providing us with the necessary tools for success. Let's make the most of this opportunity!",
  //   quotedComment: '',
  //   likesCount: 41,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b9',
  //   comment:
  //     "Absolutely, we have the tools, and now we have the guidelines. Let's combine them to make remote work not just productive but enjoyable too!",
  //   quotedComment:
  //     "It's reassuring to see the company taking remote work seriously and providing us with the necessary tools for success. Let's make the most of this opportunity!",
  //   likesCount: 40,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b9',
  //   comment:
  //     "I'm excited to see how our team adapts to this new way of working. Clear communication and respect for each other's time will be key to our success.",
  //   quotedComment: '',
  //   likesCount: 37,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  // {
  //   parentResourceId: '65139981878c0a62f4b644b9',
  //   comment:
  //     "Indeed, this is a new chapter for us, and it's important that we embrace it with open minds and a commitment to collaboration, no matter where we are.",
  //   quotedComment:
  //     "I'm excited to see how our team adapts to this new way of working. Clear communication and respect for each other's time will be key to our success.",
  //   likesCount: 36,
  //   dislikesCount: 0,
  //   reportsCount: 0,
  //   isFeatured: true,
  //   isDeleted: false,
  // },
  //
  // title: 'Diversity Training' 65139981878c0a62f4b644ba
  //
  {
    parentResourceId: "65139981878c0a62f4b644ba",
    comment:
      "I'm excited to see that we're investing in diversity training! This is a crucial step toward creating an inclusive and equitable workplace. Count me in!",
    quotedComment: "",
    likesCount: 48,
    dislikesCount: 0,
    reportsCount: 0,
    isFeatured: true,
    isDeleted: false,
  },
  {
    parentResourceId: "65139981878c0a62f4b644ba",
    comment:
      "Absolutely! Diversity training not only benefits us as individuals but also strengthens our organization. Let's learn and grow together.",
    quotedComment:
      "I'm excited to see that we're investing in diversity training! This is a crucial step toward creating an inclusive and equitable workplace. Count me in!",
    likesCount: 43,
    dislikesCount: 0,
    reportsCount: 0,
    isFeatured: true,
    isDeleted: false,
  },
  {
    parentResourceId: "65139981878c0a62f4b644ba",
    comment:
      "I hope the training covers a wide range of topics, from unconscious bias to cultural sensitivity. This will help us become more aware and empathetic colleagues.",
    quotedComment: "",
    likesCount: 42,
    dislikesCount: 0,
    reportsCount: 0,
    isFeatured: true,
    isDeleted: false,
  },
  {
    parentResourceId: "65139981878c0a62f4b644ba",
    comment:
      "You're spot on! Comprehensive training will equip us to address diversity and inclusion in all aspects of our work. Let's embrace this opportunity for growth.",
    quotedComment:
      "I hope the training covers a wide range of topics, from unconscious bias to cultural sensitivity. This will help us become more aware and empathetic colleagues.",
    likesCount: 47,
    dislikesCount: 0,
    reportsCount: 0,
    isFeatured: true,
    isDeleted: false,
  },
  {
    parentResourceId: "65139981878c0a62f4b644ba",
    comment:
      "I'm particularly looking forward to workshops or sessions where we can share personal experiences and insights. It's through stories that we truly understand each other.",
    quotedComment: "",
    likesCount: 41,
    dislikesCount: 0,
    reportsCount: 0,
    isFeatured: true,
    isDeleted: false,
  },
  {
    parentResourceId: "65139981878c0a62f4b644ba",
    comment:
      "That's a wonderful idea! Sharing our stories can create empathy and build bridges between us. Let's encourage open and respectful dialogue.",
    quotedComment:
      "I'm particularly looking forward to workshops or sessions where we can share personal experiences and insights. It's through stories that we truly understand each other.",
    likesCount: 44,
    dislikesCount: 0,
    reportsCount: 0,
    isFeatured: true,
    isDeleted: false,
  },
  {
    parentResourceId: "65139981878c0a62f4b644ba",
    comment:
      "I'm grateful that our company is committed to fostering a culture of diversity and inclusion. This training is a step in the right direction for positive change.",
    quotedComment: "",
    likesCount: 45,
    dislikesCount: 0,
    reportsCount: 0,
    isFeatured: true,
    isDeleted: false,
  },
  {
    parentResourceId: "65139981878c0a62f4b644ba",
    comment:
      "Absolutely, a diverse and inclusive workplace benefits everyone. Let's embrace this training as an opportunity for personal and professional growth.",
    quotedComment:
      "I'm grateful that our company is committed to fostering a culture of diversity and inclusion. This training is a step in the right direction for positive change.",
    likesCount: 46,
    dislikesCount: 0,
    reportsCount: 0,
    isFeatured: true,
    isDeleted: false,
  },
  {
    parentResourceId: "65139981878c0a62f4b644ba",
    comment:
      "I hope this training leads to tangible actions and initiatives within our company. Let's not just learn but also apply what we learn to make a difference.",
    quotedComment: "",
    likesCount: 40,
    dislikesCount: 0,
    reportsCount: 0,
    isFeatured: true,
    isDeleted: false,
  },
  {
    parentResourceId: "65139981878c0a62f4b644ba",
    comment:
      "You're absolutely right. Learning without action is incomplete. Let's be the change we want to see and actively contribute to a more inclusive workplace.",
    quotedComment:
      "I hope this training leads to tangible actions and initiatives within our company. Let's not just learn but also apply what we learn to make a difference.",
    likesCount: 39,
    dislikesCount: 0,
    reportsCount: 0,
    isFeatured: true,
    isDeleted: false,
  },
  {
    parentResourceId: "65139981878c0a62f4b644ba",
    comment:
      "This is fantastic news! Diversity training is an important step towards creating a more inclusive and equitable workplace. I'm eager to participate and learn.",
    quotedComment: "",
    likesCount: 45,
    dislikesCount: 0,
    reportsCount: 0,
    isFeatured: true,
    isDeleted: false,
  },
  {
    parentResourceId: "65139981878c0a62f4b644ba",
    comment:
      "Absolutely! It's a great opportunity for us to gain insights, challenge our biases, and promote a culture of respect and understanding.",
    quotedComment:
      "This is fantastic news! Diversity training is an important step towards creating a more inclusive and equitable workplace. I'm eager to participate and learn.",
    likesCount: 42,
    dislikesCount: 0,
    reportsCount: 0,
    isFeatured: true,
    isDeleted: false,
  },
  {
    parentResourceId: "65139981878c0a62f4b644ba",
    comment:
      "I hope the training addresses not just gender and ethnicity but also disability inclusion. It's important to consider the full spectrum of diversity.",
    quotedComment: "",
    likesCount: 41,
    dislikesCount: 0,
    reportsCount: 0,
    isFeatured: true,
    isDeleted: false,
  },
  {
    parentResourceId: "65139981878c0a62f4b644ba",
    comment:
      "You're absolutely right. Inclusion encompasses a wide range of dimensions, and the training should reflect that diversity. Let's make sure we cover it all.",
    quotedComment:
      "I hope the training addresses not just gender and ethnicity but also disability inclusion. It's important to consider the full spectrum of diversity.",
    likesCount: 44,
    dislikesCount: 0,
    reportsCount: 0,
    isFeatured: true,
    isDeleted: false,
  },
  {
    parentResourceId: "65139981878c0a62f4b644ba",
    comment:
      "I'm looking forward to practical tips on how to foster diversity and inclusion in our daily work. Let's make this training impactful.",
    quotedComment: "",
    likesCount: 43,
    dislikesCount: 0,
    reportsCount: 0,
    isFeatured: true,
    isDeleted: false,
  },
  {
    parentResourceId: "65139981878c0a62f4b644ba",
    comment:
      "Absolutely, it's not just about theory; it's about applying what we learn. Let's translate this training into actions that create a more inclusive workplace.",
    quotedComment:
      "I'm looking forward to practical tips on how to foster diversity and inclusion in our daily work. Let's make this training impactful.",
    likesCount: 46,
    dislikesCount: 0,
    reportsCount: 0,
    isFeatured: true,
    isDeleted: false,
  },
  {
    parentResourceId: "65139981878c0a62f4b644ba",
    comment:
      "This initiative demonstrates our company's commitment to a diverse and inclusive workforce. Let's embrace it wholeheartedly and be change agents.",
    quotedComment: "",
    likesCount: 47,
    dislikesCount: 0,
    reportsCount: 0,
    isFeatured: true,
    isDeleted: false,
  },
  {
    parentResourceId: "65139981878c0a62f4b644ba",
    comment:
      "Absolutely, let's be proactive in promoting diversity and inclusion in our teams. Our actions can inspire positive change across the organization.",
    quotedComment:
      "This initiative demonstrates our company's commitment to a diverse and inclusive workforce. Let's embrace it wholeheartedly and be change agents.",
    likesCount: 48,
    dislikesCount: 0,
    reportsCount: 0,
    isFeatured: true,
    isDeleted: false,
  },
  {
    parentResourceId: "65139981878c0a62f4b644ba",
    comment:
      "I hope this training fosters an environment where everyone feels valued and heard, regardless of their background. Let's create a workplace where diversity thrives.",
    quotedComment: "",
    likesCount: 40,
    dislikesCount: 0,
    reportsCount: 0,
    isFeatured: true,
    isDeleted: false,
  },
  {
    parentResourceId: "65139981878c0a62f4b644ba",
    comment:
      "Well said! Let's work together to make our workplace a model of diversity and inclusion that others can learn from and emulate.",
    quotedComment:
      "I hope this training fosters an environment where everyone feels valued and heard, regardless of their background. Let's create a workplace where diversity thrives.",
    likesCount: 39,
    dislikesCount: 0,
    reportsCount: 0,
    isFeatured: true,
    isDeleted: false,
  },
  {
    parentResourceId: "65139981878c0a62f4b644ba",
    comment:
      "I'm thrilled to see our company prioritizing diversity training. This is an opportunity for us to learn, grow, and build a more inclusive workplace together. Count me in!",
    quotedComment: "",
    likesCount: 42,
    dislikesCount: 0,
    reportsCount: 0,
    isFeatured: true,
    isDeleted: false,
  },
  {
    parentResourceId: "65139981878c0a62f4b644ba",
    comment:
      "Absolutely! Embracing diversity is not just a moral imperative but also a strategic advantage. Let's make the most of this training.",
    quotedComment:
      "I'm thrilled to see our company prioritizing diversity training. This is an opportunity for us to learn, grow, and build a more inclusive workplace together. Count me in!",
    likesCount: 37,
    dislikesCount: 0,
    reportsCount: 0,
    isFeatured: true,
    isDeleted: false,
  },
  {
    parentResourceId: "65139981878c0a62f4b644ba",
    comment:
      "I hope the training includes discussions on unconscious bias and microaggressions. These are important topics to address for fostering inclusivity.",
    quotedComment: "",
    likesCount: 39,
    dislikesCount: 0,
    reportsCount: 0,
    isFeatured: true,
    isDeleted: false,
  },
  {
    parentResourceId: "65139981878c0a62f4b644ba",
    comment:
      "You're absolutely right. Recognizing and addressing bias is a significant step toward creating a more equitable work environment. Let's raise awareness together.",
    quotedComment:
      "I hope the training includes discussions on unconscious bias and microaggressions. These are important topics to address for fostering inclusivity.",
    likesCount: 41,
    dislikesCount: 0,
    reportsCount: 0,
    isFeatured: true,
    isDeleted: false,
  },
  {
    parentResourceId: "65139981878c0a62f4b644ba",
    comment:
      "I'm looking forward to workshops where we can share our experiences and learn from each other. It's through these conversations that we can truly grow.",
    quotedComment: "",
    likesCount: 38,
    dislikesCount: 0,
    reportsCount: 0,
    isFeatured: true,
    isDeleted: false,
  },
  {
    parentResourceId: "65139981878c0a62f4b644ba",
    comment:
      "Absolutely, open dialogue is key to understanding and empathizing with others' experiences. Let's create a safe space for these conversations.",
    quotedComment:
      "I'm looking forward to workshops where we can share our experiences and learn from each other. It's through these conversations that we can truly grow.",
    likesCount: 36,
    dislikesCount: 0,
    reportsCount: 0,
    isFeatured: true,
    isDeleted: false,
  },
  {
    parentResourceId: "65139981878c0a62f4b644ba",
    comment:
      "I'm proud to be part of an organization that values diversity and inclusion. Let's actively participate and ensure this training brings positive change.",
    quotedComment: "",
    likesCount: 40,
    dislikesCount: 0,
    reportsCount: 0,
    isFeatured: true,
    isDeleted: false,
  },
  {
    parentResourceId: "65139981878c0a62f4b644ba",
    comment:
      "Indeed, let's not just be passive participants but active advocates for diversity. Our collective efforts can make a significant impact.",
    quotedComment:
      "I'm proud to be part of an organization that values diversity and inclusion. Let's actively participate and ensure this training brings positive change.",
    likesCount: 44,
    dislikesCount: 0,
    reportsCount: 0,
    isFeatured: true,
    isDeleted: false,
  },
  {
    parentResourceId: "65139981878c0a62f4b644ba",
    comment:
      "I hope this training leads to tangible actions within our company. Let's apply what we learn to create a more inclusive work environment.",
    quotedComment: "",
    likesCount: 35,
    dislikesCount: 0,
    reportsCount: 0,
    isFeatured: true,
    isDeleted: false,
  },
  {
    parentResourceId: "65139981878c0a62f4b644ba",
    comment:
      "You're absolutely right. Knowledge without action is ineffective. Let's be catalysts for change and actively promote inclusivity.",
    quotedComment:
      "I hope this training leads to tangible actions within our company. Let's apply what we learn to create a more inclusive work environment.",
    likesCount: 34,
    dislikesCount: 0,
    reportsCount: 0,
    isFeatured: true,
    isDeleted: false,
  },
  {
    parentResourceId: "65139981878c0a62f4b644ba",
    comment:
      "I'm genuinely excited about this diversity training initiative. It's a crucial step towards building a more inclusive workplace. Count me in!",
    quotedComment: "",
    likesCount: 50,
    dislikesCount: 0,
    reportsCount: 0,
    isFeatured: true,
    isDeleted: false,
  },
  {
    parentResourceId: "65139981878c0a62f4b644ba",
    comment:
      "Absolutely! Diversity is our strength, and this training will help us harness it to the fullest. Let's embrace it with open hearts and minds.",
    quotedComment:
      "I'm genuinely excited about this diversity training initiative. It's a crucial step towards building a more inclusive workplace. Count me in!",
    likesCount: 45,
    dislikesCount: 0,
    reportsCount: 0,
    isFeatured: true,
    isDeleted: false,
  },
  {
    parentResourceId: "65139981878c0a62f4b644ba",
    comment:
      "I hope the training covers a wide range of perspectives, including those related to gender, race, and disability. Let's leave no one behind.",
    quotedComment: "",
    likesCount: 48,
    dislikesCount: 0,
    reportsCount: 0,
    isFeatured: true,
    isDeleted: false,
  },
  {
    parentResourceId: "65139981878c0a62f4b644ba",
    comment:
      "You're absolutely right. Inclusivity means considering all dimensions of diversity. Let's ensure everyone's voice is heard and valued.",
    quotedComment:
      "I hope the training covers a wide range of perspectives, including those related to gender, race, and disability. Let's leave no one behind.",
    likesCount: 47,
    dislikesCount: 0,
    reportsCount: 0,
    isFeatured: true,
    isDeleted: false,
  },
  {
    parentResourceId: "65139981878c0a62f4b644ba",
    comment:
      "I'm looking forward to practical exercises that help us apply what we learn in our day-to-day work. Let's make it impactful!",
    quotedComment: "",
    likesCount: 52,
    dislikesCount: 0,
    reportsCount: 0,
    isFeatured: true,
    isDeleted: false,
  },
  {
    parentResourceId: "65139981878c0a62f4b644ba",
    comment:
      "Absolutely! Theory alone won't bring change; it's in our actions that we create an inclusive workplace. Let's commit to making it happen.",
    quotedComment:
      "I'm looking forward to practical exercises that help us apply what we learn in our day-to-day work. Let's make it impactful!",
    likesCount: 49,
    dislikesCount: 0,
    reportsCount: 0,
    isFeatured: true,
    isDeleted: false,
  },
  {
    parentResourceId: "65139981878c0a62f4b644ba",
    comment:
      "This initiative reflects our company's dedication to diversity and inclusion. Let's actively engage and be the change we want to see.",
    quotedComment: "",
    likesCount: 55,
    dislikesCount: 0,
    reportsCount: 0,
    isFeatured: true,
    isDeleted: false,
  },
  {
    parentResourceId: "65139981878c0a62f4b644ba",
    comment:
      "Indeed! Let's not just talk the talk; let's walk the walk. Our collective efforts can shape a more inclusive future for our workplace.",
    quotedComment:
      "This initiative reflects our company's dedication to diversity and inclusion. Let's actively engage and be the change we want to see.",
    likesCount: 53,
    dislikesCount: 0,
    reportsCount: 0,
    isFeatured: true,
    isDeleted: false,
  },
  {
    parentResourceId: "65139981878c0a62f4b644ba",
    comment:
      "I hope this training fosters an environment where every voice is heard and valued, irrespective of background or identity.",
    quotedComment: "",
    likesCount: 46,
    dislikesCount: 0,
    reportsCount: 0,
    isFeatured: true,
    isDeleted: false,
  },
  {
    parentResourceId: "65139981878c0a62f4b644ba",
    comment:
      "Well said! Let's work together to make our workplace a shining example of diversity and inclusion. Our actions can inspire others.",
    quotedComment:
      "I hope this training fosters an environment where every voice is heard and valued, irrespective of background or identity.",
    likesCount: 51,
    dislikesCount: 0,
    reportsCount: 0,
    isFeatured: true,
    isDeleted: false,
  },
  {
    parentResourceId: "65139981878c0a62f4b644ba",
    comment:
      "I'm excited to see our company taking proactive steps toward embracing diversity. This training is an opportunity for us to learn, unlearn, and grow together.",
    quotedComment: "",
    likesCount: 52,
    dislikesCount: 0,
    reportsCount: 0,
    isFeatured: true,
    isDeleted: false,
  },
  {
    parentResourceId: "65139981878c0a62f4b644ba",
    comment:
      "Absolutely! Diversity is not just a buzzword; it's a strength. Let's make the most of this opportunity to become a more inclusive workplace.",
    quotedComment:
      "I'm excited to see our company taking proactive steps toward embracing diversity. This training is an opportunity for us to learn, unlearn, and grow together.",
    likesCount: 47,
    dislikesCount: 0,
    reportsCount: 0,
    isFeatured: true,
    isDeleted: false,
  },
  {
    parentResourceId: "65139981878c0a62f4b644ba",
    comment:
      "I hope the training includes discussions on unconscious bias and its impact. It's crucial for us to address these issues openly.",
    quotedComment: "",
    likesCount: 49,
    dislikesCount: 0,
    reportsCount: 0,
    isFeatured: true,
    isDeleted: false,
  },
  {
    parentResourceId: "65139981878c0a62f4b644ba",
    comment:
      "You're right; unconscious bias can affect decision-making and relationships. Let's explore this topic and work toward a fairer workplace.",
    quotedComment:
      "I hope the training includes discussions on unconscious bias and its impact. It's crucial for us to address these issues openly.",
    likesCount: 51,
    dislikesCount: 0,
    reportsCount: 0,
    isFeatured: true,
    isDeleted: false,
  },
  {
    parentResourceId: "65139981878c0a62f4b644ba",
    comment:
      "I'm looking forward to practical exercises that simulate real-world scenarios. These can help us apply our learning effectively.",
    quotedComment: "",
    likesCount: 50,
    dislikesCount: 0,
    reportsCount: 0,
    isFeatured: true,
    isDeleted: false,
  },
  {
    parentResourceId: "65139981878c0a62f4b644ba",
    comment:
      "Absolutely! Practice is key to mastering new skills. Let's ensure this training is not just theoretical but hands-on.",
    quotedComment:
      "I'm looking forward to practical exercises that simulate real-world scenarios. These can help us apply our learning effectively.",
    likesCount: 48,
    dislikesCount: 0,
    reportsCount: 0,
    isFeatured: true,
    isDeleted: false,
  },
  {
    parentResourceId: "65139981878c0a62f4b644ba",
    comment:
      "Our commitment to diversity and inclusion is what sets us apart. Let's actively engage and make this training a success.",
    quotedComment: "",
    likesCount: 54,
    dislikesCount: 0,
    reportsCount: 0,
    isFeatured: true,
    isDeleted: false,
  },
  {
    parentResourceId: "65139981878c0a62f4b644ba",
    comment:
      "Indeed! Let's lead by example and inspire others to prioritize diversity and inclusion in their workplaces too.",
    quotedComment:
      "Our commitment to diversity and inclusion is what sets us apart. Let's actively engage and make this training a success.",
    likesCount: 53,
    dislikesCount: 0,
    reportsCount: 0,
    isFeatured: true,
    isDeleted: false,
  },
  {
    parentResourceId: "65139981878c0a62f4b644ba",
    comment:
      "I hope this training encourages open discussions where everyone's perspective is valued, regardless of their background.",
    quotedComment: "",
    likesCount: 46,
    dislikesCount: 0,
    reportsCount: 0,
    isFeatured: true,
    isDeleted: false,
  },
  {
    parentResourceId: "65139981878c0a62f4b644ba",
    comment:
      "Well said! Let's create an environment where every voice is heard and respected, fostering a culture of inclusivity.",
    quotedComment:
      "I hope this training encourages open discussions where everyone's perspective is valued, regardless of their background.",
    likesCount: 55,
    dislikesCount: 0,
    reportsCount: 0,
    isFeatured: true,
    isDeleted: false,
  },
  {
    parentResourceId: "65139981878c0a62f4b644ba",
    comment:
      "I believe diversity is our greatest asset. This training is a fantastic opportunity for us to foster inclusivity, celebrate differences, and build a stronger team.",
    quotedComment: "",
    likesCount: 42,
    dislikesCount: 0,
    reportsCount: 0,
    isFeatured: true,
    isDeleted: false,
  },
  {
    parentResourceId: "65139981878c0a62f4b644ba",
    comment:
      "Absolutely! Let's make the most of this chance to learn from each other and create a workplace where everyone feels valued.",
    quotedComment:
      "I believe diversity is our greatest asset. This training is a fantastic opportunity for us to foster inclusivity, celebrate differences, and build a stronger team.",
    likesCount: 37,
    dislikesCount: 0,
    reportsCount: 0,
    isFeatured: true,
    isDeleted: false,
  },
  {
    parentResourceId: "65139981878c0a62f4b644ba",
    comment:
      "I hope this training encourages us to challenge our biases and stereotypes. Let's aim for a more open-minded and accepting workplace.",
    quotedComment: "",
    likesCount: 39,
    dislikesCount: 0,
    reportsCount: 0,
    isFeatured: true,
    isDeleted: false,
  },
  {
    parentResourceId: "65139981878c0a62f4b644ba",
    comment:
      "Absolutely! It's crucial that we recognize and address our biases. Let's create a culture of empathy and understanding.",
    quotedComment:
      "I hope this training encourages us to challenge our biases and stereotypes. Let's aim for a more open-minded and accepting workplace.",
    likesCount: 38,
    dislikesCount: 0,
    reportsCount: 0,
    isFeatured: true,
    isDeleted: false,
  },
  {
    parentResourceId: "65139981878c0a62f4b644ba",
    comment:
      "I'm excited about the practical workshops. Learning by doing will help us internalize the principles of diversity and inclusion.",
    quotedComment: "",
    likesCount: 45,
    dislikesCount: 0,
    reportsCount: 0,
    isFeatured: true,
    isDeleted: false,
  },
  {
    parentResourceId: "65139981878c0a62f4b644ba",
    comment:
      "Indeed! Practical experience is often the most effective way to learn. Let's apply these lessons to our daily interactions.",
    quotedComment:
      "I'm excited about the practical workshops. Learning by doing will help us internalize the principles of diversity and inclusion.",
    likesCount: 44,
    dislikesCount: 0,
    reportsCount: 0,
    isFeatured: true,
    isDeleted: false,
  },
  {
    parentResourceId: "65139981878c0a62f4b644ba",
    comment:
      "Our company's commitment to diversity is commendable. Let's actively participate and ensure this training is a resounding success.",
    quotedComment: "",
    likesCount: 41,
    dislikesCount: 0,
    reportsCount: 0,
    isFeatured: true,
    isDeleted: false,
  },
  {
    parentResourceId: "65139981878c0a62f4b644ba",
    comment:
      "Absolutely! Our actions speak louder than words. Let's be champions of diversity, both within our company and beyond.",
    quotedComment:
      "Our company's commitment to diversity is commendable. Let's actively participate and ensure this training is a resounding success.",
    likesCount: 40,
    dislikesCount: 0,
    reportsCount: 0,
    isFeatured: true,
    isDeleted: false,
  },
  {
    parentResourceId: "65139981878c0a62f4b644ba",
    comment:
      "I hope this training fosters an environment where every voice is heard and respected, regardless of background.",
    quotedComment: "",
    likesCount: 36,
    dislikesCount: 0,
    reportsCount: 0,
    isFeatured: true,
    isDeleted: false,
  },
  {
    parentResourceId: "65139981878c0a62f4b644ba",
    comment:
      "Well said! Let's create an inclusive space where diversity thrives, and everyone feels they belong.",
    quotedComment:
      "I hope this training fosters an environment where every voice is heard and respected, regardless of background.",
    likesCount: 43,
    dislikesCount: 0,
    reportsCount: 0,
    isFeatured: true,
    isDeleted: false,
  },
];

// type ReturnCommentsWithoutQuotedUsernameReturnType = ReturnType<
//   typeof returnCommentsWithoutQuotedUsername
// >;

// type ReturnCommentsWithoutQuotedUsername = (args: {
//   commentsArray: CommentsArray;
//   userDocs: DirectoryUserDocument[];
// }) => ReturnCommentsWithoutQuotedUsernameReturnType;

// // function returnCommentsWithoutQuotedUsername({
// //   commentsArray,
// //   userDocs,
// // }: {
// //   userDocs: DirectoryUserDocument[];
// //   commentsArray: CommentsArray;
// // }) {
// //   return commentsArray.map((comment) => {
// //     const { likesCount, dislikesCount, reportsCount } = comment;

// //     // pick a random user
// //     const randomUser = userDocs[Math.floor(Math.random() * userDocs.length)];

// //     // grab their details
// //     const {
// //       _id,
// //       username,
// //       roles,
// //       firstName,
// //       middleName,
// //       lastName,
// //       jobPosition,
// //       department,
// //       profilePictureUrl,
// //     } = randomUser;

// //     // shuffle array
// //     const shuffledUsers = shuffleArray(userDocs);

// //     // pick amount equal to likes count
// //     const likedUsers = shuffledUsers.slice(0, likesCount);
// //     const likedUserIds = likedUsers.map((user) => user._id);

// //     // remove the liked users from shuffled array
// //     const shuffledUsersMinusLikedUsers = shuffledUsers.slice(likesCount);

// //     // pick amount equal to dislikes count
// //     const dislikedUsers = shuffledUsersMinusLikedUsers.slice(0, dislikesCount);
// //     const dislikedUserIds = dislikedUsers.map((user) => user._id);

// //     // remove the disliked users from shuffled array
// //     const shuffledUsersMinusLikedAndDislikedUsers =
// //       shuffledUsersMinusLikedUsers.slice(dislikesCount);

// //     // pick amount equal to reports count
// //     const reportedUsers = shuffledUsersMinusLikedAndDislikedUsers.slice(0, reportsCount);
// //     const reportedUserIds = reportedUsers.map((user) => user._id);

// //     // 10 percent chance of being deleted
// //     const isDeleted = Math.random() < 0.1;

// //     // 25 percent chance of being featured if not deleted
// //     const isFeatured = isDeleted ? false : Math.random() < 0.25;

// //     const requestBody = {
// //       userId: _id,
// //       username,
// //       roles,
// //       firstName,
// //       middleName,
// //       lastName,
// //       jobPosition,
// //       department,
// //       profilePictureUrl,
// //       parentResourceId: comment.parentResourceId,
// //       comment: comment.comment,
// //       quotedComment: comment.quotedComment,

// //       likesCount: comment.likesCount,
// //       dislikesCount: comment.dislikesCount,
// //       reportsCount: comment.reportsCount,

// //       isFeatured,
// //       isDeleted,

// //       likedUserIds,
// //       dislikedUserIds,
// //       reportedUserIds,
// //     };

// //     return requestBody;
// //   });
// // }

// type CommentRequestBodyWithoutQuotedUsernames = ReturnType<
//   typeof returnCommentsWithoutQuotedUsername
// >;

// // // add quotedUsername to the comments
// // function returnCommentsRequestBodies({
// //   commentsArray,
// //   userDocs,
// //   returnCommentsWithoutQuotedUsername,
// // }: {
// //   commentsArray: CommentsArray;
// //   userDocs: DirectoryUserDocument[];
// //   returnCommentsWithoutQuotedUsername: ReturnCommentsWithoutQuotedUsername;
// // }) {
// //   const commentRequestBodyWithoutQuotedUsernames = returnCommentsWithoutQuotedUsername({
// //     commentsArray,
// //     userDocs,
// //   });

// //   return commentRequestBodyWithoutQuotedUsernames.reduce((bodiesAcc, comment) => {
// //     const { quotedComment } = comment;
// //     // if there is no quoted comment, return the comment as is
// //     if (!quotedComment.length) {
// //       bodiesAcc.push(comment);
// //       return bodiesAcc;
// //     }

// //     // find the user who made the quoted comment
// //     const quotedUser = commentRequestBodyWithoutQuotedUsernames.find(
// //       (comment) => comment.comment === quotedComment
// //     );
// //     if (!quotedUser) throw new Error(`Quoted user not found: ${quotedComment}`);

// //     // grab their username
// //     const { username: quotedUsername } = quotedUser;

// //     // add quotedUsername to the comment
// //     const commentWithQuotedUsername = {
// //       ...comment,
// //       quotedUsername,
// //     };

// //     bodiesAcc.push(commentWithQuotedUsername);

// //     return bodiesAcc;
// //   }, [] as CommentRequestBodyWithoutQuotedUsernames);
// // }

export {
  commentsArray,
};
