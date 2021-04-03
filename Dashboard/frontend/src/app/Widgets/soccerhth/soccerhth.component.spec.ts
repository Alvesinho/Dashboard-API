import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoccerhthComponent } from './soccerhth.component';

describe('SoccerhthComponent', () => {
  let component: SoccerhthComponent;
  let fixture: ComponentFixture<SoccerhthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoccerhthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SoccerhthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
