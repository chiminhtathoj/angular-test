import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { HttpErrorResponse, provideHttpClient } from '@angular/common/http';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        ApiService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have the correct API URL', () => {
    expect((service as any).apiUrl).toBe('https://jsonplaceholder.typicode.com/posts/1');
  });

  describe('updateUserSettings', () => {
    it('should send a PUT request to the correct URL', () => {
      const testData = { password: '12345678', formControlName: '12345678' };

      service.updateUserSettings(testData).subscribe();

      const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/posts/1');
      expect(req.request.method).toBe('PUT');
    });

    it('should send the correct data in the request body', () => {
      const testData = { password: '12345678', formControlName: '12345678' };

      service.updateUserSettings(testData).subscribe();

      const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/posts/1');
      expect(req.request.body).toEqual(testData);
    });

    it('should return an Observable with the response data', () => {
      const testData = { password: '12345678', formControlName: '12345678' };
      const mockResponse = { id: 1, ...testData };

      service.updateUserSettings(testData).subscribe(response => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/posts/1');
      req.flush(mockResponse);
    });

    it('should handle errors correctly', () => {
      const testData = { password: '12345678', formControlName: '12345678' };
      const mockErrorResponse = { status: 400, statusText: 'Bad Request' };

      service.updateUserSettings(testData).subscribe(
        () => fail('should have failed with the network error'),
        (error: HttpErrorResponse) => {
          expect(error.status).toBe(400);
          expect(error.statusText).toBe('Bad Request');
        }
      );

      const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/posts/1');
      req.flush('', mockErrorResponse);
    });
  });
});
