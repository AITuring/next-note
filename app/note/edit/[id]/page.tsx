import NoteEditor from '@/app/components/NoteEditor';
import { getNote } from '@/app/lib/redis';
import type { Note as NoteType } from "@/lib/redis";

interface ParamsType {
  id: string; // 或者其他你期望的类型，比如number
}

export default async function EditPage({ params }: { params: ParamsType }) {
  const note: NoteType | null = await getNote(params.id);

  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));
  await sleep(1000);

  if (note === null) {
    return (
      <div className="note--empty-state">
        <span className="note-text--empty-state">
          Click a note on the left to view something! 🥺
        </span>
      </div>
    );
  }

  return (
    <NoteEditor
      noteId={params.id}
      initialTitle={note!.title}
      initialData={note!.content}
    />
  )
}
