export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface User {
  id: number;
  email: string;
  name: string | null;
  created_at: string;
  updated_at: string;
}