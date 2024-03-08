'use client';

import { useSearchParams } from "next/navigation";
import React, { Children } from "react";
import SidebarNoteItemContent from "./SidebarNoteItemContent";
import { Note } from "../lib/redis";

interface NoteSidebarType {
  noteId: string;
  note: Note;
  header: React.ReactNode;
}

export default function SidebarNoteListFilter({ notes }: {
  notes: NoteSidebarType[];
}) {
  const searchParams = useSearchParams()
  const searchText = searchParams.get('q')
  return (
    <ul className="notes-list">
      {
      notes.map(noteItem => {
        const { note, noteId, header } = noteItem;

        if (!searchText || (searchText && note.title.toLowerCase().includes(searchText.toLowerCase()))) {
          return (
            <SidebarNoteItemContent
            key={noteId}
            id={noteId}
            title={note.title}
            expandedChildren={
              <p className="sidebar-note-excerpt">
              {note.content.substring(0, 20) || <i>(No content)</i>}
            </p>
            }
            >
              {header}
            </SidebarNoteItemContent>
          )
        }
      })}
    </ul>
  )

}
