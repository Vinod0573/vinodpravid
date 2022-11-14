import React, { useState, useEffect } from "react";
import "./NLUIssue.css";


import DropdownIcon from "../../../../assets/summarysection/dropdownIcon.svg";



import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as reportIssueAction from "../../../../actions/reportIssueActions";
import MultiselectDropdownSp from "../../../schedulerAllComponent/MultiselectDropdownSp/MultiselectDropdownSp";


const NLUIssue = (props) => {
  const [options , setOptions] = useState(() => {
    return{
      imgSrcRight: DropdownIcon,
      placeHolderText:"NLU",
      imgSrcLeft: ""
    }
  })
  const [isDropdownShow,setIsDropDownShow]=useState(false)


  const [NLUIssuesToBe, setNLUIssuesToBe] = useState(['Missed Entity','Wrong Entity','No Response','Wrong Intent (Low Confidence)','Wrong Intent (High Confidence)', 'Correct Intent (Low Confidence)','Other']);
  const [NLUIssuesSelected, setNLUIssuesSelected] = useState();
  const [fixedData,setFixedData]=useState([])

  useEffect(() => {
    if(!NLUIssuesSelected || NLUIssuesSelected?.length < 1){
      // alert('jai');
      setOptions(prev => {
        return{
          ...prev,
          imgSrcLeft : ""
        }
      });
    }
    else{
     // alert('jai');
      setOptions(prev => {
        return{
          ...prev,
          imgSrcLeft :""
        }
      });
    }
  },[NLUIssuesSelected])

  // To get selected value and set to reducer form multiselect
  const getSelectedData = (value) => { 
           if(value?.length <=0 || !value){
            props.setNLUIssueData(null);
        }
        else{
          props.setNLUIssueData(value);
        }

    if(props.allSelectedReportIssueData){
      let forDeletion = [...NLUIssuesToBe];
      let tempAllFiltered = props.allSelectedReportIssueData;
      tempAllFiltered = tempAllFiltered.filter(item => !forDeletion.includes(item))
      let temp = [...tempAllFiltered,...value];
      if(temp?.length > 0){
        props.setAllSelectedReportIssueData(temp);
      }
      else{
        props.setAllSelectedReportIssueData(null);
      }
  }else{
    if(value?.length <=0 || !value){
      props.setAllSelectedReportIssueData(null);
    }
    else{
      props.setAllSelectedReportIssueData(value);

    }
  } 
    //console.log(value);
    setNLUIssuesSelected(prev => value);

  };


  // To update value of multiselect checkout form outside
  const updateMultiSelectedData = (value) => {
   // alert("yes");
    setNLUIssuesSelected(prev => value);
    //props.setNLUIssueFilterData(value);
  }

  useEffect(() => {
    let temp = props.NLUIssueData;
    updateMultiSelectedData(temp);
  },[props.NLUIssueData])




  return (
    <>
      <div className={`NLUIssueWrapper ${props.hideFilterList?.includes('NLUIssue') ?"hidePointerEventUniversaljp":""}`}>
      {NLUIssuesSelected&&NLUIssuesSelected.length>0&&<div className="placeholder-up">NLU</div>}
        <div>
          <MultiselectDropdownSp
            toBeFilterData={NLUIssuesToBe}
            options={options}
            extraSelectedClass="extraReportIssueSelectedClassMS"
            getFilteredData={(value) => getSelectedData(value)}
            key="NLUIssueMultiSelectOne"
            selectedDataOutside={NLUIssuesSelected}
            multiselectWrapperWrapper="extraClassMultiselectWrapperWrapperMS"
            leftImgStyle="extraClassLeftImgStyleMS"
            filterDataTobeSelected="extraReportIssueToBeSelectedMS"
            isDropdownShow={isDropdownShow}
            setIsDropDownShow={setIsDropDownShow}
            // isDisable={props.disableFilterList?.includes('NLUIssue') ? true : false}
            />
        </div>
        <div className="goinbox">{
          (NLUIssuesSelected?.length==1)?
          <p className="err"><span className="err-box">{NLUIssuesSelected[0]}</span></p>:
          (NLUIssuesSelected?.length==2)?
          
          <p className="err"><span className="err-box">{NLUIssuesSelected[0]}</span>
          <span  className="err-box">{NLUIssuesSelected[1]}</span></p>
          :(NLUIssuesSelected?.length>2)?
          
          <p className="err">
          <span className="err-box">{NLUIssuesSelected[0]}</span>
          <span  className="err-box">{NLUIssuesSelected[1]}</span>
          
          <span className="err-boxx" onClick={()=>setIsDropDownShow(true)}>{`+${NLUIssuesSelected.length-2}`}</span>
          </p>:
          <>{``}</>
        }</div>
      </div>
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    NLUIssueData: state.reportIssueReducer.NLUIssueData,
    allSelectedReportIssueData: state.reportIssueReducer.allSelectedReportIssueData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign({}, reportIssueAction), dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(NLUIssue);
