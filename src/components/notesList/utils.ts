import { Note } from '../../types';

// function groupNotesByUsername(notes: Note[]): [string, Note[]][] {
//   return Array.from(
//     notes.reduce((map, note) => {
//       map.has(note.username)
//         ? map.get(note.username)?.push(note)
//         : map.set(note.username, [note]);

//       return map;
//     }, new Map<string, Note[]>())
//   );
// }

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
