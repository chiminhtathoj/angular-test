import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts/1';

  constructor(private http: HttpClient) { }

  updateUserSettings(data: any): Observable<any> {
    return this.http.put(this.apiUrl, data);
  }
}
