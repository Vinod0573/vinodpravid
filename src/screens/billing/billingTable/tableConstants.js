import React from 'react';
import campaignDownload from "../../../theme/assets/svg/adminView/campaignDownload.svg";
import emailIcon from "../../../theme/assets/svg/adminView/emailIcon.svg";
import eyeIcon from "../../../theme/assets/svg/adminView/eyeIcon.svg";
import Button from '../../../components/generic/button/Button';
import decPdf from "../pdf/Saarthi_dec_invoice.pdf";
import janPdf from "../pdf/saarthi_jan_invoice.pdf";

// This is the table constant/settings which needed to render table elements
export const tableConstants = ( downloadData,emailData,showData) => {
  
  const onClickBtn =() => {
    window.location.href = "https://rzp.io/i/QVko0ZpzQ"
  }


  return [
    {
      title: 'Invoice Number',
      render: (rowData,indx,pageNo) => {
        return <span>{rowData["Invoice Number"]}</span>;
      },
    },
    {
      title: 'Invoice Month',
      render: rowData => {
        return <span>{rowData["Invoice Month"]}</span>;
      },
    },
    {
      title: 'Invoice Raised On',
      render: rowData => {
        return <span>{rowData["Invoice Raised On"]}</span>;
      },
    },
    {
      title: 'Invoice Due Date',
      render: rowData => {
        return <span>{rowData["Invoice Due Date"]}</span>;
      },
    },
    {
      title: <p>Amount &#8377;</p>,
      render: rowData => {
        return <span>{rowData["Amount"]}</span>;
        
      },
    },
    {
      title: <p>Status</p>,
      render: rowData => {
        if(rowData["Status"]=="Paid"){
          return <div className='paid-btn'><span>{rowData["Status"]}</span></div>;
        }else{
          return <span>
            <Button text = "Pay Now" 
             onClick = {() => onClickBtn()}
             extraClass = "payNowBtn"
            />
            </span>;
        }
       
      },
    },
    
    {
      title: 'Actions',
      render: rowData => {
        return <>
         <a 
         href={rowData["Status"]=="Paid"?janPdf:decPdf} 
         download={rowData["Status"]=="Paid"?janPdf:decPdf}
         >
         <img 
         className='img' 
         src={campaignDownload} 
         style={{height:"12px",marginRight:"25px"}} 
        //  onClick={()=>{downloadData(rowData)}} 
         />
          </a>  
        <img className='img' src={emailIcon} style={{height:"12px",marginRight:"25px"}} onClick={()=>{emailData(rowData)}}/>
        <a 
        href={rowData["Status"]=="Paid"?janPdf:decPdf} 
        target="_blank" rel="noreferrer"
        >
          <img 
          className='img' 
          src={eyeIcon} 
          style={{height:"12px",marginRight:"0px"}} 
          // onClick={()=>{showData(rowData)}}
          />
          </a>

        </>  }
    }
  ];
};


                                  
                                    