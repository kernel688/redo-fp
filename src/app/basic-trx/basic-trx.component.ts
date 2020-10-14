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
        number: Number(this.allTransactions.length) + 1 || 1,
        date: dateOnly,
        type: this.formData.trxType,
        amount: Number(this.formData.amount),
        description: this.formData.description,
        hidden: false,
        trxID: dateTime
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













  hideTrx(transaction) {
    let trxToHide = this.allTransactions[Number(this.allTransactions.indexOf(transaction))]
    trxToHide["hidden"] = true

    let tempAmount = 0
    trxToHide["type"] === 'Income' ? tempAmount = Number(trxToHide["amount"]) * -1 : tempAmount = Number(trxToHide["amount"])
    this.currentBalance = tempAmount + this.currentBalance

    localStorage.setItem("currentBalance", JSON.stringify(this.currentBalance))
    localStorage.setItem("allTransactions", JSON.stringify(this.allTransactions))
  }

}
