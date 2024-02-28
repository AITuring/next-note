import Redis from "ioredis";

const redis = new Redis();

export interface Note {
  id: string;
  title: string;
  content: string;
  updateTime?: string; // Assuming you might want to include updateTime in the Note interface
}

// Define a type for the initial data structure
export type InitialData = {
  [key: string]: string; // The key is a string, and the value is also a string (JSON representation of a Note)
}


const initialData: InitialData = {
  "1702459181837": '{"title":"sunt aut","content":"quia et suscipit suscipit recusandae","updateTime":"2023-12-13T09:19:48.837Z"}',
  "1702459182837": '{"title":"qui est","content":"est rerum tempore vitae sequi sint","updateTime":"2023-12-13T09:19:48.837Z"}',
  "1702459188837": '{"title":"ea molestias","content":"et iusto sed quo iure","updateTime":"2023-12-13T09:19:48.837Z"}'
}

export async function getAllNotes(): Promise<{[key: string]: string}> {
  const data = await redis.hgetall('notes');
  if (Object.keys(data).length === 0) {
    await redis.hset('notes', initialData);
  }
  return await redis.hgetall('notes');
}

export async function addNote(data: Omit<Note, 'id'>): Promise<string> {
  const uuid = Date.now().toString();
  await redis.hset('notes', uuid, JSON.stringify(data));
  return uuid;
}

export async function updateNode(uuid: string, data: Omit<Note, 'id'>): Promise<void> {
  await redis.hset('notes', uuid, JSON.stringify(data));
}

export async function getNote(uuid: string): Promise<Note | null> {
  const noteString = await redis.hget('notes', uuid);
  if (noteString === null) {
    return null; // 或者你可以抛出一个错误，这取决于你的业务逻辑
  }

  try {
    const note = JSON.parse(noteString);
    return note as Note;
  } catch (error) {
    console.error(`Failed to parse note for UUID: ${uuid}`, error);
    return null; // 或者你可以重新抛出错误或采取其他行动
  }
}

export async function deleteNote(uuid: string): Promise<void> {
  await redis.hdel('notes', uuid);
}

export default redis;
