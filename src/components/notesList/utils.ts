import { Note } from './types';

function groupNotesByUsername(notes: Note[]): [string, Note[]][] {
  const groupedNotes: Record<string, Note[]> = {};

  //   notes.forEach((note) => {
  //     if (groupedNotes[note.username]) {
  //       groupedNotes[note.username].push(note);
  //     } else {
  //       groupedNotes[note.username] = [note];
  //     }
  //   });

  notes.forEach((note) => {
    if (Object.hasOwn(groupedNotes, note.username)) {
      groupedNotes[note.username].push(note);
    } else {
      Object.defineProperty(groupedNotes, note.username, {
        value: [note],
        writable: true,
        enumerable: true,
        configurable: true,
      });
    }
  });

  return Object.entries(groupedNotes);
}

export { groupNotesByUsername };
