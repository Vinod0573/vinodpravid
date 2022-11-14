import React from 'react';
import editIcon from "../../../theme/assets/svg/campaign/editIcon.svg";
import deleteIcon from "../../../theme/assets/svg/campaign/deleteIcon.svg";

// This is the table constant/settings which needed to render table elements

export const tableConstants = (editViewData,deleteData) => {
  
  return [
    {
      title: 'Sr.No',
      render: (rowData,indx,pageNo) => {
        return <span>{(pageNo-1)*15 + indx+1}.</span>;
      },
    },
    {
      title: 'Bot Name',
      render: rowData => {
        return <span>{rowData.botName?rowData.botName:"-"}</span>;
      },
    },
    {
      title: 'Bot Id',
      render: rowData => {
        return <span>{rowData.botId?rowData.botId:"-"}</span>;
      },
    },
    {
      title: 'Client Name',
      render: rowData => {
        return <span>{rowData.clientName?rowData.clientName:"-"}</span>;
      },
    },
    {
      title: 'Bot End Point',
      render: rowData => {
        return <span>{rowData.botEndPoint?rowData.botEndPoint:"-"}</span>;
      },
    },
    {
      title: 'Access Token',
      render: rowData => {
        return <span>{rowData.accessToken?rowData.accessToken:"-"}</span>;
      },
    },
    {
      title: 'Action',
      render: rowData => {
        return <>
         <img className='img' src={editIcon} style={{height:"20px",marginLeft:"5px"}} onClick={()=>{editViewData(rowData)}} />
        <img className='img' src={deleteIcon} style={{height:"20px",marginLeft:"5px"}} onClick={()=>{deleteData(rowData)}}/>
        </>  }
    }
  ];
};


                                  
                                    