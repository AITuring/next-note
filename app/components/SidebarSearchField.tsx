'use client';

import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";

function Spinner({active = true}: {active: boolean}) {
  return (
    <div
      className={['spinner', active && 'spinner--active'].join(' ')}
      role="progressbar"
      aria-label="Loading spinner"
      aria-busy={active ? 'true' : 'false'}
    />
  )
}

export default function SidebarSearchField() {
  const { replace } = useRouter();
  const pathname = usePathname();
  const [isLoading, startTransition] = useTransition();

  function handleSearch(term: string) {
    const params = new URLSearchParams(window.location.search);
    if (term) {
      params.set('q', term);
    } else {
      params.delete('q');
    }

    startTransition(() => replace(`${pathname}?${params.toString()}`));
  }

  return (
    <div className="search">
      <label className="offscreen" htmlFor="sidebar-search-input">Search for a note by title</label>
      <input
        id="sidebar-search-input"
        placeholder="Search"
        type="text"
        onChange={(e) => handleSearch(e.target.value)}
      />
      <Spinner active={isLoading} />
    </div>
  )
}
