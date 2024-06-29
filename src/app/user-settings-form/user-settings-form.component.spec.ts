import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { UserSettingsFormComponent } from './user-settings-form.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('UserSettingsFormComponent', () => {
  let component: UserSettingsFormComponent;
  let fixture: ComponentFixture<UserSettingsFormComponent>;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [ ReactiveFormsModule ],
      providers: [
        FormBuilder ,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    }).compileComponents();

    formBuilder = TestBed.inject(FormBuilder);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSettingsFormComponent);
    component = fixture.componentInstance;
    component.settingsForm = formBuilder.group({
      password: [''],
      confirmPassword: ['']
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form with password and confirmPassword fields', () => {
    expect(component.settingsForm.contains('password')).toBeTruthy();
    expect(component.settingsForm.contains('confirmPassword')).toBeTruthy();
  });

  it('should have empty password fields initially', () => {
    expect(component?.settingsForm?.get('password')?.value).toBe('');
    expect(component?.settingsForm?.get('confirmPassword')?.value).toBe('');
  });

  it('should have correct labels', () => {
    const labels = fixture.debugElement.queryAll(By.css('label'));
    expect(labels[0].nativeElement.textContent).toContain('User Password');
    expect(labels[1].nativeElement.textContent).toContain('Confirm Password');
  });

  it('should have correct input types', () => {
    const inputs = fixture.debugElement.queryAll(By.css('input'));
    expect(inputs[0].nativeElement.type).toBe('password');
    expect(inputs[1].nativeElement.type).toBe('password');
  });

  it('should have correct placeholders', () => {
    const inputs = fixture.debugElement.queryAll(By.css('input'));
    expect(inputs[0].nativeElement.placeholder).toBe('Enter your new password');
    expect(inputs[1].nativeElement.placeholder).toBe('Re-enter your new password');
  });

  it('should have a cancel button', () => {
    const cancelButton = fixture.debugElement.query(By.css('button[type="button"]'));
    expect(cancelButton).toBeTruthy();
    expect(cancelButton.nativeElement.textContent).toContain('Cancel');
  });

  it('should have a save changes button', () => {
    const saveButton = fixture.debugElement.query(By.css('button[type="submit"]'));
    expect(saveButton).toBeTruthy();
    expect(saveButton.nativeElement.textContent).toContain('Save Changes');
  });

  it('should call onSubmit method when form is submitted', () => {
    spyOn(component, 'onSubmit');
    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('submit', null);
    expect(component.onSubmit).toHaveBeenCalled();
  });

  it('should update form values when inputs change', () => {
    const inputs = fixture.debugElement.queryAll(By.css('input'));
    inputs[0].nativeElement.value = 'newpassword';
    inputs[0].nativeElement.dispatchEvent(new Event('input'));
    inputs[1].nativeElement.value = 'newpassword';
    inputs[1].nativeElement.dispatchEvent(new Event('input'));
    expect(component?.settingsForm?.get('password')?.value).toBe('newpassword');
    expect(component?.settingsForm?.get('confirmPassword')?.value).toBe('newpassword');
  });

  it('should have correct CSS classes', () => {
    const form = fixture.debugElement.query(By.css('form'));
    expect(form.classes['pl-12']).toBeTruthy();
    expect(form.classes['pt-16']).toBeTruthy();
    expect(form.classes['w-[88%]']).toBeTruthy();

    const inputs = fixture.debugElement.queryAll(By.css('input'));
    inputs.forEach(input => {
      expect(input.classes['w-full']).toBeTruthy();
      expect(input.classes['px-2']).toBeTruthy();
      expect(input.classes['py-4']).toBeTruthy();
      expect(input.classes['border']).toBeTruthy();
      expect(input.classes['rounded']).toBeTruthy();
    });

    const cancelButton = fixture.debugElement.query(By.css('button[type="button"]'));
    expect(cancelButton.classes['bg-btn-cancel']).toBeTruthy();
    expect(cancelButton.classes['text-main-text']).toBeTruthy();
    expect(cancelButton.classes['w-[150px]']).toBeTruthy();
    expect(cancelButton.classes['py-4']).toBeTruthy();
    expect(cancelButton.classes['rounded']).toBeTruthy();

    const saveButton = fixture.debugElement.query(By.css('button[type="submit"]'));
    expect(saveButton.classes['bg-btn-save']).toBeTruthy();
    expect(saveButton.classes['text-main-text']).toBeTruthy();
    expect(saveButton.classes['w-[150px]']).toBeTruthy();
    expect(saveButton.classes['py-4']).toBeTruthy();
    expect(saveButton.classes['rounded']).toBeTruthy();
  });
});
