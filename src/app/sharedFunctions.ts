export {dateOnly, dateTime, dateTimeStamp}

let dateOnly: string;
let dateTime: string;
function dateTimeStamp() {
  let trxFullDate = new Date()
  let day = String(trxFullDate.getDate()).padStart(2,'0')
  let month = String(trxFullDate.getMonth() + 1).padStart(2,'0')
  let year = String(trxFullDate.getFullYear())
  let hour = String(trxFullDate.getHours()).padStart(2,'0')
  let minute = String(trxFullDate.getMinutes()).padStart(2,'0')
  let second = String(trxFullDate.getSeconds()).padStart(2,'0')
  dateOnly = day + '/' + month + '/' + year
  dateTime = year + month + day + hour + minute + second
}