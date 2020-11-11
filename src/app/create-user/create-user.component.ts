import { Component, OnInit } from '@angular/core';
import { dateOnly, dateTime, dateTimeStamp, clearToken } from '../sharedFunctions'
import { HttprequestsService } from '../httprequests.service'

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  constructor(public service: HttprequestsService) { }

  ngOnInit(): void {
  }

  formData: any = {}

  async createUser() {
    let validUser = this.formData.username && this.formData.fullname && this.formData.password
    dateTimeStamp()
    
    if (validUser) {
      let userDetails = {
        date: dateOnly,
        username: this.formData.username,
        fullname: this.formData.fullname,
        password: this.formData.password,
        entered: dateTime,
        lastUpdated: dateTime
      }

      var result = await this.service.postUser(userDetails)
      if (result.result === true) {
        this.formData.username = null
        this.formData.fullname = null
        this.formData.password = null
      } else {
        alert(result.message)
      }
    } else {
      alert('Fill all the fields please!')
    }
  }

}
