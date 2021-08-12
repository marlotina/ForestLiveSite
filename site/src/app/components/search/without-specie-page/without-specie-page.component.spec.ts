import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WithoutSpeciePageComponent } from './without-specie-page.component';

describe('WithoutSpeciePageComponent', () => {
  let component: WithoutSpeciePageComponent;
  let fixture: ComponentFixture<WithoutSpeciePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WithoutSpeciePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WithoutSpeciePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
