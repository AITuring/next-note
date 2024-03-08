import { Note } from "../lib/redis";
import { sleep } from "../lib/utils";
import SidebarNoteItem from "./SidebarNoteItem";
import SidebarNoteListFilter from "./SidebarNoteListFilter";
import SidebarNoteItemHeader from "./SidebarNoteItemHeader";
import { getAllNotes } from "../lib/redis";

export default async function SidebarNoteList() {
  await sleep(1000);
  const notes = await getAllNotes()
  const arr = Object.entries(notes);

  if (arr.length === 0) {
    return <div className="notes-empty">No notes yet</div>;
  }

  return (
    <SidebarNoteListFilter notes= {
      Object.entries(notes).map(([noteId, note]) => {
        const noteData: Note = JSON.parse(note);
        return {
          noteId,
          note: noteData,
          header: <SidebarNoteItemHeader title={noteData.title} updateTime={String(noteData.updateTime) } />
        }
      })
    }
    />
    // <ul className="notes-list">
    //   {arr.map(([noteId, noteJson]) => {
    //     try {
    //       console.log('..................')
    //       console.log(noteJson);
    //       const note: Note = JSON.parse(noteJson);
    //       return (
    //         <li key={noteId}>
    //           <SidebarNoteItem note={note} noteId={noteId} />
    //         </li>
    //       );
    //     } catch (error) {
    //       console.error(`Failed to parse note with id: ${noteId}`, error);
    //       return null;
    //     }
    //   })}
    // </ul>
  )
}
