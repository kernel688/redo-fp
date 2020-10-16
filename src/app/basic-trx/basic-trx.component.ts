import { Component, OnInit } from '@angular/core';
import { dateOnly, dateTime, dateTimeStamp } from '../sharedFunctions'
import { HttprequestsService } from '../httprequests.service'


@Component({
  selector: 'app-basic-trx',
  templateUrl: './basic-trx.component.html',
  styleUrls: ['./basic-trx.component.css']
})


export class BasicTrxComponent implements OnInit {

  constructor(public service: HttprequestsService) { 
  }
  
  
  ngOnInit(): void {
    this.getStarterInfo()
  }
  
    
  formData: any = {}
  allTransactions: any []
  currentBalance: number = 0
  updateTrxID: string = ''
  
  
  async getStarterInfo() {
    var result = await this.service.getTransactions()
    if (result.result === true) {
      this.allTransactions = result.data || []
      if (this.allTransactions === []) {
        this.currentBalance = 0
      } else {
        this.currentBalance = 0
        this.allTransactions.forEach(trx => {
          if (trx.type === 'Income') {
            this.currentBalance = this.currentBalance + trx.amount
          } else {
            this.currentBalance = this.currentBalance - trx.amount
          }
        });
      }
      
    } else {
      alert(result.message)
    }
  }
  
  
  async addTrx() {
    let validTrx = this.formData.amount > 0 && this.formData.trxType && this.formData.description
    dateTimeStamp()
    
    if (validTrx) {
      let trxDetails = {
        date: dateOnly,
        type: this.formData.trxType,
        amount: Number(this.formData.amount),
        description: this.formData.description,
        entered: dateTime,
        lastUpdated: dateTime
      }

      var result = await this.service.postTransaction(trxDetails)
      if (result.result === true) {
        this.formData.amount = null
        this.formData.trxType = null
        this.formData.description = null
        this.getStarterInfo()
      } else {
        alert(result.message)
      }
    } else {
      alert('Fill all the fields please!')
    }
  }


  async deleteTrx(transaction) {
    var result = await this.service.deleteTransaction(transaction._id);
    if (result.result === true) {
      this.getStarterInfo()
    } else {
      alert(result.message)
    }
  }
    

  editTrx(transaction) {
    this.formData.amount = transaction.amount
    this.formData.trxType = transaction.type
    this.formData.description = transaction.description
    this.updateTrxID = transaction._id

    // Cambio de botones

  }


  async updateTrx() {
    let validTrx = this.formData.amount > 0 && this.formData.trxType && this.formData.description
    dateTimeStamp()
    
    if (validTrx) {
      let trxDetails = {
        _id: this.updateTrxID,
        type: this.formData.trxType,
        amount: Number(this.formData.amount),
        description: this.formData.description,
        lastUpdated: dateTime
      }

      var result = await this.service.postTrxUpdate(trxDetails)
      if (result.result === true) {
        this.formData.amount = null
        this.formData.trxType = null
        this.formData.description = null
        this.updateTrxID = ''
        this.getStarterInfo()
      } else {
        alert(result.message)
      }
    } else {
      alert('Fill all the fields please!')
    }
  }
}
