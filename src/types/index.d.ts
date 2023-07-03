type Note = {
  _id: string; // note id
  userId: string;
  username: string;
  title: string;
  text: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};

type User = {
  _id: string; // user id
  email: string;
  username: string;
  roles: ('Admin' | 'Employee' | 'Manager')[];
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};

type BreakPoints = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type { Note, User, BreakPoints };
