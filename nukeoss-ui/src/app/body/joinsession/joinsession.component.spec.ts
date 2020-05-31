import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinsessionComponent } from './joinsession.component';

describe('JoinsessionComponent', () => {
  let component: JoinsessionComponent;
  let fixture: ComponentFixture<JoinsessionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoinsessionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinsessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
