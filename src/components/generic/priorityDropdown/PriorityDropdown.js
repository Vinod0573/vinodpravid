import React, { useState, useEffect, useRef } from "react";

import "./PriorityDropdown.css";

import MultiSelect from "../dropdownsaarthi2/multiSelect/MultiSelect";
import InputBox from "../../generic/inputBox/InputBox";
import SearchIcon from "../../../theme/assets/svg/generic/searchIcon.svg";
import DndComponent from "../dndcomponent/DndComponent";
import { useSelector } from "react-redux";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as breadcrumActions from "../../../redux/breadcrum/actions";


const PriorityDropdown = (props) => {
  const { optionList, imgSrcLeft, imgSrcRight, placeHolderText } = props.droplist;
  const [isDropdownShow, setIsDropdownShow] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [sortedOrder,setSortedOrder] = useState([])
  const ref = useRef();

  //To close dropdown on click anywhere
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (isDropdownShow && ref.current && !ref.current.contains(e.target)) {
        setIsDropdownShow(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isDropdownShow]);

  // function for hide and show dropdowm
  const hideAndShowDropdown = () => {
    let temp = isDropdownShow;
    temp = !temp;
    setIsDropdownShow(temp);
  };

  const handleClickSelecteItem = (item) => {
    let temp = item;
    setSelectedItem(temp);
    setIsDropdownShow(false);
  };

  const closeDropdown = () => {
    setIsDropdownShow(false);
  };

  useEffect(() => {
    props.selectedItem(selectedItem);
  }, [selectedItem]);

  useEffect(() => {
    if (props.editedItem && props.editedItem.length > 0) {
      setSelectedItem(props.editedItem);
    }
  }, [props.editedItem]);
  useEffect(() => {
    if (props.showInitialList) {
      setIsDropdownShow((prev) => true);
    }
  }, [props.showInitialList]);

  const breadCrumData=useSelector((store)=>{
   return store.breadcrumReducer
  })
  useEffect(()=>{
   
    if(sortedOrder?.length>0){
      let fdata=breadCrumData?.callingCondition.condition.map((each)=>{
        let tempVal=sortedOrder.map((ee)=>{
          return ee.data.text
        })
        let indexR=tempVal.indexOf(each?.text)
        if(each?.text==sortedOrder[indexR]?.data?.text){
          each.value=sortedOrder.map((er)=>{
           return er.condition
          })
        }
      })
      props.setCallingCondition(breadCrumData?.callingCondition)
      console.log(fdata,breadCrumData?.callingCondition.condition,sortedOrder)
    }
   
    // getCallingCondition()
  },[sortedOrder])

const list =props.droplist?.optionList.map((each) => {
        return {condition: each,
        data:props.droplist.parentData};
      });

     

  return (
    <div  className="priority-wrapper">
      <div
        className="dropdownTopDiv  dropdownJpWrapper"
        ref={ref}
      >
        <div
          className={`selecteditem 
           ${props.isFilter ? "filter-section-drop" : ""}
            
            ${props.extraClassSelectedArea ? props.extraClassSelectedArea : ""}
            `}
          onClick={() => hideAndShowDropdown()}
          // style={props.isCallDuration?{width:"220px"}:{width:"170px"}}
        >
          {imgSrcLeft ? (
            <img
              className={`${
                props.extraStyleLeftImg
                  ? props.extraStyleLeftImg
                  : "styleLeftImg"
              }`}
              src={imgSrcLeft}
              alt="Dropdown left icon"
            />
          ) : (
            <p></p>
          )}
          <p className={` ddSelectedItemPara`}>
            {" "}
            {selectedItem ? selectedItem : placeHolderText}{" "}
          </p>
          {imgSrcRight ? (
            <img className="" src={imgSrcRight} alt="Dropdown left icon" />
          ) : (
            <p></p>
          )}
        </div>
        {isDropdownShow && (
          <div
            className={`dropdownToBeSelected  ${
              props.extraClassToBeSelectedArea
                ? props.extraClassToBeSelectedArea
                : ""
            }`}
          >
            {props.searchUi && (
              <div
                className={`dropdownSearchWrapper
              ${
                props.extraClassDropdownSearchWrapper
                  ? props.extraClassDropdownSearchWrapper
                  : ""
              }
              `}
              >
                <InputBox
                  className={`dropDownSearchInput 
                  ${
                    props.extraClassDropdownSearchArea
                      ? props.extraClassDropdownSearchArea
                      : ""
                  }`}
                  type="text"
                  imgSrc={SearchIcon}
                  value={props.searchVal}
                  onChangeValue={(e) => props.handleSearchItem(e)}
                  imageClick={() => {true}}
                />
              </div>
            )}
            <ul className={`dropdownUl  ${props.isFilter ? "filter-ul" : ""}`}>
              {optionList == "filterData" ? (
                <MultiSelect
                  onCancel={closeDropdown}
                  selectedItems={props.selectedItems ? props.selectedItems : ""}
                  idData={props.idData ? props.idData : 0}
                />
              ) : optionList.length > 0 ? (
                  <DndComponent 
                  isDisable={false}
                  startingList={sortedOrder?.length>0?sortedOrder:list} 
                  sendOrder={(items)=>{
                    console.log(items)
                    props.fData(items)
                    if(items[0].data.text=="EMI Value"){
                      props.setEmiValue(items[0].condition)
                    }
                    setSortedOrder(prev=> items)}}
                  />
              ) : (
                // optionList.map((item, indx) => {
                //   return (
                //     <>
                //       <li
                //         className= { `dropdownLi ${props.img ? "imgSpace": null}`}
                //         key={item}
                //         onClick={() => handleClickSelecteItem(item)}
                //       >
                //         <span>{props.img ?<img src={props.img} alt ="img"></img> : "" }</span>
                //         <span className=""> {item} </span>
                //       </li>
                //     </>
                //   );
                // })
                ""
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign({}, breadcrumActions), dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(PriorityDropdown);
