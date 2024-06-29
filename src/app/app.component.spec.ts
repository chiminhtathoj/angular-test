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

  const checkColor = (elementSelector: string, expectedColor: string, property: 'backgroundColor' | 'color') => {
    const element = fixture.debugElement.query(By.css(elementSelector));
    expect(element).toBeTruthy();

    const computedStyles = getComputedStyle(element.nativeElement);
    const colorValue = computedStyles[property];

    // Convert expected color to RGB format
    const expectedRgb = hexToRgb(expectedColor);

    // Assert that computed color matches expected color in RGB format
    expect(colorValue).toBe(`rgb(${expectedRgb.r}, ${expectedRgb.g}, ${expectedRgb.b})`);
  }

  function hexToRgb(hex: string) {
    // Remove leading # if present
    hex = hex.replace(/^#/, '');

    // Calculate RGB components
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return { r, g, b };
  }

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it(`should have the 'first_angular' title`, () => {
    expect(component.title).toEqual('first_angular');
  });

  describe('Custom color should be correct', () => {
    it('should have bg-main-blue with color #3366cc', () => {
      checkColor('.bg-main-blue', '#3366cc', 'backgroundColor');
    });

    it('should have main-yellow with color #ffdb48', () => {
      checkColor('.bg-main-yellow', '#ffdb48', 'backgroundColor');
    });

    it('should have text-blur with color #75716c', () => {
      checkColor('.text-text-blur', '#75716c', 'color');
    });

    it('should have btn-save with color #00c79a', () => {
      checkColor('.bg-btn-save', '#00c79a', 'backgroundColor');
    });

    it('should have btn-cancel with color #ff2020', () => {
      checkColor('.bg-btn-cancel', '#ff2020', 'backgroundColor');
    });

    it('should have main-text with color #d2e9f6', () => {
      checkColor('.text-main-text', '#d2e9f6', 'color');
    });
  })

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

  describe('Sidebar', () => {
    it('should have the correct structure', () => {
      const sidebar = fixture.debugElement.query(By.css('.sidebar-left'));
      expect(sidebar).toBeTruthy();
      expect(sidebar.classes['col-span-2']).toBeTruthy();
      expect(sidebar.classes['bg-gray-200']).toBeTruthy();
    });

    it('content in sidebar should be empty', () => {
      const sidebarChildren = fixture.nativeElement.querySelector('.sidebar-left').children;
      expect(sidebarChildren.length).toEqual(0);
    })
  });

  describe('Content Container', () => {
    it('should have the correct structure', () => {
      const contentContainer = fixture.debugElement.query(By.css('.content-container'));
      expect(contentContainer).toBeTruthy();
      expect(contentContainer.classes['col-span-10']).toBeTruthy();
      expect(contentContainer.classes['flex']).toBeTruthy();
      expect(contentContainer.classes['flex-col']).toBeTruthy();
    });

    describe('List Tabs', () => {
      it('should have the correct structure', () => {
        const listTabs = fixture.debugElement.query(By.css('.list-tabs'));
        expect(listTabs).toBeTruthy();
        expect(listTabs.classes['flex']).toBeTruthy();
        expect(listTabs.classes['justify-between']).toBeTruthy();
        expect(listTabs.classes['items-center']).toBeTruthy();
      });

      it('should have the correct tab links', () => {
        const tabLinks = fixture.debugElement.queryAll(By.css('.list-tabs a'));
        expect(tabLinks.length).toBe(3);
        expect(tabLinks[0].nativeElement.textContent.trim()).toBe('Manage Settings');
        expect(tabLinks[1].nativeElement.textContent.trim()).toBe('List');
        expect(tabLinks[2].nativeElement.textContent.trim()).toBe('Sign Out');
      });

      it('should have the correct active tab', () => {
        const activeTab = fixture.debugElement.query(By.css('.list-tabs a.bg-main-blue'));
        expect(activeTab).toBeTruthy();
        expect(activeTab.nativeElement.textContent.trim()).toBe('Manage Settings');
      });
    });

    describe('List Settings', () => {
      it('should have the correct structure', () => {
        const listSettings = fixture.debugElement.query(By.css('.list-settings'));
        expect(listSettings).toBeTruthy();
      });

      it('should have the correct buttons', () => {
        const buttons = fixture.debugElement.queryAll(By.css('.list-settings button'));
        expect(buttons.length).toBe(2);
        expect(buttons[0].nativeElement.textContent.trim()).toBe('User Settings');
        expect(buttons[1].nativeElement.textContent.trim()).toBe('Third Party User Settings');
      });

      it('should have the correct active button', () => {
        const activeButton = fixture.debugElement.query(By.css('.list-settings button.bg-main-yellow'));
        expect(activeButton).toBeTruthy();
        expect(activeButton.nativeElement.textContent.trim()).toBe('User Settings');
      });
    });

    describe('User Settings Form', () => {
      it('should include the user settings form component', () => {
        const userSettingsForm = fixture.debugElement.query(By.css('app-user-settings-form'));
        expect(userSettingsForm).toBeTruthy();
      });
    });

    describe('Content footer', () => {
      it('should have the correct structure', () => {
        const footer = fixture.debugElement.query(By.css('.content-footer'));
        expect(footer).toBeTruthy();
        expect(footer.classes['bg-main-blue']).toBeTruthy();
        expect(footer.classes['sticky']).toBeTruthy();
        expect(footer.classes['bottom-0']).toBeTruthy();
      });

      it('should have sticky and bottom-0 classes', () => {
        const footer = fixture.debugElement.query(By.css('.content-footer'));

        expect(footer).toBeTruthy();
        expect(footer.classes['sticky']).toBeTruthy();
        expect(footer.classes['bottom-0']).toBeTruthy();
      });

      it('should display the correct copyright year', () => {
        const copyrightYear = fixture.debugElement.query(By.css('.content-footer span:first-child'));
        expect(copyrightYear.nativeElement.textContent.trim()).toBe('©2024');
      });

      it('should display the correct company name', () => {
        const companyName = fixture.debugElement.query(By.css('.content-footer span:nth-child(2)'));
        expect(companyName.nativeElement.textContent.trim()).toBe('Example Company');
      });

      it('should display the correct policy links', () => {
        const policyLinks = fixture.debugElement.queryAll(By.css('.content-footer span:nth-child(n+4):nth-child(-n+7)'));
        expect(policyLinks.length).toBe(4);
        expect(policyLinks[0].nativeElement.textContent.trim()).toBe('Privacy policy');
        expect(policyLinks[2].nativeElement.textContent.trim()).toBe('Security policy');
      });

      it('should not have empty text content in any span element', () => {
        const spans = fixture.debugElement.queryAll(By.css('.content-footer span'));

        spans.forEach(span => {
          expect(span.nativeElement.textContent.trim()).toBeTruthy();
        });
      });
    });
  });

  describe('Responsive Design', () => {
    it('should use grid layout for overall structure', () => {
      const body = fixture.debugElement.query(By.css('.body'));
      expect(body.classes['grid']).toBeTruthy();
      expect(body.classes['grid-cols-12']).toBeTruthy();
    });

    it('should have correct column spans for sidebar and content', () => {
      const sidebar = fixture.debugElement.query(By.css('.sidebar-left'));
      const content = fixture.debugElement.query(By.css('.content-container'));
      expect(sidebar.classes['col-span-2']).toBeTruthy();
      expect(content.classes['col-span-10']).toBeTruthy();
    });
  });
});
