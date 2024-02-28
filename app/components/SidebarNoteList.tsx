import { InitialData, Note } from "../lib/redis";
import SidebarNoteItem from "./SidebarNoteItem";
import { getAllNotes } from "../lib/redis";

export default async function SidebarNoteList() {
  const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));
  await sleep(1000);
  const notes = await getAllNotes()
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
              <SidebarNoteItem note={note} noteId={noteId} />
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
