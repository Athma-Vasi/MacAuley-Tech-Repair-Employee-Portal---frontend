import { Note } from '../../types';

/**
 * @description groups notes by username and returns an array of tuples with shape [username, [userId, notes[]]]
 */
function groupNotesByUsername(notes: Note[]): [string, [string, Note[]]][] {
  return Array.from(
    notes.reduce((map, note) => {
      if (map.has(note.username)) {
        const [userId, notes] = map.get(note.username) as [string, Note[]];
        notes.push(note);
        map.set(note.username, [userId, notes]);
      } else {
        map.set(note.username, [note.user, [note]]);
      }

      return map;
    }, new Map<string, [string, Note[]]>())
  );
}

export { groupNotesByUsername };
