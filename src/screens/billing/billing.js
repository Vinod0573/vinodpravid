import React,{useState} from 'react';
import DateFilter from '../../components/generic/datefilter/DateFilter';
import "./billing.css";
import { tableConstants } from "./billingTable/tableConstants";
import TableSaarthiJp from '../../components/generic/table/TableSaarthi/TableSaarthiJpFi/TableSaarthiJp'
import Pagination from '../../components/generic/pagination/Pagination'
import SendEmailForm from "../../components/generic/sendemailform/SendEmailForm";


function Billing() {
    const[pageNo , setPageNo] = useState(1)
    const[totalPage , setTotalPage] = useState(0)
    const[paginationData, setPaginationData] = useState([
        {"Invoice Number":"SA001","Invoice Month":"Dec-21","Invoice Raised On":"10-Jan-22","Invoice Due Date":"10-Feb-22","Amount":"490060.25","Status":"Paid"},
        {"Invoice Number":"SA002","Invoice Month":"Jan-22","Invoice Raised On":"10-Feb-22","Invoice Due Date":"10-Mar-22","Amount":"473800.00","Status":"Unpaid"}
  
    ])
    const [isEmailDropDownOn,setIsEmailDropDownOn]=useState(false)
    const handleClickPageNo = (newPageNo) => {
        const tempNewPage = newPageNo + 1;
        setPageNo((prev) => tempNewPage);
      };

    const downloadData=()=>{
      true
    }

    const emailData=()=>{
        setIsEmailDropDownOn(true)
    }

    const showData=()=>{
    true
    }
    const data2 ={
      "template":"paymentTemplate",
    "paymentLink":"https://rzp.io/i/QVko0ZpzQ",
    "amount":"473800.00"
  }

    return (
        <div className="topDiv bot-info">
           
            <div className="childdiv billing">
                <div className='billingWrapper'>
                    <div className='modal-section'>
                    <div className='billing-datePicker'> 
                        <DateFilter 
                        id="dateRangeOne" 
                        dateHeader={"show"} 
                        fixedDate={true}
                        startDate={new Date("02/10/2022")}
                        endDate={new Date("03/10/2022")}
                        />
                    </div>
                    <div className='billing-table'>
                       
                    <TableSaarthiJp
                    cols={tableConstants(
                        downloadData,
                        emailData,
                        showData

                    )}
                    data={paginationData}
                    pageNo={pageNo}
                    isLoading={"test"}
                     />
                      {isEmailDropDownOn ? (
                    <div className={`dropDownEmailComponentContainer`}>
                      <SendEmailForm
                        filePathName={""}
                        isEmailDropDownOn={isEmailDropDownOn}
                        setIsEmailDropDownOn={setIsEmailDropDownOn}
                        data = {data2}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                    </div>
                    </div>
                    <div>
                            {totalPage > 1 && (
                            <div >
                                <Pagination
                                totalNoOfPage={totalPage}
                                handleClickPageNo={(value) => handleClickPageNo(value)}
                                forcePage={pageNo}
                                />
                            </div>
                            )}
                        </div>
                </div>
              
            </div>
           
        </div>
    )
}

export default Billing
