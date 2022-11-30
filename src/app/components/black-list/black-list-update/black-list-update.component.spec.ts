import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlackListUpdateComponent } from './black-list-update.component';

describe('BlackListUpdateComponent', () => {
  let component: BlackListUpdateComponent;
  let fixture: ComponentFixture<BlackListUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlackListUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlackListUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
