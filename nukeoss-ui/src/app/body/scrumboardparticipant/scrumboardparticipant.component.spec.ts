import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ScrumboardparticipantComponent } from './scrumboardparticipant.component';

describe('ScrumboardparticipantComponent', () => {
  let component: ScrumboardparticipantComponent;
  let fixture: ComponentFixture<ScrumboardparticipantComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ScrumboardparticipantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrumboardparticipantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
