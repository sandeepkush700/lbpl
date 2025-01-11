import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelpageComponent } from './modelpage.component';

describe('ModelpageComponent', () => {
  let component: ModelpageComponent;
  let fixture: ComponentFixture<ModelpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModelpageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModelpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
