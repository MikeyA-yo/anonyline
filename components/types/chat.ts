export interface Chat{
  id: number;
  created_at: string;
  room_id: number;
  from: string;
  chat: string;
  seen: string[];
}