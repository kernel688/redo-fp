import { Component, OnInit } from '@angular/core';
import { HttprequestsService } from '../httprequests.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    public service: HttprequestsService,
    private router: Router) { }
    
  ngOnInit(): void {
  }

  formData: any = {}
  
  async login() {
    let validLogin = this.formData.username && this.formData.password
    

    if (validLogin) {
      let loginDetails = {
        username: this.formData.username,
        password: this.formData.password
      }

      
      var result = await this.service.postLogin(loginDetails)
            
      if (result.result === true) {
        this.formData.username = null
        this.formData.password = null
        localStorage.setItem("token", result.token);
        this.router.navigate(["home"])

      } else {
        alert(result.message)
      }
    } else {
      alert('Enter the Username and the Password')
    }
  }

}
