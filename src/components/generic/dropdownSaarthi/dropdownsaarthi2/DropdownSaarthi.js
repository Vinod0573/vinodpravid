import React, { useState, useEffect, useRef } from "react";

import "./DropdownSaarthi.css";


import MultiSelect from "../../dropdownsaarthi2/multiSelect/MultiSelect";
import InputBox from "../../../generic/inputBox/InputBox";
import SearchIcon from "../../../../theme/assets/svg/generic/searchIcon.svg";


const DropdownSaarthi = (props) => {
  const { optionList, imgSrcLeft, imgSrcRight, placeHolderText } = props.droplist;
  const [isDropdownShow, setIsDropdownShow] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const ref = useRef();



  //To close dropdown on click anywhere
  useEffect(() => {
    const checkIfClickedOutside = e => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (isDropdownShow && ref.current && !ref.current.contains(e.target)) {
        setIsDropdownShow(false)
      }
    }

    document.addEventListener("mousedown", checkIfClickedOutside)

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside)
    }
  }, [isDropdownShow])

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
    props.selectedItem(item);
  };

  const closeDropdown = () => {
    setIsDropdownShow(false);
  };

  // useEffect(() => {
    
  // }, [selectedItem]);

  useEffect(() => {
    // console.log("editedItem", props.editedItem)
      setSelectedItem(props.editedItem);
  }, [props.editedItem]);
  useEffect(
    () => {
    
      if(props.showInitialList ){
        setIsDropdownShow(prev => true)
      }
    },[props.showInitialList]
  )

  const displayText = (selectedItem, placeHolderText) => {
    if (props.maxDisplayLength) {
      if ((selectedItem ? selectedItem : placeHolderText)?.length > props.maxDisplayLength) {
        return ((selectedItem ? selectedItem : placeHolderText).slice(0, props.maxDisplayLength) + "...");
      } else {
        return selectedItem ? selectedItem : placeHolderText;
      }
    } else {
      return selectedItem ? selectedItem : placeHolderText;
    }
  };

  return (
    <>
      <div className="dropdownTopDiv  dropdownJpWrapper" ref={ref}>
        <div
          className={`selecteditem 
           ${props.isFilter ? "filter-section-drop" : ""}
            ${selectedItem ? "selectedValidated" : "selectedNotValidated"}
            ${props.extraClassSelectedArea ? props.extraClassSelectedArea : ""}
            `}
          onClick={() => hideAndShowDropdown()}
        // style={props.isCallDuration?{width:"220px"}:{width:"170px"}}

        >
          {imgSrcLeft ? (
            <img
              className={`${props.extraStyleLeftImg ? props.extraStyleLeftImg : "styleLeftImg" }`}
              src={imgSrcLeft}
              alt="Dropdown left icon"
            />
          ) :
            <p></p>
          }
          <p className={` ddSelectedItemPara ${
              !selectedItem && props.extraClassPlaceHolder ? props.extraClassPlaceHolder : ""
            }`}>
            {" "}
            {displayText(selectedItem,placeHolderText)}
            {" "}
          </p>
          {imgSrcRight ? (
            <img
              className=""
              src={imgSrcRight}
              alt="Dropdown left icon"
            />
          )
            :
            <p></p>
          }
        </div>
        {isDropdownShow  && (
          <div
            className={`dropdownToBeSelected  ${props.extraClassToBeSelectedArea ? props.extraClassToBeSelectedArea : ""
              }`}
          >
            {
              props.searchUi &&
              <div className={`dropdownSearchWrapper
              ${props.extraClassDropdownSearchWrapper ? props.extraClassDropdownSearchWrapper : ""
                }
              `}>
                <InputBox
                  className={`dropDownSearchInput 
                  ${props.extraClassDropdownSearchArea ? props.extraClassDropdownSearchArea : ""
                    }`}
                  type="text"
                  imgSrc={SearchIcon}
                  value={props.searchVal}
                  onChangeValue={(e) => props.handleSearchItem(e)}
                  imageClick={() => {true}}
                />
              </div>
            }
            <ul className={`dropdownUl  ${props.isFilter ? "filter-ul" : ""}`}>
              {optionList == "filterData" ? (
                <MultiSelect 
                onCancel={closeDropdown} 
                selectedItems={props.selectedItems?props.selectedItems:""}
                idData={props.idData?props.idData:0}
                />
              ) : optionList.length > 0 ? (
                optionList.map((item, indx) => {
                  return (
                    <>
                      <li
                        className= { `dropdownLi ${props.img ? "imgSpace": null}`}
                        key={item}
                        onClick={() => handleClickSelecteItem(item)}
                      >
                        <span>{props.img ?<img src={props.img} alt ="img"></img> : "" }</span> 
                        <span className=""> {item} </span>
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
      </div>
    </>
  );
};

export default DropdownSaarthi;

/*
  maxDisplayLength: number (optional) - to restrict the length of string displayed in selected bo 
  extraClassPlaceHolder: string (optional) - to add css for place holder.
*/