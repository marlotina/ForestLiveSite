import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditImageComponent } from './modal-edit-image.component';

describe('ModalEditImageComponent', () => {
  let component: ModalEditImageComponent;
  let fixture: ComponentFixture<ModalEditImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalEditImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
