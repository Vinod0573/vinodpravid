import React, { useEffect, useState } from "react";
import progressShoutOutIcon from "../../../assets/scheduler/progressShoutOutIcon.svg";
import crossIcon from "../../../assets/scheduler/crossIcon.svg"
import "./InProgressPopup.css"
import ProgressBarComponent from "../../ResponseRate/ProgressBarComponent/ProgressBarComponent";
import { SERVER_URL_CONNECTOR, SCHEDULER_URL} from "../../../Utilities/ApiRoutes";
import axios from "axios";


function InProgressPopup(props) {
    const[responceData , setResponceData] = useState()

    const cancelPopUp =() =>{
        props.hide(false)
    }
    console.log(props.id)

    useEffect(
        () => {
            let url = `${SERVER_URL_CONNECTOR}${SCHEDULER_URL.CALLING_INFO}`
           let obj = {
                "campaignId": props.id
            }
            axios.post(url ,obj).then(
                res => {
                    setResponceData(res?.data?.data)
                      }
            ).catch(
                err => console.log(err)
            )
        },[props.id]
    )

    return (<div className="in-progress-popup-wrapper">
        <div className="in-progress-popup-container">

            <div className="head-container" >
                <p className="heading-popup">In Progress</p>
                <img className="cross-pos" onClick={() => cancelPopUp()} src={crossIcon} alt="cut" />
            </div>

            <div>
                <img className="shout-icon" src={progressShoutOutIcon} alt="details" />
            </div>
            <div className="progress-area">
                <div className="progress-text">
                    <p className="c-text">Connection Rate</p>
                    <p className="c-text">{responceData?.connectionRate}%</p>
                </div>
                <ProgressBarComponent isLoading={false}
                    percent={responceData?.connectionRate}
                    size={"large"}
                    showInfo={false}
                    extraClass="green-bar"
                />

            </div>
            <div className="details">
                <p className="para">Total call:<span className="span1">{responceData?.totalCalls}</span></p>
                <p className="para">Total call initiated:<span className="span2">{responceData?.totalCallsInitiated}</span></p>
                <p className="para">Total call connected:<span className="span3">{responceData?.totalCallsConnected}</span></p>
                <p className="para">Total call not connected:<span className="span4">{responceData?.totalCallsNotConnected}</span></p>
                <p className="para">Total no. of payment done:<span className="span5">{responceData?.totalPaid}</span></p>
            </div>



        </div>


    </div>)
}

export default InProgressPopup;