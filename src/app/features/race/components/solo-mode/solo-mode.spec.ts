import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoloMode } from './solo-mode';

describe('SoloMode', () => {
  let component: SoloMode;
  let fixture: ComponentFixture<SoloMode>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SoloMode]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SoloMode);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
