import {Component, OnInit, ViewChild} from '@angular/core';
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
  filterData: any = {
    firstName: '',
    lastName: '',
    company: '',
    jobTitle: '',
    email: '',
    phone: '',
    contactOwnerEmail: ''
  };
  @ViewChild('dt1') dt1: Table | undefined; // Reference to the table component

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
    this.newAddress = {} as Address;
    window.location.reload(); // Reload the page after successful deletion

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
    this.contactService.createContact(this.newContact).subscribe(
      (contact) => {
        this.contacts.push(contact);  // Add the newly created contact to the list
        this.closeDialog();  // Close the modal dialog
        window.location.reload();
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
          this.closeDialog();  // Close the modal
          window.location.reload();

        },
        (error) => {
          console.error('Error deleting contact:', error);
        }
      );
    }
  }

  clearFilter() {
    // Reset the filter data for all fields dynamically
    for (let key in this.filterData) {
      if (this.filterData.hasOwnProperty(key)) {
        this.filterData[key] = '';
        if (this.dt1) {
          this.dt1.filter('', key, 'contains'); // Clears the filter for each field dynamically
        }
      }
      this.dt1?.reset();
      window.location.reload();
    }
  }


  onInputChange(event: any, field: string): void {
    const value = event.target.value;
    this.dt1?.filter(value, field, 'contains');
  }


  onInputSearch(event: any): void {
    const value = event.target.value.trim(); // Trim spaces for cleaner input

    if (value === '') {
      // If input is empty, reload all contacts
      this.contactService.getAllContacts().subscribe({
        next: (data) => {
          this.contacts = data; // Restore the full list
        },
        error: (err) => {
          console.error('Error fetching all contacts:', err);
        }
      });
    } else {
      // Perform filtering when there's input
      this.contactService.filterContactsByValue(value).subscribe({
        next: (data) => {
          this.contacts = data; // Update the list with filtered results
        },
        error: (err) => {
          console.error('Error filtering contacts:', err);
        }
      });
    }
  }


}

