import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SplitButtonModule } from 'primeng/splitbutton';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  items = [
    { label: 'Contact', icon: 'pi pi-phone', command: () => this.navigate('/contact') },
    { label: 'Activity', icon: 'pi pi-calendar', command: () => this.navigate('/activity') }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  logout() {
    localStorage.removeItem('accessToken'); // Remove stored token
    this.router.navigate(['/login']); // Redirect to login page
  }

  navigate(link: string) {
    this.router.navigate([link]);
  }

  isActive(route: string): boolean {
    return this.router.url === route;
  }
}
