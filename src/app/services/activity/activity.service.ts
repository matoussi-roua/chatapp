import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GlobalService} from "../global/global.service";
import {Observable} from "rxjs";
import {Activity} from "../../models/activity/activity";

@Injectable({
  providedIn: 'root'
})
export class ActivityService extends GlobalService {
  private baseUrl = this.getAuthUrl()+'/activity';
  constructor(private http: HttpClient) {
    super();
  }

  // Get all activities
  getAllActivities(): Observable<Activity[]> {
    return this.http.get<Activity[]>(`${this.baseUrl}/all`);
  }

  // Get activity by ID
  getActivityById(id: number): Observable<Activity> {
    return this.http.get<Activity>(`${this.baseUrl}/${id}`);
  }

  // Create a new activity
  createActivity(activity: Activity): Observable<Activity> {
    return this.http.post<Activity>(`${this.baseUrl}/create`, activity);
  }

  // Update an existing activity
  updateActivity(activity: Activity): Observable<Activity> {
    return this.http.put<Activity>(`${this.baseUrl}/update`, activity);
  }

  // Add a participant to an activity by email
  addParticipantToActivity(idActivity: number, email: string): Observable<Activity> {
    return this.http.put<Activity>(`${this.baseUrl}/add/participant/${idActivity}/${email}`, {});
  }

  // Add multiple participants to an activity
  addParticipantsToActivity(idActivity: number, emails: string[]): Observable<Activity> {
    return this.http.put<Activity>(`${this.baseUrl}/add/participants/${idActivity}`, emails);
  }

  // Remove participants from an activity
  removeParticipantsFromActivity(idActivity: number, emails: string[]): Observable<Activity> {
    return this.http.put<Activity>(`${this.baseUrl}/remove/participants/${idActivity}`, emails);
  }
// Delete an activity and expect a plain text response
  deleteActivity(idActivity: number): Observable<string> {
    return this.http.delete(`${this.baseUrl}/delete/${idActivity}`, { responseType: 'text' });
  }

}
