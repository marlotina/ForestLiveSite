import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLabelsPageComponent } from './user-labels-page.component';

describe('UserLabelsPageComponent', () => {
  let component: UserLabelsPageComponent;
  let fixture: ComponentFixture<UserLabelsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserLabelsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserLabelsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
