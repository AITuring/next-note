import React from "react";
import Link from "next/link";
import Image from "next/image";
import SidebarNoteList from "./SidebarNoteList";
import { getAllNotes } from "../lib/redis";

export default async function Sidebar() {
  const notes = await getAllNotes();

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
        <section className="sidebar-menu" role="menubar">
          {/* SideSearchField */}
        </section>
        <nav>
          <SidebarNoteList notes={notes} />
        </nav>
      </section>
    </>
  )

}
