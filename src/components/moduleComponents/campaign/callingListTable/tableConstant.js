import React from 'react';
import moment from "moment";
import callIcon from "../../../../theme/assets/svg/campaign/callIcon.svg"
import callDisconnectIcon from "../../../../theme/assets/svg/campaign/callDisableIcon.svg"

// This is the table constant/settings which needed to render table elements
export const tableConstants = (handleEdit , userId, disableList) => {

  const handleEditt =(e,id) => {
     handleEdit(e,id)
  }  
  return [
    {
      title: 'Sr.No',
      render: (rowdata,indx,pageNo) => {
         return<> <span className={ (rowdata?.isEnabled=== false && (!disableList))? "disableRowColor" : ""}>{(pageNo - 1) * 15 + indx + 1}.</span>
               <span><input type="checkbox"  className='inputAddUser' 
                 checked = {userId?.includes(rowdata?.callingId)}
                   onClick={(e) => {
                        handleEditt(e , rowdata?.callingId)
                   }}
                   disabled = {(rowdata?.isEnabled=== false && (!disableList))? true : false}
                 /> </span> 
          </>  
      },
    },
    {
      title: 'Loan ID',
      render: rowData => {
        return <span className= {`${rowData?.connectionStatus?.toLowerCase() ==="connected" ?'' : "rowdata"} ${ (rowData?.isEnabled=== false && (!disableList))? "disableRowColor" : ""} `}>
          {rowData?.loanId ?rowData?.loanId:"-"}</span>
      },
    },
   
     {
      title: 'Customer Name',
      render: rowData => {
        
        return <span className= {`${rowData?.connectionStatus?.toLowerCase() ==="connected" ?'' : "rowdata" } ${(rowData?.isEnabled=== false && (!disableList))? "disableRowColor" : ""} `}>
          {rowData?.customerName}</span>
      },
    },
    {
      title: 'Phone No.',
      render: rowData => {
        return <span className= {`${rowData?.connectionStatus?.toLowerCase() ==="connected" ?'' : "rowdata" } ${(rowData?.isEnabled=== false && (!disableList))? "disableRowColor" : ""} `}>{rowData?.mobile}</span>
      },
    },
    {
      title: 'Due Date',
      render: rowData => {
        let cDate=new Date(rowData?.emiDueDate)
        return <span  className= {`${rowData?.connectionStatus?.toLowerCase() ==="connected" ?'' : "rowdata"} ${(rowData?.isEnabled=== false && (!disableList))? "disableRowColor" : ""} `}>{cDate?moment(cDate).format("DD-MM-YYYY"):"-"}</span>
      },
    },
    {
      title: 'Language',
      render: rowData => {
         
        return <span className= {`${rowData?.connectionStatus?.toLowerCase() ==="connected" ?'' : "rowdata"} ${(rowData?.isEnabled=== false && (!disableList))? "disableRowColor" : ""}  `}>
               {rowData?.language}
        </span>
     
      },
    },
    {
      title: 'Amount',
      render: rowData => {
        return <span className= {`${rowData?.connectionStatus?.toLowerCase() ==="connected" ?'' : "rowdata" } ${(rowData?.isEnabled=== false && (!disableList))? "disableRowColor" : ""} `}>
          {rowData?.emiAmount}</span>
      },
    },
    {
      title: 'Call Flow',
      render: rowData => {
        return  <span className= {`${rowData?.connectionStatus?.toLowerCase() ==="connected" ?'' : "rowdata"} ${(rowData?.isEnabled=== false && (!disableList))? "disableRowColor" : ""}  `}>
          {rowData?.flowType}</span>
      },
    },
    {
      title: 'Connection Status',
      render: rowData => {
        return <div className= {`${rowData?.connectionStatus?.toLowerCase() ==="connected" ?'listConnectedbtn' : "listNotConnectedbtn"} ${(rowData?.isEnabled=== false && (!disableList))? "disableTableButton" : ""}  `}>
        <span>{rowData?.connectionStatus ? rowData?.connectionStatus  : "Yet to start"}</span>
      </div>
      },
    },
    {
      title: 'Disposition',
      render: rowData => {
        return <div className= {`${ rowData?.disposition ?rowData?.connectionStatus?.toLowerCase() ==="connected" ?'listConnectedbtn' : "listNotConnectedbtn":"" } ${(rowData?.isEnabled=== false && (!disableList))? "disableTableButton" : ""} `}>
        <span>{rowData?.disposition}</span>
      </div>
      },
    },
    {
      title: 'Payment Status',
      render: rowData => {
        return <div className= {`${rowData?.connectionStatus?.toLowerCase() ==="connected" ?'listConnectedbtn' : "listNotConnectedbtn"} ${(rowData?.isEnabled=== false && (!disableList))? "disableTableButton" : ""} ` }>
        <span>{rowData?.paymentStatus}</span>
      </div>
      },
    },
    {
      title: 'Dialed Time',
      
      render: rowData => {
        let cDate = new Date(rowData?.dialedTime);
        return <div className= {`${rowData?.connectionStatus?.toLowerCase() ==="connected" ?'' : "rowdata"} ${(rowData?.isEnabled=== false && (!disableList))? "disableRowColor" : ""} ` }>
          <div>{cDate && rowData?.dialedTime ? moment(cDate).format("DD-MM-YYYY") : ""}</div>
        <div style={{fontSize :"0.75vmax"}}>{rowData?.dialedTime ? moment.utc(rowData?.dialedTime).format('h:mm A') : ""}</div>
      </div>
      },
    },
    {
      title: '',
      render: rowData => {
        return <span><img src={ (rowData?.isEnabled=== false && (!disableList)) ?  callDisconnectIcon : callIcon }></img></span>
      },
    },
    
  ];
};


                                  
                                    