import dayjs from 'dayjs';
import NotePreview from './NotePreview';
import EditButton from './EditButton';
import type { Note } from '../lib/redis';

export default function Note({ note, noteId }: { note: Note; noteId: string }) {
  const { title, content, updateTime } = note;

  console.log(title, content, note);

  return (
    <div className="note">
      <div className="note-header">
        <h1 className="note-title">{title}</h1>
        <div className="note-menu">
          <small className="note-updated-at" role="status">
            Last updated on {dayjs(updateTime).format('YYYY-MM-DD hh:mm:ss')}
          </small>
          <EditButton noteId={noteId}>Edit</EditButton>
        </div>
      </div>
      <NotePreview>{content}</NotePreview>
    </div>
  );
}
