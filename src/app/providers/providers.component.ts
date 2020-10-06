import { Component, OnInit } from '@angular/core';
import {dateOnly, dateTime, dateTimeStamp} from '../sharedFunctions'

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.css']
})
export class ProvidersComponent implements OnInit {

  formData: any = {}
  allProviders: Array<object> = JSON.parse(localStorage.getItem("allProviders")) || [];
  currentProviderNumber: number = Number(localStorage.getItem("currentProviderNumber")) || 1;

  constructor() { }

  ngOnInit(): void {
  }

  addProvider() {

    let validProvider = this.formData.idnumber >= 100000000 && this.formData.idnumber <= 999999999 && this.formData.fullname && this.formData.country

    dateTimeStamp()

    if (validProvider) {
      
      let providerDetails = {
        number: this.currentProviderNumber,
        date: dateOnly,
        idnumber: Number(this.formData.idnumber),
        fullname: this.formData.fullname,
        country: this.formData.country,
        hidden: false,
        trxID: dateTime
      }
      this.allProviders.push(providerDetails)
      localStorage.setItem("allProviders",JSON.stringify(this.allProviders))





      this.formData.idnumber = null
      this.formData.fullname = null
      this.formData.country = null
    } else {
      alert('Fill all the fields please!')
    }

  }

}
