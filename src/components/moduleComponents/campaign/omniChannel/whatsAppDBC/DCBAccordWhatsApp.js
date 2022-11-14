import React from 'react'
import { useSelector } from 'react-redux'
import Accord from '../../schedulerSections/Accord/Accord'
import DCBTableData from './DCBTableDataWP'

function DCBAccordWhatsApp() {
    const selectedDispositionData=useSelector((store)=>{
        return store?.omniChannelReducer?.selectedDispositionDataWP
    })
    return (
        <Accord 
        title={"Disposition Based Nudge"}
        content={<DCBTableData/>}
        isChecked={Array.isArray(selectedDispositionData) && selectedDispositionData?.length>0?true:false}
        isToggle={false}
        isHideContent={false}
        />
    )
}

export default DCBAccordWhatsApp
