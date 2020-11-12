import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CreatenewsessionComponent } from './createnewsession.component';

describe('CreatenewsessionComponent', () => {
  let component: CreatenewsessionComponent;
  let fixture: ComponentFixture<CreatenewsessionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatenewsessionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatenewsessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
