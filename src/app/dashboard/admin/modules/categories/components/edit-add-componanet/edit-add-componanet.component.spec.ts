import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAddComponanetComponent } from './edit-add-componanet.component';

describe('EditAddComponanetComponent', () => {
  let component: EditAddComponanetComponent;
  let fixture: ComponentFixture<EditAddComponanetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditAddComponanetComponent]
    });
    fixture = TestBed.createComponent(EditAddComponanetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
