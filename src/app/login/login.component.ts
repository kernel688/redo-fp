import { Component, OnInit } from '@angular/core';
import { dateOnly, dateTime, dateTimeStamp } from '../sharedFunctions'
import { HttprequestsService } from '../httprequests.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public service: HttprequestsService) { }

  ngOnInit(): void {
  }

  formData: any = {}


  async login() {
    let validLogin = this.formData.username && this.formData.password
    dateTimeStamp()
    
    if (validLogin) {
      let loginData = {
        username: this.formData.username,
        password: this.formData.password,
        entered: dateTime
      }

      var result = await this.service.login(loginData)
      if (result.data === 1) {
        window.location.replace('/home')
        
      } else {
        alert(result.message)
      }
    } else {
      alert('Fill all the fields please!')
    }
  }

}
