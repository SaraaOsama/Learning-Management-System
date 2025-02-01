import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowProgressSpecificCourseComponent } from './show-progress-specific-course.component';

describe('ShowProgressSpecificCourseComponent', () => {
  let component: ShowProgressSpecificCourseComponent;
  let fixture: ComponentFixture<ShowProgressSpecificCourseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowProgressSpecificCourseComponent]
    });
    fixture = TestBed.createComponent(ShowProgressSpecificCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
