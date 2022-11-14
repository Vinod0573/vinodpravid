import React from "react";
import "./PauseCampaignReason.css";
import popupIcon from "../../../assets/scheduler/popupIcon.svg"
import crossIcon from "../../../assets/scheduler/crossIcon.svg"


function PauseCampaignReason(props) {

    let [value, setValue] = React.useState("");

    function handleSubmisssion(e) {
        e.preventDefault();
         props.submit(value)
    }
    function handleChange(e) {
        setValue(e.target.value);

    }

    function closeContent() {
        props.close(false)
       
    }
    

    return (
        <div className="pause-campaign-reason-wrapper">
            <div className="container">
                <div  className="cross-cont" > <img className="cross"src={crossIcon} alt="x" onClick={closeContent} /></div>
                <img className="warn" src={popupIcon} alt="i" />
                <p className="para1">Do you want to pause the ongoing campaign?</p>
                <p className="para2">Note - This will stop the current ongoing calls.</p>

                <form action="" method="" className="form-main" onSubmit={handleSubmisssion} >

                    <div className="form-inputs-wrapper">
                        <input  className="input1"type="text" placeholder="Please Provide the reason" name="reason" onChange={handleChange} />
                        <button type="submit" className= {`btn ${value?.length ? "" : "disablePointerEventUniversaljp"}`} >Yes</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default PauseCampaignReason;