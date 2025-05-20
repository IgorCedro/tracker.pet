import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PetSignupPage } from './pet-signup.page';

describe('PetSignupPage', () => {
  let component: PetSignupPage;
  let fixture: ComponentFixture<PetSignupPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PetSignupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
