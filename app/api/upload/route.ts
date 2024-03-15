import {stat, mkdir, writeFile} from 'fs/promises';
import {join} from 'path';
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import mime from 'mime';
import dayjs from 'dayjs';
import { addNote } from '@/lib/redis';

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get('file') as File;

  if (!file) {
    return NextResponse.json(
      {error: 'No file provided'},
      {status: 400}
      );
  }

  // 文件写入
  const buffer = Buffer.from(await file.arrayBuffer());
  const relativeUploadPath = `/uploads/${dayjs().format("YY-MM-DD")}`;
  const uploadPath = join(process.cwd(), 'public',relativeUploadPath);

  console.log('uploadPath', uploadPath);

  try {
    await stat(uploadPath);
  } catch (error: any) {
    // 目录不存在，创建目录
    if (error.code === 'ENOENT') {
      await mkdir(uploadPath, {recursive: true});
    } else {
      return NextResponse.json(
        {error: 'Error creating upload directory'},
        {status: 500}
      )
    }
  }

  try {
    const uniqueSuffix = `${Math.random().toString(36).substring(-6)}`;
    const fileName = file.name.replace(/\.[^/.]+$/, "");
    const uniqueFileName = `${fileName}-${uniqueSuffix}.${mime.getExtension(file.type)}`;
    await writeFile(`${uploadPath}/${uniqueFileName}`, buffer);

    const res = await addNote({
      title: fileName,
      content: buffer.toString('utf-8'),
    });

    revalidatePath('/', 'layout');
    return NextResponse.json({
      fileUrl: `${relativeUploadPath}/${uniqueFileName}`,
      uid: res,
    });
  } catch (error: any) {
    console.log('error', error);
    return NextResponse.json(
      {error: 'Error writing file'},
      {status: 500}
    )
  }
}
