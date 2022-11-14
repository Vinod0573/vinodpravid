import React, { useEffect } from 'react'
import SchedulerSettingOmni from '../../../components/moduleComponents/campaign/omniChannel/SchedulerSettingOmni'
import Preview from '../../../components/moduleComponents/campaign/omniChannel/whatsAppPreview/Preview'
import "./WpSettingPage.css"
import { useSelector, useDispatch } from "react-redux";
import {getTemplatesWhatsApp } from "../../../redux/omniChannel/actions";

function WpSettingPage(props) {

    const dispatch = useDispatch()
    //store 
    const storedSchedulerSettingWp = useSelector(
        store => store?.omniChannelReducer?.storedschedulerSettingwhatsApp
    )

    //calling api for getting templates 
    useEffect(
        () => {
            if(storedSchedulerSettingWp?.templatesId){
                let obj ={
                    "id": storedSchedulerSettingWp?.templatesId
                }
                dispatch(getTemplatesWhatsApp(obj))
            }
        },[storedSchedulerSettingWp?.templatesId]

    )
  return (
    <div className='wpsettingPageWrapper'>
        <div className='schedulerSettingPageWp'>
        <div className='scheduleSettingwp'><SchedulerSettingOmni/></div>
        <div className='previewWp'> 
         {/* <div className='previewNote'>Preview</div> */}
          <Preview/>
        </div>  
        </div>
    </div>
  )
}

export default WpSettingPage