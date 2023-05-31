import { User } from 'src/models/user.model'

export interface Room {
  id: string;
  name: string;
  capacity: number;
  users: User[];
}