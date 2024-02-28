import dayjs from "dayjs";
import SidebarNoteItemContent from "./SidebarNoteItemContent";
import { Note } from "../lib/redis";

export default function SidebarNoteItem({
  noteId, note
}: {
  noteId: string;
  note: Note;
}) {
  const { title, content= '', updateTime } = note;

  return (
    <SidebarNoteItemContent
      id={noteId}
      title={title}
      expandedChildren={
        <p className="sidebar-note-excerpt">
          {content.slice(0, 20) || <i>(No content)</i>}...
        </p>
      }>
        <header className="sidebar-note-header">
          <strong>{title}</strong>
          <small>{dayjs(updateTime).format('YYYY-MM-DD hh:mm:ss')}</small>
        </header>
      </SidebarNoteItemContent>

  )

}
