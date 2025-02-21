import {Component, OnInit} from '@angular/core';
import {Table} from "primeng/table";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  products: {
    "firstName": string;
    "lastName": string;
    "company": string;
    "job": string;
    "email": string;
    "phone": string;
    "contactOwner": string;
  }[] = [{
    "firstName": "John",
    "lastName": "Doe",
    "company": "Tech Solutions",
    "job": "Software Engineer",
    "email": "john.doe@example.com",
    "phone": "+1234567890",
    "contactOwner": "Jane Smith"
  },
    {
      "firstName": "Alice",
      "lastName": "Johnson",
      "company": "Design Corp",
      "job": "Product Designer",
      "email": "alice.johnson@example.com",
      "phone": "+0987654321",
      "contactOwner": "Robert Brown"
    },
    {
      "firstName": "Bob",
      "lastName": "Williams",
      "company": "Marketing LLC",
      "job": "Marketing Manager",
      "email": "bob.williams@example.com",
      "phone": "+1122334455",
      "contactOwner": "Emily Davis"
    }
  ];
  value1: any;
  representatives: {name: string; image : string}[]=[];

  constructor() {
  }

  ngOnInit(): void {
    this.representatives = [
      {name: "Amy Elsner", image: 'amyelsner.png'},
      {name: "Anna Fali", image: 'annafali.png'},
      {name: "Asiya Javayant", image: 'asiyajavayant.png'},
      {name: "Bernardo Dominic", image: 'bernardodominic.png'},
      {name: "Elwin Sharvill", image: 'elwinsharvill.png'},
      {name: "Ioni Bowcher", image: 'ionibowcher.png'},
      {name: "Ivan Magalhaes",image: 'ivanmagalhaes.png'},
      {name: "Onyama Limba", image: 'onyamalimba.png'},
      {name: "Stephen Shaw", image: 'stephenshaw.png'},
      {name: "Xuxue Feng", image: 'xuxuefeng.png'}
    ];
  }

  clear(dt1: Table) {
    dt1.clear();
  }

}
