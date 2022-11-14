import React, { useState, SetStateAction, useEffect, useRef } from "react";
import styles from "./DropdownFilterAccord.module.scss";
// import {
//   searchIcon,
//   openarrow,
//   closearrow,
//   crossblue,
//   tickblue,
// } from "../../../theme/assets/svg/rightSideIcon";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedFilterOptions } from "../../../redux/filters/actions";
import { setSelectedFilterType } from "../../../redux/filters/actions";
import { RootState } from "../../../redux";
import { setFilterHasChanged } from "../../../redux/filters/actions";
import PravidIcons from "../icon/PravidIcons";
//import { schema } from "../../moduleComponents/onBoarding/login/loginField/schema";
// interface Obj {

//   type?: string;
//   name: string;
//   options: string[];
// }
// interface props {
//   options: Obj;
//   withSelectAll?:boolean
// }
export default function DropdownFilterAccord(props: any) {
  const [closeDropDown, setCloseDropDown] = useState(true);
  const [isSelectAll, setIsSelectAll] = useState(false);
  const [filterOptions, setFilterOptions] = useState(
    props.options.options || []
  );
  const [selectedData, setSelectedData] = useState<string[]>([]);
  const selectedFilterType = useSelector(
    (state: RootState) => state.filterReducers?.selectedFilterType
  );
  const dispatch = useDispatch();
  function handleCloseOnDropdown() {
    selectedFilterType === props.options.name &&
      setCloseDropDown(!closeDropDown);
    dispatch(setSelectedFilterType(props?.options?.name));
  }
  //manange slelcte filter
  useEffect(() => {
    if (selectedFilterType === props.options.name) {
      if (closeDropDown) {
        setCloseDropDown(false);
      } else {
        setCloseDropDown(true);
      }
    } else {
      setCloseDropDown(true);
    }
  }, [selectedFilterType]);
  const optionsDefaultSelected = useSelector(
    (state: RootState) =>
      state.filterReducers?.selectedFilterOptions[props.options.backendRefrence]
  );

  const getChecked = (data: string, index: number) => {
    if (selectedData?.includes(data)) {
      const tempArr = [...selectedData];
      const indexr = tempArr.indexOf(data);
      if (indexr > -1) {
        tempArr.splice(indexr, 1);
      }
      setSelectedData([...tempArr]);
      // if (tempArr.length !== props.options.options.length) {
      //   setIsSelectAll(false);
      // } else {
      //   setIsSelectAll(true);
      // }
    } else {
      // if (selectedData.length + 1 !== props.options.options.length) {
      //   setIsSelectAll(false);
      // } else {
      //   setIsSelectAll(true);
      // }
      setSelectedData([...selectedData, data]);
    }
  };
  useEffect(() => {
    let currentSelected = 0;
    selectedData.forEach((e: any) => {
      if (filterOptions.includes(e)) {
        currentSelected++;
      }
    });
    setIsSelectAll(currentSelected === filterOptions.length);
  }, [selectedData, filterOptions]);
  const getSearchData = (e: any) => {
    // if (e.target.value.length < 4 && !(e.target.value.length === 0)) return;
    const searchTerm = e.target.value.toLowerCase();
    const searchedData: any = [];
    props.options.options.forEach((each: string) => {
      if (each.toLowerCase().includes(searchTerm)) {
        searchedData.push(each);
      }
    });
    // let tempSelectAll = 0;
    // selectedData.forEach((e: any) => {
    //   if (searchedData.includes(e)) {
    //     tempSelectAll++;
    //   }
    // });
    // setIsSelectAll(tempSelectAll === searchedData.length);
    setFilterOptions(searchedData);
  };
  const getIsAllChecked = () => {
    if (isSelectAll) {
      // setIsSelectAll(false);
      const tempSelectedData = selectedData.filter((e: any) => {
        return !filterOptions.includes(e);
      });
      setSelectedData(tempSelectedData);
    } else {
      // setIsSelectAll(true);
      const temp = [...selectedData];
      filterOptions.forEach((e: any) => {
        if (!temp.includes(e)) {
          temp.push(e);
        }
      });
      setSelectedData(temp);
    }
  };
  function handleCloseButton() {
    setSelectedData([]);
    // setIsSelectAll(false);
    setCloseDropDown(true);
    dispatch(
      setSelectedFilterOptions({ type: props?.options?.name, options: [] })
    );
    dispatch(setFilterHasChanged());
  }
  function handleTickButton() {
    setCloseDropDown(true);
    dispatch(
      setSelectedFilterOptions({
        type: props.options.backendRefrence,
        options: selectedData,
      })
    );
    dispatch(setFilterHasChanged());
  }
  function handleClickOutsideButtons(e: any) {
    e.stopPropagation();
    setCloseDropDown(false);
  }
  // useEffect(() => {
  //   console.log({ selectedData, isSelectAll }, "dropdown");
  // }, [selectedData, isSelectAll]);
  const inputRef = useRef<any>();
  useEffect(() => {
    setFilterOptions(props.options.options || []);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }, [closeDropDown]);
  useEffect(() => {
    if (optionsDefaultSelected !== undefined) {
      setSelectedData(optionsDefaultSelected);
    } else {
      setSelectedData([]);
    }
  }, [optionsDefaultSelected]);
  return (
    <>
      <div
        className={`${styles.filterwrappers}  ${
          props.disabled ? styles.disablethisfilter : " "
        }`}
      >
        <div className={styles.topdivof} onClick={handleCloseOnDropdown}>
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
          id={"auto_filter_" + props.options.name.replace(/\s/g, "")}
        >
          <div className={styles.horozontalrules} />
          {props?.options?.options?.length > 7 && (
            <div className={styles.inputdiv}>
              <PravidIcons activeIcon={"searchIcon"} />
              <input
                onChange={getSearchData}
                className={styles.searchinput}
                type="text"
                placeholder="Search"
                ref={inputRef}
              />
            </div>
          )}

          {
            <>
              {filterOptions?.length > 0 && (
                <div
                  className={
                    styles.colorgrey +
                    " " +
                    styles.margibttm +
                    " " +
                    (isSelectAll ? styles.colorItem : "")
                  }
                  onClick={getIsAllChecked}
                  style={{ cursor: "pointer" }}
                >
                  <input
                    type="checkbox"
                    checked={isSelectAll ? true : false}
                    className={styles.checkboxcusror}
                  />
                  <span> Select All</span>
                </div>
              )}
              {filterOptions?.length > 0 && (
                <div className={styles.horozontalrules} />
              )}
            </>
          }
          <div className={styles.wrapperforoptiosn}>
            {filterOptions?.map((each: any, i: number) => {
              return (
                <div className={styles.bodydata} key={i}>
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => getChecked(each, i)}
                    className={
                      selectedData?.includes(each)
                        ? styles.colorItem
                        : "" + " " + styles.colorgrey
                    }
                  >
                    <input
                      type="checkbox"
                      checked={selectedData?.includes(each) ? true : false}
                      onChange={() => getChecked(each, i)}
                      className={styles.checkboxofoptions}
                      readOnly
                    />
                    <span>{each}</span>
                  </div>
                </div>
              );
            })}
          </div>
          {props?.options?.options?.length > 0 && (
            <>
              <div className={styles.divcontainingbtn}>
                {" "}
                <button
                  className={styles.btnsforcloseopen}
                  onClick={() => {
                    handleCloseButton();
                  }}
                  id={props.options.name +"cancel"}
                >
                  <PravidIcons activeIcon={"crossblue"} />
                </button>{" "}
                <button
                  onClick={() => {
                    handleTickButton();
                  }}
                  className={styles.btnsforcloseopen}
                  id={props.options.name +"ok"}
                >
                  <PravidIcons activeIcon={"tickblue"} />
                </button>{" "}
              </div>
            </>
          )}
        </div>

        {closeDropDown && selectedData?.length > 0 && (
          <>
            <div className={styles.optionsoutside}>
              {selectedData?.map((e, i) => {
                if (i < 5) {
                  return (
                    <div
                      onClick={(e) => {
                        handleClickOutsideButtons(e);
                      }}
                      className={`${
                        e.length > 8
                          ? styles.eachoptionoutsideCollapseDiv
                          : styles.eachoptionoutside
                      }`}
                      key={i}
                    >
                      {selectedData[i]}
                    </div>
                  );
                } else if (i === 6) {
                  return (
                    <div
                      onClick={(e) => {
                        handleClickOutsideButtons(e);
                      }}
                      className={styles.eachoptionoutside}
                      key={i}
                    >
                      {"+" + (selectedData?.length - 6)}
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
      {/* <div className={styles.divide}></div> */}
    </>
  );
}
