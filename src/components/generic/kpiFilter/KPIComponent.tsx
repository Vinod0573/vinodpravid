import React, { useState, SetStateAction, useEffect, useRef } from "react";
import styles from "./KPIComponent.module.scss";
// import {
//   searchIcon,
//   openarrow,
//   closearrow,
//   crossblue,
//   tickblue,
// } from "../../../theme/assets/svg/rightSideIcon";
import { useDispatch, useSelector } from "react-redux";
//import { setSelectedFilterOptions } from "../../../redux/filters/actions";
import { setSelectedFilterType } from "../../../redux/filters/actions";
import { RootState } from "../../../redux";
import { setKpiEditedOption } from "../../../redux/filters/actions";
import { template } from "lodash";
import { useCurrentPageTab } from "../../../hooks";
import { getDataFromSchema } from "../../../utils/getDataFromSchema";
import { updateSchemaRequest } from "../../../redux/onboarding/login/actions";
import { toast, ToastContainer } from "react-toastify";
import PravidIcons from "../icon/PravidIcons";

// interface Obj {

//   type?: string;
//   name: string;
//   options: string[];
// }
// interface props {
//   options: Obj;
//   withSelectAll?:boolean
// }
export default function KPIComponent(props: any) {
  const [closeDropDown, setCloseDropDown] = useState<boolean>(true);
  const [isSelectAll, setIsSelectAll] = useState<boolean>(false);
  const [filterOptions, setFilterOptions] = useState<any>([]);
  const [selectedData, setSelectedData] = useState<any>([]);
  const selectedFilterType = useSelector(
    (state: RootState) => state.filterReducers?.selectedFilterType
  );
  const [kpiDetails, setKpiDetails] = useState<any>({ charts: [], cards: [] });
  const dispatch = useDispatch();
  const userId = useSelector(
    (state: RootState) => state.loginReducer.userLoginInfo?.userDetail?._id
  );

  function handleCloseOnDropdown() {
    selectedFilterType === props.options.name &&
      setCloseDropDown(!closeDropDown);
    dispatch(setSelectedFilterType(props?.options?.name));
  }
  const {
    schema,
    sourceTab,
    isActivePageType,
    whatsappChannelTab,
    subModuleTab,
    channelTab,
    currentLoggerPage,
  } = useCurrentPageTab();
  useEffect(() => {
    if (
      sourceTab &&
      subModuleTab &&
      channelTab &&
      currentLoggerPage &&
      isActivePageType
    ) {
      setKpiDetails(
        getDataFromSchema({
          schema,
          sourceTab,
          isActivePageType,
          whatsappChannelTab,
          subModuleTab,
          channelTab,
          currentLoggerPage,
        }).kpiDetails
      );
    }
  }, [
    schema,
    sourceTab,
    whatsappChannelTab,
    subModuleTab,
    channelTab,
    currentLoggerPage,
    isActivePageType,
  ]);
  //manange slelcte filter
  useEffect(() => {
    setFilterOptions(props?.options?.options);
  }, [props?.options?.options]);
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
  // const optionsDefaultSelected = useSelector(
  //   (state: RootState) =>
  //     state.filterReducers.selectedFilterOptions[props.options.name]
  // );
  const getChecked = (data: any, index: number) => {
    if (selectedData?.find((ex: any) => ex.id === data.id)) {
      const tempArr = [...selectedData];
      const indexr = tempArr.findIndex((ex) => ex.id === data.id);
      if (indexr > -1) {
        tempArr.splice(indexr, 1);
      }
      setSelectedData([...tempArr]);
      // if (selectedData.length !== props.options.options.length) {
      //   setIsSelectAll(false);
      // } else {
      //   setIsSelectAll(true);
      // }
    } else {
      // if (selectedData.length !== props.options.options.length) {
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
    // if(e.target.value.length<4 &&!(e.target.value.length===0)) return ;
    const searchTerm = e.target.value.toLowerCase();
    const searchedData: any = [];
    props.options.options.forEach((each: any) => {
      if (each.kpiCustomizationName.toLowerCase().includes(searchTerm)) {
        searchedData.push(each);
      }
    });
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
    dispatch(setKpiEditedOption({ type: props.options.name, options: [] }));
    toast.success("Please wait ...");
  }
  function handleTickButton() {
    setCloseDropDown(true);
    const op = props.options.options.map((e: any) => {
      if (selectedData.find((ex: any) => ex.id === e.id)) {
        const temp = selectedData.find((ex: any) => ex.id === e.id);
        temp.isActive = true;
        return temp;
      } else {
        const temp = e;
        temp.isActive = false;
        return temp;
      }
    });
    // console.log(op,"OPTIONS",props.options.fieldName)
    const tempSchema = JSON.parse(JSON.stringify(schema));
    //console.log(isActivePageType,currentLoggerPage,sourceTab,channelTab,subModuleTab,"TABS")
    if (channelTab === "Call") {
      tempSchema["analytics"][sourceTab][channelTab][
        !subModuleTab ? "Campaign" : subModuleTab
      ]["kpiDetails"][props.options.fieldName] = op;
    } else {
      tempSchema["analytics"][sourceTab][channelTab][whatsappChannelTab][
        !subModuleTab ? "Campaign" : subModuleTab
      ]["kpiDetails"][props.options.fieldName] = op;
    }
    // console.log(tempSchema,"MAKING--- TEMPSCHEMA--KPI")
    dispatch(updateSchemaRequest({ id: userId, schema: tempSchema }));

    // dispatch(
    //   setKpiEditedOption({
    //     type: props.options.name,
    //     options: op,
    //   })
    // );
    toast.success("Please wait ...");
  }
  function handleClickOutsideButtons(e: any) {
    e.stopPropagation();
    setCloseDropDown(false);
  }
  const inputRef = useRef<any>();
  useEffect(() => {
    setFilterOptions(props.options.options || []);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }, [closeDropDown]);
  useEffect(() => {
    const defSelected = props.options.options.filter((e: any) => e.isActive);
    setSelectedData(defSelected);
    // if (optionsDefaultSelected !== undefined){//
    // }
    //setSelectedData(optionsDefaultSelected);
  }, [props.options.options]);

  return (
    <>
      {props.options?.options.length > 0 && (
        <div
          className={`${styles.filterwrappers}  ${
            props.disabled ? styles.disablethisfilter : " "
          }`}
        >
          <div className={styles.topdivof} onClick={handleCloseOnDropdown}>
            {/* <img src={!closeDropDown ? openarrow : closearrow}></img> */}
            {!closeDropDown ? (
              <PravidIcons activeIcon={"openarrow"} />
            ) : (
              <PravidIcons activeIcon={"closearrow"} />
            )}
            <p
              className={
                closeDropDown
                  ? styles.closedropdowntext
                  : styles.opendropdowntext
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
            {props.options?.options?.length > 7 && (
              <div className={styles.inputdiv}>
                {/* <img src={searchIcon} alt="" /> */}
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
                {props?.options?.options.length > 0 && (
                  <div
                    className={
                      styles.colorgrey +
                      " " +
                      styles.margibttm +
                      " " +
                      (isSelectAll ? styles.colorItem : "")
                    }
                  >
                    <input
                      type="checkbox"
                      checked={isSelectAll ? true : false}
                      onChange={getIsAllChecked}
                      className={styles.checkboxcusror}
                    />
                    Select All
                  </div>
                )}
                <div className={styles.horozontalrules} />
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
                      />
                      {each.kpiCustomizationName}
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
                    id={props.options.name+"cancel"}
                  >
                    <PravidIcons activeIcon={"crossblue"} />
                  </button>{" "}
                  <button
                    onClick={() => {
                      handleTickButton();
                    }}
                    className={styles.btnsforcloseopen}
                    id={props.options.name+"ok"}
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
                {selectedData.map((e: any, i: number) => {
                  if (i < 5) {
                    return (
                      <div
                        onClick={(e) => {
                          handleClickOutsideButtons(e);
                        }}
                        className={`${
                          selectedData[i].kpiCustomizationName?.length > 8
                            ? styles.eachoptionoutsideCollapseDiv
                            : styles.eachoptionoutside
                        }`}
                        key={i}
                      >
                        {selectedData[i].kpiCustomizationName}
                      </div>
                    );
                  } else if (i === 5) {
                    return (
                      <div
                        onClick={(e) => {
                          handleClickOutsideButtons(e);
                        }}
                        className={styles.eachoptionoutside}
                        key={i}
                      >
                        {"+" + (selectedData.length - 5)}
                      </div>
                    );
                  } else {
                    return null;
                  }
                })}
              </div>
            </>
          )}
          {/* <ToastContainer position="top-center" /> */}
        </div>
      )}
      {/* <div className={styles.divide}></div> */}
    </>
  );
}
