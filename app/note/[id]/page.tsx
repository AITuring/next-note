import Note from "@/components/Note";
import {getNote} from '@/lib/redis';
import { sleep } from "@/lib/utils";
import type { Note as NoteType } from "@/lib/redis";


interface ParamsType {
  id: string; // 或者其他你期望的类型，比如number
}

export default async function NotePage({params}: {params: ParamsType}) {
  const noteId = params.id;
  const note: NoteType | null = await getNote(noteId);

  await sleep(1000);

  if (note == null) {
    return (
      <div className="note--empty-state">
        <span className="note-text--empty-state">
          Click a note on the left to view something! 🥺
        </span>
      </div>
    )
  }

  return <Note noteId={noteId} note={note} />

}
