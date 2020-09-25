export {trxDate, trxDateTime, trxTimeStamp}

let trxDate;
let trxDateTime;
function trxTimeStamp() {
  let trxFullDate = new Date()
  let day = String(trxFullDate.getDate()).padStart(2,'0')
  let month = String(trxFullDate.getMonth() + 1).padStart(2,'0')
  let year = String(trxFullDate.getFullYear())
  let hour = String(trxFullDate.getHours()).padStart(2,'0')
  let minute = String(trxFullDate.getMinutes()).padStart(2,'0')
  let second = String(trxFullDate.getSeconds()).padStart(2,'0')
  trxDate = day + '/' + month + '/' + year
  trxDateTime = year + month + day + hour + minute + second
}