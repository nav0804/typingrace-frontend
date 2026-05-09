import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypingArea } from './typing-area';

describe('TypingArea', () => {
  let component: TypingArea;
  let fixture: ComponentFixture<TypingArea>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TypingArea]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypingArea);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
