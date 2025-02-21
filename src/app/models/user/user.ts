import { Role } from "../role/role";

export class User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  creationDate: Date;
  isEnabled: boolean;
  role: Role;

  constructor(
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    creationDate: Date,
    isEnabled: boolean,
    role: Role
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.creationDate = creationDate;
    this.isEnabled = isEnabled;
    this.role = role;
  }
}
