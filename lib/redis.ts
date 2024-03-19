import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL)
// const redis = new Redis()

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
  "1702459181817": '{"title":"sunt aut","content":"quia et suscipit suscipit recusandae","updateTime":"2023-12-13T09:19:48.837Z"}',
  "1702459182827": '{"title":"qui est","content":"est rerum tempore vitae sequi sint","updateTime":"2023-12-13T09:19:48.837Z"}',
  "1702459188837": '{"title":"ea molestias","content":"et iusto sed quo iure","updateTime":"2023-12-13T09:19:48.837Z"}',
  "1702459188838": '{"title":"滕王阁序","content":"豫章故郡，洪都新府。星分翼轸，地接衡庐。襟三江而带五湖，控蛮荆而引瓯越。物华天宝，龙光射牛斗之墟；人杰地灵，徐孺下陈蕃之榻。雄州雾列，俊采星驰。台隍枕夷夏之交，宾主尽东南之美。都督阎公之雅望，棨戟遥临；宇文新州之懿范，襜帷暂驻。十旬休假，胜友如云；千里逢迎，高朋满座。腾蛟起凤，孟学士之词宗；紫电青霜，王将军之武库。家君作宰，路出名区；童子何知，躬逢胜饯","updateTime":"2024-02-13T19:19:48.837Z"}'
}

export async function getAllNotes(): Promise<{[key: string]: string}> {
  const data = await redis.hgetall('notes');
  if (Object.keys(data).length === 0) {
    await redis.hset('notes', initialData);
  }
  return await redis.hgetall('notes');
}

export async function addNote(data: Omit<Note, 'id'>): Promise<string> {
  const uuid = new Date().getTime().toString();
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

export interface User {
  name: string;
  username: string;
}

export async function addUser(username: string, password: string): Promise<User> {
  await redis.hset('users', username, password);
  return {
    name: username, username
  };
}

export async function getUser(username: string, password:string): Promise<User | number> {
  const passwordFromDB = await redis.hget("users", username);
  if (!passwordFromDB) return 0;
  if (passwordFromDB !== password) return 1
  return {
    name: username,
    username
  }
}

export default redis;
