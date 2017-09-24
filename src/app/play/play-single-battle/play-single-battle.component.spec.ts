import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaySingleBattleComponent } from './play-single-battle.component';

describe('PlaySingleBattleComponent', () => {
  let component: PlaySingleBattleComponent;
  let fixture: ComponentFixture<PlaySingleBattleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaySingleBattleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaySingleBattleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
