import React from 'react'
import stopIcon from "../../../assets/demoPageLogIn/stopIcon.svg"
function TableConstant() {
  return (
    
        [
    {
        title: 'Sr.No.',
        render: rowData => {
          return <span>{rowData.sr}</span>;
        },
      },
      {
        title: "Sector",
        
        render: rowData => {
          return <span>{rowData.sector}  </span>;
        },
      },
     
      {
        title: 'Enterprise Name',
        render: rowData => {
          return <span>{rowData.enterpriseName}</span>;
        },
      },
    
      {
        title: 'Campaign ID',
        render: rowData => {
          return <span>{rowData.compaignId}</span>;
        },
      },
      {
        title: 'Telephony ID',
        render: rowData => {
          return <span>{rowData.telephonyId}</span>;
        },
      },
      {
        title: 'Start date',
        render: rowData => {
          return <span>{rowData.startDate}</span>;
        },
      },
      {
        title: 'End date',
        render: rowData => {
          return <span> {rowData.endDate}</span>
        },
      },
      {
        title: 'Created on',
        render: rowData => {
          return <span> {rowData.createdOn}</span>
        },
      },
      {
        title: 'Status',
        render: rowData => {
          return <span style={{color: "gold"}}> {rowData.status}</span>
        },
      },
      {
        title: 'Action',
        render: rowData => {
          return <span> <img src={stopIcon} /> </span>
        },
      },
  ]

  )
}

export default TableConstant