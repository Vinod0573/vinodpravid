import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import backIcon from "../../../../theme/assets/svg/demo/backIcon.svg";
import "./Screen.css";
import {tableConstants} from "./jobTable/tableConstants";
import TableSaarthiJp from "../../../generic/table/TableSaarthi/TableSaarthiJpFi/TableSaarthiJp"
import Pagination from '../../../generic/pagination/Pagination';
import UploadCampaignDetails from '../../../moduleComponents/campaign/uploadcampaigndetails/UploadCampaignDetails';

function Screen({selecteDetails , presstoBack, newaccoutId,campaignCredentials }) {
    const [listData,setListData]=useState(["Salesforce","Manual","API"])
    const [selectedTab,setSelectedTab]=useState("Manual")
    const[pageNo , setPageNo] = useState(1)
    const[totalPage , setTotalPage] = useState(0)
    const[paginationData, setPaginationData] = useState([])
    const accountName=window.sessionStorage.getItem("accountName")?.toLowerCase()
    const [jobList,setJobList]=useState([])
    const [jobFetchStatus,setJobFetchStatus]=useState("")
    const [jobName,setJobName]=useState("")
    const [loop, setLoop] = useState();
    const[accName , setAccName] = useState()
   
    // useEffect(()=>{
    //     if(selectedTab=="Salesforce"){
    //         async function data(){
    //             let result=await Axios.get("https://connectors.saarthi.ai/api/connectors/job/v1/job/all").then((res)=>{
    //                 return res.data.data
    //             })
    //         }
    //         data()
           
    //     }
    //     // if(selectedTab=="Manual"){
    //     //     https://connectors.saarthi.ai/campaign/api/campaignManagement/customerUploadInfo/v1/getDetails?campaignManagerId=
    //     // }
    // },[selectedTab])
         
    useEffect(
        () => {
            let id = selecteDetails?.accountId || newaccoutId
            Axios.get(`https://${process.env.REACT_APP_SERVER_URL}/api/accounts/account/v1/getById?id=${id}`).then(
                (res) => {
                    
                    setAccName(prev => res?.data?.data?.name)
                }
            ).catch(
                e => console.log(e)
            )
        }, [selecteDetails?.accountId , selecteDetails]
    )

   const getListDetails=()=>{
       if(accName?.length>0){
        Axios.get(`https://${process.env.REACT_APP_CONNECTOR}/api/connectors/job/v1/job/all?clientName=${accName}`).then((res)=>{
            if(res.data){
                setJobList(res.data.data)
                setPaginationData(res.data.data)
            }
        })
       }
   
    }
    useEffect(()=>{
        
        getListDetails()
    },[accName])


    useEffect(()=>{
        if(jobFetchStatus=="Completed"){
            clearInterval(loop);
            setLoop()
            getListDetails()
        }
  
    },[jobFetchStatus])

  

    const handleClickPageNo = (newPageNo) => {
        const tempNewPage = newPageNo + 1;
        setPageNo((prev) => tempNewPage);
        // setClickData(value)
        // setResetClickData(value)
      };

       
      const handleRun=(data)=>{
        let payload={
            "jobName":data.jobName ,
            "campaignManagerId": selecteDetails.id ? selecteDetails.id:campaignCredentials.id
        }
        Axios.post(`https://${process.env.REACT_APP_CONNECTOR}/api/connectors/salesforce/v1/fetchRecords`,payload).then((res)=>{
                    setLoop(
                        setInterval(() => {
                            Axios.get(`https://${process.env.REACT_APP_CONNECTOR}/api/connectors/job/v1/job?jobName=${data.jobName}`).then((response)=>{
                                    if(response.data.data){
                                        setJobFetchStatus(response.data.data?.jobFetchStatus)
                                        
                                    }
                            })
                        }, 2000)
                    );
        })
       
      }


      const handleCompleted=()=>{
          setSelectedTab("Manual")
      }
    return (
        <div className='screen-outer-wrapper'>
        <div className='screen-wrapper'>
            <div>
                <span>{selecteDetails?.campaignId}</span>
            </div>
            <div>
                <img src={backIcon} onClick = {() => presstoBack(false)} className ="imgBack"/>
            </div>
        </div>
        <div className='div-section'>
            {
                listData.map((each)=>{
                return <div className={`show-div-section ${selectedTab==each?"isActive":""}`} onClick={()=>{setSelectedTab(each)}}>
                   {each}
                </div>
                })
            }
          
        </div>
        {
            selectedTab=="Salesforce"?
            <>
              <div className='table-section'>
            {
                <TableSaarthiJp
                cols={tableConstants(
                    (data)=>handleRun(data),
                    jobFetchStatus,
                    handleCompleted
                )}
                data={paginationData}
                pageNo={pageNo}
             
                isLoading={"test"}
            />
            }
        </div>
        <div>
            {totalPage > 1 && (
            <div>
                <Pagination
                totalNoOfPage={totalPage}
                handleClickPageNo={(value) => handleClickPageNo(value)}
                forcePage={pageNo}
                />
            </div>
            )}
        </div>
            </>
            :
            <UploadCampaignDetails/>
        }
      
        </div>
    )
}

export default Screen
