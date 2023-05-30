import { User } from 'src/interface/user.interface'

export interface Room {
  id: string;
  name: string;
  capacity: number;
  users: User[];
}