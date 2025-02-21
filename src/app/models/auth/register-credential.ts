export class RegisterCredential {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;

  constructor(firstName: string, lastName: string, email: string, phoneNumber: string, password: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.password = password;
  }
}
