import React, { useEffect, useState } from 'react'
import "./SchedulerSettingOmni.css"
import "../configurecampaign/ConfigureCampaign.css"
import languageIcon from "../../../../theme/assets/svg/demo/template.svg"
import campaignTypeicon from "../../../../theme/assets/svg/demo/communicationIcon.svg"
import dateRangeIcon from "../../../../theme/assets/svg/demo/clockOmni.svg"
import optionListIcon from "../../../../theme/assets/svg/campaign/dropdownOptionIcon.svg"
// import MultiSelectDropdown from "../../components/widlyuse/multiselectdropdown/MultiSelectDropdown";
import MultiSelectDropdown from "../../../moduleComponents/campaign/omniChannel/multiDropdownOmni/MultiSelectDropdown"
import DateFilter from "../../../generic/datefilter/DateFilter";
import downArrow from "../../../../theme/assets/svg/campaign/dropdownIconDown.svg"
import TimePicker from "../../../generic/timepicker/TimePicker";
import moment from "moment";
// import ChannelOmni from './channelBtnOmni/ChannelOmni'
import Button from "../../../generic/button/Button";
import WhatsappCampaignSummary from '../omniChannel/whatsappCampaign summary/WhatsappCampaignSummary'
import { useSelector, useDispatch } from "react-redux";
import { storeSedulerSettingDataWhatsApp , getMindMap , getTemplatesDropdown} from "../../../../redux/omniChannel/actions";
import PopUpImg from './popUpImage/PopUpImg'
import LoaderSaarthi from '../../../generic/loader/Loader'
import ImgModal from './ImgModal/ImgModal'
import DCBAccordWhatsApp from './whatsAppDBC/DCBAccordWhatsApp'
import DCBTableDataWP from './whatsAppDBC/DCBTableDataWP'



