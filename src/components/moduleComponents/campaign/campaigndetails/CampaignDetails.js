import React from 'react';

import UploadCampaignDetails from '../uploadcampaigndetails/UploadCampaignDetails';
import "./CampaignDetails.css";
import BackIcon from "../../../../theme/assets/svg/campaign/backicon.svg";



import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as filterAction from "../../../../redux/filter/actions";
import * as campaignAction from "../../../../redux/campaign/actions";
import * as loginAction from "../../../../redux/onboarding/login/actions";





const CampaignDetails = (props) => {

    // const getSaarthiheaderlist = (list) => {
    //     props.saarthiHeaderList("SAARTHI_HEADER", list);
    // }
const moveToPrevious = () =>{
    props.toBack();
}



    return(
        <>
        <div className='CampaignDetailsWrapper'>
        <div onClick={() => { moveToPrevious() }} style={{width:"40%",display:"flex"}}>
                    <img className='back-img-jp' src={BackIcon} alt="back img"/>
        </div>

        <UploadCampaignDetails/>
        </div>
        </>
    )
}


const mapStateToProps = (state, ownProps) => {
    return {
      campaignEditUpdateType: state.campaignReducer?.campaignEditUpdateType,
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
      Object.assign({}, filterAction, campaignAction, loginAction),
      dispatch
    );
  };
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(CampaignDetails);
//export default CampaignDetails;