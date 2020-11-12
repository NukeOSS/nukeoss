import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LoadingspinnerComponent } from './loadingspinner.component';

describe('LoadingspinnerComponent', () => {
  let component: LoadingspinnerComponent;
  let fixture: ComponentFixture<LoadingspinnerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadingspinnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingspinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
