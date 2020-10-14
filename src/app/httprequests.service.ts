import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class HttprequestsService {

  urlServicio: string = "http://localhost:9000/";


  constructor(
    private http: HttpClient
  ) { }


  async getProviders() {
    var result = await this.get('providers')
    return result
  }
    
  async postProvider(provider) {
    var result = await this.post('providers',provider)
    return result
  }

  async getTransactions() {
    var result = await this.get('transactions')
    return result
  }
  
  async postTransaction(transaction) {
    var result = await this.post('transactions',transaction)
    return result
  }
  
  async deleteTransaction(transactionID: string) {
    var result = await this.get('deleteTransaction?_id=' + transactionID)
    return result
  }





  private get(url): Promise<any> {
    return new Promise((result, reject) => {
      this.http.get(this.urlServicio + url).subscribe((data) => {
        result(data);
      }, (error) => reject(error));
    });
  }

  private post(url, data): Promise<any> {
    return new Promise((result, reject) => {
      this.http.post(this.urlServicio + url, data).subscribe((data) => {
        result(data);
      }, (error) => reject(error));
    });
  }

  
}
