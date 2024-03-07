'use client';

import { useState, useRef, useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import Image from 'next/image';
import NotePreview from './NotePreview';
import SaveButton from './SaveButton';
import DeleteButton from './DeleteButton';
import { saveNote, delNote } from '../action';

const initialState = {
  message: null,
};

export default function NoteEditor({
  noteId,
  initialTitle,
  initialData,
}: {
  noteId: string;
  initialTitle: string;
  initialData: string;
}) {
  const [saveState, saveFormAction] = useFormState(saveNote, initialState);
  const [delState, delFormAction] = useFormState(delNote, initialState);
  const [title, setTitle] = useState(initialTitle);
  const [body, setBody] = useState(initialData);
  const isDraft = !noteId;

  useEffect(() => {
    if (saveState.errors) {
      console.log(saveState.errors);
    }
  }, [saveState])

  return (
    <div className="note-editor">
      <form className="note-editor-form" autoComplete="off">
        <div className="note-editor-menu">
          <input type="hidden" name="noteId" value={noteId} />
          <SaveButton formAction={saveFormAction} />
          <DeleteButton isDraft={isDraft} formAction={delFormAction} />
        </div>
        <div className="note-editor-menu">
          { saveState?.message }
          { saveState?.errors && saveState.errors[0].message }
        </div>
        <label htmlFor="note-title-input" className="offscreen">
          Enter a title for your note
        </label>
        <input
          id="note-title-input"
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label className="offscreen" htmlFor="note-body-input">
          Enter the body for your note
        </label>
        <textarea
          value={body}
          name="body"
          id="note-body-input"
          onChange={(e) => setBody(e.target.value)}
        />
      </form>
      <div className="note-editor-preview">
        <div className="label label-preview">Preview</div>
        <h1 className="note-title">{title}</h1>
        <NotePreview>{body}</NotePreview>
      </div>
    </div>
  );
}
