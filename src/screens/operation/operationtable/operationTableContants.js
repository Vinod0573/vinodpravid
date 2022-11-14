import React from "react";


// This is the table constant/settings which needed to render table elements
export const operationTableConstants = () => {
  
   const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"]
  return [
    {
      title: "Sr. No.",
      render: (rowData, indx, pageNo) => {
        return <span>{(pageNo - 1) * 17 + indx + 1}.</span>;
      },
    },
    {
      title: "Month",
      render: (rowData, indx, pageNo) => {
       
        return <span>{ rowData?.month && rowData?.year ?  month[rowData?.month-1]+ "-" + rowData?.year : ""}</span>;
      },
    },
    {
      title: "Client",
      render: (rowData) => {
        return <span>{rowData?.clientName}</span>;
      },
    },
    {
      title: "Allocated Account",
      render: (rowData) => {
        return <span>{rowData?.allocatedAccount ? rowData?.allocatedAccount : '-'}</span>;
      },
    },
    {
      title: "Connection Rate",
      render: (rowData) => {
        return <span>{rowData?.allocatedAccount >0 ? ( rowData?.totalConnected/rowData?.allocatedAccount) : '-'}</span>;
      },
    },
    {
      title: "Talk Time ",
      render: (rowData) => {
        return <span>{rowData?.totalTalktimeSec ? Math.ceil(rowData?.totalTalktimeSec/(60*1000)) : '-'}</span>;
      },
    },
    {
      title: "Connected Mins",
      render: (rowData) => {
     
        return <span>{rowData?.totalTalktime? rowData?.totalTalktime : '-'}</span>;
      },
    },
    {
      title: "SMS Sent",
      render: (rowData) => {
        return <span>{(rowData?.totalMessage || rowData?.totalMessage ===0 )? rowData?.totalMessage: "-"}</span>;
      },
    },
    {
      title: "WhatsApp Sent",
      render: (rowData) => {
        return <span>{(rowData?.totalWhatsapp || rowData?.totalWhatsapp ===0 ) ? rowData?.totalWhatsapp : '-'}</span>;
      },
    },
    {
      title: 'Email Sent',
      render: rowData => {
        return <span>{rowData?.emailSent ? rowData?.emailSent : '-'}</span>;
      },
    },
    {
      title: 'Legal Notice Sent',
      render: rowData => {
        return <span>{rowData?.legalNoticeSent ? rowData?.legalNoticeSent : '-'}</span>;
      },
    }
  ];
};
