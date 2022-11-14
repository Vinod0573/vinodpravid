import React from 'react'
import "./DeleteModal.css";
import closeIcon from "../../../theme/assets/genericSvg/crossIcon.svg";

function DeleteModal({elementId,deleteData,closeDeleteModal}) {
    return (
        <div className='delete-modal-wrapper'>
              <div className='delete-inner-div'>
                  <div className="delete-header-div">
                    <img src={closeIcon}  className = "cross-btn" onClick={()=>{closeDeleteModal()}}/>
                  </div>
                  <div >
                  Are you sure you want to delete {elementId}?
                  </div>
                  <div>
                      <button className='delete-footer-btn success' onClick={()=>{deleteData(true)}}>Yes</button>
                      <button className='delete-footer-btn' onClick={()=>{deleteData(false)}}>No</button>
                  </div>
                <div className='msgDiv'>
                    <p>Please Note: Campaign with mapped data cannot be deleted.</p>
                </div>
              </div>
        </div>
    )
}

export default DeleteModal
