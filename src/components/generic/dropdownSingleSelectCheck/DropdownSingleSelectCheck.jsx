import React, { useState, SetStateAction, useEffect } from "react";
import styles from "./DropdownSingleSelectCheck.module.scss";
import PravidIcons from "../icon/PravidIcons";

// import {
//   searchIcon,
//   openarrow,
//   closearrow,
//   crossblue,
//   tickblue
// } from "../../../theme/assets/svg/rightSideIcon";

// interface Obj {
//   type?: string;
//   name: string;
//   options: string[];
// }
// interface props {
//   options: Obj;
//   withSelectAll?:boolean
// }
export default function DropdownSingleSelectCheck(props) {
  const [closeDropDown, setCloseDropDown] = useState(true);
  const [isSelectAll, setIsSelectAll] = useState(false);
  const [filterOptions, setFilterOptions] = useState(props.options.options);
  const [tempFilterOptions, setTempFilterOptions] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  const [searchData, setSearchData] = useState();
  function handleCloseOnDropdown() {
    setCloseDropDown(!closeDropDown);
  }
  const getChecked = (data, index) => {
    if (selectedData?.includes(data)) {
      const tempArr = [...selectedData];
      const indexr = tempArr.indexOf(data);
      if (indexr > -1) {
        tempArr.splice(indexr, 1);
      }
      setSelectedData((prevState) => {
        return [...tempArr];
      });
      if (selectedData.length !== props.options.options.length) {
        setIsSelectAll(false);
      } else {
        setIsSelectAll(true);
      }
    } else {
      setSelectedData((prevState) => {
        return [...prevState, data];
      });
      if (selectedData.length !== props.options.options.length) {
        setIsSelectAll(false);
      } else {
        setIsSelectAll(true);
      }
    }
  };
  const getSearchData = (e) => {
    let searchTerm = e.target.value.toLowerCase();
    let searchedData = [];
    props.options.options.forEach((each) => {
      if (each.toLowerCase().includes(searchTerm)) {
        searchedData.push(each);
      }
    });
    setFilterOptions(searchedData);
  };
  const getIsAllChecked = () => {
    if (isSelectAll) {
      setIsSelectAll(false);
      setSelectedData([]);
    } else {
      setIsSelectAll(true);
      setSelectedData(props.options.options);
    }
  };
  function handleCloseButton() {
    setSelectedData([]);
    setIsSelectAll(false);
    setCloseDropDown(true);
  }
  function handleTickButton() {
    setCloseDropDown(true);
  }
  function handleClickOutsideButtons(e) {
    e.stopPropagation();
    setCloseDropDown(false);
  }
  useEffect(() => {
    // .log(selectedData);console
  }, [selectedData]);
  return (
    <>
      <div className={styles.filterwrappers}>
        <div className={styles.topdivof} onClick={handleCloseOnDropdown}>
          {/* <img src={!closeDropDown ? openarrow : closearrow}></img> */}
          {!closeDropDown ? (
            <PravidIcons activeIcon={"openarrow"} />
          ) : (
            <PravidIcons activeIcon={"closearrow"} />
          )}
          <p
            className={
              closeDropDown ? styles.closedropdowntext : styles.opendropdowntext
            }
          >
            {props.options.name}
          </p>
        </div>

        <div
          className={
            closeDropDown ? styles.closeevrything : styles.openevrything
          }
        >
          <div className={styles.horozontalrules} />
          <div className={styles.inputdiv}>
            {/* <img src={searchIcon} alt="" /> */}
            <PravidIcons activeIcon={"searchIcon"} />
            <input
              onChange={getSearchData}
              className={styles.searchinput}
              type="text"
              placeholder="Search"
            />
          </div>

          <div className={styles.wrapperforoptiosn}>
            {filterOptions.map((each, i) => {
              return (
                <div className={styles.bodydata} key={i}>
                  <input
                    type="radio"
                    checked={selectedData?.includes(each) ? true : false}
                    onChange={() => getChecked(each, i)}
                    className={styles.checkboxofoptions}
                  />
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => getChecked(each, i)}
                    className={
                      selectedData?.includes(each)
                        ? styles.colorItem
                        : "" + " " + styles.colorgrey
                    }
                  >
                    {each}
                  </div>
                </div>
              );
            })}
          </div>
          {selectedData.length > 0 && (
            <>
              <div className={styles.divcontainingbtn}>
                {" "}
                <button
                  className={styles.btnsforcloseopen}
                  onClick={() => {
                    handleCloseButton();
                  }}
                >
                  <PravidIcons activeIcon={"crossblue"} />
                </button>{" "}
                <button
                  onClick={() => {
                    handleTickButton();
                  }}
                  className={styles.btnsforcloseopen}
                >
                  <PravidIcons activeIcon={"tickblue"} />
                </button>{" "}
              </div>
            </>
          )}
        </div>

        {closeDropDown && selectedData.length > 0 && (
          <>
            <div className={styles.optionsoutside}>
              {selectedData.map((e, i) => {
                if (i <= 1) {
                  return (
                    <div
                      onClick={(e) => {
                        handleClickOutsideButtons(e);
                      }}
                      className={styles.eachoptionoutside}
                      key={i}
                    >
                      {selectedData[i]}
                    </div>
                  );
                } else if (i === 2) {
                  return (
                    <div
                      onClick={(e) => {
                        handleClickOutsideButtons(e);
                      }}
                      className={styles.eachoptionoutside}
                      key={i}
                    >
                      {"+" + (selectedData.length - 2)}
                    </div>
                  );
                } else {
                  return null;
                }
              })}
            </div>
          </>
        )}
      </div>
    </>
  );
}
