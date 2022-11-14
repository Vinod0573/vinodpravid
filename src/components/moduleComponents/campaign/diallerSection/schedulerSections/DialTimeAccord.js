import React from "react";
import { useSelector } from "react-redux";
import DialTimeModal from "../../../../../../../../newChatHistory/Chat-History-Dashboard/src/components/schedulerAllComponent/dialTimeModal/DialTimeModal";
import Accord from "./Accord/Accord";
import "./DialTimeAccord.css"

function DialTimeAccord() {

    const checkBoxChecked=(data)=>{
        console.log(data)
    }  
    
    const schedulerData=useSelector((store)=>{
        return store.schedulerReducer
    })
  return (
        <Accord
          title={"Dial Time"}
          content={<DialTimeModal setCheckBox={checkBoxChecked} />}
          isChecked={schedulerData?.dialtimeData?.dialTimeData &&
            schedulerData?.dialtimeData?.dialTimeData?.s_time &&
            schedulerData?.dialtimeData?.dialTimeData?.e_time
            ?true:false}
          isToggle={false}
          isHideContent={false}
        />
  );
}

export default DialTimeAccord;
