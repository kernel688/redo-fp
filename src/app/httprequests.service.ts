import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class HttprequestsService {

  constructor(private http: HttpClient) { }

  urlServicio: string = "https://localhost:1433/";
  tokenForHeaders = new HttpHeaders().set('access-token', localStorage.getItem("token") || '')
  httpOptions = {'headers': this.tokenForHeaders};


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

  async postTrxUpdate(transaction) {
    var result = await this.post('updateTransaction',transaction)
    return result
  }

  async postUser(user) {
    var result = await this.post('users',user)
    return result
  }

  async postLogin(loginData) {        
    var result = await this.post('login',loginData)
    return result
  }





  private get(url): Promise<any> {
    return new Promise((result, reject) => {
      this.http.get(this.urlServicio + url,this.httpOptions).subscribe((data) => {
        result(data);
      }, (error) => reject(error));
    });
  }

  private post(url, data): Promise<any> {
    return new Promise((result, reject) => {
      this.http.post(this.urlServicio + url, data, this.httpOptions).subscribe((data) => {
        result(data);
      }, (error) => reject(error));
    });
  }

  
}
