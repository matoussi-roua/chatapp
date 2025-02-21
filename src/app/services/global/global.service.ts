import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  private ip = 'http://localhost'; // Update if needed
  private version = 'v1'; // Update if needed
  private port = '8081'; // Update if needed
  protected getAuthUrl(): string {
    return `${this.ip}:${this.port}/api/${this.version}`;  }
  constructor() { }
}
