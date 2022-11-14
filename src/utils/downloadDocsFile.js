export const downloadDocsFile = (csv,fileName) => {
    // Download it
    //var fileName =  fileName + '.csv';
    var link = document.createElement('a');
    link.style.display = 'none';
    link.setAttribute('target', '_blank'); 
     const blob = new Blob([csv], { type:'application/vnd.openxmlformats-officedocument.wordprocessingml.document'});
    const downloadURL = window.URL.createObjectURL(blob);
    link.href = downloadURL;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}