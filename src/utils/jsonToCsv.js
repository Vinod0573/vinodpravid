export const jsonToCsv = (jsonData) => {
    const items = jsonData;
    const replacer = (key, value) => value === null ? '' : value // specify how you want to handle null values here
    const header = Object.keys(items[0])
    let csv = [
      header.join(','), // header row first
      ...items.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
    ].join('\r\n')
    
    return csv;   
}

export const jsonToCsv2 = (jsonData) => {
  const items = jsonData;
  const replacer = (key, value) => value === null ? '' : value // specify how you want to handle null values here

  const header = ['id','amount','status','invoice_id','contact','fee','tax','error_description','upi_transaction_id','rrn','auth_code','bank_transaction_id'];
  let csv = [
    header.join(','), // header row first
    ...items.map(row => header.map(fieldName => {
        if(fieldName === 'rrn'){
          return JSON.stringify(row['acquirer_data'][fieldName], replacer)
        }
        else if(fieldName === 'auth_code'){
          return JSON.stringify(row['acquirer_data'][fieldName], replacer)
        }
        else if(fieldName === 'bank_transaction_id'){
          return JSON.stringify(row['acquirer_data'][fieldName], replacer)
        }
        else if(fieldName === 'upi_transaction_id'){
          return JSON.stringify(row['acquirer_data'][fieldName], replacer)
        }
        else{
          return JSON.stringify(row[fieldName], replacer)
        }
        
      }).join(',')
    )
     
  ].join('\r\n')
  
  return csv;   
}


