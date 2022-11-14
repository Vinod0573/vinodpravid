import React, { useState } from "react";
import "./FileMappinng.css";
import closeTag from "../../../assets/crossIcon.svg";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as dashboardAction from "../../../actions/dashboardActions";
import * as campaignAction from "../../../actions/campaignActions";
import * as loginAction from "../../../actions/campaignActions";
import MenuItems from "../reactMultiSelectDropdown/MenuItems";
import { menuItemData } from "../reactMultiSelectDropdown/MenuData";

function MappingPart(props) {
  const [childTitle, setChildTitle] = useState("");
  const [parentTitle, setParentTitle] = useState("");
  const getChangedDetails = (data) => {
    let Fldata = data.map((each) => {
      return {
        title: Object.keys(each)[0],
        submenu: Object.values(each)[0].map((er) => {
          if(typeof er === 'object'){
            return {
              title: Object.keys(er)[0],
              submenu: Object.values(er)[0].map((ev)=>{
                return {title: ev}
              })
            }
          }else{
            return { title: er };
          }
          console.log(typeof(er),"errr")
          
        }),
      };
    });
    return Fldata;
  };

  let formattedData = getChangedDetails(menuItemData);
  console.log(parentTitle, childTitle,formattedData, "klkk");
  return (
    <div className="admin-modal-wrapper">
      <div className="admin-inner-div">
        <div className="admin-div1">
          <div className="initial-div" style={{ marginLeft: "20px" }}>
            .csv Header
          </div>
          <div className="initial-div" style={{ marginRight: "20px" }}>
            Saarthi Header
          </div>
          <div>
            <img src={closeTag} className="cursorPointerBtn" />
          </div>
        </div>
        <div className="header-list">
          {/* {props.typeUploadClick == "UploadOne"
            ? formattedData.map((menu, index) => {
                const depthLevel = 0;
                return (
                  <MenuItems
                    items={menu}
                    key={index}
                    depthLevel={depthLevel}
                    isSubMenu={false}
                  />
                );
              })
            : ""} */}

          <input />
         
          {formattedData.map((menu, index) => {
            const depthLevel = 0;
            return (
              <MenuItems
                items={menu}
                key={index}
                depthLevel={depthLevel}
                isSubMenu={false}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state, ownProps) => {
  return {
    customerDataType: state.campaignReducer?.customerDataType,
    typeUploadClick: state.campaignReducer.typeUploadClick,
    userLoginInfo: state.loginReducer.userLoginInfo,
    campaignIdName: state.campaignReducer?.campaignIdName,
    campaignDetails: state.campaignReducer.campaignCredentials,
    mappedCredentials: state.campaignReducer.mappedCredentials,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    Object.assign({}, dashboardAction, campaignAction, loginAction),
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(MappingPart);
