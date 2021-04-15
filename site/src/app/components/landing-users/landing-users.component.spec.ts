import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingUsersComponent } from './landing-users.component';

describe('LandingUsersComponent', () => {
  let component: LandingUsersComponent;
  let fixture: ComponentFixture<LandingUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
