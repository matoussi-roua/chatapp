import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeloComponent } from './helo.component';

describe('HeloComponent', () => {
  let component: HeloComponent;
  let fixture: ComponentFixture<HeloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeloComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
