import { ReactNode, useEffect, useReducer } from 'react';
import {
  NoteReturn,
  fetchNoteAction,
  fetchNotesReducer,
  initialFetchNotesState,
  sortNotesImmutable,
} from './noteUtils';
import axios from 'axios';
import { Note } from './Note';

type NotesListProps = {
  children?: ReactNode;
};

function NotesList({ children }: NotesListProps): JSX.Element | null {
  const [fetchNotesState, fetchNotesDispatch] = useReducer(
    fetchNotesReducer,
    initialFetchNotesState
  );

  useEffect(() => {
    const fetchNotes = async () => {
      const controller = new AbortController();
      const { signal } = controller;

      const url = 'http://localhost:3500/notes';

      try {
        const { data } = await axios.get<NoteReturn[]>(url, { signal });

        fetchNotesDispatch({
          type: fetchNoteAction.FETCH_NOTES_SUCCESS,
          payload: {
            notes: data,
            isLoading: false,
            error: '',
            isSuccess: true,
          },
        });

        return () => controller.abort();
      } catch (error: any) {
        if (error.name === 'AbortError') {
          fetchNotesDispatch({
            type: fetchNoteAction.FETCH_NOTES_FAILURE,
            payload: {
              notes: [],
              isLoading: false,
              error: error.message ?? 'Fetching notes aborted',
              isSuccess: false,
            },
          });
        } else {
          fetchNotesDispatch({
            type: fetchNoteAction.FETCH_NOTES_FAILURE,
            payload: {
              notes: [],
              isLoading: false,
              error: error.message ?? 'Error fetching notes',
              isSuccess: false,
            },
          });
        }
      }
    };

    fetchNotes();
  }, []);

  const { isLoading, error, isSuccess, notes } = fetchNotesState;

  let content;

  if (isLoading) content = <p>Loading...</p>;

  if (error !== '') {
    content = <p className="errmsg">{error}</p>;
  }

  if (isSuccess) {
    // sort notes by completion status
    const sortedNotes = sortNotesImmutable(notes);

    const tableContent = sortedNotes.map((note) =>
      notes.length > 0 ? (
        <Note key={note._id} note={note} />
      ) : (
        <tr>
          <td colSpan={6}>No notes found</td>
        </tr>
      )
    );

    content = (
      <table className="table table--notes">
        <thead className="table__thead">
          <tr>
            <th scope="col" className="table__th note__status">
              Status
            </th>
            <th scope="col" className="table__th note__created">
              Created
            </th>
            <th scope="col" className="table__th note__updated">
              Updated
            </th>
            <th scope="col" className="table__th note__title">
              Title
            </th>
            <th scope="col" className="table__th note__username">
              Owner
            </th>
            <th scope="col" className="table__th note__edit">
              Edit
            </th>
          </tr>
        </thead>
        <tbody>{tableContent}</tbody>
      </table>
    );
  }

  return content ?? null;
}

export { NotesList };
