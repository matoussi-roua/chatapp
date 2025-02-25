import {Component, OnInit} from '@angular/core';
import {Activity} from "../../models/activity/activity";
import {Table} from "primeng/table";
import {ActivityService} from "../../services/activity/activity.service";

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {
  displayAddActivity: boolean = false;
  activities: Activity[] = new Array<Activity>();
  newActivity: Activity = {} as Activity;
  value2: any;
  displayDeleteActivity: any;
  activityToDelete: Activity | null = null;
  errorMessage: string = '';
  participantsInput: string = ''; // Stores the input as a string


  constructor(private activityService: ActivityService) {

  }

  ngOnInit(): void {
    // Fetch contacts from the service on component initialization
    this.activityService.getAllActivities().subscribe(
      (activities) => {
        this.activities = activities;
      },
      (error) => {
        console.error('Error fetching contacts:', error);
      });

  }

  showAddActivityDialog() {
    this.displayAddActivity = true;
  }

  saveActivity() {
    if (!this.newActivity.date || !this.newActivity.type) {
      console.log("Validation failed: Missing required fields!");
      this.errorMessage = 'Missing required fields!';

      return;
    }
    this.updateParticipants(); // Ensure participantEmails is an array
    console.log(this.newActivity);
    this.activityService.createActivity(this.newActivity).subscribe({
      next: (response) => {
        console.log("Creation Successful!", response);
        this.displayAddActivity = false;
        this.newActivity = {} as Activity;
        window.location.reload(); // Reload the page after successful deletion

      },
      error: (error) => {
        if (error.status === 400 && error.error.errors) {
          this.errorMessage = error.error.errors[0];  // Show validation error message
        } else {
          this.errorMessage = 'An unexpected error occurred. Please try again.';
        }
      }
    });

  }

  closeDialog() {
    this.displayAddActivity = false;
    this.displayDeleteActivity = false;

  }

  clear(dt1: Table) {
    dt1.clear();
  }

  showDeleteActivityDialog(activity: Activity) {
    this.activityToDelete = activity;
    this.displayDeleteActivity = true;

  }


  deleteActivity() {
    if (this.activityToDelete) {
      this.activityService.deleteActivity(this.activityToDelete.id).subscribe(
        (response) => {
          console.warn(response);  // Response after successful deletion
          this.closeDialog();  // Close the modal
          window.location.reload(); // Reload the page after successful deletion
        },
        (error) => {
          console.error('Error deleting activity:', error);
        }
      );
    }
  }

  updateParticipants() {
    if (this.participantsInput) {
      this.newActivity.participantEmails = this.participantsInput
        .split(',')
        .map(email => email.trim()) // Remove extra spaces
        .filter(email => email !== ''); // Remove empty entries
    } else {
      this.newActivity.participantEmails = [];
    }
  }

}
