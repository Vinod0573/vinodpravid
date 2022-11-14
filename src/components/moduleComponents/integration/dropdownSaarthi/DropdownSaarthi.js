import React, { useState, useEffect, useRef } from "react";

import "./DropdownSaarthi.css";

import DropdownIcon  from "../../../../theme/assets/svg/integration/dropdownIcon.svg"
import RoleIcon from "../../../../theme/assets/svg/integration/roleIcon.svg";
import MultiSelect from "../../../generic/dropdownsaarthi2/multiSelect/MultiSelect";
import Axios from "axios";

import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
// import * as dashboardAction from "../../../actions/dashboardActions";
import { array } from "prop-types";
import SearchIcon from "../../../../theme/assets/svg/onboarding/searchIcon.svg";
import InputBox from "../../../generic/inputBox/InputBox";
import activeArrow from "../../../../theme/assets/svg/integration/activesidearrow.svg";

const DropdownSaarthi = (props) => {
  const { optionList, imgSrcLeft, imgSrcRight } = props.droplist;
  const [isDropdownShow, setIsDropdownShow] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const ref = useRef();
  const [showArrow,setShowArrow]=useState(false)
  const [hoverItem,setHoverItem]=useState("")
  const [addClassOnhover,setAddClassHover]=useState(false)

  // To close dropdown on click anywhere
  window.onclick = function (e) {
    if (!props.isFilter) {
      let targetDomObject = e.target || e.srcElement;

      if (
        targetDomObject &&
        targetDomObject.classList &&
        targetDomObject.classList.contains("exceptClick")
      ) {
        true
      } else {
        setIsDropdownShow((previousState) => false);
      }
    }
  };

  // function for hide and show dropdowm
  const hideAndShowDropdown = () => {
    let temp = isDropdownShow;
    temp = !temp;
    setIsDropdownShow(temp);
  };

  const handleClickSelecteItem = (item) => {
    if(props.showChildDropdown){
      setIsDropdownShow(true);
    }else{
      let temp = item;
      setSelectedItem(temp);
      if(item.length>0){
        props.selectedItem(item);
      }

      setIsDropdownShow(false);
    }

  };

const handleSelectedChildItem=(item)=>{
    props.hideAndShowDropdown()
    props.handleSelectedChildItem(item)
    setIsDropdownShow(false);
}

  const closeDropdown = () => {
    setIsDropdownShow(false);
  };


  const dataToTags = (tags) => {
    // console.log(tags)
    // let tempData=selectedTags
    // if(tempData.includes(tags)){
    //     const indexr = tempData.indexOf(tags);
    //     if (indexr > -1) {
    //         tempData.splice(indexr, 1);
    //     }
    //     setSelectedTags(prevState => {
    //         return [...tempData]
    //     })

    // }else{
    //     setSelectedTags(prevState => {
    //         return [...prevState, tags]

    //     })

    // }
    let tempArr = selectedTags;
    tempArr.push(tags);
    setSelectedTags(tempArr);
  };
  const getResponse = (response) => {
    props.sendResponse(response);
  };

  useEffect(() => {
    props.selectedItem(selectedItem);
  }, [selectedItem]);

  // useEffect(async () => { }, [props.fromDate, props.toDate]);

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

  useEffect(() => {
    if (props.editedItem && props.editedItem?.length > 0) {
      if (typeof props.editedItem === 'string') {
        setSelectedItem(props.editedItem);
      } else {
        setSelectedItem(props.editedItem.join(','));
      }
    }
  }, [props.editedItem]);
  const mouseOver=()=>{
    return false
  }

  useEffect(()=>{
    if(props.isOpen){
      props.isOpen(isDropdownShow)
    }
  },[isDropdownShow])

  return (
    <>
      <div className="dropdownTopDiv exceptClick select-data" ref={ref}>
        <div
          className={`selecteditem exceptClick select-data ${props.isFilter ? "filter-section-drop" : ""
            } ${props.filterName == "Campaign Name" || props.filterName == "Region"
              || props.filterName == "Status"
              ? "disable-drop"
              : ""
            }
          ${props.isDisable ? "disable-drop"
              : ""
            }
            ${props.extraSelectedClass ? "extraSelectedClass" : ""
            }
          `}

          onClick={() => hideAndShowDropdown()}
          style={props.isCallDuration ? { width: "220px" } : { width: "170px" }}
        >
          {imgSrcLeft && (
            <img
              className="exceptClick select-data"
              style={{ width: "12px" }}
              src={RoleIcon}
              alt="Dropdown left icon"
            />
          )}
          <p className="exceptClick select-data">
            {" "}
            {props.placeHolderText ? props.placeHolderText : selectedItem}{" "}
          </p>
          {imgSrcRight && (
            <img
              className="exceptClick select-data"
              src={DropdownIcon}
              alt="Dropdown left icon"
            />
          )}
        </div>
        {isDropdownShow && (
          <div
            className={`dropdownToBeSelected exceptClick select-data ${props.isFilter ? "filter-style" : ""
              }`}
          >
            {
              props.searchUi &&
              <div className={`dropdown-search`}>
                <InputBox
                  className={`dropDownSearchInput`}
                  type="text"
                  imgSrc={SearchIcon}
                  imageClick={ { }}
                  name={props.ipName}
                  onChangeValue={(e)=>props.handleSearchItem(e,props.filterName)}
                  value={props.ipValue}
                />
              </div>
            }
            <ul className={`dropdownUl  ${props.isFilter ? "filter-ul" : ""}`}>
              {optionList == "filterData" ? (
                <MultiSelect
                  onCancel={closeDropdown}
                  filterList={props.filterListData}
                  filterName={props.filterName}
                  sendTags={(tags) => dataToTags(tags)}
                  sendResponse={(sendResponse) => {
                    getResponse(sendResponse);
                  }}
                  fromDate={props.fromDate}
                  toDate={props.toDate}
                  loading={(data) => props.loading(data)}
                  flowTypeData={props.flowtype}
                  selectItems={(data) => {
                    setSelectedItem(data.join(","));
                  }}
                  selectedItems={selectedItem}
                  editedItem={props.editedItem ? props.editedItem : null}
                  idData={props.idData?props.idData:0}
                />
              ) : optionList?.length > 0 ? (
                optionList.map((item, indx) => {
                  return (
                    <>
                      <li
                        className={`dropdownLi exceptClick select-data`}
                        key={item}
                        onClick={(e) => handleClickSelecteItem(item)}
                        onMouseOver={()=>{
                          if(props.onMouseEnter){
                            let temp=showArrow
                            setShowArrow(prev=>true)
                            props.onMouseEnter(item)
                            setHoverItem(prev=>item)
                          }else{
                            let temp=showArrow
                            setShowArrow(prev=>!temp)
                            mouseOver()
                            setHoverItem(prev=>item)
                          }
                          setAddClassHover(prev=>true)
                          }}
                        onMouseLeave={()=>{
                          if(props.onMouseLeave){
                            // let temp=showArrow
                            // setShowArrow(prev=>!temp)
                            props.onMouseLeave()
                          }else{
                            // let temp=showArrow
                            // setShowArrow(prev=>!temp)
                            mouseOver()
                          } }}
                      >
                        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"0px 10px",color:"#0174FF"}} onMouseOver={()=>{
                          let temp=showArrow
                          setShowArrow(prev=>true)
                          setHoverItem(prev=>item)
                        }}>
                        <div>
                        <span className="exceptClick select-data">
                          {" "}
                          {item}{" "}

                        </span>
                        </div>
                       <div>
                         {console.log(hoverItem,item,"iti")}
                         {showArrow &&(hoverItem==item) &&props.childDataList?.length > 0&& <img src={activeArrow}/>}
                       </div>
                       </div>

                      </li>
                    </>
                  );
                })
              ) : (
                ""
              )}
            </ul>

          </div>
        )}
          {props.showChildDropdown && isDropdownShow &&
                           <div
                           className={`dropdownToBeSelected exceptClick select-data`}
                             style={{position:"absolute", marginLeft:"100%"}}
                         >
                            {

                              <div className={`dropdown-search`}>
                                <InputBox
                                  className={`dropDownSearchInput`}
                                  type="text"
                                  imgSrc={SearchIcon}
                                  imageClick={{ }}
                                  name={props.ipName}
                                  onChangeValue={(e)=>props.handleSearchItem(e,"childSearch")}
                                  value={props.childIpValue}

                                />
                              </div>
                            }
               <ul className={`dropdownUl  ${props.isFilter ? "filter-ul" : ""}`}>
               {

               props.childDataList?.length > 0 ? (
                props.childDataList.map((item, indx) => {
                   return (
                     <>
                       <li
                         className={`dropdownLi exceptClick select-data`}
                         key={item}
                         onClick={(e) => handleSelectedChildItem(item)}
                         onMouseEnter={()=>{props.onMouseEnter()
                          setAddClassHover(prev=>true)
                        }}
                         onMouseLeave={()=>{props.onMouseLeave()}}
                       >
                         <span className="exceptClick select-data">
                           {" "}
                           {item}{" "}
                         </span>
                       </li>
                     </>
                   );
                 })
               ) : (
                 ""
               )}
             </ul>
              </div>
               }
      </div>


    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    flowtype: state.dashboardReducer.flowType,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign({}, dashboardAction), dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(DropdownSaarthi);
