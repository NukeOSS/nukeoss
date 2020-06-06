import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrumboardparticipantComponent } from './scrumboardparticipant.component';

describe('ScrumboardparticipantComponent', () => {
  let component: ScrumboardparticipantComponent;
  let fixture: ComponentFixture<ScrumboardparticipantComponent>;

  beforeEach(async(() => {
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
