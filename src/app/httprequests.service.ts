import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class HttprequestsService {

  urlServicioBase: string = "http://localhost:4200/";


  constructor(
    private http: HttpClient
  ) { }


  private get(url): Promise<any> {
    return new Promise((result, reject) => {
      this.http.get(this.urlServicioBase + url).subscribe((data) => {
        result(data);
      }, (error) => reject(error));
    });
  }

  private post(url, data): Promise<any> {
    return new Promise((result, reject) => {
      this.http.post(this.urlServicioBase + url, data).subscribe((data) => {
        result(data);
      }, (error) => reject(error));
    });
  }
  
}
