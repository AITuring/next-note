'use client';

import React, { Suspense, useTransition } from 'react';
import { useRouter } from 'next/navigation';
// TODO 文件上传 server action


export default function SidebarImport() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.target;
    if(!fileInput.files || fileInput.files.length == 0) {
      console.warn('files list is empty');
      return;
    }

    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', { method: 'POST', body: formData });
      if(!response.ok) {
        console.error('failed to import file');
        return;
      }
      const json = await response.json();
      router.push(`/note/${json.uid}`);
    } catch(e) {
      console.error('failed to import file');
    }

    e.target.type = 'text';
    e.target.type = 'file';
  }


  return (
    // <form method='post' encType='multipart/form-data'>
      <div style={{ textAlign: 'center' }}>
        <label htmlFor="file" style={{cursor: 'pointer'}}>Import .md File</label>
        <input type="file" name='file' id="file" multiple style={{position : "absolute", clip: "rect(0 0 0 0)" }} onChange={onChange} accept='.md'/>
      </div>
    // </form>
  )
}
