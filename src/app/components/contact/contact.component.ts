import {Component, OnInit} from '@angular/core';
import {Table} from "primeng/table";
import {ContactService} from "../../services/contact/contact.service";
import {Contact} from "../../models/contact/contact";
import {Address} from "../../models/address/address";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contacts: Contact[] = new Array<Contact>();
  value1: any;
  displayAddContact: boolean = false;
  displayDeleteContact: boolean = false;
  newContact: Contact = {} as Contact;
  newAddress: Address = {} as Address;
  contactToDelete: Contact | null = null;


  constructor(private contactService: ContactService) {
  }

  ngOnInit(): void {
    // Fetch contacts from the service on component initialization
    this.contactService.getAllContacts().subscribe(
      (contacts) => {
        this.contacts = contacts;
      },
      (error) => {
        console.error('Error fetching contacts:', error);
      });

  }

  clear(dt1: Table) {
    dt1.clear();
  }

  // Close the modal dialog and reset the form
  closeDialog() {
    this.displayAddContact = false;// Set display to false to close the modal
    this.displayDeleteContact = false;
    this.newContact = {} as Contact;

  }

  showAddContactDialog() {
    this.displayAddContact = true;
  }

  showDeleteContactDialog(contact: Contact) {
    this.contactToDelete = contact;  // Store the contact to be deleted
    this.displayDeleteContact = true;
  }

  // Save the new contact to the server and update the list
  saveContact() {
    this.newContact.addressContact = this.newAddress;
    //this.newContact.contactOwnerEmail = '';
    this.contactService.createContact(this.newContact).subscribe(
      (contact) => {
        this.contacts.push(contact);  // Add the newly created contact to the list
        console.warn(contact);
        this.closeDialog();  // Close the modal dialog
      },
      (error) => {
        console.error('Error saving contact:', error);
      }
    );
  }
  deleteContact() {
    if (this.contactToDelete) {
      this.contactService.deleteContactByEmail(this.contactToDelete.email).subscribe(
        (response) => {
          console.warn(response);  // Response after successful deletion
          // Remove the contact from the list locally after deletion
          //this.contacts = this.contacts.filter(contact => contact.email !== this.contactToDelete?.email);
          this.closeDialog();  // Close the modal
        },
        (error) => {
          console.error('Error deleting contact:', error);
        }
      );
    }
  }



}

