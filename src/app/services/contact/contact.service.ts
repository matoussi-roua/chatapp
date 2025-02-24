import { Injectable } from '@angular/core';
import {GlobalService} from "../global/global.service";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Contact} from "../../models/contact/contact";

@Injectable({
  providedIn: 'root'
})
export class ContactService extends GlobalService {
  private baseUrl = this.getAuthUrl()+'/contact'; // Update if needed

  constructor(private http: HttpClient) {
    super();
  }

  // Create contact
  createContact(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(`${this.baseUrl}/create`, contact);
  }
  // Update contact
  updateContact(contact: Contact): Observable<Contact> {
    return this.http.put<Contact>(`${this.baseUrl}/update`, contact);
  }

  // Get all contacts
  getAllContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${this.baseUrl}/all`);
  }

  // Delete contact by email
  deleteContactByEmail(email: string): Observable<string> {
    return this.http.put<string>(`${this.baseUrl}/delete/${email}`, { responseType: 'text' });
  }

  // Filter contacts
  filterContacts(firstName?: string, lastName?: string, email?: string, phone?: string, company?: string, jobTitle?: string): Observable<Contact[]> {
    let params = new HttpParams();
    if (firstName) params = params.set('firstName', firstName);
    if (lastName) params = params.set('lastName', lastName);
    if (email) params = params.set('email', email);
    if (phone) params = params.set('phone', phone);
    if (company) params = params.set('company', company);
    if (jobTitle) params = params.set('jobTitle', jobTitle);

    return this.http.get<Contact[]>(`${this.baseUrl}/filter`, { params });
  }
}
