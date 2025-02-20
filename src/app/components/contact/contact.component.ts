import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  products: { code: string; name: string; category: string; quantity: string }[] = [
    { code: 'dd', name: 'ss', category: 'qq', quantity: 'qq' }
  ];

  constructor() {}

  ngOnInit(): void {}
}
