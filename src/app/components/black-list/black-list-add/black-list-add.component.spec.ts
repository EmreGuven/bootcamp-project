import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlackListAddComponent } from './black-list-add.component';

describe('BlackListAddComponent', () => {
  let component: BlackListAddComponent;
  let fixture: ComponentFixture<BlackListAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlackListAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlackListAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
