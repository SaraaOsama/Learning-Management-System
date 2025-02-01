import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowProgressComponent } from './show-progress.component';

describe('ShowProgressComponent', () => {
  let component: ShowProgressComponent;
  let fixture: ComponentFixture<ShowProgressComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowProgressComponent]
    });
    fixture = TestBed.createComponent(ShowProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
