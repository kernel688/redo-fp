import { Component, OnInit } from '@angular/core';
import {trxDate, trxDateTime, trxTimeStamp} from '../sharedFunctions'

@Component({
  selector: 'app-basic-trx',
  templateUrl: './basic-trx.component.html',
  styleUrls: ['./basic-trx.component.css']
})
export class BasicTrxComponent implements OnInit {

  formData: any = {};
  allTransactions: Array<object> = JSON.parse(localStorage.getItem("allTransactions")) || [];
  currentBalance: number = Number(localStorage.getItem("currentBalance")) || 0;
  currentTrxNumber: number = Number(localStorage.getItem("currentTrxNumber")) || 0;
  
  constructor() { }
  
  ngOnInit(): void {
  }
  
  addTrx() {
    
    let validTrx = this.formData.amount > 0 && this.formData.trxType && this.formData.description

    trxTimeStamp()
    
    if (validTrx) {
      let tempAmount = 0
      this.formData.trxType === 'Expense'? tempAmount = this.formData.amount * -1 : tempAmount = this.formData.amount
      this.currentBalance = tempAmount + this.currentBalance
      localStorage.setItem("currentBalance",JSON.stringify(this.currentBalance))
      
      this.currentTrxNumber++
      localStorage.setItem("currentTrxNumber",JSON.stringify(this.currentTrxNumber))
      
      let trxDetails = {
        number: this.currentTrxNumber,
        date: trxDate,
        type: this.formData.trxType,
        amount: Number(this.formData.amount),
        description: this.formData.description,
        hidden: false,
        trxID: trxDateTime
      }
      this.allTransactions.push(trxDetails)
      localStorage.setItem("allTransactions",JSON.stringify(this.allTransactions))
      
      
      
    } else {
      alert('fill all the fields pleas')
      console.log(this.allTransactions);
      
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
