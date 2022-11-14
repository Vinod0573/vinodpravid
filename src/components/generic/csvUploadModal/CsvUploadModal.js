import React from "react";
import "./CsvUploadModal.css";
import activeCSV from "../../../theme/assets/svg/campaign/selectedCsv.svg";
import inActiveCSV from "../../../theme/assets/svg/campaign/inactiveCsv.svg"

function CsvUploadModal(props) {
  return (
    <div className="CsvUploadModal-wrapper">
      <div style={{display:"flex",justifyContent:"center",alignItems:"center",width:"100%",height:"100%",flexDirection:"column"}}>
      <div className="upload-section">
        <div className="csv-uploaded-section">
          <div className="csv-uploaded-img">
            <img 
            src={
              props.percentage==100?activeCSV:inActiveCSV
            } />
          </div>
          <div className="csv-uploaded-label">{props.fileName}</div>
          <div className="isuploaded">
          <progress value={props.percentage} max="100" />{props.percentage}%
          </div>
          {/* <div className="csv-upload-status-img">
            <img src={close} />
          </div> */}
        </div>
      </div>
      <div className="blank-div">

      </div>
      </div>
    </div>
  );
}

export default CsvUploadModal;
