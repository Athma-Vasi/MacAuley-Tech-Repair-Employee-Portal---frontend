import { Note } from '../../types';
import { NotesListSort, NotesListSortKey, NotesListTransformed } from './types';

/**
 * @description groups notes by username and returns an array of tuples with shape [username, [userId, notes[]]]. This allows for rendering a table with a header for each username.
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

/**
 * @description sorts grouped notes by a given key that is the header of the table, and by a given direction (asc or desc).
 */
function sortGroupedNotesForUsernameByKey({
  usernameForEdit,
  notesTuple,
  sortKey,
  sortDirection,
}: {
  usernameForEdit: string;
  notesTuple: NotesListTransformed[];
  sortKey: NotesListSortKey;
  sortDirection: NotesListSort;
}): NotesListTransformed[] {
  return notesTuple.map(
    ([username, [userId, notes]]: [string, [string, Note[]]]) => {
      if (username === usernameForEdit) {
        return [username, [userId, notes.sort(sortNotesComparator)]];
      } else {
        return [username, [userId, notes]];
      }
    }
  ) as NotesListTransformed[];

  function sortNotesComparator(a: Note, b: Note) {
    if (sortKey === 'created') {
      return sortDirection === 'asc'
        ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        : sortDirection === 'desc'
        ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        : 0;
    } else if (sortKey === 'updated') {
      return sortDirection === 'asc'
        ? new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
        : sortDirection === 'desc'
        ? new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        : 0;
    } else if (sortKey === 'completed') {
      return sortDirection === 'asc'
        ? a.completed === b.completed
          ? 0
          : a.completed
          ? 1
          : -1
        : sortDirection === 'desc'
        ? a.completed === b.completed
          ? 0
          : a.completed
          ? -1
          : 1
        : 0;
    } else if (sortKey === 'title') {
      return sortDirection === 'asc'
        ? a.title.localeCompare(b.title)
        : sortDirection === 'desc'
        ? b.title.localeCompare(a.title)
        : 0;
    } else if (sortKey === 'text') {
      return sortDirection === 'asc'
        ? a.text.localeCompare(b.text)
        : sortDirection === 'desc'
        ? b.text.localeCompare(a.text)
        : 0;
    } else {
      return 0;
    }
  }
}

function transformNotesForDisplay({
  notes,
  usernameForEdit,
  sortKey,
  sortDirection,
}: {
  notes: Note[];
  usernameForEdit: string;
  sortKey: NotesListSortKey;
  sortDirection: NotesListSort;
}) {
  const groupedNotesByUsername = groupNotesByUsername(notes);
  const sortedNotesForUsernameByKey = sortGroupedNotesForUsernameByKey({
    usernameForEdit,
    notesTuple: groupedNotesByUsername,
    sortKey,
    sortDirection,
  });

  return sortedNotesForUsernameByKey;
}

export {
  groupNotesByUsername,
  sortGroupedNotesForUsernameByKey,
  transformNotesForDisplay,
};
