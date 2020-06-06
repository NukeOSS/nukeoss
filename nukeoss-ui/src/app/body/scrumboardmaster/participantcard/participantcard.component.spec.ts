import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantcardComponent } from './participantcard.component';

describe('ParticipantcardComponent', () => {
  let component: ParticipantcardComponent;
  let fixture: ComponentFixture<ParticipantcardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParticipantcardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipantcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
