import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  // items = [
  //   { label: 'Contact', icon: 'pi pi-phone', command: () => this.navigate('/contact') },
  //   { label: 'Activity', icon: 'pi pi-calendar', command: () => this.navigate('/activity') }
  // ];
  items: MenuItem[] = [];

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Contact',
        icon: 'pi pi-fw pi-users',
        routerLink: '/contact',
      },
      {
        label: 'Activity',
        icon: 'pi pi-fw pi-calendar',
        routerLink: '/activity',
      }
    ];
  }


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
