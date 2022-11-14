import React,{useState,useEffect} from 'react'
import "./bot.css"
import CreateBot from './createBot/createBot'
// import CreateCampaign from './createCampaign/createCampaign'
import Axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from "../../components/generic/loader/Loader";
import Pagination from '../../components/generic/pagination/Pagination'
import DeleteModal from '../../components/generic/deleteModal/DeleteModal'
import SearchIcon from "../../theme/assets/svg/generic/searchIcon.svg";
import Inputbox from "../../components/generic/inputBox/InputBox";
import { tableConstants } from "./botTable/tableConstants";
import TableSaarthiJp from '../../components/generic/table/TableSaarthi/TableSaarthiJpFi/TableSaarthiJp'

function Bot(props) {
    const [bodyData, setBodyData] = useState([]);
    const [showCreate,setShowCreate]=useState(false)
    const [isEdit, setIsEdit]=useState(false)
    const [isEditData,setIsEditData]=useState({})
    const [showView,setShowView]=useState(false)
    const [loading,setLoading]=useState(false)
    const [clickData,setClickData]=useState(0)
    const [showDeleteModal,setShowDeleteModal]=useState(false)
    const [deleteId,setDeleteId]=useState("")
    const [searchData,setSearchData]=useState("")
    const [resetBodydata,setResetBodydata]=useState([])
    const [resetClickData,setResetClickData]=useState(0)
    const[pageNo , setPageNo] = useState(1)
    const[totalPage , setTotalPage] = useState(0)
    const[paginationData, setPaginationData] = useState([])

    const propsOfTable = {
        headingData: [
            "Sr.No","Bot Name","Bot ID","Client Name","Bot End Point","Access Token","Actions"
        ],
        tHeadClassName: "tHeadClassName",

      
    
      };

        const getBotData=(type)=>{
        setLoading(true)
        Axios.get(`https://${process.env.REACT_APP_CONNECTOR}/campaign/api/campaignManagement/botInfo/v1/get`).then((res)=>{
            if(res?.data){
                setBodyData(res.data.data)
                setResetBodydata(res.data.data)
                // let length=(res.data.data.length)/8
               
                    handleClickPageNo(0)
              
               
            }
            setLoading(false) 

           
        })
    }
    useEffect(()=>{
        getBotData()
    },[])

    
    const editViewData=(data)=>{
        setIsEdit(true)
        setIsEditData(data)
    }

    const pushToCreate=()=>{
        let temp=showCreate
        setShowCreate(!temp)
    }
    const moveToPrevious=()=>{
        handleClickPageNo(0)
        setShowCreate(false)
        setIsEdit(false)
        setShowView(false)
        getBotData()
        setIsEditData({})
    }
    // const handleClickPageNo=(value)=>{
    //     setClickData(value)
    //     setResetClickData(value)
    // }

    const handleClickPageNo = (newPageNo) => {
        const tempNewPage = newPageNo + 1;
        setPageNo((prev) => tempNewPage);
        // setClickData(value)
        // setResetClickData(value)
      };
    const setValue=(arrSize)=>{
        setTotalPage(arrSize)
    }

    const deleteData=(data)=>{
        setShowDeleteModal(true)
        setDeleteId({id:data.id,botId:data.botId})
       
    }
    const deleteBotData=(isDelete)=>{
      if(isDelete){
        Axios.delete(`https://${process.env.REACT_APP_CONNECTOR}/campaign/api/campaignManagement/botInfo/v1/delete`,{data:{id: deleteId.id}}).then((res)=>{
            toast.success("Bot deleted successfully!")
            getBotData("delete")
           
        }).catch((err)=>{
            toast.error("Bot deletion not successful")
        })
        setShowDeleteModal(false)
      }else{
          setShowDeleteModal(false)
      }
       
    }
    const handleSearchChange=(e)=>{
        
       
        let toSearch = (e.target.value).toLowerCase()
        setSearchData(e.target.value)
        let finalData = resetBodydata.map((dat, i) => {
            if (dat.botName.toLowerCase().match(toSearch) && toSearch) {
                return dat
            }
        })
        let data = finalData.filter(e => { return e })
        if(e.target.value?.length>0){
           setBodyData(data)
           setClickData(0)
        }else{
            setBodyData(resetBodydata)
            setClickData(resetClickData)
        }
    }

    // const showViewData=(data)=>{
    //     setShowView(true)
    //     setIsEdit(true)
    //     setIsEditData(data)
    // }

    const setIsActive=(data)=>{
        if(data.toLowerCase()=="bot"){
            setShowCreate(false)
        }
        
    }

    const getPagination=()=>{
        let arrSize =bodyData?.length;
        arrSize =  Math.ceil(arrSize / 15);
        setTotalPage((prev) => arrSize);
        // props.noOfPages(arrSize)
       let tempData = bodyData;
       let startValue=(pageNo-1)*15
       let endValue=pageNo*15
        tempData = tempData.slice(startValue, endValue);
        setPaginationData(tempData);
      }
      useEffect(()=>{
        getPagination()
      },[pageNo,bodyData])



    return (
        <>
          <div className="topDiv bot-info">
                {/* <Sidebar activeData={(data)=>{setIsActive(data)}} /> */}
               <div className="childdiv">

            {loading?<Loading />:
               (showCreate || isEdit)?
                <CreateBot editData={isEditData}  previous={()=>{moveToPrevious()}}/>
                :
                    <div >
                            <div className="btn-component">
                            <div className='search-input'>
                            <div className="searchDivTable">
                                <Inputbox
                                className="userListSearchInput"
                                type="search"
                                placeholder="Bot Name"
                                imgSrcLeft={SearchIcon}
                                onChangeValue={(e)=>handleSearchChange(e)}
                                //    imageClick={() => imageClick()}
                                />
                            </div>
                            </div>
                        <div className='btn-div' onClick={()=>{pushToCreate()}}>
                            Create Bot Info
                        </div>
                        </div>
                        <div className='botInfoTableContainer' style={{width:"100%"}}>
                       
{/*                       
                        <div className='management-table'>
                          
                            <ManagementTable 
                            {...propsOfTable} 
                            handleClickPageNo={(pgNo)=>{handleClickPageNo(pgNo)}}
                            bodyData={bodyData}
                            tBodyClassName=""
                            isBotTable={true}
                            editBotInfo={(data)=>{editViewData(data)}}
                            deleteBotInfo={(data)=>{deleteData(data)}}
                            noOfPages={(arrSize)=>{setValue(arrSize)}}
                            isHandleClick={clickData}
                            isBot={true}
                            // setView={(data)=>{showViewData(data)}}
                            />
                           
                            </div> */}
                           
                            <div className='campaignTable'>
                               
                                <TableSaarthiJp
                                    cols={tableConstants(
                                    editViewData,
                                    deleteData
                                    )}
                                    data={paginationData}
                                    pageNo={pageNo}
                                   
                                    isLoading={"test"}
                                />
                            
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
                        {/* <div className='pagination-campaign'>
                        <Pagination  
                                forcePage={1}
                                getPage={clickData}
                                totalNoOfPage={totalPage}
                                handleClickPageNo={(value) => handleClickPageNo(value)}
                                />
                        </div> */}
                    
                    </div>}
                  
                   
                </div>
                {
                    showDeleteModal&&  <div className='feedbackHistoryModelWrap'>
                    <DeleteModal
                    deleteData={(data)=>{deleteBotData(data)}}
                    elementId={deleteId.botId}
                    closeDeleteModal={()=>{setShowDeleteModal(false)}}
                    />
                    </div>
                }
                <ToastContainer
                position="top-center"
                type="success"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick={false}
                draggable={false}
                rtl={true}
               
            />
          </div>
        </>
    )
}

export default Bot