import { Component, OnInit } from '@angular/core';
import {trxDate, trxTimeStamp} from '../sharedFunctions'

@Component({
  selector: 'app-basic-trx',
  templateUrl: './basic-trx.component.html',
  styleUrls: ['./basic-trx.component.css']
})
export class BasicTrxComponent implements OnInit {

  formData: any = {};
  allTransactions: Array<object> = JSON.parse(localStorage.getItem("allTransactions")) || [];
  currentBalance: number = Number(localStorage.getItem("currentBalance")) || 0;
  
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
      
      let trxDetails = {
        number: this.allTransactions.length + 1,
        date: trxDate,
        type: this.formData.trxType,
        amount: Number(this.formData.amount),
        description: this.formData.description        
      }
      this.allTransactions.push(trxDetails)
      localStorage.setItem("allTransactions",JSON.stringify(this.allTransactions))
      console.log(this.allTransactions);
      
      
    } else {
      alert('fill all the fields pleas')
    }
    
    
  }
  
}
