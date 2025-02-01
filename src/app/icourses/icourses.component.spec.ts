import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IcoursesComponent } from './icourses.component';

describe('IcoursesComponent', () => {
  let component: IcoursesComponent;
  let fixture: ComponentFixture<IcoursesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IcoursesComponent]
    });
    fixture = TestBed.createComponent(IcoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
