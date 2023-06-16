import { Note } from '../../types';

/**
 * @description Groups notes by username and returns an array of tuples with the username and the corresponding notes.
 */
function groupNotesByUsername(notes: Note[]): [string, Note[]][] {
  return Array.from(
    notes.reduce((map, note) => {
      map.has(note.username)
        ? map.get(note.username)?.push(note)
        : map.set(note.username, [note]);

      return map;
    }, new Map<string, Note[]>())
  );
}

export { groupNotesByUsername };
