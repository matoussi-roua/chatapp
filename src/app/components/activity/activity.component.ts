import {Component, OnInit, ViewChild} from '@angular/core';
import {Activity} from "../../models/activity/activity";
import {Table} from "primeng/table";
import {ActivityService} from "../../services/activity/activity.service";
import {ActivatedRoute, Router} from "@angular/router";

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
  activityToEdit:Activity = {} as Activity;
  errorMessage: string = '';
  participantsInput: string = ''; // Stores the input as a string
  filterData: any = {
    date: '',
    type: '',
    subject: '',
    note: ''
  };

  @ViewChild('dt1') dt1: Table | undefined; // Reference to the table component
  displayEditActivity: boolean = false;
  existingActivity: Activity = {} as Activity;

  constructor(private activityService: ActivityService,private route:ActivatedRoute) {
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
    if (this.displayEditActivity == false) {
      this.activityToEdit = {} as Activity;
    }
    this.route.queryParams.subscribe(params => {
      if (params['openModal'] === 'true') {
        this.showAddActivityDialog();
      }
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
    this.displayEditActivity = false;
    this.activityToEdit = {} as Activity;
    this.newActivity = {} as Activity;
    console.log(this.activityToEdit);
  }

  clear(dt1: Table) {
    dt1.clear();  // Clear the table filters
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
      // If input is empty, reload all activities
      this.activityService.getAllActivities().subscribe({
        next: (data) => {
          this.activities = data; // Restore the full list
        },
        error: (err) => {
          console.error('Error fetching all activities:', err);
        }
      });
    } else {
      // Perform filtering when there's input
      this.activityService.filterActivitiesByValue(value).subscribe({
        next: (data) => {
          this.activities = data; // Update the list with filtered results
        },
        error: (err) => {
          console.error('Error filtering activities:', err);
        }
      });
    }
  }


  EditActivity() {
    console.log("after: ",this.activityToEdit);
    console.log("Editing activity");
    this.activityService.updateActivity(this.activityToEdit).subscribe({
      next: (response) => {
        console.log("update Successful!", response);
        this.displayEditActivity = false;
        this.activityToEdit = {} as Activity;
        window.location.reload(); // Reload the page after successful deletion
      },error: (error) => {
        if (error.status === 400 && error.error.errors) {
          this.errorMessage = error.error.errors[0];  // Show validation error message
        } else {
          this.errorMessage = 'An unexpected error occurred. Please try again.';
        }
      }

    })
  }

  showEditActivityDialog(activity: Activity) {
    this.displayEditActivity = true;

    // Fetch fresh data from the database if needed
    this.activityService.getActivityById(activity.id).subscribe({
      next: (freshActivity) => {
        this.activityToEdit = { ...freshActivity }; // Assign a fresh copy of the data
        console.log("Loaded activity:", this.activityToEdit);
      },
      error: (error) => {
        console.error('Error fetching activity:', error);
      }
    });
  }

}
