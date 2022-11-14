import React from 'react'
import { useSelector } from 'react-redux'
import Accord from './Accord/Accord'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as breadcrumActions from "../../../../redux/breadcrum/actions";
import * as schedulerActions from "../../../../redux/campaign/scheduler/actions";

function PreferredTimeAccord(props) {
    const checkBoxChecked=(data)=>{
        console.log(data)
    }   
    const schedulerData=useSelector((store)=>{
      return store.schedulerReducer
    })

    const getPreferredTime=(checked)=>{
      let data={...schedulerData.dialtimeData}
      data.preferedTime=checked
      props.storeSelectedDialTime(data)
    }
    return (
          <Accord
            title={"Preferred Time"}
            content={""}
            isChecked={false}
            isToggle={true}
            isTogglChecked={(checked)=>{getPreferredTime(checked)}}
            isHideContent={true}
          />
    )
}

const mapStateToProps = (state, ownProps) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign({}, breadcrumActions,schedulerActions), dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PreferredTimeAccord);
