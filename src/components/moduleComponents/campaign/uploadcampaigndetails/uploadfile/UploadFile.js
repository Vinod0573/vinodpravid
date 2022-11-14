import React from "react";

import "./UploadFile.css";

import { connect, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import * as campaignAction from "../../../../../redux/campaign/actions";
import uploadIcon from "../../../../../theme/assets/svg/campaign/uploadIcon.svg";

const UploadFile = (props) => {
  const { imgLeft, title, imgRight, uploadId } = props.label;

  const saveTypeOfUploadClick = () => {
    props.uploadClick();
    if (uploadId === "uploadOne") {
      props.setUploadType("uploadOne");
    } else if (uploadId === "uploadTwo") {
      props.setUploadType("uploadTwo");
    } else {
      props.setUploadType("uploadThree");
    }
  };

  const selectedTab = useSelector((store) => {
    return store.breadcrumReducer.tabName;
  });

  console.log(props.uploadedcamapignFile, "dev");
  return (
    <>
      <div className="uploadFileWrapper">
        <div className="uploadFileTop">
          <div
            className="uploadFile clickAbleCursorPointerU"
            onClick={() => saveTypeOfUploadClick()}
          >
            {imgLeft && <img src={imgLeft} alt="Upload Icon" />}
            <p>{title}</p>
            {selectedTab == "API" ? (
              <img
                style={{ width: "50px", visibility: "hidden" }}
                src={uploadIcon}
                alt="Upload Icon"
              />
            ) : uploadId == "uploadOne" ? (
              props.uploadedcamapignFile &&
              props.uploadedcamapignFile[1].details.length == 0 ? (
                imgRight && (
                  <img
                    style={{ width: "50px" }}
                    src={uploadIcon}
                    alt="Upload Icon"
                  />
                )
              ) : (
                <img
                  style={{ width: "50px", visibility: "hidden" }}
                  src={uploadIcon}
                  alt="Upload Icon"
                />
              )
            ) : (
              imgRight && (
                <img
                  style={{ width: "50px" }}
                  src={uploadIcon}
                  alt="Upload Icon"
                />
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    typeUploadClick: state.campaignReducer.typeUploadClick,
    uploadedcamapignFile: state.campaignReducer.uploadedCamapignFile,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign({}, campaignAction), dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(UploadFile);
//export default UploadFile;
