import React, { useEffect, useState } from "react";
import "./DataUpload.css";
import salesforce from "../../../assets/dialler/salesforce.svg";
import manual from "../../../assets/dialler/manual.svg";
import API from "../../../assets/dialler/API.svg";
import Salesforce from "./salesforce/Salesforce";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as breadcrumActions from "../../../../../../../../newChatHistory/Chat-History-Dashboard/src/actions/breadcrumActions";
import * as campaignAction from "../../../../../../../../newChatHistory/Chat-History-Dashboard/src/actions/campaignActions";
import { useSelector } from "react-redux";
import UploadCampaignDetails from "../../../../../../../../newChatHistory/Chat-History-Dashboard/src/components/campaign/uploadcampaigndetails/UploadCampaignDetails";
import axios from "axios";
import * as loginAction from "../../../../../../../../newChatHistory/Chat-History-Dashboard/src/actions/loginActions";
import { SERVER_URL } from "../../../../../../../../newChatHistory/Chat-History-Dashboard/src/Utilities/ApiRoutes";
import CampaignTestingInfo from "../../campaignTesting/CampaignTesting";

function DataUpload(props) {
  const [listData, setListData] = useState([]);
  const [selectedTab, setSelectedTab] = useState("");
  const [saleforceEnable, setSaleforceEnable] = useState();
  const tabSelected = useSelector((store) => {
    return store.breadcrumReducer.tabName;
  });
  let mainClientName = props.userLoginInfo?.userDetail?.accountDetails[0]?.name;
  // ( props.clientNameRedux && props.clientNameRedux !== "Select All")
  let account =
    props.clientNameRedux && props.clientNameRedux !== "Select All"
      ? props.clientNameRedux
      : mainClientName;
  const moduleDetails = useSelector((store) => {
    const mdetaile = store.loginReducer.userLoginInfo?.moduleDetails?.map(
      (mDetails, i) => {
        return mDetails.moduleId;
      }
    );
    return mdetaile;
  });
  useEffect(() => {
    axios
      .get(`${SERVER_URL}/api/accounts/account/v1/getSaleforceStatus`, {
        params: { accountName: account },
      })
      .then((res) => {
        setSaleforceEnable((prev) => res?.data?.data?.isSalesforce);
      });
  }, [account]);

  useEffect(() => {
    props.updateData("Data Upload");
  }, []);

  useEffect(() => {
    let obj = [
      { icon: manual, name: "Manual" },
      { icon: API, name: "API" },
    ];
    if (saleforceEnable) {
      let obj1 = { icon: salesforce, name: "Salesforce" };
      obj.push(obj1);
      setListData((prev) => obj);
    } else {
      setListData((prev) => obj);
    }
  }, [saleforceEnable]);

  return (
    <div className="data-upload">
      <div className="div-component">
        {!tabSelected || tabSelected?.length == 0 ? (
          listData?.map((item) => {
            return (
              <div
                className="child-div"
                onClick={() => {
                  setSelectedTab(item.name);
                  props.tabSelected(item.name);
                }}
              >
                <div>
                  <img src={item.icon} />
                </div>
                <div>{item.name}</div>
              </div>
            );
          })
        ) : selectedTab == "Salesforce" ? (
          <div className="tab-section">
            <Salesforce />
          </div>
        ) : selectedTab == "Manual" ? (
          moduleDetails?.includes("M12") ? (
            <CampaignTestingInfo sidebarView={"sidebarView"} />
          ) : (
            <div className="tab-section">
              <UploadCampaignDetails />
            </div>
          )
        ) : (
          <div className="tab-section">
            <UploadCampaignDetails />
          </div>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    userLoginInfo: state.loginReducer.userLoginInfo,
    clientNameRedux: state.campaignReducer?.campaignClientName,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    Object.assign({}, breadcrumActions, loginAction, campaignAction),
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(DataUpload);
