type Note = {
  _id: string; // note id
  userId: string;
  username: string;
  title: string;
  text: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type { Note };
