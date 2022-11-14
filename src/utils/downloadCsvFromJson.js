export const downloadCsvFromJson = (stringToJsonData,fileName) => {
    const items = stringToJsonData;
    const replacer = (key, value) => value === null ? '' : value // specify how you want to handle null values here
    const header = Object.keys(items[0])
    let csv = [
      header.join(','), // header row first
      ...items.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
    ].join('\r\n')
    
    
    //var csv_string = csv.join('\n');
    // Download it
    var fileName1 =  fileName + '.csv';
    var link = document.createElement('a');
    link.style.display = 'none';
    link.setAttribute('target', '_blank');
    link.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv));
    link.setAttribute('download', fileName1);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
//Math.round(rowData?.information?.talk_time / 100) / 10

export const downloadCsvFromJsonReport = (stringToJsonData,fileName) => {
  const items = stringToJsonData;

  const replacer = (key, value) => value === null ? '' : value // specify how you want to handle null values here
  let header = Object.keys(items[0].information)
    //header = 
    const index = header?.indexOf('ring_time');
    if (index > -1) {
      header?.splice(index, 1);
      header?.push("ring_time(s)")
    }
    const indext = header?.indexOf('talk_time');
    if (indext > -1) {
      header?.splice(indext, 1);
      header?.push("talk_time(s)")
    }
  let csv = [
    header.join(','), // header row first
    ...items.map(row => header.map(fieldName => {
      if(fieldName === 'ring_time(s)'){
        return JSON.stringify(Math.round(row['information']['ring_time']/100)/10, replacer)
      }
      else if(fieldName === 'talk_time(s)'){
        return JSON.stringify(Math.round(row['information']['talk_time']/100)/10, replacer)
      }
      else{
        return JSON.stringify(row['information'][fieldName], replacer)
      }
    }).join(','))
  ].join('\r\n')
  
  
  //var csv_string = csv.join('\n');
  // Download it
  var fileName1 =  fileName + '.csv';
  var link = document.createElement('a');
  link.style.display = 'none';
  link.setAttribute('target', '_blank');
  link.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv));
  link.setAttribute('download', fileName1);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}


export const jsonToCsvReport = (stringToJsonData,fileName) => {
  const items = stringToJsonData;

  const replacer = (key, value) => value === null ? '' : value // specify how you want to handle null values here
  const header = Object.keys(items[0].information)

  let csv = [
    header.join(','), // header row first
    ...items.map(row => header.map(fieldName => JSON.stringify(row['information'][fieldName], replacer)).join(','))
  ].join('\r\n')
  
  return csv;
}
export const textTocsv = (stringToJsonData) => {

  let text = stringToJsonData.split('\n')                               // split lines
            .map(line => line.split(/\s+/).join(','))  // split spaces then join with ,
            .join('\n')
    return text     
}
