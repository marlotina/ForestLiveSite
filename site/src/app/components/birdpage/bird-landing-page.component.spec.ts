import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BirdLandingPageComponent } from './bird-landing-page.component';

describe('BirdLandingPageComponent', () => {
  let component: BirdLandingPageComponent;
  let fixture: ComponentFixture<BirdLandingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BirdLandingPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BirdLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
