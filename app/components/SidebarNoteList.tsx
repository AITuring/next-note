import { InitialData, Note } from "../lib/redis";
import dayjs from "dayjs";
export default async function SidebarNoteList({notes}: {notes: InitialData}) {
  const arr = Object.entries(notes);

  if (arr.length === 0) {
    return <div className="notes-empty">No notes yet</div>;
  }

  return (
    <ul className="notes-list">
      {arr.map(([noteId, noteJson]) => {
        try {
          const note: Note = JSON.parse(noteJson);
          return (
            <li key={noteId}>
              <header className="sidebar-note-header">
                <h3>{note.title}</h3>
                <small>{dayjs(note.updateTime).format('YYYY-MM-DD hh:mm:ss')}</small>
              </header>
              {/* You might want to include the content or other note details here */}
            </li>
          );
        } catch (error) {
          console.error(`Failed to parse note with id: ${noteId}`, error);
          return null;
        }
      })}
    </ul>
  )
}
