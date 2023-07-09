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

export type { Note };
