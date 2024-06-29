import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers:[
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it(`should have the 'first_angular' title`, () => {
    expect(component.title).toEqual('first_angular');
  });

  describe('Header', () => {
    it('should have the correct structure', () => {
      const header = fixture.debugElement.query(By.css('.header'));
      expect(header).toBeTruthy();
      expect(header.classes['flex']).toBeTruthy();
      expect(header.classes['items-center']).toBeTruthy();
      expect(header.classes['justify-end']).toBeTruthy();
      expect(header.classes['bg-main-blue']).toBeTruthy();
    });

    it('should display the correct welcome message', () => {
      const welcomeText = fixture.debugElement.query(By.css('.header span:first-child'));
      expect(welcomeText.nativeElement.textContent.trim()).toBe('Welcome');
    });

    it('should display the correct email', () => {
      const emailText = fixture.debugElement.query(By.css('.header span:last-child'));
      expect(emailText.nativeElement.textContent.trim()).toBe('hello@demo.com');
    });
  });
});
