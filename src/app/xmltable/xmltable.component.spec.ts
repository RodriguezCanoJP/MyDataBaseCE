import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XmltableComponent } from './xmltable.component';

describe('XmltableComponent', () => {
  let component: XmltableComponent;
  let fixture: ComponentFixture<XmltableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [XmltableComponent]
    });
    fixture = TestBed.createComponent(XmltableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
