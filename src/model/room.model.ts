import { User } from 'src/model/user.interface'

export interface Room {
  id: string;
  name: string;
  capacity: number;
  users: User[];
}