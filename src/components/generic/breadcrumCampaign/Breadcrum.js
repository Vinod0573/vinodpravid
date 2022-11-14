import React from "react";
import nextIcon from "../../../theme/assets/svg/campaign/nextarrow.svg";
import prevIcon from "../../../theme/assets/svg/campaign/prevarrow.svg";
import backIcon from "../../../theme/assets/svg/campaign/backicon.svg";
import "./Breadcrum.css";

function Breadcrum(props) {
  const { arrData,handleClickBackButton,selectedBreadcrum,handleSelectBreadcrum,isCreate } = props;
  const onClickBackButton = () => {
     handleClickBackButton()
  };
  const onClickBreadcrum=(name)=>{
    handleSelectBreadcrum(name)
  }
 
  return (
    <div className="breadcrum-wrapper">
        <div className="breadcrum-data">
      {arrData.map((name, index) => {
       return <div className= {`breadcrum-inner-data ${ (props.edit?.length == 0) && (index > arrData?.indexOf(selectedBreadcrum)) ? "disable"  : ""}`} onClick={()=>{onClickBreadcrum(name)}}>
          <div className={`breadcrum-name  ${selectedBreadcrum==name?"isActive-change":""} ${(index < arrData?.indexOf(selectedBreadcrum)) ? "previousCompleted" : ""} 
          `} 
          >{name}</div>
          {arrData.length > index + 1 && (
             <div className="breadcrum-icon">
              <img src={ (index < arrData?.indexOf(selectedBreadcrum)) ?prevIcon : nextIcon } />
            </div>
          )}
        </div>;
      })}
      </div>
      <div className="breadcrum-backicon" onClick={() => onClickBackButton()}>
        <img src={backIcon} />
      </div>
      &nbsp;
    </div>
  );
}

Breadcrum.propTypes = {};

export default Breadcrum;
