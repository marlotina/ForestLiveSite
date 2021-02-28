import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMapPageComponent } from './user-map-page.component';

describe('UserMapPageComponent', () => {
  let component: UserMapPageComponent;
  let fixture: ComponentFixture<UserMapPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMapPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMapPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
