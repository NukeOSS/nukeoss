import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ParticipantcardComponent } from './participantcard.component';

describe('ParticipantcardComponent', () => {
  let component: ParticipantcardComponent;
  let fixture: ComponentFixture<ParticipantcardComponent>;

  beforeEach(waitForAsync(() => {
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
