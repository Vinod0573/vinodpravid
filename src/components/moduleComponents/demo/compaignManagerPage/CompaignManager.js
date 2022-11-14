import React, { useEffect, useState } from 'react'
import ExecuteCall from '../../demo/executeCallModal/ExecuteCall'
// import History from '../HistoryPage/History'
import './CompaignManager.css'
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
// import * as dashboardAction from "../../../actions/dashboardActions";
import backIcon from "../../../../theme/assets/svg/demo/backIcon.svg"
import ProgressBar from '../../../generic/progressBar/ProgressBar';
import ToggleSwitch from "../../../generic/toggleSwitch/ToggleSwitch";
import ExecuteAgentCall from '../../demo/executeAgentCall/ExecuteAgentCall'

function CompaignManager(props) {
  const [navSelect, setNavSelect] = useState('Exec')
  const [lang, setLang] = useState('')
  const [emi, setEmi] = useState('')
  const [showProgresBar, setShowProgresBar] = useState(false)
  const [showPlast, setShowPlast] = useState(false)
  const [optionLabels, setOptionLabels] = useState(["Bot", "Agent"]);
  const [isToggleActive, setIsToggleActive] = useState(true);
  const onClickNav = (str) => {
    setNavSelect(prev => str)
  }
  useEffect(
    () => {
      setLang(prev => props.language)
      setEmi(prev => props.postEmi)

    }, [props.language, props.postEmi]
  )

  const showProgressBar = (data) => {
    setShowProgresBar(data)
  }
  const lastStep = (data) => {
    setShowPlast(data)
  }

  const handleDisableToggleSwitch = (checked) => {
    setIsToggleActive((prev) => checked);
  };



  let arr = ["Onboarding", "Agent Configuration", "Integration", "Campaign Manager", "Campaign Execution"]
  return (
    <div className='compaignManagerWrapper'>
      <div className='backArrow'>
        <div className='iconBack'>

        </div>
        <div className='iconBack'
          onClick={() => props.next(false)}
        >
          <img src={backIcon}
          ></img>
        </div></div>
      <div className='headingDiv'>
        <p>Campaign Manager</p>
      </div>
      {process.env.REACT_APP_CONNECTOR === "staging-connectors.saarthi.ai" ?
        <div className='demoToggleSwitch'>
          <ToggleSwitch
            id="botAndAgent"
            checked={isToggleActive}
            optionLabels={optionLabels}
            onChange={(checked) => handleDisableToggleSwitch(checked)}
            toggleSwitchExtraClass="demoToggleSwitchExtraClass"
            toggleTextExtraClass="demoToggleText"
          />
        </div>
        : ""}
      <div className='navigation'>
        <div className={`navTitle ${navSelect === "Exec" ? "navHighlight" : "navBlur"}`}
          onClick={() => setNavSelect("Exec")}
        > Execution</div>
        <div className={`navTitle ${navSelect === "Sche" ? "navHighlight" : "navBlur"}`}
          onClick={() => setNavSelect("Sche")}> Schedule</div>
        <div
          className={`navTitle ${navSelect === "Hist" ? "navHighlight" : "navBlur"}`}
          onClick={() => setNavSelect("Hist")}> History</div>
      </div>
      <div className='demoCallDiv'>

        {navSelect === "Exec" ?
          isToggleActive === true ?
            <ExecuteCall
              language={lang}
              emi={emi}
              toShow={(data) => showProgressBar(data)}
              tolast={(data) => setShowPlast(data)}
            />
            :
            <ExecuteAgentCall
              language={lang}
              emi={emi}
              toShow={(data) => showProgressBar(data)}
              tolast={(data) => setShowPlast(data)} />
          :
          navSelect === "Hist" ? "" :
            <ExecuteCall
              language={lang}
              emi={emi}
              toShow={(data) => showProgressBar(data)}
              tolast={(data) => setShowPlast(data)}
            />}

      </div>
      <div className='progressBarDiv'>
        {showProgresBar ? (showPlast ?
          <ProgressBar
            arr={arr}
            currentStep={5} />
          : <ProgressBar
            arr={arr}
            currentStep={4} />) :
          <ProgressBar
            arr={arr}
            currentStep={3} />
        }
      </div>
    </div>
  )
}
const mapStateToProps = (state, ownProps) => {
  return {
    language: state.demoReducer.demoAgentConfigurationData.demoLanguage,
    postEmi: state.demoReducer.demoAgentConfigurationData.preEmiData

  };
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    Object.assign({}),
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(CompaignManager);