'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';
import { sleep } from '../lib/utils';
import { addNote, updateNode, deleteNote, Note } from '../lib/redis';
import { revalidatePath } from 'next/cache';

type State = Note & {
  message?: string;
  errors?: z.ZodIssue[];
};

const schema = z.object({
  title: z.string(),
  content: z.string().min(1, '请填写内容').max(10000, '内容过长'),
});

export async function saveNote(
  prevState: Note | null,
  formData: FormData,
): Promise<State> {
  const noteId = formData.get('noteId') as string;

  // for (var [a, b] of formData.entries()) {
  //   console.log(a, b, '*****');
  // }

  const data = {
    title: formData.get('title') as string,
    content: formData.get('body') as string,
    updateTime: new Date().toString(),
  };

  const validated = schema.safeParse(data);
  if (!validated.success) {
    return {
      id: noteId,
      title: data.title,
      content: data.content,
      errors: validated.error.issues,
    };
  }

  await sleep(2000);

  if (noteId) {
    await updateNode(noteId, data);

    revalidatePath('/', 'layout');
    redirect(`/note/${noteId}`);
  } else {
    const res = await addNote(data);
    revalidatePath('/', 'layout');
    redirect(`/note/${res}`);
  }
}

export async function delNote(prevState: Note | null, formData: FormData) {
  const noteId = formData.get('noteId') as string;
  await deleteNote(noteId);
  revalidatePath('/', 'layout');
  redirect('/');
}
