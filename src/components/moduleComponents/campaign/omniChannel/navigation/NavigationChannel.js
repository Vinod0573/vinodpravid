import React, { useEffect, useState } from 'react'
import "./NavigationChannel.css"

function NavigationChannel(props) {
   const[selectedNav  , setSelectedNav] = useState(props.NavArray?.length ? props.NavArray[0] : null)

    let arr = props?.NavArray
    useEffect(
         () => {
            if(selectedNav){
                props.selectedNavoutside(selectedNav)
            }
         },[selectedNav]
    )
    useEffect(
        () => {
            if(props.selectouside?.length){
            setSelectedNav(prev => props.selectouside )
            }
        },[props.selectouside?.length]
    )

  return (
    <div className='navigationChannelWrapper'>
        <div className='navOuter'>
        { arr && arr?.map(e => 
     <div className={`${selectedNav == e  ? "highlightNav" : "navName"}`} 
       onClick ={() => setSelectedNav(e) }
     >
          {e}
     </div>
        )
        }
        </div>
    </div>
  )
}

export default NavigationChannel