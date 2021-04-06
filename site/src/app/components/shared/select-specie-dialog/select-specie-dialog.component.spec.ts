import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSpecieDialogComponent } from './select-specie-dialog.component';

describe('SelectSpecieDialogComponent', () => {
  let component: SelectSpecieDialogComponent;
  let fixture: ComponentFixture<SelectSpecieDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectSpecieDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectSpecieDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
