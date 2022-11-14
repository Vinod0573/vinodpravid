import React from 'react';
import connectIcon from "../../../../../theme/assets/svg/generic/connectIcon.svg";

// This is the table constant/settings which needed to render table elements
export const tableConstants = (handleRun,jobFetchStatus,handleCompleted) => {
  // console.log( data,"gfdgfdgfd")
  return [
    {
      title: 'Sr.No',
      render: (rowdata,indx,pageNo) => {
     
        return <span>{(pageNo-1)*15 + indx+1}.</span>
      },
    },
    {
      title: 'Job Name',
      render: rowData => {
        return <span>{rowData.jobName?rowData.jobName:"-"}</span>;
      },
    },
   
     {
      title: 'Connector Name',
      render: rowData => {
      
        return <span>{rowData.connectorName?rowData.connectorName:"-"}</span>;
      },
    },

    {
      title: 'Client Name',
      render: rowData => {
        return <span>{rowData.clientName?rowData.clientName:"-"}</span>;
      },
    },
    {
      title: 'Job Fetch Status',
      render: rowData => {
        return <span>{rowData.jobFetchStatus?rowData.jobFetchStatus:"-"}</span>;
      },
    },
    {
      title: 'Actions',
      render: (rowData) => {
       // console.log(rowData)
        return <div >
         {rowData.jobFetchStatus!="Completed"&& <button className='table-btn' onClick={()=>{handleRun(rowData)}}>Run</button>}
          {
            rowData.jobFetchStatus=="Completed" &&<img className='img' src={connectIcon} style={{height:"20px",marginLeft:"5px",cursor:"pointer"}} onClick={()=>{handleCompleted()}} />
          }
            </div>  }
    }
  ];
};


                                  
                                    