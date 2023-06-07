import { ReactNode } from 'react';

type NotesListProps = {
  children?: ReactNode;
};

function NotesList({ children }: NotesListProps): JSX.Element {
  return <h1>Notes List</h1>;
}

export { NotesList };
