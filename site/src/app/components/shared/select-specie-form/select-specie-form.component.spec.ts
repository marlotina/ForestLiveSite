import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSpecieFormComponent } from './select-specie-form.component';

describe('SelectSpecieFormComponent', () => {
  let component: SelectSpecieFormComponent;
  let fixture: ComponentFixture<SelectSpecieFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectSpecieFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectSpecieFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
