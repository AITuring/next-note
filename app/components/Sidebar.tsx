import React, {Suspense} from "react";
import Link from "next/link";
import Image from "next/image";
import SidebarNoteList from "./SidebarNoteList";
import SidebarSearchField from "./SidebarSearchField";
import EditButton from "./EditButton";
import NoteListSkeleton from "./NoteListSkeleton";

export default async function Sidebar() {

  return (
    <>
      <section className="col sidebar">
        <Link href="/" className="link--unstyled">
          <section className="sidebar-header">
            <Image
              src="/logo.svg"
              alt="Logo"
              className="logo"
              role="presentation"
              width={22}
              height={20}
            />
            <strong>Next Notes</strong>
          </section>
        </Link>
        <section className="sidebar-menu">
          <SidebarSearchField />
          <EditButton noteId={null}>New</EditButton>
        </section>
        <nav>
          <Suspense fallback={<NoteListSkeleton />}>
            <SidebarNoteList />
          </Suspense>
        </nav>
      </section>
    </>
  )

}
