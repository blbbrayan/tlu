import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayGardenComponent } from './play-garden.component';

describe('PlayGardenComponent', () => {
  let component: PlayGardenComponent;
  let fixture: ComponentFixture<PlayGardenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayGardenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayGardenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
