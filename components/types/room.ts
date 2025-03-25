export interface Room{
  id: number;
  created_at: string;
  owner:number;
  image:string;
  name:string;
  description:string;
  stay_votes:number;
  go_votes:number;
  isStaying:boolean;
  members:string[];
  enemies:string[];
}