import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlackListListComponent } from './black-list-list.component';

describe('BlackListListComponent', () => {
  let component: BlackListListComponent;
  let fixture: ComponentFixture<BlackListListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlackListListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlackListListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
