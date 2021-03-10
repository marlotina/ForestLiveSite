import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotesUserComponent } from './votes-user.component';

describe('VotesUserComponent', () => {
  let component: VotesUserComponent;
  let fixture: ComponentFixture<VotesUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotesUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotesUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
