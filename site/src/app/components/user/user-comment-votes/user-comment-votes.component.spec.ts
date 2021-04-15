import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCommentVotesComponent } from './user-comment-votes.component';

describe('UserCommentVotesComponent', () => {
  let component: UserCommentVotesComponent;
  let fixture: ComponentFixture<UserCommentVotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCommentVotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCommentVotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
