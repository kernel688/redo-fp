import { Component, OnInit } from '@angular/core';
import {dateOnly, dateTime, dateTimeStamp} from '../sharedFunctions'

@Component({
  selector: 'app-basic-trx',
  templateUrl: './basic-trx.component.html',
  styleUrls: ['./basic-trx.component.css']
})
export class BasicTrxComponent implements OnInit {

  formData: any = {};
  allTransactions: Array<object> = JSON.parse(localStorage.getItem("allTransactions")) || [];
  currentBalance: number = Number(localStorage.getItem("currentBalance")) || 0;
  currentTrxNumber: number = Number(localStorage.getItem("currentTrxNumber")) || 1;
  
  constructor() { }
  
  ngOnInit(): void {
  }
  
  addTrx() {
    
    let validTrx = this.formData.amount > 0 && this.formData.trxType && this.formData.description

    dateTimeStamp()
    
    if (validTrx) {
      let tempAmount = 0
      this.formData.trxType === 'Expense'? tempAmount = this.formData.amount * -1 : tempAmount = this.formData.amount
      this.currentBalance = tempAmount + this.currentBalance
      localStorage.setItem("currentBalance",JSON.stringify(this.currentBalance))
      
      this.currentTrxNumber++
      localStorage.setItem("currentTrxNumber",JSON.stringify(this.currentTrxNumber))
      
      let trxDetails = {
        number: this.currentTrxNumber,
        date: dateOnly,
        type: this.formData.trxType,
        amount: Number(this.formData.amount),
        description: this.formData.description,
        hidden: false,
        trxID: dateTime
      }
      this.allTransactions.push(trxDetails)
      localStorage.setItem("allTransactions",JSON.stringify(this.allTransactions))
      
      this.formData.amount = null
      this.formData.trxType = null
      this.formData.description = null
      
      
    } else {
      alert('Fill all the fields please!')
      
    }
    
    
  }

  hideTrx(transaction) {
    let trxToHide = this.allTransactions[Number(this.allTransactions.indexOf(transaction))]
    trxToHide["hidden"] = true

    let tempAmount = 0
    trxToHide["type"] === 'Income'? tempAmount = Number(trxToHide["amount"]) * -1 : tempAmount = Number(trxToHide["amount"])
    this.currentBalance = tempAmount + this.currentBalance
    
    localStorage.setItem("currentBalance",JSON.stringify(this.currentBalance))
    localStorage.setItem("allTransactions",JSON.stringify(this.allTransactions))
  }
  
}
