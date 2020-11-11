import { Component, OnInit } from '@angular/core';
import { dateOnly, dateTime, dateTimeStamp, clearToken } from '../sharedFunctions'
import { HttprequestsService } from '../httprequests.service'

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.css']
})
export class ProvidersComponent implements OnInit {
  
  
  constructor(public service: HttprequestsService) {}
  
  
  ngOnInit(): void {
    this.getStarterInfo()
  }
  

  formData: any = {}
  allProviders: Array<object>;
  

  async getStarterInfo() {
    var result = await this.service.getProviders()
    if (result.result === true) {
      this.allProviders = result.data || []
    } else {
      alert(result.message)
    }
  }
  
  async addProvider() {

    let validProvider = this.formData.idnumber >= 100000000 && this.formData.idnumber <= 999999999 && this.formData.fullname && this.formData.country
    
    dateTimeStamp()
    
    if (validProvider) {
      let providerDetails = {
        number: Number(this.allProviders.length) + 1 || 1,
        date: dateOnly,
        idnumber: Number(this.formData.idnumber),
        fullname: this.formData.fullname,
        country: this.formData.country,
        hidden: false,
        trxID: dateTime
      }
      
      var result = await this.service.postProvider(providerDetails)
      
      if (result.result === true) {
        this.formData.idnumber = null
        this.formData.fullname = null
        this.formData.country = null
        this.getStarterInfo()
      } else {
        alert(result.message)
      }

      
      
        
      
      



    } else {
      alert('Fill all the fields please!')
    }

  }

}
