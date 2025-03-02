import {Address} from "../address/address";

export class Contact {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  jobTitle: string;
  contactOwnerEmail: string;
  addressContact: Address;
  constructor(id:number, firstName: string, lastName: string, email: string, phone: string, company: string, jobTitle: string, contactOwnerEmail: string,addressContact : Address) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;
    this.company = company;
    this.jobTitle = jobTitle;
    this.contactOwnerEmail = contactOwnerEmail;
    this.addressContact = addressContact;

  }
}
