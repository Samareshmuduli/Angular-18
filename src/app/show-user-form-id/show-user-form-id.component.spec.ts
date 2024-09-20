import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowUserFormIdComponent } from './show-user-form-id.component';

describe('ShowUserFormIdComponent', () => {
  let component: ShowUserFormIdComponent;
  let fixture: ComponentFixture<ShowUserFormIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowUserFormIdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowUserFormIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
