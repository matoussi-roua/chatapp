import {Role} from "../role/role";

export interface User {
  id: string, // UUIDs are represented as strings in TypeScript
  firstName: string,
  lastName: string,
  email: string,
  phoneNumber: string,
  creationDate: Date,
  isEnabled: boolean,
  role: Role

}
