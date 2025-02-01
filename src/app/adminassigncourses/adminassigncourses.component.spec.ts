import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminassigncoursesComponent } from './adminassigncourses.component';

describe('AdminassigncoursesComponent', () => {
  let component: AdminassigncoursesComponent;
  let fixture: ComponentFixture<AdminassigncoursesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminassigncoursesComponent]
    });
    fixture = TestBed.createComponent(AdminassigncoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
