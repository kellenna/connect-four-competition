import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesmockupComponent } from './gamesmockup.component';

describe('GamesmockupComponent', () => {
  let component: GamesmockupComponent;
  let fixture: ComponentFixture<GamesmockupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GamesmockupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GamesmockupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
