import React , {useState ,useEffect} from 'react';
import axios from 'axios'
import "../TableSaleforce/Table.css"
import { useSelector, useDispatch } from "react-redux";

import Pagination from '../../../generic/pagination/Pagination';



 function TableHistory(props) {
    const[tableData , settableData] = useState([])
    const[pageNo , setPageNo] = useState(1)
    const[totalPage , setTotalPage] = useState(0)
    const[paginationData, setPaginationData] = useState([])
    
    // let JobName =props.namejob;
    // console.log('i am history', JobName)
      const url = `https://${process.env.REACT_APP_CONNECTOR}/api/connectors/job/v1/jobHistory?jobName=${props.jobName}`
  
    const jobName =  useSelector(
      (store) => { store.integartionReducer.jobName}
    )
     
    const getdatatable = async() => {
       await axios.post(url)
        .then((data) => {
            let temdata = data.data.data
            settableData( prev =>temdata)
                let arrSize = temdata?.length;
       arrSize = Math.ceil(arrSize / 13);
       setTotalPage((prev) => arrSize);
    //   let tempData = tableData;
       temdata= temdata?.slice(0, 13);
       setPaginationData(temdata);
        })
      }
    useEffect( () => {
         if(props.jobName?.length) {
            getdatatable()
         }
    },[props.jobName])

  
    const tableHeader = props.array
     
   
    const handleClickPageNo = (newPageNo) => {
        const tempNewPage = newPageNo + 1;
        let tempData = tableData;
        tempData = tempData?.slice(newPageNo * 13, (newPageNo + 1) * 13);
        setPaginationData((prev) => tempData);
        setPageNo((prev) => tempNewPage);
        };
  return (
      <>
    {paginationData.length ?
     <div className='mytable'>
          
      <div className='table-div' >
        <table className='table'>
            <tr className='first-row'>
            <th className='th1'>
                Sr.
            </th>
            <th>
             
              {tableHeader[0]}
            </th>
            <th>
              
                {tableHeader[1]}
            </th>
            <th>
              
                {tableHeader[2]}
            </th>
            <th className='tablehistory-row-1-coloum-3'>
               
                {tableHeader[3]}
            </th>
           
            </tr>
            <tbody className='tbody'> 
            { 
                paginationData.map((tab,i) => {
                    
                   return  (
                      
                   <tr key={i}>
                        
                        <td style={{padding: "1px"}}>{(pageNo-1) * 13 + i + 1}.</td>
                        <td style={{padding: "1px"}}>{tab.jobName}</td>
                        <td style={{padding: "1px"}} >{tab.connectorName}</td>
                        <td style={{padding: "1px"}}>{tab.clientName}</td>
                        <td style={{padding: "1px"}}>{tab.jobFetchStatus? tab.jobFetchStatus: "New"}</td>
                        
                    </tr>)
                
                })}
               </tbody> 
           
           
        </table>
        </div>
        <div className="pagination-historytable">
        <Pagination totalNoOfPage={totalPage}
         forcePage={pageNo}
          handleClickPageNo={(value) => handleClickPageNo(value)}/>
  </div> </div>  : <div className='errorHistoryAbhi'><h3> History Not Found</h3></div>}
  </>
  )
}


export default TableHistory;
