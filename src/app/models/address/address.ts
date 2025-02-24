export class Address {
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;

  constructor(address: string, city: string, state: string, country: string, zipCode: string) {
    this.address = address;
    this.city = city;
    this.state = state;
    this.country = country;
    this.zipCode = zipCode;
  }

}
