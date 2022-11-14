import React from 'react'
import { useSelector } from 'react-redux'
import Accord from './Accord/Accord'
import DCBTableData from './DCBTableData'

function DCBAccord() {
    const selectedDispositionData=useSelector((store)=>{
        return store.breadcrumReducer?.selectedDispositionData
    })
    return (
        <Accord 
        title={"Disposition Based Calling"}
        content={<DCBTableData 
        selectedCallingData={selectedDispositionData?.length>0 ?[...selectedDispositionData]:[]}
        />}
        isChecked={Array.isArray(selectedDispositionData) && selectedDispositionData?.length>0?true:false}
        isToggle={false}
        isHideContent={false}
        />
    )
}

export default DCBAccord