function SchedulerSettingOmni() {
  const storedDataScheduler = useSelector(
    store => store?.omniChannelReducer?.storedschedulerSettingwhatsApp
  )
    const [selectCommunication , setSelectCommunication ] = useState(storedDataScheduler?.communication ? storedDataScheduler?.communication :"")
    const [selectTemplate , setSelectTemplate] = useState(storedDataScheduler?.template ? storedDataScheduler?.template :"")
    const [selectTemplateId , setSelectTemplateId] = useState()
    const [isShowSummaryPage,setIsShowSummaryPage]=useState()
    const [ templateDropdownArray , SetTemplateDropDownArray]= useState([])
    const [time , setTime] = useState(storedDataScheduler?.time ? storedDataScheduler?.time : "")
    const [showMindMap , setMindMap] = useState(false)
    const [wpdataCampaign , setWpdataCampaign] = useState()

    const dispatch = useDispatch();
    let dateData = useSelector((store) =>store?.filterReducer?.filteredDateRangeData )
    const templatres = useSelector((store) =>store?.omniChannelReducer?.getTemplateState)
    const templatesDropDown = useSelector((store) =>store?.omniChannelReducer?.getDropdownTemplates)
    const loadingTemplates = useSelector((store) =>store?.omniChannelReducer?.isLoding)
    const minMapImg = useSelector((store) =>store?.omniChannelReducer?.getMindmap?.azureLink)
    const accountName = useSelector((store) =>store?.loginReducer.userLoginInfo)
 
    const campaignWhatsAppData =  useSelector((store) =>store?.campaignReducer?.campaignAllCampaignChannelData)
    const reduxClientNameDropdown = useSelector((store) => store?.campaignReducer?.campaignClientName)
   
   
  // account details 
   
  let mainClientName =  accountName?.userDetail?.accountDetails[0]?.name 
   // get all campaign data of whatsApp
   useEffect(
     () => {
         if(campaignWhatsAppData){
          campaignWhatsAppData?.map(
            e => {
              if(e?.channels?.includes("WhatsApp")){
                setWpdataCampaign(prev => e)
              }
            }
          )
         }

     },[campaignWhatsAppData]
   )

   

    //get All dropdown Templates 
    useEffect(
        () => {
            let data = {
                "channel": "Whatsapp",
      //       "language": ["English"],
      //      "flow": {
      //     "Pre-Due": [],
      //     "Post-Due": ["DPD 1-7","DPD 8-15","DPD 30+","NPA","DPD 30-60"]
      //  },
      //  "msgType": "One Way",
      // "accountName": "Kreditbee Debt Testing"
      "language": wpdataCampaign?.language,
      "flow": wpdataCampaign?.flowType,
     "msgType": selectCommunication,
    "accountName":  (reduxClientNameDropdown && reduxClientNameDropdown !== "Select All" )? reduxClientNameDropdown :  mainClientName
            }
            if(selectCommunication && wpdataCampaign?.flowType){
              dispatch(getTemplatesDropdown(data))
            }
        },[ wpdataCampaign , selectCommunication]
    )
  

  // storing only names 
   useEffect(
      () => {
          if(templatesDropDown?.length >0){
            
              let arr = templatesDropDown?.map(e => e?.templates?.templateName)
              SetTemplateDropDownArray(prev => arr)
          }
          else {
            SetTemplateDropDownArray([])
            setSelectTemplate("")
          }
      }
    ,[templatesDropDown ]
    )
    // filtering id as per selected name 
    useEffect(
        () => {
            if(selectTemplate){
                let idArray =
                templatesDropDown?.map(e => {
                    if(selectTemplate?.includes(e?.templates?.templateName)){
                       return e?.id
                    }
                })?.filter(e => e)
                setSelectTemplateId(prev => idArray)
              
            }

        },[selectTemplate ]
    )

   



   const onChangeCommunication =(data) => {
    if(selectCommunication == data ){
        setSelectCommunication(prev => null) 
       }else{
        setSelectCommunication(prev => data )
       }
   }
   const onChangeselectTemplate =(item) => {
    setSelectTemplate(prev =>item)
    // setHidebtn(true)
}
const langOptions ={
    imgSrcRight: downArrow,
    imgSrcleft: "",
    // placeHolderText:  selectedLanguage?.length ?  selectedLanguage?.[0]+(selectedLanguage?.length>1 ? ("+".concat(selectedLanguage?.length-1)) : ""): "Select"
    placeHolderText: selectTemplate?.length
      ? selectTemplate?.toString()?.length > 16
      ? selectTemplate[0].length > 16
        ? selectTemplate[0].substring(0, 16) + "..."
        : selectTemplate[0]
      : selectTemplate
      : "Select Template",
  };
  const format1 = "h:mm a";
  const now = moment().hour(0).minute(0);

  const showSummaryPage=(isShow)=>{
    setIsShowSummaryPage(isShow)
  }
  // sending templates
//   useEffect(
//       () => {
//           if(selectTemplateId){
//             dispatch(getTemplatesWhatsApp(selectTemplateId)) 
//           }

  const setTimeData=(value)=>{
    setTime(prev =>value )
       
  }
  // senfding templates
//   useEffect(
//       () => {
//           if(selectTemplate){
//             dispatch(getTemplatesWhatsApp(selectTemplate)) 
//           }

//       },[selectTemplateId]
//   )
// //       },[selectTemplateId]
// //   )
const storedDetails=useSelector((store)=>{
  return store.campaignReducer.campaignWhatsappSchedulerData
})
console.log("store details" , storedDetails)
  //sending Data to redux 
  useEffect(
      () => {
       
          let obj = {
            communication : selectCommunication,
            template : selectTemplate,
            startDate :dateData?.fromDate,
            endDate : dateData?.toDate,
            templatesId :selectTemplateId,
             time : time ,
             mindMapLink : minMapImg
        }
        dispatch(storeSedulerSettingDataWhatsApp(obj))
        
          
      },[selectCommunication , selectTemplate , dateData , selectTemplateId, time ,minMapImg,storedDetails]
       )

       useEffect(()=>{
        if(storedDetails){
          
          let dialTimeData=storedDetails.dialTimeData.data
        setSelectTemplateId(prev=>dialTimeData.templates)
         minMapImg=dialTimeData?.mindmap_url?dialTimeData.mindmap_url:""
        }
       },[storedDetails])

const clickToshowMindMap =() => {
   let obj ={"flowName":"Post-Due","subFlow":"DPD 1-7","language":"Hindi"}
     dispatch(getMindMap(obj))
    setMindMap(prev => true)
}
const clickToHideMindMap =() => {
    setMindMap(prev => false)
}
    
 console.log("99" , templateDropdownArray , selectTemplate)
    
  return (
    isShowSummaryPage?
    <WhatsappCampaignSummary hideSummaryScreen={(value)=>{showSummaryPage(value)}}/>:
    <div className='schedulerOmniWrapperModal'>
            <div className='OuterDiv'>
            <div className='ContainDiv'>
                <div className='logoNameDiv'> 
                    <img  src ={campaignTypeicon} width ={"50px"}  alt='img'></img>
                    <h2 className='heading'>Communication</h2>
                </div>
                <div className='dropDownDiv'> 
                <div className={selectCommunication =="One way" ? 'staticDiv' : 'staticDivHuman' } onClick= {() => onChangeCommunication("One way")}>
                         <p> 
                             One way
                         </p>
                     </div>
                     <div className={`${selectCommunication == "Two way" ? 'staticDiv' : 'staticDivHuman'} gapBtn `} onClick= {() => onChangeCommunication("Two way")}>
                         <p> 
                           Two way
                         </p>
                     </div>
                </div>
            </div>
            <div className='ContainDiv'>
                <div className='logoNameDiv'> 
                    <img src={languageIcon} width ={"50px"} alt='img'></img>
                    <h2 className='heading'>Template</h2>
                </div>
                <div className='dropDownDiv'> 
             <MultiSelectDropdown
             options={langOptions}
             toBeFilterData={templateDropdownArray }
             extraSelectedClass="languageDropdown"
             getFilteredData={(value) =>onChangeselectTemplate(value)}
             key="dispositionMultiSelectOne"
            selectedDataOutside={ selectTemplate}
            extraPlaceHolderStyle = "extraPlaceHolderStyle"
            // isHideAllCheckbox= {true}
            filterDataTobeSelected  ={"filterDataTobeSelected"}
            imgList = {optionListIcon}
          />
                 </div>
            </div>
                <div className='ContainDiv'>
                <div className='logoNameDiv'>
                    <img src={dateRangeIcon} width ={"50px"} alt="img"></img>
                    <h2 className='heading'>When to Schedule</h2>
                </div>
                <div  className='dropDownDiv'>
                <div className='midDate'>
                <DateFilter id="dateRangeOne" dateHeader={'show'} 
                //   hideBtnUp= {btnUploadHide}
                  schedulerFilter = {true}
                  disableRangeMin ={true}
                  typeText = "campaign"
                /> 
              </div>
                     <div 
                     className= {'midDate gapBtn' }
                    //  sendTime={(value)=>{setTimeData(value)}}
                     >
                     {/* <TimePicker
                showSecond={false}
                defaultValue={now}
                className="xxx"
                // onChange={onChangeTimeFormatStartTime}
                format={format1}
                // use12Hours
                inputReadOnly
                // disabledHours={disabledEndHours}
                // disabledMinutes={disabledEndMinutes}
               
              /> */}
              <TimePicker
              twentyFourHour={false}
              sendTime={(value)=>{setTimeData(value)}}
               dataOutside ={storedDataScheduler?.time }
              />
                     </div>
                </div>
            </div>
           
             { selectCommunication=="Two way" ?
        <div className='viewMapBtn'>
         <Button
        text="View Mindmap"
        extraClass={
      "viewMindMapOmni"
        }
    onClick={() => {
      clickToshowMindMap()
    }}
       />
             </div> : ""
             }
            </div>
        
   { loadingTemplates?
           <PopUpImg> <LoaderSaarthi/> </PopUpImg> : ""
   }
   {
    showMindMap ?   <PopUpImg><ImgModal crossBtn ={clickToHideMindMap} img ={ minMapImg}/> </PopUpImg>: ""
   }
   <div>
      <div className='borderDBCflow'></div>
     <div className='dbcWpdivfirst'> <span className='headingDispositionBasedFollow'>Disposition Based Nudge</span><span className='headingDispositionBasedFollowPara'>{`( The WhatsApp session time is 24 hrs from last user message. )`}</span>  </div>
    <DCBTableDataWP/>
    {/* <DCBAccordWhatsApp/> */}
  </div> 
        
          { 
            selectCommunication?.length &&  selectTemplate?.length && (time?.hour != "00" && time?.hour !="" )  ?
           
             <div className='buttonSubmit'>
              <Button
                 text="Submit"
                 extraClass={
                   "submitOmni"
                 }
                 onClick={() => {
                   showSummaryPage(true)
                 }}
               />
               </div> : <div className='buttonSubmit2'> </div>
}       
   
        </div>
  )
}

export default SchedulerSettingOmni
