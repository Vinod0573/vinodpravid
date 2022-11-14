import React, { useState, useEffect } from "react";
import "./ASRIssue.css";


import DropdownIcon from "../../../../assets/summarysection/dropdownIcon.svg";



import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as reportIssueAction from "../../../../actions/reportIssueActions";

import MultiselectDropdownSp from "../../../schedulerAllComponent/MultiselectDropdownSp/MultiselectDropdownSp";

const ASRIssue = (props) => {
  const [options , setOptions] = useState(() => {
    return{
      imgSrcRight: DropdownIcon,
      placeHolderText:"ASR",
      imgSrcLeft: "",
    }
  })
  const [isDropdownShow,setIsDropDownShow]=useState(false)

  const [ASRIssuesToBe, setASRIssuesToBe] = useState(['No Transcription','False Interpretation', 'Background Noise', 'Incomplete Sentence','Language Not Recognized','Other']);
  const [ASRIssuesSelected, setASRIssuesSelected] = useState();
  const [fixedData,setFixedData]=useState([])

  useEffect(() => {
    if(!ASRIssuesSelected || ASRIssuesSelected?.length < 1){
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
          imgSrcLeft : ""
        }
      });
    }
  },[ASRIssuesSelected])

  // To get selected value and set to reducer form multiselect
  const getSelectedData = (value) => { 
           if(value?.length <=0 || !value){
            props.setASRIssueData(null);
        }
        else{
          props.setASRIssueData(value);
        }

    if(props.allSelectedReportIssueData){
      let forDeletion = [...ASRIssuesToBe];
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
    setASRIssuesSelected(prev => value);

  };


  // To update value of multiselect checkout form outside
  const updateMultiSelectedData = (value) => {
   // alert("yes");
    setASRIssuesSelected(prev => value);
    //props.setASRIssueFilterData(value);
  }

  useEffect(() => {
    let temp = props.ASRIssueData;
    updateMultiSelectedData(temp);
  },[props.ASRIssueData])



  return (
    <>
      <div className={`ASRIssueWrapper ${props.hideFilterList?.includes('ASRIssue') ?"hidePointerEventUniversaljp":""}`}>
      {ASRIssuesSelected&&ASRIssuesSelected.length>0&&<div className="placeholder-up">ASR</div>}
        <div>
          <MultiselectDropdownSp
            toBeFilterData={ASRIssuesToBe}
            options={options}
            extraSelectedClass="extraReportIssueSelectedClassMS"
            getFilteredData={(value) => getSelectedData(value)}
            key="ASRIssueMultiSelectOne"
            selectedDataOutside={ASRIssuesSelected}
            multiselectWrapperWrapper="extraClassMultiselectWrapperWrapperMS"
            leftImgStyle="extraClassLeftImgStyleMS"
            filterDataTobeSelected="extraReportIssueToBeSelectedMS"
            isDropdownShow={isDropdownShow}
            setIsDropDownShow={setIsDropDownShow}
            // isDisable={props.disableFilterList?.includes('ASRIssue') ? true : false}
            />
        </div>
        <div className="goinbox">
        {
          (ASRIssuesSelected?.length==1)?
          <p className="err"><span className="err-box">{ASRIssuesSelected[0]}</span></p>:
          (ASRIssuesSelected?.length==2)?
          
          <p className="err"><span className="err-box">{ASRIssuesSelected[0]}</span>
          <span  className="err-box">{ASRIssuesSelected[1]}</span></p>
          :(ASRIssuesSelected?.length>2)?
          
          <p className="err">
          <span className="err-box">{ASRIssuesSelected[0]}</span>
          <span  className="err-box">{ASRIssuesSelected[1]}</span>
          
          <span className="err-boxx" onClick={()=>setIsDropDownShow(true)}>{`+${ASRIssuesSelected.length-2}`}</span>
          </p>:
          <>{``}</>
        }
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    ASRIssueData: state.reportIssueReducer.ASRIssueData,
    allSelectedReportIssueData: state.reportIssueReducer.allSelectedReportIssueData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign({}, reportIssueAction), dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ASRIssue);
