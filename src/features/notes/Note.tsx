import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { NoteReturn } from './noteReducer';

type NoteProps = {
  children?: ReactNode;
  note: NoteReturn;
};

function Note({ children, note }: NoteProps): JSX.Element | null {
  //   const note = useSelector((state) => selectNoteById(state, noteId));

  const navigate = useNavigate();

  if (note) {
    const created = new Date(note.createdAt).toLocaleString('en-US', {
      day: 'numeric',
      month: 'long',
    });

    const updated = new Date(note.updatedAt).toLocaleString('en-US', {
      day: 'numeric',
      month: 'long',
    });

    const handleEdit = () => navigate(`/dash/notes/${note._id}`);

    return (
      <tr className="table__row">
        <td className="table__cell note__status">
          {note.completed ? (
            <span className="note__status--completed">Completed</span>
          ) : (
            <span className="note__status--open">Open</span>
          )}
        </td>
        <td className="table__cell note__created">{created}</td>
        <td className="table__cell note__updated">{updated}</td>
        <td className="table__cell note__title">{note.title}</td>
        <td className="table__cell note__username">{note.username}</td>

        <td className="table__cell">
          <button
            className="icon-button table__button"
            type="button"
            onClick={handleEdit}
          >
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </td>
      </tr>
    );
  } else return null;
}

export { Note };
