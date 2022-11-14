import React from 'react'
import LoaderSaarthi from '../../../../generic/loader/Loader'
import "./ImgModal.css"

function ImgModal(props) {
  return (
    <div className='imgModalWrapper'>
          {
                props.img?.length ? 
              
        <div className='outerDivModal'>
            <div className='crossBtn'
              onClick={() => props.crossBtn()}
            >
                X
            </div>
            <div className='Container'>
            <img className='imgMindMap' 
              
              src={props.img}>
              </img>
             
            </div>
        </div>
        : <LoaderSaarthi/>
}
    </div>
  )
}

export default ImgModal